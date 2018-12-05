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
  Select,
  DatePicker,
} from 'antd'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import FileInput from 'react-simple-file-input'
import { data } from './data.json'

const Option = Select.Option
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { TextArea } = Input
const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']
function fileIsIncorrectFiletype(file) {
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true
  } else {
    return false
  }
}

@Form.create()
class ProjectNew extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    redirect: 0,
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

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.setState({ redirect: 1 })
      }
    })
  }

  validateNumber = (rule, value, callback) => {
    const form = this.props.form
    if (value && isNaN(value)) {
      callback('This must be number!')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { redirect } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects" />
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="row">
            <div style={{ width: 230, height: 425, backgroundColor: 'white', padding: 15 }}>
              <img
                style={{ width: 200, height: 350 }}
                src="resources/images/vimeo.png"
              />
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
                <div className="projectNewPage__changeProjectImageButton">Change Image</div>
              </label>
            </div>
            <div style={{ flex: 1, paddingLeft: 30 }}>
              <div className="row">
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: 15 }}>
                  <FormItem>
                    {getFieldDecorator('projectName', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 400, height: 40, fontWeight: 'bold', fontSize: 20 }} placeholder="Project Name" />)}
                  </FormItem>
                  <div className="row" style={{ marginRight: 30, marginTop: 2 }}>
                    <Button type="primary" style={{ width: 140, height: 35, marginRight: 15 }}>Save</Button>
                    <Button type="normal" style={{ width: 140, height: 35 }}>Cancel</Button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    <Select style={{ width: 180, height: 40 }} placeholder="">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 230 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 590, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Location</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0" style={{ color: 'transparent' }}>Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="Project Type" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 230 }}>
                  <label className="form-label mb-0">Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<RangePicker style={{ width: 385 }}/>)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Description</label>
                  <FormItem>
                    {getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<TextArea rows={6} style={{ width: 1000 }} placeholder="Enter Project Description" />)}
                  </FormItem>
                </div>
              </div>

            </div>
          </div>
          {/* <div className="card">
            <div className="card-body">
              <FormItem>
                <h4 className="form-label text-black mt-1">
                  <strong>Project Name</strong>
                </h4>
                {getFieldDecorator('projectName', {
                  rules: [{ required: true, message: 'Please input the project name' }],
                })(<Input size="large" />)}
              </FormItem>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 className="text-black mt-2">
                <strong>Project Requirements</strong>
              </h4>

              <div className="row">
                <div style={{ marginLeft: 15 }}>
                  <h6 className="form-label mt-4">Requires Volunteers</h6>
                  <Select defaultValue="Yes" style={{ width: 120, marginTop: 3 }}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Requires Donations</h6>
                  <Select defaultValue="Yes" style={{ width: 120, marginTop: 3 }}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Volunteers Needed</h6>
                  <FormItem>
                    {getFieldDecorator('volunteersNeeded', {
                      rules: [
                        { required: true, message: 'Please input the field' },
                        { validator: this.validateNumber },
                      ],
                    })(<Input style={{ width: 130 }} />)}
                  </FormItem>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Project Type</h6>
                  <Select defaultValue="Yes" style={{ width: 120, marginTop: 3 }}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
              </div>

              <div className="row">
                <div style={{ marginLeft: 15 }}>
                  <h6 className="form-label mt-2">Description</h6>
                  <FormItem>
                    {getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Please input the field' }],
                    })(<TextArea rows={4} style={{ width: 600 }} />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginLeft: 15 }}>
                  <h6 className="form-label mt-2">Location</h6>
                  <Select style={{ width: 120, marginTop: 3 }} placeholder="Country">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                  <Select style={{ width: 120, marginTop: 3 }} placeholder="Area">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </div>
                <div style={{ marginLeft: 100 }}>
                  <h6 className="form-label mt-2">Start and end date</h6>
                  <RangePicker />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Button
              style={{ width: 150 }}
              type="primary"
              htmlType="submit"
              className="clientNewPage__saveBtn mr-3"
            >
              Add project
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
          </div> */}
        </Form>
      </div>
    )
  }
}

export default ProjectNew
