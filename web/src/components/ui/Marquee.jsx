const FADE = 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)'

/** Cinta que se desplaza sin fin. Duplica el contenido para que el bucle no tenga saltos. */
export default function Marquee({ children, className = '', reverse = false, speed = 38 }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ maskImage: FADE, WebkitMaskImage: FADE }}>
      <div
        className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex gap-6">{children}</div>
        <div className="flex gap-6" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
