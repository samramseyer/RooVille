/** Top-down petting zoo map — overworld matches reference-style layout; interior keeps empty pens. */
export const PETTING_ZOO_MAP_WIDTH = 640
export const PETTING_ZOO_MAP_HEIGHT = 480

export type PettingZooMapMode = 'interior' | 'overworld'

const GRASS = '#7CB342'
const GRASS_LIGHT = '#8BC34A'
const GRASS_DARK = '#689F38'
const PATH = '#E8C872'
const PATH_DARK = '#D4A843'
const POND = '#48CAE4'
const POND_DEEP = '#2A9D8F'
const FENCE = '#A1887F'
const FENCE_DARK = '#8D6E63'
const S = '#4E342E'

type PenAnimal =
  | 'llama-light'
  | 'llama-brown'
  | 'goat-mix'
  | 'horse-mix'
  | 'sheep'
  | 'kangaroo'
  | 'rabbit'
  | 'pig'
  | 'donkey'
  | 'parrot'

interface PenDef {
  cx: number
  cy: number
  rx: number
  ry: number
  animal?: PenAnimal
}

/** Pens sit outside the path ring, near the park edge — same spots in both modes. */
const PENS: PenDef[] = [
  { cx: 118, cy: 108, rx: 38, ry: 26, animal: 'llama-light' },
  { cx: 238, cy: 78, rx: 34, ry: 24, animal: 'goat-mix' },
  { cx: 320, cy: 68, rx: 36, ry: 24, animal: 'horse-mix' },
  { cx: 402, cy: 78, rx: 34, ry: 24, animal: 'sheep' },
  { cx: 522, cy: 108, rx: 38, ry: 26, animal: 'llama-brown' },
  { cx: 568, cy: 198, rx: 32, ry: 24, animal: 'kangaroo' },
  { cx: 568, cy: 292, rx: 30, ry: 22, animal: 'rabbit' },
  { cx: 508, cy: 368, rx: 36, ry: 24, animal: 'pig' },
  { cx: 118, cy: 238, rx: 34, ry: 24, animal: 'donkey' },
  { cx: 88, cy: 332, rx: 32, ry: 22, animal: 'goat-mix' },
  { cx: 208, cy: 368, rx: 34, ry: 24 },
]

function Tree({ cx, cy, r = 16 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx + 2} cy={cy + 2} r={r} fill={GRASS_DARK} opacity={0.28} />
      <circle cx={cx} cy={cy} r={r} fill="#66BB6A" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - r * 0.28} cy={cy - r * 0.22} r={r * 0.38} fill="#A5D6A7" opacity={0.8} />
    </g>
  )
}

function BushCluster({ cx, cy, n = 3, scale = 1 }: { cx: number; cy: number; n?: number; scale?: number }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2
        const dx = Math.cos(angle) * 11 * scale
        const dy = Math.sin(angle) * 8 * scale
        const r = (10 + (i % 2) * 4) * scale
        return (
          <circle
            key={i}
            cx={cx + dx}
            cy={cy + dy}
            r={r}
            fill={i % 2 === 0 ? '#558B2F' : '#689F38'}
            stroke={S}
            strokeWidth={0.7}
          />
        )
      })}
    </g>
  )
}

/** Wooden post fence around a pen — reference-style. */
function WoodenPen({ cx, cy, rx, ry, dashed }: { cx: number; cy: number; rx: number; ry: number; dashed?: boolean }) {
  const posts = 10
  return (
    <g opacity={dashed ? 0.88 : 1}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#A5D6A7" stroke="none" />
      {Array.from({ length: posts }).map((_, i) => {
        const t = (i / posts) * Math.PI * 2
        const px = cx + Math.cos(t) * rx
        const py = cy + Math.sin(t) * ry
        const px2 = cx + Math.cos(t + Math.PI / posts) * rx
        const py2 = cy + Math.sin(t + Math.PI / posts) * ry
        return (
          <g key={i}>
            <rect x={px - 1.5} y={py - 5} width={3} height={10} rx={1} fill={FENCE_DARK} stroke={S} strokeWidth={0.5} />
            {!dashed && (
              <line x1={px} y1={py - 2} x2={px2} y2={py2 - 2} stroke={FENCE} strokeWidth={2} strokeLinecap="round" />
            )}
            {dashed && (
              <line
                x1={px}
                y1={py - 1}
                x2={px2}
                y2={py2 - 1}
                stroke={FENCE}
                strokeWidth={1.8}
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
            )}
          </g>
        )
      })}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={dashed ? FENCE : FENCE_DARK}
        strokeWidth={dashed ? 1.5 : 1}
        strokeDasharray={dashed ? '5 4' : undefined}
        opacity={0.5}
      />
    </g>
  )
}

