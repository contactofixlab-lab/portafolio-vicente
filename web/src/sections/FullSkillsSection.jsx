import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import SkillImage from '../components/ui/SkillImage'
import Tilt from '../components/ui/Tilt'
import IconValue from '../components/ui/IconValue'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { skills, ui } from '../content'

export default function FullSkillsSection() {
  return (
    <>
      <PageHero eyebrow={ui.eyebrows.skillsPage} title={skills.fullTitle} subtitle={skills.fullSubtitle} backText={skills.backText} />

      <Section bg="cream" className="-mt-px">
        <div className="space-y-20">
          {skills.categories.map((category) => (
            <div key={category.name}>
              <Reveal>
                <div className="mb-8 flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-2xl shadow-glow"><IconValue value={category.icon} imgClass="h-8 w-8" /></span>
                  <h2 className="font-display text-3xl font-extrabold text-ink md:text-4xl">{category.name}</h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-primary-300 to-transparent" />
                </div>
              </Reveal>

              <StaggerGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
                {category.skills.map((skill) => (
                  <StaggerItem key={skill.name}>
                    <Tilt max={10} scale={1.06} className="rounded-3xl">
                      <div className="group flex h-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-white bg-white px-4 py-7 text-center shadow-card transition-colors hover:border-primary-300">
                        <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5 }} className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100">
                          <SkillImage name={skill.name} src={skill.image} size="lg" />
                        </motion.div>
                        <h3 className="font-display text-base font-bold leading-tight text-ink">{skill.name}</h3>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-100">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    </Tilt>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
