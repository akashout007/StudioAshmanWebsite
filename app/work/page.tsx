import { Suspense } from 'react'
import type { Metadata } from 'next'
import WorkPage from '@/components/pages/WorkPage'

export const metadata: Metadata = {
  title: 'Brand stories: wayfinding, identity and spatial branding work | Ashman Studio',
  description:
    'Selected brand stories by Ashman Studio: brand identities, wayfinding and signage systems, spatial branding and collateral for clients in India and the Gulf.',
  alternates: { canonical: '/work' },
}

export default function Page() {
  return (
    <Suspense>
      <WorkPage />
    </Suspense>
  )
}
