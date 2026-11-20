'use client'
import { useId } from 'react'
import { DEFAULT_PAIRING, PAIRINGS, describePairing, familiesOf, pairingById, specimenUrl, type PairingId } from '@/lib/play/fonts'

/** A font name set in itself; names never break in the middle. */
const Name = ({ family, cssVar }: { family: string; cssVar: string }) => (
  <span className="pairing-name" style={{ fontFamily: `var(${cssVar})` }}>{family}</span>
)

/** Font pairing chips, named only by their fonts: a radio group, each name set in its own face. */
export default function FontPairings({ value, onChange }: { value: PairingId; onChange: (id: PairingId) => void }) {
  const name = useId()
  const current = pairingById(value) ?? PAIRINGS[0]
  const families = familiesOf(current)
  const tail = families.length === 1 ? 'free and open source' : families.length === 2 ? 'both free and open source' : 'all free and open source'

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
              aria-label={describePairing(p)}
              onChange={() => onChange(p.id)}
            />
            <span className="pairing-pair" aria-hidden="true">
              <Name {...p.display} /> <span className="pairing-plus">+</span> <Name {...p.body} />
            </span>
            <span className="pairing-labels" aria-hidden="true">
              labels in <Name {...p.label} />
              {p.id === DEFAULT_PAIRING && <span className="pairing-default">Default</span>}
            </span>
          </label>
        ))}
      </div>
      <p className="pairing-credit">
        Now using{' '}
        {families.map((f, i) => (
          <span key={f}>
            {i > 0 && (i === families.length - 1 ? ' and ' : ', ')}
            <a href={specimenUrl(f)} target="_blank" rel="noopener noreferrer">
              {f}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        ))}
        , {tail}.
      </p>
    </fieldset>
  )
}
