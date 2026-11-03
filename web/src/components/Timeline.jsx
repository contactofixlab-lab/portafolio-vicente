import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, Briefcase, Zap, Crown, Target, Wrench, Cpu, GraduationCap, Headphones } from 'lucide-react'
import Tilt from './ui/Tilt'

const BADGE_GRADIENTS = {
  Actual: 'from-emerald-400 to-emerald-600',
  Liderazgo: 'from-violet-400 to-violet-600',
  Estrategia: 'from-blue-400 to-indigo-600',
  Operaciones: 'from-cyan-400 to-cyan-600',
  Sistemas: 'from-purple-400 to-purple-600',
  Aprendizaje: 'from-sky-400 to-blue-600',
  Entrada: 'from-teal-400 to-cyan-600'
}

const BADGE_ICONS = {
  Actual: Zap,
  Liderazgo: Crown,
  Estrategia: Target,
  Operaciones: Wrench,
  Sistemas: Cpu,
  Aprendizaje: GraduationCap,
  Entrada: Headphones
}

const FALLBACK_GRADIENT = 'from-primary-400 to-primary-600'
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const parseYM = (value) => {
  const m = /^(\d{4})-(\d{2})/.exec(String(value ?? ''))
  return m ? { y: Number(m[1]), m: Number(m[2]) - 1 } : null
}

/** "2026-05-05" -> "May 2026"; cualquier otro texto (p. ej. "presente") se muestra tal cual con inicial mayúscula. */
const formatPoint = (value) => {
  const p = parseYM(value)
  if (p) return `${MONTHS[p.m]} ${p.y}`
  const s = String(value ?? '').trim()
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

const isOngoing = (end) => !parseYM(end)

/** Duración entre dos fechas (el fin vacío o "presente" cuenta hasta hoy): "1 año 7 meses". */
function duration(start, end) {
  const a = parseYM(start)
  if (!a) return ''
  const now = new Date()
  const b = parseYM(end) ?? { y: now.getFullYear(), m: now.getMonth() }
  const months = Math.max(1, (b.y - a.y) * 12 + (b.m - a.m))
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`)
  if (rest) parts.push(`${rest} ${rest === 1 ? 'mes' : 'meses'}`)
  return parts.join(' ')
}

function TimelineItem({ item, index }) {
  const isRight = index % 2 === 1
  const gradient = BADGE_GRADIENTS[item.badge] || FALLBACK_GRADIENT
  const Icon = BADGE_ICONS[item.badge] || Briefcase
  const ongoing = isOngoing(item.endDate)
  const lasted = duration(item.startDate, item.endDate)
  const initial = String(item.company || item.title || '?').trim().charAt(0).toUpperCase()

  return (
    <div className="relative pl-12 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.15 }}
        className="absolute left-[18px] top-8 z-10 -translate-x-1/2 md:left-1/2"
      >
        {ongoing && <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-pulse-ring" />}
        <span className={`relative grid h-9 w-9 place-items-center md:h-11 md:w-11 rounded-full border-4 border-white bg-gradient-to-br ${gradient} text-white shadow-glow`}>
          <Icon size={18} />
        </span>
      </motion.div>

      <span
        aria-hidden="true"
        className={`absolute top-[2.15rem] hidden h-0.5 w-10 bg-gradient-to-r md:block ${isRight ? 'left-1/2 from-primary-300 to-transparent' : 'right-1/2 from-transparent to-primary-300'}`}
      />

      <motion.div
        initial={{ opacity: 0, x: isRight ? 60 : -60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={isRight ? 'md:col-start-2' : ''}
      >
        <Tilt max={4} scale={1.015} className="rounded-3xl">
          <div className="led-hover group relative overflow-hidden rounded-3xl border-2 border-white bg-white p-6 shadow-card sm:p-7">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
            <span aria-hidden="true" className="pointer-events-none absolute -right-1 top-1 select-none font-display text-[5.5rem] font-extrabold leading-none text-primary-100/80">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="relative mb-4 flex items-start gap-4 pt-1">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} font-display text-2xl font-extrabold text-white shadow-soft transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}>
                {initial}
              </span>
              <div className="min-w-0 flex-1">
                {item.badge && (
                  <span className={`mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-bold text-white shadow-soft`}>
                    <Icon size={12} />
                    {item.badge}
                  </span>
                )}
                <h3 className="break-words font-display text-xl font-extrabold leading-tight text-ink sm:text-2xl">{item.title}</h3>
                <p className="mt-1 break-words text-base font-bold text-primary-600 sm:text-lg">{item.company}</p>
              </div>
            </div>

            <p className="relative mb-5 leading-relaxed text-ink-soft">{item.description}</p>

            <div className="relative flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-800">
                <Calendar size={15} />
                {formatPoint(item.startDate)} <span className="text-primary-500">→</span> {formatPoint(item.endDate)}
              </span>
              {lasted && (
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-400/20 px-4 py-2 text-sm font-bold text-primary-700">
                  <Clock size={15} />
                  {lasted}
                </span>
              )}
              {ongoing && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-2 text-sm font-bold text-emerald-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  En curso
                </span>
              )}
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  )
}

/** Línea de tiempo vertical con tarjetas alternadas y una línea de neón que se llena al hacer scroll. */
export default function Timeline({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 })

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[18px] top-0 h-full w-1 -translate-x-1/2 rounded-full bg-primary-200/70 md:left-1/2" />
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-[18px] top-0 h-full w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-400 via-primary-500 to-primary-700 shadow-[0_0_14px_rgba(74,134,255,0.8)] md:left-1/2"
      />
      <div className="space-y-12 md:space-y-14">
        {items.map((item, i) => (
          <TimelineItem key={item.id ?? i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
