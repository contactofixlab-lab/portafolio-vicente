import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, ChevronDown } from 'lucide-react'
import Wave from '../components/ui/Wave'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import CountUp from '../components/ui/CountUp'
import { Words } from '../components/ui/Reveal'
import IconValue from '../components/ui/IconValue'
import { hero, visibleProjects, certificates, trajectoryPage, ui } from '../content'

// Cada etiqueta orbita alrededor de la foto: círculo (en % del contenedor), duración, sentido y ángulo inicial.
// En celular la órbita va hacia adentro para que las etiquetas no se corten con el borde de la pantalla.
const BADGE_ORBITS = [
  { cls: 'inset-[7%] sm:inset-[-8%]', duration: 30, reverse: false, angle: 215 },
  { cls: 'inset-[5%] sm:inset-[-15%]', duration: 44, reverse: true, angle: 345 },
  { cls: 'inset-[9%] sm:inset-[-11%]', duration: 36, reverse: false, angle: 130 },
  { cls: 'inset-[4%] sm:inset-[-18%]', duration: 52, reverse: true, angle: 50 }
]

function Stat({ value, suffix, label }) {
  return (
    <div className="text-center sm:text-left">
      <p className="led-sub font-display text-3xl font-extrabold min-[400px]:text-4xl sm:text-5xl">
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
            className="led-sub font-display text-2xl font-bold md:text-3xl"
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
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[34rem]"
        >
          <div className="led-ring inset-[-9%]" />
          <div className="led-orbit inset-[-9%]"><span className="led-dot" /></div>
          <div className="led-orbit rev inset-[-14%]"><span className="led-dot b" /></div>
          <div className="absolute inset-[3%] bg-gradient-to-br from-primary-400 via-primary-500 to-accent-400 opacity-90 blur-[2px] animate-morph" />

          <Tilt max={6} glare={false} scale={1.01} className="relative">
            <div className="relative aspect-square overflow-hidden border-[10px] border-white bg-gradient-to-br from-primary-100 to-accent-100 shadow-[0_40px_90px_-30px_rgba(30,36,160,0.5)] animate-morph">
              {hero.photo ? (
                <img src={hero.photo} alt={hero.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-[9rem]">👨‍💻</div>
              )}
            </div>
          </Tilt>

          {hero.floatingBadges.slice(0, 4).map((badge, idx) => {
            const orbit = BADGE_ORBITS[idx]
            const rad = (orbit.angle * Math.PI) / 180
            return (
              <div
                key={`${badge.label}-${idx}`}
                className={`badge-orbit absolute ${orbit.cls}`}
                style={{ animationDuration: `${orbit.duration}s`, animationDirection: orbit.reverse ? 'reverse' : 'normal' }}
              >
                <div className="badge-anchor" style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}>
                  <div className="badge-upright" style={{ animationDuration: `${orbit.duration}s`, animationDirection: orbit.reverse ? 'normal' : 'reverse' }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + idx * 0.15, type: 'spring', stiffness: 260, damping: 16 }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                        whileHover={{ scale: 1.12 }}
                        className="led-edge flex items-center gap-2 rounded-2xl border bg-white/90 px-3 py-2 backdrop-blur sm:gap-3 sm:px-4 sm:py-3"
                      >
                        <IconValue value={badge.icon} className="text-xl sm:text-2xl" imgClass="h-6 w-6 sm:h-8 sm:w-8" />
                        <span className="whitespace-nowrap text-xs font-bold text-ink sm:text-sm">{badge.label}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
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
