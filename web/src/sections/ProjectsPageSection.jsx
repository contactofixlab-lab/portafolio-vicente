import { forwardRef, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Tilt from '../components/ui/Tilt'
import Button from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { visibleProjects, projectsPage, contact, ui } from '../content'

const STATUS_STYLES = {
  'En Desarrollo': 'bg-cyan-100 text-cyan-800',
  'Últimas Fases': 'bg-emerald-100 text-emerald-800',
  Terminado: 'bg-emerald-100 text-emerald-800'
}

const GRADIENTS = [
  'from-primary-400 to-accent-400',
  'from-primary-500 to-primary-700',
  'from-accent-400 to-primary-500',
  'from-primary-300 to-primary-600'
]

const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.05 }}
    >
      <Tilt max={7} scale={1.025} className="h-full rounded-[2rem]">
        <a href={`#proyecto/${project.id}`} className="led-hover group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-card">
          <div className={`relative grid h-52 place-items-center overflow-hidden bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} p-6`}>
            <div className="absolute inset-0 dots opacity-40" />
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/25 blur-xl" />
            {project.image ? (
              <img src={project.image} alt={project.title} className="relative max-h-36 max-w-full rounded-2xl bg-white/90 p-3 object-contain shadow-neon transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
            ) : (
              <span className="relative font-display text-7xl font-extrabold text-white/90 transition-transform duration-500 group-hover:scale-110">{project.title.charAt(0)}</span>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary-700">{project.type}</span>
            <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-primary-600 opacity-0 transition-all duration-300 group-hover:rotate-12 group-hover:opacity-100">
              <ArrowUpRight size={20} />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl font-extrabold leading-tight text-ink transition-colors group-hover:text-primary-600">{project.title}</h3>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[project.status] || 'bg-gray-100 text-gray-700'}`}>{project.status}</span>
            </div>
            <p className="line-clamp-3 text-ink-soft">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-800">
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">+{project.stack.length - 4}</span>}
            </div>
          </div>
        </a>
      </Tilt>
    </motion.article>
  )
})

export default function ProjectsPageSection() {
  const [filter, setFilter] = useState(ui.projects.filterAll)

  const filters = useMemo(() => [ui.projects.filterAll, ...new Set(visibleProjects.map((p) => p.type))], [])
  const shown = filter === ui.projects.filterAll ? visibleProjects : visibleProjects.filter((p) => p.type === filter)

  return (
    <>
      <PageHero eyebrow={projectsPage.badge} title={projectsPage.title} subtitle={projectsPage.subtitle} />

      <Section bg="cream" className="-mt-px">
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${filter === f ? 'text-white' : 'bg-white text-ink-soft hover:text-primary-700'}`}
            >
              {filter === f && <motion.span layoutId="projects-filter" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-700 px-8 py-14 text-center text-white">
            <div className="absolute inset-0 dots opacity-25" />
            <h3 className="relative font-display text-3xl font-extrabold md:text-5xl">{projectsPage.ctaTitle}</h3>
            <p className="relative mx-auto mb-8 mt-4 max-w-2xl text-lg text-white/90">{projectsPage.ctaText}</p>
            <Button href={`mailto:${contact.email}`} variant="light" size="lg" shine={false} className="relative">
              {projectsPage.ctaButton}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
