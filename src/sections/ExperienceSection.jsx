import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { experiences } from '../data/experiences'

export default function ExperienceSection() {
  const badgeVariants = {
    Entrada: 'primary',
    Aprendizaje: 'success',
    Liderazgo: 'warning',
    Estrategia: 'danger',
    Operaciones: 'info',
    Sistemas: 'success',
    Actual: 'success'
  }

  // Mostrar solo las últimas 3 experiencias
  const recentExperiences = experiences.slice(0, 3)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Mi Trayectoria Profesional
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Especialista en sistemas, innovación y transformación digital.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line SVG */}
          <svg
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4 800"
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="800"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </svg>

          {/* Experience Cards */}
          <div className="space-y-8">
            {recentExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`md:flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Left/Right Content */}
                <div className="md:w-1/2 px-4">
                  <Card hoverable>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {exp.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {exp.company}
                        </p>
                      </div>

                      <p className="text-gray-600">
                        {exp.description}
                      </p>

                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-sm text-gray-500">
                          {exp.startDate} — {exp.endDate}
                        </span>
                        <Badge variant={badgeVariants[exp.badge]}>
                          {exp.badge}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex md:w-0 justify-center items-start pt-4">
                  <motion.div
                    className="w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  />
                </div>

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ver Más Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <motion.a
            href="#trayectoria"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Ver Trayectoria Completa
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
