import { DEFAULT_PAIRING, PAIRINGS } from '@/lib/play/fonts'

const ids = PAIRINGS.map((p) => p.id).filter((id) => id !== DEFAULT_PAIRING).join('|')

// Inline <head> script: re-applies saved Play choices before first paint, so there's no flash of the
// default palette or fonts. Only well-formed colour variables and known pairing ids are applied.
// It also marks a first visit (hero-intro), so the homepage chip can make its one-time entrance.
export const PREPAINT_SCRIPT = `try{if(!localStorage.getItem('ashman-hero-intro'))document.documentElement.classList.add('hero-intro')}catch(e){}try{var s=JSON.parse(localStorage.getItem('ashman-play')||'null');if(s){var r=document.documentElement;if(s.v)for(var k in s.v){if(/^--color-[a-z-]+$/.test(k)&&/^#[0-9a-f]{6}$/i.test(s.v[k]))r.style.setProperty(k,s.v[k])}if(/^(${ids})$/.test(s.f))r.dataset.fonts=s.f}}catch(e){}`
