import { useState } from 'react'
import { TUTORIAL_STEPS } from '../data/tutorialSteps'

interface TutorialOverlayProps {
  onComplete: () => void
  onSkip: () => void
}

export function TutorialOverlay({ onComplete, onSkip }: TutorialOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = TUTORIAL_STEPS[stepIndex]!
  const isLast = stepIndex >= TUTORIAL_STEPS.length - 1

  return (
    <div className="tutorial-overlay" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      <div className="tutorial-card">
        <div className="tutorial-emoji" aria-hidden="true">
          {step.emoji}
        </div>
        <p className="tutorial-progress">
          Step {stepIndex + 1} of {TUTORIAL_STEPS.length}
        </p>
        <h2 id="tutorial-title" className="tutorial-title">
          {step.title}
        </h2>
        <p className="tutorial-body">{step.body}</p>
        <div className="tutorial-dots" aria-hidden="true">
          {TUTORIAL_STEPS.map((s, i) => (
            <span key={s.id} className={`tutorial-dot${i === stepIndex ? ' active' : ''}`} />
          ))}
        </div>
        <div className="tutorial-actions">
          <button type="button" className="btn btn-ghost btn-small" onClick={onSkip}>
            Skip
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (isLast) onComplete()
              else setStepIndex((i) => i + 1)
            }}
          >
            {isLast ? 'Got it!' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
