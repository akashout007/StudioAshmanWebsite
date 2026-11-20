#!/usr/bin/env node
// Layout regression check, run against a running site: `npm run build && npm start`, then
// `npm run check:layout` (BASE_URL defaults to http://localhost:3000; CHROME_PATH to macOS Chrome).
//
// 1. Hero chip: every font pairing × every service and sector word × 375/768/1024/1440px.
//    No two chip parts may intersect, nothing in the chip may overflow its own box, and the chip must
//    stay inside the hero. Run with reduced motion (instant swaps), then once with real flips.
// 2. Site-wide sweep per pairing: headings, nav, buttons, filter chips, footer and hero caption must not
//    overflow their boxes, and no page may scroll sideways.
import { spawn } from 'node:child_process'
import { PAIRINGS, DEFAULT_PAIRING } from '../lib/play/fonts.ts'
import { SECTORS, SERVICES } from '../lib/site.ts'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9555
const WIDTHS = [375, 768, 1024, 1440]
const PAGES = ['/', '/work', '/studio', '/contact', '/privacy', '/work/regency-hospital']
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(CHROME, ['--headless=new', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=/tmp/ashman-layout-${process.pid}`, 'about:blank'], { stdio: 'ignore' })
for (let i = 0; i < 80; i++) { try { await fetch(`http://127.0.0.1:${PORT}/json`); break } catch { await sleep(250) } }
const page = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? 'evaluate failed')
  return r.result.result.value
}
const open = async (path, width, reduce) => {
  await send('Emulation.setDeviceMetricsOverride', { width, height: width < 600 ? 812 : 900, deviceScaleFactor: 1, mobile: width < 600 })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' }] })
  await send('Page.navigate', { url: BASE + path })
  await sleep(1800)
  await evaluate(`localStorage.setItem('ashman-hero-intro', '1'); localStorage.setItem('ashman-play-tip', '1'); 1`)
}
const setPairing = (pid) => evaluate(`(async () => {
  const r = document.documentElement
  if (${JSON.stringify(pid)} === ${JSON.stringify(DEFAULT_PAIRING)}) delete r.dataset.fonts; else r.dataset.fonts = ${JSON.stringify(pid)}
  await document.fonts.ready; await new Promise((x) => setTimeout(x, 250)); await document.fonts.ready; return 1 })()`)

// Lock a word through the real menu (kind 0 = service, 1 = sector)
const pick = (kind, name, settle) => evaluate(`(async () => {
  const words = document.querySelectorAll('.chip-word'); words[${kind}].click()
  await new Promise((x) => setTimeout(x, 80))
  const li = [...document.querySelectorAll('.chip-panel li')].find((l) => l.querySelector('.chip-option-name').textContent === ${JSON.stringify(name)})
  if (!li) return 'missing option ' + ${JSON.stringify(name)}
  li.click(); await new Promise((x) => setTimeout(x, ${settle})); return 'ok' })()`)

const CHIP_CHECK = `(() => {
  const out = []
  const r = (el) => el.getBoundingClientRect()
  const hit = (a, b) => a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5
  const chip = document.querySelector('.hero-chip'), stage = document.querySelector('.hero-stage')
  const parts = [...chip.querySelectorAll('.hero-chip-text, .chip-word')]
  for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) if (hit(r(parts[i]), r(parts[j]))) out.push('overlap: "' + parts[i].textContent.trim() + '" × "' + parts[j].textContent.trim() + '"')
  for (const w of chip.querySelectorAll('.chip-word')) {
    const flap = w.querySelector('.flap'), caret = w.querySelector('.chip-caret'), letters = w.querySelector('.flap-chars')
    if (hit(r(flap), r(caret))) out.push('word overlaps caret: ' + flap.textContent.trim())
    if (r(letters).width > r(flap).width + 0.5) out.push('letters wider than their box: ' + letters.textContent + ' ' + r(letters).width.toFixed(1) + ' > ' + r(flap).width.toFixed(1))
  }
  // (.sr-only text is a deliberate 1px box)
  for (const el of chip.querySelectorAll('*:not(.sr-only)')) if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) out.push('scrolls: ' + el.className)
  const c = r(chip), s = r(stage)
  if (c.left < s.left - 0.5 || c.right > s.right + 0.5 || c.top < s.top - 0.5 || c.bottom > s.bottom + 0.5) out.push('chip outside the hero')
  return out
})()`

