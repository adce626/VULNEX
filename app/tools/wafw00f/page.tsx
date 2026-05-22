"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("wafw00f")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="WAFW00F — WAF Fingerprinting Tool"
      breadcrumbCategory="Tools"
    />
  )
}



