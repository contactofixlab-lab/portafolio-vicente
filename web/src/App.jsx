import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import ProjectDetail from './pages/ProjectDetail'
import TrajectoryPage from './pages/TrajectoryPage'
import SkillsPage from './pages/SkillsPage'
import Contacto from './pages/Contacto'
import { seo, findProject } from './content'
import './styles/globals.css'

function setMeta(name, value) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [projectId, setProjectId] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'

      if (hash.startsWith('proyecto/')) {
        setProjectId(hash.split('/')[1])
        setCurrentPage('proyecto-detalle')
      } else {
        setCurrentPage(hash)
        setProjectId(null)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const project = projectId ? findProject(projectId) : null
    document.title = project ? `${project.title} | ${seo.title}` : seo.title
    setMeta('description', project?.description || seo.description)
    setMeta('keywords', seo.keywords)
  }, [currentPage, projectId])

  const renderPage = () => {
    switch (currentPage) {
      case 'proyectos':
        return <Proyectos />
      case 'proyecto-detalle':
        return <ProjectDetail projectId={projectId} />
      case 'trayectoria':
        return <TrajectoryPage />
      case 'habilidades':
        return <SkillsPage />
      case 'contacto':
        return <Contacto />
      case 'home':
      default:
        return <Home />
    }
  }

  return <Layout pageKey={`${currentPage}-${projectId ?? ''}`}>{renderPage()}</Layout>
}

export default App
