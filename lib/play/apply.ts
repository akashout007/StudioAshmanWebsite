import { TOKENS, paletteAt } from '@/lib/play/temperature'

/** CSS variables for a temperature, ready to set on <html> (and to store for the pre-paint script). */
export function temperatureVars(kelvin: number): Record<string, string> {
  const p = paletteAt(kelvin)
  return Object.fromEntries(TOKENS.map((t) => [`--color-${t}`, p[t]]))
}

/** Sets the colours on <html>; `animate` turns on the ~300ms fade (skipped under reduced motion by CSS). */
export function applyTemperature(kelvin: number, animate = true) {
  const root = document.documentElement
  root.classList.toggle('play-tint', animate)
  for (const [name, value] of Object.entries(temperatureVars(kelvin))) root.style.setProperty(name, value)
}

/** Back to the stylesheet's own palette (the studio default). */
export function clearTemperature() {
  const root = document.documentElement
  for (const t of TOKENS) root.style.removeProperty(`--color-${t}`)
}

/** Switches the type pairing; the studio default is the stylesheet's own fonts. */
export function applyFonts(id: string) {
  const root = document.documentElement
  if (id === 'studio') delete root.dataset.fonts
  else root.dataset.fonts = id
}
