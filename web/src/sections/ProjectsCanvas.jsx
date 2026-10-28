import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Tilt from '../components/ui/Tilt'
import ProjectMedia, { fitFromAdmin } from '../components/ui/ProjectMedia'
import Button from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { visibleProjects, projectsHome, ui } from '../content'

const STATUS_STYLES = {
  'En Desarrollo': 'bg-cyan-100 text-cyan-800',
  'Últimas Fases': 'bg-emerald-100 text-emerald-800',
  Terminado: 'bg-emerald-100 text-emerald-800'
}

const STATUS_ICONS = { 'En Desarrollo': '⏱️', 'Últimas Fases': '🎯', Terminado: '✓' }

export default function ProjectsCanvas() {
  const featured = visibleProjects.slice(0, projectsHome.count)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = (next) => {
    setDirection(next > index || (index === featured.length - 1 && next === 0) ? 1 : -1)
    setIndex((next + featured.length) % featured.length)
  }

  useEffect(() => {
    if (paused || featured.length < 2) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % featured.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused, featured.length])

  if (featured.length === 0) return null

  const project = featured[index]

  return (
    <Section id="proyectos-destacados" bg="peach" next="cream">
      <SectionHeading eyebrow={ui.eyebrows.projects} title={projectsHome.title} subtitle={projectsHome.subtitle} />

      <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {featured.length > 1 && (
          <>
            <motion.button
              type="button"
              onClick={() => go(index - 1)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Proyecto anterior"
              className="absolute -left-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-primary-600 shadow-glow sm:grid lg:-left-7"
            >
              <ChevronLeft size={28} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => go(index + 1)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Siguiente proyecto"
              className="absolute -right-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-primary-600 shadow-glow sm:grid lg:-right-7"
            >
              <ChevronRight size={28} />
            </motion.button>
          </>
        )}

        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: direction * 80, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Tilt max={4} scale={1.005} className="rounded-[2.5rem]">
            <div className="grid overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-[0_40px_90px_-30px_rgba(30,36,160,0.4)] md:grid-cols-[1fr_1.1fr]">
              <div className="relative border-b border-primary-100 md:border-b-0 md:border-r">
                <ProjectMedia src={project.image} title={project.title} fit={fitFromAdmin(project.imageFit)} padding="p-10 md:p-14" letterSize="text-9xl" />
              </div>

              <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${STATUS_STYLES[project.status] || 'bg-gray-100 text-gray-700'}`}>
                    {STATUS_ICONS[project.status]} {project.status}
                  </span>
                  <span className="rounded-full bg-primary-100 px-3.5 py-1.5 text-xs font-bold text-primary-700">{project.type}</span>
                  <span className="rounded-full bg-gray-100 px-3.5 py-1.5 text-xs font-bold text-gray-600">{project.company}</span>
                </div>

                <h3 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">{project.title}</h3>
                <p className="text-lg leading-relaxed text-ink-soft">{project.longDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ y: -3, scale: 1.08 }}
                      className="rounded-xl border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-800"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div>
                  <Button href={`#proyecto/${project.id}`} size="lg">
                    {projectsHome.linkText}
                    <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {featured.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver ${item.title}`}
              className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                i === index ? 'text-white' : 'bg-white/70 text-ink-soft hover:bg-white'
              }`}
            >
              {i === index && (
                <motion.span layoutId="project-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{item.title}</span>
            </button>
          ))}
        </div>

        {featured.length > 1 && (
          <div className="mt-6 flex justify-center gap-4 sm:hidden">
            <button type="button" onClick={() => go(index - 1)} aria-label="Proyecto anterior" className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary-600 shadow-glow">
              <ChevronLeft size={24} />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Siguiente proyecto" className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary-600 shadow-glow">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="mb-5 text-lg text-ink-soft">{projectsHome.moreTitle}</p>
        <Button href="#proyectos" variant="dark" size="lg" shine={false}>
          {projectsHome.moreButton}
          <ArrowRight size={20} />
        </Button>
      </Reveal>
    </Section>
  )
}
