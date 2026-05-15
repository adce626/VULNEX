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
      <DialogContent className="w-[95vw] max-w-[1400px] h-[90vh] max-h-[900px] p-0 gap-0 bg-card/95 backdrop-blur-xl border-border/50 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                <Sparkles className="size-7 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  {resolvedGuide.name}
                  <Badge variant="secondary" className="text-xs font-normal">
                    {resolvedGuide.category}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1 text-sm">
                  {resolvedGuide.description}
                </DialogDescription>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {resolvedGuide.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background/50 text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <Tabs defaultValue="installation" className="flex-1 flex flex-col min-h-0">
          <div className="border-b border-border/50 px-6 flex-shrink-0">
            <TabsList className="h-12 bg-transparent p-0 gap-1 flex-wrap">
              <TabsTrigger
                value="installation"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Download className="size-4 mr-2" />
                Installation
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Terminal className="size-4 mr-2" />
                Usage
              </TabsTrigger>
              <TabsTrigger
                value="commands"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Command className="size-4 mr-2" />
                Commands
              </TabsTrigger>
              <TabsTrigger
                value="when"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Clock className="size-4 mr-2" />
                When to Use
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <FileText className="size-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="errors"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <AlertTriangle className="size-4 mr-2" />
                Errors
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <TabsContent value="installation" className="m-0 mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Download className="size-5 text-primary" />
                      {resolvedGuide.installation.title}
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {resolvedGuide.installation.steps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                              {idx + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                      {resolvedGuide.installation.code && (
                        <CodeBlock
                          code={resolvedGuide.installation.code}
                          id="installation"
                          copiedCode={copiedCode}
                          onCopy={copyToClipboard}
                        />
                      )}
                    </div>
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
                      <CodeBlock
                        code={resolvedGuide.usage.code}
                        id="usage"
                        copiedCode={copiedCode}
                        onCopy={copyToClipboard}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="commands" className="m-0 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Command className="size-5 text-primary" />
                      Command Reference
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {resolvedGuide.commands.map((cmd, idx) => (
                        <div key={idx} className="rounded-xl border border-border/50 bg-background/50 p-4">
                          <div className="font-mono text-sm text-primary mb-1">{cmd.command}</div>
                          <p className="text-sm text-muted-foreground">{cmd.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="when" className="m-0 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="size-5 text-primary" />
                      When to Use
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {resolvedGuide.whenToUse.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="m-0 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="size-5 text-primary" />
                      Notes & Tips
                    </h3>
                    <div className="space-y-3">
                      {resolvedGuide.notes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                          <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-foreground">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="errors" className="m-0 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="size-5 text-destructive" />
                      Common Errors & Solutions
                    </h3>
                    <div className="space-y-4">
                      {resolvedGuide.commonErrors.map((err, idx) => (
                        <div key={idx} className="rounded-xl border border-border/50 overflow-hidden">
                          <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                            <div className="flex items-center gap-2 text-destructive font-medium">
                              <AlertTriangle className="size-4" />
                              {err.error}
                            </div>
                          </div>
                          <div className="p-4 bg-green-500/5">
                            <div className="flex items-start gap-2">
                              <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground">{err.solution}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function CodeBlock({
  code,
  id,
  copiedCode,
  onCopy,
}: {
  code: string
  id: string
  copiedCode: string | null
  onCopy: (code: string, id: string) => void
}) {
  return (
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
          onClick={() => onCopy(code, id)}
        >
          {copiedCode === id ? (
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
          {code}
        </code>
      </pre>
    </div>
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
