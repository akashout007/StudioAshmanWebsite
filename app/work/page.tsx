import { pageMeta } from '@/lib/seo'
import WorkPage from '@/components/pages/WorkPage'

export const metadata = pageMeta({
  title: 'Brand stories | Ashman Studio',
  description:
    'Brand stories by Ashman Studio: brand identities, wayfinding and signage systems, spatial branding and collateral, from New Delhi and Dubai.',
  path: '/work',
})

// The page is static, so its HTML lists every story. When the URL carries filters, hide the results
// before first paint and let WorkPage reveal them once filtered, so the grid never visibly collapses.
const HIDE_UNTIL_FILTERED =
  "if(/[?&](service|sector)=/.test(location.search))document.documentElement.classList.add('work-filtering')"

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_UNTIL_FILTERED }} />
      <WorkPage />
    </>
  )
}
