import type { Avatar } from '../types'
import {
  ACCESSORIES,
  HAIR_COLORS,
  HAIR_STYLES,
  HATS,
  OUTFIT_COLORS,
  PETS,
  sanitizeAvatarName,
  SKIN_TONES,
  VEHICLES,
} from '../data/avatarOptions'
import { AvatarSprite } from './AvatarSprite'

interface AvatarCreatorProps {
  avatar: Avatar
  onChange: (avatar: Avatar) => void
  onDone: () => void
  onBack: () => void
}

function ColorPicker({
  colors,
  selected,
  onSelect,
  label,
}: {
  colors: string[]
  selected: string
  onSelect: (c: string) => void
  label: string
}) {
  return (
    <div className="picker-group">
      <span className="picker-label">{label}</span>
      <div className="color-row">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={`color-swatch${selected === c ? ' selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => onSelect(c)}
            aria-label={`${label} ${c}`}
          />
        ))}
      </div>
    </div>
  )
}

function OptionPicker<T extends string>({
  options,
  selected,
  onSelect,
  label,
}: {
  options: { id: T; label: string }[]
  selected: T
  onSelect: (id: T) => void
  label: string
}) {
  return (
    <div className="picker-group">
      <span className="picker-label">{label}</span>
      <div className="option-row">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`option-btn${selected === o.id ? ' selected' : ''}`}
            onClick={() => onSelect(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AvatarCreator({ avatar, onChange, onDone, onBack }: AvatarCreatorProps) {
  const patch = (partial: Partial<Avatar>) => onChange({ ...avatar, ...partial })

  return (
    <div className="avatar-creator">
      <header className="screen-header">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>Create Your Character</h2>
        <div className="header-spacer" />
      </header>

      <div className="avatar-creator-body">
        <div className="avatar-preview-panel">
          <div className="avatar-preview-bg">
            <AvatarSprite avatar={avatar} size={160} />
          </div>
          <label className="name-input-label">
            Your name
            <input
              type="text"
              className="name-input"
              value={avatar.name}
              maxLength={20}
              onChange={(e) => patch({ name: sanitizeAvatarName(e.target.value) })}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div className="avatar-options-panel">
          <ColorPicker
            label="Skin tone"
            colors={SKIN_TONES}
            selected={avatar.skinTone}
            onSelect={(skinTone) => patch({ skinTone })}
          />
          <OptionPicker
            label="Hair style"
            options={HAIR_STYLES}
            selected={avatar.hairStyle}
            onSelect={(hairStyle) => patch({ hairStyle })}
          />
          <ColorPicker
            label="Hair color"
            colors={HAIR_COLORS}
            selected={avatar.hairColor}
            onSelect={(hairColor) => patch({ hairColor })}
          />
          <ColorPicker
            label="Outfit color"
            colors={OUTFIT_COLORS}
            selected={avatar.outfitColor}
            onSelect={(outfitColor) => patch({ outfitColor })}
          />
          <OptionPicker
            label="Hat"
            options={HATS}
            selected={avatar.hat}
            onSelect={(hat) => patch({ hat })}
          />
          <OptionPicker
            label="Accessory"
            options={ACCESSORIES}
            selected={avatar.accessory}
            onSelect={(accessory) => patch({ accessory })}
          />
          <OptionPicker
            label="Pet companion"
            options={PETS}
            selected={avatar.pet}
            onSelect={(pet) => patch({ pet })}
          />
          <OptionPicker
            label="Getting around"
            options={VEHICLES}
            selected={avatar.vehicle}
            onSelect={(vehicle) => patch({ vehicle })}
          />
        </div>
      </div>

      <footer className="screen-footer">
        <button type="button" className="btn btn-primary btn-large" onClick={onDone}>
          Go to the Coast! 🏖️
        </button>
      </footer>
    </div>
  )
}
