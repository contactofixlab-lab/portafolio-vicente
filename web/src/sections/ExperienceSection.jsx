import { motion } from 'framer-motion'
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
          <div className="space-y-12">
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
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
                      {/* Decorative Top Bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                        exp.badge === 'Actual' ? 'from-green-500 to-green-400' :
                        exp.badge === 'Liderazgo' ? 'from-amber-500 to-amber-400' :
                        exp.badge === 'Estrategia' ? 'from-red-500 to-red-400' :
                        exp.badge === 'Operaciones' ? 'from-blue-500 to-blue-400' :
                        exp.badge === 'Sistemas' ? 'from-purple-500 to-purple-400' :
                        'from-primary-500 to-primary-400'
                      }`}></div>

                      <div className="space-y-5">
                        {/* Title Section */}
                        <div className="pt-2">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                {exp.title}
                              </h3>
                              <p className="text-primary-600 dark:text-primary-400 font-bold text-lg mt-1">
                                {exp.company}
                              </p>
                            </div>
                            <Badge variant={badgeVariants[exp.badge]} className="flex-shrink-0 mt-1">
                              {exp.badge}
                            </Badge>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-0.5 bg-gradient-to-r from-primary-200 to-transparent dark:from-primary-800"></div>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          {exp.description}
                        </p>

                        {/* Date Section */}
                        <div className="pt-4 flex items-center gap-3 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-700 dark:to-transparent rounded-lg px-4 py-3">
                          <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {exp.startDate} <span className="text-primary-500">→</span> {exp.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex md:w-0 justify-center items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 400 }}
                    className="relative"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-6 h-6 bg-primary-500 rounded-full opacity-20"
                    ></motion.div>
                  </motion.div>
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
