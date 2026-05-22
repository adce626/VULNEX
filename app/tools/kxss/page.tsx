"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("kxss")
  if (!tool) return null
  return <ToolDetailLayout tool={tool} pageTitle="Kxss — XSS Detector" breadcrumbCategory="Tools" />
}



