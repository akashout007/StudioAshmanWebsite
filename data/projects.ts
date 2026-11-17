export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  type?: 'hero' | 'gallery' | 'detail' | 'diagram' | 'process'
  position?: string
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
    title: 'Regency Kanpur Hospital',
    category: 'Wayfinding · Signage',
    discipline: 'Bilingual signage and wayfinding concept for a hospital campus',
    categories: ['wayfinding'],
    location: 'Kanpur',
    year: '2026',
    status: 'proposal',
    hasCaseStudy: true,
    hero: {
      src: '/projects/regency/regency-cover.jpg',
      alt: 'Regency Kanpur Hospital signage and wayfinding concept: night elevation with the REGENCY KANPUR T3 crown, red R+ symbol and EMERGENCY sign',
      type: 'hero',
      position: '72% 50%',
    },
    images: [
      { src: '/projects/regency/regency-objective.jpg', alt: 'Design objective — guide people from the city, through the campus and back, for every kind of visitor', type: 'process' },
      { src: '/projects/regency/regency-typography.jpg', alt: 'Typography — Open Sans for English and Mukta for Hindi', type: 'process' },
      { src: '/projects/regency/regency-visual-strategy.jpg', alt: 'Visual strategy — Kanpur culture in black and white photographs on red and brown', type: 'process' },
      { src: '/projects/regency/regency-inspiration.jpg', alt: 'Design inspiration — the Ganga ghats, Kanpur\'s festivals and performance arts, and the Leather City\'s craft', type: 'process' },
      { src: '/projects/regency/regency-colour.jpg', alt: 'Colour identity — a colour pair for each core: OPD, IPD, Emergency and Diagnosis', type: 'process' },
      { src: '/projects/regency/regency-external-strategy.jpg', alt: 'External strategy — facade range map showing visibility radius and view cones around the hospital', type: 'process' },
      { src: '/projects/regency/regency-facade.jpg', alt: 'Facade signage — hospital, brand and arrival elements on the day elevation', type: 'process' },
      { src: '/projects/regency/regency-dr01.jpg', alt: 'EXT-DR01 vehicular directional sign — gate number and 24 x 7 Emergency pylon with exploded view', type: 'process' },
      { src: '/projects/regency/regency-dr02.jpg', alt: 'EXT-DR02 drop-off sign — bilingual OPD drop-off pylon with a parking panel', type: 'process' },
      { src: '/projects/regency/regency-hanging.jpg', alt: 'INT-DR01 and INT-DR02 hanging signs — Reception and OPD Register panels with dimensions and in-situ views', type: 'process' },
      { src: '/projects/regency/regency-corridor.jpg', alt: 'INT-DR03 corridor directional sign — bilingual directions ending with the floor number', type: 'process' },
    ],
    featured: true,
  },
  {
    slug: 'artnest-studio',
    number: '02',
    title: 'ArtNest Studio',
    category: 'Brand Identity · Visual Communication',
    discipline: 'Brand identity for a community art studio',
    categories: ['brand-identity'],
    location: 'Charmwood Village, Faridabad',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '/projects/artnest/artnest-cover.jpg',
      alt: 'ArtNest Studio wordmark on green, surrounded by four poses of the bird mascot',
      type: 'hero',
    },
    images: [
      { src: '/projects/artnest/artnest-about.jpg', alt: 'About ArtNest Studio — a community-driven creative space for children and adults', type: 'process' },
      { src: '/projects/artnest/artnest-wordmark.jpg', alt: 'Wordmark — primary, outline and bordered versions with safe space and construction grid', type: 'process' },
      { src: '/projects/artnest/artnest-mascot.jpg', alt: 'Mascot — six poses of the green bird on alternating brand colour tiles', type: 'process' },
      { src: '/projects/artnest/artnest-colour.jpg', alt: 'Colour palette — brand colours, mascot colours and the wordmark on each colour', type: 'process' },
      { src: '/projects/artnest/artnest-typography.jpg', alt: 'Typography — Baileywick JF Gothic for headings and Acumin Variable Concept for body text', type: 'process' },
      { src: '/projects/artnest/artnest-illustration.jpg', alt: 'Illustration style — minimal line-art studio scenes at low opacity on brand colours', type: 'process' },
      { src: '/projects/artnest/artnest-social-posts.jpg', alt: 'Social media posts — brand communication, children\'s and adult announcements, and imagery', type: 'process' },
      { src: '/projects/artnest/artnest-instagram.jpg', alt: 'Instagram profile on a phone, flanked by two workshop posts', type: 'process' },
      { src: '/projects/artnest/artnest-business-card.jpg', alt: 'Business cards for the creative hosts, with mascot fronts and contact backs', type: 'process' },
      { src: '/projects/artnest/artnest-merchandise.jpg', alt: 'Merchandise — host, child and adult wearing ArtNest mascot T-shirts', type: 'process' },
      { src: '/projects/artnest/artnest-in-context.jpg', alt: 'In context — notebook and stationery, mascot washroom sign and posters on a wall', type: 'process' },
      { src: '/projects/artnest/artnest-closing.jpg', alt: 'Tote bags in off-white, lime and green, each with a mascot pose', type: 'process' },
    ],
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
    category: 'Brand Identity · Signage',
    discipline: 'Cinema-inspired brand identity and facade signage for a kebab restaurant',
    categories: ['brand-identity'],
    location: 'Greater Noida',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg',
      alt: 'Bollywood Kebabs restaurant at dusk: glass frontage with black film-reel skewer letters above the entrance',
      type: 'hero',
    },
    images: [
      { src: '/projects/bollywood-kabab/bollywood-kabab-overview.jpg', alt: 'Brand overview — a cinema-inspired kebab restaurant, its audience and the Nostalgic Foodie persona', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-direction.jpg', alt: 'Selected direction — cinema as a visual language, chosen from three concepts', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-wordmark.jpg', alt: 'Wordmark — Art Deco cinema letterforms with seekh-skewer swashes, stacked and single-line lockups', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-wordmark-applied.jpg', alt: 'Wordmark on black, red and blush, with a kebab skewer photo, an embossed card and the neon storefront', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-facade.jpg', alt: 'Facade — illuminated letters across a black louvred frontage', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-fabrication.jpg', alt: 'Letter fabrication — exploded channel letter with acrylic face, aluminium channel, LED modules and mounting', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-menu.jpg', alt: 'Drinks menu — black cover and red mocktails panel', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-menu-sections.jpg', alt: 'Menu sections — mocktails, smoothies, shakes, cold coffee, iced tea and beverages', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-table-tent.jpg', alt: 'Table tent — Today\'s Special tent card draft and TC 001 dieline', type: 'process' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-closing.jpg', alt: 'Drinks menu front and back covers on black', type: 'process' },
    ],
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
    title: 'Sweta Films',
    category: 'Brand Identity',
    discipline: 'Brand identity for a photography and visual storytelling practice',
    categories: ['brand-identity'],
    location: 'Dubai',
    status: 'built',
    hasCaseStudy: true,
    hero: {
      src: '/projects/swetafilms/swetafilms-cover.jpg',
      alt: 'Sweta Films wordmark in a red block over a black and white studio shot of a model under a spotlight',
      type: 'hero',
    },
    images: [
      { src: '/projects/swetafilms/swetafilms-overview.jpg', alt: 'Brand overview — a photography, fashion and commercial visual storytelling practice in Dubai', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-construction.jpg', alt: 'Wordmark construction — condensed letters in two blocks split by a rising diagonal, on a grid', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-typography.jpg', alt: 'Typography — FRANK for display and Helvetica for text', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-colour.jpg', alt: 'Colour palette — red DA3832, light grey E6E6E6 and black 101010', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-card.jpg', alt: 'Business cards — red front with contact details, black back with the red wordmark', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-website.jpg', alt: 'Website index page on a laptop — red diagonal header and project cards', type: 'process' },
      { src: '/projects/swetafilms/swetafilms-poster.jpg', alt: 'Frame the Unexpected poster on the windscreen of a red car', type: 'process' },
    ],
    featured: false,
  },
  {
    slug: 'central-square',
    number: '09',
    title: 'Central Square',
    category: 'Wayfinding · Signage',
    discipline: 'Signage and wayfinding for a three-plaza commercial complex',
    categories: ['wayfinding'],
    location: 'North Delhi',
    status: 'ongoing',
    hasCaseStudy: true,
    hero: {
      src: '/projects/central-square/central-square-cover.jpg',
      alt: 'Central Square signage and wayfinding: aerial view of the white commercial complex beside the railway lines in North Delhi',
      type: 'hero',
      position: '68% 50%',
    },
    images: [
      { src: '/projects/central-square/central-square-concept.jpg', alt: 'Design concept — a square plus space equals a cube, the language of the signage system', type: 'process' },
      { src: '/projects/central-square/central-square-pattern.jpg', alt: 'Pattern strategy — triangular cut-outs from the wordmark repeated on a modular grid', type: 'process' },
      { src: '/projects/central-square/central-square-colour.jpg', alt: 'Colour palette — one colour per plaza drawn from the building, each with a complementary partner', type: 'process' },
      { src: '/projects/central-square/central-square-parking.jpg', alt: 'Parking colour strategy — a colour for each basement level across signs and markers', type: 'process' },
      { src: '/projects/central-square/central-square-typography.jpg', alt: 'Typography — Noto Sans primary and Hiragino Kaku Gothic ProN secondary', type: 'process' },
      { src: '/projects/central-square/central-square-iconography.jpg', alt: 'Arrows and icons — a master arrow in 45-degree steps and a matching icon family', type: 'process' },
      { src: '/projects/central-square/central-square-hierarchy.jpg', alt: 'Information hierarchy — from city to plaza to tenants, parking and back of house', type: 'process' },
      { src: '/projects/central-square/central-square-journey.jpg', alt: 'User journey — vehicle entries, drop-offs and parking routes across plazas P1, P2 and P3', type: 'process' },
      { src: '/projects/central-square/central-square-city.jpg', alt: 'City-level identification — sightlines from Rani Jhansi Flyover, Gaushala Road and Pratap Nagar Metro', type: 'process' },
      { src: '/projects/central-square/central-square-facade-locations.jpg', alt: 'Facade sign locations on the south and west faces', type: 'process' },
      { src: '/projects/central-square/central-square-plaza-identifiers.jpg', alt: 'Plaza identifiers — P1 and P2 channel letters mocked up on the facade', type: 'process' },
      { src: '/projects/central-square/central-square-facade-sign.jpg', alt: 'Central Square facade sign — 12.35 m channel letters with exploded view', type: 'process' },
      { src: '/projects/central-square/central-square-site-entry.jpg', alt: 'Site entry sign — gate map panel mocked up beside the entrance gate', type: 'process' },
      { src: '/projects/central-square/central-square-primary-pylon.jpg', alt: 'Primary direction pylon — 12-foot pylons in teal and in each plaza colour', type: 'process' },
      { src: '/projects/central-square/central-square-secondary-pylon.jpg', alt: 'Secondary direction pylon — 6-foot pylon for decision points inside the site', type: 'process' },
      { src: '/projects/central-square/central-square-internal.jpg', alt: 'Internal signs, work in progress — floor directories, lift lobby plates and floor numbers', type: 'process' },
    ],
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
