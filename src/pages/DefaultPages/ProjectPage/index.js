import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Project from './Project'

class ProjectPage extends React.Component {
  static defaultProps = {
    pathName: 'Projects',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Projects" />
        <Project />
      </Page>
    )
  }
}

export default ProjectPage
