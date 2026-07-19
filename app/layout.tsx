import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme-provider"
import { PageTracker } from "@/components/page-tracker"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SWRegister } from "@/components/sw-register"
import { PageTransition } from "@/components/page-transition"
import './globals.css'

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vulnex.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'VULNEX',
    template: '%s | VULNEX',
  },
  description:
    'A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists.',
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192.svg',
  },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'VULNEX', statusBarStyle: 'black-translucent' },
  openGraph: {
    title: 'VULNEX — Web Hacking Playbook',
    description: 'Ready-to-use payloads, exploitation techniques, and security tools for researchers and bug hunters.',
    url: siteUrl,
    siteName: 'VULNEX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VULNEX — Web Hacking Playbook',
    description: 'Ready-to-use payloads, exploitation techniques, and security tools.',
    creator: '@adce626',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VULNEX",
              description: "A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists.",
              url: siteUrl,
              author: { "@type": "Person", name: "adce626" },
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
            }),
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground">
          Skip to main content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.addEventListener('touchstart',function(){setTimeout(function(){document.querySelectorAll('[class*=group]').forEach(function(e){e.dispatchEvent(new MouseEvent('mouseleave',{bubbles:true}))})},300)},{passive:true})",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="neon"
          enableSystem
          disableTransitionOnChange
          themes={["neon", "light", "dark"]}
        >
          <PageTransition>{children}</PageTransition>
          <PageTracker />
          <ScrollToTop />
          <SWRegister />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
