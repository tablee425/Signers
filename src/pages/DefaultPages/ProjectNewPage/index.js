import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProjectNew from './ProjectNew'

class ProjectNewPage extends React.Component {
  static defaultProps = {
    pathName: 'New Project',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="New Project" />
        <ProjectNew />
      </Page>
    )
  }
}

export default ProjectNewPage
