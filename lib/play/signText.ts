// Sign text rules for "Make your sign": length, allowed characters and a small local blocklist.
// Pure functions, run on the visitor's device only; nothing is sent anywhere.

export const SIGN_MAX = 22

// Latin letters (the fonts are Latin-subset), digits, spaces and basic punctuation. No emoji.
const ALLOWED = /^[A-Za-zÀ-ɏ0-9 .,'’&!?:;()\-–—/#@+]*$/

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i', '|': 'i', '+': 't' }

// Matched anywhere, even inside other words: unambiguous slurs and profanity (English and Hindi)
const ANYWHERE = ['fuck', 'nigger', 'nigga', 'faggot', 'chutiya', 'chutia', 'madarchod', 'behenchod', 'bhenchod', 'bhosdike', 'bhosdi']
// Matched only as whole words, so names and ordinary words that contain them stay allowed
const WHOLE_WORD = ['shit', 'cunt', 'bitch', 'bitches', 'slut', 'whore', 'pussy', 'asshole', 'bastard', 'rape', 'rapist', 'nazi', 'hitler', 'kkk', 'retard', 'fag', 'gandu', 'lund', 'harami', 'porn', 'wanker', 'twat', 'prick']

// Each letter may repeat ("fuuuck"); built once
const loose = (w: string) => w.split('').map((c) => `${c}+`).join('')
const ANYWHERE_RE = new RegExp(ANYWHERE.map(loose).join('|'))
const WHOLE_RE = new RegExp(`^(?:${WHOLE_WORD.map(loose).join('|')})$`)

/** Lowercase, strip accents, and undo basic leetspeak. */
function normalise(text: string) {
  return text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[0134578@$!|+]/g, (c) => LEET[c] ?? c)
}

export function isBlocked(text: string) {
  const n = normalise(text)
  const squashed = n.replace(/[^a-z]/g, '') // catches "f.u.c.k" and "f u c k"
  if (ANYWHERE_RE.test(squashed)) return true
  if (n.split(/[^a-z]+/).some((w) => w && WHOLE_RE.test(w))) return true
  // Single letters spelled out with separators: "s h i t", "s.h.i.t"
  const letters = n.split(/[^a-z]+/).filter(Boolean)
  return letters.length > 1 && letters.every((w) => w.length === 1) && WHOLE_RE.test(letters.join(''))
}

export type SignCheck = { ok: true; text: string } | { ok: false; text: string; message: string }

/** Trims, caps and checks the visitor's text. The result is only ever drawn as text on a canvas. */
export function checkSignText(input: string): SignCheck {
  const text = input.replace(/\s+/g, ' ').trim().slice(0, SIGN_MAX)
  if (!ALLOWED.test(text)) return { ok: false, text, message: 'Use letters, numbers and basic punctuation.' }
  if (isBlocked(text)) return { ok: false, text, message: "Let's keep it friendly." }
  return { ok: true, text }
}

/** File-name-safe: ashman-sign-<slug>-<w>x<h>.png, so each size downloads as its own file */
export function signFileName(text: string, size?: { w: number; h: number }) {
  const plain = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  const slug = plain.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30)
  return `ashman-sign-${slug || 'sign'}${size ? `-${size.w}x${size.h}` : ''}.png`
}
