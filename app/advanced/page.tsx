"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Brain, ArrowRight, Home, ChevronRight, Bot, Eye, UserPlus, ClipboardPaste, Gauge } from "lucide-react"
import { cn } from "@/lib/utils"
import { RecommendedTools } from "@/components/recommended-tools"

const advancedItems = [
  {
    title: "LLM Injection",
    description: "Prompt injection and AI model exploitation techniques",
    href: "/advanced/llm-injection",
    available: true,
    commandCount: "30+",
  },
  {
    title: "Blind XSS Advanced",
    description: "Advanced blind XSS techniques and callbacks",
    href: "/advanced/blind-xss",
    available: true,
    commandCount: "40+",
  },
  {
    title: "Registration Vulns",
    description: "Duplicate accounts, OTP bypass, mass assignment, hidden endpoints, and 23+ signup vulnerabilities",
    href: "/advanced/registration-vulns",
    available: true,
    commandCount: "60+",
  },
  {
    title: "Blind XSS via PasteJacking",
    description: "Clipboard Paste XSS — exploit paste events for Blind XSS via innerHTML in rich-text editors",
    href: "/advanced/blind-xss-pastejacking",
    available: true,
    commandCount: "15+",
  },
  {
    title: "Rate Limit Bypass",
    description: "IP spoofing, header manipulation, proxy rotation, parameter variation, encoding tricks",
    href: "/advanced/rate-limit-bypass",
    available: true,
    commandCount: "40+",
  },
]

export default function AdvancedPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Advanced Topics" />
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
              <span className="text-foreground">Advanced Topics</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Brain className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Topics</h1>
            <p className="mt-2 text-muted-foreground">
              Cutting-edge techniques and security research
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {advancedItems.map((item) => (
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
                      {item.title === "LLM Injection" ? (
                        <Bot className="h-6 w-6" />
                      ) : item.title === "Blind XSS Advanced" ? (
                        <Eye className="h-6 w-6" />
                      ) : item.title === "Blind XSS via PasteJacking" ? (
                        <ClipboardPaste className="h-6 w-6" />
                      ) : item.title === "Rate Limit Bypass" ? (
                        <Gauge className="h-6 w-6" />
                      ) : (
                        <UserPlus className="h-6 w-6" />
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
            toolIds={["jwt_tool", "burpsuite", "xsstrike", "nuclei"]}
            title="الأدوات المقترحة للمواضيع المتقدمة"
          />
        </div>
      </main>
    </div>
  )
}