import type { ReactNode } from 'react'
import { getBuilding } from '../data/buildings'
import { getPlacedGroundY } from '../data/buildingDisplay'
import { SailboatPaths } from './SailboatArt'
import { YachtPaths } from './YachtArt'
import { getTocaArt, getTocaViewBox } from './toca/getTocaArt'
import { TocaPlacedDetail } from './toca/TocaPlacedDetail'
import { TocaShadeDefs } from './toca/tocaShading'

export type BuildingArtVariant = 'preview' | 'placed'

function parseViewBox(viewBox: string) {
  const parts = viewBox.split(/\s+/).map(Number)
  return { w: parts[2] ?? 100, h: parts[3] ?? 100 }
}

function PlacedGroundWrap({
  id,
  viewBox,
  rotation = 0,
  children,
  detail,
}: {
  id: string
  viewBox: string
  rotation?: number
  children: ReactNode
  detail?: ReactNode
}) {
  const building = getBuilding(id)
  const { h } = parseViewBox(viewBox)
  if (!building || building.category === 'roads' || building.category === 'decor') {
    return (
      <>
        {children}
        {detail}
      </>
    )
  }

  const groundY = getPlacedGroundY(id, building.category, h, rotation)
  const shift = Math.max(0, h - groundY)
  if (shift <= 0) {
    return (
      <>
        {children}
        {detail}
      </>
    )
  }

  return (
    <g className="placed-ground-wrap" transform={`translate(0, ${shift})`}>
      {children}
      {detail}
    </g>
  )
}

interface BuildingArtProps {
  id: string
  rotation?: number
  width?: number
  height?: number
  className?: string
  variant?: BuildingArtVariant
}

function SvgWrap({
  children,
  width = 80,
  height = 80,
  className,
  viewBox = '0 0 100 100',
  fillContainer = false,
}: {
  children: ReactNode
  width?: number
  height?: number
  className?: string
  viewBox?: string
  fillContainer?: boolean
}) {
  return (
    <svg
      viewBox={viewBox}
      width={fillContainer ? '100%' : width}
      height={fillContainer ? '100%' : height}
      preserveAspectRatio={fillContainer ? 'xMidYMax meet' : undefined}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      {children}
    </svg>
  )
}

function TocaWrap({
  id,
  children,
  viewBox = '0 0 100 100',
  variant = 'preview',
  rotation = 0,
}: {
  id: string
  children: ReactNode
  viewBox?: string
  variant?: BuildingArtVariant
  rotation?: number
}) {
  const isPlaced = variant === 'placed'
  const detail = isPlaced ? <TocaPlacedDetail id={id} viewBox={viewBox} rotation={rotation} /> : null

  return (
    <SvgWrap viewBox={viewBox} fillContainer={isPlaced}>
      <TocaShadeDefs />
      {isPlaced ? (
        <PlacedGroundWrap id={id} viewBox={viewBox} rotation={rotation} detail={detail}>
          {children}
        </PlacedGroundWrap>
      ) : (
        children
      )}
    </SvgWrap>
  )
}

