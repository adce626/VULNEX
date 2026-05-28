"use client"

import { type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeroStat {
  label: string
  className: string
}

interface HeroConfig {
  icon: React.ElementType
  title: string
  description: string
  stats: HeroStat[]
  gradient: string
  iconBg: string
  image?: { src: string; alt: string }
  source?: { label: string; url: string; username: string }
  decor?: ReactNode
}

interface PhaseItem {
  id: string
  label: string
}

interface ContentLayoutProps {
  pageTitle: string
  breadcrumbItems: BreadcrumbItem[]
  hero: HeroConfig
  phases: PhaseItem[]
  activeCategory: string
  onPhaseChange: (id: string) => void
  navActiveClass: string
  children: ReactNode
  expandedImg: string | null
  onLightboxClose: () => void
  onLightboxOpen?: (src: string) => void
  footerText?: string
}

export function ContentLayout({
  pageTitle,
  breadcrumbItems,
  hero: { icon: HeroIcon, title: heroTitle, description: heroDescription, stats: heroStats, gradient: heroGradient, iconBg: heroIconBg, image: heroImage, source: heroSource, decor: heroDecor },
  phases,
  activeCategory,
  onPhaseChange,
  navActiveClass,
  children,
  expandedImg,
  onLightboxOpen,
  onLightboxClose,
  footerText = "This guide is for ethical use and authorized penetration testing only",
}: ContentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title={pageTitle} />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronRight className="h-4 w-4" />}
                  {item.href ? (
                    <Link href={item.href} className="flex items-center gap-1 hover:text-foreground">
                      {item.label === "Home" ? <Home className="h-4 w-4" /> : item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${heroGradient}`}>
          {heroDecor}
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${heroIconBg}`}>
              <HeroIcon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              {heroTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              {heroDescription}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {heroStats.map((stat, idx) => (
                <span key={idx} className={`rounded-full px-4 py-2 text-sm font-medium ${stat.className}`}>
                  {stat.label}
                </span>
              ))}
            </div>
            {heroImage && (
              <>
                <div
                  className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-border cursor-pointer"
                  onClick={() => onLightboxOpen?.(heroImage.src)}
                >
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={1200}
                    height={675}
                    className="w-full"
                    style={{ height: "auto" }}
                  />
                </div>
                {heroSource && (
                  <div className="mt-4 text-center text-sm">
                    <span className="text-muted-foreground">Source: </span>
                    <a
                      href={heroSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {heroSource.username}
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div role="tablist" className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  role="tab"
                  aria-selected={activeCategory === phase.id}
                  onClick={() => onPhaseChange(phase.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeCategory === phase.id
                      ? navActiveClass
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl space-y-16 p-6">
          {children}

          {/* Footer */}
          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">{footerText}</p>
          </footer>
        </div>
      </main>

      {/* Lightbox Overlay */}
      {expandedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onLightboxClose}
        >
          <button
            onClick={onLightboxClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white text-xl hover:bg-black/70"
          >
            ✕
          </button>
          <Image
            src={expandedImg}
            alt="Expanded view"
            width={1200}
            height={675}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
