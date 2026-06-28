import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Mail } from 'lucide-react'

export default function ContactSection() {
  const contactItems = [
    {
      id: 1,
      title: 'Email',
      value: 'vrabanales@rcapcorp.cl',
      icon: Mail,
      color: 'text-primary-500',
      href: 'mailto:vrabanales@rcapcorp.cl'
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
          className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto"
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.id} variants={itemVariants}>
                <Card hoverable className="text-center py-12">
                  <motion.div
                    className={`text-5xl mb-4 flex justify-center ${item.color}`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Icon size={48} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 break-all">
                    {item.value}
                  </p>
                  <Button variant="primary" size="md" onClick={() => window.open(item.href, '_blank')}>
                    {item.title === 'Email' ? 'Enviar Email' : 'Ver Ubicación'}
                  </Button>
                </Card>
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
                href="mailto:vrabanales@rcapcorp.cl"
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
