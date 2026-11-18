import ContactPage from '@/components/pages/ContactPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Start a project | Ashman Studio',
  description:
    'Tell Ashman Studio about your brand or space. Send a brief, chat on WhatsApp or call our studios in New Delhi and Dubai. We reply within two working days.',
  path: '/contact',
})

export default function Page() {
  return <ContactPage />
}
