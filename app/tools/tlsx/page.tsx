"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("tlsx")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Tlsx — TLS/SSL Scanner"
      breadcrumbCategory="Tools"
    />
  )
}
