export interface FurnitureDef {
  id: string
  name: string
  emoji: string
  width: number
  height: number
}

export const INTERIOR_FURNITURE: FurnitureDef[] = [
  { id: 'sofa', name: 'Sofa', emoji: '🛋️', width: 90, height: 50 },
  { id: 'armchair', name: 'Armchair', emoji: '💺', width: 50, height: 50 },
  { id: 'bed', name: 'Bed', emoji: '🛏️', width: 80, height: 60 },
  { id: 'bunk', name: 'Bunk Bed', emoji: '🛌', width: 55, height: 70 },
  { id: 'table', name: 'Table', emoji: '🪑', width: 70, height: 50 },
  { id: 'rug', name: 'Rug', emoji: '🟫', width: 100, height: 60 },
  { id: 'lamp', name: 'Lamp', emoji: '💡', width: 30, height: 55 },
  { id: 'plant', name: 'Plant', emoji: '🪴', width: 40, height: 55 },
  { id: 'bookshelf', name: 'Bookshelf', emoji: '📚', width: 60, height: 70 },
  { id: 'tv', name: 'TV', emoji: '📺', width: 65, height: 45 },
  { id: 'fridge', name: 'Fridge', emoji: '🧊', width: 45, height: 65 },
  { id: 'poster', name: 'Poster', emoji: '🖼️', width: 50, height: 40 },
]

export function getFurniture(id: string): FurnitureDef | undefined {
  return INTERIOR_FURNITURE.find((f) => f.id === id)
}
