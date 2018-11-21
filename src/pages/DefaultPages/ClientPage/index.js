import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Client from './Client'

class ClientPage extends React.Component {
  static defaultProps = {
    pathName: 'Clients',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clients" />
        <Client />
      </Page>
    )
  }
}

export default ClientPage
