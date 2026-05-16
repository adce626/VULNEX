import type { MetadataRoute } from 'next'
import { navigation } from '@/lib/site-data'
import { toolsData } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vulnex.vercel.app'

  const staticPages = [
    '',
    '/search',
    '/all',
    '/tools',
    '/recon',
    '/vulnerabilities',
    '/tech-specific',
    '/cloud',
    '/waf-bypass',
    '/advanced',
    '/auth-session',
    '/browser-extensions',
  ]

  const navPages = navigation.flatMap(section =>
    (section.items || []).map(item => item.href)
  )

  const toolPages = toolsData.map(tool => `/tools/${tool.id}`)

  const allUrls = [...staticPages, ...navPages, ...toolPages].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))

  return allUrls
}
