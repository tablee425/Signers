import React from 'react'
import { Collapse, Button, Select, Form, Pagination, Modal } from 'antd'
import './style.scss'
import { tableData } from './data.json'
import { Link, withRouter } from 'react-router-dom'
import config from '../../../../web-config'
import { Redirect } from 'react-router'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import data from './data.json'

const Panel = Collapse.Panel
const Option = Select.Option
const FormItem = Form.Item

@Form.create()
class Signers extends React.Component {
  state = {
    redirect: 0,
    partitions: [{ videos: [] }],
    modalVisible: false,
    clients: [],
    signerIndex: 0,
  }

  componentDidMount() {
    this.getAllSigners()
    this.getAllClients()
  }

  showModal = index => {
    let user = this.state.partitions[0].videos[index]
    this.props.form.setFieldsValue({ assignTo: user.author })
    this.setState({ modalVisible: true, signerIndex: index })
  }

  handleOk = e => {
    const { partitions, signerIndex, clients } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.assignTo == 'Unassigned') {
        } else {
          let clientName = ''
          clients.map(item => {
            if (item._id == values.assignTo) {
              clientName = item.firstName
            }
          })
          axios
            .post(`${baseUrl}/signer/assign`, {
              signer_id: partitions[0].videos[signerIndex].id,
              client_id: values.assignTo,
              client_name: clientName,
            })
            .then(res => {
              if (res.data.success) {
                this.setState({ modalVisible: false })
                this.getAllSigners()
                this.getAllClients()
              } else {
              }
            })
            .catch(error => {})
        }
      }
    })
  }

  blockSigner = () => {
    const { partitions, signerIndex } = this.state
    axios
      .post(`${baseUrl}/signer/block`, {
        signer_id: partitions[0].videos[signerIndex].id
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ modalVisible: false })
          this.getAllSigners()
          this.getAllClients()
        } else {
        }
      })
      .catch(error => {})
  }

  handleCancel = e => {
    this.setState({ modalVisible: false })
  }

  getAllSigners = () => {
    axios
      .get(`${baseUrl}/signers`)
      .then(res => {
        if (res.data.success) {
          let users = []
          res.data.data.map(item => {
            users.push({
              cover: 'resources/images/photos/1.jpeg',
              name: item.firstName,
              author: item.status,
              assignTo: item.status == 'Unassigned' ? item.status : item.assignTo,
              views: 'TBD',
              id: item._id,
            })
          })
          this.setState({ partitions: [{ videos: users }] })
        } else {
        }
      })
      .catch(error => {})
  }

  getAllClients = () => {
    axios
      .post(`${baseUrl}/admin/list`, {})
      .then(res => {
        if (res.data.success) {
          this.setState({ clients: res.data.data })
        } else {
        }
      })
      .catch(error => {})
  }

  render() {
    const { redirect, partitions, modalVisible, clients } = this.state
    const { getFieldDecorator } = this.props.form
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
    let renderClients = []
    clients.map((item, index) => {
      renderClients.push(
        <Option value={item._id} key={index}>
          {item.firstName}
        </Option>,
      )
    })
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Signers (123)</strong>
          </div>
        </div>
        <div className="card-body video-page video-page--feed">
          <div>
            <Modal
              title="Basic Modal"
              visible={modalVisible}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Save
                </Button>,
              ]}
            >
              <Form onSubmit={this.handleSubmitModal}>
                <div className="signersPage__modalContainer">
                  <Button style={{ width: 180, height: 40, marginLeft: 140 }} onClick={this.blockSigner}>Block</Button>
                  <FormItem>
                    {getFieldDecorator('assignTo', {
                      rules: [{ required: true, message: 'Please select one client' }],
                    })(
                      <Select
                        style={{ width: 180, height: 40, marginTop: 20, marginLeft: 140 }}
                        placeholder="Assign to"
                      >
                        {renderClients}
                      </Select>,
                    )}
                  </FormItem>
                </div>
              </Form>
            </Modal>
          </div>
          <div className="video-page__feeds">
            {partitions.map((partition, index) => (
              <div className="video-page__feed-partition" key={index}>
                <ul className="video-page__partition-content">
                  {partition.videos.map((video, index) => (
                    <li className="video-page__next-item video-page__next-item--feed" key={index}>
                      <div
                        className="video-page__next-item-link"
                        onClick={() => {
                          this.showModal(index)
                        }}
                      >
                        <div className="video-page__item-thumb">
                          <img
                            className="video-page__item-thumb-img"
                            src={video.cover}
                            alt={video.name}
                          />
                        </div>
                        <div className="video-page__item-descr">
                          <span className="video-page__item-name">{video.name}</span>
                          <span className="video-page__item-author">{video.assignTo}</span>
                          <span className="video-page__item-views text-muted">
                            <span className="video-page__item-count">{video.views}</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* <div className="mb-5">
              <Pagination defaultCurrent={1} total={50} />
            </div> */}
          </div>
        </div>
      </section>
    )
  }
}

export default Signers
