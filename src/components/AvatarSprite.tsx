import type { Avatar } from '../types'

interface AvatarSpriteProps {
  avatar: Avatar
  size?: number
  className?: string
}

function PetSprite({ pet, size }: { pet: Avatar['pet']; size: number }) {
  const s = size / 80
  if (pet === 'none') return null

  const x = 68 * s
  const y = 55 * s

  if (pet === 'dog') {
    return (
      <g transform={`translate(${x}, ${y}) scale(${s})`}>
        <ellipse cx="0" cy="8" rx="10" ry="8" fill="#C4956A" />
        <circle cx="8" cy="0" r="7" fill="#C4956A" />
        <ellipse cx="12" cy="2" rx="4" ry="3" fill="#C4956A" />
        <circle cx="10" cy="-1" r="1.5" fill="#2C1810" />
        <path d="M -8 4 Q -12 0 -10 -4" fill="#C4956A" />
      </g>
    )
  }
  if (pet === 'cat') {
    return (
      <g transform={`translate(${x}, ${y}) scale(${s})`}>
        <ellipse cx="0" cy="8" rx="9" ry="7" fill="#F39C12" />
        <circle cx="7" cy="0" r="6" fill="#F39C12" />
        <polygon points="2,-6 4,-12 6,-6" fill="#F39C12" />
        <polygon points="8,-6 10,-12 12,-6" fill="#F39C12" />
        <circle cx="9" cy="-1" r="1.5" fill="#2C1810" />
      </g>
    )
  }
  if (pet === 'kangaroo') {
    return (
      <g transform={`translate(${x}, ${y}) scale(${s})`}>
        <ellipse cx="0" cy="6" rx="7" ry="9" fill="#C4956A" />
        <circle cx="0" cy="-4" r="5" fill="#C4956A" />
        <ellipse cx="-6" cy="4" rx="3" ry="5" fill="#C4956A" />
      </g>
    )
  }
  if (pet === 'parrot') {
    return (
      <g transform={`translate(${x - 5 * s}, ${y - 15 * s}) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="6" ry="5" fill="#E74C3C" />
        <circle cx="4" cy="-2" r="4" fill="#E74C3C" />
        <polygon points="8,-2 14,0 8,2" fill="#F39C12" />
        <circle cx="6" cy="-3" r="1" fill="#2C1810" />
        <path d="M -2 4 L -6 10" stroke="#27AE60" strokeWidth="2" />
      </g>
    )
  }
  return null
}

function VehicleSprite({ vehicle, size, outfitColor }: { vehicle: Avatar['vehicle']; size: number; outfitColor: string }) {
  if (vehicle === 'none') return null
  const s = size / 80

  if (vehicle === 'bike') {
    return (
      <g transform={`translate(${20 * s}, ${82 * s}) scale(${s})`}>
        <circle cx="10" cy="12" r="8" fill="none" stroke="#2C3E50" strokeWidth="2" />
        <circle cx="50" cy="12" r="8" fill="none" stroke="#2C3E50" strokeWidth="2" />
        <line x1="10" y1="12" x2="30" y2="0" stroke="#2C3E50" strokeWidth="2" />
        <line x1="30" y1="0" x2="50" y2="12" stroke="#2C3E50" strokeWidth="2" />
        <line x1="30" y1="0" x2="30" y2="-8" stroke="#2C3E50" strokeWidth="2" />
        <rect x="26" y="-12" width="8" height="4" rx="1" fill={outfitColor} />
      </g>
    )
  }
  if (vehicle === 'surfboard') {
    return (
      <g transform={`translate(${5 * s}, ${75 * s}) scale(${s})`}>
        <ellipse cx="8" cy="15" rx="6" ry="22" fill="#E74C3C" stroke="#C0392B" strokeWidth="1" />
        <ellipse cx="8" cy="15" rx="3" ry="18" fill="#FF6B6B" opacity="0.4" />
      </g>
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
    >
      <VehicleSprite vehicle={avatar.vehicle} size={size} outfitColor={avatar.outfitColor} />

      {/* Body / outfit */}
      <ellipse cx="40" cy="72" rx="18" ry="22" fill={avatar.outfitColor} />
      <rect x="28" y="58" width="24" height="28" rx="4" fill={avatar.outfitColor} />

      {/* Arms */}
      <ellipse cx="22" cy="68" rx="6" ry="12" fill={avatar.skinTone} />
      <ellipse cx="58" cy="68" rx="6" ry="12" fill={avatar.skinTone} />

      {/* Neck */}
      <rect x="36" y="48" width="8" height="12" fill={avatar.skinTone} />

      {/* Head */}
      <circle cx="40" cy="38" r="18" fill={avatar.skinTone} />

      {/* Hair */}
      {avatar.hairStyle === 'short' && (
        <path
          d="M 22 38 Q 22 18 40 16 Q 58 18 58 38 Q 55 28 40 26 Q 25 28 22 38"
          fill={avatar.hairColor}
        />
      )}
      {avatar.hairStyle === 'long' && (
        <>
          <path d="M 22 38 Q 22 16 40 14 Q 58 16 58 38" fill={avatar.hairColor} />
          <path d="M 24 36 Q 20 60 22 78 L 28 76 Q 26 58 28 38" fill={avatar.hairColor} />
          <path d="M 56 36 Q 60 60 58 78 L 52 76 Q 54 58 52 38" fill={avatar.hairColor} />
        </>
      )}
      {avatar.hairStyle === 'curly' && (
        <>
          <circle cx="28" cy="24" r="8" fill={avatar.hairColor} />
          <circle cx="40" cy="18" r="9" fill={avatar.hairColor} />
          <circle cx="52" cy="24" r="8" fill={avatar.hairColor} />
          <circle cx="24" cy="34" r="7" fill={avatar.hairColor} />
          <circle cx="56" cy="34" r="7" fill={avatar.hairColor} />
        </>
      )}
      {avatar.hairStyle === 'pigtails' && (
        <>
          <path d="M 24 36 Q 22 16 40 16 Q 58 16 56 36" fill={avatar.hairColor} />
          <circle cx="18" cy="42" r="8" fill={avatar.hairColor} />
          <circle cx="62" cy="42" r="8" fill={avatar.hairColor} />
          <rect x="14" y="48" width="8" height="20" rx="4" fill={avatar.hairColor} />
          <rect x="58" y="48" width="8" height="20" rx="4" fill={avatar.hairColor} />
        </>
      )}
      {avatar.hairStyle === 'bun' && (
        <>
          <path d="M 24 36 Q 24 18 40 16 Q 56 18 56 36" fill={avatar.hairColor} />
          <circle cx="40" cy="12" r="10" fill={avatar.hairColor} />
        </>
      )}

      {/* Hat */}
      {avatar.hat === 'sunhat' && (
        <>
          <ellipse cx="40" cy="22" rx="26" ry="6" fill="#F5DEB3" stroke="#D4A574" strokeWidth="1" />
          <path d="M 30 22 Q 32 8 40 6 Q 48 8 50 22" fill="#F5DEB3" stroke="#D4A574" strokeWidth="1" />
          <ellipse cx="40" cy="22" rx="14" ry="3" fill="#E8C88A" />
        </>
      )}
      {avatar.hat === 'cap' && (
        <>
          <path d="M 24 28 Q 24 14 40 12 Q 56 14 56 28 L 56 32 L 24 32 Z" fill="#3498DB" />
          <ellipse cx="40" cy="32" rx="20" ry="4" fill="#2980B9" />
          <path d="M 56 30 L 68 34 L 56 36 Z" fill="#2980B9" />
        </>
      )}
      {avatar.hat === 'bucket' && (
        <>
          <path d="M 26 26 Q 26 10 40 8 Q 54 10 54 26 L 52 36 L 28 36 Z" fill="#F39C12" />
          <ellipse cx="40" cy="26" rx="14" ry="3" fill="#E67E22" />
        </>
      )}

      {/* Face */}
      {avatar.accessory !== 'sunglasses' && avatar.accessory !== 'shell-necklace' && (
        <>
          <circle cx="33" cy="36" r="2.5" fill="#2C1810" />
          <circle cx="47" cy="36" r="2.5" fill="#2C1810" />
          <path d="M 34 44 Q 40 48 46 44" fill="none" stroke="#C68642" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {avatar.accessory === 'sunglasses' && (
        <>
          <rect x="26" y="32" width="12" height="8" rx="2" fill="#1a1a2e" />
          <rect x="42" y="32" width="12" height="8" rx="2" fill="#1a1a2e" />
          <line x1="38" y1="36" x2="42" y2="36" stroke="#1a1a2e" strokeWidth="2" />
          <path d="M 34 44 Q 40 48 46 44" fill="none" stroke="#C68642" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {avatar.accessory === 'shell-necklace' && (
        <>
          <circle cx="33" cy="36" r="2.5" fill="#2C1810" />
          <circle cx="47" cy="36" r="2.5" fill="#2C1810" />
          <path d="M 30 50 Q 40 56 50 50" fill="none" stroke="#FFE4C4" strokeWidth="1" />
          <circle cx="36" cy="52" r="3" fill="#FFF8DC" stroke="#DEB887" strokeWidth="0.5" />
          <circle cx="40" cy="54" r="3.5" fill="#FFEFD5" stroke="#DEB887" strokeWidth="0.5" />
          <circle cx="44" cy="52" r="3" fill="#FFF8DC" stroke="#DEB887" strokeWidth="0.5" />
        </>
      )}

      {/* Legs (hidden when on vehicle) */}
      {!onVehicle && (
        <>
          <rect x="32" y={legY} width="7" height="12" rx="2" fill="#34495E" />
          <rect x="41" y={legY} width="7" height="12" rx="2" fill="#34495E" />
        </>
      )}

      <PetSprite pet={avatar.pet} size={size} />
    </svg>
  )
}
