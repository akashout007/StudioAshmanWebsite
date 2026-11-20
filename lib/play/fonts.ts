// Play font pairings, named only by their fonts. Every family is SIL Open Font License (checked against
// each family's METADATA.pb in github.com/google/fonts) and self-hosted through next/font (app/fonts.ts).

export type PairingId =
  | 'playfair-dm-sans' | 'fraunces-inter' | 'instrument-serif-manrope' | 'space-grotesk' | 'bricolage-dm-sans'
  | 'bodoni-jost' | 'inter-tight' | 'source-sans-3' | 'noto-sans'

type Face = { family: string; cssVar: string }

export type Pairing = { id: PairingId; display: Face; body: Face; label: Face }

const face = (family: string, cssVar: string): Face => ({ family, cssVar })
const playfair = face('Playfair Display', '--font-playfair')
const dmSans = face('DM Sans', '--font-dm-sans')
const syne = face('Syne', '--font-syne')
const spaceGrotesk = face('Space Grotesk', '--font-space-grotesk')
const interTight = face('Inter Tight', '--font-inter-tight')
const sourceSans = face('Source Sans 3', '--font-source-sans')
const notoSans = face('Noto Sans', '--font-noto-sans')

export const PAIRINGS: Pairing[] = [
  { id: 'playfair-dm-sans', display: playfair, body: dmSans, label: syne },
  { id: 'fraunces-inter', display: face('Fraunces', '--font-fraunces'), body: face('Inter', '--font-inter'), label: spaceGrotesk },
  { id: 'instrument-serif-manrope', display: face('Instrument Serif', '--font-instrument-serif'), body: face('Manrope', '--font-manrope'), label: syne },
  { id: 'space-grotesk', display: spaceGrotesk, body: spaceGrotesk, label: face('Space Mono', '--font-space-mono') },
  { id: 'bricolage-dm-sans', display: face('Bricolage Grotesque', '--font-bricolage'), body: dmSans, label: face('DM Mono', '--font-dm-mono') },
  { id: 'bodoni-jost', display: face('Bodoni Moda', '--font-bodoni'), body: face('Jost', '--font-jost'), label: face('Jost', '--font-jost') },
  { id: 'inter-tight', display: interTight, body: interTight, label: interTight },
  { id: 'source-sans-3', display: sourceSans, body: sourceSans, label: sourceSans },
  { id: 'noto-sans', display: notoSans, body: notoSans, label: notoSans },
]

export const DEFAULT_PAIRING: PairingId = 'playfair-dm-sans'

// Values saved before pairings were named by their fonts; "swiss" (Helvetica) became Inter Tight
export const LEGACY_PAIRING_IDS: Record<string, PairingId> = {
  studio: 'playfair-dm-sans', editorial: 'fraunces-inter', gallery: 'instrument-serif-manrope', signal: 'space-grotesk',
  modern: 'bricolage-dm-sans', classic: 'bodoni-jost', swiss: 'inter-tight', transit: 'source-sans-3', global: 'noto-sans',
}

export const pairingById = (id: string) => PAIRINGS.find((p) => p.id === (LEGACY_PAIRING_IDS[id] ?? id))

/** Google Fonts specimen page, so visitors can take the font home too. */
export const specimenUrl = (family: string) => `https://fonts.google.com/specimen/${family.replace(/ /g, '+')}`

/** Unique families in a pairing, in display → body → label order. */
export const familiesOf = (p: Pairing) => Array.from(new Set([p.display.family, p.body.family, p.label.family]))

/** "Headings in Fraunces, text in Inter, labels in Space Grotesk" */
export const describePairing = (p: Pairing) =>
  `Headings in ${p.display.family}, text in ${p.body.family}, labels in ${p.label.family}`
