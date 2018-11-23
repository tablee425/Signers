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
import { data } from './data.json'

const Option = Select.Option
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { TextArea } = Input

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
          <div className="card">
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
          </div>
        </Form>
      </div>
    )
  }
}

export default ProjectNew
