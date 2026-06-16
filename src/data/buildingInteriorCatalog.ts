import type { CountertopMaterial, DoorStyleId, InteriorStyle, TrimProfileId, WainscotingId, WindowStyleId } from '../types'
import { CABINET_COLORS, COUNTERTOP_MATERIALS } from './interiorCabinetStyles'
import { getFurnitureByCategory, type FurnitureCategory } from './interiorFurniture'
import {
  FLOOR_PAINT_COLORS,
  FLOOR_TYPES,
  type FloorTypeId,
  type PaintOption,
  WALL_PAINT_COLORS,
  WALLPAPERS,
  type WallpaperId,
} from './interiorStyles'
import { DOOR_STYLES, TRIM_COLORS, TRIM_PROFILES, WAINSCOTING_OPTIONS, WINDOW_STYLES } from './interiorTrimStyles'

export interface BuildingInteriorCatalog {
  /** Shown in the decorate panel header. */
  collectionName: string
  defaultStyle: Partial<InteriorStyle>
  furnitureIds: readonly string[]
  wallPaintIds: readonly string[]
  floorPaintIds: readonly string[]
  wallpaperIds: readonly WallpaperId[]
  floorTypeIds: readonly FloorTypeId[]
  trimColorIds: readonly string[]
  windowStyleIds: readonly WindowStyleId[]
  doorStyleIds: readonly DoorStyleId[]
  trimProfileIds: readonly TrimProfileId[]
  wainscotingIds: readonly WainscotingId[]
  cabinetColorIds: readonly string[]
  countertopMaterials: readonly CountertopMaterial[]
}

const HOUSE_BUILDING_IDS = [
  'beach-shack',
  'coastal-home',
  'lighthouse',
  'beach-cabin',
  'painted-lady',
  'pink-beach-house',
  'red-beach-house',
  'orange-beach-house',
  'blue-beach-house',
] as const

export type HouseBuildingId = (typeof HOUSE_BUILDING_IDS)[number]

function catalog(
  collectionName: string,
  defaultStyle: Partial<InteriorStyle>,
  furnitureIds: string[],
  wallPaintIds: string[],
  floorPaintIds: string[],
  wallpaperIds: WallpaperId[],
  floorTypeIds: FloorTypeId[],
  trimColorIds: string[],
  windowStyleIds: WindowStyleId[],
  doorStyleIds: DoorStyleId[],
  trimProfileIds: TrimProfileId[],
  wainscotingIds: WainscotingId[],
  cabinetColorIds: string[],
  countertopMaterials: CountertopMaterial[],
): BuildingInteriorCatalog {
  return {
    collectionName,
    defaultStyle,
    furnitureIds,
    wallPaintIds,
    floorPaintIds,
    wallpaperIds,
    floorTypeIds,
    trimColorIds,
    windowStyleIds,
    doorStyleIds,
    trimProfileIds,
    wainscotingIds,
    cabinetColorIds,
    countertopMaterials,
  }
}

