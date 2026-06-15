import { useEffect, useState } from 'react'

export type TimePhase = 'day' | 'sunset' | 'night' | 'dawn'

const PHASES: TimePhase[] = ['day', 'sunset', 'night', 'dawn']
const CYCLE_MS = 90000

export function useDayNightCycle() {
  const [phase, setPhase] = useState<TimePhase>('day')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setPhase((current) => {
        const idx = PHASES.indexOf(current)
        return PHASES[(idx + 1) % PHASES.length]
      })
    }, CYCLE_MS)
    return () => clearInterval(timer)
  }, [paused])

  const setPhaseManual = (p: TimePhase) => {
    setPhase(p)
    setPaused(true)
  }

  const resumeCycle = () => setPaused(false)

  return { phase, paused, setPhaseManual, resumeCycle }
}
