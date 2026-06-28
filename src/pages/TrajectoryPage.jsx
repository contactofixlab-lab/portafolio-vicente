import { useEffect } from 'react'
import TrajectorySection from '../sections/TrajectorySection'

export default function TrajectoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <TrajectorySection />
    </div>
  )
}