/** Unique interior catalog per house — duplicate building types share the same kit. */
export const HOUSE_INTERIOR_CATALOGS: Record<HouseBuildingId, BuildingInteriorCatalog> = {
  'beach-shack': catalog(
    'Heritage Cottage',
    {
      wallColor: '#FFF0E0',
      floorColor: '#E8C872',
      wallpaperId: 'eucalyptus',
      floorTypeId: 'wood-planks',
      trimColor: '#C4956A',
      windowStyleId: 'colonial',
      doorStyleId: 'coastal',
      baseTrimProfileId: 'rustic',
      wainscotingId: 'wainscoting',
      cabinetColor: '#9CAF88',
      countertopMaterial: 'butcher',
    },
    [
      'sofa', 'armchair', 'bed', 'nightstand', 'dresser', 'dining-table', 'dining-chair', 'bench', 'rug', 'lamp',
      'plant', 'bookshelf', 'clock', 'poster',
      'base-cabinet', 'base-cabinet-3drawer', 'sink-base-farmhouse', 'wall-cabinet', 'pantry-cabinet', 'hood-vent',
      'corner-cabinet', 'bathroom-vanity',
      'counter-butcher-60', 'counter-butcher-90', 'counter-butcher-120',
      'fridge', 'stove', 'microwave',
      'clawfoot-tub', 'toilet', 'pedestal-sink', 'towel-rack', 'bath-mat', 'bathroom-mirror-round',
      'patio-chair', 'patio-swing', 'patio-planter', 'patio-bench', 'patio-hammock',
    ],
    ['cream', 'sand', 'sage', 'weatherboard', 'sunset'],
    ['honey', 'oak', 'cabin'],
    ['none', 'stripes', 'eucalyptus'],
    ['paint', 'wood-planks', 'hardwood'],
    ['oak', 'cream', 'walnut', 'sage'],
    ['classic', 'colonial'],
    ['panel', 'coastal', 'barn'],
    ['standard', 'rustic'],
    ['none', 'wainscoting'],
    ['cream', 'sage', 'walnut'],
    ['wood', 'butcher'],
  ),

  'coastal-home': catalog(
    'Grand Manor',
    {
      wallColor: '#E8DCF5',
      floorColor: '#F0EBE3',
      wallpaperId: 'dots',
      floorTypeId: 'hardwood',
      trimColor: '#F5F0E8',
      windowStyleId: 'bay',
      doorStyleId: 'french',
      baseTrimProfileId: 'decorative',
      cabinetColor: '#3D5A80',
      countertopMaterial: 'marble',
    },
    [
      'sectional', 'ottoman', 'armchair', 'bed', 'bunk', 'nightstand', 'dresser', 'coffee-table', 'desk', 'rug',
      'lamp', 'desk-lamp', 'plant', 'bookshelf', 'mirror', 'flat-screen-tv',
      'base-cabinet-wide', 'base-cabinet-marble', 'sink-base-wide', 'wall-cabinet-wide', 'wall-cabinet-glass',
      'kitchen-island-marble', 'pantry-cabinet-wide', 'bathroom-vanity-wide', 'medicine-cabinet',
      'counter-marble-90', 'counter-marble-120', 'counter-granite-90', 'counter-granite-120',
      'fridge', 'stove', 'dishwasher', 'microwave',
      'alcove-tub', 'jacuzzi', 'toilet', 'heated-towel-rail', 'bath-mat', 'bathroom-mirror', 'towel-bar',
      'patio-sofa', 'patio-dining-table', 'patio-umbrella', 'patio-planter-tall', 'patio-pergola',
    ],
    ['lavender', 'weatherboard', 'powder', 'rose', 'blush'],
    ['white', 'driftwood', 'oak'],
    ['none', 'dots', 'checks'],
    ['hardwood', 'tile', 'lvp'],
    ['white', 'cream', 'charcoal'],
    ['bay', 'wide', 'classic'],
    ['french', 'panel', 'glass'],
    ['standard', 'decorative'],
    ['none'],
    ['white', 'navy', 'charcoal'],
    ['marble', 'granite', 'quartz'],
  ),

  lighthouse: catalog(
    'Lighthouse',
    {
      wallColor: '#E8F6F8',
      floorColor: '#D5DBDB',
      wallpaperId: 'waves',
      floorTypeId: 'tile',
      trimColor: '#E57373',
      windowStyleId: 'rounded',
      doorStyleId: 'coastal',
      cabinetColor: '#FFFFFF',
      countertopMaterial: 'laminate',
    },
    [
      'bed', 'bunk', 'nightstand', 'bench', 'desk', 'lamp', 'rug', 'plant', 'shelf', 'clock', 'poster', 'surfboard', 'tv',
      'base-cabinet-narrow', 'sink-base-narrow', 'wall-cabinet', 'medicine-cabinet', 'bathroom-linen',
      'counter-butcher-60', 'counter-laminate-90',
      'fridge', 'microwave', 'laundry',
      'alcove-tub', 'tile-shower', 'toilet', 'towel-bar', 'bath-stool', 'toilet-paper-holder',
      'patio-lounge', 'patio-side-table', 'patio-lantern', 'patio-wind-chimes', 'patio-tiki-torch',
    ],
    ['sky', 'ocean', 'powder', 'weatherboard'],
    ['driftwood', 'white', 'charcoal'],
    ['none', 'waves'],
    ['tile', 'paint'],
    ['white', 'coral', 'teal'],
    ['rounded', 'minimal', 'classic'],
    ['coastal', 'panel'],
    ['standard'],
    ['none'],
    ['white', 'teal'],
    ['laminate', 'wood'],
  ),

  'beach-cabin': catalog(
    'Beach Cabin',
    {
      wallColor: '#FFE0C8',
      floorColor: '#B8956A',
      wallpaperId: 'none',
      floorTypeId: 'wood-planks',
      trimColor: '#8B6914',
      windowStyleId: 'wide',
      doorStyleId: 'barn',
      baseTrimProfileId: 'rustic',
      cabinetColor: '#8B6914',
      countertopMaterial: 'wood',
    },
    [
      'sofa', 'armchair', 'bed', 'bunk', 'coffee-table', 'dining-table', 'dining-chair', 'bench', 'rug', 'lamp',
      'plant', 'surfboard', 'poster', 'mirror',
      'base-cabinet', 'sink-base', 'wall-cabinet-glass', 'kitchen-island', 'hood-vent-wide',
      'counter-butcher-90', 'counter-quartz-90',
      'fridge', 'stove', 'sink',
      'alcove-tub', 'glass-shower', 'toilet', 'towel-hook', 'bath-mat',
      'patio-chair', 'patio-fire-pit', 'patio-grill', 'patio-cooler', 'patio-rug', 'patio-string-lights',
    ],
    ['sunset', 'apricot', 'butter', 'sand'],
    ['cabin', 'oak', 'terracotta'],
    ['none', 'stripes'],
    ['wood-planks', 'hardwood'],
    ['walnut', 'oak', 'wattle'],
    ['wide', 'classic'],
    ['barn', 'coastal', 'panel'],
    ['rustic', 'standard'],
    ['none', 'wainscoting'],
    ['walnut', 'cream'],
    ['wood', 'butcher', 'quartz'],
  ),

  'painted-lady': catalog(
    'Painted Lady',
    {
      wallColor: '#FFD4CC',
      floorColor: '#E8C872',
      wallpaperId: 'checks',
      floorTypeId: 'hardwood',
      trimColor: '#E57373',
      windowStyleId: 'colonial',
      doorStyleId: 'french',
      baseTrimProfileId: 'decorative',
      cabinetColor: '#E8C4B8',
      countertopMaterial: 'granite',
    },
    [
      'sectional', 'armchair', 'bed', 'dresser', 'dining-table', 'dining-chair', 'ottoman', 'coffee-table', 'desk',
      'rug', 'lamp', 'plant', 'bookshelf', 'mirror', 'clock', 'flat-screen-tv',
      'base-cabinet-wide', 'base-cabinet-granite', 'sink-base-drawer', 'wall-cabinet-wide', 'kitchen-island-large-granite',
      'bathroom-tower-wide',
      'counter-granite-90', 'counter-granite-120', 'counter-concrete-90',
      'fridge', 'stove', 'dishwasher',
      'glass-shower', 'jacuzzi', 'toilet', 'bidet', 'bathroom-mirror', 'laundry-hamper',
      'patio-sofa', 'patio-ottoman', 'patio-bar-cart', 'patio-fountain', 'patio-bird-bath',
    ],
    ['coral', 'rose', 'lavender', 'lemon', 'dusty-pink'],
    ['honey', 'white', 'terracotta'],
    ['none', 'checks', 'dots'],
    ['hardwood', 'lvp'],
    ['coral', 'cream', 'wattle'],
    ['colonial', 'bay'],
    ['french', 'glass'],
    ['decorative', 'standard'],
    ['none'],
    ['blush', 'white', 'warm-gray'],
    ['granite', 'concrete', 'marble'],
  ),

  'pink-beach-house': catalog(
    'Pink Beach House',
    {
      wallColor: '#FCE4EC',
      floorColor: '#F0EBE3',
      wallpaperId: 'dots',
      floorTypeId: 'lvp',
      trimColor: '#F06292',
      windowStyleId: 'minimal',
      doorStyleId: 'glass',
      cabinetColor: '#E8C4B8',
      countertopMaterial: 'quartz',
    },
    [
      'sofa', 'armchair', 'bed', 'nightstand', 'coffee-table', 'bench', 'rug', 'lamp', 'plant', 'poster', 'clock',
      'dining-chair',
      'base-cabinet', 'sink-base', 'wall-cabinet', 'kitchen-island-xl-teal', 'bathroom-vanity',
      'counter-teal-90', 'counter-quartz-120',
      'fridge', 'microwave',
      'alcove-tub', 'tile-shower', 'toilet', 'bath-mat', 'soap-dispenser',
      'patio-chair', 'patio-dining-table', 'patio-umbrella', 'patio-planter', 'patio-hammock',
    ],
    ['rose', 'blush', 'dusty-pink', 'lavender'],
    ['white', 'driftwood'],
    ['none', 'dots'],
    ['lvp', 'paint'],
    ['coral', 'cream', 'white'],
    ['minimal', 'rounded'],
    ['glass', 'sliding'],
    ['standard'],
    ['none'],
    ['blush', 'white', 'teal'],
    ['quartz', 'teal', 'laminate'],
  ),

  'red-beach-house': catalog(
    'Red Beach House',
    {
      wallColor: '#FFEBEE',
      floorColor: '#C4956A',
      wallpaperId: 'stripes',
      floorTypeId: 'hardwood',
      trimColor: '#E53935',
      windowStyleId: 'classic',
      doorStyleId: 'panel',
      cabinetColor: '#5A5A5A',
      countertopMaterial: 'butcher',
    },
    [
      'bed', 'bunk', 'dresser', 'dining-table', 'bench', 'rug', 'lamp', 'desk-lamp', 'plant', 'tv', 'mirror',
      'base-cabinet-wide', 'sink-base-wide', 'wall-cabinet', 'kitchen-island-large-butcher', 'bathroom-tower', 'hood-vent',
      'counter-butcher-120', 'counter-marble-120',
      'fridge', 'stove', 'dishwasher', 'laundry',
      'clawfoot-tub', 'toilet', 'pedestal-sink', 'heated-towel-rail', 'bath-shelf',
      'patio-bench', 'patio-swing', 'patio-grill', 'patio-string-lights', 'patio-wind-chimes',
    ],
    ['coral', 'sunset', 'apricot', 'wattle'],
    ['oak', 'cabin', 'charcoal'],
    ['none', 'stripes'],
    ['hardwood', 'wood-planks'],
    ['coral', 'charcoal', 'walnut'],
    ['classic', 'wide'],
    ['panel', 'coastal'],
    ['standard', 'rustic'],
    ['wainscoting'],
    ['charcoal', 'walnut', 'warm-gray'],
    ['butcher', 'marble', 'wood'],
  ),

  'orange-beach-house': catalog(
    'Orange Beach House',
    {
      wallColor: '#FFF3E0',
      floorColor: '#D4956A',
      wallpaperId: 'waves',
      floorTypeId: 'tile',
      trimColor: '#FFB74D',
      windowStyleId: 'wide',
      doorStyleId: 'sliding',
      cabinetColor: '#48B5B0',
      countertopMaterial: 'teal',
    },
    [
      'armchair', 'bed', 'nightstand', 'sectional', 'coffee-table', 'desk', 'rug', 'plant', 'surfboard', 'poster',
      'shelf',
      'base-cabinet-narrow', 'sink-base-farmhouse', 'wall-cabinet-glass', 'kitchen-island-xl-quartz', 'pantry-cabinet',
      'counter-quartz-90', 'counter-quartz-120', 'counter-teal-90',
      'fridge', 'stove', 'microwave', 'sink',
      'hot-tub', 'glass-shower', 'toilet', 'bathroom-mirror-round', 'towel-rack',
      'patio-lounge', 'patio-fire-pit', 'patio-cooler', 'patio-tiki-torch', 'patio-rug',
    ],
    ['sunset', 'apricot', 'butter', 'wattle', 'mint'],
    ['terracotta', 'honey', 'ocean'],
    ['none', 'waves'],
    ['tile', 'stone'],
    ['wattle', 'teal', 'ocean'],
    ['wide', 'minimal'],
    ['sliding', 'glass', 'coastal'],
    ['standard'],
    ['none'],
    ['teal', 'ocean', 'warm-gray'],
    ['teal', 'quartz', 'concrete'],
  ),

  'blue-beach-house': catalog(
    'Blue Beach House',
    {
      wallColor: '#E3F2FD',
      floorColor: '#A8D4D0',
      wallpaperId: 'eucalyptus',
      floorTypeId: 'stone',
      trimColor: '#42A5F5',
      windowStyleId: 'porthole',
      doorStyleId: 'coastal',
      cabinetColor: '#6BA3BE',
      countertopMaterial: 'concrete',
    },
    [
      'sofa', 'bed', 'bunk', 'nightstand', 'dining-table', 'dining-chair', 'coffee-table', 'bench', 'lamp', 'plant',
      'bookshelf', 'clock',
      'base-cabinet-marble', 'sink-base-corner', 'wall-cabinet', 'kitchen-island-marble', 'bathroom-vanity-wide',
      'bathroom-tower',
      'counter-marble-90', 'counter-laminate-90', 'counter-concrete-90',
      'fridge', 'stove', 'dishwasher',
      'alcove-tub', 'tile-shower', 'toilet', 'bidet', 'bath-stool',
      'patio-dining-table', 'patio-chair', 'patio-pergola', 'patio-planter-tall', 'patio-side-table',
    ],
    ['ocean', 'sky', 'seafoam', 'pale-blue', 'powder'],
    ['ocean', 'driftwood', 'white'],
    ['none', 'eucalyptus'],
    ['stone', 'tile'],
    ['ocean', 'teal', 'white'],
    ['porthole', 'classic', 'rounded'],
    ['coastal', 'panel'],
    ['standard', 'decorative'],
    ['none', 'wainscoting'],
    ['ocean', 'white', 'navy'],
    ['concrete', 'marble', 'laminate'],
  ),
}

