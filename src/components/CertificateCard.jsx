import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'

export default function CertificateCard({ certificate }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="group cursor-pointer"
      >
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-primary-300">
          {/* Logo Section */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 flex items-center justify-center h-40">
            <motion.img
              src={certificate.logo}
              alt={certificate.issuer}
              className="h-20 object-contain group-hover:scale-110 transition-transform"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-6">
            <div className="space-y-3">
              {/* Title */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {certificate.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{certificate.issuer}</p>
              </div>

              {/* Description */}
              {certificate.description && (
                <p className="text-sm text-gray-600">
                  {certificate.description}
                </p>
              )}

              {/* Year Badge */}
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="accent" className="text-xs">
                  📅 {certificate.year}
                </Badge>
              </div>
            </div>

            {/* Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium group-hover:from-primary-600 group-hover:to-primary-700"
            >
              <ExternalLink size={18} />
              Ver Certificado
            </motion.button>
          </div>
        </Card>
      </motion.div>

      {/* Modal para ver certificado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-700" />
              </motion.button>

              {/* Header */}
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={certificate.logo}
                    alt={certificate.issuer}
                    className="h-16 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {certificate.name}
                    </h3>
                    <p className="text-gray-600">{certificate.issuer}</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="p-8 bg-gray-50">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-gray-200 bg-white flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600">Certificado Emitido</p>
                  <p className="text-lg font-bold text-gray-900">{certificate.year}</p>
                </div>
                <Badge variant="success" className="text-base">
                  ✓ Verificado y Válido
                </Badge>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
