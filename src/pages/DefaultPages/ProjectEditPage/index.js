import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProjectEdit from './ProjectEdit'

class ProjectEditPage extends React.Component {
  static defaultProps = {
    pathName: 'Edit Project',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Edit Project" />
        <ProjectEdit />
      </Page>
    )
  }
}

export default ProjectEditPage
