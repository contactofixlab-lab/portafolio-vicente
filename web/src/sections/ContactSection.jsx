import { motion } from 'framer-motion'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import Wave from '../components/ui/Wave'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { contact, ui } from '../content'

export default function ContactSection() {
  const h = contact.home
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

  const items = [
    { id: 1, title: h.emailTitle, value: contact.email, icon: Mail, gradient: 'from-sky-500 to-blue-600', href: `mailto:${contact.email}`, button: h.emailButton },
    { id: 2, title: h.phoneTitle, value: contact.phone, icon: Phone, gradient: 'from-emerald-500 to-green-600', href: `tel:${contact.phone.replace(/\s+/g, '')}`, button: h.phoneButton }
  ]

  return (
    <Section id="contacto" bg="cream">
      <SectionHeading eyebrow={ui.eyebrows.contact} title={h.title} subtitle={h.subtitle} />

      <Reveal>
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-6 pb-36 pt-16 text-center text-white shadow-[0_50px_100px_-40px_rgba(154,52,18,0.8)] sm:px-14">
          <div className="absolute inset-0 dots opacity-25" />
          <motion.div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-400/40 blur-3xl animate-morph" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
          <div className="absolute -right-10 top-10 hidden h-40 w-40 rounded-full border-[14px] border-white/20 animate-float md:block" />

          <div className="relative">
            <h3 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">{h.directTitle}</h3>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 md:text-xl">{h.directText}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
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
          <Wave fill="#fff7ed" height={90} />
        </div>
      </Reveal>

      <StaggerGroup className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <StaggerItem key={item.id}>
              <Tilt max={7} scale={1.03} className="rounded-3xl">
                <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-white p-8 shadow-card">
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.gradient}`} />
                  <motion.div whileHover={{ rotate: 8, scale: 1.12 }} className={`mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-soft`}>
                    <Icon size={30} className="text-white" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-extrabold text-ink">{item.title}</h3>
                  <p className="mb-6 mt-1 break-all text-lg font-semibold text-ink-soft">{item.value}</p>
                  <Button href={item.href} className="w-full" shine={false}>
                    {item.button}
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </Tilt>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </Section>
  )
}
