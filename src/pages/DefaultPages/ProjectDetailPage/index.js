import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProjectDetail from './ProjectDetail'

class ProjectDetailPage extends React.Component {
  static defaultProps = {
    pathName: 'Project Details',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="New Project" />
        <ProjectDetail />
      </Page>
    )
  }
}

export default ProjectDetailPage
