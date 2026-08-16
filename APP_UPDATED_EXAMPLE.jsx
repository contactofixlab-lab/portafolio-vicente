/**
 * App.jsx - Versión Actualizada con localStorage
 *
 * INSTRUCCIONES:
 * 1. Importa DataManager en lugar de los archivos de datos
 * 2. Usa useState para manejar los datos
 * 3. Usa useEffect para suscribirse a cambios
 * 4. Los cambios en la consola admin aparecerán automáticamente
 */

import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import ProjectDetail from './pages/ProjectDetail'
import TrajectoryPage from './pages/TrajectoryPage'
import SkillsPage from './pages/SkillsPage'
import DataManager from './data/data-manager'
import './styles/globals.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [projectId, setProjectId] = useState(null)

  // Estado para datos del portafolio
  const [projects, setProjects] = useState(DataManager.getProjects())
  const [experiences, setExperiences] = useState(DataManager.getExperiences())
  const [skills, setSkills] = useState(DataManager.getSkills())
  const [certificates, setCertificates] = useState(DataManager.getCertificates())

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

  // Suscribirse a cambios en proyectos
  useEffect(() => {
    const unsubscribe = DataManager.subscribe('projects', (updatedProjects) => {
      setProjects(updatedProjects)
    })
    return unsubscribe
  }, [])

  // Suscribirse a cambios en experiencias
  useEffect(() => {
    const unsubscribe = DataManager.subscribe('experiences', (updatedExperiences) => {
      setExperiences(updatedExperiences)
    })
    return unsubscribe
  }, [])

  // Suscribirse a cambios en habilidades
  useEffect(() => {
    const unsubscribe = DataManager.subscribe('skills', (updatedSkills) => {
      setSkills(updatedSkills)
    })
    return unsubscribe
  }, [])

  // Suscribirse a cambios en certificados
  useEffect(() => {
    const unsubscribe = DataManager.subscribe('certificates', (updatedCertificates) => {
      setCertificates(updatedCertificates)
    })
    return unsubscribe
  }, [])

  // Escuchar notificaciones de la consola admin
  useEffect(() => {
    const handlePortafolioUpdate = (event) => {
      console.log('📡 Portafolio actualizado:', event.detail.message)
      // Recargar datos desde localStorage
      setProjects(DataManager.getProjects())
      setExperiences(DataManager.getExperiences())
      setSkills(DataManager.getSkills())
      setCertificates(DataManager.getCertificates())
    }

    window.addEventListener('portafolioDataUpdated', handlePortafolioUpdate)
    return () => window.removeEventListener('portafolioDataUpdated', handlePortafolioUpdate)
  }, [])

  // Renderizar página según ruta
  const renderPage = () => {
    switch (currentPage) {
      case 'proyectos':
        return <Proyectos projects={projects} />
      case 'proyecto-detalle':
        return <ProjectDetail projectId={projectId} projects={projects} />
      case 'trayectoria':
        return <TrajectoryPage experiences={experiences} />
      case 'habilidades':
        return <SkillsPage skills={skills} />
      case 'home':
      default:
        return (
          <Home
            projects={projects}
            experiences={experiences}
            skills={skills}
            certificates={certificates}
          />
        )
    }
  }

  return renderPage()
}

export default App

/**
 * CAMBIOS REQUERIDOS EN COMPONENTES HIJO:
 *
 * 1. Home.jsx
 *    - Recibir props: projects, experiences, skills, certificates
 *    - Usar props en lugar de imports estáticos
 *
 * 2. Proyectos.jsx
 *    - Recibir prop: projects
 *    - Usar prop en lugar de import estático
 *
 * 3. ProjectDetail.jsx
 *    - Recibir props: projectId, projects
 *    - Buscar proyecto en props.projects
 *
 * 4. TrajectoryPage.jsx
 *    - Recibir prop: experiences
 *    - Usar prop en lugar de import estático
 *
 * 5. SkillsPage.jsx
 *    - Recibir prop: skills
 *    - Usar prop en lugar de import estático
 *
 * EJEMPLO DE ACTUALIZACIÓN EN COMPONENTE:
 *
 * // ANTES:
 * import { projects } from '../data/projects'
 * export default function Proyectos() {
 *   return (
 *     <div>
 *       {projects.map(p => <ProjectCard key={p.id} project={p} />)}
 *     </div>
 *   )
 * }
 *
 * // DESPUÉS:
 * export default function Proyectos({ projects }) {
 *   return (
 *     <div>
 *       {projects.map(p => <ProjectCard key={p.id} project={p} />)}
 *     </div>
 *   )
 * }
 */
