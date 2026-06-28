import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { experiences } from '../data/experiences'
import { ArrowLeft } from 'lucide-react'

export default function TrajectorySection() {
  const badgeVariants = {
    Entrada: 'primary',
    Aprendizaje: 'success',
    Liderazgo: 'warning',
    Estrategia: 'danger',
    Operaciones: 'info',
    Sistemas: 'success',
    Actual: 'success'
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Header con botón volver */}
        <div className="space-y-4">
          <motion.a
            href="#home"
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </motion.a>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Trayectoria Profesional Completa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Mi experiencia profesional en transformación digital, sistemas, innovación e implementación de soluciones tecnológicas. Desde 2020 hasta hoy.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line SVG */}
          <svg
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4 2000"
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="2000"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`md:flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Left/Right Content */}
                <div className="md:w-1/2 px-4">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card hoverable className="h-full">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-primary-600 font-semibold text-lg">
                            {exp.company}
                          </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {exp.startDate} → {exp.endDate}
                          </span>
                          <Badge variant={badgeVariants[exp.badge]}>
                            {exp.badge}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex md:w-0 justify-center items-start pt-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 400 }}
                    className="w-5 h-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200 dark:border-gray-700"
        >
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary-600">
              {experiences.length}
            </div>
            <p className="text-gray-600 dark:text-gray-400">Experiencias Profesionales</p>
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary-600">
              6+
            </div>
            <p className="text-gray-600 dark:text-gray-400">Años de Experiencia</p>
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary-600">
              {experiences.filter(e => e.badge === 'Actual').length}
            </div>
            <p className="text-gray-600 dark:text-gray-400">Roles Actuales</p>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8"
        >
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
