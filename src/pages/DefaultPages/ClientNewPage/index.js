import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ClientNew from './ClientNew'

class ClientNewPage extends React.Component {
  static defaultProps = {
    pathName: 'New Client',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="New Client" />
        <ClientNew />
      </Page>
    )
  }
}

export default ClientNewPage
