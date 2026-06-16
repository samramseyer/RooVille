import type { ReactNode } from 'react'
import { getBeachHouseArt } from './TocaBeachHouseArt'
import { getBeachCabinArt } from './TocaBeachCabinArt'
import { getLighthouseArt } from './TocaLighthouseArt'
import { getVictorianHouseArt } from './TocaVictorianHouseArt'
import { getStatelyHouseArt } from './TocaStatelyHouseArt'
import { getBigBoathouseArt } from './TocaBigBoathouseArt'
import {
  CafeToca,
  FishChipsToca,
  IceCreamToca,
  SmallBoathouseToca,
  SurfShopToca,
} from './TocaHouseArt'

export function getTocaHouseArt(id: string): ReactNode | null {
  const victorian = getVictorianHouseArt(id)
  if (victorian) return victorian

  const beachHouse = getBeachHouseArt(id)
  if (beachHouse) return beachHouse

  const cabin = getBeachCabinArt(id)
  if (cabin) return cabin

  const stately = getStatelyHouseArt(id)
  if (stately) return stately

  const lighthouse = getLighthouseArt(id)
  if (lighthouse) return lighthouse

  const bigBoathouse = getBigBoathouseArt(id)
  if (bigBoathouse) return bigBoathouse

  switch (id) {
    case 'surf-shop':
      return <SurfShopToca />
    case 'fish-chips':
      return <FishChipsToca />
    case 'ice-cream':
      return <IceCreamToca />
    case 'cafe':
      return <CafeToca />
    case 'small-boathouse':
      return <SmallBoathouseToca />
    default:
      return null
  }
}
