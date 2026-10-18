import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { footer } from '../content'

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = footer.social.filter((link) => link.href)

  return (
    <footer className="bg-primary-500 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0">
                <span className="text-primary-600 font-bold text-2xl">{footer.logoLetter}</span>
              </div>
              <span className="font-bold text-3xl">{footer.name}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">{footer.navTitle}</h3>
            <ul className="space-y-2 text-sm">
              {footer.nav.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className="text-white/70 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">{footer.socialTitle}</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.label] || Mail
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white/80 hover:scale-110 transition-transform"
                    title={link.label}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 py-8">
          <p className="text-center text-white/60 text-sm">
            © {currentYear} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
