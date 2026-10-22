import Section from '../components/ui/Section'
import PageHero from '../components/ui/PageHero'
import Timeline from '../components/Timeline'
import CountUp from '../components/ui/CountUp'
import { StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { experiences, trajectoryPage as t, ui } from '../content'

function Stat({ children, label }) {
  return (
    <div className="rounded-3xl border-2 border-white bg-white p-8 text-center shadow-card">
      <p className="font-display text-6xl font-extrabold text-primary-600">{children}</p>
      <p className="mt-2 font-semibold text-ink-soft">{label}</p>
    </div>
  )
}

export default function TrajectorySection() {
  const years = parseInt(t.statsYearsValue, 10) || 0
  const yearsSuffix = String(t.statsYearsValue).includes('+') ? '+' : ''
  const current = experiences.filter((e) => e.badge === 'Actual').length

  return (
    <>
      <PageHero eyebrow={ui.eyebrows.trajectoryPage} title={t.title} subtitle={t.subtitle} backText={t.backText} />

      <Section bg="cream" className="-mt-px">
        <Timeline items={experiences} />

        <StaggerGroup className="mt-24 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <Stat label={t.statsExperienceLabel}>
              <CountUp to={experiences.length} />
            </Stat>
          </StaggerItem>
          <StaggerItem>
            <Stat label={t.statsYearsLabel}>
              <CountUp to={years} suffix={yearsSuffix} />
            </Stat>
          </StaggerItem>
          <StaggerItem>
            <Stat label={t.statsCurrentLabel}>
              <CountUp to={current} />
            </Stat>
          </StaggerItem>
        </StaggerGroup>
      </Section>
    </>
  )
}
