import type { ReactNode } from 'react'
import { getTocaHouseArt } from './TocaHouseArt'
import { getTocaDockArt } from './TocaDockArt'
import { getTocaNatureArt } from './TocaNatureArt'

const TOCA_VIEWBOXES: Record<string, string> = {
  'beach-shack': '0 0 100 95',
  'coastal-home': '0 0 100 98',
  lighthouse: '0 0 70 100',
  'stilt-house': '0 0 100 98',
  'ice-cream': '0 0 70 80',
  'small-boathouse': '0 0 75 75',
  'big-boathouse': '0 0 100 88',
  pier: '0 0 120 55',
  'raised-pier': '0 0 120 55',
  marina: '0 0 110 62',
  jetty: '0 0 100 48',
  'kangaroo-pen': '0 0 100 80',
  'koala-tree': '0 0 70 90',
  'bird-aviary': '0 0 85 75',
  'croc-pool': '0 0 95 70',
  'palm-tree': '0 0 50 85',
  'gum-tree': '0 0 55 88',
  surfboard: '0 0 28 75',
  bbq: '0 0 48 48',
  umbrella: '0 0 52 58',
  shells: '0 0 38 32',
}

export function getTocaArt(id: string, rotation = 0): ReactNode | null {
  return getTocaHouseArt(id) ?? getTocaDockArt(id, rotation) ?? getTocaNatureArt(id)
}

export function getTocaViewBox(id: string): string {
  return TOCA_VIEWBOXES[id] ?? '0 0 100 100'
}
