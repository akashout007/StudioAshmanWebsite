import {
  Bodoni_Moda, Bricolage_Grotesque, DM_Mono, DM_Sans, Fraunces, Inter, Inter_Tight, Instrument_Serif, Jost, Manrope,
  Noto_Sans, Playfair_Display, Source_Sans_3, Space_Grotesk, Space_Mono, Syne,
} from 'next/font/google'

// The studio pairing is preloaded. Every other face is self-hosted with preload off: its @font-face is
// declared, but the browser only downloads a file once a Play pairing actually puts it on screen.
// (next/font needs literal options in each call, hence the repetition.)

// Studio (default)
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, variable: '--font-playfair', style: ['normal', 'italic'] })
const syne = Syne({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, variable: '--font-syne' })
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, variable: '--font-dm-sans' })

// Play pairings (variable fonts cover the 300–900 weights the site uses; static fonts load only those weights)
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-fraunces', style: ['normal', 'italic'] })
const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-space-grotesk' })
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-instrument-serif', weight: '400', style: ['normal', 'italic'] })
const manrope = Manrope({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-manrope' })
const spaceMono = Space_Mono({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-space-mono', weight: ['400', '700'] })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-bricolage' })
const dmMono = DM_Mono({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-dm-mono', weight: ['400', '500'] })
const bodoni = Bodoni_Moda({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-bodoni', style: ['normal', 'italic'] })
const jost = Jost({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-jost' })
const interTight = Inter_Tight({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-inter-tight' })
const sourceSans = Source_Sans_3({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-source-sans' })
const notoSans = Noto_Sans({ subsets: ['latin'], display: 'swap', adjustFontFallback: false, preload: false, variable: '--font-noto-sans' })

/** Class names that define every --font-* variable; they go on <html>. */
export const fontVariables = [
  playfair, syne, dmSans, fraunces, inter, spaceGrotesk, instrumentSerif, manrope, spaceMono, bricolage, dmMono, bodoni, jost,
  interTight, sourceSans, notoSans,
].map((f) => f.variable).join(' ')
