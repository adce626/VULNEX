"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("waybackurls")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Waybackurls — Wayback Machine URL Fetcher"
      breadcrumbCategory="Tools"
    />
  )
}
