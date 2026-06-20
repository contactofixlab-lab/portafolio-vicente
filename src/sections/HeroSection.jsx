import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { floatVariants, blurInVariants, scaleUpVariants, glowVariants } from '../utils/animations'

export default function HeroSection() {
  const floatingBadges = [
    { label: 'Frontend', icon: '💻', delay: 0 },
    { label: 'Backend', icon: '⚙️', delay: 0.5 },
    { label: 'Data', icon: '📊', delay: 1 }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Texto */}
        <div className="space-y-6">
          <Badge variant="success" animated>
            🟢 Disponible para trabajar
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"
          >
            Hola, soy Vicente Rabanales
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600"
          >
            Ingeniero en Informática | Innovación & Desarrollo
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 max-w-lg leading-relaxed"
          >
            Especialista en transformación digital, infraestructura y soluciones innovadoras. Con experiencia en liderazgo de equipos y desarrollo de proyectos estratégicos que generan impacto empresarial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-4 pt-4 flex-wrap"
          >
            <Button variant="primary" size="lg">
              Ver mis proyectos
            </Button>
            <Button variant="outline" size="lg">
              Descargar CV
            </Button>
          </motion.div>
        </div>

        {/* Imagen + Badges flotantes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative flex justify-center items-center"
        >
          {/* Avatar circular */}
          <motion.div
            animate={glowVariants.animate}
            className="w-80 h-80 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center border-4 border-primary-200 shadow-2xl"
          >
            <motion.span
              animate={floatVariants.animate}
              className="text-8xl"
            >
              👨‍💻
            </motion.span>
          </motion.div>

          {/* Badges flotantes */}
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              animate={{ y: [0, -20, 0], x: [0, 5, 0] }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 4, repeat: Infinity, delay: badge.delay, ease: 'easeInOut' }}
              style={{
                top: idx === 0 ? '-20px' : idx === 1 ? '50%' : 'auto',
                left: idx === 0 ? '10%' : 'auto',
                right: idx === 1 ? '-30px' : 'auto',
                bottom: idx === 2 ? '10%' : 'auto'
              }}
            >
              <span className="text-3xl block mb-2">{badge.icon}</span>
              <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">{badge.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
