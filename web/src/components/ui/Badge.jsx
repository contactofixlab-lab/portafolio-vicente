import { motion } from 'framer-motion'

export default function Badge({
  children,
  variant = 'primary',
  animated = false,
  className = ''
}) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 border-primary-300',
    success: 'bg-green-100 text-green-700 border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    danger: 'bg-red-100 text-red-700 border-red-300',
    accent: 'bg-amber-100 text-amber-700 border-amber-300'
  }

  const baseClasses = `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variants[variant]} ${className}`

  if (animated) {
    return (
      <motion.span
        className={baseClasses}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.span>
    )
  }

  return <span className={baseClasses}>{children}</span>
}
