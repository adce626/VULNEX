import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Not Found',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="relative mb-8">
        <div className="text-[8rem] font-black leading-none tracking-tighter text-primary/10 select-none sm:text-[12rem]">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-2 border-dashed border-primary/30 animate-spin" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-center text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
      >
        Back to Home
      </Link>
    </div>
  )
}
