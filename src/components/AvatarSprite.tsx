import { useId } from 'react'
import type { Avatar } from '../types'
import { getBodyMetrics, getHeadLayout } from '../data/avatarBody'
import { TOCA } from './toca/TocaHouseArt'
import { adjustColor } from './toca/tocaShading'

interface AvatarSpriteProps {
  avatar: Avatar
  size?: number
  className?: string
}

function CharacterDefs({
  id,
  skin,
  hair,
  cloth,
  accent,
}: {
  id: string
  skin: string
  hair: string
  cloth: string
  accent: string
}) {
  return (
    <defs>
      <radialGradient id={`${id}-skin`} cx="44%" cy="30%" r="70%">
        <stop offset="0%" stopColor={adjustColor(skin, 12)} />
        <stop offset="60%" stopColor={skin} />
        <stop offset="100%" stopColor={adjustColor(skin, -18)} />
      </radialGradient>
      <linearGradient id={`${id}-hair`} x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor={adjustColor(hair, 22)} />
        <stop offset="35%" stopColor={adjustColor(hair, 8)} />
        <stop offset="70%" stopColor={hair} />
        <stop offset="100%" stopColor={adjustColor(hair, -22)} />
      </linearGradient>
      <linearGradient id={`${id}-cloth`} x1="25%" y1="0%" x2="75%" y2="100%">
        <stop offset="0%" stopColor={adjustColor(cloth, 10)} />
        <stop offset="100%" stopColor={adjustColor(cloth, -12)} />
      </linearGradient>
      <linearGradient id={`${id}-denim`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4E4E4E" />
        <stop offset="100%" stopColor="#353535" />
      </linearGradient>
      <linearGradient id={`${id}-accent`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={adjustColor(accent, 12)} />
        <stop offset="100%" stopColor={adjustColor(accent, -15)} />
      </linearGradient>
      <radialGradient id={`${id}-eye`} cx="42%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#7A5C42" />
        <stop offset="100%" stopColor="#3E2818" />
      </radialGradient>
    </defs>
  )
}

/** Shared hair anchor geometry. */
function hairLayout(cx: number, cy: number, headRx: number, headRy: number) {
  const skullTop = cy - headRy
  const hairline = cy - headRy * 0.48
  const capRx = headRx + 3
  const crownTop = skullTop - 4
  const crownRound = skullTop - 1
  const crownBand = skullTop - 2
  return {
    cx,
    cy,
    skullTop,
    hairline,
    capRx,
    crownTop,
    crownRound,
    crownBand,
    lx: cx - capRx,
    rx: cx + capRx,
    outerL: cx - headRx - 7,
    outerR: cx + headRx + 7,
    jawY: cy + headRy * 0.68,
  }
}

/** Covers the full crown from temple to temple over the head ellipse. */
function scalpCapPath(cx: number, cy: number, headRx: number, headRy: number) {
  const { lx, rx, hairline, capRx, crownTop, crownBand } = hairLayout(cx, cy, headRx, headRy)
  return `M ${lx} ${hairline}
    Q ${lx - 1} ${crownBand} ${cx - capRx * 0.58} ${crownBand}
    Q ${cx} ${crownTop} ${cx + capRx * 0.58} ${crownBand}
    Q ${rx + 1} ${crownBand} ${rx} ${hairline} Z`
}

/** One continuous long straight hair mass — crown flows into both side panels. */
function longHairMassPath(cx: number, cy: number, headRx: number, headRy: number, hairEnd: number) {
  const { lx, rx, hairline, crownTop, crownBand, outerL, outerR } = hairLayout(cx, cy, headRx, headRy)
  const midY = cy + headRy * 0.38
  return `M ${lx} ${hairline}
    Q ${cx - headRx * 0.6} ${crownBand} ${cx} ${crownTop}
    Q ${cx + headRx * 0.6} ${crownBand} ${rx} ${hairline}
    C ${outerR + 2} ${hairline + 12} ${outerR + 3} ${midY} ${outerR + 1} ${hairEnd - 4}
    Q ${cx + 4} ${hairEnd + 2} ${cx} ${hairEnd + 1}
    Q ${cx - 4} ${hairEnd + 2} ${outerL - 1} ${hairEnd - 4}
    C ${outerL - 3} ${midY} ${outerL - 2} ${hairline + 12} ${lx} ${hairline} Z`
}

/** One continuous wavy hair mass with soft S-curve edges. */
function wavyHairMassPath(cx: number, cy: number, headRx: number, headRy: number, hairEnd: number) {
  const { lx, rx, hairline, crownTop, crownBand, outerL, outerR } = hairLayout(cx, cy, headRx, headRy)
  return `M ${lx} ${hairline}
    Q ${cx - headRx * 0.55} ${crownBand} ${cx} ${crownTop}
    Q ${cx + headRx * 0.55} ${crownBand} ${rx} ${hairline}
    C ${outerR + 4} ${hairline + 16} ${outerR + 6} ${cy + 6} ${outerR + 2} ${hairEnd - 18}
    C ${outerR - 1} ${hairEnd - 6} ${outerR + 5} ${hairEnd + 2} ${outerR + 1} ${hairEnd}
    Q ${cx + 3} ${hairEnd + 3} ${cx} ${hairEnd + 2}
    Q ${cx - 3} ${hairEnd + 3} ${outerL - 1} ${hairEnd}
    C ${outerL - 5} ${hairEnd + 2} ${outerL + 1} ${hairEnd - 6} ${outerL - 2} ${hairEnd - 18}
    C ${outerL - 6} ${cy + 6} ${outerL - 4} ${hairline + 16} ${lx} ${hairline} Z`
}

/** Chin-length bob as one rounded shape. */
function bobHairMassPath(cx: number, cy: number, headRx: number, headRy: number) {
  const { lx, rx, hairline, crownTop, crownBand, outerL, outerR, jawY } = hairLayout(cx, cy, headRx, headRy)
  const hem = jawY + 3
  return `M ${lx} ${hairline}
    Q ${cx - headRx * 0.55} ${crownBand} ${cx} ${crownTop}
    Q ${cx + headRx * 0.55} ${crownBand} ${rx} ${hairline}
    C ${outerR + 2} ${hairline + 14} ${outerR + 4} ${hem - 8} ${outerR + 1} ${hem}
    Q ${cx + 3} ${hem + 2} ${cx} ${hem + 1}
    Q ${cx - 3} ${hem + 2} ${outerL - 1} ${hem}
    C ${outerL - 4} ${hem - 8} ${outerL - 2} ${hairline + 14} ${lx} ${hairline} Z`
}

/** Short crop — one rounded cap hugging the skull. */
function shortHairMassPath(cx: number, cy: number, headRx: number, headRy: number) {
  const { lx, rx, hairline, crownRound, crownBand } = hairLayout(cx, cy, headRx, headRy)
  return `M ${lx} ${hairline + 2}
    Q ${cx - headRx * 0.55} ${crownBand} ${cx} ${crownRound}
    Q ${cx + headRx * 0.55} ${crownBand} ${rx} ${hairline + 2}
    Q ${cx + headRx + 1} ${hairline + 9} ${cx} ${hairline + 8}
    Q ${cx - headRx - 1} ${hairline + 9} ${lx} ${hairline + 2} Z`
}

/** Curly volume — one soft cloud shape with rounded edges. */
function curlyHairMassPath(cx: number, cy: number, headRx: number, headRy: number) {
  const { lx, rx, hairline, crownTop, crownBand, outerL, outerR, jawY } = hairLayout(cx, cy, headRx, headRy)
  const hem = jawY - 2
  return `M ${lx - 2} ${hairline + 2}
    Q ${cx - headRx * 0.4} ${crownBand - 2} ${cx} ${crownTop - 1}
    Q ${cx + headRx * 0.4} ${crownBand - 2} ${rx + 2} ${hairline + 2}
    C ${outerR + 4} ${hairline + 12} ${outerR + 5} ${hem - 6} ${outerR + 1} ${hem}
    Q ${cx + 2} ${hem + 3} ${cx} ${hem + 2}
    Q ${cx - 2} ${hem + 3} ${outerL - 1} ${hem}
    C ${outerL - 5} ${hem - 6} ${outerL - 4} ${hairline + 12} ${lx - 2} ${hairline + 2} Z`
}

/** Ponytail crown — rounded dome with gathers on both sides. */
function ponytailTopPath(cx: number, cy: number, headRx: number, headRy: number) {
  const { lx, rx, hairline, crownRound, crownBand } = hairLayout(cx, cy, headRx, headRy)
  const rightGatherX = cx + headRx + 1
  const leftGatherX = cx - headRx - 1
  const gatherY = hairline + 5
  return `M ${lx} ${hairline + 2}
    Q ${cx - headRx * 0.55} ${crownBand} ${cx} ${crownRound}
    Q ${cx + headRx * 0.55} ${crownBand} ${rx} ${hairline + 1}
    Q ${rightGatherX + 2} ${gatherY - 2} ${rightGatherX} ${gatherY + 1}
    Q ${cx + headRx * 0.2} ${hairline + 10} ${cx} ${hairline + 9}
    Q ${cx - headRx * 0.2} ${hairline + 10} ${leftGatherX} ${gatherY + 1}
    Q ${leftGatherX - 2} ${gatherY - 2} ${lx} ${hairline + 2} Z`
}

/** Ponytail tail — smooth tail on left or right side of the head. */
function ponytailTailPath(
  cx: number,
  cy: number,
  headRx: number,
  headRy: number,
  hairEnd: number,
  side: 'left' | 'right',
) {
  const { hairline } = hairLayout(cx, cy, headRx, headRy)
  const sign = side === 'right' ? 1 : -1
  const attachX = cx + sign * (headRx + 1)
  const attachY = hairline + 5
  const tailX = cx + sign * (headRx + 5)
  const tailEnd = Math.min(hairEnd - 10, cy + headRy + 24)
  const innerAttach = attachX - sign * 2
  const outerTail = tailX + sign * 3
  const midTail = tailX - sign * 1.5
  return `M ${innerAttach} ${attachY + 1}
    Q ${attachX + sign} ${attachY - 2} ${tailX} ${attachY + 3}
    C ${outerTail} ${attachY + 16} ${tailX + sign * 2} ${tailEnd - 8} ${tailX} ${tailEnd}
    C ${midTail} ${tailEnd - 1} ${tailX - sign * 3} ${tailEnd - 10} ${midTail} ${attachY + 15}
    Q ${attachX - sign} ${attachY + 9} ${innerAttach} ${attachY + 1} Z`
}

function PonytailTail({
  id,
  metrics,
  hairEnd,
}: {
  id: string
  metrics: ReturnType<typeof getBodyMetrics>
  hairEnd: number
}) {
  const cx = 50
  const cy = 36
  const { hairline } = hairLayout(cx, cy, metrics.headRx, metrics.headRy)
  const tieY = hairline + 6
  const fill = `url(#${id}-hair)`
  const sides: Array<{ side: 'left' | 'right'; tieX: number }> = [
    { side: 'right', tieX: cx + metrics.headRx + 1 },
    { side: 'left', tieX: cx - metrics.headRx - 1 },
  ]
  return (
    <g>
      {sides.map(({ side, tieX }) => (
        <g key={side}>
          <path
            d={ponytailTailPath(cx, cy, metrics.headRx, metrics.headRy, hairEnd, side)}
            fill={fill}
          />
          <ellipse cx={tieX} cy={tieY} rx={2.2} ry={1.4} fill={fill} opacity={0.92} />
        </g>
      ))}
    </g>
  )
}

function ScalpCap({
  cx,
  cy,
  headRx,
  headRy,
  fill,
}: {
  cx: number
  cy: number
  headRx: number
  headRy: number
  fill: string
}) {
  return <path d={scalpCapPath(cx, cy, headRx, headRy)} fill={fill} />
}

function HairBack({
  id,
  style,
  hairEnd,
  headRx,
  headRy,
}: {
  id: string
  style: Avatar['hairStyle']
  hairEnd: number
  headRx: number
  headRy: number
}) {
  const fill = `url(#${id}-hair)`
  const cx = 50
  const cy = 36

  switch (style) {
    case 'long':
      return <path d={longHairMassPath(cx, cy, headRx, headRy, hairEnd)} fill={fill} />
    case 'wavy':
      return <path d={wavyHairMassPath(cx, cy, headRx, headRy, hairEnd)} fill={fill} />
    case 'bob':
      return <path d={bobHairMassPath(cx, cy, headRx, headRy)} fill={fill} />
    case 'curly':
      return <path d={curlyHairMassPath(cx, cy, headRx, headRy)} fill={fill} />
    case 'ponytail':
      return null
    case 'short':
      return <path d={shortHairMassPath(cx, cy, headRx, headRy)} fill={fill} />
    case 'bun':
      return <ScalpCap cx={cx} cy={cy} headRx={headRx} headRy={headRy} fill={fill} />
    default:
      return null
  }
}

function HairFront({
  id,
  style,
  hat,
  skullTop,
  headRx,
  headRy,
}: {
  id: string
  style: Avatar['hairStyle']
  hat: Avatar['hat']
  skullTop: number
  headRx: number
  headRy: number
}) {
  if (hat === 'sunhat') return null
  const fill = `url(#${id}-hair)`
  const cx = 50
  const cy = 36
  const hairline = cy - headRy * 0.48
  const hideCrown = hat === 'bucket'
  const crown = hideCrown ? null : <ScalpCap cx={cx} cy={cy} headRx={headRx} headRy={headRy} fill={fill} />

  switch (style) {
    case 'wavy':
      return (
        <g fill={fill}>
          {crown}
          <path
            d={`M ${cx - 3} ${hairline - 1} L ${cx + 3} ${hairline - 1} L ${cx + 1.5} ${hairline + 3} L ${cx - 1.5} ${hairline + 3} Z`}
            opacity={0.8}
          />
        </g>
      )
    case 'long':
      return (
        <g fill={fill}>
          {crown}
          <path
            d={`M ${cx - 3} ${hairline - 1} L ${cx + 3} ${hairline - 1} L ${cx + 1.5} ${hairline + 3} L ${cx - 1.5} ${hairline + 3} Z`}
            opacity={0.8}
          />
        </g>
      )
    case 'short':
      return (
        <g fill={fill}>
          {crown}
        </g>
      )
    case 'curly':
      return (
        <g fill={fill}>
          {crown}
          {!hideCrown &&
            [
              [cx - 7, skullTop - 1, 4],
              [cx + 7, skullTop - 1, 4],
              [cx, skullTop - 6, 4.5],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={0.85} />
            ))}
        </g>
      )
    case 'bob':
      return (
        <g fill={fill}>
          {crown}
          <path
            d={`M ${cx - 3} ${hairline - 1} L ${cx + 3} ${hairline - 1} L ${cx + 1.5} ${hairline + 3} L ${cx - 1.5} ${hairline + 3} Z`}
            opacity={0.8}
          />
        </g>
      )
    case 'ponytail':
      if (hideCrown) return null
      return (
        <g fill={fill}>
          <path d={ponytailTopPath(cx, cy, headRx, headRy)} />
          <path
            d={`M ${cx - 2} ${hairline - 1} L ${cx + 2} ${hairline - 1} L ${cx + 1} ${hairline + 2} L ${cx - 1} ${hairline + 2} Z`}
            opacity={0.7}
          />
        </g>
      )
    case 'bun':
      return (
        <g fill={fill}>
          {crown}
          {!hideCrown && (
            <>
              <path
                d={`M ${cx - headRx + 2} ${hairline + 4} Q ${cx - headRx - 1} ${skullTop - 1} ${cx} ${skullTop - 3} Q ${cx + headRx + 1} ${skullTop - 1} ${cx + headRx - 2} ${hairline + 4} Q ${cx + headRx - 3} ${hairline + 1} ${cx} ${hairline} Q ${cx - headRx + 3} ${hairline + 1} ${cx - headRx + 2} ${hairline + 4} Z`}
                opacity={0.92}
              />
              <circle cx={cx} cy={skullTop - 6} r={9} />
            </>
          )}
        </g>
      )
    default:
      return null
  }
}

function RealisticFace({
  id,
  hairColor,
  accessory,
  metrics,
}: {
  id: string
  hairColor: string
  accessory: Avatar['accessory']
  metrics: ReturnType<typeof getBodyMetrics>
}) {
  const skin = `url(#${id}-skin)`
  const { headRx, headRy, eyeScale } = metrics
  const cx = 50
  const cy = 36
  const eyeY = 37.5
  const eyeW = 5 * eyeScale
  const eyeH = 6 * eyeScale
  const eyeL = cx - 6
  const eyeR = cx + 6

  if (accessory === 'sunglasses') {
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={headRx} ry={headRy} fill={skin} />
        <rect x={eyeL - 5} y={eyeY - 3} width={11} height={7} rx={2.5} fill="#222" opacity={0.85} />
        <rect x={eyeR - 6} y={eyeY - 3} width={11} height={7} rx={2.5} fill="#222" opacity={0.85} />
        <line x1={eyeL + 6} y1={eyeY} x2={eyeR - 6} y2={eyeY} stroke="#222" strokeWidth={1.2} />
        <path d={`M ${cx - 4} ${cy + 12} Q ${cx} ${cy + 14} ${cx + 4} ${cy + 12}`} fill="none" stroke="#B07060" strokeWidth={1} strokeLinecap="round" opacity={0.7} />
      </g>
    )
  }

  const renderEye = (ex: number) => (
    <g key={ex}>
      <ellipse cx={ex} cy={eyeY} rx={eyeW} ry={eyeH} fill="#FAFAFA" />
      <ellipse cx={ex} cy={eyeY + 0.5} rx={eyeW * 0.7} ry={eyeH * 0.75} fill={`url(#${id}-eye)`} />
      <ellipse cx={ex} cy={eyeY + 1} rx={eyeW * 0.3} ry={eyeH * 0.36} fill="#1A1008" />
      <circle cx={ex - 1.2} cy={eyeY - 1.2} r={1.1} fill="#FFFFFF" opacity={0.92} />
      <path
        d={`M ${ex - eyeW - 0.5} ${eyeY - 2.5} Q ${ex} ${eyeY - 3.5} ${ex + eyeW + 0.5} ${eyeY - 2.5}`}
        fill="none"
        stroke={adjustColor(hairColor, -25)}
        strokeWidth={0.6}
        strokeLinecap="round"
        opacity={0.5}
      />
    </g>
  )

  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={headRx} ry={headRy} fill={skin} />
      <ellipse cx={cx} cy={cy - 3} rx={headRx * 0.5} ry={headRy * 0.32} fill="#FFFFFF" opacity={0.07} />
      {renderEye(eyeL)}
      {renderEye(eyeR)}
      <path d={`M ${cx - 3.5} ${cy + 11} Q ${cx} ${cy + 13} ${cx + 3.5} ${cy + 11}`} fill="none" stroke="#B07060" strokeWidth={0.9} strokeLinecap="round" opacity={0.65} />
      {accessory === 'shell-necklace' && (
        <>
          <path d={`M ${cx - 11} ${cy + 15} Q ${cx} ${cy + 19} ${cx + 11} ${cy + 15}`} fill="none" stroke="#E8D8C0" strokeWidth={0.8} />
          <circle cx={cx - 5} cy={cy + 16} r={1.6} fill="#FFF8DC" />
          <circle cx={cx} cy={cy + 17.5} r={2} fill="#FFEFD5" />
          <circle cx={cx + 5} cy={cy + 16} r={1.6} fill="#FFF8DC" />
        </>
      )}
    </g>
  )
}

