import React from 'react'
import { Collapse, Slider, Calendar, Badge, Table, Input, Dropdown, Button, Icon, Menu } from 'antd'
import './style.scss'
import { tableData } from './data.json'
import { Link, withRouter } from 'react-router-dom'
import config from '../../../../web-config'
import { Redirect } from 'react-router'

const Panel = Collapse.Panel

class Client extends React.Component {
  state = {
    tableData: tableData,
    tableColumns: [],
    redirect: 0
  }

  componentDidMount() {
    this.setState({ tableColumns: [
      {
        title: 'Picture',
        dataIndex: 'Picture',
        key: 'picture',
      },
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '# Total Projects',
        dataIndex: 'tp',
        key: 'tp',
        sorter: (a, b) => a.tp - b.tp,
      },
      {
        title: '# Active Projects',
        dataIndex: 'ap',
        key: 'ap',
        sorter: (a, b) => a.ap - b.ap,
      },
      {
        title: '# Own Signers',
        dataIndex: 'os',
        key: 'os',
        sorter: (a, b) => a.os - b.os,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            {/* <Link to={{pathname: '/clients/detail', state: {foo: 'bar'}}} className="text-muted">
              Edit - {record.key}
            </Link> */}
            <Button onClick={() => {this.onClientDetail(record.key)}}>
              Detail
            </Button>
          </span>
        ),
      },
    ] })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
  }

  onClientDetail = key => {
    config.clientKey = key;
    this.setState({ redirect: 1 })
  }

  onChangeFilter = e => {
    // console.info(e.target.value)
    let filterStr = e.target.value;
    if (filterStr == '') {
      this.setState({ tableData })
    } else {
      let newData = [];
      tableData.map(item => {
        if (item.name.includes(filterStr)) {
          newData.push(item)
        } else if (item.tp.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.ap.toString().includes(filterStr)) {
          newData.push(item)
        } else if (item.os.toString().includes(filterStr)) {
          newData.push(item)
        }
      })
      this.setState({ tableData: newData })  
    }
  }

  render() {
    const { redirect, tableColumns } = this.state
    if (redirect == 1) {
      return <Redirect push to="/clients/detail" />
    }
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Clients</strong>
            <div className="clientPage__searchInputContainer">
              <Input
                className="livesearch__topInput"
                placeholder="Type to search..."
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                style={{ width: 300, marginRight: 15 }}
                onChange={this.onChangeFilter}
              />
              <Link to={`/clients/new`} className="text-muted">
                <Button type="primary">New Client</Button>
              </Link>
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

export default Client
