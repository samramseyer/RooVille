export type Screen = 'welcome' | 'avatar' | 'play'

export type BuildingCategory =
  | 'houses'
  | 'businesses'
  | 'docks'
  | 'boats'
  | 'boathouses'
  | 'zoos'
  | 'decor'

export interface Avatar {
  name: string
  skinTone: string
  hairStyle: 'short' | 'long' | 'curly' | 'pigtails' | 'bun'
  hairColor: string
  outfitColor: string
  hat: 'none' | 'sunhat' | 'cap' | 'bucket'
  accessory: 'none' | 'sunglasses' | 'shell-necklace'
  pet: 'none' | 'dog' | 'cat' | 'kangaroo' | 'parrot'
  vehicle: 'none' | 'bike' | 'surfboard'
}

export interface InteriorItem {
  id: string
  furnitureId: string
  x: number
  y: number
  rotation: number
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
  /** Window size multiplier (0.55–1.55). Defaults to 1. */
  windowScale?: number
  /** Door size multiplier (0.55–1.55). Defaults to 1. */
  doorScale?: number
}

export interface PlacedItem {
  id: string
  buildingId: string
  x: number
  y: number
  rotation: number
  scale: number
  interior?: InteriorItem[]
  interiorOpenings?: InteriorOpening[]
  interiorAvatarPosition?: { x: number; y: number }
  interiorStyle?: InteriorStyle
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
