"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("sublist3r")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Sublist3r — Fast subdomain enumeration using search engines"
      breadcrumbCategory="Tools"
    />
  )
}



