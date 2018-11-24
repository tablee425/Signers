import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Icon, Table, Card, Avatar, Tabs } from 'antd'
import { clientData, projectData } from './data.json'
import { Link, withRouter } from 'react-router-dom'

const TabPane = Tabs.TabPane

class Dashboard extends React.Component {
  state = {
    clientData: clientData,
    projectData: projectData,
    clientsColumns: [],
    projectsColumns: [],
  }

  componentDidMount() {
    this.setState({
      clientsColumns: [
        {
          title: 'Picture',
          dataIndex: 'Picture',
          key: 'picture',
          render: (text, record) => (
            <span>
              <Avatar src={record.Picture} style={{ width: 30, height: 30 }} />
            </span>
          ),
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
        }
      ],
      projectsColumns: [
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
      ]
    })
  }

  render() {
    const { clientsColumns, projectsColumns } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-xl-3">
            <Card style={{ width: 300 }}>
              <h1>129</h1>
              <h5>Active Projects</h5>
            </Card>
          </div>
          <div className="col-xl-3">
            <Card style={{ width: 300 }}>
              <h1>129</h1>
              <h5>Active Clients</h5>
            </Card>
          </div>
          <div className="col-xl-3">
            <Card style={{ width: 300 }}>
              <h1>$12,932</h1>
              <h5>Assets in Active Projects</h5>
            </Card>
          </div>
        </div>
        
        <section className="card mt-5">
          <div className="card-body">
            <Tabs defaultActiveKey="1" onChange={this.onChangeTabs}>
              <TabPane tab={<span>Clients</span>} key="1">
                <Table
                  columns={clientsColumns}
                  dataSource={this.state.clientData}
                  onChange={this.handleChange}
                />
              </TabPane>
              <TabPane tab={<span>Projects</span>} key="2">
                <Table
                  columns={projectsColumns}
                  dataSource={this.state.projectData}
                  onChange={this.handleChange}
                />
              </TabPane>
              <TabPane tab={<span>Assets</span>} key="3">
                <Table
                  columns={clientsColumns}
                  dataSource={this.state.clientData}
                  onChange={this.handleChange}
                />
              </TabPane>
            </Tabs>
          </div>
        </section>
      </div>
    )
  }
}

export default Dashboard
