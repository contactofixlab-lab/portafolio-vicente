import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { life, ui } from '../content'

const PLACEHOLDERS = [
  { gradient: 'from-primary-300 to-accent-300', emoji: '🏔️' },
  { gradient: 'from-accent-300 to-primary-400', emoji: '🌊' },
  { gradient: 'from-primary-200 to-primary-400', emoji: '🌿' },
  { gradient: 'from-primary-400 to-primary-600', emoji: '🎮' },
  { gradient: 'from-accent-200 to-primary-300', emoji: '🐕' }
]

const SPANS = ['row-span-1', 'row-span-2', 'row-span-1', 'row-span-2', 'row-span-2']
const TILTS = [-2.5, 2, -1.5, 2.5, -2]

function Tile({ image, index }) {
  const placeholder = PLACEHOLDERS[index % PLACEHOLDERS.length]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: TILTS[index] * 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: TILTS[index] }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 160, damping: 16 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border-4 border-white bg-white shadow-soft ${SPANS[index]}`}
    >
      {image.src ? (
        <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      ) : (
        <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${placeholder.gradient}`}>
          <span className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">{placeholder.emoji}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function LifeSection() {
  const images = life.images.slice(0, 5)

  return (
    <Section id="vida" bg="white" next="peach">
      <SectionHeading eyebrow={ui.eyebrows.life} title={life.title} />

      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-10">
          <Reveal>
            <p className="text-xl leading-relaxed text-ink-soft">{life.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-accent-50 p-8 shadow-card">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-300/30 blur-2xl" />
              <h3 className="relative mb-6 font-display text-2xl font-extrabold text-ink md:text-3xl">{life.hobbiesTitle}</h3>
              <StaggerGroup className="relative grid grid-cols-2 gap-4 md:grid-cols-3">
                {life.hobbies.map((hobby, idx) => (
                  <StaggerItem key={`${hobby.name}-${idx}`}>
                    <motion.div
                      whileHover={{ y: -8, rotate: idx % 2 ? 3 : -3, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                      title={hobby.description}
                      className="rounded-2xl border border-white bg-white p-3 text-center shadow-card sm:p-4"
                    >
                      <motion.div whileHover={{ scale: 1.3 }} className="mb-2 text-4xl">
                        {hobby.icon}
                      </motion.div>
                      <p className="break-words text-xs font-bold text-ink min-[400px]:text-sm">{hobby.name}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>

        <div className="grid h-[34rem] grid-cols-2 grid-rows-4 gap-4 sm:h-[40rem]">
          {images.map((image, idx) => (
            <Tile key={idx} image={image} index={idx} />
          ))}
        </div>
      </div>
    </Section>
  )
}
