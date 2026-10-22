import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Layers, Briefcase, Cpu, Mail, Sparkles } from 'lucide-react'
import { header } from '../content'

const ICONS = {
  '#home': Home,
  '#proyectos': Layers,
  '#trayectoria': Briefcase,
  '#habilidades': Cpu,
  '#contacto': Mail
}

function currentHash() {
  const hash = window.location.hash || '#home'
  return hash.startsWith('#proyecto/') ? '#proyectos' : hash
}

/** Menú flotante de vidrio, separado de los bordes, con la opción activa que se desliza. */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(currentHash)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onHash = () => {
      setActive(currentHash())
      setIsOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  const navItems = header.nav

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none"
      style={{ paddingTop: scrolled ? 10 : 18, transition: 'padding .3s' }}
      role="banner"
    >
      <nav
        aria-label="Navegación principal"
        className={`pointer-events-auto relative flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border border-white/30 bg-primary-500/90 backdrop-blur-xl px-2 sm:px-3 transition-all duration-300 ${
          scrolled ? 'py-1.5 shadow-[0_22px_50px_-14px_rgba(154,52,18,0.65)]' : 'py-2 shadow-[0_14px_36px_-14px_rgba(154,52,18,0.5)]'
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 pl-1 shrink-0" aria-label="Inicio">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.1 }}
            className="grid place-items-center w-10 h-10 rounded-full bg-white text-primary-600 font-display font-extrabold text-lg shadow-[inset_0_-3px_0_rgba(234,88,12,0.18)]"
          >
            {header.logoLetter}
          </motion.span>
          <span className="hidden sm:block font-display font-bold text-white text-lg tracking-tight">{header.logoText}</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = ICONS[item.href] || Sparkles
            const isActive = active === item.href
            return (
              <li key={item.href + item.label} className="relative group">
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? 'text-primary-600' : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={18} strokeWidth={2} className="relative" />
                  <span className="relative hidden lg:inline">{item.label}</span>
                </a>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-xl bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
                >
                  {item.label}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:flex items-center pr-1 shrink-0">
          <span className="relative flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-emerald-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {header.availability.replace(/^[^\p{L}\p{N}]+/u, '')}
          </span>
        </div>

        <motion.button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden grid place-items-center w-10 h-10 rounded-full bg-white/20 text-white"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mt-3 w-full max-w-4xl rounded-[2rem] border border-white/60 bg-white/90 backdrop-blur-xl p-3 shadow-soft md:hidden"
          >
            {navItems.map((item, i) => {
              const Icon = ICONS[item.href] || Sparkles
              const isActive = active === item.href
              return (
                <motion.a
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 font-semibold ${
                    isActive ? 'bg-primary-500 text-white' : 'text-ink hover:bg-primary-50'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
