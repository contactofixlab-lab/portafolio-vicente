const PATH_A = 'M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60 L2880,120 L0,120 Z'
const PATH_B = 'M0,75 C180,30 420,105 720,70 C1020,35 1260,100 1440,75 C1620,30 1860,105 2160,70 C2460,35 2700,100 2880,75 L2880,120 L0,120 Z'
const PATH_C = 'M0,88 C300,55 540,108 720,88 C900,68 1140,108 1440,88 C1740,55 1980,108 2160,88 C2340,68 2580,108 2880,88 L2880,120 L0,120 Z'

function Layer({ d, fill, opacity, motion }) {
  return (
    <svg
      className={`absolute left-0 bottom-0 ${motion}`}
      style={{ width: '200%', height: '100%' }}
      viewBox="0 0 2880 120"
      preserveAspectRatio="none"
    >
      <path d={d} fill={fill} opacity={opacity} />
    </svg>
  )
}

/** Onda animada. `fill` es el color de la sección que viene después. */
export default function Wave({ fill = '#ffffff', height = 110, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-none ${className}`}
      style={{ height, marginBottom: -1 }}
    >
      <Layer d={PATH_A} fill={fill} opacity={0.35} motion="wave-a" />
      <Layer d={PATH_B} fill={fill} opacity={0.6} motion="wave-b" />
      <Layer d={PATH_C} fill={fill} opacity={1} motion="wave-c" />
    </div>
  )
}