function MiniAnimals({ kind, cx, cy }: { kind: PenAnimal; cx: number; cy: number }) {
  switch (kind) {
    case 'llama-light':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-6} cy={2} rx={7} ry={5} fill="#FFFFFF" stroke={S} strokeWidth={0.8} />
          <ellipse cx={6} cy={3} rx={6} ry={4.5} fill="#F5F5F5" stroke={S} strokeWidth={0.8} />
        </g>
      )
    case 'llama-brown':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-6} cy={2} rx={7} ry={5} fill="#D7CCC8" stroke={S} strokeWidth={0.8} />
          <ellipse cx={6} cy={3} rx={6} ry={4.5} fill="#BCAAA4" stroke={S} strokeWidth={0.8} />
        </g>
      )
    case 'goat-mix':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-8} cy={1} rx={5.5} ry={3.8} fill="#FFFFFF" stroke={S} strokeWidth={0.7} />
          <ellipse cx={0} cy={3} rx={5} ry={3.5} fill="#A1887F" stroke={S} strokeWidth={0.7} />
          <ellipse cx={8} cy={2} rx={5.5} ry={3.8} fill="#8D6E63" stroke={S} strokeWidth={0.7} />
        </g>
      )
    case 'horse-mix':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-7} cy={2} rx={8} ry={5} fill="#FFFFFF" stroke={S} strokeWidth={0.8} />
          <ellipse cx={8} cy={3} rx={7.5} ry={5} fill="#8D6E63" stroke={S} strokeWidth={0.8} />
        </g>
      )
    case 'sheep':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <circle cx={-8} cy={2} r={5.5} fill="#FFFFFF" stroke={S} strokeWidth={0.8} />
          <circle cx={0} cy={3} r={5} fill="#FAFAFA" stroke={S} strokeWidth={0.8} />
          <circle cx={8} cy={2} r={5.5} fill="#FFFFFF" stroke={S} strokeWidth={0.8} />
        </g>
      )
    case 'kangaroo':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={0} cy={3} rx={9} ry={6} fill="#C4956A" stroke={S} strokeWidth={0.8} />
          <circle cx={-5} cy={-3} r={4.5} fill="#C4956A" stroke={S} strokeWidth={0.7} />
        </g>
      )
    case 'rabbit':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-5} cy={2} rx={5} ry={3.5} fill="#BCAAA4" stroke={S} strokeWidth={0.7} />
          <ellipse cx={5} cy={3} rx={4.5} ry={3} fill="#A1887F" stroke={S} strokeWidth={0.7} />
        </g>
      )
    case 'pig':
      return (
        <g transform={`translate(${cx - 4}, ${cy})`}>
          <ellipse cx={0} cy={3} rx={9} ry={5.5} fill="#F48FB1" stroke={S} strokeWidth={0.8} />
          <rect x={11} y={-5} width={13} height={11} rx={1.5} fill="#C4564E" stroke={S} strokeWidth={0.7} />
          <path d="M 11 -5 L 17 -10 L 24 -5 Z" fill="#8D6E63" stroke={S} strokeWidth={0.6} />
        </g>
      )
    case 'donkey':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-6} cy={2} rx={7} ry={5} fill="#8D6E63" stroke={S} strokeWidth={0.8} />
          <ellipse cx={7} cy={3} rx={6} ry={4.5} fill="#795548" stroke={S} strokeWidth={0.8} />
        </g>
      )
    case 'parrot':
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <ellipse cx={-6} cy={2} rx={6} ry={4} fill="#E53935" stroke={S} strokeWidth={0.7} />
          <ellipse cx={5} cy={1} rx={5} ry={3.5} fill="#1E88E5" stroke={S} strokeWidth={0.7} />
          <polygon points="7,-3 11,-8 9,-1" fill="#FDD835" stroke={S} strokeWidth={0.5} />
        </g>
      )
    default:
      return null
  }
}

