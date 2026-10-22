import { useState } from 'react'
import { motion } from 'framer-motion'

const VARIANTS = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow hover:shadow-[0_22px_60px_-10px_rgba(249,115,22,0.7)]',
  light: 'bg-white text-primary-600 shadow-soft hover:bg-primary-50',
  outline: 'border-2 border-primary-500 text-primary-600 bg-white/40 hover:bg-primary-500 hover:text-white',
  dark: 'bg-ink text-white hover:bg-primary-700',
  whatsapp: 'bg-whatsapp text-white shadow-[0_18px_44px_-12px_rgba(37,211,102,0.65)] hover:bg-whatsapp-dark',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

/** Botón con brillo, onda al hacer clic y rebote. Acepta `href` para enlaces. */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick = null,
  disabled = false,
  type = 'button',
  href,
  target,
  shine = true
}) {
  const [ripples, setRipples] = useState([])

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Date.now() + Math.random()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((item) => item.id !== id)), 650)
  }

  const classes = `relative inline-flex items-center justify-center gap-2 font-semibold rounded-full overflow-hidden transition-all duration-300 ${shine && variant === 'primary' ? 'btn-shine' : ''} ${VARIANTS[variant]} ${SIZES[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  const handle = (e) => {
    if (disabled) return
    addRipple(e)
    if (onClick) onClick(e)
  }

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/50 pointer-events-none animate-ping"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20, animationDuration: '650ms', animationIterationCount: 1 }}
        />
      ))}
    </>
  )

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.06, y: -2 },
    whileTap: disabled ? {} : { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={classes} onClick={handle} {...motionProps}>
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} className={classes} onClick={handle} disabled={disabled} {...motionProps}>
      {inner}
    </motion.button>
  )
}
