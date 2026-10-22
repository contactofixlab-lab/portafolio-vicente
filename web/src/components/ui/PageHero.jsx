import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Wave from './Wave'
import { Words } from './Reveal'

/** Cabecera grande de las páginas internas: degradé naranja con ondas y formas flotantes. */
export default function PageHero({ eyebrow, title, subtitle, backHref = '#home', backText = 'Volver al inicio', children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
      <div className="absolute inset-0 dots opacity-30" />
      <motion.div
        className="absolute -top-24 -left-20 w-96 h-96 bg-accent-400/40 blur-3xl animate-morph"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-10 right-[-6rem] w-[28rem] h-[28rem] bg-white/20 blur-3xl animate-morph"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute right-16 top-32 w-24 h-24 rounded-full border-[10px] border-white/25 animate-float hidden md:block" />
      <div className="absolute left-[12%] bottom-28 w-10 h-10 rounded-2xl bg-white/30 animate-float-slow rotate-12 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-44">
        {backHref && (
          <motion.a
            href={backHref}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold hover:bg-white/25 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {backText}
          </motion.a>
        )}
        {eyebrow && (
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="block text-xs font-bold uppercase tracking-[0.22em] text-white/80 mb-4">
            {eyebrow}
          </motion.span>
        )}
        <h1 className="font-display font-extrabold leading-[1.02] text-5xl sm:text-6xl md:text-7xl max-w-4xl">
          <Words text={title} />
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
      <Wave fill="#fff7ed" height={120} />
    </section>
  )
}
