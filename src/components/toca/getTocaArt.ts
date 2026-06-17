import type { ReactNode } from 'react'
import { getTocaHouseArt } from './getTocaHouseArt'
import { getTocaSkyscraperArt } from './TocaSkyscraperArt'
import { getTocaDockArt } from './TocaDockArt'
import { getTocaNatureArt } from './TocaNatureArt'
import { getTocaRoadArt } from './TocaRoadArt'

const TOCA_VIEWBOXES: Record<string, string> = {
  'beach-shack': '0 0 90 105',
  'coastal-home': '0 0 100 120',
  lighthouse: '0 0 100 118',
  'beach-cabin': '0 0 110 118',
  'painted-lady': '0 0 120 122',
  'pink-beach-house': '0 0 90 112',
  'red-beach-house': '0 0 90 110',
  'orange-beach-house': '0 0 90 112',
  'blue-beach-house': '0 0 90 114',
  'ice-cream': '0 0 70 80',
  'big-boathouse': '0 0 100 88',
  pier: '0 0 120 55',
  'raised-pier': '0 0 120 55',
  marina: '0 0 110 62',
  jetty: '0 0 100 48',
  'kangaroo-pen': '0 0 100 80',
  'petting-zoo': '0 0 180 115',
  'koala-tree': '0 0 70 90',
  'bird-aviary': '0 0 85 75',
  'croc-pool': '0 0 95 70',
  'palm-tree': '0 0 50 85',
  'gum-tree': '0 0 55 88',
  surfboard: '0 0 28 75',
  bbq: '0 0 48 48',
  umbrella: '0 0 52 58',
  shells: '0 0 38 32',
  'road-straight': '0 0 48 48',
  'road-corner': '0 0 48 48',
  'road-cross': '0 0 48 48',
  'road-end': '0 0 48 48',
  'five-star-hotel': '0 0 95 165',
  'skyline-tower': '0 0 90 155',
  'luxury-resort': '0 0 150 115',
}

export function getTocaArt(id: string, rotation = 0): ReactNode | null {
  return (
    getTocaHouseArt(id) ??
    getTocaSkyscraperArt(id) ??
    getTocaDockArt(id, rotation) ??
    getTocaRoadArt(id) ??
    getTocaNatureArt(id)
  )
}

export function getTocaViewBox(id: string): string {
  return TOCA_VIEWBOXES[id] ?? '0 0 100 100'
}
