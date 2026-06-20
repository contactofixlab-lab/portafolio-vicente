import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredProjects = projects.slice(0, 3) // Solo 3 proyectos destacados

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const currentProject = featuredProjects[currentIndex]
  const badgeVariants = {
    'En Desarrollo': 'warning',
    'Últimas Fases': 'success',
    'Terminado': 'success'
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Navega a través de mis proyectos más recientes y relevantes
          </p>
        </div>

        {/* Carrusel Container */}
        <div className="relative">
          {/* Glass Morphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-3xl blur-3xl -z-10"></div>

          {/* Main Carousel Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
              className="relative group"
            >
              {/* Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* 3D Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

                {/* Content */}
                <div className="relative p-8 sm:p-12 md:p-16 grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 z-10"
                  >
                    {/* Title */}
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold text-center md:text-left text-gray-900">
                        {currentProject.title}
                      </h3>

                      {/* Status Badge */}
                      <div className="flex justify-center md:justify-start">
                        <Badge
                          variant={badgeVariants[currentProject.status]}
                          className="text-base py-2 px-4"
                        >
                          {currentProject.status === 'En Desarrollo' && '⏱️'}
                          {currentProject.status === 'Últimas Fases' && '🎯'}
                          {currentProject.status === 'Terminado' && '✓'}
                          {' '} {currentProject.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {currentProject.longDescription}
                    </p>

                    {/* Stack */}
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Stack Tecnológico</p>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.stack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1 }}
                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.a
                        href={`#proyecto/${currentProject.id}`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
                      >
                        Ver Proyecto
                        <motion.div
                          group-hover:translate-x-2
                          className="transition-transform"
                        >
                          <ArrowRight size={24} />
                        </motion.div>
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-9xl drop-shadow-2xl"
                    >
                      {currentProject.image}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevProject}
              className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {featuredProjects.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  animate={{
                    width: idx === currentIndex ? 32 : 12,
                    backgroundColor: idx === currentIndex ? '#f97316' : '#e5e7eb'
                  }}
                  className="h-2 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                ></motion.button>
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextProject}
              className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-8 text-gray-600">
            <p className="text-lg font-semibold">
              {currentIndex + 1} de {featuredProjects.length}
            </p>
          </div>
        </div>

        {/* CTA Button to All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <p className="text-gray-600 mb-6 text-lg">
            ¿Quieres ver más proyectos?
          </p>
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Ver Todos los Proyectos
            <ArrowRight size={24} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
