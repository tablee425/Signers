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
import { US_Region, Mexico_Region } from './data.json'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import config from '../../../../web-config'

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

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

@connect(mapStateToProps)
@Form.create()
class ProjectNew extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    redirect: 0,
    projectImage: null,
    previewUrl: null,
    selectedCountry: '',
    selectedArea: '',
    areaArray: [],
  }

  componentDidMount() {
    this.setState({ page: 1, pageSize: 10 })
  }

  checkDigital = (rule, value, callback) => {
    const form = this.props.form
    if (value && !/^\d+$/.test(value)) {
      callback('This field must be a number!')
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
    const { userState } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.projectImage) {
          let formData = new FormData()
          formData.append('file', this.state.projectImage)
          axios
            .post(`${baseUrl}/upload`, formData)
            .then(res => {
              if (res.data.success) {
                axios
                  .post(`${baseUrl}/projects/new`, {
                    owner: config.clientKey,
                    name: values.projectName,
                    allowed_age: 15,
                    date_registered: new Date(values.projectPeriod[0].format()),
                    date_expiration: new Date(values.projectPeriod[1].format()),
                    expected_voters: values.votersNeeded,
                    expects_volunteers: values.selectedDonationsFlag == 'Yes',
                    expects_donations: values.selectedDonationsFlag == 'Yes',
                    unit_voters: values.perVoterCount,
                    price_for_signers_for_100_voters: values.pricePerVoters,
                    type: values.projectType,
                    country: this.state.selectedCountry,
                    location: this.state.selectedArea,
                    donations_url: values.donationsUrl,
                    description: values.description,
                    photos: [res.data.newUuid],
                  })
                  .then(res1 => {
                    if (res1.data.success) {
                      this.setState({ redirect: 2 })
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
          alert('Please upload the project image')
        }
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

  onCancelCreate = () => {
    this.setState({ redirect: 2 }) // if role is admin
  }

  handleFileSelected = (event, file) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({ projectImage: file, previewUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  handleSelectCountry = value => {
    this.setState({ selectedCountry: value, areaArray: value == 'USA' ? US_Region : Mexico_Region })
  }

  handleSelectArea = value => {
    this.setState({ selectedArea: value })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { redirect, projectImage, previewUrl, areaArray } = this.state

    if (config.clientKey == '') {
      return <Redirect push to="/clients" />
    } else if (redirect == 1) {
      return <Redirect push to="/projects" />
    } else if (redirect == 2) {
      return <Redirect push to="/clients/detail" />
    }
    let src = previewUrl || 'resources/images/plus.png'
    let regions = []
    areaArray.map((item, index) => {
      regions.push(
        <Option key={`Region_${index}`} value={item.name}>
          {item.name}
        </Option>,
      )
    })
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="row">
            <div style={{ width: 230, height: 425, backgroundColor: 'white', padding: 15 }}>
              <img style={{ width: 200, height: 350 }} src={src} />
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
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}
                >
                  <FormItem>
                    {getFieldDecorator('projectName', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(
                      <Input
                        style={{ width: 400, height: 40, fontWeight: 'bold', fontSize: 20 }}
                        placeholder="Project Name"
                      />,
                    )}
                  </FormItem>
                  <div className="row" style={{ marginRight: 30, marginTop: 2 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 140, height: 35, marginRight: 15 }}
                    >
                      Save
                    </Button>
                    <Button
                      type="normal"
                      style={{ width: 140, height: 35 }}
                      onClick={this.onCancelCreate}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Project Type</label>
                  <FormItem>
                    {getFieldDecorator('projectType', {
                      rules: [{ required: true, message: 'Please select the project type' }],
                    })(
                      <Select style={{ width: 180, height: 40 }} defaultValue="Political">
                        <Option value="Political">Political</Option>
                        <Option value="NGO">NGO</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Project Cost</label>
                  <FormItem>
                    {getFieldDecorator('projectCost', {
                      rules: [
                        { required: true, message: 'Please input the project cost' },
                        { validator: this.checkDigital },
                      ],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Voters Needed</label>
                  <FormItem>
                    {getFieldDecorator('votersNeeded', {
                      rules: [
                        { required: true, message: 'Please input the voters needed' },
                        { validator: this.checkDigital },
                      ],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Accepts Volunteers</label>
                  <FormItem>
                    {getFieldDecorator('selectedVolunteerFlag', {
                      rules: [{ required: true, message: 'Please select the accepts volunteers' }],
                    })(
                      <Select style={{ width: 180, height: 40 }} defaultValue="Yes">
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Accepts Donations</label>
                  <FormItem>
                    {getFieldDecorator('selectedDonationsFlag', {
                      rules: [{ required: true, message: 'Please select the accepts donations' }],
                    })(
                      <Select style={{ width: 180, height: 40 }} defaultValue="Yes">
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Donations Value</label>
                  <FormItem>
                    {getFieldDecorator('donationsValue', {
                      rules: [
                        { required: true, message: 'Please input the donations value' },
                        { validator: this.checkDigital },
                      ],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 230 }}>
                  <label className="form-label mb-0">Donations Url</label>
                  <FormItem>
                    {getFieldDecorator('donationsUrl', {
                      rules: [{ required: true, message: 'Please input the donations url' }],
                    })(<Input style={{ width: 590, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('perVoterCount', {
                      rules: [{ required: true, message: 'Please select the voters' }],
                    })(
                      <Select style={{ width: 180, height: 40 }} defaultValue={100}>
                        <Option value={10}>For 10</Option>
                        <Option value={100}>For 100</Option>
                        <Option value={1000}>For 1000</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Price Per Voters</label>
                  <FormItem>
                    {getFieldDecorator('pricePerVoters', {
                      rules: [
                        { required: true, message: 'Please input the price' },
                        { validator: this.checkDigital },
                      ],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Location</label>
                  <FormItem>
                    {getFieldDecorator('selectedCountry', {
                      rules: [{ required: true, message: 'Please select the country' }],
                    })(
                      <Select
                        style={{ width: 180, height: 40 }}
                        placeholder="Country"
                        onChange={this.handleSelectCountry}
                      >
                        <Option value="USA">USA</Option>
                        <Option value="Mexico">Mexico</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0" style={{ color: 'transparent' }}>
                    Area
                  </label>
                  <FormItem>
                    {getFieldDecorator('selectedArea', {
                      rules: [{ required: true, message: 'Please select the area' }],
                    })(
                      <Select
                        style={{ width: 180, height: 40 }}
                        placeholder="Area"
                        onChange={this.handleSelectArea}
                      >
                        {regions}
                      </Select>,
                    )}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 230 }}>
                  <label className="form-label mb-0">Start / end date</label>
                  <FormItem>
                    {getFieldDecorator('projectPeriod', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(<RangePicker style={{ width: 385 }} />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Description</label>
                  <FormItem>
                    {getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Please input the project name' }],
                    })(
                      <TextArea
                        rows={6}
                        style={{ width: 1000 }}
                        placeholder="Enter Project Description"
                      />,
                    )}
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default ProjectNew
