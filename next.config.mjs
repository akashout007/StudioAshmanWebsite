/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/work/sikka-kaamya-greens', destination: '/work/kaamya-greens', permanent: true },
    ]
  },
}
export default nextConfig
