"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("findomain")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Findomain — Fastest subdomain finder using multiple sources"
      breadcrumbCategory="Tools"
    />
  )
}



