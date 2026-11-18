import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/studio', '/contact', '/privacy'].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))
  const projects = PROJECTS.map((p) => ({
    url: `${SITE.url}/work/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...pages, ...projects]
}
