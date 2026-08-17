// Variantes de animaciones avanzadas para Framer Motion

// Shimmer Effect - Efecto de brillo
export const shimmerVariants = {
  initial: { backgroundPosition: '200% center' },
  animate: {
    backgroundPosition: '-200% center',
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear'
    }
  }
}

// Fade In - Aparición suave
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Slide In - Deslizamiento
export const slideInVariants = (direction = 'up') => {
  const directions = {
    up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } }
  }
  return {
    ...directions[direction],
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Stagger Container - Contenedor para animaciones escalonadas
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5
    }
  }
}

// Stagger Item - Item para animación escalonada
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Scale Up - Escala con rotación suave
export const scaleUpVariants = {
  initial: { scale: 0.8, opacity: 0, rotate: -5 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  transition: { duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 200 }
}

// Float - Efecto de flotación
export const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
}

// Pulse - Efecto de pulso
export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
}

// Glow - Efecto de brillo
export const glowVariants = {
  initial: { boxShadow: '0 0 0px rgba(249, 115, 22, 0)' },
  animate: {
    boxShadow: [
      '0 0 0px rgba(249, 115, 22, 0)',
      '0 0 30px rgba(249, 115, 22, 0.5)',
      '0 0 0px rgba(249, 115, 22, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
}

// Bounce In - Rebote al entrar
export const bounceInVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    duration: 0.7
  }
}

// Rotate In - Rotación al entrar
export const rotateInVariants = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' }
}

// Flip - Efecto de volteo
export const flipVariants = {
  initial: { rotateY: 0, opacity: 1 },
  hover: { rotateY: 180 },
  transition: { type: 'spring', stiffness: 260, damping: 20 }
}

// Gradient Shift - Cambio de gradiente
export const gradientShiftVariants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear'
    }
  }
}

// Blur In - Desenfoque al entrar
export const blurInVariants = {
  initial: { filter: 'blur(10px)', opacity: 0 },
  animate: { filter: 'blur(0px)', opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' }
}

// Elastic Bounce - Rebote elástico
export const elasticBounceVariants = {
  animate: {
    y: [0, -15, 5, -5, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut'
    }
  }
}

// Skew Effect - Efecto de sesgo
export const skewVariants = {
  initial: { skewY: 0 },
  animate: { skewY: [0, 2, -2, 0] },
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'loop'
  }
}

// Color Shift - Cambio de color
export const colorShiftVariants = {
  animate: {
    color: ['#f97316', '#fbbf24', '#86efac', '#f97316'],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
}

// Wiggle - Temblequeo lateral
export const wiggleVariants = {
  animate: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
}

// Text Reveal - Revelado de texto
export const textRevealVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5
    }
  })
}

// Parallax - Efecto parallax
export const parallaxVariants = (offset = 50) => ({
  initial: { y: offset },
  whileInView: { y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
})

// Draw SVG - Dibujar SVG (requiere strokeDasharray/strokeDashoffset)
export const drawSvgVariants = {
  initial: { strokeDashoffset: 1000 },
  animate: { strokeDashoffset: 0 },
  transition: { duration: 2, ease: 'easeInOut' }
}

// Combined animations - Combinaciones útiles
export const heroTitleVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 30 }
    }
  }
}

// Card Hover - Efecto de hover para cards
export const cardHoverVariants = {
  initial: { y: 0, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
}

// Button Press - Efecto de presión de botón
export const buttonPressVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 30 }
}
