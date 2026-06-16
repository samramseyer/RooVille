import type { AvatarBodyShapeId, AvatarOutfitStyleId } from '../types'

export interface BodyMetrics {
  shoulder: number
  waist: number
  hip: number
  torsoBottom: number
  legLength: number
  headRx: number
  headRy: number
  /** 0 = angular jaw, 1 = soft rounded jaw */
  jawSoftness: number
  eyeScale: number
}

export const BODY_SHAPES: { id: AvatarBodyShapeId; label: string }[] = [
  { id: 'slim', label: 'Slim' },
  { id: 'average', label: 'Average' },
  { id: 'athletic', label: 'Athletic' },
  { id: 'curvy', label: 'Curvy' },
]

export const OUTFIT_STYLES: { id: AvatarOutfitStyleId; label: string }[] = [
  { id: 'hoodie', label: 'Hoodie & jeans' },
  { id: 'tshirt', label: 'T-shirt & jeans' },
  { id: 'dress', label: 'Summer dress' },
  { id: 'overalls', label: 'Overalls' },
  { id: 'coastal', label: 'Coastal casual' },
]

export const BODY_METRICS: Record<AvatarBodyShapeId, BodyMetrics> = {
  slim: {
    shoulder: 13.5,
    waist: 9,
    hip: 10,
    torsoBottom: 82,
    legLength: 30,
    headRx: 15.5,
    headRy: 18,
    jawSoftness: 0.75,
    eyeScale: 0.82,
  },
  average: {
    shoulder: 15,
    waist: 10.5,
    hip: 11.5,
    torsoBottom: 83,
    legLength: 31,
    headRx: 16,
    headRy: 18.5,
    jawSoftness: 0.55,
    eyeScale: 0.86,
  },
  athletic: {
    shoulder: 17,
    waist: 11,
    hip: 11,
    torsoBottom: 82,
    legLength: 31,
    headRx: 16.5,
    headRy: 18,
    jawSoftness: 0.35,
    eyeScale: 0.84,
  },
  curvy: {
    shoulder: 14.5,
    waist: 10,
    hip: 13.5,
    torsoBottom: 84,
    legLength: 29,
    headRx: 15.5,
    headRy: 18.5,
    jawSoftness: 0.8,
    eyeScale: 0.85,
  },
}

export function getBodyMetrics(shape: AvatarBodyShapeId): BodyMetrics {
  return BODY_METRICS[shape]
}

const HEAD_CX = 50
const HEAD_CY = 36

/** Shared head / hair / hat anchor points in the avatar viewBox. */
export function getHeadLayout(metrics: BodyMetrics) {
  const skullTop = HEAD_CY - metrics.headRy
  const hairLine = skullTop + 5
  const brimY = HEAD_CY - metrics.headRy + 12
  return {
    cx: HEAD_CX,
    cy: HEAD_CY,
    skullTop,
    hairLine,
    brimY,
  }
}

/** Map legacy boy/girl saves to body shapes. */
export function migrateBodyShape(
  raw: Partial<{ bodyShape?: AvatarBodyShapeId; gender?: string }> | undefined,
): AvatarBodyShapeId {
  if (raw?.bodyShape && BODY_SHAPES.some((s) => s.id === raw.bodyShape)) {
    return raw.bodyShape
  }
  if (raw?.gender === 'male') return 'athletic'
  if (raw?.gender === 'female') return 'average'
  return 'average'
}
