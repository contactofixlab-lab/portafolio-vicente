import Wave from './Wave'

export const SECTION_COLORS = {
  cream: { className: 'bg-primary-50', hex: '#eef4ff' },
  white: { className: 'bg-white', hex: '#ffffff' },
  peach: { className: 'bg-primary-100', hex: '#e0eaff' }
}

/** Sección con fondo propio y onda animada que baja hacia el color de la siguiente. */
export default function Section({ id, bg = 'cream', next, children, className = '', wide = false, waveHeight = 110 }) {
  const color = SECTION_COLORS[bg]
  const nextColor = next ? SECTION_COLORS[next].hex : null

  return (
    <section id={id} className={`relative overflow-hidden ${color.className} ${className}`}>
      <div className={`relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-24 ${next ? 'pb-40' : 'pb-24'} ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        {children}
      </div>
      {nextColor && <Wave fill={nextColor} height={waveHeight} />}
    </section>
  )
}
