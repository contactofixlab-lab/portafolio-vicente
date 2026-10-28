import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { Send, Mail, ShieldCheck, Zap, UserRound, AlertTriangle } from 'lucide-react'
import { ui } from '../content'

const ENDPOINT = import.meta.env.DEV ? 'http://localhost:5180/api/messages' : 'https://portafolio-admin-eta.vercel.app/api/messages'
const COOLDOWN_MS = 20000

const LIMITS = { name: 80, subject: 120, email: 120, message: 1500 }
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Escribe tu nombre completo.'
  if (!EMAIL.test(v.email.trim())) e.email = 'Escribe un correo válido.'
  if (v.subject.trim().length < 3) e.subject = 'Cuéntame de qué se trata.'
  if (v.message.trim().length < 10) e.message = 'Cuéntame un poco más (mínimo 10 letras).'
  return e
}

/** Campo con etiqueta flotante y luz de neón al enfocar. */
function NeonField({ id, label, value, onChange, error, max, textarea = false, type = 'text', autoComplete, rows = 5 }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="neon-field">
      <div className="relative">
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        maxLength={max}
        placeholder=" "
        autoComplete={autoComplete}
        rows={textarea ? rows : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`neon-input peer ${textarea ? 'resize-none' : ''} ${error ? 'err' : ''}`}
      />
      <label htmlFor={id} className="neon-label">
        {label}
      </label>
      <span className="neon-bar" />
      </div>
      <div className="flex items-center justify-between gap-3 px-1 pt-1.5 text-xs">
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.span key="e" id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-semibold text-[#ff8da1]">
              {error}
            </motion.span>
          ) : (
            <span key="n" />
          )}
        </AnimatePresence>
        {textarea && (
          <span className={`tabular-nums ${value.length > max * 0.9 ? 'text-accent-300' : 'text-white/40'}`}>
            {value.length}/{max}
          </span>
        )}
      </div>
    </div>
  )
}

/** Chispas de neón que salen del botón al enviar. */
function Burst() {
  const sparks = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2 + (i % 2 ? 0.2 : 0)
    const dist = 70 + ((i * 37) % 70)
    return { i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 4 + ((i * 7) % 6), color: ['#22e5ff', '#4a86ff', '#a45cff', '#7df9ff'][i % 4] }
  })
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
      {sparks.map((s) => (
        <motion.span
          key={s.i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.9 + (s.i % 4) * 0.1, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{ width: s.size, height: s.size, background: s.color, boxShadow: `0 0 12px 3px ${s.color}` }}
        />
      ))}
    </div>
  )
}

