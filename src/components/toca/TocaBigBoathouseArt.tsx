import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = 2

const BB = {
  hull: '#1A3356',
  hullDark: '#122640',
  hullRail: '#B73A36',
  wood: '#C4956A',
  woodDark: '#A07848',
  woodGrain: '#B8956A',
  roof: '#C23A38',
  roofDark: '#9E2E2C',
  teal: '#5EC4C0',
  tealDark: '#3DA8A4',
  green: '#2D6848',
  greenDark: '#1F5038',
  window: '#A8D8EA',
  windowDark: '#7EB8D4',
  lifebuoy: '#F4A836',
  chimney: '#8D6E63',
}

function WoodSiding({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines = Math.floor(h / 3)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={BB.wood} stroke={S} strokeWidth={SW * 0.7} />
      {Array.from({ length: lines }, (_, i) => (
        <line
          key={i}
          x1={x + 1}
          y1={y + 2.5 + i * 3}
          x2={x + w - 1}
          y2={y + 2.5 + i * 3}
          stroke={BB.woodDark}
          strokeWidth={0.6}
          opacity={0.55}
        />
      ))}
    </g>
  )
}

function GridWindow({ x, y, w, h, cols, rows }: { x: number; y: number; w: number; h: number; cols: number; rows: number }) {
  const fw = 1.2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1} fill={BB.window} stroke={BB.woodDark} strokeWidth={fw} />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line
          key={`c${i}`}
          x1={x + ((i + 1) * w) / cols}
          y1={y}
          x2={x + ((i + 1) * w) / cols}
          y2={y + h}
          stroke={BB.woodDark}
          strokeWidth={fw * 0.8}
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line
          key={`r${i}`}
          x1={x}
          y1={y + ((i + 1) * h) / rows}
          x2={x + w}
          y2={y + ((i + 1) * h) / rows}
          stroke={BB.woodDark}
          strokeWidth={fw * 0.8}
        />
      ))}
      <rect x={x + 1.5} y={y + 1.5} width={w * 0.35} height={h * 0.3} fill="#FFFFFF" opacity={0.25} rx={0.5} />
    </g>
  )
}

function CrossWindow({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={1} fill={BB.window} stroke={BB.woodDark} strokeWidth={1} />
      <line x1={x + size / 2} y1={y} x2={x + size / 2} y2={y + size} stroke={BB.woodDark} strokeWidth={0.9} />
      <line x1={x} y1={y + size / 2} x2={x + size} y2={y + size / 2} stroke={BB.woodDark} strokeWidth={0.9} />
    </g>
  )
}

function Porthole({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={BB.window} stroke={BB.woodDark} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={r - 1.5} fill="none" stroke={BB.windowDark} strokeWidth={0.6} />
      <circle cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.22} fill="#FFFFFF" opacity={0.35} />
    </g>
  )
}

function Lifebuoy({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={5.5} fill={BB.lifebuoy} stroke={S} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={2.2} fill={BB.hull} stroke={S} strokeWidth={0.8} />
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <rect
            key={deg}
            x={cx + Math.cos(rad) * 3.2 - 1.2}
            y={cy + Math.sin(rad) * 3.2 - 2.5}
            width={2.4}
            height={5}
            fill="#FFFFFF"
            stroke={S}
            strokeWidth={0.4}
            transform={`rotate(${deg} ${cx + Math.cos(rad) * 3.2} ${cy + Math.sin(rad) * 3.2})`}
          />
        )
      })}
    </g>
  )
}

function FlatRoof({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <path
      d={`M ${x} ${y + 4} Q ${x + w / 2} ${y - 1} ${x + w} ${y + 4} L ${x + w + 2} ${y + 5} L ${x - 2} ${y + 5} Z`}
      fill={BB.roof}
      stroke={S}
      strokeWidth={SW * 0.75}
      strokeLinejoin="round"
    />
  )
}

