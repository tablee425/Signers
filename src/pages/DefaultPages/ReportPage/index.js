import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Report from './Report'

class ReportPage extends React.Component {
  static defaultProps = {
    pathName: 'Reports',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Reports" />
        <Report />
      </Page>
    )
  }
}

export default ReportPage
