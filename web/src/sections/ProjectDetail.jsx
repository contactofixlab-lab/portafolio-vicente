import { motion } from 'framer-motion'
import { Code2, Zap, Calendar, Target, CheckCircle2, AlertCircle, GitBranch, BarChart3, Github, ArrowUpRight, Layers } from 'lucide-react'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import Tilt from '../components/ui/Tilt'
import ProjectMedia, { fitFromAdmin } from '../components/ui/ProjectMedia'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { visibleProjects, projectDetail as t } from '../content'

const STATUS_STYLES = {
  'En Desarrollo': 'bg-cyan-100 text-cyan-800',
  'Últimas Fases': 'bg-emerald-100 text-emerald-800',
  Terminado: 'bg-emerald-100 text-emerald-800'
}

function formatDate(dateString) {
  if (!dateString) return t.ongoing
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlockTitle({ icon: Icon, children, color = 'text-primary-500' }) {
  return (
    <Reveal>
      <h2 className="mb-8 flex items-center gap-4 break-words font-display text-2xl font-extrabold text-ink sm:text-3xl md:text-4xl">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white shadow-card ${color}`}>
          <Icon size={26} />
        </span>
        {children}
      </h2>
    </Reveal>
  )
}

export default function ProjectDetail({ projectId }) {
  const project = visibleProjects.find((p) => p.id === parseInt(projectId))

  if (!project) {
    return (
      <>
        <PageHero title={t.notFound} backText={t.backText} />
        <Section bg="cream" className="-mt-px">
          <div className="text-center">
            <Button href="#home">{t.backText}</Button>
          </div>
        </Section>
      </>
    )
  }

  const similarProjects = visibleProjects
    .filter((p) => p.id !== project.id)
    .filter((p) => p.tags.some((tag) => project.tags.includes(tag)))
    .slice(0, 3)

  const stats = [
    { icon: Calendar, label: t.startLabel, value: formatDate(project.startDate) },
    { icon: Calendar, label: t.endLabel, value: formatDate(project.endDate) },
    { icon: Code2, label: t.stackLabel, value: `${project.stack.length} techs` },
    { icon: BarChart3, label: t.phasesLabel, value: `${project.phases.length} fases` }
  ]

  return (
    <>
      <PageHero eyebrow={`${project.type} · ${project.status}`} title={project.title} subtitle={project.description} backHref="#proyectos" backText={t.backText}>
        <div className="flex flex-wrap items-center gap-4">
          {project.github && project.github !== '#' && (
            <Button href={project.github} target="_blank" variant="light" size="lg" shine={false}>
              <Github size={20} />
              {t.githubButton}
            </Button>
          )}
        </div>
      </PageHero>

      <Section bg="cream" className="-mt-px space-y-24">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <p className="text-xl leading-relaxed text-ink-soft">{project.longDescription}</p>
          </Reveal>
          {project.image && (
            <Reveal className="lg:col-span-2">
              <Tilt max={8} scale={1.03} className="rounded-[2rem]">
                <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border-4 border-white shadow-card">
                  <ProjectMedia src={project.image} title={project.title} fit={fitFromAdmin(project.imageFit)} padding="p-8" />
                </div>
              </Tilt>
            </Reveal>
          )}
        </div>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <StaggerItem key={s.label}>
                <Tilt max={7} scale={1.04} className="h-full rounded-3xl">
                  <div className="h-full rounded-3xl border-2 border-white bg-white p-6 shadow-card">
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary-600">
                      <Icon size={18} />
                      {s.label}
                    </div>
                    <p className="font-display text-xl font-extrabold text-ink">{s.value}</p>
                  </div>
                </Tilt>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        {project.architecture && Object.keys(project.architecture).length > 0 && (
          <div>
            <BlockTitle icon={Layers}>{t.architectureTitle}</BlockTitle>
            <StaggerGroup className="grid gap-5 md:grid-cols-2">
              {Object.entries(project.architecture).map(([key, value]) => (
                <StaggerItem key={key}>
                  <div className="h-full rounded-3xl border-2 border-white bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-200">
                    <h4 className="mb-2 font-display text-lg font-extrabold capitalize text-primary-700">{key}</h4>
                    <p className="text-ink-soft">{value}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.reason && (
          <div>
            <BlockTitle icon={Target}>{t.reasonTitle}</BlockTitle>
            <Reveal>
              <div className="rounded-[2rem] border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 p-8 md:p-10">
                <p className="text-lg leading-relaxed text-ink-soft md:text-xl">{project.reason}</p>
              </div>
            </Reveal>
          </div>
        )}

        {project.problems?.length > 0 && (
          <div>
            <BlockTitle icon={AlertCircle} color="text-violet-500">{t.problemsTitle}</BlockTitle>
            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              {project.problems.map((problem, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-violet-100 bg-white p-5 shadow-card">
                    <AlertCircle size={22} className="mt-0.5 shrink-0 text-violet-500" />
                    <p className="text-ink-soft">{problem}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.solutions?.length > 0 && (
          <div>
            <BlockTitle icon={CheckCircle2} color="text-emerald-500">{t.solutionsTitle}</BlockTitle>
            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              {project.solutions.map((solution, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-emerald-100 bg-white p-5 shadow-card">
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-500" />
                    <p className="text-ink-soft">{solution}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.whatWasDone?.length > 0 && (
          <div>
            <BlockTitle icon={Zap} color="text-cyan-500">{t.whatWasDoneTitle}</BlockTitle>
            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              {project.whatWasDone.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-card transition-all hover:-translate-y-1">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-500 text-sm font-bold text-white">✓</span>
                    <p className="text-ink-soft">{feature}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.features?.length > 0 && (
          <div>
            <BlockTitle icon={CheckCircle2}>{t.featuresTitle}</BlockTitle>
            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              {project.features.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border-2 border-primary-100 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary-300">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 font-display font-extrabold text-white">{idx + 1}</span>
                    <p className="font-medium text-ink-soft">{feature}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.phases.length > 0 && (
          <div>
            <BlockTitle icon={GitBranch} color="text-sky-500">{t.phasesTitle}</BlockTitle>
            <StaggerGroup className="space-y-4">
              {project.phases.map((phase, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex flex-col gap-3 rounded-3xl border-l-8 border-primary-500 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-display text-xl font-extrabold text-ink">{phase.name}</h4>
                      <p className="text-ink-soft">{phase.description}</p>
                    </div>
                    <span className="shrink-0 self-start rounded-full bg-primary-100 px-4 py-1.5 text-sm font-bold text-primary-700">⏱ {phase.duration}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {project.results && (
          <div>
            <BlockTitle icon={BarChart3} color="text-emerald-500">{t.resultsTitle}</BlockTitle>
            <Reveal>
              <div className="rounded-[2rem] border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-8 md:p-10">
                <p className="text-lg font-semibold leading-relaxed text-ink md:text-xl">{project.results}</p>
              </div>
            </Reveal>
          </div>
        )}

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h3 className="mb-5 font-display text-2xl font-extrabold text-ink">{t.techTitle}</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-700 shadow-card transition-transform hover:-translate-y-1">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h3 className="mb-5 font-display text-2xl font-extrabold text-ink">{t.categoriesTitle}</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-100 px-4 py-2 text-sm font-bold text-accent-700 transition-transform hover:-translate-y-1">
                  #{tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="mb-10 font-display text-3xl font-extrabold text-ink md:text-5xl">{t.similarTitle}</h2>
          </Reveal>
          {similarProjects.length === 0 ? (
            <p className="py-8 text-center text-ink-soft">{t.similarEmpty}</p>
          ) : (
            <StaggerGroup className="grid gap-8 md:grid-cols-3">
              {similarProjects.map((sp) => (
                <StaggerItem key={sp.id}>
                  <Tilt max={7} scale={1.03} className="h-full rounded-[2rem]">
                    <a href={`#proyecto/${sp.id}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-card">
                      <div className="border-b border-primary-100">
                        <ProjectMedia src={sp.image} title={sp.title} fit={fitFromAdmin(sp.imageFit)} padding="p-6" letterSize="text-6xl" />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <h3 className="font-display text-xl font-extrabold text-ink transition-colors group-hover:text-primary-600">{sp.title}</h3>
                        <p className="line-clamp-2 text-sm text-ink-soft">{sp.description}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[sp.status] || 'bg-gray-100 text-gray-700'}`}>{sp.status}</span>
                          <span className="flex items-center gap-1 text-sm font-bold text-primary-600 transition-transform group-hover:translate-x-1">
                            {t.similarLink}
                            <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Tilt>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </Section>
    </>
  )
}
