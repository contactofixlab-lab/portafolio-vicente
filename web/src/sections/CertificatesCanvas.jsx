import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CertificateCard from '../components/CertificateCard'
import { certificates as c } from '../content'

export default function CertificatesCanvas() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const certificates = c.items

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
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-400 bg-clip-text text-transparent">
            {c.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

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

        <div className="flex items-center justify-center gap-8">
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

          <div className="text-center min-w-40">
            <div className="text-lg font-bold text-gray-900">
              {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, certificates.length)}
            </div>
            <div className="text-sm text-gray-600">
              de {certificates.length} certificados
            </div>
          </div>

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

        <div className="flex gap-2 justify-center">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 pt-4"
        >
          {c.hint}
        </motion.div>
      </motion.div>
    </section>
  )
}
