"use client"

import React from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb"
import { HeroSection } from "@/components/hero-section"
import { Cloud, ArrowRight, Key, HardDrive, Database, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const cloudItems = [
  {
    title: "Google API Keys",
    description: "Finding and exploiting exposed Google API keys",
    href: "/cloud/google-api-keys",
    icon: "key",
    available: true,
    commandCount: "30+",
  },
  {
    title: "S3 Buckets",
    description: "AWS S3 bucket reconnaissance and misconfiguration testing",
    href: "/cloud/s3-buckets",
    icon: "storage",
    available: true,
    commandCount: "40+",
  },
]

const iconMap: Record<string, React.ReactNode> = {
  key: <Key className="h-6 w-6" />,
  storage: <HardDrive className="h-6 w-6" />,
}

export default function CloudPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Cloud &amp; Assets" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[{ label: "Cloud & Assets" }]} />
        <HeroSection icon={<Cloud className="h-8 w-8" />} title="Cloud & Assets" description="Cloud infrastructure and asset takeover techniques" />

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-4">
            {cloudItems.map((item) => (
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
                      {iconMap[item.icon]}
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
        </div>
      </main>
    </div>
  )
}