function renderArt(id: string, rotation = 0, variant: BuildingArtVariant = 'preview'): React.ReactNode {
  const tocaArt = getTocaArt(id, rotation)
  if (tocaArt) {
    return (
      <TocaWrap id={id} viewBox={getTocaViewBox(id)} variant={variant} rotation={rotation}>
        {tocaArt}
      </TocaWrap>
    )
  }

  const isPlaced = variant === 'placed'

  switch (id) {
    case 'sailboat': {
      const viewBox = '0 0 100 90'
      const detail = isPlaced ? <TocaPlacedDetail id={id} viewBox={viewBox} rotation={rotation} /> : null
      return (
        <SvgWrap viewBox={viewBox} fillContainer={isPlaced}>
          {isPlaced ? (
            <PlacedGroundWrap id={id} viewBox={viewBox} rotation={rotation} detail={detail}>
              <SailboatPaths showWake={isPlaced} />
            </PlacedGroundWrap>
          ) : (
            <SailboatPaths showWake={false} />
          )}
        </SvgWrap>
      )
    }
    case 'fishing-boat': {
      const viewBox = '0 0 75 55'
      const detail = isPlaced ? <TocaPlacedDetail id={id} viewBox={viewBox} rotation={rotation} /> : null
      return (
        <SvgWrap viewBox={viewBox} fillContainer={isPlaced}>
          {isPlaced ? (
            <PlacedGroundWrap id={id} viewBox={viewBox} rotation={rotation} detail={detail}>
              <path d="M 10 40 Q 37 50 65 40 L 60 35 L 15 35 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="1" />
              <rect x="30" y="20" width="15" height="15" fill="#E67E22" />
              <line x1="37" y1="20" x2="37" y2="8" stroke="#5D4037" strokeWidth="2" />
            </PlacedGroundWrap>
          ) : (
            <>
              <path d="M 10 40 Q 37 50 65 40 L 60 35 L 15 35 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="1" />
              <rect x="30" y="20" width="15" height="15" fill="#E67E22" />
              <line x1="37" y1="20" x2="37" y2="8" stroke="#5D4037" strokeWidth="2" />
            </>
          )}
        </SvgWrap>
      )
    }
    case 'kayak': {
      const viewBox = '0 0 55 30'
      const detail = isPlaced ? <TocaPlacedDetail id={id} viewBox={viewBox} rotation={rotation} /> : null
      return (
        <SvgWrap viewBox={viewBox} fillContainer={isPlaced}>
          {isPlaced ? (
            <PlacedGroundWrap id={id} viewBox={viewBox} rotation={rotation} detail={detail}>
              <ellipse cx="27" cy="15" rx="24" ry="8" fill="#1ABC9C" stroke="#16A085" strokeWidth="1.5" />
              <ellipse cx="27" cy="15" rx="18" ry="5" fill="#48C9B0" opacity="0.5" />
            </PlacedGroundWrap>
          ) : (
            <>
              <ellipse cx="27" cy="15" rx="24" ry="8" fill="#1ABC9C" stroke="#16A085" strokeWidth="1.5" />
              <ellipse cx="27" cy="15" rx="18" ry="5" fill="#48C9B0" opacity="0.5" />
            </>
          )}
        </SvgWrap>
      )
    }
    case 'yacht': {
      const viewBox = '0 0 120 70'
      const detail = isPlaced ? <TocaPlacedDetail id={id} viewBox={viewBox} rotation={rotation} /> : null
      return (
        <SvgWrap viewBox={viewBox} fillContainer={isPlaced}>
          {isPlaced ? (
            <PlacedGroundWrap id={id} viewBox={viewBox} rotation={rotation} detail={detail}>
              <YachtPaths showWake={isPlaced} />
            </PlacedGroundWrap>
          ) : (
            <YachtPaths showWake={false} />
          )}
        </SvgWrap>
      )
    }
    default:
      return (
        <SvgWrap fillContainer={isPlaced}>
          <rect x="20" y="30" width="60" height="50" fill="#BDC3C7" rx="4" />
          <text x="50" y="60" textAnchor="middle" fontSize="10" fill="#7F8C8D">
            ?
          </text>
        </SvgWrap>
      )
  }
}

export function BuildingArt({
  id,
  rotation = 0,
  width,
  height,
  className,
  variant = 'preview',
}: BuildingArtProps) {
  const art = renderArt(id, rotation, variant)
  if (!art) return null

  const placedClass = variant === 'placed' ? ' building-art--placed' : ''
  const combinedClass = `${className ?? ''}${placedClass}`.trim() || undefined

  if (variant === 'placed') {
    return (
      <div
        className={combinedClass}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'visible',
        }}
      >
        {art}
      </div>
    )
  }

  if (width !== undefined || height !== undefined) {
    return (
      <div
        className={combinedClass}
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'visible',
        }}
      >
        {art}
      </div>
    )
  }

  return <div className={combinedClass}>{art}</div>
}
