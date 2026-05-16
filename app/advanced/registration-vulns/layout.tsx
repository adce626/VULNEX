import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registration Vulnerabilities',
  description: 'Registration system vulnerability testing including mass assignment, duplicate accounts, OTP bypass, and rate limiting.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
