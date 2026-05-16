"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Bug, ArrowRight, Home, ChevronRight, Database, Globe, Link2, FileText, Shield, AlertTriangle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { RecommendedTools } from "@/components/recommended-tools"

const vulnItems = [
  {
    title: "SQL Injection",
    description: "SQL injection payloads, detection, and exploitation techniques",
    href: "/vulnerabilities/sql-injection",
    available: true,
    commandCount: "60+",
  },
  {
    title: "WordPress",
    description: "WordPress security vulnerabilities and exploitation",
    href: "/vulnerabilities/wordpress",
    available: true,
    commandCount: "40+",
  },
  {
    title: "Open Redirect",
    description: "Open redirect methods and bypass techniques",
    href: "/vulnerabilities/open-redirect",
    available: true,
    commandCount: "25+",
  },
  {
    title: "CRLF Injection",
    description: "Carriage Return Line Feed injection attacks",
    href: "/vulnerabilities/crlf-injection",
    available: true,
    commandCount: "20+",
  },
  {
    title: "Dependency Confusion",
    description: "Exploiting package manager vulnerabilities",
    href: "/vulnerabilities/dependency-confusion",
    available: true,
    commandCount: "25+",
  },
  {
    title: "Host Header Injection",
    description: "Host header injection and cache poisoning",
    href: "/vulnerabilities/host-header-injection",
    available: true,
    commandCount: "30+",
  },
  {
    title: "403 Bypass",
    description: "403 forbidden bypass techniques and methods",
    href: "/vulnerabilities/403-bypass",
    available: true,
    commandCount: "50+",
  },
  {
    title: "Email Input Testing",
    description: "RFC822 validation, XSS, SSRF, header injection, SQLi, command injection, and more",
    href: "/vulnerabilities/email-input-testing",
    available: true,
    commandCount: "55+",
  },
]

export default function VulnerabilitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Web Vulnerabilities" />
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
              <span className="text-foreground">Web Vulnerabilities</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-destructive/5 via-background to-accent/5">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <Bug className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Web Vulnerabilities</h1>
            <p className="mt-2 text-muted-foreground">
              Common web security vulnerabilities and exploitation techniques
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {vulnItems.map((item) => (
              <div
                key={item.href}
                className={cn(
                  "group relative overflow-hidden rounded-xl border p-6 transition-all",
                  item.available
                    ? "border-border bg-card hover:border-destructive/50 hover:shadow-lg"
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
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.title === "SQL Injection" ? (
                        <Database className="h-6 w-6" />
                      ) : item.title === "WordPress" ? (
                        <Globe className="h-6 w-6" />
                      ) : item.title === "Open Redirect" ? (
                        <Link2 className="h-6 w-6" />
                      ) : item.title === "Host Header Injection" ? (
                        <AlertTriangle className="h-6 w-6" />
                      ) : item.title === "403 Bypass" ? (
                        <Shield className="h-6 w-6" />
                      ) : item.title === "Email Input Testing" ? (
                        <Mail className="h-6 w-6" />
                      ) : (
                        <FileText className="h-6 w-6" />
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
                      <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                        {item.commandCount} commands
                      </span>
                    )}
                    {item.available ? (
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-destructive" />
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
            toolIds={["sqlmap", "burpsuite", "xsstrike", "nuclei", "ffuf"]}
            title="الأدوات المقترحة لاختبار الثغرات"
          />
        </div>
      </main>
    </div>
  )
}