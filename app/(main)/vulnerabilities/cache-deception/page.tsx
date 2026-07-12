"use client"

import { useState } from "react"
import { ContentLayout } from "@/components/content-layout"
import { IntroductionSection } from "@/components/sections/cache-deception/introduction-section"
import { CacheFundamentalsSection } from "@/components/sections/cache-deception/cache-fundamentals-section"
import { DetectionSection } from "@/components/sections/cache-deception/detection-section"
import { ExploitationSection } from "@/components/sections/cache-deception/exploitation-section"
import { EndpointsSection } from "@/components/sections/cache-deception/endpoints-section"
import { WcdPayloadsSection } from "@/components/sections/cache-deception/wcd-payloads-section"
import { AdvancedBypassesSection } from "@/components/sections/cache-deception/advanced-bypasses-section"
import { AutomationSection } from "@/components/sections/cache-deception/automation-section"
import { PreventionSection } from "@/components/sections/cache-deception/prevention-section"
import { ConclusionSection } from "@/components/sections/cache-deception/conclusion-section"
import { ToolsSection } from "@/components/sections/cache-deception/tools-section"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "cache-fundamentals", label: "Cache Fundamentals" },
  { id: "detection", label: "Detection & Analysis" },
  { id: "exploitation", label: "Exploitation Example" },
  { id: "endpoints", label: "Endpoints & Extensions" },
  { id: "payloads", label: "WCD Payloads" },
  { id: "advanced-bypasses", label: "Advanced Bypasses" },
  { id: "automation", label: "Automation & Checklist" },
  { id: "prevention", label: "Prevention" },
]

export default function CacheDeceptionPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <ContentLayout
      pageTitle="Web Cache Deception"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Web Vulnerabilities", href: "/vulnerabilities" },
        { label: "Web Cache Deception" },
      ]}
      hero={{
        icon: Shield,
        title: "Web Cache Deception — Advanced Bug Hunter's Guide",
        description: "Advanced Tactics, Payloads and Real-World Methods to Uncover Hidden Cache Deception Flaws. Learn how attackers trick CDNs and reverse proxies into caching sensitive data, enabling unauthorized access and account takeover.",
        stats: [
          { label: "9 Sections", className: "bg-amber-500/10 text-amber-500" },
          { label: "200+ Payloads", className: "bg-accent/10 text-accent" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-amber-500/10 via-background to-orange-500/5",
        iconBg: "bg-amber-500/10 text-amber-500",
        image: { src: "/images/vulnerabilities/cache-deception/1_1yK2ITetgJRfkRqWpMr9tA.webp", alt: "Web Cache Deception overview" },
        decor: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />,
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-amber-500 text-white"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >
      <IntroductionSection />
      <CacheFundamentalsSection />
      <DetectionSection setExpandedImg={setExpandedImg} />
      <ExploitationSection />
      <EndpointsSection />
      <WcdPayloadsSection />
      <AdvancedBypassesSection />
      <AutomationSection setExpandedImg={setExpandedImg} />
      <PreventionSection />
      <ConclusionSection />
      <ToolsSection />
    </ContentLayout>
  )
}
