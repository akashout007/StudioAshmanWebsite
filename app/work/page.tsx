import { pageMeta } from '@/lib/seo'
import WorkPage from '@/components/pages/WorkPage'

export const metadata = pageMeta({
  title: 'Brand stories | Ashman Studio',
  description:
    'Brand stories by Ashman Studio: brand identities, wayfinding and signage systems, spatial branding and collateral, from New Delhi and Dubai.',
  path: '/work',
})

export default function Page() {
  return <WorkPage />
}
