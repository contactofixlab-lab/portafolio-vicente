import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import CertificateCard from '../components/CertificateCard'

export default function CertificatesCanvas() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const certificates = [
    {
      name: 'Excel Avanzado',
      image: '/Certificados/Excel Avanzado.jpg',
      logo: '/Certificados/Excel avanzado imagen portada.jpg',
      issuer: 'Microsoft Office Specialist',
      description: 'Dominio avanzado de Excel y análisis de datos',
      year: 2024
    },
    {
      name: 'Master Hardware & Reparación',
      image: '/Certificados/Master Hardware.jpg',
      logo: '/Certificados/hardware reparacion portada.jfif',
      issuer: 'Certificación Técnica',
      description: 'Especialización en hardware, mantenimiento y reparación de equipos',
      year: 2024
    },
    {
      name: 'Power BI',
      image: '/Certificados/Power bi.jpg',
      logo: '/Certificados/power bi portada.jpg',
      issuer: 'Microsoft Business Intelligence',
      description: 'Análisis avanzado de datos y visualización con Power BI',
      year: 2024
    },
    {
      name: 'Project Management',
      image: '/Certificados/Proyect Management-Gestion de Proyectos.jpg',
      logo: '/Certificados/gestion proyectos portada.jfif',
      issuer: 'Gestión de Proyectos Profesional',
      description: 'Certificación en metodologías y gestión de proyectos',
      year: 2024
    },
    {
      name: 'Importación en Alibaba',
      image: '/Certificados/alibaba.jpg',
      logo: '/Certificados/importacion alibaba portada.webp',
      issuer: 'Alibaba International',
      description: 'Especialización en procesos de importación y comercio electrónico',
      year: 2024
    }
  ]

  const itemsPerView = 3
  const maxIndex = Math.max(0, certificates.length - itemsPerView)

  const goNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex))
  }

  const goPrev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  const visibleCertificates = certificates.slice(currentIndex, currentIndex + itemsPerView)
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === maxIndex

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-400 bg-clip-text text-transparent">
            🏆 Certificaciones & Credenciales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora mis certificados profesionales validados - desliza o usa las flechas
          </p>
        </div>

        {/* Cards Grid - 3 Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleCertificates.map((cert) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CertificateCard certificate={cert} />
            </motion.div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: isAtStart ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={isAtStart}
            className={`p-3 rounded-full transition-all ${
              isAtStart
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg active:shadow-md'
            }`}
          >
            <ChevronLeft size={28} />
          </motion.button>

          {/* Stats */}
          <div className="text-center min-w-40">
            <div className="text-lg font-bold text-gray-900">
              {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, certificates.length)}
            </div>
            <div className="text-sm text-gray-600">
              de {certificates.length} certificados
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: isAtEnd ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            disabled={isAtEnd}
            className={`p-3 rounded-full transition-all ${
              isAtEnd
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg active:shadow-md'
            }`}
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 justify-center">
          {Array.from({ length: certificates.length - itemsPerView + 1 }).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`h-3 rounded-full transition-all ${
                currentIndex === idx
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 w-3 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 pt-4"
        >
          💡 Haz clic en cualquier certificado para ver los detalles completos
        </motion.div>
      </motion.div>
    </section>
  )
}
