import type { PlacedItem, QuestDef } from '../types'
import { getBuilding } from './buildings'

export const QUESTS: QuestDef[] = [
  {
    id: 'first-home',
    title: 'Beach Dweller',
    description: 'Build your first house on the coast',
    hint: 'Pick any house from the Houses menu',
  },
  {
    id: 'zoo-keeper',
    title: 'Zoo Keeper',
    description: 'Place a Petting Zoo and add 3 animal exhibits inside',
    hint: 'Enter the zoo and place kangaroos, goats, horses, and more!',
  },
  {
    id: 'harbour-master',
    title: 'Harbour Master',
    description: 'Build a dock and 2 boats',
    hint: 'Place a pier or marina, then add boats',
  },
  {
    id: 'shop-owner',
    title: 'Shop Owner',
    description: 'Open 2 businesses in your town',
    hint: 'Surf shops, cafés, and ice cream stands work',
  },
  {
    id: 'decorator',
    title: 'Coastal Decorator',
    description: 'Add 5 decorations around town',
    hint: 'Palm trees, BBQs, umbrellas, and shells',
  },
  {
    id: 'boathouse-bay',
    title: 'Boathouse Bay',
    description: 'Build a boathouse and dock it with a boat',
    hint: 'One boathouse plus any boat nearby',
  },
  {
    id: 'town-planner',
    title: 'Town Planner',
    description: 'Pave 8 road tiles to connect your buildings',
    hint: 'Open the Roads menu and snap tiles together on the grass',
  },
]

function countByCategory(items: PlacedItem[], category: string): number {
  return items.filter((item) => getBuilding(item.buildingId)?.category === category).length
}

function countZooKeeperProgress(items: PlacedItem[]): number {
  let best = 0
  for (const item of items) {
    const building = getBuilding(item.buildingId)
    if (!building) continue

    if (item.buildingId === 'petting-zoo') {
      const room = item.interiorRooms?.['petting-zoo-ground']
      const interior = room?.interior ?? item.interior ?? []
      const animalExhibits = new Set(
        interior
          .map((entry) => entry.furnitureId)
          .filter(
            (id) =>
              id.startsWith('exhibit-') &&
              id !== 'exhibit-empty-pen' &&
              id !== 'exhibit-tree' &&
              !id.includes('food') &&
              !id.includes('restroom') &&
              !id.includes('gift'),
          ),
      )
      best = Math.max(best, animalExhibits.size, 1)
      continue
    }

    if (building.category === 'zoos') {
      best = Math.max(best, 1)
    }
  }
  return best
}

function countUniqueZooAnimals(items: PlacedItem[]): number {
  return countZooKeeperProgress(items)
}

export function checkQuest(questId: string, items: PlacedItem[]): boolean {
  switch (questId) {
    case 'first-home':
      return countByCategory(items, 'houses') >= 1
    case 'zoo-keeper':
      return countUniqueZooAnimals(items) >= 3
    case 'harbour-master':
      return countByCategory(items, 'docks') >= 1 && countByCategory(items, 'boats') >= 2
    case 'shop-owner':
      return countByCategory(items, 'businesses') >= 2
    case 'decorator':
      return countByCategory(items, 'decor') >= 5
    case 'boathouse-bay':
      return countByCategory(items, 'boathouses') >= 1 && countByCategory(items, 'boats') >= 1
    case 'town-planner':
      return countByCategory(items, 'roads') >= 8
    default:
      return false
  }
}

export function getQuestProgress(questId: string, items: PlacedItem[]): { current: number; target: number } {
  switch (questId) {
    case 'first-home':
      return { current: Math.min(countByCategory(items, 'houses'), 1), target: 1 }
    case 'zoo-keeper':
      return { current: Math.min(countUniqueZooAnimals(items), 3), target: 3 }
    case 'harbour-master':
      return {
        current: Math.min(
          (countByCategory(items, 'docks') >= 1 ? 1 : 0) + countByCategory(items, 'boats'),
          3,
        ),
        target: 3,
      }
    case 'shop-owner':
      return { current: Math.min(countByCategory(items, 'businesses'), 2), target: 2 }
    case 'decorator':
      return { current: Math.min(countByCategory(items, 'decor'), 5), target: 5 }
    case 'boathouse-bay':
      return {
        current: Math.min(
          (countByCategory(items, 'boathouses') >= 1 ? 1 : 0) + (countByCategory(items, 'boats') >= 1 ? 1 : 0),
          2,
        ),
        target: 2,
      }
    case 'town-planner':
      return { current: Math.min(countByCategory(items, 'roads'), 8), target: 8 }
    default:
      return { current: 0, target: 1 }
  }
}

/** Human-readable sub-steps for quest cards. */
export function getQuestProgressLines(questId: string, items: PlacedItem[]): string[] {
  switch (questId) {
    case 'harbour-master': {
      const docks = countByCategory(items, 'docks')
      const boats = countByCategory(items, 'boats')
      return [
        `Dock ${docks >= 1 ? '✓' : '○'} (1 needed)`,
        `Boats ${boats}/2`,
      ]
    }
    case 'boathouse-bay': {
      const bh = countByCategory(items, 'boathouses')
      const boats = countByCategory(items, 'boats')
      return [`Boathouse ${bh >= 1 ? '✓' : '○'}`, `Boat ${boats >= 1 ? '✓' : '○'}`]
    }
    case 'zoo-keeper': {
      const n = countUniqueZooAnimals(items)
      return [`Animal exhibits ${n}/3`]
    }
    default:
      return []
  }
}

export function getActiveQuestId(completedQuests: string[]): string | null {
  const next = QUESTS.find((q) => !completedQuests.includes(q.id))
  return next?.id ?? null
}
