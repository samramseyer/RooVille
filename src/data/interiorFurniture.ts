import type { InteriorItem } from '../types'
import { ROOM_HEIGHT, ROOM_WIDTH, WALL_BOTTOM } from './interiorOpenings'

export type FurniturePlacement = 'floor' | 'wall'

const FLOOR_TOP = WALL_BOTTOM

const SIZE_LIMITS: Record<string, { minW: number; minH: number; maxW: number; maxH: number }> = {
  tv: { minW: 44, minH: 32, maxW: 160, maxH: 110 },
  'flat-screen-tv': { minW: 56, minH: 28, maxW: 240, maxH: 150 },
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  furnitureId: string,
) {
  const clampedX = Math.max(0, Math.min(ROOM_WIDTH - width, x))
  if (isWallFurniture(furnitureId)) {
    return {
      x: clampedX,
      y: Math.max(0, Math.min(FLOOR_TOP - height, y)),
    }
  }
  return {
    x: clampedX,
    y: Math.max(FLOOR_TOP, Math.min(ROOM_HEIGHT - height, y)),
  }
}

export interface FurnitureDef {
  id: string
  name: string
  emoji: string
  width: number
  height: number
  placement?: FurniturePlacement
  /** Can be resized after placing (drag corner handle). */
  resizable?: boolean
}

export const INTERIOR_FURNITURE: FurnitureDef[] = [
  { id: 'sofa', name: 'Sofa', emoji: '🛋️', width: 92, height: 52 },
  { id: 'armchair', name: 'Armchair', emoji: '💺', width: 52, height: 52 },
  { id: 'sectional', name: 'Sectional', emoji: '🛋️', width: 110, height: 55 },
  { id: 'ottoman', name: 'Ottoman', emoji: '🟫', width: 45, height: 38 },
  { id: 'bed', name: 'Bed', emoji: '🛏️', width: 85, height: 62 },
  { id: 'bunk', name: 'Bunk Bed', emoji: '🛌', width: 58, height: 72 },
  { id: 'nightstand', name: 'Nightstand', emoji: '🗄️', width: 42, height: 48 },
  { id: 'dresser', name: 'Dresser', emoji: '🗄️', width: 75, height: 55 },
  { id: 'dining-table', name: 'Dining Table', emoji: '🍽️', width: 85, height: 55 },
  { id: 'dining-chair', name: 'Dining Chair', emoji: '🪑', width: 38, height: 52 },
  { id: 'coffee-table', name: 'Coffee Table', emoji: '☕', width: 72, height: 42 },
  { id: 'desk', name: 'Desk', emoji: '🖥️', width: 80, height: 52 },
  { id: 'bench', name: 'Bench', emoji: '🪵', width: 70, height: 38 },
  { id: 'rug', name: 'Rug', emoji: '🟫', width: 105, height: 62 },
  { id: 'lamp', name: 'Floor Lamp', emoji: '💡', width: 32, height: 58 },
  { id: 'desk-lamp', name: 'Desk Lamp', emoji: '🔦', width: 28, height: 38 },
  { id: 'plant', name: 'Plant', emoji: '🪴', width: 42, height: 58 },
  { id: 'bookshelf', name: 'Bookshelf', emoji: '📚', width: 62, height: 72 },
  { id: 'shelf', name: 'Wall Shelf', emoji: '📦', width: 55, height: 28, placement: 'wall' },
  { id: 'tv', name: 'TV', emoji: '📺', width: 68, height: 48, resizable: true },
  {
    id: 'flat-screen-tv',
    name: 'Flat Screen TV',
    emoji: '🖥️',
    width: 96,
    height: 54,
    placement: 'wall',
    resizable: true,
  },
  { id: 'fridge', name: 'Fridge', emoji: '🧊', width: 48, height: 68 },
  { id: 'stove', name: 'Stove', emoji: '🍳', width: 50, height: 55 },
  { id: 'sink', name: 'Sink', emoji: '🚰', width: 55, height: 48 },
  { id: 'microwave', name: 'Microwave', emoji: '📻', width: 48, height: 32 },
  { id: 'laundry', name: 'Laundry', emoji: '🧺', width: 40, height: 45 },
  { id: 'surfboard', name: 'Surfboard', emoji: '🏄', width: 28, height: 85 },
  { id: 'mirror', name: 'Mirror', emoji: '🪞', width: 45, height: 55, placement: 'wall' },
  { id: 'clock', name: 'Clock', emoji: '🕐', width: 38, height: 38, placement: 'wall' },
  { id: 'poster', name: 'Poster', emoji: '🖼️', width: 52, height: 42, placement: 'wall' },
]

export function getFurniture(id: string): FurnitureDef | undefined {
  return INTERIOR_FURNITURE.find((f) => f.id === id)
}

export function isWallFurniture(id: string): boolean {
  return getFurniture(id)?.placement === 'wall'
}

export function isResizableFurniture(id: string): boolean {
  return getFurniture(id)?.resizable === true
}

export function getFurnitureDimensions(
  item: Pick<InteriorItem, 'furnitureId' | 'width' | 'height'>,
  def: FurnitureDef,
): { width: number; height: number } {
  return {
    width: item.width ?? def.width,
    height: item.height ?? def.height,
  }
}

export function clampFurnitureDimensions(
  furnitureId: string,
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number; width: number; height: number } {
  const limits = SIZE_LIMITS[furnitureId] ?? { minW: 24, minH: 24, maxW: 200, maxH: 160 }
  const w = Math.max(limits.minW, Math.min(limits.maxW, width))
  const h = Math.max(limits.minH, Math.min(limits.maxH, height))
  const pos = clampPosition(x, y, w, h, furnitureId)
  return { ...pos, width: w, height: h }
}

export function clampInteriorFurnitureItem(item: InteriorItem, def: FurnitureDef): InteriorItem {
  const { width, height } = getFurnitureDimensions(item, def)
  const clamped = clampFurnitureDimensions(item.furnitureId, item.x, item.y, width, height)
  return {
    ...item,
    x: clamped.x,
    y: clamped.y,
    width: isResizableFurniture(item.furnitureId) ? clamped.width : undefined,
    height: isResizableFurniture(item.furnitureId) ? clamped.height : undefined,
  }
}
