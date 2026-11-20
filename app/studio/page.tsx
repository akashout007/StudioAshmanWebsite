import StudioPage from '@/components/pages/StudioPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About the studio | Ashman Studio',
  description:
    'Ashman Studio is a spatial branding studio founded by Akash Manna. We build brands from the first idea to the last sign, designed as one system. New Delhi and Dubai.',
  path: '/studio',
})

export default function Page() {
  return <StudioPage />
}
