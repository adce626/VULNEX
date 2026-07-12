import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech-Specific Attacks',
  description: 'IIS, Apache, Next.js, Spring Boot, Swagger, and framework-specific attack techniques.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
