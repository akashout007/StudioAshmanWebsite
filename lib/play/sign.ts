// "Make your sign": draws a wayfinding-style sign on a canvas in the visitor's current colours and fonts.
// Everything happens on the device; the text is only ever drawn with fillText, never inserted as HTML.

export type SignStyle = 'door' | 'directional' | 'street'
export type Arrow = 'left' | 'right' | 'up'
export type SignFormat = 'wallpaper' | 'post' | 'square'

export const FORMATS: Record<SignFormat, { label: string; w: number; h: number }> = {
  wallpaper: { label: 'Phone wallpaper', w: 1170, h: 2532 },
  post: { label: 'Instagram post', w: 1080, h: 1350 },
  square: { label: 'Square', w: 1080, h: 1080 },
}

export const STYLES: Record<SignStyle, string> = { door: 'Door plate', directional: 'Directional', street: 'Street sign' }

/** Which role of the current pairing each sign is set in: the door plate in the heading font, and so on. */
export const SIGN_ROLE: Record<SignStyle, 'display' | 'body' | 'label'> = { door: 'display', directional: 'body', street: 'label' }

type Look = {
  colors: Record<'paper' | 'surface' | 'ink' | 'muted' | 'accent' | 'accentStrong' | 'onAccent' | 'darkBg' | 'darkSurface' | 'darkInk' | 'accentSoft' | 'brandInk' | 'brandAccent', string>
  fonts: { display: string; body: string; label: string; wordmark: string }
  displayWeight: number
}

/** The visitor's current look, read from the live CSS variables (so it follows Play's choices). */
export function readLook(): Look {
  const cs = getComputedStyle(document.documentElement)
  const v = (name: string) => cs.getPropertyValue(name).trim()
  const fonts = document.documentElement.dataset.fonts
  return {
    colors: {
      paper: v('--color-paper'), surface: v('--color-surface'), ink: v('--color-ink'), muted: v('--color-muted'),
      accent: v('--color-accent'), accentStrong: v('--color-accent-strong'), onAccent: v('--color-on-accent'),
      darkBg: v('--color-dark-bg'), darkSurface: v('--color-dark-surface'), darkInk: v('--color-dark-ink'),
      accentSoft: v('--color-accent-soft'), brandInk: v('--brand-ink'), brandAccent: v('--brand-accent'),
    },
    fonts: { display: v('--font-display'), body: v('--font-body'), label: v('--font-label'), wordmark: v('--font-wordmark') },
    // Instrument Serif has a single weight; draw it as designed rather than faux-bold
    displayWeight: fonts === 'instrument-serif-manrope' ? 400 : 800,
  }
}

/** Waits until the faces the sign needs are loaded, so the export never falls back to a system font. */
export async function loadSignFonts(look: Look, text: string) {
  const sample = `${text || 'Your name'} Room 01 ashman.studio Wayfinding`
  await Promise.all([
    document.fonts.load(`${look.displayWeight} 100px ${look.fonts.display}`, sample),
    document.fonts.load(`700 100px ${look.fonts.body}`, sample),
    document.fonts.load(`700 100px ${look.fonts.label}`, sample),
    document.fonts.load(`400 100px ${look.fonts.body}`, sample),
    document.fonts.load(`800 100px ${look.fonts.wordmark}`, 'ashman.studio'),
  ])
}

type Ctx = CanvasRenderingContext2D

/** Largest size (between min and max) at which the text fits; wraps to two lines if it can't. */
function fitText(ctx: Ctx, text: string, font: (px: number) => string, maxWidth: number, max: number, min: number) {
  for (let px = max; px >= min; px -= 2) {
    ctx.font = font(px)
    if (ctx.measureText(text).width <= maxWidth) return { px, lines: [text] }
  }
  // Too long for one line at the minimum: split at the space nearest the middle
  const words = text.split(' ')
  if (words.length > 1) {
    let best = 1, bestDiff = Infinity
    for (let i = 1; i < words.length; i++) {
      const diff = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length)
      if (diff < bestDiff) { bestDiff = diff; best = i }
    }
    const lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')]
    for (let px = max; px >= min * 0.7; px -= 2) {
      ctx.font = font(px)
      if (lines.every((l) => ctx.measureText(l).width <= maxWidth)) return { px, lines }
    }
    return { px: Math.round(min * 0.7), lines }
  }
  ctx.font = font(min)
  const scale = maxWidth / ctx.measureText(text).width
  return { px: Math.floor(min * Math.min(1, scale)), lines: [text] }
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawLines(ctx: Ctx, lines: string[], cx: number, cy: number, px: number, lineHeight = 1.05) {
  const step = px * lineHeight
  const top = cy - (step * (lines.length - 1)) / 2
  lines.forEach((l, i) => ctx.fillText(l, cx, top + i * step))
}

