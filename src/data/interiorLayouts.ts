import type { InteriorOpening, InteriorStyle } from '../types'

export type NavDirection = 'left' | 'right' | 'up' | 'down'
export type InteriorRoomFloor = 'downstairs' | 'upstairs' | 'outdoor'
export type InteriorRoomVariant = 'standard' | 'balcony'

export interface RoomNavLink {
  direction: NavDirection
  targetRoomId: string
  label: string
  spawnPosition: { x: number; y: number }
}

export interface InteriorRoomDef {
  id: string
  name: string
  emoji: string
  floor: InteriorRoomFloor
  variant?: InteriorRoomVariant
  defaultAvatar: { x: number; y: number }
  defaultStyle?: Partial<InteriorStyle>
  /** When true, windows always show the ocean view. */
  forceOceanView?: boolean
  nav: RoomNavLink[]
}

export interface BuildingInteriorLayout {
  buildingId: string
  defaultRoomId: string
  rooms: InteriorRoomDef[]
}

const BIG_BOATHOUSE_ROOMS: InteriorRoomDef[] = [
  {
    id: 'living',
    name: 'Living room',
    emoji: '🛋️',
    floor: 'downstairs',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#FFF0E0',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4956A',
    },
    nav: [
      {
        direction: 'right',
        targetRoomId: 'kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 100, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'bath-up',
        label: 'Upstairs',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    floor: 'downstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#FFF8F0',
      floorColor: '#D5DBDB',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#48B5B0',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'living',
        label: 'Living room',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'bath-down',
        label: 'Bathroom',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'bath-down',
    name: 'Bathroom',
    emoji: '🛁',
    floor: 'downstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#E8F4F8',
      floorColor: '#B8D4E3',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#48B5B0',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
  {
    id: 'bath-up',
    name: 'Bathroom',
    emoji: '🚿',
    floor: 'upstairs',
    defaultAvatar: { x: 200, y: 340 },
    defaultStyle: {
      wallColor: '#E8F4F8',
      floorColor: '#B8D4E3',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#48B5B0',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'living',
        label: 'Downstairs',
        spawnPosition: { x: 320, y: 300 },
      },
      {
        direction: 'right',
        targetRoomId: 'balcony',
        label: 'Balcony',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'balcony',
    name: 'Balcony',
    emoji: '🌊',
    floor: 'outdoor',
    variant: 'balcony',
    forceOceanView: true,
    defaultAvatar: { x: 400, y: 340 },
    defaultStyle: {
      wallColor: '#87CEEB',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#8B6914',
      windowViewId: 'ocean',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'bath-up',
        label: 'Bathroom',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
]

export const BIG_BOATHOUSE_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'big-boathouse',
  defaultRoomId: 'living',
  rooms: BIG_BOATHOUSE_ROOMS,
}

const LAYOUTS: BuildingInteriorLayout[] = [BIG_BOATHOUSE_LAYOUT]

export function getBuildingInteriorLayout(buildingId: string): BuildingInteriorLayout | null {
  return LAYOUTS.find((layout) => layout.buildingId === buildingId) ?? null
}

export function getRoomDef(layout: BuildingInteriorLayout, roomId: string): InteriorRoomDef | undefined {
  return layout.rooms.find((room) => room.id === roomId)
}

export function getRoomDefaultOpenings(roomDef: InteriorRoomDef): InteriorOpening[] {
  if (roomDef.variant === 'balcony') {
    return [
      {
        id: 'balcony-rail',
        kind: 'window',
        x: 120,
        y: 24,
        width: 400,
        height: 140,
        windowStyleId: 'picture',
      },
    ]
  }

  if (roomDef.id === 'bath-down' || roomDef.id === 'bath-up') {
    return [
      {
        id: 'bath-window',
        kind: 'window',
        x: 260,
        y: 48,
        width: 48,
        height: 48,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (roomDef.id === 'kitchen') {
    return [
      {
        id: 'kitchen-window',
        kind: 'window',
        x: 480,
        y: 40,
        width: 72,
        height: 54,
        windowStyleId: 'wide',
      },
    ]
  }

  // living room — windows on both sides
  return [
    { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
    { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
    { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
  ]
}

export function getFloorLabel(floor: InteriorRoomFloor): string {
  if (floor === 'downstairs') return 'Downstairs'
  if (floor === 'upstairs') return 'Upstairs'
  return 'Overlooking the sea'
}
