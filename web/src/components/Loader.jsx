import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { header } from '../content'

const KEY = 'pv-intro-visto'
const LOAD_MS = 1300 // intro: el contador va de 0 a 100 % en este tiempo
const POP_MS = 1250 // intro: duración total de la explosión antes de retirar la cortina
const COVER_MS = 380 // navegación: tiempo que tardan las burbujas en tapar la página
const NAV_POP_MS = 900 // navegación: duración de la explosión que revela la página nueva

const skipIntro = () => window.location.search.includes('heatmap')

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Campo de burbujas que cubre toda la pantalla: la cantidad se adapta al tamaño para no sobrecargar el celular. */
function makeBubbles(fast) {
  const w = window.innerWidth
  const h = window.innerHeight
  const cols = w < 640 ? 3 : w < 1100 ? 6 : 9
  const cell = w / cols
  const rows = Math.ceil(h / cell) + 1
  const maxDist = Math.hypot(w / 2, h / 2)
  const list = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * cell + (Math.random() - 0.5) * cell * 0.25
      const y = (r + 0.5) * cell + (Math.random() - 0.5) * cell * 0.25
      const d = Math.hypot(x - w / 2, y - h / 2) / maxDist
      list.push({
        id: `${r}-${c}`,
        x,
        y,
        size: cell * (1.5 + Math.random() * 0.2),
        delay: fast ? 0.04 + d * 0.3 + Math.random() * 0.06 : 0.12 + d * 0.5 + Math.random() * 0.1,
        coverDelay: (1 - d) * 0.1 + Math.random() * 0.05
      })
    }
  }
  return list
}

/** Partículas que salen disparadas del centro cuando el orbe explota. */
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2 + (i % 2) * 0.2
  const dist = 110 + (i % 4) * 45
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 7 + (i % 3) * 5,
    color: ['#22e5ff', '#4a86ff', '#a45cff'][i % 3]
  }
})

/** Burbujitas que flotan alrededor del orbe mientras carga. */
const FLOATERS = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * Math.PI * 2 + 0.4
  const radius = 92 + (i % 3) * 26
  return { id: i, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, size: 12 + (i % 4) * 7, dur: 2.6 + (i % 5) * 0.5 }
})

function Percent({ value }) {
  const [n, setN] = useState(0)
  useMotionValueEvent(value, 'change', (v) => setN(Math.round(v)))
  return (
    <span className="font-display text-2xl font-extrabold tabular-nums tracking-wide text-white">
      {n}
      <span className="text-base text-white/60">%</span>
    </span>
  )
}

/**
 * Cortina de burbujas. En la primera visita: un orbe con anillo de progreso que al llegar a 100 % explota y
 * revela la página. En cada cambio de página (`navTick` sube): las burbujas tapan la pantalla, se llama a
 * `onCovered` para cambiar la página por detrás y revientan de nuevo para mostrarla.
 */
