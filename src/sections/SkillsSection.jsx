import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import SkillImage from '../components/ui/SkillImage'
import { skillsCategories } from '../data/skills'

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Mostrar solo las primeras 3 categorías
  const featuredCategories = skillsCategories.slice(0, 3)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Habilidades & Tecnologías
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mis principales herramientas y tecnologías
          </p>
        </div>

        {/* Featured Categories */}
        <motion.div className="space-y-12">
          {featuredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center">
                {category.icon} {category.name}
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card className="text-center h-full flex flex-col items-center justify-center py-8 hover:shadow-xl transition-all bg-gradient-to-br from-primary-50 to-primary-100">
                      <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4 shadow-md">
                        <SkillImage name={skill.name} size="xl" />
                      </div>
                      <h4 className="font-bold text-gray-900">{skill.name}</h4>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ver Más Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <motion.a
            href="#habilidades"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Ver Todas las Habilidades
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
