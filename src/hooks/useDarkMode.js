import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar preferencia guardada al montar
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved !== null) {
      setIsDark(JSON.parse(saved))
    } else {
      setIsDark(prefersDark)
    }

    setIsLoaded(true)
  }, [])

  // Actualizar DOM y localStorage cuando cambia
  useEffect(() => {
    if (!isLoaded) return

    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDark, isLoaded])

  const toggle = () => setIsDark(!isDark)

  return { isDark, toggle, isLoaded }
}
