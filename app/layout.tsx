import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme-provider"
import { PageTracker } from "@/components/page-tracker"
import { ScrollToTop } from "@/components/scroll-to-top"
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'VULNEX',
    template: '%s | VULNEX',
  },
  description:
    'A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists.',
  generator: 'v0.app',
  icons: '/favicon.svg',
  manifest: '/manifest.json',
  openGraph: {
    title: 'VULNEX — Web Hacking Playbook',
    description: 'Ready-to-use payloads, exploitation techniques, and security tools for researchers and bug hunters.',
    url: 'https://vulnex.vercel.app',
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["dark", "light", "neon"]}
        >
          {children}
          <PageTracker />
          <ScrollToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'oklch(0.15 0.005 260)',
                border: '1px solid oklch(0.25 0.01 260)',
                color: 'oklch(0.9 0.005 260)',
              },
            }}
          />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
