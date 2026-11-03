import { motion } from 'framer-motion'
import { Eye, Calendar, BadgeCheck, Award, Maximize2 } from 'lucide-react'
import Tilt from './ui/Tilt'
import { certificates as c } from '../content'

/**
 * Tarjeta de certificado: muestra el documento real (la imagen cargada en el admin) sobre un fondo
 * difuminado de sí mismo, así cualquier proporción se ve completa y sin bordes vacíos.
 */
export default function CertificateCard({ certificate, index = 0, onOpen }) {
  const preview = certificate.image || certificate.logo
  // La insignia con el logo solo tiene sentido cuando la vista previa es el certificado y no el propio logo.
  const showBadge = Boolean(certificate.logo && certificate.image)

  return (
    <Tilt max={6} scale={1.02} className="h-full rounded-[1.75rem]">
      <article className="led-hover group flex h-full select-none flex-col rounded-[1.75rem] border-2 border-white bg-white shadow-card">
        <div className="relative">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${c.viewText}: ${certificate.name}`}
            className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-t-[1.5rem] bg-primary-100 outline-none focus-visible:ring-4 focus-visible:ring-accent-400/60"
          >
            {preview ? (
              <>
                <img src={preview} alt="" aria-hidden="true" draggable={false} loading="lazy" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-primary-300/30" />
                <img
                  src={preview}
                  alt={certificate.name}
                  draggable={false}
                  loading="lazy"
                  className="relative h-full w-full object-contain p-3.5 [filter:drop-shadow(0_14px_18px_rgba(30,36,160,0.3))] transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:-rotate-1"
                />
              </>
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary-400 via-primary-500 to-accent-400 text-white">
                <Award size={64} strokeWidth={1.5} />
              </div>
            )}

            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full -skew-x-12 bg-white/50 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[520%]" />

            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-night/70 via-night/20 to-transparent px-4 pb-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-primary-700 shadow-soft">
                <Maximize2 size={14} />
                {c.viewText}
              </span>
            </span>
          </button>

          <span className="pointer-events-none absolute left-3 top-3 grid h-8 min-w-8 place-items-center rounded-full bg-night/80 px-2 font-display text-xs font-extrabold text-white backdrop-blur">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary-700 shadow-soft backdrop-blur">
            <Calendar size={12} />
            {certificate.year}
          </span>

          {showBadge && (
            <img
              src={certificate.logo}
              alt={certificate.issuer}
              draggable={false}
              loading="lazy"
              className="absolute -bottom-6 left-5 z-10 h-14 w-14 rounded-2xl border-2 border-white bg-white object-contain p-1.5 shadow-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
            />
          )}
        </div>

        <div className={`flex flex-1 flex-col justify-between gap-5 px-6 pb-6 ${showBadge ? 'pt-10' : 'pt-5'}`}>
          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary-600">
              <BadgeCheck size={16} className="shrink-0" />
              <span className="min-w-0 [overflow-wrap:anywhere]">{certificate.issuer}</span>
            </p>
            <h4 className="font-display text-xl font-extrabold leading-tight text-ink transition-colors group-hover:text-primary-600">{certificate.name}</h4>
            {certificate.description && <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{certificate.description}</p>}
          </div>

          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="led-btn flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-bold"
          >
            <Eye size={18} />
            {c.viewText}
          </motion.button>
        </div>
      </article>
    </Tilt>
  )
}
