import { QUESTS, checkQuest, getActiveQuestId, getQuestProgress, getQuestProgressLines } from '../data/quests'
import type { PlacedItem } from '../types'

interface QuestPanelProps {
  items: PlacedItem[]
  completedQuests: string[]
}

export function QuestPanel({ items, completedQuests }: QuestPanelProps) {
  const activeQuests = QUESTS.filter((q) => !completedQuests.includes(q.id))
  const activeQuestId = getActiveQuestId(completedQuests)

  return (
    <div className="quest-panel">
      <h3 className="quest-title">Adventures</h3>
      <p className="quest-subtitle">Complete quests to grow your town!</p>

      <div className="quest-list">
        {QUESTS.map((quest) => {
          const done = completedQuests.includes(quest.id)
          const progress = getQuestProgress(quest.id, items)
          const pct = Math.round((progress.current / progress.target) * 100)
          const isActive = !done && quest.id === activeQuestId
          const progressLines = getQuestProgressLines(quest.id, items)

          if (done) {
            return (
              <div key={quest.id} className="quest-card quest-done">
                <span className="quest-badge">✓ Done!</span>
                <strong>{quest.title}</strong>
                <p>{quest.description}</p>
              </div>
            )
          }

          return (
            <div key={quest.id} className={`quest-card${isActive ? ' quest-active' : ''}`}>
              {isActive && <span className="quest-active-badge">Up next</span>}
              <strong>{quest.title}</strong>
              <p>{quest.description}</p>
              <div className="quest-progress-bar">
                <div className="quest-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="quest-progress-text">
                {progress.current} / {progress.target}
              </span>
              {progressLines.length > 0 && (
                <ul className="quest-progress-lines">
                  {progressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              <p className="quest-hint">{quest.hint}</p>
            </div>
          )
        })}
      </div>

      {activeQuests.length === 0 && completedQuests.length === QUESTS.length && (
        <div className="quest-all-done">
          <span>🎉</span>
          <p>All adventures complete! You&apos;re a coastal champion!</p>
        </div>
      )}
    </div>
  )
}

export { checkQuest }