export default function Loader({ navTick = 0, onCovered }) {
  const [phase, setPhase] = useState(() => (!alreadySeen() && !skipIntro() ? 'loading' : 'done'))
  const [nav, setNav] = useState(false)
  const [run, setRun] = useState(0)
  const [bubbles, setBubbles] = useState(() => (phase === 'done' ? [] : makeBubbles(false)))
  const reduced = useReducedMotion()
  const progress = useMotionValue(0)
  const covered = useRef(onCovered)
  covered.current = onCovered
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const firstTick = useRef(navTick)

  // Cambio de página: arranca la cobertura (o cambia directo si la intro sigue corriendo o es el visor de mapa de calor).
  useEffect(() => {
    if (navTick === firstTick.current) return
    if (skipIntro() || phaseRef.current === 'loading' || (phaseRef.current === 'pop' && !nav)) {
      covered.current?.()
      return
    }
    setBubbles(makeBubbles(true))
    setNav(true)
    setRun((r) => r + 1)
    setPhase('cover')
    const t = setTimeout(
      () => {
        covered.current?.()
        setPhase('pop')
      },
      reduced ? 200 : COVER_MS
    )
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navTick])

  // Mientras la cortina está puesta, la página de atrás no se desplaza.
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  // Intro: el avance es por tiempo (no espera a imágenes ni fuentes), así siempre llega a 100 % y revienta sin colgarse.
  useEffect(() => {
    if (phase !== 'loading') return
    const ramp = animate(progress, 100, { duration: LOAD_MS / 1000, ease: [0.4, 0, 0.2, 1] })
    ramp.then(() => setPhase('pop'))
    // Respaldo: si el navegador pausa las animaciones (pestaña en segundo plano), igual se avanza.
    const fallback = setTimeout(() => setPhase('pop'), LOAD_MS + 500)
    return () => {
      ramp.stop()
      clearTimeout(fallback)
    }
  }, [phase, progress])

  useEffect(() => {
    if (phase !== 'pop') return
    const t = setTimeout(
      () => {
        setPhase('done')
        setNav(false)
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* sin almacenamiento disponible: se mostrará de nuevo, sin consecuencias */
        }
      },
      reduced ? 450 : nav ? NAV_POP_MS : POP_MS
    )
    return () => clearTimeout(t)
  }, [phase, reduced, nav, run])

  if (phase === 'done') return null
  const popping = phase === 'pop'

  return (
    <motion.div
      key={run}
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden ${popping ? 'pointer-events-none' : ''}`}
      initial={nav && reduced ? { opacity: 0 } : false}
      animate={{ opacity: popping && reduced ? 0 : 1 }}
      transition={{ duration: nav ? 0.2 : 0.5 }}
    >
      {/* Fondo base: tapa los huecos entre burbujas y se disuelve junto con la onda de explosión */}
      <motion.div
        className="absolute inset-0 bg-night"
        initial={nav ? { opacity: 0 } : false}
        animate={{ opacity: popping && !reduced ? 0 : 1 }}
        transition={popping ? { duration: nav ? 0.4 : 0.55, delay: nav ? 0.15 : 0.3, ease: 'easeIn' } : nav ? { duration: 0.25 } : { duration: 0 }}
      />

      {/* Campo de burbujas: cubre la pantalla y revienta en onda desde el centro */}
      {!reduced &&
        bubbles.map((b) => (
          <motion.span
            key={`${run}-${b.id}`}
            className="absolute rounded-full border border-primary-300/25 [background:radial-gradient(circle_at_30%_26%,rgba(74,134,255,0.3),rgba(13,22,64,1)_52%,#0a1030_100%)]"
            style={{ left: b.x - b.size / 2, top: b.y - b.size / 2, width: b.size, height: b.size, willChange: 'transform' }}
            initial={nav ? { scale: 0, opacity: 0 } : false}
            animate={popping ? { scale: [1, 1.1, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
            transition={
              popping
                ? { duration: nav ? 0.4 : 0.5, delay: b.delay, times: [0, 0.25, 1], ease: 'easeOut' }
                : nav
                  ? { duration: 0.28, delay: b.coverDelay, ease: 'easeOut' }
                  : { duration: 0 }
            }
          >
            {popping && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-accent-400"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.25, opacity: [0, 0.9, 0] }}
                transition={{ duration: nav ? 0.4 : 0.5, delay: b.delay, ease: 'easeOut' }}
              />
            )}
          </motion.span>
        ))}

      {/* Orbe central */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative flex flex-col items-center">
          <div className="relative grid h-44 w-44 place-items-center">
            {/* burbujitas flotantes */}
            {!reduced &&
              FLOATERS.map((f) => (
                <motion.span
                  key={f.id}
                  className="absolute rounded-full border border-accent-400/60 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0.12)_28%,transparent_62%)]"
                  style={{ left: `calc(50% + ${f.x}px - ${f.size / 2}px)`, top: `calc(50% + ${f.y}px - ${f.size / 2}px)`, width: f.size, height: f.size }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={popping ? { opacity: 0, scale: 1.6 } : { opacity: [0.35, 0.95, 0.35], scale: 1, y: [0, -26, 0] }}
                  transition={popping ? { duration: 0.2 } : { duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.id * 0.12 }}
                />
              ))}

            {/* anillo de progreso (solo en la intro) */}
            {!nav && (
              <svg viewBox="0 0 148 148" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="74" cy="74" r="66" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
                <motion.circle
                  cx="74"
                  cy="74"
                  r="66"
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ pathLength: progress, stroke: 'var(--led)', filter: 'drop-shadow(0 0 8px var(--led))' }}
                />
              </svg>
            )}

            {/* orbe con la letra */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={popping ? { scale: [1, 1.18, 0], opacity: [1, 1, 0] } : { scale: [1, 1.05, 1], opacity: 1 }}
              transition={popping ? { duration: 0.45, times: [0, 0.35, 1], ease: 'easeOut' } : { scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
              className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-full led-pill font-display text-6xl font-extrabold text-white"
            >
              <span aria-hidden="true" className="absolute inset-0 [background:radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.55),rgba(255,255,255,0)_46%)]" />
              <span className="relative">{header.logoLetter}</span>
            </motion.div>

            {/* explosión del orbe: onda y partículas */}
            {popping && !reduced && (
              <>
                <motion.span
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-accent-400"
                  initial={{ scale: 0.8, opacity: 0.95 }}
                  animate={{ scale: 5.5, opacity: 0 }}
                  transition={{ duration: nav ? 0.7 : 0.9, ease: 'easeOut' }}
                />
                {PARTICLES.map((p) => (
                  <motion.span
                    key={p.id}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2, background: p.color, boxShadow: `0 0 14px ${p.color}` }}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ x: p.x, y: p.y, scale: 0, opacity: [1, 1, 0] }}
                    transition={{ duration: nav ? 0.65 : 0.8, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
          </div>

          {!nav && (
            <motion.div animate={{ opacity: popping ? 0 : 1, y: popping ? 8 : 0 }} transition={{ duration: 0.25 }} className="mt-5 flex flex-col items-center gap-1.5">
              <Percent value={progress} />
              <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-white/80 [text-shadow:0_0_14px_var(--led)]">{header.logoText}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