export function isHouseBuildingId(buildingId: string): buildingId is HouseBuildingId {
  return (HOUSE_BUILDING_IDS as readonly string[]).includes(buildingId)
}

export function getBuildingInteriorCatalog(buildingId: string): BuildingInteriorCatalog | null {
  if (!isHouseBuildingId(buildingId)) return null
  return HOUSE_INTERIOR_CATALOGS[buildingId]
}

export function isFurnitureAllowedForBuilding(buildingId: string, furnitureId: string): boolean {
  const catalog = getBuildingInteriorCatalog(buildingId)
  if (!catalog) return true
  return catalog.furnitureIds.includes(furnitureId)
}

export function getFurnitureForBuilding(buildingId: string, category: FurnitureCategory) {
  const items = getFurnitureByCategory(category)
  const catalog = getBuildingInteriorCatalog(buildingId)
  if (!catalog) return items
  return items.filter((item) => catalog.furnitureIds.includes(item.id))
}

export function getAvailableFurnitureCategories(buildingId: string) {
  const catalog = getBuildingInteriorCatalog(buildingId)
  if (!catalog) return null
  const allowed = new Set(catalog.furnitureIds)
  return {
    categories: ['furniture', 'kitchen-cabinets', 'countertops', 'appliances', 'bathroom-accessories', 'patio'] as FurnitureCategory[],
    hasItems: (category: FurnitureCategory) => getFurnitureByCategory(category).some((f) => allowed.has(f.id)),
  }
}

export function filterWallPaints(catalog: BuildingInteriorCatalog | null): PaintOption[] {
  if (!catalog) return WALL_PAINT_COLORS
  const allowed = new Set(catalog.wallPaintIds)
  return WALL_PAINT_COLORS.filter((p) => allowed.has(p.id))
}

export function filterFloorPaints(catalog: BuildingInteriorCatalog | null): PaintOption[] {
  if (!catalog) return FLOOR_PAINT_COLORS
  const allowed = new Set(catalog.floorPaintIds)
  return FLOOR_PAINT_COLORS.filter((p) => allowed.has(p.id))
}

export function filterWallpapers(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return WALLPAPERS
  const allowed = new Set(catalog.wallpaperIds)
  return WALLPAPERS.filter((w) => allowed.has(w.id))
}

export function filterFloorTypes(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return FLOOR_TYPES
  const allowed = new Set(catalog.floorTypeIds)
  return FLOOR_TYPES.filter((f) => allowed.has(f.id))
}

export function filterTrimColors(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return TRIM_COLORS
  const allowed = new Set(catalog.trimColorIds)
  return TRIM_COLORS.filter((t) => allowed.has(t.id))
}

export function filterWindowStyles(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return WINDOW_STYLES
  const allowed = new Set(catalog.windowStyleIds)
  return WINDOW_STYLES.filter((w) => allowed.has(w.id))
}

export function filterDoorStyles(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return DOOR_STYLES
  const allowed = new Set(catalog.doorStyleIds)
  return DOOR_STYLES.filter((d) => allowed.has(d.id))
}

export function filterTrimProfiles(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return TRIM_PROFILES
  const allowed = new Set(catalog.trimProfileIds)
  return TRIM_PROFILES.filter((t) => allowed.has(t.id))
}

export function filterWainscoting(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return WAINSCOTING_OPTIONS
  const allowed = new Set(catalog.wainscotingIds)
  return WAINSCOTING_OPTIONS.filter((w) => allowed.has(w.id))
}

export function filterCabinetColors(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return CABINET_COLORS
  const allowed = new Set(catalog.cabinetColorIds)
  return CABINET_COLORS.filter((c) => allowed.has(c.id))
}

export function filterCountertopMaterials(catalog: BuildingInteriorCatalog | null) {
  if (!catalog) return COUNTERTOP_MATERIALS
  const allowed = new Set(catalog.countertopMaterials)
  return COUNTERTOP_MATERIALS.filter((m) => allowed.has(m.id))
}

export function getBuildingCatalogDefaultStyle(buildingId: string): Partial<InteriorStyle> | null {
  return getBuildingInteriorCatalog(buildingId)?.defaultStyle ?? null
}
