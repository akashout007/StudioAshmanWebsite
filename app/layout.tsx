import type { Metadata } from 'next'
import { Playfair_Display, Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { EMAIL, LINKS, SITE, STUDIOS } from '@/lib/site'
import { DEFAULT_OG_IMAGE, pageMeta } from '@/lib/seo'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: false,
  style: ['normal', 'italic'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  adjustFontFallback: false,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
  ...pageMeta({ title: SITE.metaTitle, description: SITE.metaDescription, path: '/' }),
  applicationName: SITE.name,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
      founder: { '@type': 'Person', name: SITE.founder },
      email: EMAIL.work,
      sameAs: [LINKS.linkedin, LINKS.instagram],
    },
    ...STUDIOS.map((st) => ({
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#${st.key}`,
      name: `${SITE.name}, ${st.city}`,
      parentOrganization: { '@id': `${SITE.url}/#organization` },
      url: SITE.url,
      image: `${SITE.url}${DEFAULT_OG_IMAGE}`,
      email: EMAIL.work,
      telephone: st.schema.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: st.schema.streetAddress,
        addressLocality: st.schema.addressLocality,
        ...(st.schema.postalCode ? { postalCode: st.schema.postalCode } : {}),
        addressCountry: st.schema.addressCountry,
      },
      hasMap: st.mapsUrl,
    })),
  ],
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${syne.variable} ${dmSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
