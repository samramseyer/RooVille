/** Canonical overworld size — matches CoastalMapTerrain viewBox. */
export const MAP_VIEW_WIDTH = 1000
export const MAP_VIEW_HEIGHT = 600

/** Assumed map pixel size before normalized coordinates (initial ResizeObserver default). */
export const LEGACY_MAP_WIDTH = 800
export const LEGACY_MAP_HEIGHT = 520

export const AVATAR_MAP_SIZE = 60

export interface MapPoint {
  x: number
  y: number
}

export interface MapRect {
  width: number
  height: number
}

export function screenToMapCoords(
  clientX: number,
  clientY: number,
  rect: DOMRect | MapRect,
): MapPoint {
  const x = ((clientX - ('left' in rect ? rect.left : 0)) / rect.width) * MAP_VIEW_WIDTH
  const y = ((clientY - ('top' in rect ? rect.top : 0)) / rect.height) * MAP_VIEW_HEIGHT
  return {
    x: Math.max(0, Math.min(MAP_VIEW_WIDTH, x)),
    y: Math.max(0, Math.min(MAP_VIEW_HEIGHT, y)),
  }
}

export function screenToMapCoordsFromRect(
  offsetX: number,
  offsetY: number,
  rect: DOMRect,
): MapPoint {
  return {
    x: Math.max(0, Math.min(MAP_VIEW_WIDTH, (offsetX / rect.width) * MAP_VIEW_WIDTH)),
    y: Math.max(0, Math.min(MAP_VIEW_HEIGHT, (offsetY / rect.height) * MAP_VIEW_HEIGHT)),
  }
}

export function mapToPercentX(x: number): number {
  return (x / MAP_VIEW_WIDTH) * 100
}

export function mapToPercentY(y: number): number {
  return (y / MAP_VIEW_HEIGHT) * 100
}

export function mapLengthToPercentWidth(length: number): number {
  return (length / MAP_VIEW_WIDTH) * 100
}

export function mapLengthToPercentHeight(length: number): number {
  return (length / MAP_VIEW_HEIGHT) * 100
}

export function mapPercentStyle(box: { left: number; top: number; width: number; height: number }) {
  return {
    left: `${mapToPercentX(box.left)}%`,
    top: `${mapToPercentY(box.top)}%`,
    width: `${mapLengthToPercentWidth(box.width)}%`,
    height: `${mapLengthToPercentHeight(box.height)}%`,
  }
}

export function migrateLegacyMapPoint(point: MapPoint): MapPoint {
  return {
    x: point.x * (MAP_VIEW_WIDTH / LEGACY_MAP_WIDTH),
    y: point.y * (MAP_VIEW_HEIGHT / LEGACY_MAP_HEIGHT),
  }
}

export function isMapCoordinateSpace(raw: unknown): boolean {
  return raw === 'map'
}
