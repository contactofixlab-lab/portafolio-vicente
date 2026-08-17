import { useEffect } from 'react'
import Layout from '../components/Layout'
import TrajectorySection from '../sections/TrajectorySection'

export default function TrajectoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="bg-primary-50">
        <TrajectorySection />
      </div>
    </Layout>
  )
}
