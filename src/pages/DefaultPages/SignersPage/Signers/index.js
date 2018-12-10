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
import axios from 'axios'
import { baseUrl } from '../../../../config'

const Panel = Collapse.Panel

class Signers extends React.Component {
  state = {
    redirect: 0,
  }

  componentDidMount() {
    this.getAllSigners()
  }

  getAllSigners = () => {
    // axios
    //   .post(`${baseUrl}/projects/list/admin`, {})
    //   .then(res => {
    //     if (res.data.success) {
    //       this.setState({ tableData: res.data.data })
    //     } else {
    //       this.setState({ tableData: [] })
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({ tableData: [] })
    //   })
  }

  render() {
    const { redirect } = this.state
    if (redirect == 1) {
      return <Redirect push to="/projects/detail" />
    }
    return (
      <section className="card">
        <div className="card-header">
        </div>
      </section>
    )
  }
}

export default Signers