function LegsAndShoes({
  gradId,
  metrics,
  onVehicle,
  shoeStyle,
  accentColor,
}: {
  gradId: string
  metrics: ReturnType<typeof getBodyMetrics>
  onVehicle: boolean
  shoeStyle: 'sneakers' | 'sandals' | 'boots'
  accentColor: string
}) {
  if (onVehicle) return null
  const { hip, torsoBottom, legLength } = metrics
  const legTop = torsoBottom - 1
  const ankle = legTop + legLength
  const denim = `url(#${gradId}-denim)`
  const accent = `url(#${gradId}-accent)`

  return (
    <>
      <path d={`M ${50 - hip + 1} ${legTop} L ${50 - 5} ${ankle} L ${50 - 2} ${ankle} L ${50 - 3.5} ${legTop} Z`} fill={denim} />
      <path d={`M ${50 + hip - 1} ${legTop} L ${50 + 5} ${ankle} L ${50 + 2} ${ankle} L ${50 + 3.5} ${legTop} Z`} fill={denim} />
      {shoeStyle === 'sneakers' && (
        <>
          <path d={`M ${50 - 8} ${ankle} L ${50 - 9} ${ankle + 5} L ${50 - 1} ${ankle + 5.5} L ${50 - 1} ${ankle} Z`} fill={accent} />
          <path d={`M ${50 + 8} ${ankle} L ${50 + 9} ${ankle + 5} L ${50 + 1} ${ankle + 5.5} L ${50 + 1} ${ankle} Z`} fill={accent} />
          <rect x={50 - 10} y={ankle + 4.5} width={9} height={2.5} rx={0.8} fill="#F0F0F0" />
          <rect x={50 + 1} y={ankle + 4.5} width={9} height={2.5} rx={0.8} fill="#F0F0F0" />
        </>
      )}
      {shoeStyle === 'sandals' && (
        <>
          <ellipse cx={50 - 5} cy={ankle + 4} rx={5} ry={2} fill={accentColor} opacity={0.85} />
          <ellipse cx={50 + 5} cy={ankle + 4} rx={5} ry={2} fill={accentColor} opacity={0.85} />
          <line x1={50 - 8} y1={ankle + 2} x2={50 - 2} y2={ankle + 2} stroke={adjustColor(accentColor, -30)} strokeWidth={0.8} />
          <line x1={50 + 2} y1={ankle + 2} x2={50 + 8} y2={ankle + 2} stroke={adjustColor(accentColor, -30)} strokeWidth={0.8} />
        </>
      )}
      {shoeStyle === 'boots' && (
        <>
          <rect x={50 - 9} y={ankle - 2} width={7} height={8} rx={1.5} fill={adjustColor(accentColor, -25)} />
          <rect x={50 + 2} y={ankle - 2} width={7} height={8} rx={1.5} fill={adjustColor(accentColor, -25)} />
        </>
      )}
    </>
  )
}

