import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Signers from './Signers'

class SignersPage extends React.Component {
  static defaultProps = {
    pathName: 'Signers',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Signers" />
        <Signers />
      </Page>
    )
  }
}

export default SignersPage
