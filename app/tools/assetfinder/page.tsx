"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("assetfinder")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Assetfinder — Find domains and subdomains by passive sources"
      breadcrumbCategory="Tools"
    />
  )
}



