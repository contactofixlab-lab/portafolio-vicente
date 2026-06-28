import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { projects } from '../data/projects'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsInteractive() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const badgeVariants = {
    'Terminado': 'success',
    'En Desarrollo': 'warning'
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
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Mis Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Haz clic en un proyecto para ver detalles completos, fases, tecnologías utilizadas y más información.
          </p>
        </div>

        {/* Projects Grid - Interactive Canvas Style */}
        <div className="grid md:grid-cols-3 gap-6 min-h-96">
          {projects.slice(0, 6).map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project.id)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              <Card
                hoverable
                className={`h-full flex flex-col transition-all duration-300 ${
                  selectedProject === project.id
                    ? 'ring-2 ring-primary-500 shadow-xl'
                    : 'hover:shadow-lg'
                }`}
              >
                {/* Project Image Area */}
                <motion.div
                  className="h-32 text-center mb-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center"
                  animate={{ scale: hoveredId === project.id ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {project.image.startsWith('/') ? (
                    <img src={project.image} alt={project.title} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-6xl">{project.image}</span>
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-3">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stack Preview */}
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="primary" className="text-xs py-1 px-2">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 2 && (
                      <Badge variant="primary" className="text-xs py-1 px-2">
                        +{project.stack.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Status */}
                  <div className="mt-auto pt-2">
                    <Badge variant={badgeVariants[project.status]}>
                      {project.status === 'Terminado' ? '✓' : '⏱'} {project.status}
                    </Badge>
                  </div>
                </div>

                {/* View Details Button */}
                <motion.div
                  className="mt-4 pt-4 border-t border-gray-200"
                  animate={{ opacity: hoveredId === project.id ? 1 : 0.7 }}
                >
                  <motion.a
                    href={`#proyecto/${project.id}`}
                    className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    whileHover={{ x: 4 }}
                  >
                    <span>Ir a la Página del Proyecto</span>
                    <ArrowRight size={18} />
                  </motion.a>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border-2 border-primary-200"
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject)
                return (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-lg">
                          {project.longDescription}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        whileHover={{ rotate: 90 }}
                      >
                        ✕
                      </motion.button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Stack Tecnológico</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map(tech => (
                            <Badge key={tech} variant="primary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Categoría</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="accent" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Estado</p>
                        <Badge variant={project.status === 'Terminado' ? 'success' : 'warning'} className="inline-block">
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button variant="primary" size="md">
                        <BookOpen size={18} className="mr-2" />
                        Ver Proyecto Completo
                      </Button>
                      <motion.a
                        href={`#proyecto/${project.id}`}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary-500 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        <ArrowRight size={18} />
                        Ir a Detalles
                      </motion.a>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Quieres ver todos mis proyectos?
          </h3>
          <p className="text-gray-600 mb-6">
            Visita la página de proyectos para ver el timeline completo y más detalles
          </p>
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button variant="primary" size="lg">
              <BookOpen size={20} className="mr-2" />
              Ver Todos los Proyectos
            </Button>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