/** Two-level houseboat — navy hull, wood lower cabin, teal/green upper wheelhouse. */
export function BigBoathouseToca() {
  // Lower deck runs bow-to-stern so the upper wheelhouse always sits on wood + hull.
  const deckLeft = 8
  const deckRight = 97
  const lowerX = 10
  const lowerW = 86 // spans under full upper cabin (to ~x96)
  const lowerY = 40
  const lowerH = 18

  return (
    <TocaWrap>
      <TocaShadow cx={52} cy={84} rx={46} />

      <path
        d="M 4 81 Q 28 78 52 81 Q 76 84 98 80"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1.2}
      />

      {/* Hull — elongated so stern supports the upper level */}
      <path
        d={`M 2 69 L 0 77 Q 5 83 20 84 Q 48 86 76 84 Q 94 82 ${deckRight} 75 L ${deckRight} 53 L ${deckRight - 4} 51 L ${deckLeft + 4} 51 Q ${deckLeft} 51 ${deckLeft} 58 Z`}
        fill={BB.hull}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={`M ${deckLeft + 4} 51 L ${deckRight - 4} 51 L ${deckRight} 53 L ${deckLeft} 58 Z`}
        fill={BB.hullDark}
        opacity={0.35}
      />

      {/* Red deck rail — full length */}
      <path
        d={`M ${deckLeft} 52 Q 52 49 ${deckRight - 2} 52`}
        fill="none"
        stroke={BB.hullRail}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <rect x={deckLeft} y={50.5} width={deckRight - deckLeft} height={2} rx={1} fill={BB.hullRail} opacity={0.85} />

      {/* Bow deck */}
      <rect x={deckLeft} y={52} width={12} height={5} rx={1} fill={adjustColor(BB.hull, 12)} opacity={0.5} />

      {/* —— Lower cabin (wood) — full length under upper wheelhouse —— */}
      <WoodSiding x={lowerX} y={lowerY} w={lowerW} h={lowerH} />
      <FlatRoof x={lowerX - 2} y={34} w={lowerW + 4} />

      {/* Lower cabin windows — front & mid; solid wood under stern wheelhouse */}
      <GridWindow x={14} y={43} w={20} h={13} cols={3} rows={2} />
      <CrossWindow x={36} y={45} size={9} />
      <CrossWindow x={48} y={45} size={9} />
      {/* subtle plank seam where upper cabin starts */}
      <line x1={58} y1={lowerY + 1} x2={58} y2={lowerY + lowerH - 1} stroke={BB.woodDark} strokeWidth={0.8} opacity={0.45} />

      {/* —— Upper wheelhouse (sits on extended lower roof) —— */}
      <rect x={40} y={26} width={24} height={14} rx={1.5} fill={BB.teal} stroke={S} strokeWidth={SW * 0.65} />
      <rect x={40} y={26} width={3} height={14} fill={BB.tealDark} opacity={0.35} />

      <path
        d="M 64 22 L 94 22 L 94 40 L 64 40 Z"
        fill={BB.green}
        stroke={S}
        strokeWidth={SW * 0.65}
        strokeLinejoin="round"
      />
      <rect x={64} y={22} width={3} height={18} fill={BB.greenDark} opacity={0.4} />

      <FlatRoof x={38} y={18} w={58} />

      {/* Upper windows — teal face */}
      <rect x={44} y={30} width={7} height={7} rx={0.5} fill={BB.window} stroke={BB.tealDark} strokeWidth={0.8} />
      <rect x={53} y={30} width={7} height={7} rx={0.5} fill={BB.window} stroke={BB.tealDark} strokeWidth={0.8} />

      {/* Upper windows — green side */}
      <rect x={68} y={24} width={5} height={13} rx={0.5} fill={BB.window} stroke={BB.greenDark} strokeWidth={0.8} />
      <CrossWindow x={76} y={28} size={7} />
      <Porthole cx={84} cy={37} r={3.5} />

      {/* Stern deck + chimney */}
      <rect x={92} y={52} width={5} height={5} rx={1} fill={adjustColor(BB.hull, 10)} opacity={0.45} />
      <rect x={91} y={14} width={5} height={7} rx={1} fill={BB.chimney} stroke={S} strokeWidth={0.8} />
      <rect x={91.5} y={14.5} width={1.5} height={6} fill="#FFFFFF" opacity={0.15} />

      <Lifebuoy cx={72} cy={32} />
    </TocaWrap>
  )
}

export function getBigBoathouseArt(id: string) {
  return id === 'big-boathouse' ? <BigBoathouseToca /> : null
}
