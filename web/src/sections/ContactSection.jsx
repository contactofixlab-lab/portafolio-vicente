import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Mail, Phone } from 'lucide-react'

export default function ContactSection() {
  const contactItems = [
    {
      id: 1,
      title: 'Email',
      value: 'v.rabanales23@gmail.com',
      icon: Mail,
      color: 'from-blue-500 to-blue-400',
      href: 'mailto:v.rabanales23@gmail.com',
      buttonText: 'Enviar Email'
    },
    {
      id: 2,
      title: 'Teléfono',
      value: '+56 9 6668 2082',
      icon: Phone,
      color: 'from-green-500 to-green-400',
      href: 'tel:+56966682082',
      buttonText: 'Llamar'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="contacto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900">
            Ponte en contacto
          </h2>
          <p className="text-xl text-gray-600">
            ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y colaborar en nuevas soluciones.
          </p>
        </div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.id} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Top Gradient Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-semibold break-all text-lg">
                        {item.value}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>

                    {/* Button */}
                    <motion.a
                      href={item.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      {item.buttonText}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Direct Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <Card hoverable className="bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                📬 Prefiero contacto directo
              </h3>
              <p className="text-gray-600">
                Soy accesible y respondo rápidamente. No dudes en escribir para cualquier oportunidad o consulta.
              </p>
              <motion.a
                href="mailto:v.rabanales23@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Button variant="primary" size="lg">
                  Contactarme Ahora
                </Button>
              </motion.a>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
