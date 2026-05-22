"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("crobat")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Crobat — Subdomain enumeration using SonarDNS data"
      breadcrumbCategory="Tools"
    />
  )
}



