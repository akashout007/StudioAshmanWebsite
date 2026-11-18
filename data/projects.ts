import type { ServiceSlug } from '@/lib/site'

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  type?: 'hero' | 'gallery' | 'detail' | 'diagram' | 'process'
  section?: StorySection
  position?: string
}

export interface ProjectSection {
  eyebrow?: string
  title?: string
  text?: string
  images?: ProjectImage[]
  layout?: 'full' | 'split' | 'grid' | 'text-only'
}

export type ProjectStatus = 'built' | 'in-progress' | 'concept'
export type StorySection = 'overview' | 'identity' | 'spatial' | 'digital'

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  built: 'Built',
  'in-progress': 'In progress',
  concept: 'Concept',
}
export interface Project {
  slug: string
  number: string
  title: string
  shortTitle?: string
  category: string
  services: ServiceSlug[]
  sector: string
  discipline?: string
  location?: string
  year?: string
  client?: string
  status: ProjectStatus
  role?: string
  scope?: string[]
  description?: string
  introduction?: string
  hero: ProjectImage
  images: ProjectImage[]
  sections?: ProjectSection[]
  featured?: boolean
  hook?: string
  brief?: string
  story?: string
  identityText?: string
  spatialText?: string
  digitalText?: string
  outcome?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'regency-hospital',
    number: '01',
    title: 'Regency Kanpur Hospital',
    category: 'Wayfinding · Signage',
    discipline: 'Bilingual wayfinding concept and a gate, drop-off and corridor sign family for a hospital campus',
    services: ['wayfinding-signage', 'spatial-branding'],
    sector: 'Healthcare',
    location: 'Kanpur',
    year: '2026',
    status: 'concept',
    hero: {
      src: '/projects/regency/regency-cover.jpg',
      alt: 'Regency Kanpur Hospital signage and wayfinding concept: night elevation with the REGENCY KANPUR T3 crown, red R+ symbol and EMERGENCY sign',
      type: 'hero',
      position: '72% 50%',
    },
    images: [
      { src: '/projects/regency/regency-objective.jpg', alt: 'Design objective — guide people from the city, through the campus and back, for every kind of visitor', type: 'process', section: 'overview' },
      { src: '/projects/regency/regency-typography.jpg', alt: 'Typography — Open Sans for English and Mukta for Hindi', type: 'process', section: 'identity' },
      { src: '/projects/regency/regency-visual-strategy.jpg', alt: 'Visual strategy — Kanpur culture in black and white photographs on red and brown', type: 'process', section: 'overview' },
      { src: '/projects/regency/regency-inspiration.jpg', alt: 'Design inspiration — the Ganga ghats, Kanpur\'s festivals and performance arts, and the Leather City\'s craft', type: 'process', section: 'overview' },
      { src: '/projects/regency/regency-colour.jpg', alt: 'Colour identity — a colour pair for each core: OPD, IPD, Emergency and Diagnosis', type: 'process', section: 'identity' },
      { src: '/projects/regency/regency-external-strategy.jpg', alt: 'External strategy — facade range map showing visibility radius and view cones around the hospital', type: 'process', section: 'spatial' },
      { src: '/projects/regency/regency-facade.jpg', alt: 'Facade signage — hospital, brand and arrival elements on the day elevation', type: 'process', section: 'spatial' },
      { src: '/projects/regency/regency-dr01.jpg', alt: 'EXT-DR01 vehicular directional sign — gate number and 24 x 7 Emergency pylon with exploded view', type: 'process', section: 'spatial' },
      { src: '/projects/regency/regency-dr02.jpg', alt: 'EXT-DR02 drop-off sign — bilingual OPD drop-off pylon with a parking panel', type: 'process', section: 'spatial' },
      { src: '/projects/regency/regency-hanging.jpg', alt: 'INT-DR01 and INT-DR02 hanging signs — Reception and OPD Register panels with dimensions and in-situ views', type: 'process', section: 'spatial' },
      { src: '/projects/regency/regency-corridor.jpg', alt: 'INT-DR03 corridor directional sign — bilingual directions ending with the floor number', type: 'process', section: 'spatial' },
    ],
    featured: true,
  },
  {
    slug: 'artnest-studio',
    number: '02',
    title: 'ArtNest Studio',
    category: 'Brand Identity · Visual Communication',
    discipline: 'Brand identity for a community art studio',
    services: ['brand-identity', 'digital-collateral'],
    sector: 'Creative education',
    location: 'Charmwood Village, Faridabad',
    client: 'ArtNest Studio',
    status: 'built',
    hero: {
      src: '/projects/artnest/artnest-cover.jpg',
      alt: 'ArtNest Studio wordmark on green, surrounded by four poses of the bird mascot',
      type: 'hero',
    },
    images: [
      { src: '/projects/artnest/artnest-about.jpg', alt: 'About ArtNest Studio — a community-driven creative space for children and adults', type: 'process', section: 'overview' },
      { src: '/projects/artnest/artnest-wordmark.jpg', alt: 'Wordmark — primary, outline and bordered versions with safe space and construction grid', type: 'process', section: 'identity' },
      { src: '/projects/artnest/artnest-mascot.jpg', alt: 'Mascot — six poses of the green bird on alternating brand colour tiles', type: 'process', section: 'identity' },
      { src: '/projects/artnest/artnest-colour.jpg', alt: 'Colour palette — brand colours, mascot colours and the wordmark on each colour', type: 'process', section: 'identity' },
      { src: '/projects/artnest/artnest-typography.jpg', alt: 'Typography — Baileywick JF Gothic for headings and Acumin Variable Concept for body text', type: 'process', section: 'identity' },
      { src: '/projects/artnest/artnest-illustration.jpg', alt: 'Illustration style — minimal line-art studio scenes at low opacity on brand colours', type: 'process', section: 'identity' },
      { src: '/projects/artnest/artnest-social-posts.jpg', alt: 'Social media posts — brand communication, children\'s and adult announcements, and imagery', type: 'process', section: 'digital' },
      { src: '/projects/artnest/artnest-instagram.jpg', alt: 'Instagram profile on a phone, flanked by two workshop posts', type: 'process', section: 'digital' },
      { src: '/projects/artnest/artnest-business-card.jpg', alt: 'Business cards for the creative hosts, with mascot fronts and contact backs', type: 'process', section: 'digital' },
      { src: '/projects/artnest/artnest-merchandise.jpg', alt: 'Merchandise — host, child and adult wearing ArtNest mascot T-shirts', type: 'process', section: 'digital' },
      { src: '/projects/artnest/artnest-in-context.jpg', alt: 'In context — notebook and stationery, mascot washroom sign and posters on a wall', type: 'process', section: 'spatial' },
      { src: '/projects/artnest/artnest-closing.jpg', alt: 'Tote bags in off-white, lime and green, each with a mascot pose', type: 'process', section: 'digital' },
    ],
    featured: true,
  },
  {
    slug: 'mall-of-expressway',
    number: '03',
    title: 'Mall of Expressway',
    category: 'Wayfinding · Signage',
    discipline: 'Signage and wayfinding for a retail mall with studio apartments',
    services: ['wayfinding-signage', 'spatial-branding'],
    sector: 'Retail and residential',
    location: 'Greater Noida',
    year: '2026',
    status: 'built',
    hero: {
      src: '/projects/mall-of-expressway/mall-banner.jpg',
      alt: 'Render of the Mall of Expressway building with domed towers and street frontage, Greater Noida',
      type: 'hero',
      position: '50% 50%',
    },
    images: [
      { src: '/projects/mall-of-expressway/mall-cover.jpg', alt: 'Mall of Expressway signage and wayfinding — brass 02 floor graphic in a stairwell', type: 'process', section: 'overview' },
      { src: '/projects/mall-of-expressway/mall-intro.jpg', alt: 'Introduction — one signage system for a retail mall with studio apartments', type: 'process', section: 'overview' },
      { src: '/projects/mall-of-expressway/mall-iconography.jpg', alt: 'Iconography and arrows — pictograms and arrows drawn on a grid', type: 'process', section: 'identity' },
      { src: '/projects/mall-of-expressway/mall-typography.jpg', alt: 'Typography and colour — Montserrat Regular, brass, matt grey and fire red', type: 'process', section: 'identity' },
      { src: '/projects/mall-of-expressway/mall-building-id.jpg', alt: 'Building identification — halo-lit brass letters and rooftop channel letters', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-pylons.jpg', alt: 'Entrance and directional pylons — matt grey aluminium with halo-lit brass graphics', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-arrival.jpg', alt: 'Drop-off and parking entrance signs beside a car for scale', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-parking.jpg', alt: 'Parking gantry with clearance bar, and an internally lit ceiling sign', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-wall-graphics.jpg', alt: 'Large-scale wall graphics — exit, lift lobby and 1500 mm floor numbers', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-rooms.jpg', alt: 'Room identification — amenity, back-of-house and apartment signs with braille', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-circulation.jpg', alt: 'Floors, stairs and lifts — floor, stair and service lift signs', type: 'process', section: 'spatial' },
      { src: '/projects/mall-of-expressway/mall-directional.jpg', alt: 'Directional signs — amenity, apartment, ceiling and wall directionals', type: 'process', section: 'overview' },
      { src: '/projects/mall-of-expressway/mall-directory.jpg', alt: 'Lift directory and fire equipment signs', type: 'process', section: 'spatial' },
    ],
    featured: true,
  },
  {
    slug: 'kaamya-greens',
    number: '04',
    title: 'Kaamya Greens',
    category: 'Wayfinding · Signage',
    discipline: 'Signage and wayfinding for a mixed-use residential development',
    services: ['wayfinding-signage', 'spatial-branding'],
    sector: 'Residential',
    location: 'Greater Noida',
    year: '2026',
    status: 'built',
    hero: {
      src: '/projects/kaamya-greens/kaamya-hero.jpg',
      alt: 'Aerial render of the Kaamya Greens towers and clubhouse, Greater Noida',
      type: 'hero',
    },
    images: [
      { src: '/projects/kaamya-greens/kaamya-cover.jpg', alt: 'Kaamya Greens signage and wayfinding — T1 Diamond tower pylon beside a car park entrance', type: 'process', section: 'overview' },
      { src: '/projects/kaamya-greens/kaamya-intro.jpg', alt: 'Introduction — one signage system for a mixed-use residential development in Greater Noida', type: 'process', section: 'overview' },
      { src: '/projects/kaamya-greens/kaamya-iconography.jpg', alt: 'Iconography and arrows — pictograms and arrows drawn on a grid', type: 'process', section: 'identity' },
      { src: '/projects/kaamya-greens/kaamya-typography.jpg', alt: 'Typography — Lato Regular and Satista, sized for viewing distance', type: 'process', section: 'identity' },
      { src: '/projects/kaamya-greens/kaamya-layout.jpg', alt: 'Sign layout for an apartment block — every sign placed on the plan and coded by family', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-sapphire.jpg', alt: 'Sapphire building identification — brass letters with a halo, and a photo mockup', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-tower.jpg', alt: 'Tower pylon — matt grey body with brass panel and lit text, by day and night', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-exterior.jpg', alt: 'Exterior directional family — area identification, vehicular and pedestrian pylons', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-parking.jpg', alt: 'Parking entrance sign — suspended brass panel with NO EXIT reverse and clearance bar', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-interior.jpg', alt: 'Interior identification and direction — brass on matt grey with braille', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-safety.jpg', alt: 'Back-of-house and safety signs — room, warning and fire equipment', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-finish-a.jpg', alt: 'Finish exploration — dark panel with brass edge', type: 'process', section: 'spatial' },
      { src: '/projects/kaamya-greens/kaamya-finish-b.jpg', alt: 'Finish exploration — rust-textured panel', type: 'process', section: 'spatial' },
    ],
    featured: false,
  },
  {
    slug: 'bollywood-kabab',
    number: '05',
    title: 'Bollywood Kabab',
    category: 'Brand Identity · Signage',
    discipline: 'Cinema-inspired brand identity and facade signage for a kebab restaurant',
    services: ['brand-identity', 'spatial-branding', 'digital-collateral'],
    sector: 'Food and beverage',
    location: 'Greater Noida',
    client: 'Bollywood Kabab',
    status: 'built',
    hero: {
      src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg',
      alt: 'Bollywood Kebabs restaurant at dusk: glass frontage with black film-reel skewer letters above the entrance',
      type: 'hero',
    },
    images: [
      { src: '/projects/bollywood-kabab/bollywood-kabab-overview.jpg', alt: 'Brand overview — a cinema-inspired kebab restaurant, its audience and the Nostalgic Foodie persona', type: 'process', section: 'overview' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-direction.jpg', alt: 'Selected direction — cinema as a visual language, chosen from three concepts', type: 'process', section: 'overview' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-wordmark.jpg', alt: 'Wordmark — Art Deco cinema letterforms with seekh-skewer swashes, stacked and single-line lockups', type: 'process', section: 'identity' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-wordmark-applied.jpg', alt: 'Wordmark on black, red and blush, with a kebab skewer photo, an embossed card and the neon storefront', type: 'process', section: 'identity' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-facade.jpg', alt: 'Facade — illuminated letters across a black louvred frontage', type: 'process', section: 'spatial' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-fabrication.jpg', alt: 'Letter fabrication — exploded channel letter with acrylic face, aluminium channel, LED modules and mounting', type: 'process', section: 'spatial' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-menu.jpg', alt: 'Drinks menu — black cover and red mocktails panel', type: 'process', section: 'digital' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-menu-sections.jpg', alt: 'Menu sections — mocktails, smoothies, shakes, cold coffee, iced tea and beverages', type: 'process', section: 'digital' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-table-tent.jpg', alt: 'Table tent — Today\'s Special tent card draft and TC 001 dieline', type: 'process', section: 'digital' },
      { src: '/projects/bollywood-kabab/bollywood-kabab-closing.jpg', alt: 'Drinks menu front and back covers on black', type: 'process', section: 'digital' },
    ],
    featured: false,
  },
  {
    slug: 'chopra-soda',
    number: '06',
    title: 'Chopra\'s Lemon Soda',
    category: 'Brand Identity · Collaterals',
    discipline: 'Brand collaterals and menu for a soda bar',
    services: ['brand-identity', 'digital-collateral'],
    sector: 'Food and beverage',
    location: 'Zira, Punjab',
    year: '2026',
    client: 'Chopra\'s Lemon Soda',
    status: 'built',
    hero: {
      src: '/projects/chopra-soda/chopra-hero.jpg',
      alt: 'Clear takeaway cup of lemon soda printed with the Chopra\'s badge, on a yellow backdrop',
      type: 'hero',
    },
    images: [
      { src: '/projects/chopra-soda/chopra-overview.jpg', alt: 'Overview — a soda bar on Ferozepur Road, Zira, with the real storefront', type: 'process', section: 'overview' },
      { src: '/projects/chopra-soda/chopra-badge.jpg', alt: 'The lemon badge — full-colour primary badge and the one-colour print on a cup', type: 'process', section: 'identity' },
      { src: '/projects/chopra-soda/chopra-colour-type.jpg', alt: 'Colour and graphic language — lemon, mustard, charcoal and white, from the menu', type: 'process', section: 'identity' },
      { src: '/projects/chopra-soda/chopra-takeaway.jpg', alt: 'Takeaway — yellow carry bag and kraft boxes sealed with badge stickers', type: 'process', section: 'digital' },
      { src: '/projects/chopra-soda/chopra-food-service.jpg', alt: 'Food service — burger box, fries carton, napkins and coasters', type: 'process', section: 'digital' },
      { src: '/projects/chopra-soda/chopra-hot-cups-cards.jpg', alt: 'Hot cups for tea and coffee, and the lemon and charcoal business card', type: 'process', section: 'digital' },
      { src: '/projects/chopra-soda/chopra-uniform.jpg', alt: 'Staff uniform — lemon tee, charcoal apron and cap with the badge', type: 'process', section: 'digital' },
      { src: '/projects/chopra-soda/chopra-menu.jpg', alt: 'The six-panel menu — refreshments, savoury bites and sweet treats', type: 'process', section: 'digital' },
      { src: '/projects/chopra-soda/chopra-menu-screen.jpg', alt: 'The menu on the wide screen above the counter', type: 'process', section: 'spatial' },
      { src: '/projects/chopra-soda/chopra-closing.jpg', alt: 'In store — the café interior in Zira with the menu screen and yellow brick wall', type: 'process', section: 'spatial' },
    ],
    featured: false,
  },
  {
    slug: 'delhigrapher',
    number: '07',
    title: 'Delhigrapher',
    category: 'Brand Identity',
    discipline: 'Brand identity for a wedding photography practice',
    services: ['brand-identity', 'digital-collateral'],
    sector: 'Wedding photography',
    location: 'New Delhi',
    year: '2026',
    client: 'Delhigrapher',
    status: 'built',
    hero: {
      src: '/delhigrapher/delhigrapher-cover.jpg',
      alt: 'Delhigrapher brand overview — black and white wedding photograph beside the handwritten Delhigrapher wordmark',
      type: 'hero',
    },
    images: [
      { src: '/delhigrapher/Delhigrapher-02_page-0002.jpg', alt: 'About Delhigrapher — a wedding practice rooted in observation', type: 'process', section: 'overview' },
      { src: '/delhigrapher/Delhigrapher-02_page-0003.jpg', alt: 'Brand assets — handwritten wordmark and safe space construction', type: 'process', section: 'identity' },
      { src: '/delhigrapher/delhigrapher-type-colour.jpg', alt: 'Typography (Human Sans weights) and colours: black and white primaries with muted red, ochre yellow and soft blue', type: 'process', section: 'identity' },
      { src: '/delhigrapher/Delhigrapher-02_page-0006.jpg', alt: 'Watermark — outline and solid wordmark variants placed on photographs', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0007.jpg', alt: 'Seal and stickers — D monogram seals in the brand colours', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0008.jpg', alt: 'Visiting card — black front with white wordmark, textured back with contact details', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0009.jpg', alt: 'Proposal — digital proposal with cover, event details, deliverables and payment terms', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0010.jpg', alt: 'Social media — Instagram profile with D mark avatar, highlights and post grid', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0011.jpg', alt: 'Stickers — event illustration stickers for Haldi, cocktail party and wedding day', type: 'process', section: 'digital' },
      { src: '/delhigrapher/Delhigrapher-02_page-0012.jpg', alt: 'Website — home page with black and white hero photograph', type: 'process', section: 'digital' },
    ],
    featured: false,
  },
  {
    slug: 'swetafilms',
    number: '08',
    title: 'Sweta Films',
    category: 'Brand Identity',
    discipline: 'Brand identity for a photography and visual storytelling practice',
    services: ['brand-identity', 'digital-collateral'],
    sector: 'Photography and film',
    location: 'Dubai',
    client: 'Sweta Films',
    status: 'built',
    hero: {
      src: '/projects/swetafilms/swetafilms-cover.jpg',
      alt: 'Sweta Films wordmark in a red block over a black and white studio shot of a model under a spotlight',
      type: 'hero',
    },
    images: [
      { src: '/projects/swetafilms/swetafilms-overview.jpg', alt: 'Brand overview — a photography, fashion and commercial visual storytelling practice in Dubai', type: 'process', section: 'overview' },
      { src: '/projects/swetafilms/swetafilms-construction.jpg', alt: 'Wordmark construction — condensed letters in two blocks split by a rising diagonal, on a grid', type: 'process', section: 'identity' },
      { src: '/projects/swetafilms/swetafilms-typography.jpg', alt: 'Typography — FRANK for display and Helvetica for text', type: 'process', section: 'identity' },
      { src: '/projects/swetafilms/swetafilms-colour.jpg', alt: 'Colour palette — red DA3832, light grey E6E6E6 and black 101010', type: 'process', section: 'identity' },
      { src: '/projects/swetafilms/swetafilms-card.jpg', alt: 'Business cards — red front with contact details, black back with the red wordmark', type: 'process', section: 'digital' },
      { src: '/projects/swetafilms/swetafilms-website.jpg', alt: 'Website index page on a laptop — red diagonal header and project cards', type: 'process', section: 'digital' },
      { src: '/projects/swetafilms/swetafilms-poster.jpg', alt: 'Frame the Unexpected poster on the windscreen of a red car', type: 'process', section: 'digital' },
    ],
    featured: false,
  },
  {
    slug: 'central-square',
    number: '09',
    title: 'Central Square',
    category: 'Wayfinding · Signage',
    discipline: 'Signage and wayfinding for a three-plaza commercial complex',
    services: ['wayfinding-signage', 'spatial-branding'],
    sector: 'Commercial real estate',
    location: 'North Delhi',
    status: 'in-progress',
    hero: {
      src: '/projects/central-square/central-square-hero.jpg',
      alt: 'Aerial view of Central Square, a long white commercial complex beside the railway lines in North Delhi',
      type: 'hero',
    },
    images: [
      { src: '/projects/central-square/central-square-concept.jpg', alt: 'Design concept — a square plus space equals a cube, the language of the signage system', type: 'process', section: 'overview' },
      { src: '/projects/central-square/central-square-pattern.jpg', alt: 'Pattern strategy — triangular cut-outs from the wordmark repeated on a modular grid', type: 'process', section: 'identity' },
      { src: '/projects/central-square/central-square-colour.jpg', alt: 'Colour palette — one colour per plaza drawn from the building, each with a complementary partner', type: 'process', section: 'identity' },
      { src: '/projects/central-square/central-square-parking.jpg', alt: 'Parking colour strategy — a colour for each basement level across signs and markers', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-typography.jpg', alt: 'Typography — Noto Sans primary and Hiragino Kaku Gothic ProN secondary', type: 'process', section: 'identity' },
      { src: '/projects/central-square/central-square-iconography.jpg', alt: 'Arrows and icons — a master arrow in 45-degree steps and a matching icon family', type: 'process', section: 'identity' },
      { src: '/projects/central-square/central-square-hierarchy.jpg', alt: 'Information hierarchy — from city to plaza to tenants, parking and back of house', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-journey.jpg', alt: 'User journey — vehicle entries, drop-offs and parking routes across plazas P1, P2 and P3', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-city.jpg', alt: 'City-level identification — sightlines from Rani Jhansi Flyover, Gaushala Road and Pratap Nagar Metro', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-facade-locations.jpg', alt: 'Facade sign locations on the south and west faces', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-plaza-identifiers.jpg', alt: 'Plaza identifiers — P1 and P2 channel letters mocked up on the facade', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-facade-sign.jpg', alt: 'Central Square facade sign — 12.35 m channel letters with exploded view', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-site-entry.jpg', alt: 'Site entry sign — gate map panel mocked up beside the entrance gate', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-primary-pylon.jpg', alt: 'Primary direction pylon — 12-foot pylons in teal and in each plaza colour', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-secondary-pylon.jpg', alt: 'Secondary direction pylon — 6-foot pylon for decision points inside the site', type: 'process', section: 'spatial' },
      { src: '/projects/central-square/central-square-internal.jpg', alt: 'Internal signs, work in progress — floor directories, lift lobby plates and floor numbers', type: 'process', section: 'spatial' },
    ],
    featured: false,
  },
  {
    slug: 'intiva',
    number: '10',
    title: 'Intiva',
    category: 'Brand Identity · Packaging',
    discipline: 'Brand identity and packaging for a foaming intimate wash',
    services: ['brand-identity', 'digital-collateral'],
    sector: 'Personal care',
    client: 'Intiva',
    status: 'built',
    hero: {
      src: '/projects/intiva/intiva-cover.jpg',
      alt: 'Intiva foaming intimate wash bottle surrounded by witch hazel, tea tree blossom, aloe vera and water droplets',
      type: 'hero',
    },
    images: [
      { src: '/projects/intiva/intiva-wordmark.jpg', alt: 'Intiva wordmark in black serif on sand', type: 'process', section: 'identity' },
      { src: '/projects/intiva/intiva-construction.jpg', alt: 'Wordmark construction — outlines and anchor points between cap-height and baseline guides', type: 'process', section: 'identity' },
      { src: '/projects/intiva/intiva-colour.jpg', alt: 'Colour palette — off-white F9F9F4, sand EFDFD0, blue 22408B and black 121211', type: 'process', section: 'identity' },
      { src: '/projects/intiva/intiva-label.jpg', alt: 'Bottle label artwork — Foaming Intimate Wash for men and women, with its four ingredients', type: 'process', section: 'digital' },
      { src: '/projects/intiva/intiva-dieline.jpg', alt: 'Carton dieline with the vertical Intiva front panel and the folded box outline', type: 'process', section: 'digital' },
      { src: '/projects/intiva/intiva-bottle.jpg', alt: 'Hand holding the Intiva foaming wash bottle among mugwort leaves and oil bubbles', type: 'process', section: 'digital' },
      { src: '/projects/intiva/intiva-box.jpg', alt: 'Hand holding the Intiva carton among mugwort leaves and oil bubbles', type: 'process', section: 'digital' },
      { src: '/projects/intiva/intiva-foam.jpg', alt: 'Foam pumped from the Intiva bottle into an open palm', type: 'process', section: 'digital' },
    ],
    featured: false,
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const list = orderedProjects()
  const idx = list.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: list[(idx - 1 + list.length) % list.length],
    next: list[(idx + 1) % list.length],
  }
}

const STATUS_ORDER: Record<ProjectStatus, number> = { built: 0, 'in-progress': 1, concept: 2 }

/** Built and delivered work first, then work in progress, then concepts. */
export function orderedProjects(list: Project[] = PROJECTS): Project[] {
  return [...list].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.number.localeCompare(b.number),
  )
}

export const placeholder = (what: string) => `[PLACEHOLDER: ${what}]`
