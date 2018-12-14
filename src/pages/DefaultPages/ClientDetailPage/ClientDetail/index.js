import React from 'react'
import { Collapse, Form, Tabs, Input, Button, Pagination, Modal } from 'antd'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import FileInput from 'react-simple-file-input'
import { Redirect } from 'react-router'
import { data } from './data.json'
import ReactFileReader from 'react-file-reader'
import config from '../../../../web-config'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../../config'

const Panel = Collapse.Panel
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']
const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

function fileIsIncorrectFiletype(file) {
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true
  } else {
    return false
  }
}

@connect(mapStateToProps)
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
    clientProjects: [],
    clientName: '',
    clientName2: '',
    clientEmail: '',
    partitions: [{ videos: [] }],
    ownSignersTeamCount: 0,
    projectIndex: 0,
    donations_value: '',
  }

  componentDidMount() {
    this.setState({ page: 1, pageSize: 10 })
    // alert(config.clientKey)
    this.getClientProjects()
    this.getClientInfo()
    this.getClientSignersTeam()
  }

  getClientProjects = () => {
    const { userState } = this.props
    axios
      .post(`${baseUrl}/projects/list/admin`, {
        user_id: config.clientKey,
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ clientProjects: res.data.data })
        } else {
          this.setState({ clientProjects: [] })
        }
      })
      .catch(error => {
        this.setState({ clientProjects: [] })
      })
  }

  getClientSignersTeam = () => {
    axios
      .post(`${baseUrl}/projects/ownSignersTeam`, {
        client_id: config.clientKey,
      })
      .then(res => {
        if (res.data.success) {
          let users = []
          res.data.data.map(item => {
            users.push({
              cover: 'resources/images/user-empty-512.png',
              name: item.firstName,
              author: item.status,
              assignTo: item.status == 'Unassigned' ? item.status : item.assignTo,
              views: 'TBD',
              id: item._id,
            })
          })
          this.setState({
            partitions: [{ videos: users }],
            ownSignersTeamCount: res.data.data.length,
          })
        } else {
        }
      })
      .catch(error => {})
  }

  getClientInfo = () => {
    axios
      .post(`${baseUrl}/client/fetch`, {
        user_id: config.clientKey,
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            clientName: res.data.data[0].firstName,
            clientName2: res.data.data[0].lastName,
            clientEmail: res.data.data[0].email,
            previewUrl: `${baseUrl}/image?id=${res.data.data[0].photoID}`,
          })
        } else {
        }
      })
      .catch(error => {})
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
        axios
          .post(`${baseUrl}/admin/update`, {
            client_id: config.clientKey,
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          })
          .then(res => {
            if (res.data.success) {
              this.setState({ redirect: 1 })
            } else {
              alert(res.data.message)
            }
          })
          .catch(error => {})
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
      let parsedCSV = this.CSVToArray(reader.result)
      axios
        .post(`${baseUrl}/projects/uploadCSV`, {
          client_id: config.clientKey,
          client_name: this.state.clientName,
          csvData: parsedCSV,
        })
        .then(res => {
          if (res.data.success) {
            this.getClientSignersTeam()
          } else {
          }
        })
        .catch(error => {})
    }
    reader.readAsText(files[0])
  }

  CSVToArray = (strData, strDelimiter) => {
    strDelimiter = strDelimiter || ','
    var objPattern = new RegExp(
      '(\\' +
        strDelimiter +
        '|\\r?\\n|\\r|^)' +
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        '([^"\\' +
        strDelimiter +
        '\\r\\n]*))',
      'gi',
    )
    var arrData = [[]]
    var arrMatches = null
    while ((arrMatches = objPattern.exec(strData))) {
      var strMatchedDelimiter = arrMatches[1]
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
        arrData.push([])
      }
      var strMatchedValue
      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"')
      } else {
        strMatchedValue = arrMatches[3]
      }
      arrData[arrData.length - 1].push(strMatchedValue)
    }
    return arrData
  }

  onAddProject = () => {
    this.setState({ redirect: 2 })
  }

  showModal = index => {
    // this.props.form.setFieldsValue({
    //   modalDonation: this.state.clientProjects[index].donations_value,
    // })
    this.setState({
      modalVisible: true,
      projectIndex: index,
      donations_value: this.state.clientProjects[index].donations_value,
    })
  }

  handleOk = e => {
    if (this.checkDigital(this.state.donations_value)) {
      axios
        .post(`${baseUrl}/update/donation`, {
          project_id: this.state.clientProjects[this.state.projectIndex]._id,
          donations_value: parseInt(this.state.donations_value),
        })
        .then(res => {
          if (res.data.success) {
            this.setState({ modalVisible: false })
            this.getClientProjects()
          } else {
            this.setState({ modalVisible: false })
          }
        })
        .catch(error => {
          this.setState({ modalVisible: false })
        })
    } else {
      alert('Please input the digital value')
    }
  }

  handleCancel = e => {
    this.setState({ modalVisible: false })
  }

  checkDigital = value => {
    return /^\d+$/.test(value)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      redirect,
      tabKey,
      previewUrl,
      partitions,
      clientProjects,
      clientName,
      clientName2,
      clientEmail,
      ownSignersTeamCount,
      modalVisible,
      donations_value,
    } = this.state
    if (config.clientKey == '') {
      return <Redirect push to="/clients" />
    } else if (redirect == 1) {
      return <Redirect push to="/clients" />
    } else if (redirect == 2) {
      return <Redirect push to="/projects/new" />
    }
    let renderProjects = []
    clientProjects.map((item, index) => {
      renderProjects.push(
        <div className="clientNewPage__projectsItem" style={{}}>
          <h4>{item.name}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
            <h6>Cost per project</h6>
            <h6>${item.cost}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Total Paid to Signers</h6>
            <h6>${item.total_paid}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Current Donations</h6>
            <h6>${item.donations_value}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => {
                this.showModal(index)
              }}
            >
              Update Donations
            </Button>
          </div>
        </div>,
      )
    })
    const operations =
      tabKey == '1' ? (
        <div className="row">
          <Button
            style={{ width: 150, marginRight: 20 }}
            type="primary"
            htmlType="submit"
            className="clientNewPage__saveBtn mr-3"
          >
            Save
          </Button>
          <Button
            style={{ width: 150, marginRight: 20 }}
            className="clientNewPage__cancelBtn"
            onClick={() => {
              this.setState({ redirect: 1 })
            }}
          >
            Cancel
          </Button>
        </div>
      ) : tabKey == '2' ? (
        <div className="row">
          <Button style={{ width: 150, marginRight: 20 }}>Notify All Signers</Button>
          <ReactFileReader
            handleFiles={this.handleCSVFiles}
            fileTypes={'.csv'}
            className="clientNewPage__fileReader"
          >
            <Button type="primary" style={{ width: 200, marginRight: 20 }}>
              Upload CSV Signers Team
            </Button>
          </ReactFileReader>
        </div>
      ) : (
        <div className="row">
          <Button
            type="primary"
            style={{ width: 120, marginRight: 20 }}
            onClick={this.onAddProject}
          >
            Add Project
          </Button>
        </div>
      )
    let src = previewUrl || 'resources/images/plus.png'
    let avatarSrc = 'resources/images/plus.png'
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="card">
            <div className="card-body">
              <img src={src} border="true" className="clientNewPage__avatar" />
              <div className="clientNewPage__leftSideContainer">
                <h1>{clientName}</h1>
                <div style={{ marginTop: 5 }}>
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
                <h2>{`${ownSignersTeamCount}`}</h2>
                <h5>Signers</h5>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <Tabs
                defaultActiveKey="1"
                tabBarExtraContent={operations}
                onChange={this.onChangeTabs}
              >
                <TabPane tab={<span>Information</span>} key="1">
                  <h5 className="text-black mt-4">
                    <strong>Personal Information</strong>
                  </h5>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">First Name</label>
                        {getFieldDecorator('firstName', {
                          initialValue: clientName,
                          rules: [{ required: true, message: 'Please input your first name' }],
                        })(<Input placeholder="Enter first name" />)}
                      </FormItem>
                    </div>
                    <div className="col-lg-6">
                      <FormItem>
                        <label className="form-label mb-0">Last Name</label>
                        {getFieldDecorator('lastName', {
                          initialValue: clientName2,
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
                          initialValue: clientEmail,
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
                </TabPane>
                <TabPane tab={<span>{`Own Signers Team (${ownSignersTeamCount})`}</span>} key="2">
                  <div>
                    <div className="video-page__feeds">
                      {partitions.map((partition, index) => (
                        <div className="video-page__feed-partition" key={index}>
                          <ul className="video-page__partition-content">
                            {partition.videos.map((video, index) => (
                              <li
                                className="video-page__next-item video-page__next-item--feed"
                                key={index}
                              >
                                <div className="video-page__next-item-link" onClick={() => {}}>
                                  <div className="video-page__item-thumb">
                                    <img
                                      className="video-page__item-thumb-img"
                                      src={video.cover}
                                      alt={video.name}
                                    />
                                  </div>
                                  <div className="video-page__item-descr">
                                    <span className="video-page__item-name">{video.name}</span>
                                    <span className="video-page__item-author">
                                      {video.assignTo}
                                    </span>
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
                    </div>
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
                      onClick={this.saveTeam}
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
                </TabPane>
                <TabPane tab={<span>{`Projects (${clientProjects.length})`}</span>} key="3">
                  <Modal
                    title="Project Donations"
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
                    <div className="dashboardPage__modalContainer">
                      <label>Total amount donated as of today</label>
                      <Input
                        style={{ width: 180, height: 40, marginTop: 20, marginBottom: 20 }}
                        onChange={e => {
                          this.setState({ donations_value: e.target.value })
                        }}
                        value={donations_value}
                      />
                    </div>
                  </Modal>
                  <div className="clientNewPage__projectsContainer">{renderProjects}</div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default ClientDetail
