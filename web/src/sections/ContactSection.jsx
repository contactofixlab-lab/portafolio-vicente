import { motion } from 'framer-motion'
import { Mail, Phone, ArrowRight, ArrowUpRight, MessageSquareText, MapPin } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { contact, ui } from '../content'

/** Acceso rápido: una fila compacta con ícono, dato y flecha. El destacado lleva a la página de Contacto. */
function Tile({ icon: Icon, whatsapp = false, label, value, href, external = false, gradient, featured = false, action, desktopOnly = false }) {
  return (
    <StaggerItem className={desktopOnly ? 'hidden lg:block' : ''}>
      <Tilt max={4} scale={1.02} className="rounded-3xl">
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={action ? `${action}: ${value}` : value}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl border-2 p-4 pr-5 transition-colors ${featured ? 'led-btn border-transparent' : 'led-hover border-white bg-white shadow-card'}`}
        >
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-soft transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${featured ? 'bg-white/20 backdrop-blur' : `bg-gradient-to-br ${gradient}`}`}>
            {whatsapp ? <WhatsAppIcon size={24} /> : <Icon size={24} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block text-[0.7rem] font-bold uppercase tracking-[0.18em] ${featured ? 'text-white/80' : 'text-primary-600'}`}>{label}</span>
            <span className={`block font-display text-[0.92rem] font-extrabold leading-snug [overflow-wrap:anywhere] sm:text-lg ${featured ? 'text-white' : 'text-ink'}`}>{value}</span>
          </span>
          <span className={`hidden h-9 w-9 shrink-0 place-items-center rounded-full transition-all sm:grid duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${featured ? 'bg-white text-primary-700' : 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'}`}>
            <ArrowUpRight size={18} />
          </span>
        </a>
      </Tilt>
    </StaggerItem>
  )
}

export default function ContactSection() {
  const h = contact.home
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

  return (
    <Section id="contacto" bg="cream">
      <SectionHeading eyebrow={ui.eyebrows.contact} title={h.title} subtitle={h.subtitle} />

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-night via-primary-900 to-primary-700 p-7 text-white shadow-[0_40px_90px_-40px_rgba(30,36,160,0.7)] sm:p-10">
            <div className="absolute inset-0 dots opacity-25" />
            <motion.div className="absolute -left-16 -top-16 h-60 w-60 rounded-full bg-accent-400/40 blur-3xl animate-morph" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
            <div className="absolute -bottom-10 -right-8 hidden h-36 w-36 rounded-full border-[12px] border-accent-400/30 animate-float md:block" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2.5">
                {contact.availability && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3.5 py-1.5 text-sm font-bold text-emerald-200">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    {contact.availability}
                  </span>
                )}
                {contact.location && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/80">
                    <MapPin size={14} />
                    {contact.location}
                  </span>
                )}
              </div>

              <h3 className="led-text mt-6 max-w-xl font-display text-3xl font-extrabold leading-tight sm:text-4xl xl:text-5xl">{h.directTitle}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{h.directText}</p>

              <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
                <Button href="#contacto" variant="light" size="lg" shine={false}>
                  {h.directButton}
                  <ArrowRight size={20} />
                </Button>
                <Button href={whatsappUrl} target="_blank" variant="whatsapp" size="lg" shine={false}>
                  <WhatsAppIcon size={22} />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="grid content-between gap-3.5 lg:col-span-2">
          <Tile featured desktopOnly icon={MessageSquareText} label={ui.eyebrows.contact} value={h.directButton} href="#contacto" action={h.directButton} />
          <Tile icon={Mail} label={h.emailTitle} value={contact.email} href={`mailto:${contact.email}`} gradient="from-sky-500 to-blue-600" action={h.emailButton} />
          <Tile icon={Phone} label={h.phoneTitle} value={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, '')}`} gradient="from-violet-500 to-purple-600" action={h.phoneButton} />
          <Tile whatsapp desktopOnly label={ui.contactCards.whatsappLabel} value={contact.phone} href={whatsappUrl} external gradient="from-whatsapp to-whatsapp-dark" action="WhatsApp" />
        </StaggerGroup>
      </div>
    </Section>
  )
}
