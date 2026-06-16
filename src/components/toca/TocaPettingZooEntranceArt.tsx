import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'

const S = TOCA.stroke

function WoodPlank({ x, y, w, h, rx = 1 }: { x: number; y: number; w: number; h: number; rx?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="#A1887F" stroke={S} strokeWidth={1.4} />
      <line x1={x + 2} y1={y + h * 0.35} x2={x + w - 2} y2={y + h * 0.35} stroke="#8D6E63" strokeWidth={0.6} opacity={0.55} />
      <line x1={x + 2} y1={y + h * 0.65} x2={x + w - 2} y2={y + h * 0.65} stroke="#8D6E63" strokeWidth={0.6} opacity={0.45} />
    </g>
  )
}

function AcaciaTree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x={-2.5} y={10} width={5} height={22} rx={1.5} fill="#8D6E63" stroke={S} strokeWidth={1.2} />
      <ellipse cx={0} cy={6} rx={18} ry={8} fill="#66BB6A" stroke={S} strokeWidth={1.4} />
      <ellipse cx={-10} cy={8} rx={10} ry={5} fill="#81C784" stroke={S} strokeWidth={1} />
      <ellipse cx={11} cy={7} rx={9} ry={5} fill="#81C784" stroke={S} strokeWidth={1} />
    </g>
  )
}

function ZooLetter({ letter, x }: { letter: string; x: number }) {
  return (
    <g>
      <rect x={x - 8} y={14} width={16} height={18} rx={3} fill="#FF7043" stroke={S} strokeWidth={1.8} />
      <rect x={x - 6} y={16} width={12} height={5} rx={1.5} fill="#FFAB91" opacity={0.7} />
      <text x={x + 0.5} y={27} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#FFFFFF" stroke={S} strokeWidth={0.4}>
        {letter}
      </text>
    </g>
  )
}

function LatticePanel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={TOCA.ochre} strokeWidth={1.8} />
      {[0, 6, 12].map((dy) => (
        <line key={`h${dy}`} x1={x} y1={y + dy} x2={x + w} y2={y + dy} stroke="#A1887F" strokeWidth={1.2} />
      ))}
      {[0, 8, 16, 24].map((dx) => (
        <line key={`v${dx}`} x1={x + dx} y1={y} x2={x + dx} y2={y + h} stroke="#A1887F" strokeWidth={1.2} />
      ))}
    </g>
  )
}

function SideElephant({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={8} cy={12} rx={20} ry={14} fill="#9E9E9E" stroke={S} strokeWidth={1.8} />
      <ellipse cx={-12} cy={6} rx={12} ry={11} fill="#BDBDBD" stroke={S} strokeWidth={1.6} />
      <ellipse cx={-18} cy={8} rx={8} ry={10} fill="#E0E0E0" stroke={S} strokeWidth={1.3} />
      <path
        d="M -20 12 Q -26 20 -22 28 Q -18 24 -16 18 Q -14 14 -12 12"
        fill="#BDBDBD"
        stroke={S}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <line x1={-24} y1={10} x2={-28} y2={6} stroke="#FAFAFA" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={-22} y1={12} x2={-26} y2={8} stroke="#FAFAFA" strokeWidth={2.1} strokeLinecap="round" />
      <circle cx={-16} cy={3} r={2.2} fill={S} />
      <ellipse cx={-14} cy={6} rx={2.8} ry={2.2} fill="#757575" />
      <rect x={-4} y={22} width={5} height={11} rx={1.5} fill="#757575" stroke={S} strokeWidth={1.2} />
      <rect x={6} y={22} width={5} height={11} rx={1.5} fill="#757575" stroke={S} strokeWidth={1.2} />
      <rect x={16} y={22} width={5} height={11} rx={1.5} fill="#757575" stroke={S} strokeWidth={1.2} />
      <path d="M 24 16 Q 30 14 28 20" fill="none" stroke="#9E9E9E" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  )
}

function SideZebra({ x, y }: { x: number; y: number }) {
  const stripes = [-6, -2, 2, 6, 10]
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={8} rx={9} ry={7} fill="#FAFAFA" stroke={S} strokeWidth={1.5} />
      <ellipse cx={-9} cy={2} rx={6} ry={5.5} fill="#FAFAFA" stroke={S} strokeWidth={1.4} />
      {stripes.map((sx) => (
        <rect key={sx} x={sx} y={2} width={2} height={11} fill={S} opacity={0.8} />
      ))}
      <path d="M -13 0 L -11 -3 L -9 0" fill="#616161" stroke={S} strokeWidth={0.8} />
      <circle cx={-11} cy={0} r={1.2} fill={S} />
      <rect x={4} y={13} width={3} height={6} rx={1} fill="#EEEEEE" stroke={S} strokeWidth={0.9} />
      <rect x={-1} y={13} width={3} height={6} rx={1} fill="#EEEEEE" stroke={S} strokeWidth={0.9} />
    </g>
  )
}

