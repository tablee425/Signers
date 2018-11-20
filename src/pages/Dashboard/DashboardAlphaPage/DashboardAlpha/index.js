import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Icon, Table } from 'antd'
import { tableData } from './data.json'

class DashboardAlpha extends React.Component {
  state = {
    tableData: tableData,
  }

  render() {
    const tableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Office',
        dataIndex: 'office',
        key: 'office',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        sorter: (a, b) => a.salary - b.salary,
      },
    ]

    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Last Week Statistics</span>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <ChartCard
              title={'Transactions'}
              amount={'1240'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [2, 11, 8, 14, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-xl-4">
            <ChartCard
              title={'Income'}
              amount={'$1,240.00'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [20, 80, 67, 120, 132, 66, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-xl-4">
            <ChartCard
              title={'Outcome'}
              amount={'$240.56'}
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [42, 40, 80, 67, 84, 20, 97],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Recently Referrals</div>
                <div className="utils__titleDescription">
                  Block with important Recently Referrals information
                </div>
              </div>
              <div className="card-body">
                <Table
                  columns={tableColumns}
                  dataSource={this.state.tableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Your Cards (3)</span>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-bookmark'}
              name={'Matt Daemon'}
              number={'4512-XXXX-1678-7528'}
              type={'VISA'}
              footer={'Expires at 02/20'}
              sum={'$2,156.78'}
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-bookmark'}
              name={'David Beckham'}
              number={'8748-XXXX-1678-5416'}
              type={'MASTERCARD'}
              footer={'Expires at 03/22'}
              sum={'$560,245.35'}
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'lnr lnr-hourglass'}
              name={'Mrs. Angelina Jolie'}
              number={'6546-XXXX-1678-1579'}
              type={'VISA'}
              footer={'Locked Temporary'}
              sum={'$1,467,98'}
            />
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Your Accounts (6)</span>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <PaymentAccount
              icon={'lnr lnr-inbox'}
              number={'US 4658-1678-7528'}
              footer={'Current month charged: $10,200.00'}
              sum={'$2,156.78'}
            />
          </div>
          <div className="col-lg-6">
            <PaymentAccount
              icon={'lnr lnr-inbox'}
              number={'IBAN 445646-8748-4664-1678-5416'}
              footer={'Current month charged: $1,276.00'}
              sum={'$560,245.35'}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <PaymentAccount
              icon={'lnr lnr-inbox'}
              number={'US 4658-1678-7528'}
              footer={'Current month charged: $10,200.00'}
              sum={'$2,156.78'}
            />
          </div>
          <div className="col-lg-6">
            <PaymentAccount
              icon={'lnr lnr-inbox'}
              number={'IBAN 445646-8748-4664-1678-5416'}
              footer={'Current month charged: $1,276.00'}
              sum={'$560,245.35'}
            />
          </div>
        </div>
        <div className="utils__title mb-3">
          <span className="text-uppercase font-size-16">Recent Transactions (167)</span>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <PaymentTx
              income={false}
              amount={'-$100.00'}
              info={'US 4658-1678-7528'}
              footer={'To AMAZON COPR, NY, 1756'}
            />
            <PaymentTx
              income={true}
              amount={'+27,080.00'}
              info={'4512-XXXX-1678-7528'}
              footer={'To DigitalOcean Cloud Hosting, Winnetka, LA'}
            />
            <PaymentTx
              income={false}
              amount={'-100,000.00'}
              info={'6245-XXXX-1678-3256'}
              footer={'To Tesla Cars, LA, USA'}
            />
            <div className="text-center pb-5">
              <Button type="primary" className="width-200" loading>
                Load More...
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAlpha
