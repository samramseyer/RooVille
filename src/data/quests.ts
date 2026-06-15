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
    description: 'Build a zoo with 3 different animals',
    hint: 'Kangaroos, koalas, crocs, and birds all count!',
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

function countUniqueZooAnimals(items: PlacedItem[]): number {
  const zooIds = new Set(
    items
      .filter((item) => getBuilding(item.buildingId)?.category === 'zoos')
      .map((item) => item.buildingId),
  )
  return zooIds.size
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
