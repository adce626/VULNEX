"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("scoutsuite")
  if (!tool) return null
  return <ToolDetailLayout tool={tool} pageTitle="ScoutSuite — Multi-Cloud Security Audit" breadcrumbCategory="Tools" />
}
