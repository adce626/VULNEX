import { ToolsSection } from "@/components/tools-section"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Wrench, Sparkles } from "lucide-react"

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <PageTitle title="Tools &amp; Methods" />
      <MainSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <Wrench className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                Security Tools
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Sparkles className="size-3" />
                  Interactive Guides
                </span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive guides for essential penetration testing and bug bounty tools
              </p>
            </div>
          </div>
        </div>

        <ToolsSection />
      </main>
    </div>
  )
}
