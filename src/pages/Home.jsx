import Layout from '../components/Layout'
import HeroSection from '../sections/HeroSection'
import LifeSection from '../sections/LifeSection'
import ProjectsCanvas from '../sections/ProjectsCanvas'
import ExperienceSection from '../sections/ExperienceSection'
import SkillsSection from '../sections/SkillsSection'
import CertificatesCanvas from '../sections/CertificatesCanvas'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <Layout>
      <div className="space-y-0">
        <HeroSection />
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <LifeSection />
        </div>
        <ProjectsCanvas />
        <div className="bg-gray-50">
          <ExperienceSection />
        </div>
        <SkillsSection />
        <div className="bg-gray-50">
          <CertificatesCanvas />
        </div>
        <div className="bg-primary-50">
          <ContactSection />
        </div>
      </div>
    </Layout>
  )
}
