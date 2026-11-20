'use client'
import { useId } from 'react'
import { PAIRINGS, facesOf, pairingById, specimenUrl, type PairingId } from '@/lib/play/fonts'

/** Font pairing chips: a radio group, each chip set in its own display face. */
export default function FontPairings({ value, onChange }: { value: PairingId; onChange: (id: PairingId) => void }) {
  const name = useId()
  const current = pairingById(value) ?? PAIRINGS[0]
  return (
    <fieldset className="pairings">
      <legend className="play-label">Type</legend>
      <div className="pairing-chips">
        {PAIRINGS.map((p) => (
          <label key={p.id} className={`pairing-chip${p.id === value ? ' is-on' : ''}`}>
            <input
              type="radio"
              name={name}
              value={p.id}
              checked={p.id === value}
              onChange={() => onChange(p.id)}
            />
            <span style={{ fontFamily: `var(${p.display.cssVar})` }}>{p.name}</span>
          </label>
        ))}
      </div>
      <p className="pairing-credit">
        {current.display.system ? (
          // Helvetica is commercial: it's used only where the visitor's device already has it
          <>Helvetica is a system font: Apple devices have it built in, and Arial stands in elsewhere. Nothing is downloaded.</>
        ) : (
          <>
            These fonts are free and open source:{' '}
            {facesOf(current).map((f, i) => (
              <span key={f.family}>
                {i > 0 && ' · '}
                <a href={specimenUrl(f.family)} target="_blank" rel="noopener noreferrer">{f.family}</a>
              </span>
            ))}
            {current.note ? `, ${current.note}.` : '.'}
          </>
        )}
      </p>
    </fieldset>
  )
}
