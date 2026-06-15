import { useEffect, useState } from 'react'

export type TimePhase = 'day' | 'sunset' | 'night' | 'dawn'

/** Map the player's local clock to the coastal map lighting. */
export function getPhaseFromLocalTime(date = new Date()): TimePhase {
  const totalMinutes = date.getHours() * 60 + date.getMinutes()

  if (totalMinutes >= 5 * 60 && totalMinutes < 7 * 60) return 'dawn'
  if (totalMinutes >= 7 * 60 && totalMinutes < 17 * 60) return 'day'
  if (totalMinutes >= 17 * 60 && totalMinutes < 19 * 60 + 30) return 'sunset'
  return 'night'
}

function formatLocalTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function useDayNightCycle() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = setInterval(tick, 60_000)
    return () => clearInterval(timer)
  }, [])

  const phase = getPhaseFromLocalTime(now)

  return {
    phase,
    localTimeLabel: formatLocalTime(now),
  }
}
