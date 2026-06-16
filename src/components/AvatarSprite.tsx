import type { Avatar } from '../types'
import { TOCA } from './toca/TocaHouseArt'
import {
  GroundShadow,
  SHADE,
  ShadedEllipse,
  ShadedRect,
  TocaShadeDefs,
  adjustColor,
} from './toca/tocaShading'

const S = SHADE.stroke

interface AvatarSpriteProps {
  avatar: Avatar
  size?: number
  className?: string
}

function PetSprite({ pet }: { pet: Avatar['pet'] }) {
  if (pet === 'none') return null

  const x = 68
  const y = 55

  if (pet === 'dog') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <GroundShadow cx={2} cy={18} rx={12} ry={3} />
        <ShadedEllipse cx={0} cy={8} rx={10} ry={8} fill="#C4956A" strokeWidth={1.6} />
        <ShadedEllipse cx={8} cy={0} rx={7} ry={7} fill={adjustColor('#C4956A', 8)} strokeWidth={1.5} />
        <ellipse cx={12} cy={2} rx={4} ry={3} fill={adjustColor('#C4956A', -10)} stroke={S} strokeWidth={1} />
        <circle cx={10} cy={-1} r={1.5} fill={S} />
        <path d="M -8 4 Q -12 0 -10 -4" fill={adjustColor('#C4956A', -6)} stroke={S} strokeWidth={1.1} />
      </g>
    )
  }
  if (pet === 'cat') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <GroundShadow cx={2} cy={16} rx={11} ry={3} />
        <ShadedEllipse cx={0} cy={8} rx={9} ry={7} fill="#F39C12" strokeWidth={1.6} />
        <ShadedEllipse cx={7} cy={0} rx={6} ry={6} fill={adjustColor('#F39C12', 10)} strokeWidth={1.5} />
        <polygon points="2,-6 4,-12 6,-6" fill="#F39C12" stroke={S} strokeWidth={1} />
        <polygon points="8,-6 10,-12 12,-6" fill="#F39C12" stroke={S} strokeWidth={1} />
        <circle cx={9} cy={-1} r={1.5} fill={S} />
      </g>
    )
  }
  if (pet === 'kangaroo') {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <GroundShadow cx={0} cy={18} rx={9} ry={3} />
        <ShadedEllipse cx={0} cy={6} rx={7} ry={9} fill={TOCA.ochre} strokeWidth={1.6} />
        <ShadedEllipse cx={0} cy={-4} rx={5} ry={5} fill={adjustColor(TOCA.ochre, 12)} strokeWidth={1.4} />
        <ellipse cx={-6} cy={4} rx={3} ry={5} fill={adjustColor(TOCA.ochre, -8)} stroke={S} strokeWidth={1.2} />
        <circle cx={-1} cy={-5} r={1.2} fill={S} />
      </g>
    )
  }
  if (pet === 'parrot') {
    return (
      <g transform={`translate(${x - 5}, ${y - 15})`}>
        <GroundShadow cx={2} cy={8} rx={8} ry={2.5} />
        <ShadedEllipse cx={0} cy={0} rx={6} ry={5} fill="#E74C3C" strokeWidth={1.4} />
        <ShadedEllipse cx={4} cy={-2} rx={4} ry={4} fill={adjustColor('#E74C3C', 8)} strokeWidth={1.3} />
        <polygon points="8,-2 14,0 8,2" fill="#F39C12" stroke={S} strokeWidth={0.9} />
        <circle cx={6} cy={-3} r={1} fill={S} />
        <path d="M -2 4 L -6 10" stroke="#27AE60" strokeWidth={2.2} strokeLinecap="round" />
      </g>
    )
  }
  return null
}

