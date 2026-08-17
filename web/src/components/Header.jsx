import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Badge from './ui/Badge'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Contacto', href: '#contacto' }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="sticky top-0 z-50 bg-primary-500 border-b border-primary-600 shadow-sm transition-colors" role="banner">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Navegación principal">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-lg text-white">Vicente</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-white/90 hover:text-white transition-colors font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.a>
            ))}

            <Badge variant="success" animated>
              🟢 Disponible
            </Badge>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/20 mt-4 pt-4 space-y-3"
              id="mobile-menu"
              role="navigation"
              aria-label="Menú móvil"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block text-white/90 hover:text-white py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <Badge variant="success" animated>
                  🟢 Disponible
                </Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
