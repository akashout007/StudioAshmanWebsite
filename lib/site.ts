export const SITE = {
  name: 'Ashman Studio',
  wordmark: 'ashman.studio',
  url: 'https://www.studioashman.com',
  founder: 'Akash Manna',
  positioning: 'Wayfinding & Spatial Branding',
  heroTitle: 'Wayfinding & Spatial Branding Agency',
  heroSub:
    'We build brands from scratch: the identity, the story, and every place it lives, on screen, in print and in space. New Delhi · Dubai.',
  summary:
    'We build brand identities from scratch, along with their digital and spatial branding collateral, and we build the story each brand tells.',
  metaTitle: 'Ashman Studio | Wayfinding & Spatial Branding Agency, New Delhi & Dubai',
  metaDescription:
    'Ashman Studio builds brand identities from scratch, with wayfinding, signage, spatial and digital branding. Studios in New Delhi and Dubai.',
} as const

export type ServiceSlug = 'brand-identity' | 'wayfinding-signage' | 'spatial-branding' | 'digital-collateral'

// `short` labels project cards; `chip` is the one-word label in the hero sentence.
export const SERVICES: { slug: ServiceSlug; name: string; short: string; chip: string; scope: string }[] = [
  {
    slug: 'brand-identity',
    name: 'Brand Identity & Storytelling',
    short: 'Brand Identity',
    chip: 'Identity',
    scope: 'Strategy, naming, logo, visual system, brand story',
  },
  {
    slug: 'wayfinding-signage',
    name: 'Wayfinding & Signage',
    short: 'Wayfinding',
    chip: 'Wayfinding',
    scope: 'Wayfinding strategy, sign families, pictograms, fabrication and install supervision',
  },
  {
    slug: 'spatial-branding',
    name: 'Spatial Branding',
    short: 'Spatial',
    chip: 'Spaces',
    scope: 'Environmental graphics, facades, interiors, activations, retail',
  },
  {
    slug: 'digital-collateral',
    name: 'Digital & Brand Collateral',
    short: 'Digital & Collateral',
    chip: 'Collateral',
    scope: 'Social, web, packaging, print, launch assets',
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)

export type SectorSlug = 'hospitals' | 'real-estate' | 'malls-mixed-use' | 'restaurants-cafes' | 'lifestyle-brands'

export const SECTORS: { slug: SectorSlug; name: string }[] = [
  { slug: 'hospitals', name: 'Hospitals' },
  { slug: 'real-estate', name: 'Real estate' },
  { slug: 'malls-mixed-use', name: 'Malls & mixed-use' },
  { slug: 'restaurants-cafes', name: 'Restaurants & cafés' },
  { slug: 'lifestyle-brands', name: 'Lifestyle brands' },
]

export const sectorBySlug = (slug: string) => SECTORS.find((s) => s.slug === slug)

export const CTA = {
  primary: 'Start a project →',
  whatsapp: 'Chat on WhatsApp',
  reply: 'We reply within two working days.',
} as const

export const EMAIL = {
  work: 'work@studioashman.com',
  press: 'press@studioashman.com',
  careers: 'careers@studioashman.com',
} as const

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const STUDIOS = [
  {
    key: 'new-delhi',
    city: 'New Delhi',
    role: 'Headquarters',
    addressLines: ['Market No. 4, Chittaranjan Park', 'New Delhi 110019', 'India'],
    phone: '+91 83830 27996',
    tel: 'tel:+918383027996',
    timezone: 'IST +5:30',
    mapsUrl: mapsUrl('Market No. 4, Chittaranjan Park, New Delhi 110019, India'),
    schema: {
      streetAddress: 'Market No. 4, Chittaranjan Park',
      addressLocality: 'New Delhi',
      postalCode: '110019',
      addressCountry: 'IN',
      telephone: '+918383027996',
    },
  },
  {
    key: 'dubai',
    city: 'Dubai',
    role: 'Gulf studio',
    addressLines: ['Unit 17, Alserkal Avenue', 'Al Quoz 1, Dubai', 'United Arab Emirates'],
    phone: '+971 56 655 2845',
    tel: 'tel:+971566552845',
    timezone: 'GST +4:00',
    mapsUrl: mapsUrl('Unit 17, Alserkal Avenue, Al Quoz 1, Dubai, UAE'),
    schema: {
      streetAddress: 'Unit 17, Alserkal Avenue, Al Quoz 1',
      addressLocality: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
      telephone: '+971566552845',
    },
  },
] as const

export const LINKS = {
  whatsapp:
    'https://wa.me/918383027996?text=Hi%20Ashman%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  linkedin: 'https://www.linkedin.com/company/131363902/',
  instagram: 'https://www.instagram.com/studio.ashman/',
} as const

export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * True when a content field holds real text. Empty fields, and any value still containing a
 * "[PLACEHOLDER" note, never render: their section, fact row or line is hidden instead.
 */
export const filled = (v?: string | null): v is string => !!v?.trim() && !v.includes('[PLACEHOLDER')
