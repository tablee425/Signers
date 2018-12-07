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
import config from '../../../../web-config'

const Option = Select.Option
const { RangePicker } = DatePicker
const FormItem = Form.Item
const { TextArea } = Input

@Form.create()
class ProjectDetail extends React.Component {
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

  goToEditProject = () => {
    this.setState({ redirect: 2 })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { redirect } = this.state
    if (config.projectKey == '') {
      return <Redirect push to="/projects" />
    } else if (redirect == 1) {
      return <Redirect push to="/projects" />
    } else if (redirect == 2) {
      return <Redirect push to="/projects/edit" />
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="card">
            <div className="card-body">
              <h4 className="form-label text-black mt-1">
                <h2>Project Name</h2>
              </h4>
              <div className="productDetailPage__editprojectBtn">
                <Button type="primary" onClick={this.goToEditProject}>
                  Edit Project
                </Button>
              </div>
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
                  <h6 className="mt-3">Yes</h6>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Requires Donations</h6>
                  <h6 className="mt-3">Yes</h6>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Volunteers Needed</h6>
                  <h6 className="mt-3">250</h6>
                </div>
                <div style={{ marginLeft: 60 }}>
                  <h6 className="form-label mt-4">Project Type</h6>
                  <h6 className="mt-3">Political</h6>
                </div>
              </div>

              <div className="row">
                <div style={{ marginLeft: 15, marginTop: 60 }}>
                  <h6 className="form-label mt-2">Description</h6>
                  <h6 className="mt-3">Sample...</h6>
                </div>
              </div>

              <div className="row">
                <div style={{ marginLeft: 15, marginTop: 60 }}>
                  <h6 className="form-label mt-2">Location</h6>
                  <h6 className="mt-3">United States / New Jersey</h6>
                </div>
                <div style={{ marginLeft: 100, marginTop: 60 }}>
                  <h6 className="form-label mt-2">Start and end date</h6>
                  <h6 className="mt-3">{`2018.11.08      -      2018.11.08`}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Button
              style={{ width: 150 }}
              type="primary"
              htmlType="submit"
              className="productDetailPage__saveBtn mr-3"
            >
              Add project
            </Button>
            <Button
              style={{ width: 150 }}
              className="productDetailPage__cancelBtn"
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

export default ProjectDetail