function PathRing() {
  return (
    <path
      fill={PATH}
      fillRule="evenodd"
      stroke={PATH_DARK}
      strokeWidth={2.5}
      strokeLinejoin="round"
      d={`M 320 420
          C 185 410 75 340 62 250
          C 50 160 105 78 195 52
          C 260 34 380 34 445 52
          C 535 78 590 160 578 250
          C 565 340 455 410 320 420 Z
          M 320 355
          C 230 348 155 295 145 235
          C 135 175 175 125 240 108
          C 280 98 360 98 400 108
          C 465 125 505 175 495 235
          C 485 295 410 348 320 355 Z`}
    />
  )
}

function PondAndFountain() {
  return (
    <g>
      <ellipse cx={320} cy={232} rx={88} ry={60} fill={POND} stroke={POND_DEEP} strokeWidth={2.2} />
      <ellipse cx={320} cy={232} rx={72} ry={48} fill={POND_DEEP} opacity={0.2} />
      <ellipse cx={320} cy={240} rx={22} ry={7} fill="#B3E5FC" opacity={0.5} />
      {[0, 1, 2].map((tier) => (
        <ellipse
          key={tier}
          cx={320}
          cy={228 - tier * 8}
          rx={14 - tier * 4}
          ry={14 - tier * 4}
          fill={tier === 0 ? '#BDBDBD' : tier === 1 ? '#ECEFF1' : '#F5F5F5'}
          stroke={S}
          strokeWidth={0.9 - tier * 0.2}
        />
      ))}
    </g>
  )
}

function EntranceBuilding() {
  const cx = 320
  const y = 416
  return (
    <g>
      <rect x={20} y={446} width={600} height={12} rx={2} fill={FENCE_DARK} stroke={S} strokeWidth={1} />
      {[44, 84, 124, 164, 204, 244, 284, 324, 364, 404, 444, 484, 524, 564, 604].map((x) => (
        <rect key={x} x={x} y={440} width={5} height={18} rx={1} fill={FENCE} stroke={S} strokeWidth={0.4} />
      ))}
      <rect x={cx - 54} y={y - 4} width={108} height={8} rx={2} fill={FENCE} stroke={S} strokeWidth={1} />
      <rect x={cx - 48} y={y - 26} width={96} height={22} fill="#795548" stroke={S} strokeWidth={1.6} />
      <path d={`M ${cx - 52} ${y - 26} L ${cx} ${y - 40} L ${cx + 52} ${y - 26} Z`} fill="#43A047" stroke={S} strokeWidth={1.6} />
      <rect x={cx - 34} y={y - 16} width={26} height={14} rx={1.5} fill="#5D4037" stroke={S} strokeWidth={1} />
      <rect x={cx + 8} y={y - 16} width={26} height={14} rx={1.5} fill="#5D4037" stroke={S} strokeWidth={1} />
      <rect x={cx - 20} y={y - 38} width={40} height={9} rx={2} fill="#E53935" stroke={S} strokeWidth={1} />
      <text x={cx} y={y - 31} textAnchor="middle" fontSize={6.5} fontWeight="bold" fill="#FFFFFF">
        Petting Zoo
      </text>
    </g>
  )
}

function ServiceBarn({ x, y, icon }: { x: number; y: number; icon: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={10} width={34} height={20} fill="#C4564E" stroke={S} strokeWidth={1.1} />
      <path d="M -2 10 L 17 2 L 36 10 Z" fill="#8D6E63" stroke={S} strokeWidth={1.1} />
      <circle cx={17} cy={-1} r={8} fill="#48CAE4" stroke={S} strokeWidth={0.9} />
      <text x={17} y={2} textAnchor="middle" fontSize={9}>
        {icon}
      </text>
    </g>
  )
}

function SmallShed({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={8} width={22} height={14} fill="#795548" stroke={S} strokeWidth={0.9} />
      <path d="M -1 8 L 11 2 L 23 8 Z" fill="#8D6E63" stroke={S} strokeWidth={0.8} />
    </g>
  )
}

