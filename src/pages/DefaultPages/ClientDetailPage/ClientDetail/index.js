import React from 'react'
import {
  Collapse,
  Slider,
  Form,
  Calendar,
  Badge,
  Table,
  Tabs,
  Input,
  Dropdown,
  Button,
  Icon,
  Menu,
  Pagination,
  List,
  Avatar,
} from 'antd'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import FileInput from 'react-simple-file-input'
import { Redirect } from 'react-router'
import { data } from './data.json'
import ReactFileReader from 'react-file-reader'

const Panel = Collapse.Panel
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']
function fileIsIncorrectFiletype(file) {
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true
  } else {
    return false
  }
}

@Form.create()
class ClientDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    redirect: 0,
    tabKey: '1',
    previewUrl: null,
    page: 1,
    pageSize: 10,
  }

  componentDidMount() {
    this.setState({ page: 1, pageSize: 10 })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  cancelButtonClicked = () => {
    return this.state.cancelButtonClicked
  }

  resetCancelButtonClicked = () => {
    this.setState({ cancelButtonClicked: false })
  }

  showInvalidFileTypeMessage = file => {
    window.alert('Tried to upload invalid filetype ' + file.type)
  }

  showProgressBar = () => {
    this.setState({ progressBarVisible: true })
  }

  updateProgressBar = event => {
    this.setState({
      progressPercent: (event.loaded / event.total) * 100,
    })
  }

  handleFileSelected = (event, file) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({ previewUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.setState({ redirect: 1 })
      }
    })
  }

  saveTeam = e => {
    e.preventDefault()
    this.setState({ redirect: 1 })
  }

  onChangeTabs = key => {
    this.setState({ tabKey: key })
  }

  onShowSizeChange = (current, pageSize) => {
    this.setState({ page: current, pageSize })
    console.info('page', current, pageSize)
  }

  onChangePage = page => {
    this.setState({ page })
    console.info('page', page)
  }

  filterData = () => {
    const { page, pageSize } = this.state
    return data.slice((page - 1) * pageSize, page * pageSize)
  }

  handleCSVFiles = files => {
    var reader = new FileReader()
    reader.onload = e => {
      console.info('csv', reader.result)
    }
    reader.readAsText(files[0])
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { redirect, tabKey, previewUrl, page, pageSize } = this.state
    if (redirect == 1) {
      return <Redirect push to="/clients" />
    }
    const operations = tabKey == '2' && (
      <div className="row">
        <Button style={{ marginRight: 20, marginTop: 5 }}>Notify All Signers</Button>
        <ReactFileReader handleFiles={this.handleCSVFiles} fileTypes={'.csv'}>
          <Button type="primary" style={{ marginRight: 30 }}>
            Upload CSV Signers Team
          </Button>
        </ReactFileReader>
      </div>
    )
    let src = previewUrl || 'resources/images/avatars/1.jpg'
    let avatarSrc = 'resources/images/avatar.jpg'
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <img src={src} border="true" className="clientNewPage__avatar" />
            <div className="clientNewPage__leftSideContainer">
              <h2>Client Name</h2>
              <div>
                <label>
                  <FileInput
                    readAs="binary"
                    style={{ display: 'none' }}
                    onLoadStart={this.showProgressBar}
                    onLoad={this.handleFileSelected}
                    onProgress={this.updateProgressBar}
                    cancelIf={fileIsIncorrectFiletype}
                    abortIf={this.cancelButtonClicked}
                    onCancel={this.showInvalidFileTypeMessage}
                    onAbort={this.resetCancelButtonClicked}
                  />

                  <span className="clientNewPage__changeImageSpan">Change Image</span>
                </label>
              </div>
            </div>
            <div className="clientNewPage__rightSideContainer">
              <h2>240</h2>
              <h5>Signers</h5>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.onChangeTabs}>
              <TabPane tab={<span>Information</span>} key="1">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <h5 className="text-black mt-4">
                    <strong>Personal Information</strong>
                  </h5>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">First Name</label>
                        {getFieldDecorator('firstName', {
                          rules: [{ required: true, message: 'Please input your first name' }],
                        })(<Input placeholder="Enter first name" />)}
                      </FormItem>
                    </div>
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">Last Name</label>
                        {getFieldDecorator('lastName', {
                          rules: [{ required: true, message: 'Please input your last name' }],
                        })(<Input placeholder="Enter last name" />)}
                      </FormItem>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">Email</label>
                        {getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please input your email' }],
                        })(<Input placeholder="Enter email" />)}
                      </FormItem>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">Enter Password</label>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(<Input type="password" placeholder="Enter password" />)}
                      </FormItem>
                    </div>
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">Confirm Password</label>
                        {getFieldDecorator('confirmpassword', {
                          rules: [{ required: true }, { validator: this.compareToFirstPassword }],
                        })(<Input type="password" placeholder="Confirm password" />)}
                      </FormItem>
                    </div>
                  </div>
                  <div className="form-actions">
                    <Button
                      style={{ width: 150 }}
                      type="primary"
                      htmlType="submit"
                      className="clientNewPage__saveBtn mr-3"
                    >
                      Save
                    </Button>
                    <Button
                      style={{ width: 150 }}
                      className="clientNewPage__cancelBtn"
                      onClick={() => {
                        this.setState({ redirect: 1 })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tab={<span>Own Signers Team</span>} key="2">
                <Form onSubmit={this.saveTeam} className="login-form">
                  <div>
                    <List
                      itemLayout="horizontal"
                      dataSource={this.filterData()}
                      renderItem={item => (
                        <List.Item>
                          <div className="row">
                            <Avatar
                              style={{ width: 25, height: 25, marginLeft: 30, marginTop: 15 }}
                              src={avatarSrc}
                            />
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{ width: 50, height: 50 }}
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                              }
                              title={<a href="https://ant.design">{item.title}</a>}
                              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div>
                    <Pagination
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      onChange={this.onChangePage}
                      total={data.length}
                    />
                  </div>
                  <div className="form-actions">
                    <Button
                      style={{ width: 150 }}
                      type="primary"
                      htmlType="submit"
                      className="clientNewPage__saveBtn mr-3"
                    >
                      Save
                    </Button>
                    <Button
                      style={{ width: 150 }}
                      className="clientNewPage__cancelBtn"
                      onClick={() => {
                        this.setState({ redirect: 1 })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientDetail
