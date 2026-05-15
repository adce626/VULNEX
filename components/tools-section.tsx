"use client"

import { useState } from "react"
import { toolsData, getAllCategories, type ToolGuide } from "@/lib/tools-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Globe,
  Target,
  Database,
  Code,
  Shield,
  FolderSearch,
  Network,
  Cloud,
  Key,
  Zap,
  Sparkles,
  Filter,
  ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="size-5" />,
  globe: <Globe className="size-5" />,
  zap: <Zap className="size-5" />,
  target: <Target className="size-5" />,
  database: <Database className="size-5" />,
  code: <Code className="size-5" />,
  shield: <Shield className="size-5" />,
  "folder-search": <FolderSearch className="size-5" />,
  network: <Network className="size-5" />,
  cloud: <Cloud className="size-5" />,
  key: <Key className="size-5" />,
}

const categoryColors: Record<string, string> = {
  "Recon & OSINT": "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  "Web Vulnerabilities": "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
  "Tools & Methods": "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  "Cloud & Assets": "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  "Advanced Topics": "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
}

export function ToolsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = getAllCategories()

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedTools = categories.reduce((acc, category) => {
    const tools = filteredTools.filter((t) => t.category === category)
    if (tools.length > 0) {
      acc[category] = tools
    }
    return acc
  }, {} as Record<string, ToolGuide[]>)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search tools, commands, or tags..."
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="gap-1.5"
          >
            <Filter className="size-3.5" />
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {Object.entries(groupedTools).map(([category, tools]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">{category}</h2>
              <Badge variant="secondary" className="text-xs">
                {tools.length} tools
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(groupedTools).length === 0 && (
        <div className="text-center py-16">
          <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Search className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No tools found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}

function ToolCard({ tool }: { tool: ToolGuide }) {
  const colorClass = categoryColors[tool.category] || "from-primary/20 to-primary/5 border-primary/30 text-primary"

  return (
    <Link href={`/tools/${tool.id}`} className="block group">
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
        <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`size-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                {iconMap[tool.icon] || <Sparkles className="size-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 bg-background/50">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-background/50">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground">
              {tool.commands.length} commands
            </span>
            <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </div>
        </div>
      </div>
    </Link>
  )
}
