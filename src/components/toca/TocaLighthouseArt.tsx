import { TOCA, TocaWrap } from './TocaHouseArt'

const S = TOCA.stroke
const SW = 2.2
const LH = {
  red: '#E53935',
  redShade: '#C62828',
  white: '#FFFFFF',
  whiteShade: '#ECEFF1',
  wood: '#8D6E63',
  woodDark: '#6D4C41',
  glass: '#81D4FA',
  glassLight: '#B3E5FC',
  door: '#78909C',
  windowDark: '#4E342E',
}

const CX = 66
const TOWER_TOP = 18
const TOWER_BASE = 88
const COTTAGE_W = 36
const GROUND_Y = 116
const BASE_BOTTOM = GROUND_Y
const BASE_SPLIT_Y = 98
const COTTAGE_WALL_TOP = 100

function cottageX() {
  return CX - towerHalfWidth(GROUND_Y) - COTTAGE_W
}

function towerHalfWidth(y: number) {
  const t = Math.min(1, Math.max(0, (y - TOWER_TOP) / (TOWER_BASE - TOWER_TOP)))
  const flare = y > TOWER_BASE ? ((y - TOWER_BASE) / (BASE_BOTTOM - TOWER_BASE)) * 4 : 0
  return 9 + t * 7.5 + flare
}

function TowerBand({ topY, bottomY, fill, shade }: { topY: number; bottomY: number; fill: string; shade: string }) {
  const wTop = towerHalfWidth(topY)
  const wBot = towerHalfWidth(bottomY)
  return (
    <g>
      <path
        d={`M ${CX - wTop} ${topY} L ${CX + wTop} ${topY} L ${CX + wBot} ${bottomY} L ${CX - wBot} ${bottomY} Z`}
        fill={fill}
        stroke={S}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path
        d={`M ${CX - wTop} ${topY} L ${CX - wBot} ${bottomY} L ${CX - wBot + 2.5} ${bottomY} L ${CX - wTop + 1.5} ${topY} Z`}
        fill={shade}
        opacity={0.35}
      />
    </g>
  )
}

function towerOpeningScale(centerY: number) {
  return towerHalfWidth(centerY) / towerHalfWidth(GROUND_Y)
}

function ArchedWindow({ cx, centerY }: { cx: number; centerY: number }) {
  const scale = towerOpeningScale(centerY)

  return (
    <g transform={`translate(${cx} ${centerY}) scale(${scale}) translate(${-cx} ${-centerY})`}>
      <path
        d={`M ${cx - 3} ${centerY + 0.5} Q ${cx} ${centerY - 3.5} ${cx + 3} ${centerY + 0.5} L ${cx + 3} ${centerY + 3.5} L ${cx - 3} ${centerY + 3.5} Z`}
        fill={LH.windowDark}
        stroke={S}
        strokeWidth={0.9 / scale}
      />
    </g>
  )
}

function TowerDoor({ cx, bottomY, centerY }: { cx: number; bottomY: number; centerY: number }) {
  const scale = towerOpeningScale(centerY)
  const w = 10 * scale
  const h = 14 * scale
  const x = cx - w / 2
  const y = bottomY - h

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1.2 * scale} fill={LH.door} stroke={S} strokeWidth={1.2 / scale} />
      <circle cx={x + w - 2.2 * scale} cy={y + h / 2 + scale} r={0.7 * scale} fill={S} />
    </g>
  )
}

function TowerTrimLine({ y }: { y: number }) {
  const w = towerHalfWidth(y)
  return (
    <line
      x1={CX - w}
      y1={y}
      x2={CX + w}
      y2={y}
      stroke={S}
      strokeWidth={1.3}
      strokeLinecap="round"
      opacity={0.55}
    />
  )
}

