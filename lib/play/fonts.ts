// Play font pairings. Open fonts are SIL Open Font License (checked against each family's METADATA.pb
// in github.com/google/fonts) and self-hosted through next/font (app/fonts.ts). Helvetica is commercial,
// so Swiss uses the visitor's own copy where there is one (Apple devices) and Arial elsewhere: nothing
// is downloaded or redistributed.

export type PairingId =
  | 'studio' | 'editorial' | 'gallery' | 'signal' | 'modern' | 'classic' | 'swiss' | 'transit' | 'global'

type Face = { family: string; cssVar: string; system?: boolean }

export type Pairing = { id: PairingId; name: string; display: Face; body: Face; label: Face; note?: string }

const face = (family: string, cssVar: string): Face => ({ family, cssVar })
const helvetica: Face = { family: 'Helvetica', cssVar: '--font-helvetica', system: true }
const sourceSans = face('Source Sans 3', '--font-source-sans')
const notoSans = face('Noto Sans', '--font-noto-sans')

export const PAIRINGS: Pairing[] = [
  { id: 'studio', name: 'Studio', display: face('Playfair Display', '--font-playfair'), body: face('DM Sans', '--font-dm-sans'), label: face('Syne', '--font-syne') },
  { id: 'editorial', name: 'Editorial', display: face('Fraunces', '--font-fraunces'), body: face('Inter', '--font-inter'), label: face('Space Grotesk', '--font-space-grotesk') },
  { id: 'gallery', name: 'Gallery', display: face('Instrument Serif', '--font-instrument-serif'), body: face('Manrope', '--font-manrope'), label: face('Syne', '--font-syne') },
  { id: 'signal', name: 'Signal', display: face('Space Grotesk', '--font-space-grotesk'), body: face('Space Grotesk', '--font-space-grotesk'), label: face('Space Mono', '--font-space-mono') },
  { id: 'modern', name: 'Modern', display: face('Bricolage Grotesque', '--font-bricolage'), body: face('DM Sans', '--font-dm-sans'), label: face('DM Mono', '--font-dm-mono') },
  { id: 'classic', name: 'Classic', display: face('Bodoni Moda', '--font-bodoni'), body: face('Jost', '--font-jost'), label: face('Jost', '--font-jost') },
  { id: 'swiss', name: 'Swiss', display: helvetica, body: helvetica, label: helvetica },
  { id: 'transit', name: 'Transit', display: sourceSans, body: sourceSans, label: sourceSans, note: 'an open humanist sans in the spirit of Frutiger’s airport signage' },
  { id: 'global', name: 'Global', display: notoSans, body: notoSans, label: notoSans },
]

export const DEFAULT_PAIRING: PairingId = 'studio'

export const pairingById = (id: string) => PAIRINGS.find((p) => p.id === id)

/** Google Fonts specimen page, so visitors can take the font home too. */
export const specimenUrl = (family: string) => `https://fonts.google.com/specimen/${family.replace(/ /g, '+')}`

/** Unique faces in a pairing, in display → body → label order. */
export const facesOf = (p: Pairing) =>
  [p.display, p.body, p.label].filter((f, i, all) => all.findIndex((g) => g.family === f.family) === i)
