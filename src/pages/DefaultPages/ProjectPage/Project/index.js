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
import { Link, withRouter } from 'react-router-dom'
import config from '../../../../web-config'
import { Redirect } from 'react-router'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import moment from 'moment'

const Panel = Collapse.Panel

class Project extends React.Component {
  state = {
    tableData: [],
    tableColumns: [],
    redirect: 0,
    allProjects: [],
  }

  componentDidMount() {
    this.setState({
      tableColumns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Volunteers',
          key: 'expects_volunteers',
          render: (text, record) => <div>{`${record.expects_volunteers ? 'Yes' : 'No'}`}</div>,
        },
        {
          title: 'Donations',
          key: 'donations',
          render: (text, record) => <div>{`${record.donations ? 'Yes' : 'No'}`}</div>,
        },
        {
          title: 'Description',
          key: 'description',
          render: (text, record) => (
            <div className="projectPage__table_description">{`${record.description}`}</div>
          ),
        },
        {
          title: 'Starts',
          key: 'date_registered',
          render: (text, record) => <div>{`${this.getTimeFormat(record.date_registered)}`}</div>,
        },
        {
          title: 'Ends',
          key: 'date_expiration',
          render: (text, record) => <div>{`${this.getTimeFormat(record.date_expiration)}`}</div>,
        },
        {
          title: 'Voters Needed',
          dataIndex: 'expected_voters',
          key: 'expected_voters',
          sorter: (a, b) => a.expected_voters - b.expected_voters,
        },
        {
          title: 'Voters Signed',
          dataIndex: 'signed_voters',
          key: 'signed_voters',
          sorter: (a, b) => a.signed_voters - b.signed_voters,
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Location',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Action',
          key: '_id',
          render: (text, record) => (
            <span>
              <Button
                onClick={() => {
                  this.onProjectDetail(record._id)
                }}
              >
                Detail
              </Button>
            </span>
          ),
        },
      ],
    })
    this.getAllProjects()
  }

  getTimeFormat = d => {
    let md = moment(d)
    return `${md.month() < 9 ? '0' : ''}${md.month() + 1}.${
      md.date() < 10 ? '0' : ''
    }${md.date()}.${md.year()}`
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
  }

  onProjectDetail = key => {
    config.projectKey = key
    this.setState({ redirect: 1 })
  }

  getAllProjects = () => {
    axios
      .post(`${baseUrl}/projects/list/admin`, {})
      .then(res => {
        if (res.data.success) {
          this.setState({ allProjects: res.data.data, tableData: res.data.data })
        } else {
          this.setState({ tableData: [] })
        }
      })
      .catch(error => {
        this.setState({ tableData: [] })
      })
  }

  onChangeFilter = e => {
    // console.info(e.target.value)
    let filterStr = e.target.value
    if (filterStr == '') {
      this.setState({ tableData: this.state.allProjects })
    } else {
      let newData = []
      this.state.allProjects.map(item => {
        if (item.name.includes(filterStr)) {
          newData.push(item)
        } else if (item.description.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.expected_voters.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.signed_voters.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.type.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.location.toString().includes(filterStr)) {
          newData.push(item)
        }
      })
      this.setState({ tableData: newData })
    }
  }

  render() {
    const { redirect, tableColumns, allProjects, tableData } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{`Projects (${allProjects.length})`}</strong>
            <div className="projectPage__searchInputContainer">
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
          <Table columns={tableColumns} dataSource={tableData} onChange={this.handleChange} />
        </div>
      </section>
    )
  }
}

export default Project
