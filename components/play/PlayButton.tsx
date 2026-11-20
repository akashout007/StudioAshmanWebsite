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

  // Hidden on /contact (the form's submit button sits where the pill would) and over the footer
  const hidden = !open && (pathname === '/contact' || footerInView)

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
