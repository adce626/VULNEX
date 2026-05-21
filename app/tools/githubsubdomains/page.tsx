"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("githubsubdomains")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="GitHub-Subdomains — Enumerate subdomains from GitHub repositories"
      breadcrumbCategory="Tools"
    />
  )
}
