import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import Loader from './Loader'
import ScrollProgress from './ScrollProgress'

/** Estructura fija del sitio: el menú y el footer no se vuelven a montar al cambiar de página. */
export default function Layout({ children, pageKey }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pageKey])

  return (
    <div className="flex flex-col min-h-screen bg-primary-50">
      <Loader />
      <ScrollProgress />
      <Header />
      <motion.main
        key={pageKey}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
