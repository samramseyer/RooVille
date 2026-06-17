import type { InteriorOpening, InteriorStyle } from '../types'

export type NavDirection = 'left' | 'right' | 'up' | 'down'
export type InteriorRoomFloor = 'downstairs' | 'upstairs' | 'outdoor'
export type InteriorRoomVariant = 'standard' | 'balcony' | 'lantern-deck' | 'zoo-topdown' | 'jungle' | 'jungle-aquarium'

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

/** Grand Manor — three-storey brick manor with upper-floor balcony */
const GRAND_MANOR_ROOMS: InteriorRoomDef[] = [
  {
    id: 'manor-living',
    name: 'Living room',
    emoji: '🛋️',
    floor: 'downstairs',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4564E',
      doorStyleId: 'coastal',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'manor-office',
        label: 'Office',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'manor-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 100, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'manor-bed-1',
        label: 'Upstairs',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'manor-office',
    name: 'Office',
    emoji: '💼',
    floor: 'downstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#EDE6DC',
      floorColor: '#9E7B4F',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#5D4037',
    },
    nav: [
      {
        direction: 'right',
        targetRoomId: 'manor-living',
        label: 'Living room',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'manor-kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    floor: 'downstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#FFF8F0',
      floorColor: '#D5DBDB',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#C4564E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'manor-living',
        label: 'Living room',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'manor-powder',
        label: 'Small bathroom',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'manor-powder',
    name: 'Small bathroom',
    emoji: '🚽',
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
        targetRoomId: 'manor-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
  {
    id: 'manor-bed-1',
    name: 'Bedroom 1',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 200, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4564E',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'manor-living',
        label: 'Downstairs',
        spawnPosition: { x: 320, y: 300 },
      },
      {
        direction: 'right',
        targetRoomId: 'manor-bed-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'manor-bed-2',
    name: 'Bedroom 2',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4564E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'manor-bed-1',
        label: 'Bedroom 1',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'manor-bed-3',
        label: 'Bedroom 3',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'manor-bed-3',
    name: 'Bedroom 3',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4564E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'manor-bed-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'manor-master-bath',
        label: 'Master bath',
        spawnPosition: { x: 100, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'manor-balcony',
        label: 'Balcony',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'manor-master-bath',
    name: 'Master bath',
    emoji: '🛁',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#EEF6FA',
      floorColor: '#A8C8D8',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#5A9E9A',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'manor-bed-3',
        label: 'Bedroom 3',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'manor-balcony',
        label: 'Balcony',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'manor-balcony',
    name: 'Balcony',
    emoji: '🌊',
    floor: 'outdoor',
    variant: 'balcony',
    forceOceanView: true,
    defaultAvatar: { x: 400, y: 340 },
    defaultStyle: {
      wallColor: '#87CEEB',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#C4564E',
      windowViewId: 'ocean',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'manor-bed-3',
        label: 'Bedroom 3',
        spawnPosition: { x: 320, y: 300 },
      },
    ],
  },
]

export const GRAND_MANOR_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'coastal-home',
  defaultRoomId: 'manor-living',
  rooms: GRAND_MANOR_ROOMS,
}

/** Heritage Cottage — two-storey sage stone townhouse */
const HERITAGE_COTTAGE_ROOMS: InteriorRoomDef[] = [
  {
    id: 'cottage-living',
    name: 'Living room',
    emoji: '🛋️',
    floor: 'downstairs',
    defaultAvatar: { x: 290, y: 340 },
    defaultStyle: {
      wallColor: '#E8EDE4',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B8E4E',
      doorStyleId: 'coastal',
    },
    nav: [
      {
        direction: 'right',
        targetRoomId: 'cottage-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 100, y: 340 },
      },
      {
        direction: 'up',
        targetRoomId: 'cottage-bed-1',
        label: 'Upstairs',
        spawnPosition: { x: 320, y: 360 },
      },
    ],
  },
  {
    id: 'cottage-kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    floor: 'downstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#FFF8F0',
      floorColor: '#D5DBDB',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#6B8E4E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'cottage-living',
        label: 'Living room',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'cottage-powder',
        label: 'Small bathroom',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'cottage-powder',
    name: 'Small bathroom',
    emoji: '🚽',
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
        targetRoomId: 'cottage-kitchen',
        label: 'Kitchen',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
  {
    id: 'cottage-bed-1',
    name: 'Bedroom 1',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 200, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B8E4E',
    },
    nav: [
      {
        direction: 'down',
        targetRoomId: 'cottage-living',
        label: 'Downstairs',
        spawnPosition: { x: 320, y: 300 },
      },
      {
        direction: 'right',
        targetRoomId: 'cottage-bed-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'cottage-bed-2',
    name: 'Bedroom 2',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B8E4E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'cottage-bed-1',
        label: 'Bedroom 1',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'cottage-bed-3',
        label: 'Bedroom 3',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'cottage-bed-3',
    name: 'Bedroom 3',
    emoji: '🛏️',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#F5F0E8',
      floorColor: '#B8926A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#6B8E4E',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'cottage-bed-2',
        label: 'Bedroom 2',
        spawnPosition: { x: 540, y: 340 },
      },
      {
        direction: 'right',
        targetRoomId: 'cottage-master-bath',
        label: 'Master bath',
        spawnPosition: { x: 100, y: 340 },
      },
    ],
  },
  {
    id: 'cottage-master-bath',
    name: 'Master bath',
    emoji: '🛁',
    floor: 'upstairs',
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: '#EEF6FA',
      floorColor: '#A8C8D8',
      wallpaperId: 'none',
      floorTypeId: 'tile',
      trimColor: '#5A9E9A',
    },
    nav: [
      {
        direction: 'left',
        targetRoomId: 'cottage-bed-3',
        label: 'Bedroom 3',
        spawnPosition: { x: 540, y: 340 },
      },
    ],
  },
]

