import { useEffect, useState } from 'react'
import {
  formatTemperature,
  WEATHER_EMOJI,
  WEATHER_LABELS,
  weatherCodeToKind,
  type WeatherKind,
} from '../data/weather'

export interface LocalWeather {
  kind: WeatherKind
  label: string
  emoji: string
  temperature: string | null
  windKmh: number
  loading: boolean
  placeName: string | null
}

const DEFAULT_WEATHER: LocalWeather = {
  kind: 'sunny',
  label: WEATHER_LABELS.sunny,
  emoji: WEATHER_EMOJI.sunny,
  temperature: null,
  windKmh: 0,
  loading: true,
  placeName: null,
}

const REFRESH_MS = 30 * 60 * 1000

async function resolveCoordinates(): Promise<{ lat: number; lon: number; placeName: string | null }> {
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10_000,
          maximumAge: 15 * 60 * 1000,
        })
      })
      return { lat: pos.coords.latitude, lon: pos.coords.longitude, placeName: null }
    } catch {
      /* fall through to IP / default */
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/')
    if (res.ok) {
      const data = (await res.json()) as {
        latitude?: number
        longitude?: number
        city?: string
        region?: string
      }
      if (data.latitude != null && data.longitude != null) {
        const place = [data.city, data.region].filter(Boolean).join(', ') || null
        return { lat: data.latitude, lon: data.longitude, placeName: place }
      }
    }
  } catch {
    /* ignore */
  }

  return { lat: -33.8688, lon: 151.2093, placeName: 'Sydney coast' }
}

interface OpenMeteoCurrent {
  weather_code: number
  wind_speed_10m: number
  precipitation: number
  temperature_2m: number
}

async function fetchWeather(lat: number, lon: number): Promise<OpenMeteoCurrent> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'weather_code,wind_speed_10m,precipitation,temperature_2m',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
  })
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!res.ok) throw new Error('Weather unavailable')
  const data = (await res.json()) as { current: OpenMeteoCurrent }
  return data.current
}

function toLocalWeather(current: OpenMeteoCurrent, placeName: string | null): LocalWeather {
  const kind = weatherCodeToKind(current.weather_code, current.wind_speed_10m, current.precipitation)
  return {
    kind,
    label: WEATHER_LABELS[kind],
    emoji: WEATHER_EMOJI[kind],
    temperature: formatTemperature(current.temperature_2m),
    windKmh: Math.round(current.wind_speed_10m),
    loading: false,
    placeName,
  }
}

export function useLocalWeather(): LocalWeather {
  const [weather, setWeather] = useState<LocalWeather>(DEFAULT_WEATHER)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const { lat, lon, placeName } = await resolveCoordinates()
        const current = await fetchWeather(lat, lon)
        if (!cancelled) setWeather(toLocalWeather(current, placeName))
      } catch {
        if (!cancelled) {
          setWeather((prev) => ({
            ...prev,
            loading: false,
            kind: 'partly-cloudy',
            label: WEATHER_LABELS['partly-cloudy'],
            emoji: WEATHER_EMOJI['partly-cloudy'],
          }))
        }
      }
    }

    load()
    const timer = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  return weather
}