export default function ContactForm() {
  const f = ui.messageForm
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const controls = useAnimationControls()
  const shakeForm = () => controls.start({ x: [0, -9, 9, -6, 6, 0], transition: { duration: 0.45 } })
  const [ripples, setRipples] = useState([])
  const startedAt = useRef(Date.now())
  const formRef = useRef(null)

  useEffect(() => {
    startedAt.current = Date.now()
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } })
  }, [controls])

  const set = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Date.now() + Math.random()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 700)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    const er = validate(values)
    setErrors(er)
    if (Object.keys(er).length) {
      shakeForm()
      const first = Object.keys(er)[0]
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    const last = Number(window.sessionStorage.getItem('pv_msg_at') || 0)
    if (Date.now() - last < COOLDOWN_MS) {
      setServerError('Espera unos segundos antes de enviar otro mensaje.')
      setStatus('error')
      shakeForm()
      return
    }

    setStatus('sending')
    setServerError('')
    const minimum = new Promise((r) => setTimeout(r, 1100))
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          website: values.website,
          t: Date.now() - startedAt.current,
          host: window.location.hostname,
          page: 'contacto'
        })
      })
      clearTimeout(timer)
      const json = await res.json().catch(() => ({}))
      await minimum
      if (!res.ok || !json.ok) {
        if (json.field) setErrors({ [json.field]: json.error })
        throw new Error(json.error || f.errorText)
      }
      window.sessionStorage.setItem('pv_msg_at', String(Date.now()))
      window.dispatchEvent(new CustomEvent('pv:conversion', { detail: { kind: 'mensaje', label: 'Mensaje enviado desde el formulario' } }))
      setStatus('sent')
    } catch (err) {
      await minimum
      setServerError(err.name === 'AbortError' ? f.errorText : err.message === 'Failed to fetch' ? f.errorText : err.message)
      setStatus('error')
      shakeForm()
    }
  }

  function reset() {
    setValues({ name: '', email: '', subject: '', message: '', website: '' })
    setErrors({})
    setServerError('')
    setStatus('idle')
    startedAt.current = Date.now()
  }

  const sending = status === 'sending'
  const sent = status === 'sent'

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="led-frame led-card-glow relative overflow-hidden rounded-[2rem] bg-night p-5 text-white sm:p-8">
        <div className="absolute inset-0 dots opacity-25" />
        <div className="absolute -left-20 -top-20 h-56 w-56 animate-morph bg-accent-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 animate-morph bg-primary-600/40 blur-3xl" />

      <div className="relative">
        <div className="mb-6 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-white/5 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-300">
            <span className="led-dot-sm h-1.5 w-1.5 rounded-full" />
            {f.eyebrow}
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] sm:text-4xl">
            {f.title} <span className="text-gradient">{f.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{f.subtitle}</p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid min-h-[22rem] place-items-center rounded-2xl border border-accent-400/30 bg-white/5 px-6 py-10 text-center backdrop-blur"
              role="status"
            >
              <Burst />
              <div>
                <div className="led-ring-static mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full">
                  <svg viewBox="0 0 52 52" className="h-16 w-16" fill="none" aria-hidden="true">
                    <motion.circle cx="26" cy="26" r="23" stroke="#22e5ff" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                    <motion.path d="M15 27 l8 8 l15 -17" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                  </svg>
                </div>
                <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="led-text font-display text-3xl font-extrabold">
                  {f.successTitle}
                </motion.h3>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mx-auto mt-3 max-w-sm text-white/75">
                  {f.successText}
                </motion.p>
                <motion.button
                  type="button"
                  onClick={reset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 rounded-full border border-accent-400/50 px-6 py-2.5 text-sm font-bold text-accent-300 transition-colors hover:bg-white/10"
                >
                  {f.anotherButton}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0, y: 14 }}
              animate={controls}
              onAnimationComplete={() => {}}
              data-track="contacto"
              className="grid gap-4"
            >
              <NeonField id="name" label={f.nameLabel} value={values.name} onChange={set('name')} error={errors.name} max={LIMITS.name} autoComplete="name" />
              <NeonField id="email" label={f.emailLabel} type="email" value={values.email} onChange={set('email')} error={errors.email} max={LIMITS.email} autoComplete="email" />
              <div>
                <NeonField id="subject" label={f.subjectLabel} value={values.subject} onChange={set('subject')} error={errors.subject} max={LIMITS.subject} />
                <div className="-mt-1 flex flex-wrap gap-2">
                  {f.subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setValues((v) => ({ ...v, subject: s }))
                        setErrors((er) => ({ ...er, subject: undefined }))
                      }}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${values.subject === s ? 'led-pill border-transparent text-white' : 'border-white/20 text-white/70 hover:border-accent-400/70 hover:text-accent-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <NeonField id="message" label={f.messageLabel} textarea rows={6} value={values.message} onChange={set('message')} error={errors.message} max={LIMITS.message} />

              {/* Trampa para robots: una persona nunca ve ni llena este campo */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label>
                  No llenar
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                </label>
              </div>

              <AnimatePresence>
                {status === 'error' && serverError && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden" role="alert">
                    <div className="flex items-start gap-3 rounded-2xl border border-[#ff8da1]/40 bg-[#ff8da1]/10 px-4 py-3 text-sm font-semibold text-[#ffc2cc]">
                      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                      {serverError}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={sending}
                onClick={addRipple}
                whileHover={sending ? {} : { scale: 1.02, y: -2 }}
                whileTap={sending ? {} : { scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="led-btn group relative mt-1 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-lg font-extrabold disabled:cursor-wait"
              >
                <span className="btn-sweep" aria-hidden="true" />
                {ripples.map((r) => (
                  <span key={r.id} className="pointer-events-none absolute animate-ping rounded-full bg-white/50" style={{ left: r.x - 12, top: r.y - 12, width: 24, height: 24, animationDuration: '700ms', animationIterationCount: 1 }} />
                ))}
                <AnimatePresence mode="wait" initial={false}>
                  {sending ? (
                    <motion.span key="s" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-10 inline-flex items-center gap-3">
                      <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.3)" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      {f.sendingText}
                    </motion.span>
                  ) : (
                    <motion.span key="i" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-10 inline-flex items-center gap-3">
                      {f.sendButton}
                      <Send size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {sending && <motion.span className="absolute bottom-0 left-0 h-1 bg-white/90 shadow-[0_0_12px_#fff]" initial={{ width: '0%' }} animate={{ width: '92%' }} transition={{ duration: 6, ease: 'easeOut' }} />}
              </motion.button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-white/50">
                <Mail size={14} />
                {f.privacy}
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <ul className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
          {[
            [UserRound, f.perk1],
            [ShieldCheck, f.perk2],
            [Zap, f.perk3]
          ].map(([Icon, text]) => (
            <li key={text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 sm:flex-col sm:gap-2 sm:px-3 sm:py-4 sm:text-center">
              <span className="led-pill grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white">
                <Icon size={22} />
              </span>
              <span className="font-display text-[15px] font-extrabold leading-tight text-white">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}
