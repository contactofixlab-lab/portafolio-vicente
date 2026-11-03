import { ArrowUpRight } from 'lucide-react'
import Tilt from './ui/Tilt'
import WhatsAppIcon from './ui/WhatsAppIcon'
import { StaggerItem } from './ui/Reveal'

/**
 * Tarjeta grande de contacto, con la misma estructura que las de certificados: cabecera de color con el ícono
 * protagonista, etiqueta y número flotando, y un cuerpo con el dato, una línea de apoyo y la acción.
 * Con `href` toda la tarjeta es un enlace; sin él, es solo informativa.
 */
export default function ContactInfoCard({ index = 0, icon: Icon, whatsapp = false, label, value, hint, href, external = false, action, gradient, live = false, className = '' }) {
  const Glyph = ({ size }) => (whatsapp ? <WhatsAppIcon size={size} /> : <Icon size={size} strokeWidth={1.8} />)

  const card = (
    <Tilt max={6} scale={1.02} className="h-full rounded-[1.75rem]">
      <article className="led-hover group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-white shadow-card">
        <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} sm:h-48`}>
          <div className="absolute inset-0 dots opacity-25" />
          <div className="absolute -left-10 -top-12 h-44 w-44 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-night/30 blur-3xl" />

          <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-6 text-white/15 transition-transform duration-700 ease-out group-hover:-rotate-12 group-hover:scale-110">
            <Glyph size={190} />
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute left-8 top-1/2 hidden h-3 w-3 -translate-y-1/2 animate-float rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.9)] sm:block" />

          <span className="relative grid h-24 w-24 place-items-center rounded-[1.75rem] border border-white/50 bg-white/20 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
            <Glyph size={44} />
            {live && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-emerald-400" />
              </span>
            )}
          </span>

          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full -skew-x-12 bg-white/40 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[520%]" />

          <span className="pointer-events-none absolute left-3 top-3 grid h-8 min-w-8 place-items-center rounded-full bg-night/80 px-2 font-display text-xs font-extrabold text-white backdrop-blur">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary-700 shadow-soft backdrop-blur">{label}</span>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5 p-6">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-extrabold leading-tight text-ink [overflow-wrap:anywhere] transition-colors group-hover:text-primary-600 sm:text-2xl">{value}</h3>
            {hint && <p className="text-sm leading-relaxed text-ink-soft">{hint}</p>}
          </div>

          {href && action && (
            <span className="led-btn flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-bold">
              {action}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </article>
    </Tilt>
  )

  return (
    <StaggerItem className={`min-w-0 ${className}`}>
      {href ? (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={`${label}: ${value}`} className="block h-full rounded-[1.75rem] outline-none focus-visible:ring-4 focus-visible:ring-accent-400/60">
          {card}
        </a>
      ) : (
        <div className="h-full">{card}</div>
      )}
    </StaggerItem>
  )
}
