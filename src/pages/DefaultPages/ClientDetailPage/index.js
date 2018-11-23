import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ClientDetail from './ClientDetail'

class ClientDetailPage extends React.Component {
  static defaultProps = {
    pathName: 'Client Name',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clients - Edit" />
        <ClientDetail />
      </Page>
    )
  }
}

export default ClientDetailPage
