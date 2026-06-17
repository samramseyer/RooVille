import { adjustColor } from './toca/tocaShading'
import type { InteriorStyle } from '../types'

const S = '#1B4332'

function JungleCanopy({ wallColor }: { wallColor: string }) {
  const dark = adjustColor(wallColor, -22)
  return (
    <>
      <rect x={0} y={0} width={640} height={200} fill={wallColor} />
      <ellipse cx={80} cy={120} rx={95} ry={70} fill={dark} opacity={0.55} />
      <ellipse cx={220} cy={90} rx={110} ry={80} fill={adjustColor(wallColor, 12)} opacity={0.65} />
      <ellipse cx={400} cy={100} rx={120} ry={85} fill={dark} opacity={0.5} />
      <ellipse cx={560} cy={115} rx={100} ry={75} fill={adjustColor(wallColor, 8)} opacity={0.6} />
      {[60, 180, 320, 460, 580].map((x) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x - 8} y2={200} stroke="#33691E" strokeWidth={3} opacity={0.35} />
          <ellipse cx={x} cy={42} rx={28} ry={22} fill="#43A047" stroke={S} strokeWidth={1.2} />
          <ellipse cx={x - 12} cy={36} rx={16} ry={12} fill="#66BB6A" opacity={0.85} />
          <ellipse cx={x + 14} cy={38} rx={14} ry={10} fill="#81C784" opacity={0.8} />
        </g>
      ))}
      <path
        d="M 0 170 Q 160 140 320 155 T 640 165 L 640 200 L 0 200 Z"
        fill="#2E7D32"
        opacity={0.45}
      />
    </>
  )
}

function JungleFloor({ floorColor }: { floorColor: string }) {
  const dark = adjustColor(floorColor, -18)
  return (
    <>
      <rect x={0} y={200} width={640} height={280} fill={floorColor} />
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 10 }).map((__, col) => (
          <ellipse
            key={`${row}-${col}`}
            cx={col * 68 + 24 + (row % 2) * 18}
            cy={230 + row * 32}
            rx={10}
            ry={5}
            fill={dark}
            opacity={0.22}
          />
        )),
      )}
      {[120, 280, 440, 560].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={360} rx={22} ry={10} fill={adjustColor(floorColor, 10)} opacity={0.5} />
          <path
            d={`M ${x} 350 Q ${x - 8} 320 ${x} 290`}
            stroke="#558B2F"
            strokeWidth={3}
            fill="none"
            opacity={0.55}
          />
        </g>
      ))}
    </>
  )
}

function AquariumBackdrop() {
  return (
    <>
      <defs>
        <linearGradient id="aqua-wall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0288D1" />
          <stop offset="100%" stopColor="#01579B" />
        </linearGradient>
        <linearGradient id="aqua-floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#039BE5" />
          <stop offset="100%" stopColor="#0277BD" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={640} height={200} fill="url(#aqua-wall)" />
      {[40, 120, 200, 280, 360, 440, 520, 600].map((x, i) => (
        <circle key={x} cx={x} cy={60 + (i % 3) * 30} r={4 + (i % 2) * 2} fill="#B3E5FC" opacity={0.55} />
      ))}
      <ellipse cx={100} cy={150} rx={40} ry={18} fill="#00838F" opacity={0.35} />
      <ellipse cx={520} cy={130} rx={55} ry={22} fill="#006064" opacity={0.3} />
      <path d="M 80 180 Q 120 150 160 180" stroke="#26A69A" strokeWidth={5} fill="none" opacity={0.6} />
      <path d="M 480 170 Q 520 140 560 175" stroke="#00897B" strokeWidth={6} fill="none" opacity={0.55} />
      <rect x={0} y={200} width={640} height={280} fill="url(#aqua-floor)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse
          key={i}
          cx={30 + i * 44}
          cy={260 + (i % 4) * 40}
          rx={6}
          ry={10}
          fill="#E1F5FE"
          opacity={0.35}
        />
      ))}
      <ellipse cx={320} cy={380} rx={180} ry={40} fill="#01579B" opacity={0.25} />
    </>
  )
}

export function JungleRoomBackground({ style }: { style: InteriorStyle }) {
  const wall = style.wallColor ?? '#2E7D32'
  const floor = style.floorColor ?? '#33691E'
  const trim = style.trimColor ?? '#1B5E20'

  return (
    <>
      <JungleCanopy wallColor={wall} />
      <JungleFloor floorColor={floor} />
      <rect x={0} y={192} width={640} height={12} fill={trim} stroke={S} strokeWidth={1.5} />
      <text x={320} y={188} textAnchor="middle" fontSize={14} fontWeight={700} fill="#E8F5E9" opacity={0.7}>
        🌿 Jungle exhibit
      </text>
    </>
  )
}

export function AquariumRoomBackground() {
  return (
    <>
      <AquariumBackdrop />
      <rect x={0} y={192} width={640} height={12} fill="#004D73" stroke="#003554" strokeWidth={1.5} />
      <text x={320} y={188} textAnchor="middle" fontSize={14} fontWeight={700} fill="#E1F5FE" opacity={0.75}>
        🫧 Underwater exhibit
      </text>
    </>
  )
}
