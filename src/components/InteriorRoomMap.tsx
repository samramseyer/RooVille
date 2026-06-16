import type { BuildingInteriorLayout } from '../data/interiorLayouts'
import { getRoomFloorLabel } from '../data/interiorLayouts'

interface InteriorRoomMapProps {
  layout: BuildingInteriorLayout
  currentRoomId: string
  onSelectRoom: (roomId: string) => void
}

export function InteriorRoomMap({ layout, currentRoomId, onSelectRoom }: InteriorRoomMapProps) {
  if (layout.rooms.length <= 1) return null

  return (
    <div className="interior-room-map" role="navigation" aria-label="Room map">
      <span className="interior-room-map-label">Rooms</span>
      <div className="interior-room-map-grid">
        {layout.rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className={`interior-room-map-btn${room.id === currentRoomId ? ' active' : ''}`}
            onClick={() => onSelectRoom(room.id)}
            title={room.name}
          >
            <span aria-hidden="true">{room.emoji}</span>
            <span className="interior-room-map-name">{room.name}</span>
            <span className="interior-room-map-floor">{getRoomFloorLabel(room)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
