import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import CertificateCard from '../components/CertificateCard'
import { certificates as c, ui } from '../content'

const ITEMS_PER_VIEW = 3

export default function CertificatesCanvas() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const certificates = c.items
  const maxIndex = Math.max(0, certificates.length - ITEMS_PER_VIEW)
  const visible = certificates.slice(currentIndex, currentIndex + ITEMS_PER_VIEW)
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === maxIndex

  return (
    <Section id="certificados" bg="peach" next="cream" wide>
      <SectionHeading eyebrow={ui.eyebrows.certificates} title={c.title} subtitle={c.subtitle} />

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 gap-7 md:grid-cols-3"
      >
        {visible.map((cert) => (
          <CertificateCard key={cert.name} certificate={cert} />
        ))}
      </motion.div>

      <div className="mt-12 flex items-center justify-center gap-8">
        <motion.button
          type="button"
          whileHover={{ scale: isAtStart ? 1 : 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
          disabled={isAtStart}
          aria-label="Certificados anteriores"
          className={`grid h-14 w-14 place-items-center rounded-full transition-all ${isAtStart ? 'cursor-not-allowed bg-white/60 text-gray-400' : 'bg-white text-primary-600 shadow-glow'}`}
        >
          <ChevronLeft size={28} />
        </motion.button>

        <div className="min-w-40 text-center">
          <div className="font-display text-2xl font-extrabold text-ink">
            {currentIndex + 1} - {Math.min(currentIndex + ITEMS_PER_VIEW, certificates.length)}
          </div>
          <div className="text-sm font-semibold text-ink-soft">de {certificates.length} certificados</div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: isAtEnd ? 1 : 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCurrentIndex(Math.min(currentIndex + 1, maxIndex))}
          disabled={isAtEnd}
          aria-label="Certificados siguientes"
          className={`grid h-14 w-14 place-items-center rounded-full transition-all ${isAtEnd ? 'cursor-not-allowed bg-white/60 text-gray-400' : 'bg-white text-primary-600 shadow-glow'}`}
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir al grupo ${idx + 1}`}
            className={`h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-9 bg-primary-600' : 'w-3 bg-primary-300 hover:bg-primary-400'}`}
          />
        ))}
      </div>

      <Reveal className="mt-8 text-center text-sm font-semibold text-ink-soft">{c.hint}</Reveal>
    </Section>
  )
}