function OutfitLayer({
  avatar,
  gradId,
  metrics,
  onVehicle,
}: {
  avatar: Avatar
  gradId: string
  metrics: ReturnType<typeof getBodyMetrics>
  onVehicle: boolean
}) {
  const { outfitStyle, outfitColor, accentColor, skinTone } = avatar
  const cloth = `url(#${gradId}-cloth)`
  const shade = adjustColor(outfitColor, -14)
  const { shoulder, waist, torsoBottom } = metrics
  const top = 54

  const arms = (
    <>
      <path
        d={`M ${50 - shoulder} ${top + 4} Q ${50 - shoulder - 7} ${top + 14} ${50 - shoulder - 5} ${top + 22} Q ${50 - shoulder - 1} ${top + 18} ${50 - shoulder + 1} ${top + 10} Z`}
        fill={outfitColor}
      />
      <path
        d={`M ${50 + shoulder} ${top + 4} Q ${50 + shoulder + 7} ${top + 14} ${50 + shoulder + 5} ${top + 22} Q ${50 + shoulder + 1} ${top + 18} ${50 + shoulder - 1} ${top + 10} Z`}
        fill={outfitColor}
      />
      <ellipse cx={50 - shoulder - 5} cy={top + 23} rx={2.8} ry={3.2} fill={skinTone} />
      <ellipse cx={50 + shoulder + 5} cy={top + 23} rx={2.8} ry={3.2} fill={skinTone} />
    </>
  )

  if (outfitStyle === 'dress') {
    return (
      <g>
        <path
          d={`M ${50 - shoulder} ${top} L ${50 - waist - 2} ${torsoBottom + 8} Q 50 ${torsoBottom + 12} ${50 + waist + 2} ${torsoBottom + 8} L ${50 + shoulder} ${top} Q 50 ${top - 4} ${50 - shoulder} ${top} Z`}
          fill={cloth}
        />
        <path d={`M ${50 - shoulder + 2} ${top} Q 50 ${top + 2} ${50 + shoulder - 2} ${top}`} fill="#FFFFFF" opacity={0.12} />
        {arms}
        <LegsAndShoes gradId={gradId} metrics={metrics} onVehicle={onVehicle} shoeStyle="sandals" accentColor={accentColor} />
      </g>
    )
  }

  if (outfitStyle === 'overalls') {
    return (
      <g>
        <rect x={50 - waist} y={top + 8} width={waist * 2} height={torsoBottom - top - 6} rx={2} fill={adjustColor('#4A6278', 5)} />
        <path
          d={`M ${50 - shoulder} ${top} L ${50 - waist - 1} ${torsoBottom} L ${50 + waist + 1} ${torsoBottom} L ${50 + shoulder} ${top} Q 50 ${top - 3} ${50 - shoulder} ${top} Z`}
          fill={adjustColor('#4A6278', 10)}
        />
        <rect x={50 - 4} y={top - 2} width={3} height={14} fill={adjustColor('#4A6278', -5)} />
        <rect x={50 + 1} y={top - 2} width={3} height={14} fill={adjustColor('#4A6278', -5)} />
        <path d={`M ${50 - shoulder + 2} ${top + 2} L ${50 - waist} ${top + 10} L ${50 - waist} ${top + 18} L ${50 - shoulder + 2} ${top + 12} Z`} fill={outfitColor} />
        <path d={`M ${50 + shoulder - 2} ${top + 2} L ${50 + waist} ${top + 10} L ${50 + waist} ${top + 18} L ${50 + shoulder - 2} ${top + 12} Z`} fill={outfitColor} />
        {arms}
        <LegsAndShoes gradId={gradId} metrics={metrics} onVehicle={onVehicle} shoeStyle="sneakers" accentColor={accentColor} />
      </g>
    )
  }

  if (outfitStyle === 'coastal') {
    return (
      <g>
        <path
          d={`M ${50 - shoulder} ${top} L ${50 - waist} ${torsoBottom - 4} L ${50 + waist} ${torsoBottom - 4} L ${50 + shoulder} ${top} Q 50 ${top - 3} ${50 - shoulder} ${top} Z`}
          fill={cloth}
        />
        <path d={`M ${50 - 3} ${top + 2} L ${50 + 3} ${top + 2} L ${50 + 2} ${top + 8} L ${50 - 2} ${top + 8} Z`} fill="#FFFFFF" opacity={0.5} />
        {arms}
        <path d={`M ${50 - waist} ${torsoBottom - 4} L ${50 - 6} ${metrics.torsoBottom + metrics.legLength - 4} L ${50 - 3} ${metrics.torsoBottom + metrics.legLength - 4} L ${50 - 4} ${torsoBottom - 4} Z`} fill={adjustColor(outfitColor, -20)} />
        <path d={`M ${50 + waist} ${torsoBottom - 4} L ${50 + 6} ${metrics.torsoBottom + metrics.legLength - 4} L ${50 + 3} ${metrics.torsoBottom + metrics.legLength - 4} L ${50 + 4} ${torsoBottom - 4} Z`} fill={adjustColor(outfitColor, -20)} />
        <LegsAndShoes gradId={gradId} metrics={metrics} onVehicle={onVehicle} shoeStyle="sandals" accentColor={accentColor} />
      </g>
    )
  }

  if (outfitStyle === 'tshirt') {
    return (
      <g>
        <path
          d={`M ${50 - shoulder} ${top} L ${50 - waist} ${torsoBottom} L ${50 + waist} ${torsoBottom} L ${50 + shoulder} ${top} Q 50 ${top - 3} ${50 - shoulder} ${top} Z`}
          fill={cloth}
        />
        <ellipse cx={50} cy={top + 1} rx={5} ry={2} fill={adjustColor(outfitColor, -8)} opacity={0.4} />
        {arms}
        <rect x={50 - waist - 1} y={torsoBottom - 5} width={waist * 2 + 2} height={3} rx={1} fill={accentColor} opacity={0.9} />
        <LegsAndShoes gradId={gradId} metrics={metrics} onVehicle={onVehicle} shoeStyle="sneakers" accentColor={accentColor} />
      </g>
    )
  }

  // hoodie (default)
  return (
    <g>
      <path
        d={`M ${50 - shoulder} ${top} L ${50 - waist} ${torsoBottom} L ${50 + waist} ${torsoBottom} L ${50 + shoulder} ${top} Q 50 ${top - 3} ${50 - shoulder} ${top} Z`}
        fill={cloth}
      />
      <path d={`M ${50 - shoulder + 1} ${top} Q 50 ${top + 4} ${50 + shoulder - 1} ${top}`} fill="#FFFFFF" opacity={0.1} />
      <line x1={50} y1={top + 2} x2={50} y2={torsoBottom - 2} stroke={shade} strokeWidth={0.5} opacity={0.4} />
      <path d={`M ${50 - 7} ${top + 16} Q 50 ${top + 20} ${50 + 7} ${top + 16} L ${50 + 6} ${top + 19} Q 50 ${top + 23} ${50 - 6} ${top + 19} Z`} fill={shade} opacity={0.25} />
      <path
        d={`M ${50 - shoulder} ${top + 6} Q ${50 - shoulder - 6} ${top + 12} ${50 - shoulder - 4} ${top + 20} L ${50 - shoulder + 1} ${top + 14} Z`}
        fill={outfitColor}
      />
      <path
        d={`M ${50 + shoulder} ${top + 6} Q ${50 + shoulder + 6} ${top + 12} ${50 + shoulder + 4} ${top + 20} L ${50 + shoulder - 1} ${top + 14} Z`}
        fill={outfitColor}
      />
      <ellipse cx={50 - shoulder - 4} cy={top + 21} rx={2.5} ry={2} fill={skinTone} />
      <ellipse cx={50 + shoulder + 4} cy={top + 21} rx={2.5} ry={2} fill={skinTone} />
      <rect x={50 - waist - 1} y={torsoBottom - 5} width={waist * 2 + 2} height={3} rx={1} fill={accentColor} />
      <circle cx={50} cy={torsoBottom - 3.5} r={2} fill="#D0D0D0" stroke="#AAA" strokeWidth={0.3} />
      <LegsAndShoes gradId={gradId} metrics={metrics} onVehicle={onVehicle} shoeStyle="sneakers" accentColor={accentColor} />
    </g>
  )
}

