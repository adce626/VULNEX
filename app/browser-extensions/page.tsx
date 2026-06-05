"use client"

import React from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { browserExtensions } from "@/lib/browser-extensions-data"
import { Breadcrumb } from "@/components/breadcrumb"
import { HeroSection } from "@/components/hero-section"
import {
  Puzzle,
  ExternalLink,
  Search,
  Globe,
  Zap,
  Shield,
  Code,
  Clock,
  Moon,
  Target,
  Cloud,
  Brain,
  Image,
  Link2,
  FileEdit,
  Mail,
  FolderSearch,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  moon: <Moon className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  image: <Image className="h-5 w-5" />,
  link: <Link2 className="h-5 w-5" />,
  edit: <FileEdit className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
  "folder-search": <FolderSearch className="h-5 w-5" />,
}

const bgColors = [
  "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  "from-rose-500/20 to-rose-500/5 border-rose-500/30",
  "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
]

export default function BrowserExtensionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Browser Extensions" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[{ label: "Browser Extensions" }]} />
        <HeroSection icon={<Puzzle className="h-8 w-8" />} title="Browser Extensions" description="Essential browser extensions for bug hunting, security testing, OSINT investigations, and privacy protection — curated with direct Chrome Web Store links." />

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {browserExtensions.map((ext, idx) => {
              const gradient = bgColors[idx % bgColors.length]
              return (
                <a
                  key={ext.name}
                  href={ext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

                  <div className="relative">
                    <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", gradient)}>
                      {iconMap[ext.icon] || <Zap className="h-5 w-5 text-primary" />}
                    </div>

                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {ext.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {ext.description}
                    </p>

                    <div className="mt-3 rounded-lg bg-muted/30 px-2.5 py-1.5">
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        <span className="font-medium text-primary">Why?</span> {ext.why}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open in Store <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}



