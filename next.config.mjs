const legacySections = [
  { section: 'work', destination: '/work' },
  { section: 'studio', destination: '/studio' },
  { section: 'contact', destination: '/contact' },
  { section: 'services', destination: '/#what-we-do' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/work/sikka-kaamya-greens', destination: '/work/kaamya-greens', permanent: true },
      ...legacySections.map(({ section, destination }) => ({
        source: '/',
        has: [{ type: 'query', key: 'section', value: section }],
        destination,
        permanent: true,
      })),
    ]
  },
}
export default nextConfig
