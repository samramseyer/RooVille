export type FurniturePlacement = 'floor' | 'wall'

export interface FurnitureDef {
  id: string
  name: string
  emoji: string
  width: number
  height: number
  placement?: FurniturePlacement
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
  { id: 'tv', name: 'TV', emoji: '📺', width: 68, height: 48 },
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
