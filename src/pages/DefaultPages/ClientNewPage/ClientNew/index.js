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
import axios from 'axios'
import { baseUrl } from '../../../../config'

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
class ClientNew extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    redirect: 0,
    tabKey: '1',
    previewUrl: null,
    clientProfileImage: null,
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
      this.setState({ clientProfileImage: file, previewUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.clientProfileImage) {
          let formData = new FormData();
          formData.append('file', this.state.clientProfileImage);
          axios
            .post(`${baseUrl}/upload`, formData)
            .then(res => {
              if (res.data.success) {
                axios
                .post(`${baseUrl}/admin/signup`, {
                  email: values.email,
                  password: values.password,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  photoID: res.data.newUuid
                })
                .then(res1 => {
                  if (res1.data.success) {
                    this.setState({ redirect: 1 })
                  } else {
                    alert(res1.data.message)
                  }
                })
                .catch(error => {})      
              } else {
              }
            })
            .catch(error => {})  
        } else {
          alert('Please upload the client profile image')
        }        
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
    const operations = (
      <div className="row">
        <Button type="primary" htmlType="submit" style={{ marginRight: 20, width: 150 }}>
          Add Client
        </Button>
        <Button type="normal" onClick={() => { this.setState({ redirect: 1 }) }} style={{ marginRight: 20, width: 150 }}>
          Cancel
        </Button>
      </div>
    )
    let src = previewUrl || 'resources/images/avatars/1.jpg'
    let avatarSrc = 'resources/images/avatar.jpg'
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="card">
          <div className="card-body">
            <img src={src} border="true" className="clientNewPage__avatar" />
            <div className="clientNewPage__leftSideContainer">
              <label style={{ marginTop: 15 }}>
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

                <span className="clientNewPage__changeImageSpan">Add Image</span>
              </label>
            </div>
            <div className="clientNewPage__rightSideContainer" />
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.onChangeTabs}>
              <TabPane tab={<span>Information</span>} key="1">
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
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Form>
      </div>
    )
  }
}

export default ClientNew
