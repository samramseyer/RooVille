import type { SideTab } from './SidePanel'

export type MobilePanel = 'build' | 'map' | 'you' | 'quests'

interface MobileWorldNavProps {
  activePanel: MobilePanel
  onSelect: (panel: MobilePanel) => void
  questBadge?: number
}

export function MobileWorldNav({ activePanel, onSelect, questBadge }: MobileWorldNavProps) {
  const tabs: { id: MobilePanel; label: string; emoji: string }[] = [
    { id: 'build', label: 'Build', emoji: '🏗️' },
    { id: 'map', label: 'Map', emoji: '🗺️' },
    { id: 'you', label: 'You', emoji: '👤' },
    { id: 'quests', label: 'Quests', emoji: '🎯' },
  ]

  return (
    <nav className="mobile-play-toolbar" aria-label="Build and play">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`mobile-play-toolbar-btn${activePanel === tab.id ? ' active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          <span className="mobile-play-toolbar-emoji" aria-hidden="true">
            {tab.emoji}
          </span>
          <span>{tab.label}</span>
          {tab.id === 'quests' && questBadge !== undefined && questBadge > 0 && (
            <span className="mobile-play-toolbar-badge">{questBadge}</span>
          )}
        </button>
      ))}
    </nav>
  )
}

export type { SideTab }
