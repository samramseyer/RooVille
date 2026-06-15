import type { BuildingCategory, BuildingDef } from '../types'

export const CATEGORY_LABELS: Record<BuildingCategory, string> = {
  houses: '🏠 Houses',
  businesses: '🏪 Businesses',
  docks: '🪵 Docks',
  boats: '⛵ Boats',
  boathouses: '🛖 Boathouses',
  zoos: '🦘 Zoos',
  decor: '🌴 Decor',
}

export const BUILDINGS: BuildingDef[] = [
  { id: 'beach-shack', name: 'Beach Shack', category: 'houses', emoji: '🏖️', width: 110, height: 95 },
  { id: 'coastal-home', name: 'Coastal Home', category: 'houses', emoji: '🏡', width: 125, height: 110 },
  { id: 'lighthouse', name: 'Lighthouse', category: 'houses', emoji: '🗼', width: 85, height: 140 },
  { id: 'stilt-house', name: 'Stilt House', category: 'houses', emoji: '🏘️', width: 120, height: 125 },

  { id: 'surf-shop', name: 'Surf Shop', category: 'businesses', emoji: '🏄', width: 85, height: 75 },
  { id: 'fish-chips', name: 'Fish & Chips', category: 'businesses', emoji: '🐟', width: 80, height: 70 },
  { id: 'ice-cream', name: 'Ice Cream', category: 'businesses', emoji: '🍦', width: 65, height: 65 },
  { id: 'cafe', name: 'Beach Café', category: 'businesses', emoji: '☕', width: 80, height: 75 },

  { id: 'pier', name: 'Boardwalk', category: 'docks', emoji: '🪵', width: 120, height: 50 },
  { id: 'raised-pier', name: 'Raised Pier', category: 'docks', emoji: '🛟', width: 120, height: 50 },
  { id: 'marina', name: 'Marina', category: 'docks', emoji: '⚓', width: 110, height: 60 },
  { id: 'jetty', name: 'Jetty', category: 'docks', emoji: '🌊', width: 100, height: 45 },

  { id: 'sailboat', name: 'Sailboat', category: 'boats', emoji: '⛵', width: 70, height: 80 },
  { id: 'fishing-boat', name: 'Fishing Boat', category: 'boats', emoji: '🚤', width: 75, height: 55 },
  { id: 'kayak', name: 'Kayak', category: 'boats', emoji: '🛶', width: 55, height: 30 },
  { id: 'yacht', name: 'Yacht', category: 'boats', emoji: '🛥️', width: 90, height: 50 },

  { id: 'small-boathouse', name: 'Small Boathouse', category: 'boathouses', emoji: '🛖', width: 75, height: 70 },
  { id: 'big-boathouse', name: 'Big Boathouse', category: 'boathouses', emoji: '🏚️', width: 100, height: 85 },

  { id: 'kangaroo-pen', name: 'Kangaroo Pen', category: 'zoos', emoji: '🦘', width: 100, height: 80 },
  { id: 'koala-tree', name: 'Koala Tree', category: 'zoos', emoji: '🐨', width: 70, height: 90 },
  { id: 'bird-aviary', name: 'Bird Aviary', category: 'zoos', emoji: '🦜', width: 85, height: 75 },
  { id: 'croc-pool', name: 'Croc Pool', category: 'zoos', emoji: '🐊', width: 95, height: 70 },

  { id: 'palm-tree', name: 'Palm Tree', category: 'decor', emoji: '🌴', width: 50, height: 80 },
  { id: 'gum-tree', name: 'Gum Tree', category: 'decor', emoji: '🌳', width: 55, height: 85 },
  { id: 'surfboard', name: 'Surfboard', category: 'decor', emoji: '🏄‍♀️', width: 25, height: 70 },
  { id: 'bbq', name: 'Beach BBQ', category: 'decor', emoji: '🔥', width: 45, height: 45 },
  { id: 'umbrella', name: 'Beach Umbrella', category: 'decor', emoji: '⛱️', width: 50, height: 55 },
  { id: 'shells', name: 'Shells', category: 'decor', emoji: '🐚', width: 35, height: 30 },
]

export function getBuilding(id: string): BuildingDef | undefined {
  return BUILDINGS.find((b) => b.id === id)
}

export function getBuildingsByCategory(category: BuildingCategory): BuildingDef[] {
  return BUILDINGS.filter((b) => b.category === category)
}
