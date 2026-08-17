import { useEffect } from 'react'
import Layout from '../components/Layout'
import FullSkillsSection from '../sections/FullSkillsSection'

export default function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <FullSkillsSection />
      </div>
    </Layout>
  )
}
