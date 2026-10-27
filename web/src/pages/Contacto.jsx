import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Plus, Send, Loader2 } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { contact, ui } from '../content'

const p = contact.page
const faqs = p.faqs
const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

const fieldBase =
  'peer w-full rounded-2xl border-2 border-primary-100 bg-primary-50/60 px-4 pb-2.5 pt-6 text-ink outline-none transition-all placeholder-transparent hover:border-primary-200 focus:border-primary-500 focus:bg-white focus:shadow-[0_0_0_5px_rgba(74,75,240,0.2)]'

const labelBase =
  'pointer-events-none absolute left-4 top-1.5 text-xs font-bold uppercase tracking-wide text-primary-600 transition-all peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-soft peer-focus:top-1.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wide peer-focus:text-primary-600'

function Field({ label, name, type = 'text', value, onChange, required = false, textarea = false }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        rows={textarea ? 5 : undefined}
        className={`${fieldBase} ${textarea ? 'resize-none' : ''}`}
      />
      <label htmlFor={name} className={labelBase}>
        {label}
        {required ? ' *' : ''}
      </label>
    </div>
  )
}

function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-24 w-24" fill="none">
      <motion.circle cx="26" cy="26" r="24" stroke="#4a4bf0" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
      <motion.path d="M14 27 l8 8 l16 -17" stroke="#4a4bf0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
    </svg>
  )
}

function FaqItem({ faq, index, open, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-3xl border-2 transition-all duration-300 ${open ? 'border-primary-400 bg-white shadow-glow' : 'border-white bg-white shadow-card hover:border-primary-200'}`}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-4 p-5 text-left md:p-6">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold transition-colors duration-300 ${open ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' : 'bg-primary-100 text-primary-700'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-display text-lg font-bold text-ink md:text-xl">{faq.q}</span>
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${open ? 'bg-primary-500 text-white' : 'bg-primary-50 text-primary-600'}`}>
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="px-5 pb-6 pl-[4.75rem] text-lg leading-relaxed text-ink-soft md:px-6 md:pl-[5.5rem]">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [subjectError, setSubjectError] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.subject) {
      setSubjectError(true)
      return
    }
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      }, 5000)
    }, 1300)
  }

  const infoItems = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    { label: 'Teléfono', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}`, icon: Phone },
    { label: 'Ubicación', value: contact.location, href: null, icon: MapPin },
    { label: 'Disponibilidad', value: contact.availability, href: null, icon: Clock }
  ]

  return (
    <>
      <PageHero eyebrow={p.infoEyebrow} title={p.title} subtitle={p.subtitle} backText={p.backText} />

      <Section bg="cream" className="-mt-px">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-[0_50px_100px_-40px_rgba(30,36,160,0.4)] lg:grid-cols-5">
            <div className="relative overflow-hidden bg-gradient-to-br from-night via-primary-900 to-primary-700 p-8 text-white md:p-10 lg:col-span-2">
              <div className="absolute inset-0 dots opacity-25" />
              <motion.div className="absolute -right-16 -top-16 h-64 w-64 bg-accent-400/45 blur-2xl animate-morph" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity }} />
              <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[18px] border-accent-400/20 animate-float-slow" />

              <div className="relative flex h-full flex-col">
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-accent-300">{p.infoEyebrow}</span>
                <h2 className="led-text font-display text-3xl font-extrabold leading-tight md:text-4xl">{p.infoTitle}</h2>
                <div className="mt-4 h-1.5 w-14 rounded-full bg-accent-300" />

                <StaggerGroup className="mt-9 flex-1 space-y-5">
                  {infoItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <StaggerItem key={item.label}>
                        <div className="group flex items-start gap-4">
                          <motion.div whileHover={{ rotate: -10, scale: 1.12 }} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-primary-600">
                            <Icon size={22} />
                          </motion.div>
                          <div className="min-w-0">
                            <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-white/60">{item.label}</p>
                            {item.href ? (
                              <a href={item.href} className="break-all font-semibold transition-colors hover:text-accent-300">
                                {item.value}
                              </a>
                            ) : (
                              <p className="font-semibold">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </StaggerGroup>

                <div className="mt-9 border-t border-white/20 pt-7">
                  <Button href={whatsappUrl} target="_blank" variant="whatsapp" size="lg" shine={false} className="w-full">
                    <WhatsAppIcon size={24} />
                    {p.whatsappButton}
                  </Button>
                  <p className="mt-4 text-center text-xs text-white/60">{p.footerLine}</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 lg:col-span-3">
              <h2 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                {p.formTitle} <span className="text-gradient">{p.formHighlight}</span>
              </h2>
              <p className="mb-8 mt-2 text-ink-soft">{p.formSubtitle}</p>

              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <SuccessCheck />
                    <h3 className="mt-6 font-display text-3xl font-extrabold text-ink">{p.successTitle}</h3>
                    <p className="mt-2 text-lg text-ink-soft">{p.successText}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={ui.form.nameLabel} name="name" value={formData.name} onChange={handleChange} required />
                      <Field label={ui.form.emailLabel} name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <Field label={ui.form.phoneLabel} name="phone" type="tel" value={formData.phone} onChange={handleChange} />

                    <div>
                      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-600">{ui.form.subjectLabel} *</p>
                      <motion.div animate={subjectError ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }} className="flex flex-wrap gap-2.5">
                        {p.subjects.map((subject) => {
                          const active = formData.subject === subject
                          return (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, subject })
                                setSubjectError(false)
                              }}
                              className={`relative rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors ${active ? 'border-transparent text-white' : 'border-primary-100 bg-white text-ink-soft hover:border-primary-300 hover:text-primary-700'}`}
                            >
                              {active && <motion.span layoutId="subject-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                              <span className="relative">{subject}</span>
                            </button>
                          )
                        })}
                      </motion.div>
                      {subjectError && <p className="mt-2 text-sm font-semibold text-rose-600">{ui.form.subjectError}</p>}
                    </div>

                    <Field label={ui.form.messageLabel} name="message" value={formData.message} onChange={handleChange} required textarea />

                    <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          {ui.form.sendingText}
                        </>
                      ) : (
                        <>
                          {p.submitButton}
                          <Send size={18} />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-28 max-w-3xl">
          <div className="mb-12 text-center">
            <Reveal>
              <span className="mb-4 inline-flex rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{ui.form.faqEyebrow}</span>
              <h2 className="font-display text-4xl font-extrabold text-ink md:text-6xl">
                {p.faqTitle} <span className="text-gradient">{p.faqHighlight}</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="mb-4 text-lg font-semibold text-ink-soft">{ui.form.faqMoreText}</p>
            <Button href={whatsappUrl} target="_blank" variant="whatsapp" size="lg" shine={false}>
              <WhatsAppIcon size={22} />
              {p.whatsappButton}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
