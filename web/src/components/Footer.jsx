import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'text-white/80' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-white/80' },
    { icon: Mail, label: 'Email', href: 'mailto:vrabanales@rcapcorp.cl', color: 'text-white/80' }
  ]

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'vrabanales@rcapcorp.cl', href: 'mailto:vrabanales@rcapcorp.cl' },
    { icon: MapPin, label: 'Ubicación', value: 'Chile / Uruguay' }
  ]

  return (
    <footer className="bg-primary-500 text-white mt-20">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold">V</span>
              </div>
              <span className="font-bold text-lg">Vicente Rabanales</span>
            </div>
            <p className="text-white/70 text-sm">
              Ingeniero en Informática | Innovación & Desarrollo
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-white/70 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/proyectos" className="text-white/70 hover:text-white transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-white/70 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Sígueme</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`${link.color} hover:scale-110 transition-transform`}
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

        {/* Divider */}
        <div className="border-t border-white/20 py-8">
          <p className="text-center text-white/60 text-sm">
            © {currentYear} Vicente Rabanales. Hecho con ❤️ usando React + Tailwind + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
