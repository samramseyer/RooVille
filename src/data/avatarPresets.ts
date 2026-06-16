import type { Avatar } from '../types'
import { DEFAULT_AVATAR, sanitizeAvatar } from './avatarOptions'

export interface AvatarPreset {
  id: string
  name: string
  emoji: string
  avatar: Partial<Avatar>
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'beach-kid',
    name: 'Beach kid',
    emoji: '🏖️',
    avatar: {
      bodyShape: 'average',
      hairStyle: 'short',
      hairColor: '#F5D76E',
      outfitStyle: 'tshirt',
      outfitColor: '#48B5B0',
      accentColor: '#FFD54F',
      shoeColor: '#FFFFFF',
      shoes: 'flip-flops',
      hat: 'sunhat',
      pet: 'none',
      vehicle: 'none',
    },
  },
  {
    id: 'surfer',
    name: 'Surfer',
    emoji: '🏄',
    avatar: {
      bodyShape: 'athletic',
      hairStyle: 'wavy',
      hairColor: '#8B6914',
      outfitStyle: 'coastal',
      outfitColor: '#20B2AA',
      accentColor: '#FF8C42',
      shoeColor: '#FFFFFF',
      shoes: 'barefoot',
      sunglasses: 'sport',
      pet: 'none',
      vehicle: 'surfboard',
    },
  },
  {
    id: 'explorer',
    name: 'Explorer',
    emoji: '🦘',
    avatar: {
      bodyShape: 'average',
      hairStyle: 'ponytail',
      hairColor: '#5D4037',
      outfitStyle: 'overalls',
      outfitColor: '#7CB342',
      accentColor: '#C4956A',
      shoeColor: '#8B6914',
      shoes: 'boots',
      hat: 'bucket',
      pet: 'kangaroo',
      vehicle: 'bike',
    },
  },
]

export function applyAvatarPreset(presetId: string, name: string): Avatar {
  const preset = AVATAR_PRESETS.find((p) => p.id === presetId)
  if (!preset) return sanitizeAvatar({ ...DEFAULT_AVATAR, name })
  return sanitizeAvatar({ ...DEFAULT_AVATAR, ...preset.avatar, name })
}
