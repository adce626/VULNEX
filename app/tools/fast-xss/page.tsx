"use client"

import { useState } from "react"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import { fastXSSCategories, fastXSSTools } from "@/lib/fast-xss-data"
import { Zap, ExternalLink } from "lucide-react"

export default function FastXSSPage() {
  const [activeCategory, setActiveCategory] = useState(fastXSSCategories[0].category)
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const phases = fastXSSCategories.map((cat) => ({
    id: cat.category,
    label: cat.category,
  }))

  return (
    <ContentLayout
      pageTitle="Fast XSS"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Fast XSS" },
      ]}
      hero={{
        icon: Zap,
        title: "Fast XSS — Automated Cross-Site Scripting Pipeline",
        description:
          "A powerful one-line command that chains GAU, gf, URO, Gxss, kxss, and more for automated XSS discovery and filtering.",
        stats: [
          { label: "6 Phases", className: "bg-primary/10 text-primary" },
          { label: `${fastXSSCategories.reduce((acc, c) => acc + c.commands.length, 0)} Commands`, className: "bg-accent/10 text-accent" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-primary/10 via-background to-accent/5",
        iconBg: "bg-primary/10 text-primary",
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-primary text-primary-foreground"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >
      {fastXSSCategories.map((cat) => (
        <section key={cat.category} id={cat.category} className="scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{cat.category}</h2>
          <div className="space-y-3">
            {cat.commands.map((cmd, idx) => (
              <CommandCard
                key={idx}
                index={idx + 1}
                command={cmd.command}
                description={cmd.description}
                pageTitle="Fast XSS"
              />
            ))}
          </div>
        </section>
      ))}

      {/* Tools Reference */}
      <section className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Referenced Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {fastXSSTools.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <p className="font-medium text-foreground">{tool.name}</p>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>
    </ContentLayout>
  )
}
