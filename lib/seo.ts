import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const DEFAULT_OG_IMAGE = '/og/ashman-studio.jpg'

export function pageMeta({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt }: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }]
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', url: path, title, description, images },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
