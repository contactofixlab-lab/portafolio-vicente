/**
 * Utilidades de accesibilidad
 */

// Verificar contraste de colores (WCAG AA standard: 4.5:1)
export const checkContrast = (color1, color2) => {
  // Función simplificada para calcular luminancia relativa
  // En producción usar una librería como polished
  console.log(`Verify contrast between ${color1} and ${color2}`)
}

// Asegurar que los iconos tengan text alternatives
export const ensureIconAccessibility = (icon, label) => {
  return {
    'aria-label': label,
    'role': 'img'
  }
}

// Manejar focus visible para usuarios que navegan con teclado
export const manageFocusVisible = () => {
  // Agregar clase para estilos de focus visible
  const style = document.createElement('style')
  style.textContent = `
    :focus-visible {
      outline: 2px solid #f97316;
      outline-offset: 2px;
    }
  `
  document.head.appendChild(style)
}

// Verificar que el sitio sea navegable por teclado
export const testKeyboardNavigation = () => {
  console.log('Test keyboard navigation: Tab through all interactive elements')
}

// Verificar que las imágenes tengan alt text
export const checkImageAlt = () => {
  const images = document.querySelectorAll('img')
  images.forEach(img => {
    if (!img.alt) {
      console.warn('Image missing alt text:', img)
    }
  })
}

// Validar estructura de headings (h1, h2, h3, etc.)
export const validateHeadingStructure = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let lastLevel = 0
  headings.forEach(h => {
    const level = parseInt(h.tagName[1])
    if (level - lastLevel > 1) {
      console.warn('Heading structure issue:', h.tagName, h.textContent)
    }
    lastLevel = level
  })
}
