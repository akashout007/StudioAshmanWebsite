// Colour temperature for Play: five lighting stops, interpolated in OKLCH.
// Dependency-free and type-strip friendly so `node --test` can run the contrast test directly.

export const TOKENS = [
  'paper', 'surface', 'surface-raised', 'ink', 'muted', 'rule', 'rule-strong', 'control-border',
  'accent', 'accent-strong', 'accent-soft', 'accent-text', 'on-accent',
  'dark-bg', 'dark-surface', 'dark-ink',
] as const
export type Token = (typeof TOKENS)[number]
export type Palette = Record<Token, string>

export const MIN_K = 2700
export const MAX_K = 6500
export const DEFAULT_K = 3500

// 3500K is the studio's own palette, value for value.
export const STOPS: { k: number; name: string; palette: Palette }[] = [
  {
    k: 2700, name: 'Ember',
    palette: {
      'paper': '#f5ebda', 'surface': '#eee2ce', 'surface-raised': '#fbf5ea',
      'ink': '#1a110a', 'muted': '#6a5643', 'rule': '#e6d7c0', 'rule-strong': '#d3c0a3', 'control-border': '#8c7a63',
      'accent': '#c2461a', 'accent-strong': '#93330f', 'accent-soft': '#eeb08c', 'accent-text': '#a03a10', 'on-accent': '#ffffff',
      'dark-bg': '#1a110a', 'dark-surface': '#2a1e14', 'dark-ink': '#f5ebda',
    },
  },
  {
    k: 3500, name: 'Warm',
    palette: {
      'paper': '#f2efe8', 'surface': '#ebe7de', 'surface-raised': '#faf9f6',
      'ink': '#0e0e0d', 'muted': '#625e58', 'rule': '#e2ddd4', 'rule-strong': '#cdc8be', 'control-border': '#8a857d',
      'accent': '#c8502a', 'accent-strong': '#9e3d1e', 'accent-soft': '#e8b49e', 'accent-text': '#a83f1c', 'on-accent': '#ffffff',
      'dark-bg': '#0e0e0d', 'dark-surface': '#1c1c1a', 'dark-ink': '#f2efe8',
    },
  },
  {
    k: 4500, name: 'Neutral',
    palette: {
      'paper': '#f1f1ee', 'surface': '#e8e8e4', 'surface-raised': '#fafaf8',
      'ink': '#111213', 'muted': '#5c5e61', 'rule': '#dedfdb', 'rule-strong': '#c7c8c3', 'control-border': '#85878a',
      'accent': '#a65a4e', 'accent-strong': '#84453c', 'accent-soft': '#dfb5ad', 'accent-text': '#934a3f', 'on-accent': '#ffffff',
      'dark-bg': '#111213', 'dark-surface': '#1e2022', 'dark-ink': '#f1f1ee',
    },
  },
  {
    k: 5500, name: 'Daylight',
    palette: {
      'paper': '#eef1f4', 'surface': '#e4e8ec', 'surface-raised': '#f8fafc',
      'ink': '#11161d', 'muted': '#56606b', 'rule': '#d9dfe5', 'rule-strong': '#c1c9d2', 'control-border': '#7f8994',
      'accent': '#5a6aa8', 'accent-strong': '#3f4d82', 'accent-soft': '#b4bde3', 'accent-text': '#46558f', 'on-accent': '#ffffff',
      'dark-bg': '#11161d', 'dark-surface': '#1d2430', 'dark-ink': '#eef1f4',
    },
  },
  {
    k: 6500, name: 'Cool',
    palette: {
      'paper': '#eaf0f6', 'surface': '#dfe7ef', 'surface-raised': '#f6f9fc',
      'ink': '#0d1624', 'muted': '#4f5f72', 'rule': '#d4dde8', 'rule-strong': '#bac7d5', 'control-border': '#7a8899',
      'accent': '#1f6aa6', 'accent-strong': '#17507f', 'accent-soft': '#9ec8ea', 'accent-text': '#195b8f', 'on-accent': '#ffffff',
      'dark-bg': '#0d1624', 'dark-surface': '#192536', 'dark-ink': '#eaf0f6',
    },
  },
]

/** Lighting name for a temperature: the nearest stop. */
export function temperatureName(k: number) {
  return STOPS.reduce((best, s) => (Math.abs(s.k - k) < Math.abs(best.k - k) ? s : best)).name
}

// ── OKLCH (Björn Ottosson's OKLab) ──

type Rgb = [number, number, number]
type Lch = [number, number, number]

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const fromLinear = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as Rgb
}
export function rgbToHex(rgb: Rgb) {
  return '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, '0')).join('')
}

function rgbToOklch([r, g, b]: Rgb): Lch {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)]
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360]
}

