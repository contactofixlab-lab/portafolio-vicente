import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SkillImage from '../components/ui/SkillImage'
import CertificateCard from '../components/CertificateCard'

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Lenguajes de Programación
  const languages = [
    { name: 'JavaScript', image: '/JavaScript-logo.png' },
    { name: 'SQL', image: '/Logo Sql Developer.png' },
    { name: 'Java', image: '/java logo.png' },
    { name: 'Python', image: '/python logo.png' }
  ]

  // Business Intelligence
  const bi = [
    { name: 'Power BI', image: '/power bi logo.png' },
    { name: 'Microsoft 365', image: '/microsoft 365 logo.jpg' }
  ]

  // Herramientas de Gestión
  const management = [
    { name: 'MobySuite', image: '/mobysuite logo.png' },
    { name: 'Transbank', image: '/Transbank.png' },
    { name: 'GoFirmex', image: '/gofirmex logo.png' }
  ]

  // Colaboración y Desarrollo
  const collaboration = [
    { name: 'Trello', image: '/trello logo.png' },
    { name: 'GitHub', image: '/github logo.png' },
    { name: 'ClickUp', image: '/clickup logo.jfif' },
    { name: 'Miro', image: '/miro logo.png' }
  ]

  // IA y Herramientas Modernas
  const modern = [
    { name: 'V0.dev', image: '/vo.dev logo.png' },
    { name: 'ChatGPT', image: '/chatgpt logo.jpg' },
    { name: 'Google Adsense', image: '/google adsense logo.jpg' },
    { name: 'Bizagi', image: '/bizagi modeler.png' },
    { name: 'Claude', image: '/claud logo.png' }
  ]

  // Certificaciones
  const certificates = [
    {
      name: 'Excel Avanzado',
      image: '/Certificados/Excel Avanzado.jpg',
      issuer: 'Microsoft Office Specialist',
      logo: '/microsoft 365 logo.jpg',
      description: 'Dominio avanzado de Excel y análisis de datos',
      year: 2024
    },
    {
      name: 'Master Hardware',
      image: '/Certificados/Master Hardware.jpg',
      issuer: 'Certificación Técnica',
      logo: '/Logo Sql Developer.png',
      description: 'Especialización en hardware y reparación de equipos',
      year: 2024
    },
    {
      name: 'Importación en Alibaba',
      image: '/Certificados/alibaba.jpg',
      issuer: 'Alibaba International',
      logo: '/trello logo.png',
      description: 'Especialización en procesos de importación y comercio electrónico',
      year: 2024
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Habilidades & Tecnologías
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stack completo de tecnologías y herramientas que utilizo en mis proyectos
          </p>
        </div>

        {/* Lenguajes de Programación */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Lenguajes de Programación
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {languages.map((lang, idx) => (
              <motion.div key={lang.name} variants={itemVariants}>
                <Card className="text-center h-full flex flex-col items-center justify-center py-8 hover:shadow-xl transition-all bg-gradient-to-br from-primary-50 to-primary-100">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <SkillImage name={lang.name} size="xl" />
                  </div>
                  <h4 className="font-bold text-gray-900">{lang.name}</h4>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Intelligence */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Business Intelligence
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {bi.map((tool, idx) => (
              <motion.div key={tool.name} variants={itemVariants}>
                <Card className="text-center h-full flex flex-col items-center justify-center py-12 hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-blue-100">
                  <SkillImage name={tool.name} size="lg" />
                  <h4 className="font-bold text-gray-900 text-lg mt-4">{tool.name}</h4>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Herramientas de Gestión */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Herramientas de Gestión
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {management.map((tool, idx) => (
              <motion.div key={tool.name} variants={itemVariants}>
                <Card className="flex items-center gap-4 py-4 px-6 hover:shadow-lg transition-all bg-white">
                  <SkillImage name={tool.name} size="md" />
                  <span className="font-semibold text-gray-900">{tool.name}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Colaboración y Desarrollo */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Colaboración & Desarrollo
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {collaboration.map((tool, idx) => (
              <motion.div key={tool.name} variants={itemVariants}>
                <Card className="flex items-center gap-4 py-4 px-6 hover:shadow-lg transition-all bg-white">
                  <SkillImage name={tool.name} size="md" />
                  <span className="font-semibold text-gray-900">{tool.name}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Herramientas Modernas & IA */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Herramientas Modernas & IA
              </h3>
              <p className="text-gray-600">Tecnologías de vanguardia para desarrollo e innovación</p>
            </div>

            {/* Grid side-by-side */}
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
              {modern.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, rotateZ: 2 }}
                  className="group"
                >
                  <Card className="h-full flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-br from-purple-50 via-primary-50 to-accent-50 border-2 border-transparent hover:border-primary-300 hover:shadow-2xl transition-all cursor-pointer">
                    <div className="mb-3 transform group-hover:scale-110 transition-transform">
                      <SkillImage name={tool.name} size="lg" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-center text-sm leading-tight">
                      {tool.name}
                    </h4>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certificaciones */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                🏆 Certificaciones & Credenciales
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Certificados profesionales reconocidos que validan mi expertise en diferentes áreas
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <motion.div key={cert.name} variants={itemVariants}>
                  <CertificateCard certificate={cert} />
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200"
            >
              {[
                { icon: '📚', label: 'Certificados', value: certificates.length },
                { icon: '🎯', label: 'Validados', value: '100%' },
                { icon: '⭐', label: 'Vigentes', value: 'Sí' }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg"
                >
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
