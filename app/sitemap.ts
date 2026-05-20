import type { MetadataRoute } from 'next'
import { navigation } from '@/lib/site-data'
import { toolsData } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vulnex.vercel.app'

  const staticPages = [
    '',
    '/search',
    '/all',
    '/methods',
    '/recon',
    '/vulnerabilities',
    '/tech-specific',
    '/cloud',
    '/waf-bypass',
    '/advanced',
    '/auth-session',
    '/browser-extensions',
    '/bookmarks',
    '/tools',
    '/payloads',
  ]

  const extraPages = [
    '/waf-bypass/idor',
    '/waf-bypass/sqlmap',
    '/recon/param-discovery/arjun',
    '/recon/param-discovery/ffuf',
    '/recon/param-discovery/gf',
    '/recon/param-discovery/paramspider',
    '/recon/param-discovery/x8',
  ]

  const navPages = navigation.flatMap(section =>
    (section.items || []).map(item => item.href)
  )

  const toolPages = toolsData.map(tool => `/tools/${tool.id}`)

  const allUrls = [...staticPages, ...navPages, ...extraPages, ...toolPages].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))

  return allUrls
}
