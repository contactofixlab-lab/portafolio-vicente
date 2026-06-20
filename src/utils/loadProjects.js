// Carga automáticamente los proyectos desde projects-index.json
export async function loadProjectsIndex() {
  try {
    const response = await fetch('/projects-index.json')
    if (!response.ok) {
      throw new Error('No se pudo cargar projects-index.json')
    }
    const data = await response.json()
    return data.proyectos || []
  } catch (error) {
    console.error('Error cargando proyectos:', error)
    // Fallback a los datos por defecto si falla
    return []
  }
}

// Hook para usar en componentes React
import { useState, useEffect } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await loadProjectsIndex()
        setProjects(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return { projects, loading, error }
}
