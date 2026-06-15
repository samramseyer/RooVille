import { CoastalTownBackground } from './CoastalTownBackground'

interface WelcomeProps {
  onStart: () => void
  onContinue: () => void
  hasSave: boolean
}

export function Welcome({ onStart, onContinue, hasSave }: WelcomeProps) {
  return (
    <div className="welcome">
      <CoastalTownBackground />
      <div className="welcome-card">
        <div className="welcome-mascot" aria-hidden="true">
          🦘
        </div>
        <h1>RooVille</h1>
        <p className="welcome-tagline">Build your dream coastal town on the Australian shore!</p>
        <p className="welcome-safe">Your own private town — no internet, no strangers, just fun.</p>
        <div className="welcome-features">
          <span>🏖️ Beaches</span>
          <span>🏠 Houses</span>
          <span>⛵ Boats</span>
          <span>🦘 Zoos</span>
        </div>
        <div className="welcome-actions">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            Create Your Avatar
          </button>
          {hasSave && (
            <button type="button" className="btn btn-secondary" onClick={onContinue}>
              Continue Your Town
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
