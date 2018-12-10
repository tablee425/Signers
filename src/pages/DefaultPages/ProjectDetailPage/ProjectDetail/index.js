import React from 'react'
import { Form, Button } from 'antd'
import './style.scss'
import { Redirect } from 'react-router'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import config from '../../../../web-config'

@Form.create()
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    redirect: 0,
    project: null,
  }

  componentDidMount() {
    this.getProjectInfo()
  }

  getProjectInfo = () => {
    axios
      .post(`${baseUrl}/project/admin`, {
        project_id: config.projectKey,
      })
      .then(res1 => {
        if (res1.data.success) {
          this.setState({ project: res1.data.data[0] })
        } else {
          alert('error')
        }
      })
      .catch(error => {})
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

  goToEditProject = () => {
    this.setState({ redirect: 2 })
  }

  closeProject = () => {
    axios
      .post(`${baseUrl}/projects/close`, {
        project_id: config.projectKey,
      })
      .then(res1 => {
        if (res1.data.success) {
          this.setState({ redirect: 1 })
        } else {
          alert('error')
        }
      })
      .catch(error => {})
  }

  render() {
    const { redirect, project } = this.state

    if (config.projectKey == '') {
      return <Redirect push to="/projects" />
    } else if (redirect == 1) {
      return <Redirect push to="/projects" />
    } else if (redirect == 2) {
      return <Redirect push to="/clients/detail" />
    } else if (redirect == 3) {
      return <Redirect push to="/projects/edit" />
    }
    let src = project ? `${baseUrl}/image?id=${project.photos[0]}` : 'resources/images/plus.png'
    let projectName = project ? project.name : ''
    let projectType = project ? project.type : ''
    let projectCost = project ? `$${project.cost}` : ''
    let votersNeeded = project ? project.expected_voters : ''
    let volunteersFlag = project ? (project.expects_volunteers ? 'Yes' : 'No') : ''
    let donationsFlag = project ? (project.expects_donations ? 'Yes' : 'No') : ''
    let donationsValue = project ? `$${project.donations_value}` : ''
    let donationsUrl = project ? project.donations_url : ''
    let pricePerVoters = project
      ? `${project.unit_voters} voters = $${project.price_for_signers_for_100_voters}`
      : ''
    let location = project ? `${project.country} - ${project.location}` : ''
    let startEndDate = project ? `${project.date_registered} - ${project.date_expiration}` : ''
    let description = project ? project.description : ''

    return (
      <div>
        <div className="row">
          <div style={{ width: 230, height: 425, backgroundColor: 'white', padding: 15 }}>
            <img style={{ width: 200, height: 395 }} src={src} />
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
                <h1 style={{ fontWeight: 'bold' }}>{projectName}</h1>
                <div className="row" style={{ marginRight: 30, marginTop: 2 }}>
                  <Button
                    style={{ width: 140, height: 35, marginRight: 15, backgroundColor: '#D1D8E0' }}
                    onClick={() => {
                      this.closeProject()
                    }}
                  >
                    Close Project
                  </Button>
                  <Button
                    style={{ width: 140, height: 35, backgroundColor: '#D1D8E0' }}
                    onClick={() => {
                      this.setState({ redirect: 3 })
                    }}
                  >
                    Edit Project
                  </Button>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ marginTop: 15 }}>
                <label className="productDetailPage__blockLabel">Project Type</label>
                <label className="productDetailPage__marginTopLabel">{projectType}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Project Cost</label>
                <label className="productDetailPage__marginTopLabel">{projectCost}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Voters Needed</label>
                <label className="productDetailPage__marginTopLabel">{votersNeeded}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Accepts Volunteers</label>
                <label className="productDetailPage__marginTopLabel">{volunteersFlag}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Accepts Donations</label>
                <label className="productDetailPage__marginTopLabel">{donationsFlag}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: 20 }}>
              <div style={{ marginTop: 15 }}>
                <label className="productDetailPage__blockLabel">Donations Value</label>
                <label className="productDetailPage__marginTopLabel">{donationsValue}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Donations Url</label>
                <label className="productDetailPage__marginTopLabel" style={{ color: '#378EFF' }}>
                  {donationsUrl}
                </label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 50 }}>
                <label className="productDetailPage__blockLabel">Price Per Voters</label>
                <label className="productDetailPage__marginTopLabel">{pricePerVoters}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: 20 }}>
              <div style={{ marginTop: 15 }}>
                <label className="productDetailPage__blockLabel">Location</label>
                <label className="productDetailPage__marginTopLabel">{location}</label>
              </div>
              <div style={{ marginTop: 15, marginLeft: 25 }}>
                <label className="productDetailPage__blockLabel">Start / End Date</label>
                <label className="productDetailPage__marginTopLabel">{startEndDate}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: 30 }}>
              <div style={{ marginTop: 15 }}>
                <label className="productDetailPage__blockLabel">Description</label>
                <label className="productDetailPage__descLabel">{description}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectDetail
