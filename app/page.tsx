import HomePage from '@/components/pages/HomePage'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: SITE.metaTitle, description: SITE.metaDescription, path: '/' })

export default function Page() {
  return <HomePage />
}
