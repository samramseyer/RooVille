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
    <nav className="mobile-world-nav" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`mobile-world-nav-btn${activePanel === tab.id ? ' active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          <span className="mobile-world-nav-emoji" aria-hidden="true">
            {tab.emoji}
          </span>
          <span>{tab.label}</span>
          {tab.id === 'quests' && questBadge !== undefined && questBadge > 0 && (
            <span className="mobile-nav-badge">{questBadge}</span>
          )}
        </button>
      ))}
    </nav>
  )
}

export type { SideTab }
