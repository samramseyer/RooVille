import type { Avatar, AvatarHairStyleId, AvatarNecklaceId, AvatarSunglassesId } from '../types'
import { migrateBodyShape, BODY_SHAPES, OUTFIT_STYLES } from './avatarBody'

export { BODY_SHAPES, OUTFIT_STYLES } from './avatarBody'

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
  '#B55239',
  '#6B5B4A',
  '#1A1A1A',
]

export const OUTFIT_COLORS = [
  '#EFEFEF',
  '#E4E4E4',
  '#D8D8D8',
  '#B8C4CE',
  '#C8D8E8',
  '#E8D8C8',
  '#D0E0D0',
  '#F5E6D3',
]

export const ACCENT_COLORS = [
  '#FF7A28',
  '#FF5722',
  '#F39C12',
  '#E74C3C',
  '#3498DB',
  '#2ECC71',
  '#9B59B6',
  '#5D4037',
]

export const HAIR_STYLES: { id: AvatarHairStyleId; label: string }[] = [
  { id: 'wavy', label: 'Wavy' },
  { id: 'long', label: 'Long straight' },
  { id: 'short', label: 'Short' },
  { id: 'curly', label: 'Curly' },
  { id: 'bob', label: 'Bob' },
  { id: 'ponytail', label: 'Ponytail' },
  { id: 'bun', label: 'Bun' },
]

export const HATS: { id: Avatar['hat']; label: string }[] = [
  { id: 'none', label: 'No hat' },
  { id: 'sunhat', label: 'Sun hat' },
  { id: 'cap', label: 'Cap' },
  { id: 'bucket', label: 'Bucket hat' },
]

export const SUNGLASSES: { id: AvatarSunglassesId; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'classic', label: 'Classic' },
  { id: 'aviator', label: 'Aviator' },
  { id: 'round', label: 'Round' },
  { id: 'sport', label: 'Sport wrap' },
]

export const NECKLACES: { id: AvatarNecklaceId; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'shell', label: 'Shell' },
  { id: 'bead', label: 'Bead' },
  { id: 'starfish', label: 'Starfish' },
  { id: 'pearl', label: 'Pearl' },
  { id: 'surf', label: 'Surf choker' },
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
  bodyShape: 'average',
  skinTone: SKIN_TONES[1],
  hairStyle: 'wavy',
  hairColor: HAIR_COLORS[1],
  outfitStyle: 'hoodie',
  outfitColor: OUTFIT_COLORS[1],
  accentColor: ACCENT_COLORS[0],
  hat: 'none',
  sunglasses: 'none',
  necklace: 'none',
  pet: 'none',
  vehicle: 'none',
}

export function sanitizeAvatarName(raw: unknown): string {
  if (typeof raw !== 'string') return DEFAULT_AVATAR.name
  const trimmed = raw.trim().slice(0, 20)
  return trimmed || DEFAULT_AVATAR.name
}

const BODY_SHAPE_IDS = new Set(BODY_SHAPES.map((s) => s.id))
const OUTFIT_STYLE_IDS = new Set(OUTFIT_STYLES.map((s) => s.id))
const PET_IDS = new Set(PETS.map((pet) => pet.id))
const VEHICLE_IDS = new Set(VEHICLES.map((vehicle) => vehicle.id))
const HAIR_STYLE_IDS = new Set(HAIR_STYLES.map((style) => style.id))
const HAT_IDS = new Set(HATS.map((hat) => hat.id))
const SUNGLASSES_IDS = new Set(SUNGLASSES.map((item) => item.id))
const NECKLACE_IDS = new Set(NECKLACES.map((item) => item.id))

const LEGACY_HAIR: Record<string, AvatarHairStyleId> = {
  pigtails: 'ponytail',
}

export function sanitizeAvatar(raw: Partial<Avatar> & { gender?: string; accessory?: string } | undefined): Avatar {
  const skinTone = typeof raw?.skinTone === 'string' && SKIN_TONES.includes(raw.skinTone) ? raw.skinTone : DEFAULT_AVATAR.skinTone
  const hairColor = typeof raw?.hairColor === 'string' && HAIR_COLORS.includes(raw.hairColor) ? raw.hairColor : DEFAULT_AVATAR.hairColor
  const outfitColor =
    typeof raw?.outfitColor === 'string' && OUTFIT_COLORS.includes(raw.outfitColor)
      ? raw.outfitColor
      : DEFAULT_AVATAR.outfitColor
  const accentColor =
    typeof raw?.accentColor === 'string' && ACCENT_COLORS.includes(raw.accentColor)
      ? raw.accentColor
      : DEFAULT_AVATAR.accentColor

  const rawHair = raw?.hairStyle as string | undefined
  const hairStyle =
    rawHair && HAIR_STYLE_IDS.has(rawHair as AvatarHairStyleId)
      ? (rawHair as AvatarHairStyleId)
      : rawHair && LEGACY_HAIR[rawHair]
        ? LEGACY_HAIR[rawHair]
        : DEFAULT_AVATAR.hairStyle

  const legacyAccessory = raw?.accessory
  const sunglasses: AvatarSunglassesId =
    typeof raw?.sunglasses === 'string' && SUNGLASSES_IDS.has(raw.sunglasses)
      ? raw.sunglasses
      : legacyAccessory === 'sunglasses'
        ? 'classic'
        : DEFAULT_AVATAR.sunglasses
  const necklace: AvatarNecklaceId =
    typeof raw?.necklace === 'string' && NECKLACE_IDS.has(raw.necklace)
      ? raw.necklace
      : legacyAccessory === 'shell-necklace'
        ? 'shell'
        : DEFAULT_AVATAR.necklace

  return {
    ...DEFAULT_AVATAR,
    name: sanitizeAvatarName(raw?.name),
    bodyShape:
      raw?.bodyShape && BODY_SHAPE_IDS.has(raw.bodyShape) ? raw.bodyShape : migrateBodyShape(raw),
    skinTone,
    hairColor,
    outfitColor,
    accentColor,
    outfitStyle:
      raw?.outfitStyle && OUTFIT_STYLE_IDS.has(raw.outfitStyle) ? raw.outfitStyle : DEFAULT_AVATAR.outfitStyle,
    hairStyle,
    hat: HAT_IDS.has(raw?.hat as Avatar['hat']) ? (raw!.hat as Avatar['hat']) : DEFAULT_AVATAR.hat,
    sunglasses,
    necklace,
    pet: PET_IDS.has(raw?.pet as Avatar['pet']) ? (raw!.pet as Avatar['pet']) : DEFAULT_AVATAR.pet,
    vehicle: VEHICLE_IDS.has(raw?.vehicle as Avatar['vehicle'])
      ? (raw!.vehicle as Avatar['vehicle'])
      : DEFAULT_AVATAR.vehicle,
  }
}
