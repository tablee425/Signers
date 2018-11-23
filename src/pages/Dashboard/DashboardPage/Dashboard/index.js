import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Icon, Table, Card } from 'antd'

class Dashboard extends React.Component {
  state = {
  }

  render() {
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
      </div>
    )
  }
}

export default Dashboard
