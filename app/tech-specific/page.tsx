"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Server, ArrowRight, Home, ChevronRight, Bug, Search, Code, FileCode, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { RecommendedTools } from "@/components/recommended-tools"

const techItems = [
  {
    title: "Microsoft IIS",
    description: "Comprehensive IIS penetration testing guide with 80+ commands",
    href: "/tech-specific/iis",
    available: true,
    commandCount: "80+",
  },
  {
    title: "Next.js",
    description: "CVE-2025-29927 - Next.js middleware authorization bypass",
    href: "/tech-specific/nextjs",
    available: true,
    commandCount: "25+",
  },
  {
    title: "Swagger XSS",
    description: "XSS vulnerabilities in Swagger UI implementations",
    href: "/tech-specific/swagger",
    available: true,
    commandCount: "30+",
  },
  {
    title: "API Fuzzing",
    description: "Techniques for fuzzing REST and GraphQL APIs with ffuf",
    href: "/tech-specific/api-fuzzing",
    available: true,
    commandCount: "50+",
  },
  {
    title: "Spring Boot",
    description: "Spring Boot Actuator discovery, bypass, and exploitation",
    href: "/tech-specific/spring-boot",
    available: true,
    commandCount: "70+",
  },
]

export default function TechSpecificPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Tech-Specific Attacks" />
      <MainSidebar />

      <main className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Tech-Specific</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Server className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Tech-Specific</h1>
            <p className="mt-2 text-muted-foreground">
              Target-specific technologies and frameworks
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {techItems.map((item) => (
              <div
                key={item.href}
                className={cn(
                  "group relative overflow-hidden rounded-xl border p-6 transition-all",
                  item.available
                    ? "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                    : "border-border/50 bg-card/50 cursor-not-allowed"
                )}
              >
                {item.available ? (
                  <Link href={item.href} className="absolute inset-0 z-10" />
                ) : null}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        item.available
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.title === "Microsoft IIS" ? (
                        <Server className="h-6 w-6" />
                      ) : item.title === "Next.js" ? (
                        <Code className="h-6 w-6" />
                      ) : item.title === "Swagger XSS" ? (
                        <FileCode className="h-6 w-6" />
                      ) : item.title === "Spring Boot" ? (
                        <Leaf className="h-6 w-6" />
                      ) : (
                        <Search className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-lg font-semibold",
                          item.available ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.commandCount && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {item.commandCount} commands
                      </span>
                    )}
                    {item.available ? (
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    ) : (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Tools */}
          <RecommendedTools
            toolIds={["ffuf", "nuclei", "burpsuite", "httpx", "xsstrike"]}
            title="الأدوات المقترحة لاختبار التقنيات الخاصة"
          />
        </div>
      </main>
    </div>
  )
}