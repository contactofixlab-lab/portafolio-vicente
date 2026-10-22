import { motion } from 'framer-motion'
import WhatsAppIcon from './ui/WhatsAppIcon'
import { contact } from '../content'

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 2 }}
      className="group fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={contact.whatsappTooltip}
        whileHover={{ scale: 1.12, rotate: -6 }}
        whileTap={{ scale: 0.92 }}
        className="relative grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-white shadow-[0_18px_44px_-10px_rgba(37,211,102,0.75)]"
      >
        <WhatsAppIcon size={34} />
      </motion.a>

      <span className="pointer-events-none absolute bottom-1/2 right-[calc(100%+14px)] translate-x-2 translate-y-1/2 whitespace-nowrap rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
        {contact.whatsappTooltip}
      </span>
    </motion.div>
  )
}
