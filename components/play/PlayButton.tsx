'use client'
import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import { usePathname } from 'next/navigation'
import { TIP_KEY } from '@/lib/play/storage'
import type { PanelProps } from '@/components/play/PlayPanel'

const TIP_DELAY = 8000
const TIP_SCROLL = 0.4

/**
 * The floating "✦ Play" pill (bottom-left; WhatsApp sits bottom-right). Kept tiny: the panel, colour
 * maths and font controls load only on the first click.
 */
export default function PlayButton() {
  const pathname = usePathname()
  const [footerInView, setFooterInView] = useState(false)
  const [open, setOpen] = useState(false)
  const [Panel, setPanel] = useState<ComponentType<PanelProps> | null>(null)
  const [tip, setTip] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tipDone = useRef(false)

  // One-time hint on a first visit: after 8 seconds or 40% of the page, whichever comes first
  useEffect(() => {
    try { if (localStorage.getItem(TIP_KEY)) return } catch { return }
    const show = () => { if (!tipDone.current) setTip(true) }
    const timer = window.setTimeout(show, TIP_DELAY)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      if (max > 0 && scrollY / max >= TIP_SCROLL) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [])

  // Like the WhatsApp button, step aside over the footer so its links stay reachable
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([e]) => setFooterInView(e.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

  // ...and while anything marked data-play-avoid (the hero caption) passes through the pill's strip
  const [avoid, setAvoid] = useState(false)
  useEffect(() => {
    const targets = document.querySelectorAll('[data-play-avoid]')
    if (!targets.length) { setAvoid(false); return }
    const inBand = new Set<Element>()
    let io: IntersectionObserver | undefined
    const watch = () => {
      io?.disconnect()
      inBand.clear()
      // The strip is the pill's own footprint (16px from the bottom, 44px tall) plus 8px either side
      io = new IntersectionObserver((entries) => {
        // A real overlap, not just touching edges
        for (const e of entries) { if (e.intersectionRect.height > 0) inBand.add(e.target); else inBand.delete(e.target) }
        setAvoid(inBand.size > 0)
      }, { rootMargin: `-${Math.max(0, innerHeight - 68)}px 0px -8px 0px`, threshold: [0, 0.01, 0.5, 1] })
      targets.forEach((t) => io!.observe(t))
    }
    watch()
    window.addEventListener('resize', watch)
    return () => { io?.disconnect(); window.removeEventListener('resize', watch) }
  }, [pathname])

  const dismissTip = () => {
    tipDone.current = true
    setTip(false)
    try { localStorage.setItem(TIP_KEY, '1') } catch { /* fine: it simply may show again */ }
  }

  const toggle = async () => {
    dismissTip()
    if (open) { setOpen(false); return }
    if (!Panel) {
      const mod = await import('@/components/play/PlayPanel')
      setPanel(() => mod.default)
    }
    setOpen(true)
  }

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  // Hidden on /contact (the form's submit button sits where the pill would), over the footer and the hero caption
  const hidden = !open && (pathname === '/contact' || footerInView || avoid)

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`play-button${hidden ? ' is-hidden' : ''}`}
        aria-label="Play with colours and fonts"
        aria-expanded={open}
        aria-controls="play-panel"
        onClick={toggle}
      >
        <span aria-hidden="true">✦</span> Play
      </button>
      {tip && !open && !hidden && (
        <button type="button" className="play-tip" onClick={dismissTip}>
          Change the light. Change the type. Make it yours.
          <span className="sr-only"> Dismiss</span>
        </button>
      )}
      {Panel && open && <Panel onClose={close} anchor={buttonRef} />}
    </>
  )
}
