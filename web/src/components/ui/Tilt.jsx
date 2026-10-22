import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

/** Inclinación 3D siguiendo el cursor, con reflejo de luz. Solo con mouse. */
export default function Tilt({ children, className = '', max = 9, glare = true, scale = 1.02 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 22 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), transparent 55%)`
  const opacity = useMotionValue(0)

  const move = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    opacity.set(1)
  }

  const leave = () => {
    px.set(0.5)
    py.set(0.5)
    opacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: sheen, opacity }}
        />
      )}
    </motion.div>
  )
}
