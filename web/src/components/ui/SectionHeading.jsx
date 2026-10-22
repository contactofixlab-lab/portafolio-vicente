import { Reveal } from './Reveal'

/** Encabezado de sección: etiqueta, título grande con subrayado ondulado y subtítulo. */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-4 max-w-3xl mb-14 ${alignment}`}>
      {eyebrow && (
        <Reveal>
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${light ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-700'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className={`font-display font-extrabold leading-[1.05] text-4xl sm:text-5xl md:text-6xl ${light ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        <svg className="squiggle mt-3 h-3 w-40" viewBox="0 0 160 12" fill="none" style={{ marginInline: align === 'center' ? 'auto' : 0 }}>
          <path d="M2 8 C 20 0, 30 12, 50 6 S 80 0, 100 6 S 135 12, 158 4" stroke={light ? '#fff' : '#f97316'} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className={`text-lg md:text-xl ${light ? 'text-white/85' : 'text-ink-soft'}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
