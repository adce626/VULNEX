"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("jsluice")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="JSLuice — JS URL & Secret Extractor"
      breadcrumbCategory="Tools"
    />
  )
}
