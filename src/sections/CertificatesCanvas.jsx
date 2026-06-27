import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import CertificateCard from '../components/CertificateCard'

export default function CertificatesCanvas() {
  const [position, setPosition] = useState(0)
  const containerRef = useRef(null)
  const [dragStart, setDragStart] = useState(null)

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

  const cardWidth = 320 // width + gap
  const maxPosition = -(certificates.length - 1) * cardWidth

  const handleDragStart = (e) => {
    setDragStart(e.clientX)
  }

  const handleDragEnd = (e) => {
    if (!dragStart) return
    const dragDistance = e.clientX - dragStart

    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        // Dragged right - show previous
        setPosition(Math.min(position + cardWidth, 0))
      } else {
        // Dragged left - show next
        setPosition(Math.max(position - cardWidth, maxPosition))
      }
    }
    setDragStart(null)
  }

  const navigate = (direction) => {
    if (direction === 'left') {
      setPosition(Math.max(position - cardWidth, maxPosition))
    } else {
      setPosition(Math.min(position + cardWidth, 0))
    }
  }

  const isAtStart = position === 0
  const isAtEnd = position === maxPosition

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
            Desliza o usa las flechas para explorar mis certificados profesionales validados
          </p>
        </div>

        {/* Canvas Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: -2000, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={{ x: position }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing overflow-hidden"
          >
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.name}
                className="flex-shrink-0 w-80"
              >
                <CertificateCard certificate={cert} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">
              {Math.abs(position / cardWidth) + 1} / {certificates.length}
            </span>
            {' '}certificados
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: isAtStart ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('left')}
              disabled={isAtStart}
              className={`p-3 rounded-full transition-all ${
                isAtStart
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg'
              }`}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: isAtEnd ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('right')}
              disabled={isAtEnd}
              className={`p-3 rounded-full transition-all ${
                isAtEnd
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg'
              }`}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2">
            {certificates.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setPosition(-idx * cardWidth)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all ${
                  Math.abs(position / cardWidth) === idx
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
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
