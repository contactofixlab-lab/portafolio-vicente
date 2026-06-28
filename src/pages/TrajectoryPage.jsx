import { useEffect } from 'react'
import Layout from '../components/Layout'
import TrajectorySection from '../sections/TrajectorySection'

export default function TrajectoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <TrajectorySection />
      </div>
    </Layout>
  )
}