function VehicleSprite({ vehicle, outfitColor }: { vehicle: Avatar['vehicle']; outfitColor: string }) {
  if (vehicle === 'none') return null

  if (vehicle === 'bike') {
    return (
      <g transform="translate(20, 82)">
        <GroundShadow cx={30} cy={22} rx={28} ry={4} />
        <ellipse cx={10} cy={14} rx={9} ry={3} fill={SHADE.groundShadowSoft} />
        <ellipse cx={50} cy={14} rx={9} ry={3} fill={SHADE.groundShadowSoft} />
        <circle cx="10" cy="12" r="8" fill="none" stroke="#2C3E50" strokeWidth="2.2" />
        <circle cx="50" cy="12" r="8" fill="none" stroke="#2C3E50" strokeWidth="2.2" />
        <circle cx="10" cy="12" r="3" fill="#ECF0F1" stroke={S} strokeWidth="0.8" />
        <circle cx="50" cy="12" r="3" fill="#ECF0F1" stroke={S} strokeWidth="0.8" />
        <line x1="10" y1="12" x2="30" y2="0" stroke="#2C3E50" strokeWidth="2.2" />
        <line x1="30" y1="0" x2="50" y2="12" stroke="#2C3E50" strokeWidth="2.2" />
        <line x1="30" y1="0" x2="30" y2="-8" stroke="#2C3E50" strokeWidth="2.2" />
        <ShadedRect x={26} y={-12} width={8} height={4} fill={outfitColor} rx={1} depth={2} strokeWidth={1.2} />
      </g>
    )
  }
  if (vehicle === 'surfboard') {
    return (
      <g transform="translate(5, 75)">
        <GroundShadow cx={8} cy={38} rx={8} ry={3} />
        <ShadedEllipse cx={8} cy={15} rx={6} ry={22} fill="#E74C3C" strokeWidth={1.4} />
        <ellipse cx={8} cy={15} rx={3} ry={18} fill="#FF6B6B" opacity={0.45} />
        <ellipse cx={6} cy={8} rx={1.5} ry={10} fill="#FFFFFF" opacity={0.22} />
      </g>
    )
  }
  return null
}

function Sunhat3D() {
  return (
    <g>
      <ShadedEllipse cx={40} cy={22} rx={26} ry={6} fill="#F5DEB3" strokeWidth={1.4} />
      <path d="M 30 22 Q 32 8 40 6 Q 48 8 50 22" fill="#F5DEB3" stroke={S} strokeWidth={1.4} />
      <ellipse cx={40} cy={10} rx={10} ry={8} fill={adjustColor('#F5DEB3', -12)} stroke={S} strokeWidth={1.2} />
      <ellipse cx={40} cy={22} rx={14} ry={3} fill="#E8C88A" opacity={0.85} />
    </g>
  )
}

function Cap3D() {
  return (
    <g>
      <ShadedRect x={24} y={14} width={32} height={18} fill="#3498DB" rx={8} depth={4} strokeWidth={1.6} />
      <ShadedEllipse cx={40} cy={32} rx={20} ry={4} fill="#2980B9" strokeWidth={1.2} />
      <path d="M 56 30 L 68 34 L 56 36 Z" fill={adjustColor('#2980B9', -15)} stroke={S} strokeWidth={1.2} />
    </g>
  )
}

function BucketHat3D() {
  return (
    <g>
      <ShadedRect x={26} y={10} width={28} height={26} fill="#F39C12" rx={6} depth={4} strokeWidth={1.6} />
      <ShadedEllipse cx={40} cy={26} rx={14} ry={3} fill="#E67E22" strokeWidth={1.2} />
    </g>
  )
}

function HairLayer({ avatar }: { avatar: Avatar }) {
  const { hairStyle, hairColor } = avatar
  const stroke = { stroke: S, strokeWidth: 1.4, strokeLinejoin: 'round' as const }

  if (hairStyle === 'short') {
    return (
      <path
        d="M 22 38 Q 22 18 40 16 Q 58 18 58 38 Q 55 28 40 26 Q 25 28 22 38"
        fill={hairColor}
        {...stroke}
      />
    )
  }
  if (hairStyle === 'long') {
    return (
      <>
        <path d="M 22 38 Q 22 16 40 14 Q 58 16 58 38" fill={hairColor} {...stroke} />
        <path d="M 24 36 Q 20 60 22 78 L 28 76 Q 26 58 28 38" fill={adjustColor(hairColor, -12)} {...stroke} />
        <path d="M 56 36 Q 60 60 58 78 L 52 76 Q 54 58 52 38" fill={adjustColor(hairColor, -12)} {...stroke} />
      </>
    )
  }
  if (hairStyle === 'curly') {
    return (
      <>
        {[
          [28, 24, 8],
          [40, 18, 9],
          [52, 24, 8],
          [24, 34, 7],
          [56, 34, 7],
        ].map(([cx, cy, r]) => (
          <ShadedEllipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={r} ry={r} fill={hairColor} strokeWidth={1.3} />
        ))}
      </>
    )
  }
  if (hairStyle === 'pigtails') {
    return (
      <>
        <path d="M 24 36 Q 22 16 40 16 Q 58 16 56 36" fill={hairColor} {...stroke} />
        <ShadedEllipse cx={18} cy={42} rx={8} ry={8} fill={hairColor} strokeWidth={1.3} />
        <ShadedEllipse cx={62} cy={42} rx={8} ry={8} fill={hairColor} strokeWidth={1.3} />
        <ShadedRect x={14} y={48} width={8} height={20} fill={adjustColor(hairColor, -10)} rx={4} depth={3} strokeWidth={1.3} />
        <ShadedRect x={58} y={48} width={8} height={20} fill={adjustColor(hairColor, -10)} rx={4} depth={3} strokeWidth={1.3} />
      </>
    )
  }
  if (hairStyle === 'bun') {
    return (
      <>
        <path d="M 24 36 Q 24 18 40 16 Q 56 18 56 36" fill={hairColor} {...stroke} />
        <ShadedEllipse cx={40} cy={12} rx={10} ry={10} fill={hairColor} strokeWidth={1.4} />
      </>
    )
  }
  return null
}

