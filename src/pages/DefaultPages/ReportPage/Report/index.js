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

class Report extends React.Component {
  state = {
    tableData: tableData,
    tableColumns: [],
    redirect: 0,
  }

  componentDidMount() {
    this.setState({
      tableColumns: [
        {
          title: 'Project Name',
          dataIndex: 'name',
          key: 'name',
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
          title: 'Client Team',
          dataIndex: 'ct',
          key: 'ct',
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
          title: 'Expected',
          dataIndex: 'expected',
          key: 'expected',
          sorter: (a, b) => a.expected - b.expected,
        },
        {
          title: 'Paid',
          dataIndex: 'paid',
          key: 'paid',
          sorter: (a, b) => a.paid - b.paid,
        },
        {
          title: 'Paid Date',
          dataIndex: 'paiddate',
          key: 'paiddate',
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

  render() {
    const { redirect, tableColumns } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
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

export default Report