export const HERITAGE_COTTAGE_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'beach-shack',
  defaultRoomId: 'cottage-living',
  rooms: HERITAGE_COTTAGE_ROOMS,
}

interface BeachHouseTheme {
  prefix: string
  buildingId: string
  wallColor: string
  trimColor: string
}

function createBeachHouseLayout({ prefix, buildingId, wallColor, trimColor }: BeachHouseTheme): BuildingInteriorLayout {
  const livingId = `${prefix}-living`
  const kitchenId = `${prefix}-kitchen`
  const bathId = `${prefix}-bath`
  const bed1Id = `${prefix}-bed-1`
  const bed2Id = `${prefix}-bed-2`
  const balconyId = `${prefix}-balcony`

  const rooms: InteriorRoomDef[] = [
    {
      id: livingId,
      name: 'Living room',
      emoji: '🛋️',
      floor: 'downstairs',
      defaultAvatar: { x: 290, y: 340 },
      defaultStyle: {
        wallColor,
        floorColor: '#C4956A',
        wallpaperId: 'none',
        floorTypeId: 'wood-planks',
        trimColor,
        doorStyleId: 'coastal',
      },
      nav: [
        {
          direction: 'right',
          targetRoomId: kitchenId,
          label: 'Kitchen',
          spawnPosition: { x: 100, y: 340 },
        },
        {
          direction: 'up',
          targetRoomId: bed1Id,
          label: 'Upstairs',
          spawnPosition: { x: 320, y: 360 },
        },
      ],
    },
    {
      id: kitchenId,
      name: 'Kitchen',
      emoji: '🍳',
      floor: 'downstairs',
      defaultAvatar: { x: 320, y: 340 },
      defaultStyle: {
        wallColor: '#FFF8F0',
        floorColor: '#D5DBDB',
        wallpaperId: 'none',
        floorTypeId: 'tile',
        trimColor,
      },
      nav: [
        {
          direction: 'left',
          targetRoomId: livingId,
          label: 'Living room',
          spawnPosition: { x: 540, y: 340 },
        },
        {
          direction: 'right',
          targetRoomId: bathId,
          label: 'Bathroom',
          spawnPosition: { x: 100, y: 340 },
        },
      ],
    },
    {
      id: bathId,
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
          targetRoomId: kitchenId,
          label: 'Kitchen',
          spawnPosition: { x: 540, y: 340 },
        },
      ],
    },
    {
      id: bed1Id,
      name: 'Bedroom 1',
      emoji: '🛏️',
      floor: 'upstairs',
      defaultAvatar: { x: 200, y: 340 },
      defaultStyle: {
        wallColor: '#FFF8F5',
        floorColor: '#C4956A',
        wallpaperId: 'none',
        floorTypeId: 'wood-planks',
        trimColor,
      },
      nav: [
        {
          direction: 'down',
          targetRoomId: livingId,
          label: 'Downstairs',
          spawnPosition: { x: 320, y: 300 },
        },
        {
          direction: 'right',
          targetRoomId: bed2Id,
          label: 'Bedroom 2',
          spawnPosition: { x: 100, y: 340 },
        },
      ],
    },
    {
      id: bed2Id,
      name: 'Bedroom 2',
      emoji: '🛏️',
      floor: 'upstairs',
      defaultAvatar: { x: 320, y: 340 },
      defaultStyle: {
        wallColor: '#FFF8F5',
        floorColor: '#C4956A',
        wallpaperId: 'none',
        floorTypeId: 'wood-planks',
        trimColor,
      },
      nav: [
        {
          direction: 'left',
          targetRoomId: bed1Id,
          label: 'Bedroom 1',
          spawnPosition: { x: 540, y: 340 },
        },
        {
          direction: 'up',
          targetRoomId: balconyId,
          label: 'Balcony',
          spawnPosition: { x: 320, y: 360 },
        },
      ],
    },
    {
      id: balconyId,
      name: 'Balcony',
      emoji: '🌊',
      floor: 'outdoor',
      floorLabel: 'Upper balcony',
      variant: 'balcony',
      forceOceanView: true,
      defaultAvatar: { x: 400, y: 340 },
      defaultStyle: {
        wallColor: '#87CEEB',
        floorColor: '#C4956A',
        wallpaperId: 'none',
        floorTypeId: 'wood-planks',
        trimColor,
        windowViewId: 'ocean',
      },
      nav: [
        {
          direction: 'down',
          targetRoomId: bed2Id,
          label: 'Bedroom 2',
          spawnPosition: { x: 320, y: 300 },
        },
      ],
    },
  ]

  return {
    buildingId,
    defaultRoomId: livingId,
    rooms,
  }
}

