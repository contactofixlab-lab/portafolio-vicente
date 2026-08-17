import { useEffect } from 'react'
import Layout from '../components/Layout'
import FullSkillsSection from '../sections/FullSkillsSection'

export default function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="bg-primary-50">
        <FullSkillsSection />
      </div>
    </Layout>
  )
}
