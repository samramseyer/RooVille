import type { InteriorItem } from '../types'

/** Starter furniture set for empty rooms — decorate mode quick action. */
export function getQuickFurnishItems(roomName: string): InteriorItem[] {
  const lower = roomName.toLowerCase()
  const id = () => crypto.randomUUID()

  if (lower.includes('kitchen')) {
    return [
      { id: id(), furnitureId: 'base-cabinet', x: 80, y: 210, rotation: 0 },
      { id: id(), furnitureId: 'fridge', x: 480, y: 220, rotation: 0 },
      { id: id(), furnitureId: 'dining-table', x: 280, y: 320, rotation: 0 },
    ]
  }
  if (lower.includes('bath')) {
    return [
      { id: id(), furnitureId: 'toilet', x: 520, y: 280, rotation: 0 },
      { id: id(), furnitureId: 'bathroom-vanity', x: 100, y: 240, rotation: 0 },
      { id: id(), furnitureId: 'bath-mat', x: 300, y: 380, rotation: 0 },
    ]
  }
  if (lower.includes('bedroom') || lower.includes('bed')) {
    return [
      { id: id(), furnitureId: 'bed', x: 200, y: 280, rotation: 0 },
      { id: id(), furnitureId: 'nightstand', x: 120, y: 300, rotation: 0 },
      { id: id(), furnitureId: 'plant', x: 480, y: 280, rotation: 0 },
    ]
  }
  if (lower.includes('office')) {
    return [
      { id: id(), furnitureId: 'desk', x: 280, y: 300, rotation: 0 },
      { id: id(), furnitureId: 'armchair', x: 300, y: 360, rotation: 0 },
      { id: id(), furnitureId: 'bookshelf', x: 80, y: 240, rotation: 0 },
    ]
  }
  if (lower.includes('balcony')) {
    return [
      { id: id(), furnitureId: 'patio-chair', x: 200, y: 320, rotation: 0 },
      { id: id(), furnitureId: 'patio-dining-table', x: 320, y: 340, rotation: 0 },
      { id: id(), furnitureId: 'patio-planter', x: 480, y: 300, rotation: 0 },
    ]
  }
  return [
    { id: id(), furnitureId: 'sofa', x: 220, y: 300, rotation: 0 },
    { id: id(), furnitureId: 'coffee-table', x: 300, y: 360, rotation: 0 },
    { id: id(), furnitureId: 'tv', x: 80, y: 260, rotation: 0 },
  ]
}
