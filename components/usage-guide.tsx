"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Download,
  Terminal,
  Command,
  Clock,
  FileText,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import type { ToolGuide } from "@/lib/tools-data"

interface UsageGuideProps {
  guide?: ToolGuide
  tool?: ToolGuide
  children?: React.ReactNode
}

export function UsageGuide({ guide, tool, children }: UsageGuideProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const resolvedGuide = guide || tool
  if (!resolvedGuide) return null

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <BookOpen className="size-3.5" />
            Usage Guide
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{resolvedGuide.name} — Usage Guide</DialogTitle>
          <DialogDescription>
            Step-by-step guide for installing and using {resolvedGuide.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="installation" className="flex flex-col h-full">
          <div className="border-b px-6 pt-4">
            <TabsList className="w-full justify-start gap-0 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="installation"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 px-4 text-xs font-medium"
              >
                <Download className="size-4 mr-2" />
                Installation
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 px-4 text-xs font-medium"
              >
                <Terminal className="size-4 mr-2" />
                Usage
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 p-6">
            <TabsContent value="installation" className="m-0 mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Download className="size-5 text-primary" />
                  {resolvedGuide.installation.title}
                </h3>
                <div className="space-y-3">
                  {resolvedGuide.installation.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="space-y-1">
                          {step.split("\n").map((line, i) => (
                            <span key={i} className="block">
                              {line}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {resolvedGuide.installation.code && (
                  <div className="relative group rounded-xl overflow-hidden border border-border/50 bg-background mt-4">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-red-500/50" />
                        <div className="size-3 rounded-full bg-yellow-500/50" />
                        <div className="size-3 rounded-full bg-green-500/50" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1.5 opacity-70 hover:opacity-100"
                        onClick={() => copyToClipboard(resolvedGuide.installation.code!, "installation")}
                      >
                        {copiedCode === "installation" ? (
                          <>
                            <Check className="size-3 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-foreground/90 leading-relaxed whitespace-pre">
                        {resolvedGuide.installation.code}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="usage" className="m-0 mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Terminal className="size-5 text-primary" />
                  {resolvedGuide.usage.title}
                </h3>
                <p className="text-muted-foreground mb-4">{resolvedGuide.usage.description}</p>
                {resolvedGuide.usage.code && (
                  <div className="relative group rounded-xl overflow-hidden border border-border/50 bg-background">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-red-500/50" />
                        <div className="size-3 rounded-full bg-yellow-500/50" />
                        <div className="size-3 rounded-full bg-green-500/50" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1.5 opacity-70 hover:opacity-100"
                        onClick={() => copyToClipboard(resolvedGuide.usage.code!, "usage")}
                      >
                        {copiedCode === "usage" ? (
                          <>
                            <Check className="size-3 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-foreground/90 leading-relaxed whitespace-pre">
                        {resolvedGuide.usage.code}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export function UsageGuideButton({ tool }: { tool: ToolGuide }) {
  return (
    <UsageGuide tool={tool}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        <BookOpen className="size-3.5" />
        Usage Guide
      </Button>
    </UsageGuide>
  )
}
