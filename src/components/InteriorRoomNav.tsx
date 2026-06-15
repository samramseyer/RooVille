import type { RoomNavLink, NavDirection } from '../data/interiorLayouts'

const ARROW: Record<NavDirection, string> = {
  left: '←',
  right: '→',
  up: '↑',
  down: '↓',
}

interface InteriorRoomNavProps {
  links: RoomNavLink[]
  onNavigate: (link: RoomNavLink) => void
}

export function InteriorRoomNav({ links, onNavigate }: InteriorRoomNavProps) {
  if (links.length === 0) return null

  return (
    <>
      {links.map((link) => (
        <button
          key={`${link.direction}-${link.targetRoomId}`}
          type="button"
          className={`interior-nav interior-nav--${link.direction}`}
          onClick={() => onNavigate(link)}
          title={link.label}
          aria-label={`Go to ${link.label}`}
        >
          <span className="interior-nav-arrow" aria-hidden="true">
            {ARROW[link.direction]}
          </span>
          <span className="interior-nav-label">{link.label}</span>
        </button>
      ))}
    </>
  )
}
