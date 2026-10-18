import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import { ArrowLeft, Code2, Zap, Calendar, Target, CheckCircle2, AlertCircle, GitBranch, BarChart3, ExternalLink, Github } from 'lucide-react'
import { visibleProjects, projectDetail as t } from '../content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const badgeVariants = {
  'En Desarrollo': 'warning',
  'Últimas Fases': 'success',
  'Terminado': 'success'
}

function formatDate(dateString) {
  if (!dateString) return t.ongoing
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function ProjectImage({ src, alt, className }) {
  if (!src) return null
  return src.startsWith('/') ? (
    <img src={src} alt={alt} className={className} />
  ) : (
    <span className="text-7xl">{src}</span>
  )
}

export default function ProjectDetail({ projectId }) {
  const project = visibleProjects.find(p => p.id === parseInt(projectId))

  if (!project) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.notFound}</h1>
          <a href="#home" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
            <ArrowLeft size={20} /> {t.backText}
          </a>
        </div>
      </section>
    )
  }

  const similarProjects = visibleProjects
    .filter(p => p.id !== project.id)
    .filter(p => p.tags.some(tag => project.tags.includes(tag)))
    .slice(0, 3)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="space-y-8">
          <a href="#home" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
            {t.backText}
          </a>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="h-40 flex items-center">
                  <ProjectImage src={project.image} alt={project.title} className="max-h-full max-w-full object-contain" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h1>
              </div>
              <Badge variant={badgeVariants[project.status]} className="text-lg px-6 py-3 whitespace-nowrap">
                {project.status === 'Terminado' && '✓'}
                {project.status === 'En Desarrollo' && '⏱️'}
                {project.status === 'Últimas Fases' && '🎯'}
                {' '} {project.status}
              </Badge>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {project.longDescription}
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
              <Calendar size={20} />
              <span className="font-semibold">{t.startLabel}</span>
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{formatDate(project.startDate)}</p>
          </div>

          <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400">
              <Calendar size={20} />
              <span className="font-semibold">{t.endLabel}</span>
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{formatDate(project.endDate)}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Code2 size={20} />
              <span className="font-semibold">{t.stackLabel}</span>
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{project.stack.length} techs</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <BarChart3 size={20} />
              <span className="font-semibold">{t.phasesLabel}</span>
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{project.phases.length} fases</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-lg"
            >
              <ExternalLink size={20} />
              {t.demoButton}
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:shadow-lg transition-all font-bold text-lg"
            >
              <Github size={20} />
              {t.githubButton}
            </a>
          )}
        </motion.div>

        {project.architecture && Object.keys(project.architecture).length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Code2 size={28} className="text-primary-500" />
              {t.architectureTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(project.architecture).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-white capitalize">{key}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.reason && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Target size={28} className="text-primary-500" />
              {t.reasonTitle}
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-750 rounded-lg p-8 border border-primary-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.reason}
              </p>
            </div>
          </motion.div>
        )}

        {project.problems && project.problems.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <AlertCircle size={28} className="text-red-500" />
              {t.problemsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.problems.map((problem, idx) => (
                <div key={idx} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300">{problem}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.solutions && project.solutions.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <CheckCircle2 size={28} className="text-green-500" />
              {t.solutionsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.solutions.map((solution, idx) => (
                <div key={idx} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300">{solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.whatWasDone && project.whatWasDone.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Zap size={28} className="text-yellow-500" />
              {t.whatWasDoneTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {project.whatWasDone.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-primary-500 text-xl flex-shrink-0 pt-1">✓</div>
                  <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.features && project.features.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <CheckCircle2 size={28} className="text-primary-500" />
              {t.featuresTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-750 rounded-lg p-4 border border-primary-100 dark:border-gray-700">
                  <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.phases.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <GitBranch size={28} className="text-blue-500" />
              {t.phasesTitle}
            </h2>
            <div className="space-y-4">
              {project.phases.map((phase, idx) => (
                <div key={idx} className="border-l-4 border-primary-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{phase.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                    </div>
                    <Badge variant="primary" className="whitespace-nowrap">
                      ⏱️ {phase.duration}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.results && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <BarChart3 size={28} className="text-green-500" />
              {t.resultsTitle}
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                {project.results}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.techTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="primary" className="text-base">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.categoriesTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent" className="text-base">
                #{tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.similarTitle}
          </h2>

          {similarProjects.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t.similarEmpty}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {similarProjects.map((similarProject) => (
                <motion.a
                  key={similarProject.id}
                  href={`#proyecto/${similarProject.id}`}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-750 dark:to-gray-700 space-y-4">
                      <div className="h-16 flex items-center">
                        <ProjectImage src={similarProject.image} alt={similarProject.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {similarProject.title}
                      </h3>
                    </div>

                    <div className="p-6 space-y-4 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {similarProject.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {similarProject.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="accent" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {similarProject.tags.length > 2 && (
                          <Badge variant="accent" className="text-xs">
                            +{similarProject.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="pt-2">
                        <Badge variant={badgeVariants[similarProject.status]}>
                          {similarProject.status === 'Terminado' && '✓'}
                          {similarProject.status === 'En Desarrollo' && '⏱️'}
                          {similarProject.status === 'Últimas Fases' && '🎯'}
                          {' '} {similarProject.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                        {t.similarLink}
                        <ArrowLeft size={18} className="rotate-180" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
