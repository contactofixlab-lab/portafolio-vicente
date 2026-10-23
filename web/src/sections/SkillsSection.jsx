import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import SkillImage from '../components/ui/SkillImage'
import Marquee from '../components/ui/Marquee'
import Tilt from '../components/ui/Tilt'
import Button from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { skills, visibleProjects, ui } from '../content'

const categories = skills.categories
const allSkills = categories.flatMap((c) => c.skills)

const levelOf = (percent) => (percent >= 80 ? ui.skills.levelAdvanced : percent >= 50 ? ui.skills.levelIntermediate : ui.skills.levelBasic)

function LogoChip({ skill }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-primary-100 bg-white px-5 py-3 shadow-card">
      <SkillImage name={skill.name} src={skill.image} size="sm" />
      <span className="whitespace-nowrap text-sm font-bold text-ink">{skill.name}</span>
    </div>
  )
}

export default function SkillsSection() {
  const [activeCat, setActiveCat] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)

  const category = categories[activeCat]
  const skill = category.skills[activeSkill] ?? category.skills[0]
  const usedIn = (skill.projects ?? []).map((id) => visibleProjects.find((p) => p.id === id)).filter(Boolean)

  const selectCategory = (i) => {
    setActiveCat(i)
    setActiveSkill(0)
  }

  return (
    <Section id="habilidades-inicio" bg="white" next="peach">
      <SectionHeading eyebrow={ui.eyebrows.skills} title={skills.homeTitle} subtitle={skills.homeSubtitle} />

      <Reveal className="-mx-4 mb-14 sm:-mx-6 lg:-mx-8">
        <Marquee speed={55}>
          {allSkills.map((s) => (
            <LogoChip key={s.name} skill={s} />
          ))}
        </Marquee>
      </Reveal>

      <div role="tablist" aria-label="Categorías de habilidades" className="mb-10 flex flex-wrap justify-center gap-2.5">
        {categories.map((c, i) => {
          const active = i === activeCat
          return (
            <button
              key={c.name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${active ? 'text-white' : 'bg-primary-50 text-ink-soft hover:bg-primary-100 hover:text-primary-700'}`}
            >
              {active && (
                <motion.span layoutId="skills-tab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">
                {c.icon} {c.name}
              </span>
            </button>
          )
        })}
      </div>

      <motion.div
        key={activeCat}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-5 md:grid-cols-4"
      >
        {category.skills.map((s, i) => {
          const selected = i === activeSkill
          return (
            <Tilt key={s.name} max={8} scale={1.04} className="rounded-3xl">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveSkill(i)}
                className={`h-full w-full rounded-3xl border-2 bg-white p-5 text-left shadow-card transition-all ${selected ? 'border-primary-400 ring-4 ring-primary-100' : 'border-transparent hover:border-primary-200'}`}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100">
                    <SkillImage name={s.name} src={s.image} size="md" />
                  </div>
                  <div className="min-w-0 max-w-full">
                    <p className="break-words font-bold text-ink sm:truncate">{s.name}</p>
                    <p className="text-xs font-semibold text-primary-600">{levelOf(s.percent)}</p>
                  </div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-primary-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  />
                </div>
              </button>
            </Tilt>
          )
        })}
      </motion.div>

      <motion.div
        key={`${activeCat}-${skill.name}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative mt-8 overflow-hidden rounded-[2rem] border-2 border-primary-100 bg-gradient-to-br from-white to-primary-50 p-7 shadow-card md:p-9"
      >
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-200/50 blur-2xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-white shadow-soft">
            <SkillImage name={skill.name} src={skill.image} size="xl" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-3xl font-extrabold text-ink">{skill.name}</h3>
              <span className="rounded-full bg-primary-500 px-3 py-1 text-sm font-bold text-white">
                {levelOf(skill.percent)} · {skill.percent}%
              </span>
            </div>
            {skill.description && <p className="mt-2 text-lg text-ink-soft">{skill.description}</p>}
          </div>
        </div>
        {usedIn.length > 0 && (
          <div className="relative mt-6 border-t border-primary-100 pt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">{ui.skills.usedIn}</p>
            <div className="flex flex-wrap gap-2">
              {usedIn.map((p) => (
                <motion.a
                  key={p.id}
                  href={`#proyecto/${p.id}`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-bold text-white shadow-soft"
                >
                  {p.title}
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <Reveal className="mt-14 text-center">
        <Button href="#habilidades" variant="dark" size="lg" shine={false}>
          {skills.homeButton}
          <ArrowRight size={20} />
        </Button>
      </Reveal>
    </Section>
  )
}
