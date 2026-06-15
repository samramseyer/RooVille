import type { WeatherKind } from '../data/weather'

interface MapWeatherEffectsProps {
  weather: WeatherKind
}

function RainDrops({ count, heavy }: { count: number; heavy?: boolean }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`weather-rain-drop${heavy ? ' weather-rain-drop--heavy' : ''}`}
          style={{
            left: `${(i * 17) % 100}%`,
            animationDelay: `${-(i % 7) * 0.18}s`,
            animationDuration: `${heavy ? 0.55 : 0.75 + (i % 5) * 0.08}s`,
          }}
        />
      ))}
    </>
  )
}

function SnowFlakes({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="weather-snow-flake"
          style={{
            left: `${(i * 13) % 100}%`,
            animationDelay: `${-(i % 9) * 0.35}s`,
            animationDuration: `${3.5 + (i % 6) * 0.4}s`,
            opacity: 0.45 + (i % 4) * 0.12,
          }}
        />
      ))}
    </>
  )
}

function WindStreaks({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="weather-wind-streak"
          style={{
            top: `${8 + (i * 11) % 55}%`,
            animationDelay: `${-(i % 5) * 0.6}s`,
            animationDuration: `${1.8 + (i % 4) * 0.25}s`,
          }}
        />
      ))}
    </>
  )
}

export function MapWeatherEffects({ weather }: MapWeatherEffectsProps) {
  const showRain = weather === 'rain' || weather === 'storm'
  const showSnow = weather === 'snow'
  const showFog = weather === 'fog'
  const showWind = weather === 'windy' || weather === 'storm'

  if (!showRain && !showSnow && !showFog && !showWind) return null

  return (
    <div className={`map-weather map-weather--${weather}`} aria-hidden="true">
      {showFog && <div className="weather-fog" />}
      {showWind && <WindStreaks count={10} />}
      {showRain && <RainDrops count={weather === 'storm' ? 48 : 32} heavy={weather === 'storm'} />}
      {showSnow && <SnowFlakes count={36} />}
      {weather === 'storm' && <div className="weather-storm-flash" />}
    </div>
  )
}
