import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Calendar, BadgeCheck, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Award } from 'lucide-react'
import { certificates as c } from '../content'

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 70, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir * -70, scale: 0.97 })
}

/** Visor a pantalla completa: navegación entre certificados, zoom, teclado y miniaturas. */
export default function CertificateViewer({ items, index, direction = 1, onChange, onClose }) {
  const cert = items[index]
  const [zoomed, setZoomed] = useState(false)
  const stageRef = useRef(null)
  const closeRef = useRef(null)
  const total = items.length
  const src = cert.image || cert.logo

  // El índice se lleva en una referencia para que dos pulsaciones seguidas (antes del siguiente render) no se pisen.
  const current = useRef(index)
  current.current = index
  const go = (step) => {
    current.current = (current.current + step + total) % total
    onChange(current.current, step)
  }

  useEffect(() => {
    setZoomed(false)
  }, [index])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && total > 1) go(1)
      else if (e.key === 'ArrowLeft' && total > 1) go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Al acercar, se centra el documento en el área visible.
  useEffect(() => {
    const el = stageRef.current
    if (zoomed && el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 3
    }
  }, [zoomed])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col bg-night/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
      onClick={onClose}
    >
      <div className="absolute inset-0 dots opacity-20" aria-hidden="true" />

      <header onClick={(e) => e.stopPropagation()} className="relative flex items-center gap-3 px-4 py-3 text-white sm:gap-4 sm:px-6 sm:py-4">
        {cert.logo && <img src={cert.logo} alt="" className="hidden h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1.5 sm:block" />}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-extrabold leading-tight sm:text-2xl">{cert.name}</h3>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck size={15} className="shrink-0 text-accent-300" />
              {cert.issuer}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              {cert.year}
            </span>
          </p>
        </div>
        <span className="hidden rounded-full bg-white/10 px-3 py-1 font-display text-sm font-bold sm:inline">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? 'Alejar' : 'Acercar'}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
        >
          {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        </button>
        <motion.button
          ref={closeRef}
          type="button"
          whileHover={{ rotate: 90, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          aria-label="Cerrar"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-soft outline-none focus-visible:ring-4 focus-visible:ring-accent-400/70"
        >
          <X size={22} />
        </motion.button>
      </header>

      <div className="relative min-h-0 flex-1">
        <div ref={stageRef} onClick={onClose} className={`absolute inset-0 flex ${zoomed ? 'overflow-auto' : 'items-center justify-center overflow-hidden'} px-3 sm:px-20`}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className={zoomed ? 'm-auto shrink-0' : 'flex h-full max-h-full w-full items-center justify-center py-2'}
            >
              {src ? (
                <img
                  src={src}
                  alt={cert.name}
                  draggable={false}
                  onClick={(e) => {
                    e.stopPropagation()
                    setZoomed((z) => !z)
                  }}
                  className={
                    zoomed
                      ? 'block w-[220%] max-w-none cursor-zoom-out rounded-xl bg-white shadow-2xl sm:w-[170%] lg:w-[140%]'
                      : 'max-h-full max-w-full cursor-zoom-in rounded-xl bg-white object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]'
                  }
                />
              ) : (
                <div className="grid h-64 w-full max-w-md place-items-center rounded-3xl bg-white/10 text-white/70">
                  <Award size={72} strokeWidth={1.3} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label="Certificado anterior"
              className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary-700 shadow-glow transition-transform hover:scale-110 sm:left-5"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label="Certificado siguiente"
              className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary-700 shadow-glow transition-transform hover:scale-110 sm:right-5"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}
      </div>

      <footer onClick={(e) => e.stopPropagation()} className="relative flex flex-col gap-3 px-4 pb-4 pt-3 text-white sm:px-6 sm:pb-5">
        {total > 1 && (
          <div className="hidden justify-center gap-2 sm:flex">
            {items.map((it, i) => (
              <button
                key={it.name}
                type="button"
                onClick={() => onChange(i, i > index ? 1 : -1)}
                aria-label={it.name}
                aria-current={i === index}
                className={`h-12 w-16 overflow-hidden rounded-lg border-2 bg-white/10 transition-all ${i === index ? 'scale-110 border-accent-300 shadow-[0_0_18px_rgba(34,229,255,0.55)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {(it.image || it.logo) && <img src={it.image || it.logo} alt="" draggable={false} className="h-full w-full object-cover" />}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-bold text-emerald-300 ring-1 ring-emerald-400/40">{c.verifiedText}</span>
          {src && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition-colors hover:bg-white/20"
            >
              <ExternalLink size={16} />
              Abrir imagen
            </a>
          )}
          {cert.file && (
            <motion.a
              href={cert.file}
              download={cert.fileName || cert.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="led-btn inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
            >
              <Download size={16} />
              {c.downloadText}
            </motion.a>
          )}
        </div>
      </footer>
    </motion.div>,
    document.body
  )
}
