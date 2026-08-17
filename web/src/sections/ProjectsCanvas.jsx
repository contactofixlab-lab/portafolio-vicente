import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects'

export default function ProjectsCanvas() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [dragX, setDragX] = useState(0)
  const containerRef = useRef(null)

  const featuredProjects = projects.slice(0, 3)
  const currentProject = featuredProjects[currentIndex]

  const badgeVariants = {
    'En Desarrollo': 'warning',
    'Últimas Fases': 'success',
    'Terminado': 'success'
  }

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
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
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desliza o navega a través de mis proyectos más recientes y relevantes
          </p>
        </div>

        {/* Canvas Container - Draggable */}
        <div ref={containerRef} className="relative">
          {/* Left Arrow — al costado de la tarjeta */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevProject}
            className="hidden sm:flex absolute left-0 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Right Arrow — al costado de la tarjeta */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextProject}
            className="hidden sm:flex absolute right-0 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Siguiente proyecto"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>

          <div className="overflow-hidden rounded-3xl">
            {/* Contenido — key={currentIndex} reemplaza la tarjeta al cambiar, con animación de entrada */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative select-none"
            >
                {/* Card Design */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white border border-gray-200">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent"></div>

                  {/* Content Grid */}
                  <div className="relative p-6 sm:p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center">
                    {/* Left Side - Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-5"
                    >
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-center md:text-left text-gray-900">
                        {currentProject.title}
                      </h3>

                      {/* Status Badge */}
                      <div className="flex justify-center md:justify-start">
                        <Badge variant={badgeVariants[currentProject.status]}>
                          {currentProject.status === 'En Desarrollo' && '⏱️'}
                          {currentProject.status === 'Últimas Fases' && '🎯'}
                          {currentProject.status === 'Terminado' && '✓'}
                          {' '} {currentProject.status}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {currentProject.longDescription}
                      </p>

                      {/* Stack */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.stack.map((tech) => (
                            <motion.div
                              key={tech}
                              whileHover={{ y: -2 }}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:border-primary-400 hover:bg-primary-50 transition-all"
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <motion.a
                          href={`#proyecto/${currentProject.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-lg transition-all duration-300 group/btn"
                        >
                          Ir a la Página del Proyecto
                          <motion.div className="transition-transform group-hover/btn:translate-x-2">
                            <ArrowRight size={18} />
                          </motion.div>
                        </motion.a>
                      </motion.div>
                    </motion.div>

                    {/* Right Side - Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="hidden md:flex items-center justify-center h-44"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="drop-shadow-xl"
                      >
                        {currentProject.image.startsWith('/') ? (
                          <img src={currentProject.image} alt={currentProject.title} className="max-h-44 max-w-44 object-contain" />
                        ) : (
                          <span className="text-7xl">{currentProject.image}</span>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
          </div>

          {/* Mobile arrows (below card, only on small screens) */}
          <div className="flex sm:hidden justify-center gap-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevProject}
              className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextProject}
              className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg"
              aria-label="Siguiente proyecto"
            >
              <ChevronRight size={22} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-6">
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
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-4 text-gray-600">
            <p className="text-sm font-semibold">
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
