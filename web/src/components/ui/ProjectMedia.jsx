import { useEffect, useState } from 'react'

const isUrl = (value) => /^(https?:\/\/|\/|data:image\/)/i.test(value || '')

/** Valor del admin → modo de ajuste. Sin valor (o "Automático") usa el modo automático. */
export function fitFromAdmin(value = '') {
  const v = String(value).toLowerCase()
  if (v.startsWith('logo')) return 'contain'
  if (v.startsWith('llenar')) return 'cover'
  if (v.startsWith('completa')) return 'frame'
  return 'auto'
}

// Adivina el tipo por la extensión mientras se analiza la imagen real
const guessKind = (src) => (/\.(png|svg|webp|gif)(\?|$)/i.test(src || '') || /^data:image\/(png|svg|webp)/i.test(src || '') ? 'transparent' : 'opaque')

/** Mira los píxeles de la imagen: si tiene zonas transparentes es un logo; si no, una captura o foto. */
function useImageKind(src, enabled) {
  const [kind, setKind] = useState(() => guessKind(src))

  useEffect(() => {
    setKind(guessKind(src))
    if (!enabled || !isUrl(src)) return undefined
    let cancelled = false
    const probe = new Image()
    probe.crossOrigin = 'anonymous'
    probe.onload = () => {
      try {
        const size = 32
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(probe, 0, 0, size, size)
        const data = ctx.getImageData(0, 0, size, size).data
        let transparent = 0
        for (let i = 3; i < data.length; i += 4) if (data[i] < 245) transparent++
        if (!cancelled) setKind(transparent > size * size * 0.03 ? 'transparent' : 'opaque')
      } catch {
        /* imagen sin permiso de lectura: se queda con la suposición por extensión */
      }
    }
    probe.src = src
    return () => {
      cancelled = true
    }
  }, [src, enabled])

  return kind
}

/**
 * Recuadro CUADRADO para la imagen de un proyecto. Ajustes (se eligen por proyecto en el admin):
 * - auto (por defecto): capturas y fotos LLENAN todo el cuadro; logos con transparencia se ven completos y grandes sobre fondo claro.
 * - cover: la imagen llena todo el cuadro.
 * - contain: imagen completa sobre fondo blanco.
 * - frame: imagen completa casi a todo el ancho, con fondo difuminado con sus propios colores.
 * Sin imagen muestra la inicial del proyecto sobre un fondo neutro.
 */
export default function ProjectMedia({ src, title = '', fit = 'auto', className = '', padding = 'p-6', imgClass = '', letterSize = 'text-7xl' }) {
  const kind = useImageKind(src, fit === 'auto')
  const [ratio, setRatio] = useState(null)

  if (!isUrl(src)) {
    return (
      <div className={`relative aspect-square w-full overflow-hidden bg-white ${className}`}>
        {src ? (
          <span className="absolute inset-0 grid place-items-center text-7xl">{src}</span>
        ) : (
          <span className={`absolute inset-0 grid place-items-center bg-primary-50 font-display font-extrabold text-primary-300 ${letterSize}`}>{title.charAt(0)}</span>
        )}
      </div>
    )
  }

  const mode = fit === 'auto' ? (kind === 'transparent' ? 'contain' : 'cover') : fit

  if (mode === 'cover') {
    return (
      <div className={`relative aspect-square w-full overflow-hidden bg-primary-50 ${className}`}>
        <img src={src} alt={title} className={`absolute inset-0 h-full w-full object-cover object-center ${imgClass}`} />
      </div>
    )
  }

  if (mode === 'contain') {
    return (
      <div className={`relative aspect-square w-full overflow-hidden bg-white ${className}`}>
        <img src={src} alt={title} className={`absolute inset-0 h-full w-full object-contain p-[7%] ${imgClass}`} />
      </div>
    )
  }

  // frame: fondo difuminado + imagen completa casi a todo el ancho
  const wide = ratio === null || ratio >= 1
  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-primary-50 ${className}`}>
      <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-150 object-cover opacity-70 blur-2xl saturate-150" />
      <div className="absolute inset-0 bg-white/40" />
      <div className="absolute inset-0 grid place-items-center">
        <img
          src={src}
          alt={title}
          onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight || 1)}
          style={ratio ? { aspectRatio: ratio, [wide ? 'width' : 'height']: '96%' } : { maxWidth: '96%', maxHeight: '96%' }}
          className={`rounded-lg object-contain transition-opacity duration-500 [filter:drop-shadow(0_14px_22px_rgba(20,28,110,0.35))] ${ratio ? 'opacity-100' : 'opacity-0'} ${imgClass}`}
        />
      </div>
    </div>
  )
}