function oklchToLinear([L, C, H]: Lch): Rgb {
  const A = C * Math.cos((H * Math.PI) / 180)
  const B = C * Math.sin((H * Math.PI) / 180)
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const inGamut = (rgb: Rgb) => rgb.every((c) => c >= -1e-4 && c <= 1 + 1e-4)

/** OKLCH to sRGB, reducing chroma (keeping lightness and hue) until the colour fits. */
function oklchToRgb(lch: Lch): Rgb {
  let lin = oklchToLinear(lch)
  if (!inGamut(lin)) {
    let lo = 0, hi = lch[1]
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2
      if (inGamut(oklchToLinear([lch[0], mid, lch[2]]))) lo = mid
      else hi = mid
    }
    lin = oklchToLinear([lch[0], lo, lch[2]])
  }
  return lin.map((c) => fromLinear(Math.min(1, Math.max(0, c)))) as Rgb
}

function mixOklch(a: string, b: string, t: number) {
  const A = rgbToOklch(hexToRgb(a))
  const B = rgbToOklch(hexToRgb(b))
  // Near-grey colours have no meaningful hue; borrow the other end's
  const hA = A[1] < 0.002 ? B[2] : A[2]
  const hB = B[1] < 0.002 ? A[2] : B[2]
  let dh = hB - hA
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360
  return rgbToHex(oklchToRgb([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, (hA + dh * t + 360) % 360]))
}

/** The full palette at any temperature, interpolated in OKLCH between the two nearest stops. */
export function paletteAt(kelvin: number): Palette {
  const k = Math.min(MAX_K, Math.max(MIN_K, kelvin))
  const exact = STOPS.find((s) => s.k === k)
  if (exact) return { ...exact.palette }
  const i = STOPS.findIndex((s) => s.k > k)
  const lo = STOPS[i - 1], hi = STOPS[i]
  const t = (k - lo.k) / (hi.k - lo.k)
  const out = {} as Palette
  for (const tok of TOKENS) out[tok] = mixOklch(lo.palette[tok], hi.palette[tok], t)
  return out
}

// ── WCAG contrast ──

const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
/** A colour at `alpha` over a background, as the browser composites color-mix(… X%, transparent). */
export function over(fg: string, alpha: number, bg: string) {
  const F = hexToRgb(fg), B = hexToRgb(bg)
  return rgbToHex(F.map((c, i) => c * alpha + B[i] * (1 - alpha)) as Rgb)
}

/** Every pairing the site actually puts on screen, with the WCAG minimum it must meet. */
export function contrastChecks(p: Palette) {
  return [
    // Body and small text: 4.5:1
    { name: 'ink on paper', ratio: contrast(p.ink, p.paper), min: 4.5 },
    { name: 'ink on surface', ratio: contrast(p.ink, p.surface), min: 4.5 },
    { name: 'ink on surface-raised', ratio: contrast(p.ink, p['surface-raised']), min: 4.5 },
    { name: 'muted on paper', ratio: contrast(p.muted, p.paper), min: 4.5 },
    { name: 'muted on surface', ratio: contrast(p.muted, p.surface), min: 4.5 },
    { name: 'muted on surface-raised', ratio: contrast(p.muted, p['surface-raised']), min: 4.5 },
    { name: 'accent-text on paper', ratio: contrast(p['accent-text'], p.paper), min: 4.5 },
    { name: 'accent-text on surface', ratio: contrast(p['accent-text'], p.surface), min: 4.5 },
    { name: 'accent-text on surface-raised', ratio: contrast(p['accent-text'], p['surface-raised']), min: 4.5 },
    { name: 'dark-ink on dark-bg', ratio: contrast(p['dark-ink'], p['dark-bg']), min: 4.5 },
    { name: 'dark-ink on dark-surface', ratio: contrast(p['dark-ink'], p['dark-surface']), min: 4.5 },
    { name: 'dark-ink 55% on dark-bg (secondary text on dark)', ratio: contrast(over(p['dark-ink'], 0.55, p['dark-bg']), p['dark-bg']), min: 4.5 },
    { name: 'accent-soft on dark-bg', ratio: contrast(p['accent-soft'], p['dark-bg']), min: 4.5 },
    { name: 'dark-ink on accent-strong (CTA band)', ratio: contrast(p['dark-ink'], p['accent-strong']), min: 4.5 },
    { name: 'on-accent on accent', ratio: contrast(p['on-accent'], p.accent), min: 4.5 },
    // Large text and UI component boundaries: 3:1
    { name: 'accent on paper (large type)', ratio: contrast(p.accent, p.paper), min: 3 },
    { name: 'accent on dark-bg (large type)', ratio: contrast(p.accent, p['dark-bg']), min: 3 },
    { name: 'control-border on paper (form fields)', ratio: contrast(p['control-border'], p.paper), min: 3 },
    { name: 'ink on paper (button outlines)', ratio: contrast(p.ink, p.paper), min: 3 },
  ]
}
