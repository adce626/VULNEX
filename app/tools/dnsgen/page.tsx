"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("dnsgen")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Dnsgen — DNS name generator from existing subdomains"
      breadcrumbCategory="Tools"
    />
  )
}



