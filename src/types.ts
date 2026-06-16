export type Screen = 'welcome' | 'avatar' | 'play'

import type { CountertopMaterial } from './data/interiorCabinetStyles'
export type { CountertopMaterial }

export type BuildingCategory =
  | 'houses'
  | 'businesses'
  | 'docks'
  | 'roads'
  | 'boats'
  | 'boathouses'
  | 'zoos'
  | 'decor'

export type AvatarBodyShapeId = 'slim' | 'average' | 'athletic' | 'curvy'
export type AvatarOutfitStyleId = 'hoodie' | 'tshirt' | 'dress' | 'overalls' | 'coastal'
export type AvatarHairStyleId = 'wavy' | 'long' | 'short' | 'curly' | 'bob' | 'ponytail' | 'bun'

export type AvatarSunglassesId = 'none' | 'classic' | 'aviator' | 'round' | 'sport'
export type AvatarNecklaceId = 'none' | 'shell' | 'bead' | 'starfish' | 'pearl' | 'surf'

export interface Avatar {
  name: string
  bodyShape: AvatarBodyShapeId
  skinTone: string
  hairStyle: AvatarHairStyleId
  hairColor: string
  outfitStyle: AvatarOutfitStyleId
  outfitColor: string
  accentColor: string
  hat: 'none' | 'sunhat' | 'cap' | 'bucket'
  sunglasses: AvatarSunglassesId
  necklace: AvatarNecklaceId
  pet: 'none' | 'dog' | 'cat' | 'kangaroo' | 'parrot'
  vehicle: 'none' | 'bike' | 'surfboard'
}

export interface InteriorItem {
  id: string
  furnitureId: string
  x: number
  y: number
  rotation: number
  /** Custom width when placed (resizable items like TVs). */
  width?: number
  /** Custom height when placed (resizable items like TVs). */
  height?: number
}

export interface InteriorOpening {
  id: string
  kind: 'window' | 'door'
  x: number
  y: number
  width: number
  height: number
  /** Per-window style; falls back to room default when unset. */
  windowStyleId?: WindowStyleId
  /** Per-door style; falls back to room default when unset. */
  doorStyleId?: DoorStyleId
}

export type WindowViewSetting = 'auto' | 'ocean' | 'beach' | 'dock' | 'town' | 'landscape'

export type WindowStyleId =
  | 'classic'
  | 'colonial'
  | 'wide'
  | 'minimal'
  | 'rounded'
  | 'porthole'
  | 'bay'
  | 'picture'
export type DoorStyleId =
  | 'panel'
  | 'glass'
  | 'coastal'
  | 'barn'
  | 'french'
  | 'hatch'
  | 'sliding'
export type OpeningScaleId = 'small' | 'medium' | 'large'
export type TrimProfileId = 'standard' | 'decorative' | 'rustic'

export interface InteriorStyle {
  wallColor: string
  floorColor: string
  wallpaperId: string
  floorTypeId: string
  wallpaperColors?: Partial<Record<string, string>>
  floorTypeColors?: Partial<Record<string, string>>
  windowViewId?: WindowViewSetting
  windowStyleId?: WindowStyleId
  doorStyleId?: DoorStyleId
  trimColor?: string
  /** Baseboard profile along the wall/floor line. */
  baseTrimProfileId?: TrimProfileId
  /** Window and door casing profile. */
  casingTrimProfileId?: TrimProfileId
  /** Window size multiplier (0.55–1.55). Defaults to 1. */
  windowScale?: number
  /** Door size multiplier (0.55–1.55). Defaults to 1. */
  doorScale?: number
  /** Cabinet body colour for kitchen and bathroom cabinets. */
  cabinetColor?: string
  /** Countertop material for cabinets, islands, and countertop slabs. */
  countertopMaterial?: CountertopMaterial
}

/** Per-room interior data for multi-room buildings (e.g. big boathouse). */
export interface InteriorRoomState {
  interior?: InteriorItem[]
  interiorOpenings?: InteriorOpening[]
  interiorAvatarPosition?: { x: number; y: number }
  interiorStyle?: InteriorStyle
}

export interface PlacedItem {
  id: string
  buildingId: string
  x: number
  y: number
  rotation: number
  scale: number
  /** Legacy single-room fields — used when building has no multi-room layout. */
  interior?: InteriorItem[]
  interiorOpenings?: InteriorOpening[]
  interiorAvatarPosition?: { x: number; y: number }
  interiorStyle?: InteriorStyle
  /** Per-room interior data for multi-room buildings. */
  interiorRooms?: Partial<Record<string, InteriorRoomState>>
  /** Last visited room when re-entering a multi-room building. */
  currentInteriorRoomId?: string
}

export interface GameState {
  avatar: Avatar
  items: PlacedItem[]
  avatarPosition: { x: number; y: number }
  completedQuests: string[]
  soundEnabled: boolean
  activeInteriorId: string | null
  overworldAvatarPosition: { x: number; y: number } | null
}

export interface BuildingDef {
  id: string
  name: string
  category: BuildingCategory
  emoji: string
  width: number
  height: number
}

export interface QuestDef {
  id: string
  title: string
  description: string
  hint: string
}
