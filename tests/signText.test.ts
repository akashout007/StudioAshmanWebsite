import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SIGN_MAX, checkSignText, isBlocked, signFileName } from '../lib/play/signText.ts'

test('blocks offensive words, any case, with leetspeak, separators and stretched letters', () => {
  for (const t of ['fuck', 'FUCK off', 'f.u.c.k', 'f u c k', 'fuuuuck', 'sh1t', 'SHIT', 's h i t', 'b1tch', 'a$$hole', 'Chutiya', 'madarch0d']) {
    assert.equal(isBlocked(t), true, t)
  }
})

test('allows ordinary names and words that merely contain a blocked word', () => {
  for (const t of ['Akash Manna', 'Scunthorpe', 'Niger Delta', 'Class of 2026', 'Grape Street', 'Rapeseed Farm', 'Cocktail Bar', 'Shitake', 'Room 101', 'Café Lumière', 'Dickens Road']) {
    assert.equal(isBlocked(t), false, t)
  }
})

test('blocked text gets the friendly message', () => {
  const r = checkSignText('  F.u.c.k  ')
  assert.equal(r.ok, false)
  assert.equal(!r.ok && r.message, "Let's keep it friendly.")
})

test('trims, collapses whitespace and caps the length', () => {
  const r = checkSignText('   Hello    world   ')
  assert.deepEqual(r, { ok: true, text: 'Hello world' })
  assert.equal(checkSignText('x'.repeat(40)).text.length, SIGN_MAX)
})

test('rejects emoji and markup characters, never passing them through', () => {
  for (const t of ['Hi 👋', '<b>hi</b>', 'a"b', 'x{y}']) assert.equal(checkSignText(t).ok, false, t)
})

test('file names are safe', () => {
  assert.equal(signFileName('Café Lumière!'), 'ashman-sign-cafe-lumiere.png')
  assert.equal(signFileName('...'), 'ashman-sign-sign.png')
  assert.equal(signFileName('Akash', { w: 1080, h: 1350 }), 'ashman-sign-akash-1080x1350.png')
})
