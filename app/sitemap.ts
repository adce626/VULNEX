import type { MetadataRoute } from 'next'
import { navigation } from '@/lib/site-data'
import { toolsData } from '@/lib/tools-data'
import { payloadCategories } from '@/lib/payloads-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vulnex.vercel.app'

  const staticPages = [
    '', '/search', '/all', '/methods', '/recon', '/vulnerabilities',
    '/tech-specific', '/cloud', '/waf-bypass', '/advanced',
    '/auth-session', '/browser-extensions', '/bookmarks', '/collections',
    '/tools', '/payloads', '/changelog', '/Hope',
  ]

  const extraPages = [
    '/waf-bypass/idor', '/waf-bypass/sqlmap',
    '/recon/param-discovery/arjun', '/recon/param-discovery/ffuf',
    '/recon/param-discovery/gf', '/recon/param-discovery/paramspider',
    '/recon/param-discovery/x8',
    '/methods/ffuf', '/methods/nuclei-templates', '/methods/rapid-bug-discovery',
    '/advanced/blind-xss-pastejacking', '/advanced/llm-injection',
    '/advanced/rate-limit-bypass', '/advanced/registration-vulns',
  ]

  const navPages = navigation.flatMap(section =>
    (section.items || []).map(item => item.href)
  )

  const toolPages = toolsData.map(tool => `/tools/${tool.id}`)

  const payloadPages = payloadCategories.map(cat => `/payloads/${cat.id}`)

  const allUrls = [...staticPages, ...navPages, ...extraPages, ...toolPages, ...payloadPages].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : path.startsWith('/payloads/') ? 0.7 : 0.8,
  }))

  return allUrls
}
