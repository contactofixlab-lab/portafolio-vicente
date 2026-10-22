import { ArrowRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Timeline from '../components/Timeline'
import Button from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { experiences, experienceHome, ui } from '../content'

export default function ExperienceSection() {
  const recent = experiences.slice(0, experienceHome.count)

  return (
    <Section id="trayectoria-inicio" bg="cream" next="white">
      <SectionHeading eyebrow={ui.eyebrows.experience} title={experienceHome.title} subtitle={experienceHome.subtitle} />
      <Timeline items={recent} />
      <Reveal className="mt-16 text-center">
        <Button href="#trayectoria" size="lg">
          {experienceHome.buttonText}
          <ArrowRight size={20} />
        </Button>
      </Reveal>
    </Section>
  )
}