function HatLayer({ hat, metrics }: { hat: Avatar['hat']; metrics: ReturnType<typeof getBodyMetrics> }) {
  const { headRx, headRy } = metrics
  const { cx, cy, skullTop, hairLine, brimY } = getHeadLayout(metrics)

  if (hat === 'sunhat') {
    const capRx = headRx + 4
    const crownPeak = skullTop - 11
    const seatY = hairLine + 2

    return (
      <g>
        <ellipse cx={cx} cy={seatY + 1} rx={headRx + 11} ry={4.2} fill="#E8C888" />
        <path
          d={`M ${cx - capRx - 3} ${seatY}
            Q ${cx - capRx - 4} ${skullTop + 6} ${cx - capRx * 0.65} ${crownPeak + 8}
            Q ${cx} ${crownPeak} ${cx + capRx * 0.65} ${crownPeak + 8}
            Q ${cx + capRx + 4} ${skullTop + 6} ${cx + capRx + 3} ${seatY}
            Q ${cx} ${seatY - 5} ${cx - capRx - 3} ${seatY} Z`}
          fill="#F0D8A8"
        />
        <ellipse cx={cx} cy={seatY - 2} rx={capRx + 1} ry={headRy * 0.5} fill="#F0D8A8" />
        <ellipse cx={cx} cy={seatY + 2} rx={headRx + 10} ry={2.5} fill="#D4B878" opacity={0.35} />
      </g>
    )
  }
  if (hat === 'cap') {
    return (
      <g>
        <ellipse cx={cx} cy={cy - headRy * 0.42} rx={headRx + 1.5} ry={headRy * 0.52} fill="#3A7CA5" />
        <path
          d={`M ${cx - headRx - 1} ${brimY} Q ${cx - headRx - 1} ${hairLine} ${cx} ${hairLine - 1} Q ${cx + headRx + 1} ${hairLine} ${cx + headRx + 1} ${brimY} L ${cx + headRx + 1} ${brimY + 3.5} Q ${cx} ${brimY + 5.5} ${cx - headRx - 1} ${brimY + 3.5} Z`}
          fill="#3A7CA5"
        />
        <path d={`M ${cx + headRx} ${brimY + 2.5} L ${cx + headRx + 8} ${brimY + 3.5} L ${cx + headRx} ${brimY + 4.5} Z`} fill="#2E6688" />
      </g>
    )
  }
  if (hat === 'bucket') {
    const capRx = headRx + 3
    const crownTop = skullTop - 8
    const seatY = hairLine - 1

    return (
      <g>
        <path
          d={`M ${cx - capRx + 1} ${seatY}
            Q ${cx - capRx - 2} ${skullTop + 4} ${cx - capRx * 0.62} ${crownTop + 6}
            Q ${cx} ${crownTop} ${cx + capRx * 0.62} ${crownTop + 6}
            Q ${cx + capRx + 2} ${skullTop + 4} ${cx + capRx - 1} ${seatY}
            Q ${cx} ${seatY - 3} ${cx - capRx + 1} ${seatY} Z`}
          fill="#D4883A"
        />
        <ellipse cx={cx} cy={seatY + 2.5} rx={headRx + 8} ry={2.8} fill="#D4883A" />
        <ellipse cx={cx} cy={seatY + 4} rx={headRx + 7} ry={1.4} fill="#C47830" opacity={0.45} />
      </g>
    )
  }
  return null
}