function SideHyena({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={0.92}>
      <ellipse cx={0} cy={6} rx={9} ry={5} fill="#BCAAA4" stroke={S} strokeWidth={1.2} />
      <ellipse cx={-8} cy={3} rx={6} ry={5} fill="#A1887F" stroke={S} strokeWidth={1.2} />
      <path d="M -12 -1 L -10 -5 L -8 -1" fill="#8D6E63" stroke={S} strokeWidth={0.7} />
      <circle cx={-10} cy={1} r={1.1} fill={S} />
      <path d="M 6 4 L 10 2 L 8 7 Z" fill="#A1887F" stroke={S} strokeWidth={0.8} />
    </g>
  )
}

function SideLion({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={14} rx={18} ry={7} fill="#78909C" stroke={S} strokeWidth={1.4} />
      <ellipse cx={-2} cy={2} rx={9} ry={8} fill="#FFB74D" stroke={S} strokeWidth={1.6} />
      <circle cx={-6} cy={-2} r={8.5} fill="#FF9800" stroke={S} strokeWidth={1.5} />
      <path
        d="M -14 -6 Q -8 -12 -2 -10 Q 4 -14 10 -8 Q 14 -4 12 2 Q 10 6 4 4 Q -4 6 -10 2 Q -16 -2 -14 -6"
        fill="#F57C00"
        stroke={S}
        strokeWidth={1.2}
      />
      <circle cx={-8} cy={-3} r={1.6} fill={S} />
      <rect x={-6} y={10} width={4} height={7} rx={1.2} fill="#F57C00" stroke={S} strokeWidth={1} />
      <rect x={2} y={10} width={4} height={7} rx={1.2} fill="#F57C00" stroke={S} strokeWidth={1} />
      <path d="M 8 4 Q 14 2 16 8" fill="none" stroke="#FFB74D" strokeWidth={2.2} strokeLinecap="round" />
    </g>
  )
}

function SideLioness({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={5} rx={12} ry={5} fill="#FFCC80" stroke={S} strokeWidth={1.3} />
      <ellipse cx={-9} cy={3} rx={6} ry={4.5} fill="#FFB74D" stroke={S} strokeWidth={1.2} />
      <circle cx={-11} cy={1} r={1.1} fill={S} />
    </g>
  )
}

function SideBaboon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={8} rx={10} ry={5} fill="#78909C" stroke={S} strokeWidth={1.2} />
      <ellipse cx={-1} cy={0} rx={7} ry={6} fill="#A1887F" stroke={S} strokeWidth={1.4} />
      <circle cx={-5} cy={-3} r={5.5} fill="#BCAAA4" stroke={S} strokeWidth={1.3} />
      <ellipse cx={-7} cy={-5} rx={2.8} ry={3.5} fill="#D7CCC8" stroke={S} strokeWidth={0.9} />
      <circle cx={-7} cy={-3} r={1.2} fill={S} />
      <ellipse cx={-3} cy={0} rx={2.2} ry={1.8} fill="#8D6E63" />
    </g>
  )
}

function GateGiraffe({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={0.85}>
      <rect x={-2} y={0} width={4} height={22} rx={1.5} fill="#FFB74D" stroke={S} strokeWidth={1} />
      <ellipse cx={0} cy={-4} rx={5} ry={4} fill="#FFB74D" stroke={S} strokeWidth={1.1} />
      <circle cx={-2} cy={-5} r={1} fill={S} />
      <path d="M -4 -8 L -2 -12 L 0 -8" fill="#8D6E63" stroke={S} strokeWidth={0.7} />
      {[4, 10, 16].map((gy) => (
        <rect key={gy} x={-3} y={gy} width={6} height={3} rx={1} fill="#FFFFFF" opacity={0.75} />
      ))}
    </g>
  )
}

