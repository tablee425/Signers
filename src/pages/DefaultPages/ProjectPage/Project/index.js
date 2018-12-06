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

const Panel = Collapse.Panel

class Project extends React.Component {
  state = {
    tableData: tableData,
    tableColumns: [],
    redirect: 0,
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
          dataIndex: 'volunteers',
          key: 'volunteers',
        },
        {
          title: 'Donations',
          dataIndex: 'donations',
          key: 'donations',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Starts',
          dataIndex: 'Starts',
          key: 'Starts',
        },
        {
          title: 'Ends',
          dataIndex: 'Ends',
          key: 'Ends',
        },
        {
          title: 'Voters Needed',
          dataIndex: 'vn',
          key: 'vn',
          sorter: (a, b) => a.vn - b.vn,
        },
        {
          title: 'Voters Signed',
          dataIndex: 'vs',
          key: 'vs',
          sorter: (a, b) => a.vs - b.vs,
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button
                onClick={() => {
                  this.onProjectDetail(record.key)
                }}
              >
                Detail
              </Button>
            </span>
          ),
        },
      ],
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
        } else if (item.volunteers.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.donations.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.description.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.Starts.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.Ends.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.vn.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.vs.toString().includes(filterStr)) {
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
    const { redirect, tableColumns } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Project List</strong>
            <div className="clientPage__searchInputContainer">
              <Input
                className="livesearch__topInput"
                placeholder="Type to search..."
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                style={{ width: 300 }}
                onChange={this.onChangeFilter}
              />
              {/* <Link to={`/projects/new`} className="text-muted">
                <Button type="primary">New Project</Button>
              </Link> */}
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={tableColumns}
            dataSource={this.state.tableData}
            onChange={this.handleChange}
          />
        </div>
      </section>
    )
  }
}

export default Project
