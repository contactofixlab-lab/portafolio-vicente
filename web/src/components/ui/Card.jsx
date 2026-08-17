import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hoverable = true,
  onClick = null,
  as: Component = 'div'
}) {
  const baseClasses = `bg-white rounded-lg border border-gray-200 p-6 ${hoverable ? 'cursor-pointer' : ''} ${className}`

  const hoverClasses = hoverable ? 'hover:shadow-lg hover:border-primary-300 transition-all duration-300' : ''

  if (hoverable) {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses}`}
        whileHover={{ y: -4 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <Component className={`${baseClasses} ${hoverClasses}`} onClick={onClick}>
      {children}
    </Component>
  )
}