function TicketBooth() {
  return (
    <g transform="translate(248, 358)">
      <rect x={0} y={10} width={26} height={16} fill="#795548" stroke={S} strokeWidth={1} />
      <path d="M -1 10 L 13 3 L 27 10 Z" fill="#8D6E63" stroke={S} strokeWidth={0.9} />
      <circle cx={13} cy={-3} r={7} fill="#48CAE4" stroke={S} strokeWidth={0.8} />
      <text x={13} y={0} textAnchor="middle" fontSize={7}>
        📍
      </text>
    </g>
  )
}

function BirdArea() {
  return (
    <g>
      <WoodenPen cx={592} cy={408} rx={30} ry={22} />
      <rect x={578} y={384} width={28} height={12} fill={FENCE_DARK} stroke={S} strokeWidth={0.8} />
      <line x1={582} y1={384} x2={602} y2={384} stroke={S} strokeWidth={1.2} />
      <MiniAnimals kind="parrot" cx={584} cy={400} />
      <MiniAnimals kind="parrot" cx={600} cy={404} />
      <ellipse cx={598} cy={428} rx={16} ry={10} fill={POND} stroke={POND_DEEP} strokeWidth={1.2} />
      <ellipse cx={592} cy={426} rx={7} ry={4.5} fill="#FFFFFF" opacity={0.45} />
    </g>
  )
}

export function PettingZooMapArt({ mode = 'interior' }: { mode?: PettingZooMapMode }) {
  const decorated = mode === 'overworld'

  return (
    <g>
      {/* Grass base with subtle variation */}
      <rect x={0} y={0} width={PETTING_ZOO_MAP_WIDTH} height={PETTING_ZOO_MAP_HEIGHT} fill={GRASS} />
      <ellipse cx={160} cy={400} rx={120} ry={80} fill={GRASS_LIGHT} opacity={0.25} />
      <ellipse cx={480} cy={120} rx={100} ry={70} fill={GRASS_LIGHT} opacity={0.2} />

      {/* Outer park fence */}
      <rect x={14} y={14} width={612} height={430} fill="none" stroke={FENCE_DARK} strokeWidth={4} rx={12} />

      {/* Tan path ring around the pond */}
      <PathRing />

      {/* Central pond — sits inside the path ring */}
      <PondAndFountain />

      {/* Animal pens around the loop */}
      {PENS.map((pen) => (
        <g key={`${pen.cx}-${pen.cy}`}>
          <WoodenPen cx={pen.cx} cy={pen.cy} rx={pen.rx} ry={pen.ry} dashed={!decorated} />
          {decorated && pen.animal && <MiniAnimals kind={pen.animal} cx={pen.cx} cy={pen.cy} />}
        </g>
      ))}

      {decorated && <BirdArea />}

      {/* Trees & bushes between pens — like the reference */}
      <Tree cx={48} cy={48} />
      <Tree cx={592} cy={48} />
      <Tree cx={48} cy={400} r={14} />
      <Tree cx={175} cy={165} r={12} />
      <Tree cx={465} cy={165} r={12} />
      <BushCluster cx={168} cy={168} />
      <BushCluster cx={472} cy={168} />
      <BushCluster cx={320} cy={148} />
      <BushCluster cx={268} cy={310} n={4} />
      <BushCluster cx={372} cy={310} n={4} />
      <BushCluster cx={148} cy={310} />
      <BushCluster cx={500} cy={430} />
      <BushCluster cx={58} cy={268} />
      <BushCluster cx={610} cy={155} />
      <BushCluster cx={430} cy={52} n={2} scale={0.85} />

      {decorated ? (
        <>
          <ServiceBarn x={48} y={378} icon="🐾" />
          <SmallShed x={92} y={392} />
          <SmallShed x={118} y={388} />
          <TicketBooth />
          <ServiceBarn x={268} y={378} icon="🍴" />
          <ServiceBarn x={312} y={378} icon="🚻" />
        </>
      ) : (
        <>
          <ServiceBarn x={228} y={378} icon="🐾" />
          <ServiceBarn x={368} y={378} icon="🍴" />
          <ServiceBarn x={438} y={378} icon="🚻" />
        </>
      )}

      <EntranceBuilding />

      {!decorated && (
        <text x={320} y={472} textAnchor="middle" fontSize={9} fill={S} opacity={0.45}>
          Tap empty pens to place animals & exhibits
        </text>
      )}
    </g>
  )
}
