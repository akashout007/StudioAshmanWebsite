'use client'
import { useId } from 'react'
import { MAX_K, MIN_K, STOPS, temperatureName } from '@/lib/play/temperature'

/** One slider, labelled like lighting: 2700K Ember to 6500K Cool. */
export default function TemperatureSlider({ value, onChange }: { value: number; onChange: (k: number) => void }) {
  const id = useId()
  return (
    <div className="temp">
      <div className="temp-head">
        <label htmlFor={id} className="play-label">Light</label>
        <output htmlFor={id} className="temp-value" aria-hidden="true">
          {value}K <span>{temperatureName(value)}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="temp-range"
        min={MIN_K}
        max={MAX_K}
        step={100}
        value={value}
        aria-valuetext={`${value} Kelvin, ${temperatureName(value)}`}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <ol className="temp-stops" aria-hidden="true">
        {STOPS.map((s) => (
          <li key={s.k} style={{ left: `${((s.k - MIN_K) / (MAX_K - MIN_K)) * 100}%` }}>
            <b>{s.k}K</b> {s.name}
          </li>
        ))}
      </ol>
    </div>
  )
}
