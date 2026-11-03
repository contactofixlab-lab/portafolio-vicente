import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Plus } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Wave from '../components/ui/Wave'
import Button from '../components/ui/Button'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import ContactInfoCard from '../components/ContactInfoCard'
import { Reveal, StaggerGroup } from '../components/ui/Reveal'
import { contact, ui } from '../content'

const p = contact.page
const faqs = p.faqs
const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

function FaqItem({ faq, index, open, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-3xl border backdrop-blur-md transition-all duration-300 ${open ? 'border-accent-400/60 bg-white/[0.12] shadow-[0_0_40px_-8px_rgba(34,229,255,0.45)]' : 'border-white/15 bg-white/[0.06] hover:border-white/35 hover:bg-white/10'}`}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-4 p-5 text-left outline-none focus-visible:ring-4 focus-visible:ring-accent-400/50 md:p-6">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold transition-colors duration-300 ${open ? 'led-pill text-white' : 'bg-white/10 text-accent-300'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-display text-lg font-bold leading-snug text-white md:text-xl">{faq.q}</span>
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? 'bg-white text-primary-700' : 'bg-white/10 text-white'}`}>
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="mx-5 mb-6 border-l-2 border-accent-400/70 pl-4 text-base leading-relaxed text-white/85 md:mx-6 md:ml-[4.75rem] md:mr-6 md:text-lg">{faq.a}</p>
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
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-10 text-center font-display text-3xl font-extrabold text-ink md:text-4xl">{p.infoTitle}</h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            <ContactInfoCard index={0} icon={Mail} label={cards.emailLabel} value={contact.email} hint={cards.emailHint} href={`mailto:${contact.email}`} action={contact.home.emailButton} gradient="from-sky-500 to-blue-700" className="lg:col-span-2" />
            <ContactInfoCard index={1} icon={Phone} label={cards.phoneLabel} value={contact.phone} hint={cards.phoneHint} href={`tel:${contact.phone.replace(/\s+/g, '')}`} action={contact.home.phoneButton} gradient="from-violet-500 to-purple-700" className="lg:col-span-2" />
            <ContactInfoCard index={2} whatsapp label={cards.whatsappLabel} value={contact.phone} hint={cards.whatsappHint} href={whatsappUrl} external action={p.whatsappButton} gradient="from-whatsapp to-whatsapp-dark" className="sm:col-span-2 lg:col-span-2" />
            <ContactInfoCard index={3} icon={MapPin} label={cards.locationLabel} value={contact.location} hint={cards.locationHint} gradient="from-cyan-500 to-sky-700" className="lg:col-span-3" />
            <ContactInfoCard index={4} icon={Clock} label={cards.availabilityLabel} value={contact.availability} hint={cards.availabilityHint} gradient="from-indigo-500 to-violet-700" live className="lg:col-span-3" />
          </StaggerGroup>

          <Reveal>
            <p className="mt-8 text-center text-sm font-semibold text-ink-soft">{p.footerLine}</p>
          </Reveal>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-gradient-to-br from-night via-primary-900 to-primary-700 text-white">
        <div className="absolute inset-0 dots opacity-25" />
        <motion.div className="absolute -left-24 top-40 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl animate-morph" animate={{ x: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary-500/40 blur-3xl animate-morph" animate={{ y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <Wave fill="#eef4ff" height={100} className="!bottom-auto top-0 rotate-180" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 pb-36 pt-44 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-300 backdrop-blur">{ui.form.faqEyebrow}</span>
                <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-white md:text-5xl">
                  {p.faqTitle} <span className="led-text">{p.faqHighlight}</span>
                </h2>
                <p className="mb-6 mt-6 text-lg font-semibold text-white/80">{ui.form.faqMoreText}</p>
                <Button href={whatsappUrl} target="_blank" variant="whatsapp" size="lg" shine={false}>
                  <WhatsAppIcon size={22} />
                  {p.whatsappButton}
                </Button>
              </Reveal>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-3">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
