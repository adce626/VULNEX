"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("cloudenum")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Cloud_Enum — Multi-Cloud Enumeration Tool"
      breadcrumbCategory="Tools"
    />
  )
}
