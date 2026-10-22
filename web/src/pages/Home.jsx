import HeroSection from '../sections/HeroSection'
import LifeSection from '../sections/LifeSection'
import ProjectsCanvas from '../sections/ProjectsCanvas'
import ExperienceSection from '../sections/ExperienceSection'
import SkillsSection from '../sections/SkillsSection'
import CertificatesCanvas from '../sections/CertificatesCanvas'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LifeSection />
      <ProjectsCanvas />
      <ExperienceSection />
      <SkillsSection />
      <CertificatesCanvas />
      <ContactSection />
    </>
  )
}
