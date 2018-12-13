import React from 'react'
import {
  Collapse,
  Slider,
  Calendar,
  Badge,
  Table,
  Input,
  Dropdown,
  Button,
  Icon,
  Menu,
  Avatar,
} from 'antd'
import './style.scss'
import { tableData } from './data.json'
import { Link, withRouter } from 'react-router-dom'
import config from '../../../../web-config'
import { Redirect } from 'react-router'
import axios from 'axios'
import { baseUrl } from '../../../../config'

const Panel = Collapse.Panel

class Report extends React.Component {
  state = {
    redirect: 0,
    clientProjects: [],
  }

  componentDidMount() {
    this.getClientProjects()
  }

  getClientProjects = () => {
    const { userState } = this.props
    axios
      .get(`${baseUrl}/projects/list/admin/all`, {})
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

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
  }

  onProjectDetail = key => {
    config.projectKey = key
    this.setState({ redirect: 1 })
  }

  onChangeFilter = e => {
    // console.info(e.target.value)
    let filterStr = e.target.value
    if (filterStr == '') {
      this.setState({ tableData })
    } else {
      let newData = []
      tableData.map(item => {
        if (item.name.includes(filterStr)) {
          newData.push(item)
        } else if (item.Starts.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.Ends.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.vn.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.vs.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.ct.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.expected.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.paid.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.paiddate.toString().includes(filterStr)) {
          newData.push(item)
        }
      })
      this.setState({ tableData: newData })
    }
  }

  convertDateFormat = date => {
    let month = new Date(date).getMonth() + 1
    let day = new Date(date).getDate()
    let year = new Date(date).getFullYear() - 2000
    return `${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}.${
      year < 10 ? '0' : ''
    }${year}`
  }

  render() {
    const { redirect, clientProjects } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
    let renderProjects = []
    clientProjects.map((item, index) => {
      renderProjects.push(
        <div className="reportPage__projectsItem">
          <h4>{item.name}</h4>
          <img
            className="reportPage__item-thumb-img"
            src={`${baseUrl}/image?id=${item.photos[0]}`}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
            <h6>Ends</h6>
            <h6>{this.convertDateFormat(item.date_expiration)}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Voters</h6>
            <h6>{item.signed_voters}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Donations</h6>
            <h6>${item.donations_value}</h6>
          </div>
        </div>,
      )
    })
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Projects Reports</strong>
            <div className="clientPage__searchInputContainer">
              <Input
                className="livesearch__topInput"
                placeholder="Type to search..."
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                style={{ width: 300 }}
                onChange={this.onChangeFilter}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="reportPage__projectsContainer">{renderProjects}</div>
        </div>
      </section>
    )
  }
}

export default Report