const BEACH_HOUSE_LAYOUTS: BuildingInteriorLayout[] = [
  createBeachHouseLayout({
    prefix: 'pink',
    buildingId: 'pink-beach-house',
    wallColor: '#FCE4EC',
    trimColor: '#F06292',
  }),
  createBeachHouseLayout({
    prefix: 'red',
    buildingId: 'red-beach-house',
    wallColor: '#FFEBEE',
    trimColor: '#E53935',
  }),
  createBeachHouseLayout({
    prefix: 'orange',
    buildingId: 'orange-beach-house',
    wallColor: '#FFF3E0',
    trimColor: '#FFB74D',
  }),
  createBeachHouseLayout({
    prefix: 'blue',
    buildingId: 'blue-beach-house',
    wallColor: '#E3F2FD',
    trimColor: '#42A5F5',
  }),
]

const ZOO_ENTRANCE = 'zoo-entrance'

function zooBackNav(spawnX = 540): RoomNavLink {
  return {
    direction: 'left',
    targetRoomId: ZOO_ENTRANCE,
    label: 'Safari Gate',
    spawnPosition: { x: spawnX, y: 340 },
  }
}

function createZooExhibitRoom(
  id: string,
  name: string,
  emoji: string,
  opts: {
    variant?: InteriorRoomVariant
    wallColor?: string
    floorColor?: string
    floorLabel?: string
    nav?: RoomNavLink[]
  } = {},
): InteriorRoomDef {
  const variant = opts.variant ?? 'jungle'
  return {
    id,
    name,
    emoji,
    floor: 'outdoor',
    floorLabel: opts.floorLabel ?? 'Exhibit hall',
    variant,
    defaultAvatar: { x: 320, y: 340 },
    defaultStyle: {
      wallColor: opts.wallColor ?? (variant === 'jungle-aquarium' ? '#0277BD' : '#2E7D32'),
      floorColor: opts.floorColor ?? (variant === 'jungle-aquarium' ? '#0288D1' : '#33691E'),
      wallpaperId: 'none',
      floorTypeId: 'paint',
      trimColor: variant === 'jungle-aquarium' ? '#004D73' : '#1B5E20',
    },
    nav: opts.nav ?? [zooBackNav()],
  }
}

