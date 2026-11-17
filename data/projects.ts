export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  type?: 'hero' | 'gallery' | 'detail' | 'diagram' | 'process'
}

export interface ProjectSection {
  eyebrow?: string
  title?: string
  text?: string
  images?: ProjectImage[]
  layout?: 'full' | 'split' | 'grid' | 'text-only'
}

export type ProjectStatus = 'built' | 'ongoing' | 'proposal' | 'concept'
export type ProjectCategory =
  | 'wayfinding'
  | 'spatial-identity'
  | 'environmental-graphics'
  | 'brand-identity'

export interface Project {
  slug: string
  number: string
  title: string
  shortTitle?: string
  category: string
  categories: ProjectCategory[]
  discipline?: string
  location?: string
  year?: string
  client?: string
  status: ProjectStatus
  hasCaseStudy: boolean
  role?: string
  scope?: string[]
  description?: string
  introduction?: string
  hero: ProjectImage
  images: ProjectImage[]
  sections?: ProjectSection[]
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'regency-hospital',
    number: '01',
    title: 'Regency Hospital',
    category: 'Wayfinding · Signage',
    discipline: 'Healthcare wayfinding system',
    categories: ['wayfinding'],
    location: 'Kanpur',
    year: '2026',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '',
      alt: 'Regency Hospital — wayfinding and signage system for a multi-block healthcare campus, Kanpur',
      type: 'hero',
    },
    images: [],
    featured: true,
  },
  {
    slug: 'artnest-studio',
    number: '02',
    title: 'ArtNest Studio',
    category: 'Brand Identity · Visual Communication',
    discipline: 'Brand identity for an artist\'s studio',
    categories: ['brand-identity'],
    location: 'Charmwood Village, Faridabad',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '',
      alt: 'ArtNest Studio — brand identity and visual communication system for an artist\'s atelier, Faridabad',
      type: 'hero',
    },
    images: [],
    featured: true,
  },
  {
    slug: 'mall-of-expressway',
    number: '03',
    title: 'Mall of Expressway',
    category: 'Wayfinding · Signage',
    discipline: 'Mixed-use development signage system',
    categories: ['wayfinding'],
    location: 'Greater Noida',
    year: '2026',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '',
      alt: 'Mall of Expressway — wayfinding strategy and signage system for a mixed-use development in Greater Noida',
      type: 'hero',
    },
    images: [],
    featured: true,
  },
  {
    slug: 'sikka-kaamya-greens',
    number: '04',
    title: 'Sikka Kaamya Greens',
    category: 'Wayfinding · Signage',
    discipline: 'Residential wayfinding and signage system',
    categories: ['wayfinding'],
    location: 'Greater Noida',
    year: '2026',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '',
      alt: 'Sikka Kaamya Greens — residential wayfinding and signage system, Greater Noida',
      type: 'hero',
    },
    images: [],
    featured: false,
  },
  {
    slug: 'bollywood-kabab',
    number: '05',
    title: 'Bollywood Kabab',
    category: 'Brand Identity',
    discipline: 'F&B brand identity and environment',
    categories: ['brand-identity'],
    status: 'built',
    hasCaseStudy: false,
    hero: {
      src: '',
      alt: 'Bollywood Kabab — brand identity and environmental design',
      type: 'hero',
    },
    images: [],
    featured: false,
  },
  {
    slug: 'chopra-soda',
    number: '06',
    title: 'Chopra Soda',
    category: 'Spatial Identity · Heritage',
    discipline: 'Retail revival of a Punjabi heritage brand',
    categories: ['spatial-identity'],
    location: 'Faridkot, Punjab',
    year: '2024',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '/chopra-soda.png',
      alt: 'Chopra Soda — retail revival of a Punjabi heritage soft drink, spatial identity and brand environment, Faridkot Punjab',
      type: 'hero',
    },
    images: [],
    featured: false,
  },
  {
    slug: 'delhigrapher',
    number: '07',
    title: 'Delhigrapher',
    category: 'Brand Identity',
    discipline: 'Brand identity for a wedding photography practice',
    categories: ['brand-identity'],
    location: 'New Delhi',
    year: '2026',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '/delhigrapher/delhigrapher-cover.jpg',
      alt: 'Delhigrapher brand overview — black and white wedding photograph beside the handwritten Delhigrapher wordmark',
      type: 'hero',
    },
    images: [
      { src: '/delhigrapher/Delhigrapher-02_page-0002.jpg', alt: 'About Delhigrapher — a wedding practice rooted in observation', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0003.jpg', alt: 'Brand assets — handwritten wordmark and safe space construction', type: 'process' },
      { src: '/delhigrapher/delhigrapher-type-colour.jpg', alt: 'Typography (Human Sans weights) and colours: black and white primaries with muted red, ochre yellow and soft blue', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0006.jpg', alt: 'Watermark — outline and solid wordmark variants placed on photographs', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0007.jpg', alt: 'Seal and stickers — D monogram seals in the brand colours', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0008.jpg', alt: 'Visiting card — black front with white wordmark, textured back with contact details', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0009.jpg', alt: 'Proposal — digital proposal with cover, event details, deliverables and payment terms', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0010.jpg', alt: 'Social media — Instagram profile with D mark avatar, highlights and post grid', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0011.jpg', alt: 'Stickers — event illustration stickers for Haldi, cocktail party and wedding day', type: 'process' },
      { src: '/delhigrapher/Delhigrapher-02_page-0012.jpg', alt: 'Website — home page with black and white hero photograph', type: 'process' },
    ],
    featured: false,
  },
  {
    slug: 'swetafilms',
    number: '08',
    title: 'Swetafilms',
    category: 'Brand Identity',
    discipline: 'Brand identity and environmental design',
    categories: ['brand-identity'],
    status: 'built',
    hasCaseStudy: false,
    hero: {
      src: '',
      alt: 'Swetafilms — brand identity and environmental design',
      type: 'hero',
    },
    images: [],
    featured: false,
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1],
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0],
  }
}
