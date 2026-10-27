import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Plus, ArrowUpRight } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { contact, ui } from '../content'

const p = contact.page
const faqs = p.faqs
const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

/** Tarjeta grande de contacto: con acción (enlace) o solo informativa. */
function ContactCard({ icon: Icon, label, value, href, action, gradient, span = 'lg:col-span-2', external = false, whatsapp = false }) {
  const body = (
    <Tilt max={6} scale={1.025} className="h-full rounded-[2rem]">
      <div className="led-hover relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-white p-8 shadow-card md:p-9">
        <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${gradient}`} />
        <motion.div whileHover={{ rotate: 8, scale: 1.12 }} className={`mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-soft`}>
          {whatsapp ? <WhatsAppIcon size={38} /> : <Icon size={38} />}
        </motion.div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">{label}</p>
        <p className="break-words font-display text-2xl font-extrabold leading-tight text-ink md:text-3xl">{value}</p>
        {action && (
          <span className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors group-hover:bg-primary-600">
            {action}
            <ArrowUpRight size={18} />
          </span>
        )}
      </div>
    </Tilt>
  )

  return (
    <StaggerItem className={span}>
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

      <Section bg="cream" className="-mt-px">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-3xl font-extrabold text-ink md:text-5xl">{p.infoTitle}</h2>
        </Reveal>

        <StaggerGroup className="grid gap-6 lg:grid-cols-6">
          <ContactCard icon={Mail} label={cards.emailLabel} value={contact.email} href={`mailto:${contact.email}`} action={contact.home.emailButton} gradient="from-sky-500 to-blue-600" />
          <ContactCard icon={Phone} label={cards.phoneLabel} value={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, '')}`} action={contact.home.phoneButton} gradient="from-violet-500 to-purple-600" />
          <ContactCard whatsapp label={cards.whatsappLabel} value={contact.phone} href={whatsappUrl} external action={p.whatsappButton} gradient="from-whatsapp to-whatsapp-dark" />
          <ContactCard icon={MapPin} label={cards.locationLabel} value={contact.location} gradient="from-cyan-500 to-sky-600" span="lg:col-span-3" />
          <ContactCard icon={Clock} label={cards.availabilityLabel} value={contact.availability} gradient="from-indigo-500 to-violet-600" span="lg:col-span-3" />
        </StaggerGroup>

        <Reveal>
          <p className="mt-8 text-center text-sm font-semibold text-ink-soft">{p.footerLine}</p>
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
