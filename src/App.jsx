import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import ProjectDetail from './pages/ProjectDetail'
import './styles/globals.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [projectId, setProjectId] = useState(null)

  // Manejo de rutas por URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'

      // Parsear rutas con parámetros: #proyecto/1
      if (hash.startsWith('proyecto/')) {
        const id = hash.split('/')[1]
        setProjectId(id)
        setCurrentPage('proyecto-detalle')
      } else {
        setCurrentPage(hash)
        setProjectId(null)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Ejecutar al montar

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Renderizar página según ruta
  const renderPage = () => {
    switch (currentPage) {
      case 'proyectos':
        return <Proyectos />
      case 'proyecto-detalle':
        return <ProjectDetail projectId={projectId} />
      case 'home':
      default:
        return <Home />
    }
  }

  return renderPage()
}

export default App
