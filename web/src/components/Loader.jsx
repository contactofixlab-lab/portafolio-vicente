import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { header } from '../content'

const KEY = 'pv-intro-visto'

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Cortina de carga de la primera visita: logo que late, barra de progreso y salida en cortina. */
export default function Loader() {
  const [visible, setVisible] = useState(() => !alreadySeen())

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      setVisible(false)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* sin almacenamiento disponible: se mostrará de nuevo, sin consecuencias */
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <span className="absolute inset-0 rounded-3xl bg-white/40 animate-pulse-ring" />
              <motion.div
                initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="relative grid h-24 w-24 place-items-center rounded-3xl bg-white font-display text-5xl font-extrabold text-primary-600 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.35)]"
              >
                {header.logoLetter}
              </motion.div>
            </div>
            <div className="h-1.5 w-52 overflow-hidden rounded-full bg-white/25">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
              />
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-display text-lg font-bold tracking-wide">
              {header.logoText}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
