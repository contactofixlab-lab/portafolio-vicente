import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  const handleDragEnd = (info) => {
    const threshold = 50
    const velocity = info.velocity.x
    const distance = info.offset.x

    if (Math.abs(distance) > threshold || Math.abs(velocity) > 500) {
      if (distance > 0 || velocity > 500) {
        // Drag right → anterior
        setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
      } else {
        // Drag left → siguiente
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
      }
    }
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
        <div
          ref={containerRef}
          className="relative group cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl"
        >
          {/* Glass Morphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-3xl blur-3xl -z-10"></div>

          {/* Draggable Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              drag="x"
              dragElastic={0.2}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative group select-none"
            >
              {/* Neon Card Design */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gray-900 dark:bg-gray-950 border border-gray-800 dark:border-gray-900">
                {/* Neon glow lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-50"></div>
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary-500/50 via-transparent to-transparent opacity-30"></div>

                {/* Content Grid */}
                <div className="relative p-8 sm:p-12 md:p-16 grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold text-center md:text-left text-white">
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

                    {/* Description */}
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {currentProject.longDescription}
                    </p>

                    {/* Stack */}
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-primary-400 uppercase tracking-widest">Stack</p>
                      <div className="flex flex-wrap gap-3">
                        {currentProject.stack.map((tech) => (
                          <motion.div
                            key={tech}
                            whileHover={{ y: -3 }}
                            className="px-5 py-2 bg-gray-800 border border-primary-500/50 text-white rounded-lg text-sm font-medium hover:border-primary-400 hover:bg-gray-700 transition-all"
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
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg transition-all duration-300 group/btn"
                      >
                        Ir a la Página del Proyecto
                        <motion.div className="transition-transform group-hover/btn:translate-x-2">
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
                    className="hidden md:flex items-center justify-center h-64"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="drop-shadow-2xl"
                    >
                      {currentProject.image.startsWith('/') ? (
                        <img src={currentProject.image} alt={currentProject.title} className="max-h-64 max-w-64 object-contain" />
                      ) : (
                        <span className="text-9xl">{currentProject.image}</span>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Drag Hint */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm"
                >
                  ↔️ Desliza para navegar
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
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
                />
              ))}
            </div>

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
