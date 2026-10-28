import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Plus, ArrowUpRight } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import ContactForm from '../components/ContactForm'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { contact, ui } from '../content'

const p = contact.page
const faqs = p.faqs
const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

/** Tarjeta compacta de contacto: con acción (enlace) o solo informativa. */
function ContactCard({ icon: Icon, label, value, href, action, gradient, external = false, whatsapp = false }) {
  const body = (
    <Tilt max={5} scale={1.03} className="h-full rounded-3xl">
      <div className="led-hover relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-white bg-white p-4 shadow-card">
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
        <div className="mb-3 flex items-center gap-3">
          <motion.div whileHover={{ rotate: 8, scale: 1.1 }} className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-soft`}>
            {whatsapp ? <WhatsAppIcon size={20} /> : <Icon size={20} />}
          </motion.div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600">{label}</p>
        </div>
        <p className="[overflow-wrap:anywhere] font-display text-[15px] font-extrabold leading-snug text-ink">{value}</p>
        {action && (
          <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-bold text-white transition-colors group-hover:bg-primary-600">
            {action}
            <ArrowUpRight size={13} />
          </span>
        )}
      </div>
    </Tilt>
  )

  return (
    <StaggerItem className="min-w-0">
      {href ? (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="group block h-full">
          {body}
        </a>
      ) : (
        <div className="h-full">{body}</div>
      )}
    </StaggerItem>
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
  const [openFaq, setOpenFaq] = useState(0)
  const cards = ui.contactCards

  return (
    <>
      <PageHero eyebrow={p.infoEyebrow} title={p.title} subtitle={p.subtitle} backText={p.backText} />

      <Section bg="cream" className="-mt-px" wide>
        <div id="escribeme" className="-mt-6">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <Reveal>
            <h2 className="mb-6 text-center font-display text-xl font-extrabold text-ink md:text-2xl">{p.infoTitle}</h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <ContactCard icon={Mail} label={cards.emailLabel} value={contact.email} href={`mailto:${contact.email}`} action={contact.home.emailButton} gradient="from-sky-500 to-blue-600" />
            <ContactCard icon={Phone} label={cards.phoneLabel} value={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, '')}`} action={contact.home.phoneButton} gradient="from-violet-500 to-purple-600" />
            <ContactCard whatsapp label={cards.whatsappLabel} value={contact.phone} href={whatsappUrl} external action={p.whatsappButton} gradient="from-whatsapp to-whatsapp-dark" />
            <ContactCard icon={MapPin} label={cards.locationLabel} value={contact.location} gradient="from-cyan-500 to-sky-600" />
            <ContactCard icon={Clock} label={cards.availabilityLabel} value={contact.availability} gradient="from-indigo-500 to-violet-600" />
          </StaggerGroup>

          <Reveal>
            <p className="mt-5 text-center text-xs font-semibold text-ink-soft">{p.footerLine}</p>
          </Reveal>
        </div>

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
