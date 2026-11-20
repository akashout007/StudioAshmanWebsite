// The homepage chip is 92% paper over photography. Its text must hold WCAG AA over any photo pixel,
// at every Play colour temperature. Worst cases are pure black and pure white behind the glass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { MAX_K, MIN_K, contrast, over, paletteAt } from '../lib/play/temperature.ts'

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')
const glass = css.match(/\.hero-chip::before \{[^}]*color-mix\(in srgb, var\(--color-paper\) (\d+)%/)
const ALPHA = glass ? Number(glass[1]) / 100 : NaN

test('the chip glass opacity is read from the stylesheet', () => {
  assert.ok(ALPHA > 0 && ALPHA <= 1, `found ${ALPHA}`)
})

test('chip text stays AA over the darkest and brightest photo pixels at all 101 slider positions', () => {
  const failures: string[] = []
  for (let i = 0; i <= 100; i++) {
    const k = MIN_K + ((MAX_K - MIN_K) * i) / 100
    const p = paletteAt(k)
    for (const photo of ['#000000', '#ffffff']) {
      const chip = over(p.paper, ALPHA, photo)
      for (const [name, fg] of [['ink', p.ink], ['accent-text (the words)', p['accent-text']]] as const) {
        const r = contrast(fg, chip)
        if (r < 4.5) failures.push(`${Math.round(k)}K ${name} over ${photo}: ${r.toFixed(2)}`)
      }
    }
  }
  assert.deepEqual(failures, [])
})
