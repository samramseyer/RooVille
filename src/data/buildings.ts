import type { BuildingCategory, BuildingDef } from '../types'

export const CATEGORY_LABELS: Record<BuildingCategory, string> = {
  houses: '🏠 Houses',
  businesses: '🏪 Businesses',
  docks: '🪵 Docks',
  roads: '🛤️ Roads',
  boats: '⛵ Boats',
  boathouses: '🛖 Boathouses',
  zoos: '🦘 Zoos',
  decor: '🌴 Decor',
}

export const BUILDINGS: BuildingDef[] = [
  { id: 'beach-shack', name: 'Heritage Cottage', category: 'houses', emoji: '🏛️', width: 115, height: 112 },
  { id: 'coastal-home', name: 'Grand Manor', category: 'houses', emoji: '🏠', width: 135, height: 128 },
  { id: 'lighthouse', name: 'Lighthouse', category: 'houses', emoji: '🗼', width: 110, height: 145 },
  { id: 'beach-cabin', name: 'Beach Cabin', category: 'houses', emoji: '🏖️', width: 130, height: 118 },
  { id: 'painted-lady', name: 'Painted Lady', category: 'houses', emoji: '🏘️', width: 145, height: 132 },
  { id: 'pink-beach-house', name: 'Pink Beach House', category: 'houses', emoji: '🩷', width: 115, height: 112 },
  { id: 'red-beach-house', name: 'Red Beach House', category: 'houses', emoji: '❤️', width: 125, height: 108 },
  { id: 'orange-beach-house', name: 'Orange Beach House', category: 'houses', emoji: '🧡', width: 118, height: 112 },
  { id: 'blue-beach-house', name: 'Blue Beach House', category: 'houses', emoji: '💙', width: 110, height: 118 },

  { id: 'surf-shop', name: 'Surf Shop', category: 'businesses', emoji: '🏄', width: 85, height: 75 },
  { id: 'fish-chips', name: 'Fish & Chips', category: 'businesses', emoji: '🐟', width: 80, height: 70 },
  { id: 'ice-cream', name: 'Ice Cream', category: 'businesses', emoji: '🍦', width: 65, height: 65 },
  { id: 'cafe', name: 'Beach Café', category: 'businesses', emoji: '☕', width: 80, height: 75 },
  { id: 'five-star-hotel', name: 'Five Star Hotel', category: 'businesses', emoji: '🏨', width: 95, height: 165 },
  { id: 'skyline-tower', name: 'Skyline Tower', category: 'businesses', emoji: '🏙️', width: 90, height: 155 },
  { id: 'luxury-resort', name: 'Luxury Resort', category: 'businesses', emoji: '🌴', width: 150, height: 115 },

  { id: 'pier', name: 'Boardwalk', category: 'docks', emoji: '🪵', width: 120, height: 50 },
  { id: 'raised-pier', name: 'Raised Pier', category: 'docks', emoji: '🛟', width: 120, height: 50 },
  { id: 'marina', name: 'Marina', category: 'docks', emoji: '⚓', width: 110, height: 60 },
  { id: 'jetty', name: 'Jetty', category: 'docks', emoji: '🌊', width: 100, height: 45 },

  { id: 'road-straight', name: 'Straight Road', category: 'roads', emoji: '🛣️', width: 48, height: 48 },
  { id: 'road-corner', name: 'Road Corner', category: 'roads', emoji: '↪️', width: 48, height: 48 },
  { id: 'road-cross', name: 'Intersection', category: 'roads', emoji: '✛', width: 48, height: 48 },
  { id: 'road-end', name: 'Road End', category: 'roads', emoji: '⛔', width: 48, height: 48 },

  { id: 'sailboat', name: 'Sailboat', category: 'boats', emoji: '⛵', width: 70, height: 80 },
  { id: 'fishing-boat', name: 'Fishing Boat', category: 'boats', emoji: '🚤', width: 75, height: 55 },
  { id: 'kayak', name: 'Kayak', category: 'boats', emoji: '🛶', width: 55, height: 30 },
  { id: 'yacht', name: 'Yacht', category: 'boats', emoji: '🛥️', width: 90, height: 50 },

  { id: 'big-boathouse', name: 'Big Boathouse', category: 'boathouses', emoji: '🏚️', width: 100, height: 85 },

  { id: 'petting-zoo', name: 'Petting Zoo', category: 'zoos', emoji: '🦁', width: 185, height: 125 },

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