function PetSprite({ pet }: { pet: Avatar['pet'] }) {
  if (pet === 'none') return null
  const x = 76
  const y = 78
  if (pet === 'dog') {
    return (
      <g transform={`translate(${x}, ${y})`} opacity={0.9}>
        <ellipse cx={0} cy={8} rx={8} ry={6} fill="#B8956A" />
        <ellipse cx={7} cy={1} rx={5.5} ry={5.5} fill="#C9A67A" />
        <circle cx={9} cy={0} r={1.1} fill="#333" />
      </g>
    )
  }
  if (pet === 'cat') {
    return (
      <g transform={`translate(${x}, ${y})`} opacity={0.9}>
        <ellipse cx={0} cy={8} rx={7} ry={5.5} fill="#E09030" />
        <ellipse cx={6} cy={1} rx={4.5} ry={4.5} fill="#F0A848" />
      </g>
    )
  }
  if (pet === 'kangaroo') {
    return (
      <g transform={`translate(${x}, ${y})`} opacity={0.9}>
        <ellipse cx={0} cy={7} rx={5.5} ry={7} fill={TOCA.ochre} />
      </g>
    )
  }
  return (
    <g transform={`translate(${x - 3}, ${y - 6})`} opacity={0.9}>
      <ellipse cx={0} cy={0} rx={4.5} ry={3.5} fill="#D04040" />
    </g>
  )
}

