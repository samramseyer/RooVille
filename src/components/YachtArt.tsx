/** Waterline Y in viewBox — hull floats on this line */
export const YACHT_WATERLINE_Y = 58

interface YachtArtProps {
  width?: number
  height?: number
  className?: string
  showWake?: boolean
}

/** Motor yacht with hull anchored to waterline */
export function YachtPaths({ showWake = false }: { showWake?: boolean }) {
  const wl = YACHT_WATERLINE_Y

  return (
    <>
      {/* Wake & reflection at waterline */}
      {showWake && (
        <>
          <ellipse cx="60" cy={wl + 2} rx="48" ry="4" fill="rgba(255,255,255,0.22)" />
          <path
            d={`M 18 ${wl + 1} Q 40 ${wl - 2} 60 ${wl} Q 80 ${wl + 2} 102 ${wl + 1}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          />
          {/* Soft reflection below water */}
          <ellipse cx="60" cy={wl + 8} rx="38" ry="3" fill="rgba(255,255,255,0.08)" />
        </>
      )}

      {/* Submerged hull */}
      <path
        d={`M 10 ${wl - 2}
           Q 8 ${wl + 4} 14 ${wl + 10}
           Q 35 ${wl + 14} 60 ${wl + 12}
           Q 85 ${wl + 14} 106 ${wl + 10}
           Q 112 ${wl + 4} 110 ${wl - 2}
           Q 85 ${wl + 4} 60 ${wl + 5}
           Q 35 ${wl + 4} 10 ${wl - 2} Z`}
        fill="#1A7A74"
        opacity="0.55"
      />

      {/* Main hull — above water */}
      <path
        d={`M 6 ${wl - 1}
           Q 4 ${wl - 8} 12 ${wl - 14}
           Q 28 ${wl - 20} 60 ${wl - 21}
           Q 92 ${wl - 20} 108 ${wl - 14}
           Q 116 ${wl - 8} 114 ${wl - 1}
           Q 90 ${wl + 2} 60 ${wl + 3}
           Q 30 ${wl + 2} 6 ${wl - 1} Z`}
        fill="#FAFBFC"
        stroke="#90A4AE"
        strokeWidth="1.1"
      />

      {/* Hull stripe */}
      <path
        d={`M 14 ${wl - 3} Q 60 ${wl + 1} 106 ${wl - 3}`}
        fill="none"
        stroke="#1A237E"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Waterline highlight */}
      <path
        d={`M 12 ${wl} Q 60 ${wl + 2} 108 ${wl}`}
        fill="none"
        stroke="#4DB6AC"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Deck line */}
      <path
        d={`M 16 ${wl - 10} Q 60 ${wl - 14} 104 ${wl - 10}`}
        fill="#ECEFF1"
        stroke="#B0BEC5"
        strokeWidth="0.5"
      />

      {/* Main cabin */}
      <path
        d={`M 38 ${wl - 18} Q 60 ${wl - 22} 82 ${wl - 18}
           L 80 ${wl - 10} L 40 ${wl - 10} Z`}
        fill="#FFFFFF"
        stroke="#CFD8DC"
        strokeWidth="0.8"
      />

      {/* Tinted windows */}
      {[44, 54, 64, 74].map((x) => (
        <rect
          key={x}
          x={x}
          y={wl - 17}
          width="7"
          height="5"
          rx="1"
          fill="#37474F"
          opacity="0.75"
        />
      ))}

      {/* Flybridge */}
      <path
        d={`M 48 ${wl - 26} L 72 ${wl - 26} L 70 ${wl - 20} L 50 ${wl - 20} Z`}
        fill="#F5F5F5"
        stroke="#B0BEC5"
        strokeWidth="0.7"
      />
      <rect x="52" y={wl - 25} width="16" height="4" rx="1" fill="#546E7A" opacity="0.6" />

      {/* Radar / antenna */}
      <line x1="60" y1={wl - 26} x2="60" y2={wl - 32} stroke="#546E7A" strokeWidth="1.2" />
      <line x1="56" y1={wl - 31} x2="64" y2={wl - 31} stroke="#546E7A" strokeWidth="1" />
      <circle cx="60" cy={wl - 32} r="1.5" fill="#78909C" />

      {/* Bow rail */}
      <path
        d={`M 12 ${wl - 12} Q 8 ${wl - 16} 14 ${wl - 18}`}
        fill="none"
        stroke="#78909C"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Stern platform */}
      <rect x="104" y={wl - 9} width="6" height="4" rx="1" fill="#E0E0E0" stroke="#B0BEC5" strokeWidth="0.5" />
    </>
  )
}

export function YachtArt({
  width = 120,
  height = 70,
  className,
  showWake = false,
}: YachtArtProps) {
  return (
    <svg
      viewBox="0 0 120 70"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <YachtPaths showWake={showWake} />
    </svg>
  )
}

/** Scale & translate so waterline sits at sceneY in parent coords */
export function yachtTransform(sceneX: number, sceneWaterlineY: number, scale: number) {
  return {
    x: sceneX,
    y: sceneWaterlineY - YACHT_WATERLINE_Y * scale,
    scale,
  }
}
