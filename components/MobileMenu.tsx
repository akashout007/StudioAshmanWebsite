'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`nav-hamburger${open ? ' is-open' : ''}`}
      onClick={onToggle}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
    >
      <span /><span /><span />
    </button>
  )
}

// Rendered into <body> so the nav's backdrop-filter can't shrink the fixed overlay to the bar's size.
export default function MobileMenu({ open, onClose, children }: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('#mobile-menu a, #mobile-menu button')?.focus()
    })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const desktop = window.matchMedia('(min-width: 769px)')
    const onResize = (e: MediaQueryListEvent) => { if (e.matches) onClose() }
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, onClose])

  if (!open || !mounted) return null

  return createPortal(
    <div id="mobile-menu" className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
      {children}
      <div className="mobile-nav-footer">
        ashman<span style={{ color: 'var(--accent)' }}>.</span>studio · New Delhi · Dubai
      </div>
    </div>,
    document.body,
  )
}
