interface SailboatArtProps {
  width?: number
  height?: number
  className?: string
  showWake?: boolean
}

/** Shared sailboat paths — bermuda-rig sloop with curved hull and belled sails */
export function SailboatPaths({ showWake = false }: { showWake?: boolean }) {
  return (
    <>
      {/* Wake on water */}
      {showWake && (
        <>
          <ellipse cx="50" cy="84" rx="34" ry="3.5" fill="rgba(255,255,255,0.25)" />
          <path
            d="M 22 84 Q 35 81 50 83 Q 65 85 78 82"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
          />
        </>
      )}

      {/* Hull — curved fibreglass cruiser */}
      <path
        d="M 8 58
           Q 6 52 10 46
           Q 22 36 50 34
           Q 80 36 92 46
           Q 96 52 93 58
           Q 88 64 50 66
           Q 14 64 8 58 Z"
        fill="#F5F7FA"
        stroke="#90A4AE"
        strokeWidth="1.2"
      />
      {/* Hull stripe */}
      <path
        d="M 12 56 Q 50 62 90 56"
        fill="none"
        stroke="#1565C0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Waterline shadow */}
      <path
        d="M 14 59 Q 50 63 88 59"
        fill="none"
        stroke="#78909C"
        strokeWidth="0.8"
        opacity="0.45"
      />
      {/* Deck */}
      <path
        d="M 18 52 Q 50 46 84 52"
        fill="#ECEFF1"
        stroke="#B0BEC5"
        strokeWidth="0.6"
      />
      {/* Cabin / coachroof */}
      <path
        d="M 40 47 Q 50 42 62 47 L 60 51 L 42 51 Z"
        fill="#FFFFFF"
        stroke="#CFD8DC"
        strokeWidth="0.8"
      />
      <rect x="47" y="43" width="6" height="4" rx="1" fill="#B3E5FC" opacity="0.7" />

      {/* Rudder */}
      <path d="M 91 56 L 96 72 L 88 72 Z" fill="#546E7A" stroke="#37474F" strokeWidth="0.6" />

      {/* Mast */}
      <line x1="50" y1="46" x2="50" y2="4" stroke="#37474F" strokeWidth="2.2" strokeLinecap="round" />
      {/* Mast top */}
      <circle cx="50" cy="4" r="1.5" fill="#546E7A" />

      {/* Boom */}
      <line x1="50" y1="36" x2="82" y2="40" stroke="#455A64" strokeWidth="1.6" strokeLinecap="round" />

      {/* Rigging */}
      <line x1="50" y1="4" x2="14" y2="54" stroke="#90A4AE" strokeWidth="0.7" />
      <line x1="50" y1="4" x2="90" y2="54" stroke="#90A4AE" strokeWidth="0.7" />
      <line x1="50" y1="18" x2="76" y2="22" stroke="#90A4AE" strokeWidth="0.5" opacity="0.6" />

      {/* Mainsail — belled curve */}
      <path
        d="M 52 8
           L 52 36
           L 80 40
           Q 72 22 58 12
           Q 54 8 52 8 Z"
        fill="#FAFAFA"
        stroke="#E0E0E0"
        strokeWidth="0.8"
      />
      <path
        d="M 52 8 Q 64 20 52 36"
        fill="none"
        stroke="#EEEEEE"
        strokeWidth="0.6"
      />

      {/* Jib / genoa */}
      <path
        d="M 50 10
           L 50 44
           L 14 54
           Q 24 32 50 10 Z"
        fill="#FFFDE7"
        stroke="#E0E0E0"
        strokeWidth="0.8"
      />
      <path
        d="M 50 10 Q 32 28 50 44"
        fill="none"
        stroke="#FFF9C4"
        strokeWidth="0.5"
      />

      {/* Bow pulpit */}
      <path
        d="M 10 48 Q 8 44 12 42"
        fill="none"
        stroke="#78909C"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </>
  )
}

export function SailboatArt({ width = 100, height = 90, className, showWake = false }: SailboatArtProps) {
  return (
    <svg
      viewBox="0 0 100 90"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <SailboatPaths showWake={showWake} />
    </svg>
  )
}
