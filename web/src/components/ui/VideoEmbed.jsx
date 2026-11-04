import { useState } from 'react'
import { Play } from 'lucide-react'

/** Reconoce enlaces de YouTube, Vimeo o un archivo de video directo y devuelve cómo incrustarlo. */
export function parseVideo(rawUrl) {
  const url = String(rawUrl ?? '').trim()
  if (!url) return null
  let u
  try {
    u = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`)
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, '').replace(/^m\./, '')

  let id = null
  if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0]
  else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    if (u.pathname === '/watch') id = u.searchParams.get('v')
    else {
      const m = /^\/(?:embed|shorts|live|v)\/([\w-]{6,})/.exec(u.pathname)
      id = m ? m[1] : null
    }
  }
  if (id && /^[\w-]{6,}$/.test(id)) {
    return {
      kind: 'youtube',
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    }
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const m = /\/(?:video\/)?(\d{5,})(?:\/([\w]+))?/.exec(u.pathname)
    if (m) {
      const hash = m[2] || u.searchParams.get('h')
      return { kind: 'vimeo', embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1${hash ? `&h=${hash}` : ''}`, thumb: null }
    }
  }

  if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return { kind: 'file', src: u.href }
  return null
}

/**
 * Video con portada y botón de reproducir: el reproductor externo recién se carga al pulsar,
 * así la página no descarga nada de YouTube/Vimeo hasta que alguien quiere verlo.
 */
export default function VideoEmbed({ url, title = 'Video del proyecto', className = '' }) {
  const [playing, setPlaying] = useState(false)
  const video = parseVideo(url)
  if (!video) return null

  const frame = 'relative aspect-video w-full overflow-hidden rounded-[1.75rem] border-4 border-white bg-night shadow-[0_30px_70px_-30px_rgba(30,36,160,0.6)] sm:rounded-[2rem]'

  if (video.kind === 'file') {
    return (
      <div className={`${frame} ${className}`}>
        <video src={video.src} controls playsInline preload="metadata" title={title} className="h-full w-full object-contain" />
      </div>
    )
  }

  return (
    <div className={`${frame} ${className}`}>
      {playing ? (
        <iframe
          src={video.embed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir: ${title}`} className="group absolute inset-0 grid place-items-center outline-none focus-visible:ring-4 focus-visible:ring-accent-400/70">
          {video.thumb ? (
            <img src={video.thumb} alt="" aria-hidden="true" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-night via-primary-900 to-primary-700" />
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-night/30" />
          <span className="led-btn relative grid h-20 w-20 place-items-center rounded-full shadow-[0_0_40px_rgba(34,229,255,0.5)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
            <Play size={36} className="ml-1 fill-white" />
          </span>
        </button>
      )}
    </div>
  )
}
