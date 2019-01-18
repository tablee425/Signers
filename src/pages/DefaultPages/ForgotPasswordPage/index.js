import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ForgotPassword from './ForgotPassword'

class ForgotPasswordPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Helmet title="Forgot Password" />
        <ForgotPassword match={match} />
      </Page>
    )
  }
}

export default ForgotPasswordPage
