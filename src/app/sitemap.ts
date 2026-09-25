import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = 'https://tagtech.jp'

const routes = [
  { path: '', priority: 1.0 },
  { path: '/tagdeck', priority: 0.9 },
  { path: '/business', priority: 0.7 },
  { path: '/org', priority: 0.7 },
  { path: '/about', priority: 0.6 },
  { path: '/contact', priority: 0.6 },
  { path: '/tagoshi', priority: 0.4 },
  { path: '/privacy', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-05-22'),
    changeFrequency: 'weekly',
    priority,
  }))
}
