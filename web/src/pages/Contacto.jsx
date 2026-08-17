import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, ChevronDown, Check, ArrowLeft, MessageCircle } from 'lucide-react'
import Layout from '../components/Layout'

const SUBJECT_OPTIONS = [
  'Consulta general',
  'Propuesta de proyecto',
  'Oportunidad laboral',
  'Colaboración',
  'Otro'
]

const contactInfo = {
  email: 'vrabanales@rcapcorp.cl',
  emailHref: 'mailto:vrabanales@rcapcorp.cl',
  telefono: '+56 9 6668 2082',
  telefonoHref: 'tel:+56966682082',
  whatsapp: 'https://wa.me/56966682082?text=' + encodeURIComponent('Hola Vicente, quisiera ponerme en contacto contigo...'),
  ubicacion: 'Chile / Uruguay',
  disponibilidad: 'Disponible para nuevos proyectos'
}

const faqs = [
  {
    q: '¿Qué tipo de proyectos desarrollas?',
    a: 'Desarrollo dashboards de business intelligence, aplicaciones internas de gestión, sitios web corporativos y herramientas de automatización de procesos. Trabajo principalmente con React, Node.js y bases de datos SQL/PostgreSQL, integrando siempre foco en transformación digital y experiencia de usuario.'
  },
  {
    q: '¿Cómo puedo contactarte para una colaboración?',
    a: 'Puedes escribirme a través de este formulario, por WhatsApp o directamente a mi correo. Te responderé a la brevedad para conversar los detalles de tu proyecto o propuesta.'
  },
  {
    q: '¿Trabajas de forma remota?',
    a: 'Sí, trabajo de forma remota con clientes y equipos en Chile y Uruguay, coordinando avances mediante reuniones periódicas y entregas incrementales del proyecto.'
  },
  {
    q: '¿Cuánto tiempo toma un proyecto típico?',
    a: 'Depende del alcance: una app o dashboard funcional suele tomar entre 2 y 6 semanas. En la primera conversación definimos un cronograma claro y mantengo comunicación constante durante todo el desarrollo.'
  },
  {
    q: '¿Estás disponible para nuevas oportunidades laborales?',
    a: 'Sí, estoy abierto a evaluar nuevas oportunidades laborales y proyectos freelance relacionados con innovación, sistemas y desarrollo de software. Escríbeme y conversemos.'
  }
]

function CustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors text-sm flex items-center justify-between text-left ${
          open
            ? 'border-primary-500 ring-2 ring-primary-500/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
        } ${value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
      >
        <span>{value || 'Selecciona un tema'}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-primary-500' : 'text-gray-400'}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl z-20 overflow-hidden py-1"
          >
            {SUBJECT_OPTIONS.map((opt) => {
              const selected = value === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    selected
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full border transition-colors ${
                      selected ? 'border-primary-500 bg-primary-500' : 'border-gray-300 dark:border-gray-600 bg-transparent'
                    }`}
                  >
                    {selected && <Check size={10} className="text-white" />}
                  </span>
                  {opt}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contacto() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.subject) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 4000)
  }

  const inputCls =
    'w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors text-sm'

  const contactItems = [
    { label: 'Email', value: contactInfo.email, href: contactInfo.emailHref, icon: Mail },
    { label: 'Teléfono', value: contactInfo.telefono, href: contactInfo.telefonoHref, icon: Phone },
    { label: 'Ubicación', value: contactInfo.ubicacion, href: null, icon: MapPin },
    { label: 'Disponibilidad', value: contactInfo.disponibilidad, href: null, icon: Clock }
  ]

  return (
    <Layout>
      <div className="bg-primary-50">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
          <motion.a
            href="#home"
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold mb-6"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4">
              Contáctame
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              ¿Tienes un proyecto en mente o una oportunidad? Escríbeme y conversemos.
            </p>
          </motion.div>
        </section>

        {/* Formulario + Info lateral */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl dark:shadow-primary-900/10 grid md:grid-cols-5 border border-gray-200 dark:border-gray-800"
          >
            {/* Sidebar de contacto */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden flex flex-col">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-accent/10 pointer-events-none" />

              <div className="relative p-8 md:p-10 flex flex-col h-full">
                <div className="mb-8">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3 block">Hablemos</span>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    Información de<br />Contacto
                  </h2>
                  <div className="w-12 h-1 bg-accent rounded-full mt-4" />
                </div>

                <div className="space-y-5 flex-1">
                  {contactItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-white/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                          <Icon size={20} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-white group-hover:text-accent transition-colors font-semibold text-sm break-all">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-semibold text-sm">{item.value}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={contactInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-accent hover:bg-amber-400 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle size={20} />
                    Escríbeme por WhatsApp
                  </a>
                  <p className="text-white/30 text-[11px] text-center mt-3">Vicente Rabanales · Chile / Uruguay</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="md:col-span-3 bg-white p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Envíame un <span className="text-primary-600 dark:text-primary-400">Mensaje</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-7">Completa el formulario y te responderé pronto.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <Check size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Te responderé a la brevedad.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Nombre *</label>
                      <input type="text" name="name" placeholder="Juan Pérez" value={formData.name} onChange={handleChange} required className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Email *</label>
                      <input type="email" name="email" placeholder="juan@ejemplo.cl" value={formData.email} onChange={handleChange} required className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                        Teléfono <span className="normal-case font-normal text-gray-400">(opcional)</span>
                      </label>
                      <input type="tel" name="phone" placeholder="+56 9 xxxx xxxx" value={formData.phone} onChange={handleChange} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Asunto *</label>
                      <CustomSelect value={formData.subject} onChange={(val) => setFormData({ ...formData, subject: val })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Mensaje *</label>
                    <textarea
                      name="message"
                      placeholder="Cuéntame sobre tu consulta o proyecto…"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={inputCls + ' resize-none'}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wider shadow-lg shadow-primary-500/20"
                  >
                    Enviar Mensaje
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white inline-block">
              Preguntas <span className="text-primary-600 dark:text-primary-400">Frecuentes</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4 text-sm">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-primary-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
