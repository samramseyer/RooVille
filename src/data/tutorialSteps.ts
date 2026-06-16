export interface TutorialStep {
  id: string
  title: string
  body: string
  emoji: string
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'build',
    title: 'Build your town',
    emoji: '🏠',
    body: 'Open Build (bottom bar on phone, left panel on desktop), pick a category, tap an item, then tap the map to place it.',
  },
  {
    id: 'edit',
    title: 'Edit placed items',
    emoji: '✏️',
    body: 'Tap any building or decor to select it. Use the buttons to turn or delete it, or tap Done when finished.',
  },
  {
    id: 'avatar',
    title: 'Move your avatar',
    emoji: '🚶',
    body: 'Drag your character around the map. Walk up to enterable buildings to see an Enter button.',
  },
  {
    id: 'interior',
    title: 'Decorate inside',
    emoji: '🛋️',
    body: 'Walk up to a building and tap Enter, or select it and tap Go inside. On phone, use the Map tab first to walk around. Customize with Furniture, Walls, and Trim.',
  },
  {
    id: 'quests',
    title: 'Follow adventures',
    emoji: '🗺️',
    body: 'Check the Adventures panel for quest goals and hints. Complete them to grow your coastal town!',
  },
]
