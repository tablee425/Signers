import React from 'react'
import PaymentCard from 'components/CleanComponents/PaymentCard'
import PaymentAccount from 'components/CleanComponents/PaymentAccount'
import PaymentTx from 'components/CleanComponents/PaymentTx'
import ChartCard from 'components/CleanComponents/ChartCard'
import { Button, Input, Form, Modal } from 'antd'
import { clientData, projectData } from './data.json'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'
import axios from 'axios'
import { baseUrl } from '../../../../config'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  userState: state.app.userState,
})

@Form.create()
@connect(mapStateToProps)
class Dashboard extends React.Component {
  state = {
    clientProjects: [],
    modalVisible: false,
    projectIndex: 0,
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

  showModal = index => {
    this.props.form.setFieldsValue({
      modalDonation: this.state.clientProjects[index].donations_value,
    })
    this.setState({ modalVisible: true, projectIndex: index })
  }

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(`${baseUrl}/update/donation`, {
            project_id: this.state.clientProjects[this.state.projectIndex]._id,
            donations_value: values.modalDonation,
          })
          .then(res => {
            if (res.data.success) {
              this.setState({ modalVisible: false })
              this.getClientProjects()
            } else {
              this.setState({ modalVisible: false })
            }
          })
          .catch(error => {
            this.setState({ modalVisible: false })
          })
      }
    })
  }

  handleCancel = e => {
    this.setState({ modalVisible: false })
  }

  checkDigital = (rule, value, callback) => {
    const form = this.props.form
    if (value && !/^\d+$/.test(value)) {
      callback('This field must be a number!')
    } else {
      callback()
    }
  }

  render() {
    const { clientProjects, modalVisible } = this.state
    const { userState } = this.props
    const { getFieldDecorator } = this.props.form

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
            <Button
              type="primary"
              onClick={() => {
                this.showModal(index)
              }}
            >
              Update Donations
            </Button>
          </div>
        </div>,
      )
    })
    return (
      <div>
        <section className="card mt-5">
          <Modal
            title="Project Donations"
            visible={modalVisible}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Save
              </Button>,
            ]}
          >
            <Form onSubmit={this.handleSubmitModal}>
              <div className="dashboardPage__modalContainer">
                <label>Total amount donated as of today</label>
                <FormItem>
                  {getFieldDecorator('modalDonation', {
                    rules: [
                      { validator: this.checkDigital },
                      { required: true, message: 'Please input the donation value' },
                    ],
                  })(<Input style={{ width: 180, height: 40, marginTop: 20 }} />)}
                </FormItem>
              </div>
            </Form>
          </Modal>
          <div className="dashboardPage__projectsContainer">{renderProjects}</div>
        </section>
      </div>
    )
  }
}

export default Dashboard