// Open each menu and check its options fit and the panel stays on screen
const PANEL_CHECK = (kind) => `(async () => {
  const out = []
  document.querySelectorAll('.chip-word')[${kind}].click()
  await new Promise((x) => setTimeout(x, 150))
  const panel = document.querySelector('.chip-panel')
  if (!panel) return ['menu did not open']
  const b = panel.getBoundingClientRect()
  if (b.left < -0.5 || b.right > innerWidth + 0.5 || b.top < -0.5 || b.bottom > innerHeight + 0.5) out.push('menu off screen')
  for (const li of panel.querySelectorAll('li')) {
    for (const el of [li, ...li.querySelectorAll('span')]) if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) out.push('menu option overflows: ' + li.textContent)
    const n = li.querySelector('.chip-option-name').getBoundingClientRect(), c = li.querySelector('.chip-option-count').getBoundingClientRect()
    if (n.right > c.left + 0.5 && n.top < c.bottom && c.top < n.bottom) out.push('menu name hits its count: ' + li.textContent)
  }
  document.querySelectorAll('.chip-word')[${kind}].click()
  await new Promise((x) => setTimeout(x, 200))
  return out
})()`

const SWEEP = `(() => {
  const out = []
  const sel = 'h1, h2, h3, nav a, nav button, .btn-primary, .btn-outline, .btn-whatsapp, .filter-btn, footer a, footer p, .hero-caption, .hero-title, .hero-line, .hero-bars, .disc-item, .disc-name, .proj-title, .play-button, .mobile-services a'
  // Rows that deliberately scroll sideways on phones (e.g. the /work filter chips) may run past the edge
  const inScroller = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll') return true } return false }
  for (const el of document.querySelectorAll(sel)) {
    if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue
    if (el.closest('.sr-only')) continue
    const b = el.getBoundingClientRect()
    if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) out.push('overflows its box: ' + el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0] + ' "' + el.textContent.trim().slice(0, 30) + '"')
    if (b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && !inScroller(el)) out.push('off screen: ' + el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 30) + '"')
  }
  if (document.documentElement.scrollWidth > innerWidth) out.push('page scrolls sideways (' + document.documentElement.scrollWidth + ' > ' + innerWidth + ')')
  return out
})()`

const failures = []
let checks = 0
const record = (where, problems) => { checks++; for (const p of problems) failures.push(`${where}: ${p}`) }
const serviceWords = SERVICES.map((s) => s.chip)
const sectorNames = SECTORS.map((s) => s.name)

// 1a. Every pairing × word × width, instant swaps
for (const width of WIDTHS) {
  await open('/', width, true)
  for (const p of PAIRINGS) {
    await setPairing(p.id)
    record(`chip ${width}px ${p.id} (slide words)`, await evaluate(CHIP_CHECK))
    record(`menu ${width}px ${p.id} service`, await evaluate(PANEL_CHECK(0)))
    record(`menu ${width}px ${p.id} sector`, await evaluate(PANEL_CHECK(1)))
    for (const w of serviceWords) { await pick(0, w, 120); record(`chip ${width}px ${p.id} service "${w}"`, await evaluate(CHIP_CHECK)) }
    await pick(0, 'Everything', 120)
    for (const s of sectorNames) { await pick(1, s, 120); record(`chip ${width}px ${p.id} sector "${s}"`, await evaluate(CHIP_CHECK)) }
    await pick(1, 'Every sector', 120)
  }
}
// 1b. Real flips at desktop and phone: check after each flip has settled and released its width
for (const width of [1440, 375]) {
  await open('/', width, false)
  for (const p of PAIRINGS) {
    await setPairing(p.id)
    for (const w of ['Wayfinding', 'Identity', 'Collateral']) { await pick(0, w, 1100); record(`flip ${width}px ${p.id} "${w}"`, await evaluate(CHIP_CHECK)) }
    await pick(0, 'Everything', 900)
  }
}
// 2. Site-wide sweep per pairing
for (const path of PAGES) {
  for (const width of [375, 1440]) {
    await open(path, width, true)
    for (const p of PAIRINGS) { await setPairing(p.id); record(`sweep ${path} ${width}px ${p.id}`, await evaluate(SWEEP)) }
  }
}

chrome.kill()
console.log(`${checks} layout checks, ${failures.length} problems`)
for (const f of failures) console.log('  ✖ ' + f)
process.exit(failures.length ? 1 : 0)
