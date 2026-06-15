import type { ReactNode } from 'react'
import { SailboatArt } from './SailboatArt'
import { YachtArt } from './YachtArt'
import { getTocaArt, getTocaViewBox } from './toca/getTocaArt'
import { TocaShadeDefs } from './toca/tocaShading'

interface BuildingArtProps {
  id: string
  rotation?: number
  width?: number
  height?: number
  className?: string
}

function SvgWrap({
  children,
  width = 80,
  height = 80,
  className,
  viewBox = '0 0 100 100',
}: {
  children: ReactNode
  width?: number
  height?: number
  className?: string
  viewBox?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function TocaWrap({ children, viewBox = '0 0 100 100' }: { children: ReactNode; viewBox?: string }) {
  return (
    <SvgWrap viewBox={viewBox}>
      <TocaShadeDefs />
      {children}
    </SvgWrap>
  )
}

function renderArt(id: string, rotation = 0): React.ReactNode {
  const tocaArt = getTocaArt(id, rotation)
  if (tocaArt) {
    return <TocaWrap viewBox={getTocaViewBox(id)}>{tocaArt}</TocaWrap>
  }

  switch (id) {
    case 'sailboat':
      return <SailboatArt width={70} height={63} />
    case 'fishing-boat':
      return (
        <SvgWrap viewBox="0 0 75 55">
          <path d="M 10 40 Q 37 50 65 40 L 60 35 L 15 35 Z" fill="#3498DB" stroke="#2980B9" strokeWidth="1" />
          <rect x="30" y="20" width="15" height="15" fill="#E67E22" />
          <line x1="37" y1="20" x2="37" y2="8" stroke="#5D4037" strokeWidth="2" />
        </SvgWrap>
      )
    case 'kayak':
      return (
        <SvgWrap viewBox="0 0 55 30">
          <ellipse cx="27" cy="15" rx="24" ry="8" fill="#1ABC9C" stroke="#16A085" strokeWidth="1.5" />
          <ellipse cx="27" cy="15" rx="18" ry="5" fill="#48C9B0" opacity="0.5" />
        </SvgWrap>
      )
    case 'yacht':
      return <YachtArt width={90} height={52} />
    default:
      return (
        <SvgWrap>
          <rect x="20" y="30" width="60" height="50" fill="#BDC3C7" rx="4" />
          <text x="50" y="60" textAnchor="middle" fontSize="10" fill="#7F8C8D">?</text>
        </SvgWrap>
      )
  }
}

export function BuildingArt({ id, rotation = 0, width, height, className }: BuildingArtProps) {
  const art = renderArt(id, rotation)
  if (!art) return null

  if (width !== undefined || height !== undefined) {
    return (
      <div className={className} style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {art}
      </div>
    )
  }

  return <div className={className}>{art}</div>
}
