import Layout from '../components/Layout'
import ProjectDetail from '../sections/ProjectDetail'

export default function ProjectDetailPage({ projectId }) {
  return (
    <Layout>
      <ProjectDetail projectId={projectId} />
    </Layout>
  )
}
