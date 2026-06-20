import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Badge from './ui/Badge'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-lg transition-colors" role="banner">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Navegación principal">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-lg text-gray-800 dark:text-white">Vicente</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
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

            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-800 dark:text-white" />
            ) : (
              <Menu size={24} className="text-gray-800 dark:text-white" />
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
              className="md:hidden border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 space-y-3"
              id="mobile-menu"
              role="navigation"
              aria-label="Menú móvil"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <Badge variant="success" animated>
                  🟢 Disponible
                </Badge>
                <DarkModeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
