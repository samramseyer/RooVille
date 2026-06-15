export type WeatherKind =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'windy'

export interface WeatherVisuals {
  cloudOpacity: number
  showBirds: boolean
  terrainBrightness: number
  terrainSaturate: number
}

export const WEATHER_VISUALS: Record<WeatherKind, WeatherVisuals> = {
  sunny: { cloudOpacity: 0.45, showBirds: true, terrainBrightness: 1.04, terrainSaturate: 1.08 },
  'partly-cloudy': { cloudOpacity: 0.72, showBirds: true, terrainBrightness: 1, terrainSaturate: 1.02 },
  cloudy: { cloudOpacity: 1, showBirds: true, terrainBrightness: 0.94, terrainSaturate: 0.92 },
  fog: { cloudOpacity: 1, showBirds: false, terrainBrightness: 0.88, terrainSaturate: 0.85 },
  rain: { cloudOpacity: 0.95, showBirds: false, terrainBrightness: 0.82, terrainSaturate: 0.88 },
  snow: { cloudOpacity: 0.9, showBirds: false, terrainBrightness: 1.06, terrainSaturate: 0.78 },
  storm: { cloudOpacity: 1, showBirds: false, terrainBrightness: 0.72, terrainSaturate: 0.82 },
  windy: { cloudOpacity: 0.65, showBirds: true, terrainBrightness: 0.98, terrainSaturate: 1 },
}

export const WEATHER_LABELS: Record<WeatherKind, string> = {
  sunny: 'Sunny',
  'partly-cloudy': 'Partly cloudy',
  cloudy: 'Cloudy',
  fog: 'Foggy',
  rain: 'Rain',
  snow: 'Snow',
  storm: 'Storm',
  windy: 'Windy',
}

export const WEATHER_EMOJI: Record<WeatherKind, string> = {
  sunny: '☀️',
  'partly-cloudy': '⛅',
  cloudy: '☁️',
  fog: '🌫️',
  rain: '🌧️',
  snow: '❄️',
  storm: '⛈️',
  windy: '💨',
}

/** WMO weather interpretation codes (Open-Meteo). */
export function weatherCodeToKind(code: number, windKmh: number, precipitation: number): WeatherKind {
  if ([95, 96, 99].includes(code)) return 'storm'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code) || precipitation > 0.15) return 'rain'
  if ([45, 48].includes(code)) return 'fog'
  if (windKmh >= 38 && code <= 3) return 'windy'
  if (code === 0) return windKmh >= 28 ? 'windy' : 'sunny'
  if (code === 1) return windKmh >= 32 ? 'windy' : 'partly-cloudy'
  if (code === 2) return 'partly-cloudy'
  if (code === 3) return 'cloudy'
  return 'partly-cloudy'
}

export function formatTemperature(celsius: number | null): string | null {
  if (celsius === null || Number.isNaN(celsius)) return null
  const useF = typeof navigator !== 'undefined' && navigator.language.startsWith('en-US')
  if (useF) {
    return `${Math.round((celsius * 9) / 5 + 32)}°F`
  }
  return `${Math.round(celsius)}°C`
}