export function AvatarSprite({ avatar, size = 80, className }: AvatarSpriteProps) {
  const onVehicle = avatar.vehicle !== 'none'
  const legY = onVehicle ? 82 : 88

  return (
    <svg
      viewBox="0 0 100 110"
      width={size}
      height={size * 1.375}
      className={className}
      aria-label={`Avatar ${avatar.name}`}
      overflow="visible"
    >
      <TocaShadeDefs />

      <VehicleSprite vehicle={avatar.vehicle} outfitColor={avatar.outfitColor} />

      {!onVehicle && <GroundShadow cx={40} cy={102} rx={16} ry={4} />}

      {/* Torso */}
      <ShadedEllipse cx={40} cy={72} rx={18} ry={22} fill={avatar.outfitColor} strokeWidth={2} />
      <ShadedRect x={28} y={58} width={24} height={28} fill={avatar.outfitColor} rx={4} depth={5} strokeWidth={2} />

      {/* Arms */}
      <ShadedEllipse cx={22} cy={68} rx={6} ry={12} fill={avatar.skinTone} strokeWidth={1.8} />
      <ShadedEllipse cx={58} cy={68} rx={6} ry={12} fill={avatar.skinTone} strokeWidth={1.8} />

      {/* Neck */}
      <ShadedRect x={36} y={48} width={8} height={12} fill={avatar.skinTone} rx={2} depth={2} strokeWidth={1.4} />

      {/* Head */}
      <ShadedEllipse cx={40} cy={38} rx={18} ry={18} fill={avatar.skinTone} strokeWidth={2.2} />

      <HairLayer avatar={avatar} />

      {avatar.hat === 'sunhat' && <Sunhat3D />}
      {avatar.hat === 'cap' && <Cap3D />}
      {avatar.hat === 'bucket' && <BucketHat3D />}

      {/* Face */}
      {avatar.accessory !== 'sunglasses' && avatar.accessory !== 'shell-necklace' && (
        <>
          <circle cx={33} cy={36} r={2.5} fill={S} />
          <circle cx={47} cy={36} r={2.5} fill={S} />
          <path d="M 34 44 Q 40 48 46 44" fill="none" stroke="#C68642" strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
      {avatar.accessory === 'sunglasses' && (
        <>
          <ShadedRect x={26} y={32} width={12} height={8} fill="#1a1a2e" rx={2} depth={2} strokeWidth={1.2} />
          <ShadedRect x={42} y={32} width={12} height={8} fill="#1a1a2e" rx={2} depth={2} strokeWidth={1.2} />
          <line x1={38} y1={36} x2={42} y2={36} stroke="#1a1a2e" strokeWidth={2} />
          <path d="M 34 44 Q 40 48 46 44" fill="none" stroke="#C68642" strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
      {avatar.accessory === 'shell-necklace' && (
        <>
          <circle cx={33} cy={36} r={2.5} fill={S} />
          <circle cx={47} cy={36} r={2.5} fill={S} />
          <path d="M 30 50 Q 40 56 50 50" fill="none" stroke="#FFE4C4" strokeWidth={1.2} />
          <ShadedEllipse cx={36} cy={52} rx={3} ry={3} fill="#FFF8DC" strokeWidth={0.8} />
          <ShadedEllipse cx={40} cy={54} rx={3.5} ry={3.5} fill="#FFEFD5" strokeWidth={0.8} />
          <ShadedEllipse cx={44} cy={52} rx={3} ry={3} fill="#FFF8DC" strokeWidth={0.8} />
        </>
      )}

      {!onVehicle && (
        <>
          <ShadedRect x={32} y={legY} width={7} height={12} fill="#34495E" rx={2} depth={3} strokeWidth={1.6} />
          <ShadedRect x={41} y={legY} width={7} height={12} fill="#34495E" rx={2} depth={3} strokeWidth={1.6} />
        </>
      )}

      <PetSprite pet={avatar.pet} />
    </svg>
  )
}
