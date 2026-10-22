import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Download, Calendar, BadgeCheck } from 'lucide-react'
import Tilt from './ui/Tilt'
import { certificates as c } from '../content'

export default function CertificateCard({ certificate }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Tilt max={8} scale={1.03} className="h-full rounded-[2rem]">
        <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-card">
          <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-primary-400 via-primary-500 to-accent-400 p-6">
            <div className="absolute inset-0 dots opacity-40" />
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/25 blur-xl" />
            {certificate.logo && (
              <img src={certificate.logo} alt={certificate.issuer} className="relative h-24 max-w-full rounded-2xl bg-white object-contain p-3 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
            )}
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary-700">
              <Calendar size={12} />
              {certificate.year}
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-5 p-6">
            <div className="space-y-2">
              <h4 className="font-display text-xl font-extrabold leading-tight text-ink transition-colors group-hover:text-primary-600">{certificate.name}</h4>
              <p className="flex items-center gap-1.5 text-sm font-bold text-primary-600">
                <BadgeCheck size={16} />
                {certificate.issuer}
              </p>
              {certificate.description && <p className="text-sm leading-relaxed text-ink-soft">{certificate.description}</p>}
            </div>

            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 font-bold text-white shadow-glow"
            >
              <Eye size={18} />
              {c.viewText}
            </motion.button>
          </div>
        </div>
      </Tilt>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-white shadow-2xl"
            >
              <motion.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.1 }}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-soft"
              >
                <X size={22} />
              </motion.button>

              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
                <div className="flex items-center gap-4 pr-12">
                  {certificate.logo && <img src={certificate.logo} alt={certificate.issuer} className="h-16 rounded-2xl bg-white object-contain p-2" />}
                  <div>
                    <h3 className="font-display text-2xl font-extrabold md:text-3xl">{certificate.name}</h3>
                    <p className="text-white/85">{certificate.issuer}</p>
                  </div>
                </div>
              </div>

              {certificate.image && (
                <div className="bg-primary-50 p-6 md:p-8">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={certificate.image}
                    alt={certificate.name}
                    className="max-h-[65vh] w-full rounded-2xl object-contain shadow-soft"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-100 p-6 md:p-8">
                <div>
                  <p className="text-sm text-ink-soft">{c.issuedText}</p>
                  <p className="font-display text-xl font-extrabold text-ink">{certificate.year}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-2 font-bold text-emerald-800">{c.verifiedText}</span>
                <div className="flex items-center gap-3">
                  {certificate.file && (
                    <motion.a
                      href={certificate.file}
                      download={certificate.fileName || certificate.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2.5 font-bold text-white shadow-glow"
                    >
                      <Download size={18} />
                      {c.downloadText}
                    </motion.a>
                  )}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-ink px-6 py-2.5 font-bold text-white"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
