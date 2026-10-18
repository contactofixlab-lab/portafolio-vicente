import { useState } from 'react'
import { motion } from 'framer-motion'
import SkillImage from '../components/ui/SkillImage'
import { skills, visibleProjects } from '../content'

const skillsCategories = skills.categories

const levelOf = (percent) => (percent >= 80 ? 'Avanzado' : percent >= 50 ? 'Intermedio' : 'Básico')

export default function SkillsSection() {
  const [activeCat, setActiveCat] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)

  const category = skillsCategories[activeCat]
  const skill = category.skills[activeSkill] ?? category.skills[0]
  const usedIn = (skill.projects ?? [])
    .map((id) => visibleProjects.find((p) => p.id === id))
    .filter(Boolean)

  const selectCategory = (index) => {
    setActiveCat(index)
    setActiveSkill(0)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            {skills.homeTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {skills.homeSubtitle}
          </p>
        </div>

        <div role="tablist" aria-label="Categorías de habilidades" className="flex flex-wrap justify-center gap-2">
          {skillsCategories.map((c, i) => {
            const active = i === activeCat
            return (
              <button
                key={c.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectCategory(i)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {category.skills.map((s, i) => {
            const selected = i === activeSkill
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveSkill(i)}
                className={`text-left bg-white rounded-2xl p-5 border transition-all hover:shadow-lg ${
                  selected ? 'border-primary-400 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <SkillImage name={s.name} size="md" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{s.name}</p>
                    <p className="text-xs text-gray-500">{levelOf(s.percent)}</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  />
                </div>
              </button>
            )
          })}
        </motion.div>

        <motion.div
          key={`${activeCat}-${skill.name}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
              <SkillImage name={skill.name} size="xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-2xl font-bold text-gray-900">{skill.name}</h3>
                <span className="text-sm font-semibold text-primary-600">
                  {levelOf(skill.percent)} · {skill.percent}%
                </span>
              </div>
              {skill.description && <p className="mt-2 text-gray-600">{skill.description}</p>}
            </div>
          </div>

          {usedIn.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">Lo he usado en</p>
              <div className="flex flex-wrap gap-2">
                {usedIn.map((p) => (
                  <a
                    key={p.id}
                    href={`#proyecto/${p.id}`}
                    className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <motion.a
            href="#habilidades"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {skills.homeButton}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
