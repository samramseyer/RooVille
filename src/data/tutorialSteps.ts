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
    body: 'Open the Build Menu on the left, pick a category, then tap something and tap the map to place it.',
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
    body: 'Tap a building and choose Go inside, or walk nearby and tap Enter. Use Furniture, Walls, and Trim tabs to customize.',
  },
  {
    id: 'quests',
    title: 'Follow adventures',
    emoji: '🗺️',
    body: 'Check the Adventures panel for quest goals and hints. Complete them to grow your coastal town!',
  },
]