export const PETTING_ZOO_LAYOUT: BuildingInteriorLayout = {
  buildingId: 'petting-zoo',
  defaultRoomId: ZOO_ENTRANCE,
  rooms: [
    {
      id: ZOO_ENTRANCE,
      name: 'Safari Gate',
      emoji: '🚪',
      floor: 'outdoor',
      floorLabel: 'Main entrance',
      variant: 'jungle',
      defaultAvatar: { x: 320, y: 340 },
      defaultStyle: {
        wallColor: '#388E3C',
        floorColor: '#2E7D32',
        wallpaperId: 'none',
        floorTypeId: 'paint',
        trimColor: '#1B5E20',
      },
      nav: [
        {
          direction: 'right',
          targetRoomId: 'zoo-lion',
          label: 'Lion Room',
          spawnPosition: { x: 100, y: 340 },
        },
        {
          direction: 'left',
          targetRoomId: 'zoo-monkey',
          label: 'Monkey Room',
          spawnPosition: { x: 540, y: 340 },
        },
        {
          direction: 'up',
          targetRoomId: 'zoo-elephant',
          label: 'Elephant Room',
          spawnPosition: { x: 320, y: 360 },
        },
        {
          direction: 'down',
          targetRoomId: 'zoo-axolotl',
          label: 'Axolotl Aquarium',
          spawnPosition: { x: 320, y: 340 },
        },
      ],
    },
    createZooExhibitRoom('zoo-lion', 'Lion Room', '🦁', {
      wallColor: '#F9A825',
      floorColor: '#558B2F',
      floorLabel: 'Savanna den',
      nav: [zooBackNav(), { direction: 'right', targetRoomId: 'zoo-tiger', label: 'Tiger Den', spawnPosition: { x: 100, y: 340 } }],
    }),
    createZooExhibitRoom('zoo-monkey', 'Monkey Room', '🐒', {
      wallColor: '#33691E',
      floorColor: '#1B5E20',
      floorLabel: 'Canopy climb',
      nav: [zooBackNav(100), { direction: 'left', targetRoomId: 'zoo-meerkat', label: 'Meerkat Mound', spawnPosition: { x: 540, y: 340 } }],
    }),
    createZooExhibitRoom('zoo-axolotl', 'Axolotl Aquarium', '🦎', {
      variant: 'jungle-aquarium',
      floorLabel: 'Crystal waters',
      nav: [zooBackNav(), { direction: 'down', targetRoomId: 'zoo-penguin', label: 'Penguin Pool', spawnPosition: { x: 320, y: 340 } }],
    }),
    createZooExhibitRoom('zoo-elephant', 'Elephant Room', '🐘', {
      wallColor: '#689F38',
      floorColor: '#33691E',
      floorLabel: 'Mud wallow',
      nav: [zooBackNav(), { direction: 'up', targetRoomId: 'zoo-giraffe', label: 'Giraffe Savannah', spawnPosition: { x: 320, y: 360 } }],
    }),
    createZooExhibitRoom('zoo-giraffe', 'Giraffe Savannah', '🦒', {
      wallColor: '#FBC02D',
      floorColor: '#689F38',
      floorLabel: 'Acacia plains',
    }),
    createZooExhibitRoom('zoo-penguin', 'Penguin Pool', '🐧', {
      variant: 'jungle-aquarium',
      wallColor: '#0277BD',
      floorColor: '#01579B',
      floorLabel: 'Ice-cold pool',
    }),
    createZooExhibitRoom('zoo-tiger', 'Tiger Den', '🐯', {
      wallColor: '#FF9800',
      floorColor: '#33691E',
      floorLabel: 'Bamboo thicket',
    }),
    createZooExhibitRoom('zoo-zebra', 'Zebra Plains', '🦓', {
      wallColor: '#8BC34A',
      floorColor: '#558B2F',
      floorLabel: 'Open grassland',
    }),
    createZooExhibitRoom('zoo-flamingo', 'Flamingo Lagoon', '🦩', {
      variant: 'jungle-aquarium',
      wallColor: '#F48FB1',
      floorColor: '#0288D1',
      floorLabel: 'Pink lagoon',
    }),
    createZooExhibitRoom('zoo-reptile', 'Reptile House', '🐍', {
      wallColor: '#33691E',
      floorColor: '#1B5E20',
      floorLabel: 'Warm terrarium',
    }),
    createZooExhibitRoom('zoo-bear', 'Bear Den', '🐻', {
      wallColor: '#5D4037',
      floorColor: '#33691E',
      floorLabel: 'Forest cave',
    }),
    createZooExhibitRoom('zoo-meerkat', 'Meerkat Mound', '🐾', {
      wallColor: '#A1887F',
      floorColor: '#689F38',
      floorLabel: 'Sunny burrow',
    }),
    createZooExhibitRoom('zoo-panda', 'Panda Grove', '🐼', {
      wallColor: '#66BB6A',
      floorColor: '#2E7D32',
      floorLabel: 'Bamboo grove',
    }),
    createZooExhibitRoom('zoo-hippo', 'Hippo Pool', '🦛', {
      variant: 'jungle-aquarium',
      wallColor: '#546E7A',
      floorColor: '#0277BD',
      floorLabel: 'Lazy river',
    }),
    createZooExhibitRoom('zoo-gorilla', 'Gorilla Rainforest', '🦍', {
      wallColor: '#1B5E20',
      floorColor: '#33691E',
      floorLabel: 'Misty jungle',
    }),
    createZooExhibitRoom('zoo-aviary', 'Tropical Aviary', '🦜', {
      wallColor: '#00897B',
      floorColor: '#2E7D32',
      floorLabel: 'Bird canopy',
    }),
  ],
}

