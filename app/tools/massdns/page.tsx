"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("massdns")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Massdns — High-performance DNS resolver for bulk lookups"
      breadcrumbCategory="Tools"
    />
  )
}



