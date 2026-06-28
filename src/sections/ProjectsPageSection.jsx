import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { projects } from '../data/projects'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectsPageSection() {
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
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="primary" animated>
            💼 Mi Portafolio
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900">
            Mis Proyectos
          </h1>
          <p className="text-xl text-gray-600">
            6 proyectos personales y profesionales que demuestran mi experiencia en desarrollo, design e innovación.
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
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Projects Timeline */}
          <div className="space-y-12">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`md:flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="md:w-1/2 px-4">
                  <Card hoverable className="h-full">
                    <div className="space-y-4">
                      {/* Image Placeholder */}
                      <div className="h-32 text-center mb-4 flex items-center justify-center">
                        {project.image.startsWith('/') ? (
                          <img src={project.image} alt={project.title} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-6xl">{project.image}</span>
                        )}
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {project.longDescription}
                        </p>
                      </div>

                      {/* Stack */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Stack Tecnológico:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <Badge key={tech} variant="primary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Categoría:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="accent" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Status & Links */}
                      <div className="border-t border-gray-200 pt-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={badgeVariants[project.status]}
                            className="text-sm"
                          >
                            {project.status === 'Terminado' ? '✓' : '⏱'} {project.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Proyecto {project.status === 'Terminado' ? 'completado' : 'en desarrollo'}
                          </span>
                        </div>

                        {/* Action Button */}
                        <motion.a
                          href={`#proyecto/${project.id}`}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Ir a la Página del Proyecto</span>
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex md:w-0 justify-center items-start pt-8">
                  <motion.div
                    className="w-5 h-5 bg-primary-500 rounded-full border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.6 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-75" style={{ width: '20px', height: '20px', marginLeft: '-2px', marginTop: '-2px' }} />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-12 border-t border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Interesado en colaborar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Siempre estoy abierto a nuevos proyectos y desafíos. Contáctame para discutir ideas y oportunidades.
          </p>
          <motion.a
            href="mailto:vrabanales@rcapcorp.cl"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            📧 Enviar Email
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
