import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, ChevronDown } from 'lucide-react'
import Wave from '../components/ui/Wave'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import CountUp from '../components/ui/CountUp'
import { Words } from '../components/ui/Reveal'
import { hero, visibleProjects, certificates, trajectoryPage, ui } from '../content'

const BADGE_POSITIONS = [
  'top-2 left-0 sm:-left-6',
  'top-1/3 -right-2 sm:-right-10',
  'bottom-10 -left-2 sm:-left-12',
  'bottom-0 right-6 sm:-right-2'
]

function Stat({ value, suffix, label }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-3xl font-extrabold text-primary-600 min-[400px]:text-4xl sm:text-5xl">
        <CountUp to={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-[11px] font-semibold leading-tight min-[400px]:text-xs text-ink-soft sm:text-sm">{label}</p>
    </div>
  )
}

export default function HeroSection() {
  const titleWords = hero.title.split(' ')
  const highlighted = titleWords.slice(-2)
  const years = parseInt(trajectoryPage.statsYearsValue, 10) || 6
  const yearsSuffix = String(trajectoryPage.statsYearsValue).includes('+') ? '+' : ''

  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div className="absolute inset-0 dots opacity-40" />
      <motion.div
        className="absolute -left-32 top-10 h-[30rem] w-[30rem] bg-accent-300/50 blur-3xl animate-morph"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[34rem] w-[34rem] bg-primary-300/50 blur-3xl animate-morph"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100vh] max-w-7xl items-center gap-14 px-4 pb-56 pt-36 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary-200 bg-white/80 px-4 py-2 text-sm font-bold text-primary-700 shadow-soft backdrop-blur"
          >
            <Sparkles size={16} className="text-primary-500" />
            {hero.badge.replace(/^[^\p{L}\p{N}]+/u, '')}
          </motion.span>

          <h1 className="font-display text-5xl font-extrabold leading-[0.98] text-ink sm:text-6xl md:text-7xl xl:text-8xl">
            <Words text={hero.title} delay={0.5} highlight={highlighted} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="font-display text-2xl font-bold text-primary-700 md:text-3xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" href={hero.primaryButton.href || '#proyectos'}>
              {hero.primaryButton.text}
              <ArrowRight size={20} />
            </Button>
            {hero.secondaryButton.text && hero.secondaryButton.href && (
              <Button size="lg" variant="outline" href={hero.secondaryButton.href} target="_blank">
                <Download size={18} />
                {hero.secondaryButton.text}
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="grid max-w-md grid-cols-3 gap-3 border-t sm:gap-6 border-primary-200 pt-8"
          >
            <Stat value={years} suffix={yearsSuffix} label={ui.hero.statYears} />
            <Stat value={visibleProjects.length} suffix="" label={ui.hero.statProjects} />
            <Stat value={certificates.items.length} suffix="" label={ui.hero.statCertificates} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[34rem]"
        >
          <div className="absolute inset-[-8%] animate-spin-slow rounded-full border-2 border-dashed border-primary-300/80" />
          <div className="absolute inset-[3%] bg-gradient-to-br from-primary-400 via-primary-500 to-accent-400 opacity-90 blur-[2px] animate-morph" />

          <Tilt max={6} glare={false} scale={1.01} className="relative">
            <div className="relative aspect-square overflow-hidden border-[10px] border-white bg-gradient-to-br from-primary-100 to-accent-100 shadow-[0_40px_90px_-30px_rgba(154,52,18,0.6)] animate-morph">
              {hero.photo ? (
                <img src={hero.photo} alt={hero.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-[9rem]">👨‍💻</div>
              )}
            </div>
          </Tilt>

          {hero.floatingBadges.slice(0, 4).map((badge, idx) => (
            <motion.div
              key={`${badge.label}-${idx}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + idx * 0.15, type: 'spring', stiffness: 260, damping: 16 }}
              className={`absolute ${BADGE_POSITIONS[idx]}`}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                whileHover={{ scale: 1.12, rotate: -4 }}
                className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-soft backdrop-blur"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="whitespace-nowrap text-sm font-bold text-ink">{badge.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#proyectos"
        aria-label="Ver proyectos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 1.8, repeat: Infinity } }}
        className="absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 text-primary-500 md:block"
      >
        <ChevronDown size={30} />
      </motion.a>

      <Wave fill="#ffffff" height={130} />
    </section>
  )
}
