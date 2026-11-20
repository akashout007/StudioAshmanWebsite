'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CTA, EXTERNAL, LINKS } from '@/lib/site'
import { FORMATS, SIGN_ROLE, STYLES, drawSign, loadSignFonts, readLook, type Arrow, type SignFormat, type SignStyle } from '@/lib/play/sign'
import { DEFAULT_PAIRING, pairingById } from '@/lib/play/fonts'
import { SIGN_MAX, checkSignText, signFileName } from '@/lib/play/signText'

const ARROWS: { value: Arrow; glyph: string; label: string }[] = [
  { value: 'left', glyph: '←', label: 'Left' },
  { value: 'up', glyph: '↑', label: 'Ahead' },
  { value: 'right', glyph: '→', label: 'Right' },
]

/** "Make your sign": a modal that draws a sign in the visitor's current look and saves it as a PNG. */
export default function SignMaker({ onClose }: { onClose: () => void }) {
  const id = useId()
  const [input, setInput] = useState('')
  const [style, setStyle] = useState<SignStyle>('door')
  const [arrow, setArrow] = useState<Arrow>('right')
  const [format, setFormat] = useState<SignFormat>('post')
  // Kept in a ref, not on the buttons: disabling the focused button would drop keyboard focus
  const busy = useRef(false)
  const [done, setDone] = useState(false)
  const [canShare, setCanShare] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const check = checkSignText(input)
  const ready = check.ok && check.text.length > 0

  // Redraw the preview whenever anything changes, once the fonts it needs are in
  useEffect(() => {
    let cancelled = false
    const look = readLook()
    loadSignFonts(look, check.text).then(() => {
      if (!cancelled && canvasRef.current) {
        drawSign(canvasRef.current, { text: check.ok ? check.text : '', style, arrow, format, look })
      }
    })
    return () => { cancelled = true }
  }, [check.ok, check.text, style, arrow, format])

  // Share with files is only offered where the browser supports it
  useEffect(() => {
    try {
      const probe = new File([new Blob()], 'probe.png', { type: 'image/png' })
      setCanShare(!!navigator.canShare?.({ files: [probe] }))
    } catch { setCanShare(false) }
  }, [])

  // Focus the text field, keep Tab inside the dialog, Esc closes
  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>('input')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onCloseRef.current(); return }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('input, button, a[href]')).filter((el) => !el.hasAttribute('disabled'))
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey, true)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = overflow
    }
  }, [])

  // Render at full size with fonts confirmed, then hand back the PNG
  const exportPng = async () => {
    const look = readLook()
    await loadSignFonts(look, check.text)
    const canvas = document.createElement('canvas')
    drawSign(canvas, { text: check.text, style, arrow, format, look })
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'))
    if (!blob) throw new Error('Could not create the image')
    return new File([blob], signFileName(check.text, FORMATS[format]), { type: 'image/png' })
  }

  const download = (file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 2000)
  }

  const onDownload = async () => {
    if (!ready || busy.current) return
    busy.current = true
    try { download(await exportPng()); setDone(true) } finally { busy.current = false }
  }

  const onShare = async () => {
    if (!ready || busy.current) return
    busy.current = true
    try {
      const file = await exportPng()
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'My sign', text: 'Made at ashman.studio' })
          setDone(true)
        } catch (err) {
          if ((err as Error).name !== 'AbortError') { download(file); setDone(true) }
        }
      } else {
        download(file)
        setDone(true)
      }
    } finally { busy.current = false }
  }

  const { w, h } = FORMATS[format]
  // The exact font this sign is drawn in, from the visitor's current pairing
  const pairing = pairingById(document.documentElement.dataset.fonts ?? DEFAULT_PAIRING) ?? pairingById(DEFAULT_PAIRING)!
  const setIn = pairing[SIGN_ROLE[style]].family

  return createPortal(
    <div className="sign-modal" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={dialogRef} className="sign-dialog" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        <div className="sign-head">
          <h2 id={`${id}-title`} className="sign-title">Make your sign</h2>
          <button type="button" className="play-close" aria-label="Close" onClick={onClose}><span aria-hidden="true">×</span></button>
        </div>

        <div className="sign-body">
          <div className="sign-controls">
            <div className="sign-field">
              <label htmlFor={`${id}-text`} className="play-label">Your name, a word, a place</label>
              <input
                id={`${id}-text`}
                type="text"
                value={input}
                maxLength={SIGN_MAX}
                autoComplete="off"
                spellCheck={false}
                placeholder="Your name"
                aria-invalid={!check.ok || undefined}
                aria-describedby={`${id}-hint`}
                onChange={(e) => { setInput(e.target.value); setDone(false) }}
              />
              <p id={`${id}-hint`} className={check.ok ? 'sign-hint' : 'sign-hint is-error'} aria-live="polite">
                {check.ok ? `${check.text.length}/${SIGN_MAX}` : check.message}
              </p>
            </div>

            <fieldset className="sign-choice">
              <legend className="play-label">Sign</legend>
              <div className="sign-options">
                {(Object.keys(STYLES) as SignStyle[]).map((s) => (
                  <label key={s} className={`sign-option${style === s ? ' is-on' : ''}`}>
                    <input type="radio" name={`${id}-style`} value={s} checked={style === s} onChange={() => setStyle(s)} />
                    {STYLES[s]}
                  </label>
                ))}
              </div>
            </fieldset>

            {style === 'directional' && (
              <fieldset className="sign-choice">
                <legend className="play-label">Arrow</legend>
                <div className="sign-options">
                  {ARROWS.map((a) => (
                    <label key={a.value} className={`sign-option sign-arrow${arrow === a.value ? ' is-on' : ''}`}>
                      <input type="radio" name={`${id}-arrow`} value={a.value} checked={arrow === a.value} onChange={() => setArrow(a.value)} />
                      <span aria-hidden="true">{a.glyph}</span><span className="sr-only">{a.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="sign-choice">
              <legend className="play-label">Size</legend>
              <div className="sign-options">
                {(Object.keys(FORMATS) as SignFormat[]).map((fm) => (
                  <label key={fm} className={`sign-option${format === fm ? ' is-on' : ''}`}>
                    <input type="radio" name={`${id}-format`} value={fm} checked={format === fm} onChange={() => setFormat(fm)} />
                    {FORMATS[fm].label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="sign-actions">
              <button type="button" className="btn-primary" disabled={!ready} onClick={onDownload}>Download</button>
              {canShare && (
                <button type="button" className="btn-outline" disabled={!ready} onClick={onShare}>Share</button>
              )}
            </div>
            <p className="sign-note">Made on your device. Nothing is uploaded or stored.</p>

            <div aria-live="polite">
              {done && (
                <div className="sign-cta">
                  <p>Want a real one, for your brand or your space?</p>
                  <div className="sign-cta-links">
                    <a href="/contact?ref=sign" className="sign-cta-primary">{CTA.primary}</a>
                    <a href={LINKS.whatsapp} {...EXTERNAL} className="sign-cta-wa">{CTA.whatsapp} ↗</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <figure className="sign-preview">
            <canvas ref={canvasRef} width={w} height={h} role="img" aria-label={`Preview: ${STYLES[style]} reading “${check.ok && check.text ? check.text : 'Your name'}”`} />
            <figcaption>
              {FORMATS[format].label} · {w} × {h}
              <span className="sign-font">Set in {setIn}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>,
    document.body,
  )
}
