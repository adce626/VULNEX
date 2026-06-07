import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search?q=', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://vulnex.vercel.app/sitemap.xml',
  }
}
