"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("maltego")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Maltego — Link Analysis"
      breadcrumbCategory="Tools"
    />
  )
}



