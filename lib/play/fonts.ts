// Play font pairings. Every family is open source (SIL Open Font License, checked against each
// family's METADATA.pb in github.com/google/fonts) and self-hosted through next/font (app/fonts.ts).

export type PairingId = 'studio' | 'editorial' | 'gallery' | 'signal' | 'modern' | 'classic'

type Face = { family: string; cssVar: string }

export type Pairing = { id: PairingId; name: string; display: Face; body: Face; label: Face }

const face = (family: string, cssVar: string): Face => ({ family, cssVar })

export const PAIRINGS: Pairing[] = [
  { id: 'studio', name: 'Studio', display: face('Playfair Display', '--font-playfair'), body: face('DM Sans', '--font-dm-sans'), label: face('Syne', '--font-syne') },
  { id: 'editorial', name: 'Editorial', display: face('Fraunces', '--font-fraunces'), body: face('Inter', '--font-inter'), label: face('Space Grotesk', '--font-space-grotesk') },
  { id: 'gallery', name: 'Gallery', display: face('Instrument Serif', '--font-instrument-serif'), body: face('Manrope', '--font-manrope'), label: face('Syne', '--font-syne') },
  { id: 'signal', name: 'Signal', display: face('Space Grotesk', '--font-space-grotesk'), body: face('Space Grotesk', '--font-space-grotesk'), label: face('Space Mono', '--font-space-mono') },
  { id: 'modern', name: 'Modern', display: face('Bricolage Grotesque', '--font-bricolage'), body: face('DM Sans', '--font-dm-sans'), label: face('DM Mono', '--font-dm-mono') },
  { id: 'classic', name: 'Classic', display: face('Bodoni Moda', '--font-bodoni'), body: face('Jost', '--font-jost'), label: face('Jost', '--font-jost') },
]

export const DEFAULT_PAIRING: PairingId = 'studio'

export const pairingById = (id: string) => PAIRINGS.find((p) => p.id === id)

/** Google Fonts specimen page, so visitors can take the font home too. */
export const specimenUrl = (family: string) => `https://fonts.google.com/specimen/${family.replace(/ /g, '+')}`

/** Unique families in a pairing, in display → body → label order. */
export const familiesOf = (p: Pairing) => Array.from(new Set([p.display.family, p.body.family, p.label.family]))