function DirectionSign({
  x,
  y,
  flip,
  labels,
}: {
  x: number
  y: number
  flip?: boolean
  labels: string[]
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={-2} y={0} width={4} height={26} rx={1} fill="#8D6E63" stroke={S} strokeWidth={0.9} />
      {labels.map((label, i) => {
        const by = 2 + i * 8
        const w = label.length * 2.8 + 6
        const tipX = flip ? -w : w
        return (
          <g key={label}>
            <polygon
              points={flip ? `0,${by} ${tipX},${by - 2} ${tipX},${by + 6} 0,${by + 4}` : `0,${by} ${tipX},${by - 2} ${tipX},${by + 6} 0,${by + 4}`}
              fill="#FFD54F"
              stroke={S}
              strokeWidth={0.9}
            />
            <text
              x={flip ? tipX / 2 : tipX / 2}
              y={by + 4.5}
              textAnchor="middle"
              fontSize={3.6}
              fontWeight="bold"
              fill={S}
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

/** Front-view zoo entrance — transparent backdrop; map terrain shows through. */
export function PettingZooEntranceToca() {
  const groundY = 108

  return (
    <TocaWrap>
      <TocaShadow cy={groundY + 1} rx={62} />

      <AcaciaTree x={18} y={34} scale={0.9} />
      <AcaciaTree x={162} y={32} scale={0.85} />
      <AcaciaTree x={90} y={28} scale={0.58} />

      {/* Stone wall */}
      <rect x={2} y={92} width={176} height={16} fill="#B0BEC5" stroke={S} strokeWidth={1.6} />
      {[6, 22, 38, 54, 70, 86, 102, 118, 134, 150, 166].map((sx, i) => (
        <rect
          key={sx}
          x={sx}
          y={94 + (i % 2)}
          width={14}
          height={6}
          rx={1.2}
          fill={i % 2 === 0 ? '#CFD8DC' : '#B0BEC5'}
          stroke={S}
          strokeWidth={0.5}
        />
      ))}

      {/* Side lattice fences */}
      <LatticePanel x={8} y={82} w={44} h={12} />
      <LatticePanel x={128} y={82} w={44} h={12} />

      {/* Gateway posts + beams */}
      <WoodPlank x={56} y={44} w={13} h={48} rx={2} />
      <WoodPlank x={111} y={44} w={13} h={48} rx={2} />
      <WoodPlank x={52} y={38} w={76} h={9} rx={2} />
      <WoodPlank x={54} y={28} w={72} h={9} rx={2} />
      <line x1={56} y1={50} x2={68} y2={92} stroke="#8D6E63" strokeWidth={2.2} />
      <line x1={124} y1={50} x2={112} y2={92} stroke="#8D6E63" strokeWidth={2.2} />

      <ZooLetter letter="Z" x={74} />
      <ZooLetter letter="O" x={90} />
      <ZooLetter letter="O" x={106} />

      {/* Gate opening — no fill; giraffes visible deep inside */}
      <GateGiraffe x={82} y={58} scale={0.9} />
      <GateGiraffe x={98} y={62} scale={0.75} />
      <LatticePanel x={72} y={84} w={36} h={10} />

      {/* Path stones — subtle so map shows around them */}
      {[76, 86, 96, 106].map((px, i) => (
        <ellipse
          key={px}
          cx={px}
          cy={groundY - 1 - (i % 2)}
          rx={5}
          ry={2.5}
          fill="#ECEFF1"
          stroke="#B0BEC5"
          strokeWidth={0.6}
          opacity={0.85}
        />
      ))}

      <DirectionSign x={32} y={64} labels={['ZEBRA', 'ELEPHANTS', 'HYENA']} />
      <DirectionSign x={148} y={64} flip labels={['LIONS', 'MONKEYS']} />

      {/* Animals — spaced to avoid overlap */}
      <SideZebra x={12} y={76} />
      <SideHyena x={2} y={84} />
      <SideElephant x={30} y={68} />
      <SideBaboon x={122} y={56} />
      <SideLion x={158} y={64} />
      <SideLioness x={152} y={78} />

      {/* Ticket booth — tucked beside gate, not over lions */}
      <g transform="translate(114, 50)">
        <rect x={0} y={20} width={30} height={26} fill="#78909C" stroke={S} strokeWidth={1.6} />
        <path d="M -2 20 L 15 10 L 32 20 Z" fill="#E53935" stroke={S} strokeWidth={1.6} />
        <rect x={18} y={28} width={10} height={12} fill="#90A4AE" stroke={S} strokeWidth={1} />
        <rect x={4} y={30} width={11} height={9} rx={1.5} fill="#FFFFFF" stroke={S} strokeWidth={1} />
        <text x={9.5} y={36.5} textAnchor="middle" fontSize={4} fontWeight="bold" fill="#E53935">
          OPEN
        </text>
      </g>

      <g transform="translate(46, 88)">
        <rect x={-5} y={4} width={10} height={7} rx={1} fill="#ECEFF1" stroke={S} strokeWidth={0.9} />
        <ellipse cx={0} cy={2} rx={6} ry={5} fill="#66BB6A" stroke={S} strokeWidth={0.9} />
      </g>
    </TocaWrap>
  )
}