function KeeperCottage() {
  const x = cottageX()
  const wallTop = COTTAGE_WALL_TOP
  const wallBottom = GROUND_Y
  const wallW = COTTAGE_W

  return (
    <g>
      {/* Red gabled roof — sits on the shared white base */}
      <path
        d={`M ${x - 2} ${wallTop} L ${x + wallW / 2} ${wallTop - 14} L ${x + wallW + 2} ${wallTop} Z`}
        fill={LH.red}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={`M ${x - 2} ${wallTop} L ${x + wallW / 2} ${wallTop - 14} L ${x + wallW / 2 - 1} ${wallTop - 13} L ${x} ${wallTop} Z`}
        fill={LH.redShade}
        opacity={0.3}
      />

      {/* White walls — flush with shared white base */}
      <rect x={x} y={wallTop} width={wallW} height={wallBottom - wallTop} fill={LH.white} stroke={S} strokeWidth={SW} />
      <rect x={x + 1} y={wallTop + 1} width={4} height={wallBottom - wallTop - 2} fill={LH.whiteShade} opacity={0.5} />

      {/* Grey door */}
      <rect x={x + wallW / 2 - 4} y={wallBottom - 11} width={8} height={11} rx={1} fill={LH.door} stroke={S} strokeWidth={1.2} />
      <circle cx={x + wallW / 2 + 2} cy={wallBottom - 6} r={0.7} fill={S} />

      {/* Square windows */}
      {[x + 6, x + wallW - 12].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={wallTop + 5} width={8} height={8} fill={LH.white} stroke={S} strokeWidth={1.2} />
          <rect x={wx + 1.5} y={wallTop + 6.5} width={5} height={5} fill={LH.glass} stroke={S} strokeWidth={0.6} />
        </g>
      ))}
    </g>
  )
}

function WoodenGallery() {
  const deckY = 22
  const w = towerHalfWidth(deckY)

  return (
    <g>
      {/* Brown deck */}
      <ellipse cx={CX} cy={deckY + 1} rx={w + 5} ry={3.5} fill={LH.woodDark} stroke={S} strokeWidth={1.3} />
      <ellipse cx={CX} cy={deckY} rx={w + 4} ry={2.8} fill={LH.wood} stroke={S} strokeWidth={1.2} />

      {/* Rail posts & bars */}
      {[-w - 2, -w / 2, 0, w / 2, w + 2].map((dx) => (
        <rect key={dx} x={CX + dx - 1} y={deckY - 7} width={2} height={7} rx={0.8} fill={LH.woodDark} stroke={S} strokeWidth={0.7} />
      ))}
      <line x1={CX - w - 2} y1={deckY - 6} x2={CX + w + 2} y2={deckY - 6} stroke={LH.woodDark} strokeWidth={1.8} strokeLinecap="round" />
      <line x1={CX - w - 2} y1={deckY - 3.5} x2={CX + w + 2} y2={deckY - 3.5} stroke={LH.wood} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  )
}

function LanternRoom() {
  const glassTop = 8
  const glassBottom = 20
  const glassW = 10

  return (
    <g>
      {/* Light blue glass lantern */}
      <rect x={CX - glassW} y={glassTop} width={glassW * 2} height={glassBottom - glassTop} rx={2} fill={LH.glass} stroke={S} strokeWidth={1.5} />
      <rect x={CX - glassW + 2} y={glassTop + 2} width={glassW * 2 - 4} height={glassBottom - glassTop - 4} rx={1} fill={LH.glassLight} opacity={0.85} />
      {[-6, 0, 6].map((dx) => (
        <line key={dx} x1={CX + dx} y1={glassTop + 1} x2={CX + dx} y2={glassBottom - 1} stroke={S} strokeWidth={0.8} opacity={0.5} />
      ))}

      {/* Red conical roof + spire */}
      <path d={`M ${CX - 12} ${glassTop + 1} L ${CX} ${-1} L ${CX + 12} ${glassTop + 1} Z`} fill={LH.red} stroke={S} strokeWidth={SW} strokeLinejoin="round" />
      <path d={`M ${CX - 12} ${glassTop + 1} L ${CX} ${-1} L ${CX - 1} ${glassTop} L ${CX - 11} ${glassTop + 1} Z`} fill={LH.redShade} opacity={0.25} />
      <line x1={CX} y1={-1} x2={CX} y2={-9} stroke={LH.redShade} strokeWidth={2} strokeLinecap="round" />
      <circle cx={CX} cy={-9.5} r={1.5} fill={LH.red} stroke={S} strokeWidth={0.8} />
    </g>
  )
}

