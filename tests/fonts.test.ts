import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DEFAULT_PAIRING, PAIRINGS } from '../lib/play/fonts.ts'

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')

test('every pairing other than the default has a stylesheet rule setting all three roles', () => {
  for (const p of PAIRINGS.filter((p) => p.id !== DEFAULT_PAIRING)) {
    const m = css.match(new RegExp(`html\\[data-fonts="${p.id}"\\] \\{([^}]*)\\}`))
    assert.ok(m, `missing html[data-fonts="${p.id}"]`)
    for (const role of ['display', 'body', 'label']) assert.match(m![1], new RegExp(`--font-${role}:`), `${p.id} sets --font-${role}`)
  }
})

test('every face points at a CSS variable the site defines', () => {
  const fontsTs = readFileSync(new URL('../app/fonts.ts', import.meta.url), 'utf8')
  for (const p of PAIRINGS) for (const f of [p.display, p.body, p.label]) {
    const defined = fontsTs.includes(`variable: '${f.cssVar}'`) || css.includes(`${f.cssVar}:`)
    assert.ok(defined, `${p.id}: ${f.family} uses ${f.cssVar}, which nothing defines`)
  }
})
