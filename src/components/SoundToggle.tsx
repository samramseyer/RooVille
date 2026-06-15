interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
  className?: string
  compact?: boolean
}

export function SoundToggle({ enabled, onToggle, className, compact = false }: SoundToggleProps) {
  return (
    <button
      type="button"
      className={`btn btn-ghost btn-small sound-toggle${enabled ? '' : ' sound-toggle--muted'}${className ? ` ${className}` : ''}`}
      onClick={onToggle}
      aria-label={enabled ? 'Mute sound' : 'Unmute sound'}
      aria-pressed={!enabled}
      title={enabled ? 'Mute sound' : 'Unmute sound'}
    >
      <span className="sound-toggle__icon" aria-hidden="true">
        {enabled ? '🔊' : '🔇'}
      </span>
      {!compact && <span className="sound-toggle__label">{enabled ? 'Sound' : 'Muted'}</span>}
    </button>
  )
}
