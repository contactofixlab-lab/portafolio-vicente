/**
 * Utilidades de performance
 */

// Lazy loading para imágenes
export const observeImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })
}

// Medir Core Web Vitals
export const measureWebVitals = () => {
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
  })
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

  // Cumulative Layout Shift
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        console.log('CLS:', clsValue)
      }
    }
  })
  clsObserver.observe({ entryTypes: ['layout-shift'] })

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FID:', entry.processingDuration)
    }
  })
  fidObserver.observe({ entryTypes: ['first-input'] })
}

// Prefetch recursos críticos
export const prefetchResources = () => {
  const prefetchLinks = [
    { rel: 'prefetch', href: '/fonts/DM_Sans-Regular.woff2' },
    { rel: 'prefetch', href: '#proyectos' }
  ]

  prefetchLinks.forEach(link => {
    const el = document.createElement('link')
    el.rel = link.rel
    el.href = link.href
    document.head.appendChild(el)
  })
}

// Monitorear tiempo de carga
export const logPageLoadTime = () => {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    console.log('Tiempo de carga:', pageLoadTime + 'ms')
  })
}

// Comprimir imágenes automáticamente (usar con librería como ImageOptim en build)
export const optimizeImages = () => {
  console.log('Use: npm install sharp, implementar en build script')
}
