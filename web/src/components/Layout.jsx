import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import Loader from './Loader'
import ScrollProgress from './ScrollProgress'

/**
 * Estructura fija del sitio: el menú y el footer no se vuelven a montar al cambiar de página.
 * Al navegar, la cortina de burbujas tapa la pantalla; recién entonces se cambia la página y se vuelve arriba.
 */
export default function Layout({ children, pageKey }) {
  const [view, setView] = useState({ children, pageKey })
  const [navTick, setNavTick] = useState(0)
  const latest = useRef({ children, pageKey })
  latest.current = { children, pageKey }

  useEffect(() => {
    if (pageKey !== view.pageKey) setNavTick((t) => t + 1)
  }, [pageKey, view.pageKey])

  const onCovered = useCallback(() => {
    setView(latest.current)
    window.scrollTo(0, 0)
  }, [])

  // Mientras la cortina no cambia la página, se sigue mostrando la anterior; dentro de la misma página el contenido se mantiene vivo.
  const shown = pageKey === view.pageKey ? children : view.children

  return (
    <div className="flex flex-col min-h-screen bg-primary-50">
      <Loader navTick={navTick} onCovered={onCovered} />
      <ScrollProgress />
      <Header />
      <motion.main
        key={view.pageKey}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {shown}
      </motion.main>
      <Footer joined={view.pageKey.startsWith('contacto')} />
      <FloatingWhatsApp />
    </div>
  )
}
