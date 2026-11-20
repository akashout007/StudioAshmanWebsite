'use client'
import { useEffect, useRef, useState, type ComponentType, type RefObject } from 'react'
import TemperatureSlider from '@/components/play/TemperatureSlider'
import FontPairings from '@/components/play/FontPairings'
import { applyFonts, applyTemperature, clearTemperature, temperatureVars } from '@/lib/play/apply'
import { DEFAULT_K } from '@/lib/play/temperature'
import { DEFAULT_PAIRING, pairingById, type PairingId } from '@/lib/play/fonts'
import { clearPlay, readPlay, writePlay } from '@/lib/play/storage'

export type PanelProps = { onClose: () => void; anchor: RefObject<HTMLButtonElement | null> }

/** The Play panel: a popover on desktop, a bottom sheet on phones. Non-modal, so the page stays in view. */
export default function PlayPanel({ onClose, anchor }: PanelProps) {
  const [saved] = useState(readPlay)
  const [kelvin, setKelvin] = useState(saved?.k ?? DEFAULT_K)
  const [fonts, setFonts] = useState<PairingId>((pairingById(saved?.f ?? '')?.id) ?? DEFAULT_PAIRING)
  const panelRef = useRef<HTMLDivElement>(null)
  const signButtonRef = useRef<HTMLButtonElement>(null)
  const [SignMaker, setSignMaker] = useState<ComponentType<{ onClose: () => void }> | null>(null)
  const [signOpen, setSignOpen] = useState(false)

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // On open: make the page match what the panel shows (in case stored colours were missing or stale),
  // then focus the first control
  useEffect(() => {
    if (saved) {
      applyTemperature(kelvin, false)
      applyFonts(fonts)
    }
    panelRef.current?.querySelector<HTMLElement>('input')?.focus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Esc and clicks outside close the panel
  useEffect(() => {
    // The sign modal handles its own Esc and clicks; the panel waits underneath it
    const signModalOpen = () => !!document.querySelector('.sign-modal')
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !signModalOpen()) onCloseRef.current() }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (signModalOpen() || panelRef.current?.contains(t) || anchor.current?.contains(t)) return
      onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [anchor])

  const save = (k: number, f: PairingId) => writePlay({ k, f, v: temperatureVars(k) })

  const changeKelvin = (k: number) => {
    setKelvin(k)
    applyTemperature(k)
    save(k, fonts)
  }

  const changeFonts = (id: PairingId) => {
    setFonts(id)
    applyFonts(id)
    save(kelvin, id)
  }

  const openSign = async () => {
    if (!SignMaker) {
      const mod = await import('@/components/play/SignMaker')
      setSignMaker(() => mod.default)
    }
    setSignOpen(true)
  }

  const closeSign = () => {
    setSignOpen(false)
    signButtonRef.current?.focus()
  }

  const reset = () => {
    setKelvin(DEFAULT_K)
    setFonts(DEFAULT_PAIRING)
    document.documentElement.classList.add('play-tint')
    clearTemperature()
    applyFonts(DEFAULT_PAIRING)
    clearPlay()
  }

  return (
    <div ref={panelRef} id="play-panel" className="play-panel" role="dialog" aria-labelledby="play-title">
      <div className="play-head">
        <h2 id="play-title" className="play-title">Play</h2>
        <button type="button" className="play-close" aria-label="Close Play" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <TemperatureSlider value={kelvin} onChange={changeKelvin} />
      <FontPairings value={fonts} onChange={changeFonts} />
      <button ref={signButtonRef} type="button" className="play-sign" aria-haspopup="dialog" onClick={openSign}>
        Make your sign <span aria-hidden="true">→</span>
      </button>
      <button type="button" className="play-reset" onClick={reset}>Reset to studio default</button>
      {SignMaker && signOpen && <SignMaker onClose={closeSign} />}
    </div>
  )
}
