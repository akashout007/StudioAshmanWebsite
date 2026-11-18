import StudioPage from '@/components/pages/StudioPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About the studio | Ashman Studio',
  description:
    'Ashman Studio is a multidisciplinary practice founded by Akash Manna, building brand identities, wayfinding and spatial branding as one system. New Delhi and Dubai.',
  path: '/studio',
})

export default function Page() {
  return <StudioPage />
}