function VehicleSprite({ vehicle, accentColor }: { vehicle: Avatar['vehicle']; accentColor: string }) {
  if (vehicle === 'none') return null
  if (vehicle === 'bike') {
    return (
      <g transform="translate(12, 98)" opacity={0.88}>
        <circle cx={10} cy={10} r={6.5} fill="none" stroke="#333" strokeWidth={1.6} />
        <circle cx={46} cy={10} r={6.5} fill="none" stroke="#333" strokeWidth={1.6} />
        <line x1={10} y1={10} x2={28} y2={0} stroke="#333" strokeWidth={1.6} />
        <line x1={28} y1={0} x2={46} y2={10} stroke="#333" strokeWidth={1.6} />
        <rect x={24} y={-10} width={7} height={3} fill={accentColor} rx={1} />
      </g>
    )
  }
  return (
    <g transform="translate(6, 92)" opacity={0.88}>
      <ellipse cx={7} cy={12} rx={5} ry={16} fill="#D04040" />
    </g>
  )
}

export function AvatarSprite({ avatar, size = 80, className }: AvatarSpriteProps) {
  const gradId = useId().replace(/:/g, '')
  const onVehicle = avatar.vehicle !== 'none'
  const metrics = getBodyMetrics(avatar.bodyShape)
  const { skullTop } = getHeadLayout(metrics)
  const hairEnd = metrics.torsoBottom + 10
  const footY = onVehicle ? 100 : metrics.torsoBottom + metrics.legLength + 6

  return (
    <svg
      viewBox="-2 0 104 128"
      width={size}
      height={size * 1.28}
      className={`avatar-sprite${className ? ` ${className}` : ''}`}
      aria-label={`Avatar ${avatar.name}`}
      overflow="visible"
      shapeRendering="geometricPrecision"
    >
      <CharacterDefs
        id={gradId}
        skin={avatar.skinTone}
        hair={avatar.hairColor}
        cloth={avatar.outfitColor}
        accent={avatar.accentColor}
      />

      <VehicleSprite vehicle={avatar.vehicle} accentColor={avatar.accentColor} />
      {!onVehicle && <ellipse cx={50} cy={footY + 4} rx={13} ry={3} fill="#1A1612" opacity={0.14} />}

      <HairBack
        id={gradId}
        style={avatar.hairStyle}
        hairEnd={hairEnd}
        headRx={metrics.headRx}
        headRy={metrics.headRy}
      />
      <OutfitLayer avatar={avatar} gradId={gradId} metrics={metrics} onVehicle={onVehicle} />
      <RealisticFace
        id={gradId}
        hairColor={avatar.hairColor}
        accessory={avatar.accessory}
        metrics={metrics}
      />
      <HairFront
        id={gradId}
        style={avatar.hairStyle}
        hat={avatar.hat}
        skullTop={skullTop}
        headRx={metrics.headRx}
        headRy={metrics.headRy}
      />
      {avatar.hairStyle === 'ponytail' && (
        <PonytailTail id={gradId} metrics={metrics} hairEnd={hairEnd} />
      )}
      <HatLayer hat={avatar.hat} metrics={metrics} />
      <PetSprite pet={avatar.pet} />
    </svg>
  )
}
