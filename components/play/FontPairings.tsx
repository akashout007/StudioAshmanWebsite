'use client'
import { useId } from 'react'
import { PAIRINGS, familiesOf, pairingById, specimenUrl, type PairingId } from '@/lib/play/fonts'

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
        These fonts are free and open source:{' '}
        {familiesOf(current).map((f, i) => (
          <span key={f}>
            {i > 0 && ' · '}
            <a href={specimenUrl(f)} target="_blank" rel="noopener noreferrer">{f}</a>
          </span>
        ))}
        .
      </p>
    </fieldset>
  )
}
