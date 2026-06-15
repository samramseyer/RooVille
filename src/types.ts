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

export type WindowViewSetting = 'auto' | 'ocean' | 'beach' | 'dock' | 'town' | 'landscape'

export type WindowStyleId = 'classic' | 'colonial' | 'wide' | 'minimal' | 'rounded' | 'porthole'
export type DoorStyleId = 'panel' | 'glass' | 'coastal' | 'barn' | 'french' | 'hatch'

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
}

export interface PlacedItem {
  id: string
  buildingId: string
  x: number
  y: number
  rotation: number
  scale: number
  interior?: InteriorItem[]
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
