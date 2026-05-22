"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("burpsuite")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Burp Suite — Web Security Testing"
      breadcrumbCategory="Tools"
    />
  )
}