const LAYOUTS: BuildingInteriorLayout[] = [
  BIG_BOATHOUSE_LAYOUT,
  LIGHTHOUSE_LAYOUT,
  GRAND_MANOR_LAYOUT,
  HERITAGE_COTTAGE_LAYOUT,
  ...BEACH_HOUSE_LAYOUTS,
  PETTING_ZOO_LAYOUT,
]

export function getBuildingInteriorLayout(buildingId: string): BuildingInteriorLayout | null {
  return LAYOUTS.find((layout) => layout.buildingId === buildingId) ?? null
}

export function getRoomDef(layout: BuildingInteriorLayout, roomId: string): InteriorRoomDef | undefined {
  return layout.rooms.find((room) => room.id === roomId)
}

function getBeachHouseRoomPrefix(roomId: string): string | null {
  const match = roomId.match(/^(pink|red|orange|blue)-/)
  return match ? match[1]! : null
}

export function getRoomDefaultOpenings(roomDef: InteriorRoomDef): InteriorOpening[] {
  if (roomDef.variant === 'lantern-deck') {
    return []
  }

  if (roomDef.variant === 'balcony') {
    return []
  }

  if (roomDef.variant === 'zoo-topdown') {
    return []
  }

  if (roomDef.variant === 'jungle' || roomDef.variant === 'jungle-aquarium') {
    if (roomDef.id === ZOO_ENTRANCE) {
      return [
        { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
        { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
        { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
      ]
    }
    return [
      { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
    ]
  }

  const beachPrefix = getBeachHouseRoomPrefix(roomDef.id)
  if (beachPrefix) {
    if (roomDef.id === `${beachPrefix}-living`) {
      return [
        { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
        { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
        { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
      ]
    }
    if (roomDef.id === `${beachPrefix}-kitchen`) {
      return [
        {
          id: `${beachPrefix}-kitchen-window`,
          kind: 'window',
          x: 480,
          y: 40,
          width: 72,
          height: 54,
          windowStyleId: 'wide',
        },
      ]
    }
    if (roomDef.id === `${beachPrefix}-bath`) {
      return [
        {
          id: `${beachPrefix}-bath-window`,
          kind: 'window',
          x: 280,
          y: 52,
          width: 36,
          height: 36,
          windowStyleId: 'rounded',
        },
      ]
    }
    if (roomDef.id === `${beachPrefix}-bed-1` || roomDef.id === `${beachPrefix}-bed-2`) {
      return [
        { id: 'win-left', kind: 'window', x: 48, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
        { id: 'win-right', kind: 'window', x: 500, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
      ]
    }
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

  if (roomDef.id === 'manor-living') {
    return [
      { id: 'win-left', kind: 'window', x: 32, y: 36, width: 88, height: 68, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 520, y: 36, width: 88, height: 68, windowStyleId: 'classic' },
      { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
    ]
  }

  if (roomDef.id === 'manor-office') {
    return [
      {
        id: 'manor-office-window',
        kind: 'window',
        x: 48,
        y: 44,
        width: 72,
        height: 56,
        windowStyleId: 'classic',
      },
    ]
  }

  if (roomDef.id === 'manor-kitchen') {
    return [
      {
        id: 'manor-kitchen-window',
        kind: 'window',
        x: 480,
        y: 40,
        width: 72,
        height: 54,
        windowStyleId: 'wide',
      },
    ]
  }

  if (roomDef.id === 'manor-powder') {
    return [
      {
        id: 'manor-powder-window',
        kind: 'window',
        x: 280,
        y: 52,
        width: 36,
        height: 36,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (
    roomDef.id === 'manor-bed-1' ||
    roomDef.id === 'manor-bed-2' ||
    roomDef.id === 'manor-bed-3'
  ) {
    return [
      { id: 'win-left', kind: 'window', x: 48, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 500, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
    ]
  }

  if (roomDef.id === 'manor-master-bath') {
    return [
      {
        id: 'manor-master-bath-window',
        kind: 'window',
        x: 252,
        y: 44,
        width: 56,
        height: 56,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (roomDef.id === 'cottage-living') {
    return [
      { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
    ]
  }

  if (roomDef.id === 'cottage-kitchen') {
    return [
      {
        id: 'cottage-kitchen-window',
        kind: 'window',
        x: 480,
        y: 40,
        width: 72,
        height: 54,
        windowStyleId: 'wide',
      },
    ]
  }

  if (roomDef.id === 'cottage-powder') {
    return [
      {
        id: 'cottage-powder-window',
        kind: 'window',
        x: 280,
        y: 52,
        width: 36,
        height: 36,
        windowStyleId: 'rounded',
      },
    ]
  }

  if (
    roomDef.id === 'cottage-bed-1' ||
    roomDef.id === 'cottage-bed-2' ||
    roomDef.id === 'cottage-bed-3'
  ) {
    return [
      { id: 'win-left', kind: 'window', x: 48, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 500, y: 44, width: 72, height: 56, windowStyleId: 'classic' },
    ]
  }

  if (roomDef.id === 'cottage-master-bath') {
    return [
      {
        id: 'cottage-master-bath-window',
        kind: 'window',
        x: 252,
        y: 44,
        width: 56,
        height: 56,
        windowStyleId: 'rounded',
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

  if (roomDef.id === 'living') {
    return [
      { id: 'win-left', kind: 'window', x: 40, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'win-right', kind: 'window', x: 520, y: 40, width: 80, height: 60, windowStyleId: 'classic' },
      { id: 'door-main', kind: 'door', x: 280, y: 430, width: 80, height: 50, doorStyleId: 'coastal' },
    ]
  }

  // default living / entry rooms — windows on both sides + town exit door
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
