import { useCallback, useState } from 'react'
import type { Avatar } from '../types'
import {
  NECKLACES,
  SHOES,
  ACCENT_COLORS,
  SHOE_COLORS,
  SUNGLASSES,
  BODY_SHAPES,
  HAIR_COLORS,
  HAIR_STYLES,
  HATS,
  OUTFIT_COLORS,
  OUTFIT_STYLES,
  PETS,
  sanitizeAvatar,
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
  const [draft, setDraft] = useState(() => sanitizeAvatar(avatar))

  const patch = useCallback(
    (partial: Partial<Avatar>) => {
      setDraft((current) => {
        const next = sanitizeAvatar({ ...current, ...partial })
        onChange(next)
        return next
      })
    },
    [onChange],
  )

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
            <AvatarSprite avatar={draft} size={200} />
          </div>
          <label className="name-input-label">
            Your name
            <input
              type="text"
              className="name-input"
              value={draft.name}
              maxLength={20}
              onChange={(e) => patch({ name: sanitizeAvatarName(e.target.value) })}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div className="avatar-options-panel">
          <OptionPicker
            label="Body shape"
            options={BODY_SHAPES}
            selected={draft.bodyShape}
            onSelect={(bodyShape) => patch({ bodyShape })}
          />
          <OptionPicker
            label="Outfit"
            options={OUTFIT_STYLES}
            selected={draft.outfitStyle}
            onSelect={(outfitStyle) => patch({ outfitStyle })}
          />
          <ColorPicker
            label="Skin tone"
            colors={SKIN_TONES}
            selected={draft.skinTone}
            onSelect={(skinTone) => patch({ skinTone })}
          />
          <OptionPicker
            label="Hair style"
            options={HAIR_STYLES}
            selected={draft.hairStyle}
            onSelect={(hairStyle) => patch({ hairStyle })}
          />
          <ColorPicker
            label="Hair color"
            colors={HAIR_COLORS}
            selected={draft.hairColor}
            onSelect={(hairColor) => patch({ hairColor })}
          />
          <ColorPicker
            label="Outfit color"
            colors={OUTFIT_COLORS}
            selected={draft.outfitColor}
            onSelect={(outfitColor) => patch({ outfitColor })}
          />
          <ColorPicker
            label="Accent color"
            colors={ACCENT_COLORS}
            selected={draft.accentColor}
            onSelect={(accentColor) => patch({ accentColor })}
          />
          <OptionPicker label="Shoes" options={SHOES} selected={draft.shoes} onSelect={(shoes) => patch({ shoes })} />
          <ColorPicker
            label="Shoe color"
            colors={SHOE_COLORS}
            selected={draft.shoeColor}
            onSelect={(shoeColor) => patch({ shoeColor })}
          />
          <OptionPicker label="Hat" options={HATS} selected={draft.hat} onSelect={(hat) => patch({ hat })} />
          <OptionPicker
            label="Sunglasses"
            options={SUNGLASSES}
            selected={draft.sunglasses}
            onSelect={(sunglasses) => patch({ sunglasses })}
          />
          <OptionPicker
            label="Necklace"
            options={NECKLACES}
            selected={draft.necklace}
            onSelect={(necklace) => patch({ necklace })}
          />
          <OptionPicker label="Pet companion" options={PETS} selected={draft.pet} onSelect={(pet) => patch({ pet })} />
          <OptionPicker
            label="Getting around"
            options={VEHICLES}
            selected={draft.vehicle}
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
