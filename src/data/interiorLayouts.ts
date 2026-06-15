import type { InteriorOpening, InteriorStyle } from '../types'

export type NavDirection = 'left' | 'right' | 'up' | 'down'
export type InteriorRoomFloor = 'downstairs' | 'upstairs' | 'outdoor'
export type InteriorRoomVariant = 'standard' | 'balcony' | 'lantern-deck'

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
  /** Overrides the generic floor label in the interior header. */
  floorLabel?: string
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

const LIGHTHOUSE_ROOMS: InteriorRoomDef[] = [
  {
    id: 'lighthouse-ground',
    name: 'Entry',
    emoji: '🚪',
    floor: 'downstairs',
    floorLabel: 'Ground floor',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#FFF8F0',
      floorColor: '#D5DBDB',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#B74A42',
      doorStyleId: 'coastal',
    },
    nav: [
      {
        direction: 'up',
        targetRoomId: 'lighthouse-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 290, y: 360 },
      },
    ],
  },
  {
    id: 'lighthouse-kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    floor: 'upstairs',
    floorLabel: '2nd floor',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#FFF8F0',
      floorColor: '#E8E0D4',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#B74A42',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'lighthouse-ground',
        label: 'Entry',
        spawnPosition: { x: 290, y: 300 },
      },
      {
        direction: 'up',
        targetRoomId: 'lighthouse-bath',
        label: 'Bathroom',
        spawnPosition: { x: 290, y: 360 },
      },
    ],
  },
  {
    id: 'lighthouse-bath',
    name: 'Bathroom',
    emoji: '🛁',
    floor: 'upstairs',
    floorLabel: '3rd floor',
    defaultAvatar: { x: 290, y: 340 },
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
        targetRoomId: 'lighthouse-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 290, y: 300 },
      },
      {
        direction: 'up',
        targetRoomId: 'lighthouse-balcony',
        label: 'Lantern deck',
        spawnPosition: { x: 120, y: 390 },
      },
    ],
  },
  {
    id: 'lighthouse-balcony',
    name: 'Lantern deck',
    emoji: '🌊',
    floor: 'outdoor',
    floorLabel: 'Top balcony',
    variant: 'lantern-deck',
    forceOceanView: true,
    defaultAvatar: { x: 120, y: 390 },
    defaultStyle: {
      wallColor: '#87CEEB',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#B74A42',
      windowViewId: 'ocean',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'lighthouse-bath',
        label: 'Bathroom',
        spawnPosition: { x: 290, y: 300 },
      },
    ],
  },
]

export const LIGHTHOUSE_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'lighthouse',
  defaultRoomId: 'lighthouse-ground',
  rooms: LIGHTHOUSE_ROOMS,
}

const STILT_HOUSE_ROOMS: InteriorRoomDef[] = [
  {
    id: 'stilt-living',
    name: 'Living room',
    emoji: '🛋️',
    floor: 'downstairs',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#FFF0E0',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#48B5B0',
    },
    nav: [
      {
        direction: 'right',
        targetRoomId: 'stilt-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 100, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'stilt-bedroom-1',
        label: 'Upstairs',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'stilt-kitchen',
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
        targetRoomId: 'stilt-living',
        label: 'Living room',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'stilt-bath',
        label: 'Bathroom',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'stilt-bath',
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
        targetRoomId: 'stilt-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
  {
    id: 'stilt-bedroom-1',
    name: 'Bedroom 1',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 200, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B9E6B',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'stilt-living',
        label: 'Downstairs',
        spawnPosition: { x: 320, y: 300 },
      },
      {
        direction: 'right',
        targetRoomId: 'stilt-bedroom-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'stilt-bedroom-2',
    name: 'Bedroom 2',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#C4956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B9E6B',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'stilt-bedroom-1',
        label: 'Bedroom 1',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'stilt-balcony',
        label: 'Balcony',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'stilt-balcony',
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
        targetRoomId: 'stilt-bedroom-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
]

export const STILT_HOUSE_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'stilt-house',
  defaultRoomId: 'stilt-living',
  rooms: STILT_HOUSE_ROOMS,
}

const LAYOUTS: BuildingInteriorLayout[] = [BIG_BOATHOUSE_LAYOUT, LIGHTHOUSE_LAYOUT, STILT_HOUSE_LAYOUT]

export function getBuildingInteriorLayout(buildingId: string): BuildingInteriorLayout | null {
  return LAYOUTS.find((layout) => layout.buildingId === buildingId) ?? null
}

export function getRoomDef(layout: BuildingInteriorLayout, roomId: string): InteriorRoomDef | undefined {
  return layout.rooms.find((room) => room.id === roomId)
}

export function getRoomDefaultOpenings(roomDef: InteriorRoomDef): InteriorOpening[] {
  if (roomDef.variant === 'lantern-deck') {
    return []
  }

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

  if (roomDef.id === 'lighthouse-ground') {
    return [
      {
        id: 'lh-window',
        kind: 'window',
        x: 268,
        y: 44,
        width: 56,
        height: 56,
        windowStyleId: 'porthole',
      },
      {
        id: 'door-main',
        kind: 'door',
        x: 280,
        y: 430,
        width: 80,
        height: 50,
        doorStyleId: 'coastal',
      },
    ]
  }

  if (roomDef.id === 'lighthouse-kitchen') {
    return [
      {
        id: 'lh-kitchen-window',
        kind: 'window',
        x: 268,
        y: 48,
        width: 52,
        height: 52,
        windowStyleId: 'porthole',
      },
    ]
  }

  if (roomDef.id === 'lighthouse-bath') {
    return [
      {
        id: 'lh-bath-window',
        kind: 'window',
        x: 268,
        y: 48,
        width: 48,
        height: 48,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (roomDef.id === 'stilt-living') {
    return [
      { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
    ]
  }

  if (roomDef.id === 'stilt-kitchen') {
    return [
      {
        id: 'stilt-kitchen-window',
        kind: 'window',
        x: 480,
        y: 40,
        width: 72,
        height: 54,
        windowStyleId: 'wide',
      },
    ]
  }

  if (roomDef.id === 'stilt-bath') {
    return [
      {
        id: 'stilt-bath-window',
        kind: 'window',
        x: 260,
        y: 48,
        width: 48,
        height: 48,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (roomDef.id === 'stilt-bedroom-1' || roomDef.id === 'stilt-bedroom-2') {
    return [
      { id: 'win-left', kind: 'window', x: 48, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 500, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
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
  if (floor === 'downstairs') return 'Ground floor'
  if (floor === 'upstairs') return 'Upper floor'
  return 'Top balcony'
}

export function getRoomFloorLabel(roomDef: InteriorRoomDef): string {
  return roomDef.floorLabel ?? getFloorLabel(roomDef.floor)
}
