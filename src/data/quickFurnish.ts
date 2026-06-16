import type { InteriorItem } from '../types'
import { getBuildingInteriorCatalog } from './buildingInteriorCatalog'

/** Starter furniture set for empty rooms — uses items from the building's catalog. */
export function getQuickFurnishItems(roomName: string, buildingId?: string): InteriorItem[] {
  const lower = roomName.toLowerCase()
  const id = () => crypto.randomUUID()
  const catalog = buildingId ? getBuildingInteriorCatalog(buildingId) : null
  const allowed = catalog ? new Set(catalog.furnitureIds) : null

  const pick = (...candidates: string[]): InteriorItem[] => {
    const chosen = allowed ? candidates.filter((c) => allowed.has(c)) : candidates
    const defaults = candidates
    const ids = chosen.length > 0 ? chosen : defaults
    return ids.map((furnitureId) => ({ id: id(), furnitureId, x: 0, y: 0, rotation: 0 }))
  }

  if (lower.includes('kitchen')) {
    const items = pick('base-cabinet', 'fridge', 'dining-table', 'sink-base', 'stove', 'microwave')
    const positions = [
      { x: 80, y: 210 },
      { x: 480, y: 220 },
      { x: 280, y: 320 },
    ]
    return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
  }
  if (lower.includes('bath')) {
    const items = pick('toilet', 'bathroom-vanity', 'bath-mat', 'pedestal-sink', 'alcove-tub')
    const positions = [
      { x: 520, y: 280 },
      { x: 100, y: 240 },
      { x: 300, y: 380 },
    ]
    return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
  }
  if (lower.includes('bedroom') || lower.includes('bed')) {
    const items = pick('bed', 'nightstand', 'plant', 'dresser', 'lamp')
    const positions = [
      { x: 200, y: 280 },
      { x: 120, y: 300 },
      { x: 480, y: 280 },
    ]
    return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
  }
  if (lower.includes('office')) {
    const items = pick('desk', 'armchair', 'bookshelf', 'lamp')
    const positions = [
      { x: 280, y: 300 },
      { x: 300, y: 360 },
      { x: 80, y: 240 },
    ]
    return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
  }
  if (lower.includes('balcony')) {
    const items = pick('patio-chair', 'patio-dining-table', 'patio-planter', 'patio-lounge', 'patio-bench')
    const positions = [
      { x: 200, y: 320 },
      { x: 320, y: 340 },
      { x: 480, y: 300 },
    ]
    return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
  }
  const items = pick('sofa', 'coffee-table', 'tv', 'armchair', 'rug')
  const positions = [
    { x: 220, y: 300 },
    { x: 300, y: 360 },
    { x: 80, y: 260 },
  ]
  return items.slice(0, 3).map((item, i) => ({ ...item, ...positions[i]! }))
}
