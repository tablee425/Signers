import React from 'react'
import { Collapse, Slider, Calendar, Badge, Table, Input, Dropdown, Button, Icon, Menu } from 'antd'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'

const Panel = Collapse.Panel

class ClientNew extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {}

  componentDidMount() {
    debugger
  }

  render() {
    return (
      <section className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>New Client</strong>
            <div className="clientNewPage__searchInputContainer" />
          </div>
        </div>
        <div className="card-body" />
      </section>
    )
  }
}

export default ClientNew