function ConnectedTowerBase() {
  const redTopY = 76
  const redBottomY = BASE_SPLIT_Y
  const whiteTopY = BASE_SPLIT_Y
  const whiteBottomY = GROUND_Y
  const wRedTop = towerHalfWidth(redTopY)
  const wRedBot = towerHalfWidth(redBottomY)
  const wWhiteTop = towerHalfWidth(whiteTopY)
  const wWhiteBot = towerHalfWidth(whiteBottomY)
  const cottageLeft = cottageX()
  const cottageRight = cottageLeft + COTTAGE_W

  return (
    <g>
      {/* Red stripe from upper bands down to the first divider line */}
      <path
        d={`M ${CX - wRedTop} ${redTopY}
            L ${CX + wRedTop} ${redTopY}
            L ${CX + wRedBot} ${redBottomY}
            L ${CX - wRedBot} ${redBottomY}
            Z`}
        fill={LH.red}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={`M ${CX - wRedTop} ${redTopY}
            L ${CX - wRedBot} ${redBottomY}
            L ${CX - wRedBot + 2} ${redBottomY}
            L ${CX - wRedTop + 2} ${redTopY}
            Z`}
        fill={LH.redShade}
        opacity={0.4}
      />

      {/* White stripe from first divider line down to the ground + cottage bridge */}
      <path
        d={`M ${cottageLeft} ${whiteBottomY}
            L ${cottageRight} ${whiteBottomY}
            L ${CX - wWhiteBot} ${whiteBottomY}
            L ${CX - wWhiteTop} ${whiteTopY}
            L ${CX + wWhiteTop} ${whiteTopY}
            L ${CX + wWhiteBot} ${whiteBottomY}
            Z`}
        fill={LH.white}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={`M ${cottageLeft} ${whiteBottomY}
            L ${cottageLeft} ${whiteBottomY - 2}
            L ${cottageRight} ${whiteBottomY - 1}
            L ${CX - wWhiteBot} ${whiteBottomY}
            L ${CX - wWhiteTop} ${whiteTopY}
            L ${CX - wWhiteTop + 2} ${whiteTopY}
            L ${CX - wWhiteBot + 2} ${whiteBottomY}
            Z`}
        fill={LH.whiteShade}
        opacity={0.4}
      />
    </g>
  )
}

const STRIPE_LINE_YS = [28, 40, 52, 64, 76, 98]

/** One window centered in each tower stripe (below the gallery). */
const TOWER_WINDOW_STRIPES: { top: number; bottom: number }[] = [
  { top: 28, bottom: 40 },
  { top: 40, bottom: 52 },
  { top: 52, bottom: 64 },
  { top: 64, bottom: 76 },
  { top: 76, bottom: BASE_SPLIT_Y },
  { top: BASE_SPLIT_Y, bottom: GROUND_Y },
]

function stripeCenterY(top: number, bottom: number) {
  return (top + bottom) / 2
}

/** Red & white striped lighthouse with keeper's cottage — stock coastal reference style. */
export function LighthouseToca() {
  const bands: { top: number; bottom: number; fill: string; shade: string }[] = [
    { top: 64, bottom: 76, fill: LH.white, shade: LH.whiteShade },
    { top: 52, bottom: 64, fill: LH.red, shade: LH.redShade },
    { top: 40, bottom: 52, fill: LH.white, shade: LH.whiteShade },
    { top: 28, bottom: 40, fill: LH.red, shade: LH.redShade },
    { top: 18, bottom: 28, fill: LH.white, shade: LH.whiteShade },
  ]

  return (
    <TocaWrap>
      <ConnectedTowerBase />
      <KeeperCottage />
      {bands.map((band) => (
        <TowerBand key={band.top} topY={band.top} bottomY={band.bottom} fill={band.fill} shade={band.shade} />
      ))}

      {/* Stripe divider lines — drawn before windows so windows sit on top */}
      {STRIPE_LINE_YS.map((y) => (
        <TowerTrimLine key={y} y={y} />
      ))}

      {/* Tower windows — scaled to tower width; door on bottom stripe */}
      {TOWER_WINDOW_STRIPES.map(({ top, bottom }, i) => {
        const centerY = stripeCenterY(top, bottom)
        return i === TOWER_WINDOW_STRIPES.length - 1 ? (
          <TowerDoor key={top} cx={CX} bottomY={bottom} centerY={centerY} />
        ) : (
          <ArchedWindow key={top} cx={CX} centerY={centerY} />
        )
      })}

      <WoodenGallery />
      <LanternRoom />
    </TocaWrap>
  )
}

export function getLighthouseArt(id: string) {
  if (id === 'lighthouse') return <LighthouseToca />
  return null
}
