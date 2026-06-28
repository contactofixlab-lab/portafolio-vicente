import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import SkillImage from '../components/ui/SkillImage'
import { skillsCategories } from '../data/skills'
import { ArrowLeft } from 'lucide-react'

export default function FullSkillsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
            Todas mis Habilidades & Tecnologías
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stack completo de herramientas, lenguajes de programación y tecnologías que utilizo en mis proyectos y en mi trabajo diario.
          </p>
        </div>

        {/* All Categories */}
        <div className="space-y-16">
          {skillsCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              {/* Category Title */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{category.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <Card className="h-full flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 border-2 border-transparent hover:border-primary-300 hover:shadow-xl transition-all cursor-pointer group">
                      <div className="mb-3 group-hover:scale-110 transition-transform">
                        <SkillImage name={skill.name} size="lg" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-center text-sm leading-tight">
                        {skill.name}
                      </h4>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
