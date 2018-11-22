import React from 'react'
import { Collapse, Slider, Calendar, Badge, Table, Input, Dropdown, Button, Icon, Menu } from 'antd'
import './style.scss'
import { tableData } from './data.json'
import { Link, withRouter } from 'react-router-dom'

const Panel = Collapse.Panel
const tableColumns = [
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
]

class Client extends React.Component {
  state = {
    tableData: tableData,
  }

  componentDidMount() {}

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
  }

  render() {
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
                onFocus={this.showLiveSearch}
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