function drawArrow(ctx: Ctx, dir: Arrow, cx: number, cy: number, size: number) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(dir === 'left' ? Math.PI : dir === 'up' ? -Math.PI / 2 : 0)
  const s = size / 2, shaft = s * 0.26
  ctx.beginPath()
  ctx.moveTo(-s, -shaft)
  ctx.lineTo(s * 0.12, -shaft)
  ctx.lineTo(s * 0.12, -s * 0.72)
  ctx.lineTo(s, 0)
  ctx.lineTo(s * 0.12, s * 0.72)
  ctx.lineTo(s * 0.12, shaft)
  ctx.lineTo(-s, shaft)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawSign(canvas: HTMLCanvasElement, opts: { text: string; style: SignStyle; arrow: Arrow; format: SignFormat; look: Look }) {
  const { w: W, h: H } = FORMATS[opts.format]
  if (canvas.width !== W) canvas.width = W
  if (canvas.height !== H) canvas.height = H
  const ctx = canvas.getContext('2d')!
  const { colors: c, fonts: f, displayWeight } = opts.look
  const u = W / 1080
  const text = opts.text || 'Your name'
  const tall = opts.format === 'wallpaper'
  const cy = tall ? H * 0.44 : opts.format === 'post' ? H * 0.45 : H * 0.46

  // The wall
  ctx.fillStyle = c.paper
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (opts.style === 'door') {
    const pw = W * 0.78, ph = pw * 0.52, px = (W - pw) / 2, py = cy - ph / 2
    ctx.fillStyle = c.darkBg
    roundRect(ctx, px, py, pw, ph, 10 * u)
    ctx.fill()
    ctx.strokeStyle = c.darkSurface
    ctx.lineWidth = 3 * u
    roundRect(ctx, px + 22 * u, py + 22 * u, pw - 44 * u, ph - 44 * u, 4 * u)
    ctx.stroke()
    // Screws
    ctx.fillStyle = c.darkSurface
    for (const [sx, sy] of [[px + 40 * u, py + 40 * u], [px + pw - 40 * u, py + 40 * u], [px + 40 * u, py + ph - 40 * u], [px + pw - 40 * u, py + ph - 40 * u]]) {
      ctx.beginPath(); ctx.arc(sx, sy, 7 * u, 0, Math.PI * 2); ctx.fill()
    }
    // "Room 01" line with an accent rule
    ctx.font = `700 ${30 * u}px ${f.label}`
    ctx.letterSpacing = `${6 * u}px`
    ctx.fillStyle = c.accentSoft
    ctx.textAlign = 'left'
    ctx.fillText('ROOM 01', px + 96 * u, py + 92 * u)
    ctx.fillRect(px + 60 * u, py + 92 * u - 1.5 * u, 24 * u, 3 * u)
    ctx.letterSpacing = '0px'
    ctx.textAlign = 'center'
    const fit = fitText(ctx, text, (p) => `${displayWeight} ${p}px ${f.display}`, pw - 140 * u, 150 * u, 64 * u)
    ctx.font = `${displayWeight} ${fit.px}px ${f.display}`
    ctx.fillStyle = c.darkInk
    drawLines(ctx, fit.lines, W / 2, py + ph * 0.58, fit.px)
  }

  if (opts.style === 'directional') {
    const pw = W * 0.88, ph = 300 * u, px = (W - pw) / 2, py = cy - ph / 2
    // Hanging rods, as on an airport sign
    ctx.fillStyle = c.muted
    ctx.fillRect(px + pw * 0.2 - 3 * u, 0, 6 * u, py)
    ctx.fillRect(px + pw * 0.8 - 3 * u, 0, 6 * u, py)
    ctx.fillStyle = c.darkBg
    ctx.fillRect(px, py, pw, ph)
    const tile = ph - 60 * u
    const arrowLeft = opts.arrow !== 'right'
    const tx = arrowLeft ? px + 30 * u : px + pw - 30 * u - tile
    ctx.fillStyle = c.accent
    ctx.fillRect(tx, py + 30 * u, tile, tile)
    ctx.fillStyle = c.onAccent
    drawArrow(ctx, opts.arrow, tx + tile / 2, py + ph / 2, tile * 0.62)
    const textLeft = arrowLeft ? tx + tile + 40 * u : px + 40 * u
    const textRight = arrowLeft ? px + pw - 40 * u : tx - 40 * u
    const fit = fitText(ctx, text, (p) => `700 ${p}px ${f.body}`, textRight - textLeft, 112 * u, 52 * u)
    ctx.font = `700 ${fit.px}px ${f.body}`
    ctx.fillStyle = c.darkInk
    ctx.textAlign = 'left'
    const step = fit.px * 1.05
    fit.lines.forEach((l, i) => ctx.fillText(l, textLeft, py + ph / 2 - (step * (fit.lines.length - 1)) / 2 + i * step))
    ctx.textAlign = 'center'
  }

  if (opts.style === 'street') {
    const pw = W * 0.84, ph = 300 * u, px = (W - pw) / 2, py = cy - ph / 2
    // The post
    ctx.fillStyle = c.muted
    ctx.fillRect(W / 2 - 13 * u, py + ph, 26 * u, H - (py + ph))
    ctx.fillStyle = c.accentStrong
    roundRect(ctx, px, py, pw, ph, 40 * u)
    ctx.fill()
    ctx.strokeStyle = c.darkInk
    ctx.lineWidth = 8 * u
    roundRect(ctx, px + 20 * u, py + 20 * u, pw - 40 * u, ph - 40 * u, 26 * u)
    ctx.stroke()
    const fit = fitText(ctx, text, (p) => `700 ${p}px ${f.label}`, pw - 120 * u, 130 * u, 56 * u)
    ctx.font = `700 ${fit.px}px ${f.label}`
    ctx.fillStyle = c.darkInk
    drawLines(ctx, fit.lines, W / 2, py + ph / 2, fit.px)
  }

  // Footer: the wordmark in its own fixed type and colours, then the line
  const fy = H - (tall ? 190 : 72) * u
  const mark = 'ashman', dot = '.', studio = 'studio'
  const tail = '  ·  Wayfinding & Spatial Branding'
  ctx.textBaseline = 'middle'
  ctx.font = `800 ${30 * u}px ${f.wordmark}`
  const wMark = ctx.measureText(mark).width, wDot = ctx.measureText(dot).width, wStudio = ctx.measureText(studio).width
  ctx.font = `400 ${26 * u}px ${f.body}`
  const wTail = ctx.measureText(tail).width
  // A paper band keeps the footer readable where the street-sign post runs behind it
  ctx.fillStyle = c.paper
  const total = wMark + wDot + wStudio + wTail
  ctx.fillRect(W / 2 - total / 2 - 24 * u, fy - 30 * u, total + 48 * u, 60 * u)
  let x = W / 2 - total / 2
  ctx.textAlign = 'left'
  ctx.font = `800 ${30 * u}px ${f.wordmark}`
  ctx.fillStyle = c.brandInk; ctx.fillText(mark, x, fy); x += wMark
  ctx.fillStyle = c.brandAccent; ctx.fillText(dot, x, fy); x += wDot
  ctx.fillStyle = c.brandInk; ctx.fillText(studio, x, fy); x += wStudio
  ctx.font = `400 ${26 * u}px ${f.body}`
  ctx.fillStyle = c.muted
  ctx.fillText(tail, x, fy)
}
