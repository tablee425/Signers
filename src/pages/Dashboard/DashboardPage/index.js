import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Dashboard from './Dashboard'

class DashboardPage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard" />
        <Dashboard />
      </Page>
    )
  }
}

export default DashboardPage
