"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("puredns")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Puredns — Fast domain resolver with wildcard detection"
      breadcrumbCategory="Tools"
    />
  )
}
