import type { GameState, InteriorItem, PlacedItem } from '../types'
import { DEFAULT_AVATAR } from './avatarOptions'
import { getBuilding } from './buildings'
import { getInteriorTheme } from './enterableBuildings'
import { sanitizeInteriorStyle } from './interiorStyles'
import { sanitizeInteriorOpenings } from './interiorOpenings'

export const INITIAL_GAME_STATE: GameState = {
  avatar: DEFAULT_AVATAR,
  items: [],
  avatarPosition: { x: 400, y: 280 },
  completedQuests: [],
  soundEnabled: true,
  activeInteriorId: null,
  overworldAvatarPosition: null,
}

function sanitizeInterior(raw: unknown): InteriorItem[] {
  if (!Array.isArray(raw)) return []
  return raw.filter(
    (item): item is InteriorItem =>
      !!item &&
      typeof item === 'object' &&
      typeof (item as InteriorItem).id === 'string' &&
      typeof (item as InteriorItem).furnitureId === 'string',
  )
}

function sanitizeItems(raw: unknown): PlacedItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(
      (item): item is PlacedItem =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as PlacedItem).id === 'string' &&
        typeof (item as PlacedItem).buildingId === 'string',
    )
    .map((item) => {
      const building = getBuilding(item.buildingId)
      const theme = building ? getInteriorTheme(building) : 'home'
      return {
        id: item.id,
        buildingId: item.buildingId,
        x: typeof item.x === 'number' ? item.x : 0,
        y: typeof item.y === 'number' ? item.y : 0,
        rotation: typeof item.rotation === 'number' ? item.rotation : 0,
        scale: typeof item.scale === 'number' ? item.scale : 1,
        interior: sanitizeInterior(item.interior),
        interiorOpenings: sanitizeInteriorOpenings(item.interiorOpenings, theme),
        interiorAvatarPosition:
          item.interiorAvatarPosition &&
          typeof item.interiorAvatarPosition.x === 'number' &&
          typeof item.interiorAvatarPosition.y === 'number'
            ? item.interiorAvatarPosition
            : undefined,
        interiorStyle: sanitizeInteriorStyle(item.interiorStyle, theme),
      }
    })
}

export function migrateSave(raw: Partial<GameState>): GameState {
  const items = sanitizeItems(raw.items)
  let activeInteriorId = typeof raw.activeInteriorId === 'string' ? raw.activeInteriorId : null
  if (activeInteriorId && !items.some((item) => item.id === activeInteriorId)) {
    activeInteriorId = null
  }

  return {
    ...INITIAL_GAME_STATE,
    ...raw,
    avatar: { ...DEFAULT_AVATAR, ...raw.avatar },
    items,
    avatarPosition: raw.avatarPosition ?? INITIAL_GAME_STATE.avatarPosition,
    completedQuests: Array.isArray(raw.completedQuests) ? raw.completedQuests : [],
    soundEnabled: raw.soundEnabled ?? true,
    activeInteriorId,
    overworldAvatarPosition: raw.overworldAvatarPosition ?? null,
  }
}
