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
import { Redirect } from 'react-router'
import FileInput from 'react-simple-file-input'
import { US_Region, Mexico_Region } from './data.json'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import config from '../../../../web-config'
import moment from 'moment'

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
class ProjectEdit extends React.Component {
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
    project: null,
  }

  componentDidMount() {
    this.getProjectDetails()
  }

  getProjectDetails = () => {
    axios
      .post(`${baseUrl}/project/admin`, {
        project_id: config.projectKey,
      })
      .then(res1 => {
        if (res1.data.success) {
          let project = res1.data.data[0]
          this.setState({
            project,
            previewUrl: `${baseUrl}/image?id=${project.photos[0]}`,
            areaArray: project.country == 'USA' ? US_Region : Mexico_Region,
          })
        } else {
          alert('error')
        }
      })
      .catch(error => {})
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
                  .post(`${baseUrl}/projects/update`, {
                    project_id: config.projectKey,
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
                    cost: values.projectCost,
                    country: values.selectedCountry,
                    location: values.selectedArea,
                    donations_url: values.donationsUrl,
                    description: values.description,
                    photos: [res.data.newUuid],
                    pay_for_votes: values.payForVotes,
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
          axios
            .post(`${baseUrl}/projects/update`, {
              project_id: config.projectKey,
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
              cost: values.projectCost,
              country: values.selectedCountry,
              location: values.selectedArea,
              donations_url: values.donationsUrl,
              description: values.description,
              pay_for_votes: values.payForVotes,
            })
            .then(res1 => {
              if (res1.data.success) {
                this.setState({ redirect: 1 })
              } else {
                alert(res1.data.message)
              }
            })
            .catch(error => {})
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
    this.setState({ redirect: 1 }) // if role is admin
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
    const { redirect, previewUrl, areaArray, project } = this.state

    if (config.projectKey == '') {
      return <Redirect push to="/projects" />
    } else if (redirect == 1) {
      return <Redirect push to="/projects" />
    }

    let projectName = project ? project.name : ''
    let projectType = project ? project.type : ''
    let projectCost = project ? `${project.cost}` : ''
    let votersNeeded = project ? project.expected_voters : ''
    let volunteersFlag = project ? (project.expects_volunteers ? 'Yes' : 'No') : ''
    let donationsFlag = project ? (project.expects_donations ? 'Yes' : 'No') : ''
    let donationsUrl = project ? project.donations_url : ''
    let perVoterCount = project ? project.unit_voters : ''
    let pricePerVoters = project ? `${project.price_for_signers_for_100_voters}` : ''
    let projectCountry = project ? project.country : ''
    let projectLocation = project ? project.location : ''
    let description = project ? project.description : ''
    let payForVotes = project ? project.pay_for_votes : false
    let projectStartDate = project ? moment(project.date_registered) : moment()
    let projectEndDate = project ? moment(project.date_expiration) : moment()

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
            <div style={{ width: 120, height: 220, backgroundColor: 'white', padding: 10 }}>
              <img style={{ width: 100, height: 200 }} src={src} />
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
                <div className="clientNewPage__changeProjectImageButton">Change Image</div>
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
                      initialValue: projectName,
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
                      initialValue: projectType,
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
                      initialValue: projectCost,
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
                      initialValue: votersNeeded,
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
                      initialValue: volunteersFlag,
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
                      initialValue: donationsFlag,
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
                  <label className="form-label mb-0">Donations Url</label>
                  <FormItem>
                    {getFieldDecorator('donationsUrl', {
                      initialValue: donationsUrl,
                      rules: [{ required: true, message: 'Please input the donations url' }],
                    })(<Input style={{ width: 590, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">For Every XXX Voters</label>
                  <FormItem>
                    {getFieldDecorator('perVoterCount', {
                      initialValue: perVoterCount,
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
                      initialValue: pricePerVoters,
                      rules: [
                        { required: true, message: 'Please input the price' },
                        { validator: this.checkDigital },
                      ],
                    })(<Input style={{ width: 180, height: 40 }} placeholder="" />)}
                  </FormItem>
                </div>
                <div style={{ marginTop: 15, marginLeft: 25 }}>
                  <label className="form-label mb-0">Pay For Votes</label>
                  <FormItem>
                    {getFieldDecorator('payForVotes', {
                      initialValue: payForVotes,
                      rules: [{ required: true, message: 'Please select the pay for votes' }],
                    })(
                      <Select style={{ width: 180, height: 40 }}>
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>,
                    )}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div style={{ marginTop: 15 }}>
                  <label className="form-label mb-0">Location</label>
                  <FormItem>
                    {getFieldDecorator('selectedCountry', {
                      initialValue: projectCountry,
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
                      initialValue: projectLocation,
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
                  <label className="form-label mb-0">Start / End Date</label>
                  <FormItem>
                    {getFieldDecorator('projectPeriod', {
                      initialValue: [projectStartDate, projectEndDate],
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
                      initialValue: description,
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

export default ProjectEdit
