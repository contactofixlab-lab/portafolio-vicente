import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react'
import Wave from './ui/Wave'
import Marquee from './ui/Marquee'
import { footer, contact, ui } from '../content'

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail
}

function MarqueeText() {
  const text = contact.availability || 'Disponible para nuevos proyectos'
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex items-center gap-6 font-display text-5xl md:text-7xl font-extrabold whitespace-nowrap">
          <span className="text-transparent led-sync [-webkit-text-stroke:2px_var(--led)] [filter:drop-shadow(0_0_10px_var(--led))]">{text}</span>
          <span className="text-white/90">✦</span>
          <span className="text-white led-text">{ui.footer.marquee}</span>
          <span className="text-white/90">✦</span>
        </span>
      ))}
    </>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = footer.social.filter((link) => link.href)

  return (
    <footer className="relative bg-primary-50">
      <div className="relative h-24 sm:h-32">
        <Wave fill="#0a1030" height={128} />
      </div>

      <div className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 dots opacity-25" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent-400/25 blur-3xl animate-morph" />

        <Marquee className="relative pt-4 pb-10" speed={42}>
          <MarqueeText />
        </Marquee>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid gap-12 md:grid-cols-3 pb-12">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl led-pill font-display text-3xl font-extrabold text-white"
                >
                  {footer.logoLetter}
                </motion.div>
                <span className="font-display text-3xl font-extrabold leading-none">{footer.name}</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="mb-4 font-display text-xl font-bold">{footer.navTitle}</h3>
              <ul className="space-y-1">
                {footer.nav.map((item) => (
                  <li key={item.href + item.label}>
                    <a href={item.href} className="group inline-flex items-center gap-2 py-1 text-white/80 transition-all hover:text-white hover:translate-x-1.5">
                      <span className="h-0.5 w-0 rounded bg-white transition-all group-hover:w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <h3 className="mb-4 font-display text-xl font-bold">{footer.socialTitle}</h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.label] || Mail
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      title={link.label}
                      aria-label={link.label}
                      whileHover={{ y: -5, rotate: -6, scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur transition-colors hover:bg-accent-400 hover:text-night"
                    >
                      <Icon size={22} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/25 pt-8 sm:flex-row sm:pr-20 xl:pr-0">
            <p className="text-center text-sm text-white/75">
              © {currentYear} {footer.copyright}
            </p>
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              className="inline-flex items-center gap-2 rounded-full led-pill px-5 py-2.5 text-sm font-bold text-white"
            >
              {ui.footer.backToTop}
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
