import type { Avatar } from '../types'

export const SKIN_TONES = [
  '#FFDFC4',
  '#F0C8A0',
  '#E8B88A',
  '#D4A574',
  '#C68642',
  '#8D5524',
  '#6B4423',
]

export const HAIR_COLORS = [
  '#2C1810',
  '#5C3317',
  '#8B4513',
  '#D4A017',
  '#E6BE8A',
  '#FF6B6B',
  '#9B59B6',
  '#3498DB',
]

export const OUTFIT_COLORS = [
  '#E74C3C',
  '#3498DB',
  '#2ECC71',
  '#F39C12',
  '#9B59B6',
  '#1ABC9C',
  '#FF69B4',
  '#FFD700',
]

export const HAIR_STYLES: { id: Avatar['hairStyle']; label: string }[] = [
  { id: 'short', label: 'Short' },
  { id: 'long', label: 'Long' },
  { id: 'curly', label: 'Curly' },
  { id: 'pigtails', label: 'Pigtails' },
  { id: 'bun', label: 'Bun' },
]

export const HATS: { id: Avatar['hat']; label: string }[] = [
  { id: 'none', label: 'No hat' },
  { id: 'sunhat', label: 'Sun hat' },
  { id: 'cap', label: 'Cap' },
  { id: 'bucket', label: 'Bucket hat' },
]

export const ACCESSORIES: { id: Avatar['accessory']; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'sunglasses', label: 'Sunnies' },
  { id: 'shell-necklace', label: 'Shell necklace' },
]

export const PETS: { id: Avatar['pet']; label: string }[] = [
  { id: 'none', label: 'No pet' },
  { id: 'dog', label: 'Puppy' },
  { id: 'cat', label: 'Kitten' },
  { id: 'kangaroo', label: 'Joey' },
  { id: 'parrot', label: 'Parrot' },
]

export const VEHICLES: { id: Avatar['vehicle']; label: string }[] = [
  { id: 'none', label: 'Walking' },
  { id: 'bike', label: 'Bike' },
  { id: 'surfboard', label: 'Surfboard' },
]

export const DEFAULT_AVATAR: Avatar = {
  name: 'Explorer',
  skinTone: SKIN_TONES[2],
  hairStyle: 'long',
  hairColor: HAIR_COLORS[3],
  outfitColor: OUTFIT_COLORS[1],
  hat: 'sunhat',
  accessory: 'none',
  pet: 'none',
  vehicle: 'none',
}

export function sanitizeAvatarName(raw: unknown): string {
  if (typeof raw !== 'string') return DEFAULT_AVATAR.name
  const trimmed = raw.trim().slice(0, 20)
  return trimmed || DEFAULT_AVATAR.name
}
