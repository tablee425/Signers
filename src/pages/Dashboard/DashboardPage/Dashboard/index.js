import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Icon, Table, Card, Avatar, Tabs } from 'antd'
import { clientData, projectData } from './data.json'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'
import axios from 'axios'
import { baseUrl } from '../../../../config'

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@connect(mapStateToProps)
class Dashboard extends React.Component {
  state = {
    clientProjects: [],
  }

  componentDidMount() {
    this.getClientProjects()
  }

  getClientProjects = () => {
    const { userState } = this.props
    axios
      .post(`${baseUrl}/projects/list/admin`, {
        user_id: userState.clientId,
      })
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

  render() {
    const { clientProjects } = this.state
    const { userState } = this.props
    let renderProjects = []
    clientProjects.map((item, index) => {
      renderProjects.push(
        <div className="dashboardPage__projectsItem" style={{}}>
          <h4>{item.name}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
            <h6>Cost per project</h6>
            <h6>${item.cost}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Total Paid to Signers</h6>
            <h6>${item.total_paid}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>Current Donations</h6>
            <h6>${item.donations_value}</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button type="primary">Update Donations</Button>
          </div>
        </div>,
      )
    })
    return (
      <div>
        <section className="card mt-5">
          <div className="dashboardPage__projectsContainer">{renderProjects}</div>
        </section>
      </div>
    )
  }
}

export default Dashboard
