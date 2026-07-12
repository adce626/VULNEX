import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cloud & Assets',
  description: 'AWS, Azure, GCP misconfigurations, S3 buckets, Google API keys, and cloud security testing.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
