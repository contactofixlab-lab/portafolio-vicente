import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp() {
  const phoneNumber = '56966682082'
  const message = 'Hola Vicente, quisiera ponerme en contacto contigo...'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />

        {/* Pulse Animation */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-green-500 rounded-full opacity-20"
        />
      </motion.a>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-20 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
      >
        Contactame por WhatsApp
        <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mb-1"></div>
      </motion.div>
    </motion.div>
  )
}
