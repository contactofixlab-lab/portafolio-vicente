import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Aparece con desplazamiento y desenfoque al entrar en pantalla. */
export function Reveal({ children, delay = 0, y = 32, x = 0, className = '', blur = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } }
}

/** Contenedor que escalona la entrada de sus StaggerItem. */
export function StaggerGroup({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

/** Título que entra palabra por palabra. `highlight` pinta palabras con degradé. */
export function Words({ text, className = '', delay = 0, highlight = [] }) {
  const words = String(text).split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1" aria-hidden="true">
          <motion.span
            className={`inline-block ${highlight.includes(word) ? 'text-gradient' : ''}`}
            initial={{ y: '115%', rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.07 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}
