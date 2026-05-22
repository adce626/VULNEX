"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("parameth")
  if (!tool) return null
  return <ToolDetailLayout tool={tool} pageTitle="Parameth — Parameter Discovery" breadcrumbCategory="Tools" />
}



