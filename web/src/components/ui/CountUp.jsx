import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

/** Cuenta desde 0 hasta `to` cuando entra en pantalla. */
export default function CountUp({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
