// WCAG AA across the whole colour temperature slider. Run with `npm test`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MAX_K, MIN_K, STOPS, TOKENS, contrastChecks, paletteAt } from '../lib/play/temperature.ts'

test('3500K is the studio default palette, value for value', () => {
  const warm = STOPS.find((s) => s.k === 3500)!
  assert.deepEqual(paletteAt(3500), warm.palette)
})

test('every token is defined at every stop', () => {
  for (const s of STOPS) for (const t of TOKENS) assert.match(s.palette[t], /^#[0-9a-f]{6}$/, `${t} at ${s.k}K`)
})

test('WCAG AA holds at 101 positions along the slider', () => {
  const failures: string[] = []
  for (let i = 0; i <= 100; i++) {
    const k = MIN_K + ((MAX_K - MIN_K) * i) / 100
    for (const c of contrastChecks(paletteAt(k))) {
      if (c.ratio < c.min) failures.push(`${Math.round(k)}K ${c.name}: ${c.ratio.toFixed(2)} < ${c.min}`)
    }
  }
  assert.deepEqual(failures, [])
})

test('interpolation is continuous: no token jumps between neighbouring positions', () => {
  const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16)
  for (let i = 0; i < 100; i++) {
    const a = paletteAt(MIN_K + ((MAX_K - MIN_K) * i) / 100)
    const b = paletteAt(MIN_K + ((MAX_K - MIN_K) * (i + 1)) / 100)
    for (const t of TOKENS) assert.ok(Math.abs(lum(a[t]) - lum(b[t])) < 60, `${t} jumps near position ${i}`)
  }
})
