import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { projects } from '../data/projects'
import { ArrowRight } from 'lucide-react'

export default function ProjectsSection() {
  // Configurar grid positions para Bento Layout
  const getGridClass = (id) => {
    if (id === 1) return 'md:col-span-2 md:row-span-2' // ArcadeHub grande
    if (id === 2) return 'md:col-span-1'
    if (id === 3) return 'md:col-span-1'
    if (id === 4) return 'md:col-span-1'
    if (id === 5) return 'md:col-span-1'
    if (id === 6) return 'md:col-span-1 md:row-span-2'
  }

  const getEntryDirection = (id) => {
    const directions = {
      1: { x: -100, y: 0 },
      2: { x: 100, y: -100 },
      3: { x: 100, y: 0 },
      4: { x: -100, y: 100 },
      5: { x: 0, y: 100 },
      6: { x: 100, y: 100 }
    }
    return directions[id] || { x: 0, y: 0 }
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
            Mis Proyectos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Proyectos personales y profesionales que demuestran mi experiencia en desarrollo, design y soluciones innovadoras.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const direction = getEntryDirection(project.id)
            const isLarge = project.id === 1
            const isTall = project.id === 6

            return (
              <motion.div
                key={project.id}
                className={`${getGridClass(project.id)}`}
                initial={{ opacity: 0, x: direction.x, y: direction.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card hoverable className="h-full flex flex-col">
                  {/* Image */}
                  <motion.div
                    className={`text-center mb-4 flex items-center justify-center ${isLarge ? 'h-32' : 'h-24'}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {project.image.startsWith('/') ? (
                      <img src={project.image} alt={project.title} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className={isLarge ? 'text-8xl' : 'text-6xl'}>{project.image}</span>
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {project.description}
                      </p>
                    </div>

                    {/* Stack */}
                    {isLarge && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="primary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="mt-auto pt-2 space-y-3">
                      <Badge
                        variant={project.status === 'Terminado' ? 'success' : 'warning'}
                        className="text-xs"
                      >
                        {project.status === 'Terminado' ? '✓' : '⏱'} {project.status}
                      </Badge>

                      {/* Button */}
                      <motion.a
                        href={`#proyecto/${project.id}`}
                        className="block w-full text-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ir a Página
                      </motion.a>
                    </div>
                  </div>

                  {/* Shimmer para ArcadeHub */}
                  {isLarge && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, transparent, white, transparent)',
                        backgroundSize: '1000px 100%'
                      }}
                      animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
