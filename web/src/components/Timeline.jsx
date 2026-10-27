import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Tilt from './ui/Tilt'

const BADGE_GRADIENTS = {
  Actual: 'from-emerald-400 to-emerald-600',
  Liderazgo: 'from-violet-400 to-violet-600',
  Estrategia: 'from-blue-400 to-indigo-600',
  Operaciones: 'from-cyan-400 to-cyan-600',
  Sistemas: 'from-purple-400 to-purple-600'
}

const FALLBACK_GRADIENT = 'from-primary-400 to-primary-600'

function TimelineItem({ item, index }) {
  const isRight = index % 2 === 1
  const gradient = BADGE_GRADIENTS[item.badge] || FALLBACK_GRADIENT

  return (
    <div className="relative pl-14 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.15 }}
        className="absolute left-[19px] top-9 z-10 -translate-x-1/2 md:left-1/2"
      >
        <span className="absolute inset-0 rounded-full bg-primary-400 animate-pulse-ring" />
        <span className={`relative block h-6 w-6 rounded-full border-4 border-white bg-gradient-to-br ${gradient} shadow-glow`} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isRight ? 60 : -60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={isRight ? 'md:col-start-2' : ''}
      >
        <Tilt max={4} scale={1.015} className="rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-white p-7 shadow-card">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
            <div className="mb-4 flex items-start justify-between gap-3 pt-1">
              <div>
                <h3 className="font-display text-2xl font-extrabold leading-tight text-ink">{item.title}</h3>
                <p className="mt-1 text-lg font-bold text-primary-600">{item.company}</p>
              </div>
              {item.badge && (
                <span className={`shrink-0 rounded-full bg-gradient-to-r ${gradient} px-3.5 py-1.5 text-xs font-bold text-white shadow-soft`}>
                  {item.badge}
                </span>
              )}
            </div>
            <p className="mb-5 leading-relaxed text-ink-soft">{item.description}</p>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-800">
              <Calendar size={15} />
              {item.startDate} <span className="text-primary-500">→</span> {item.endDate}
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  )
}

/** Línea de tiempo vertical con tarjetas alternadas. */
export default function Timeline({ items }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        className="absolute left-[19px] top-0 h-full w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-500 via-primary-300 to-transparent md:left-1/2"
      />
      <div className="space-y-14">
        {items.map((item, i) => (
          <TimelineItem key={item.id ?? i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
