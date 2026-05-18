import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Wrench, BookOpen, ArrowRight, Globe, Target, Database, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const methods = [
  {
    id: "ffuf",
    name: "FFUF",
    description: "Master FFUF for directory bruteforcing, parameter fuzzing, subdomain discovery, and more.",
    icon: <Target className="size-5" />,
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
    tags: ["fuzzing", "directory", "discovery"],
    commands: 30,
  },
  {
    id: "gospider",
    name: "Gospider",
    description: "Fast web crawling and content discovery tool written in Go. Complete guide with installation, crawling techniques, and automation methods.",
    icon: <Globe className="size-5" />,
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
    tags: ["crawling", "spider", "discovery"],
    commands: 20,
  },
  {
    id: "cewl",
    name: "CeWL",
    description: "Custom wordlist generator that crawls websites and extracts meaningful words for targeted brute-force attacks.",
    icon: <Database className="size-5" />,
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
    tags: ["wordlist", "password", "bruteforce"],
    commands: 25,
  },
  {
    id: "nuclei-templates",
    name: "Nuclei Templates",
    description: "Custom Nuclei YAML templates for automated vulnerability detection — Open Redirect, WP-Setup, IIS, Git Exposure, CORS, Credential Disclosure, Blind SSRF, SQLi, CRLF, and more.",
    icon: <Shield className="size-5" />,
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
    tags: ["nuclei", "templates", "automation"],
    commands: 23,
  },
]

export default function MethodsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <PageTitle title="Methods" />
      <MainSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <Wrench className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                Methods
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <BookOpen className="size-3" />
                  Technique Guides
                </span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Step-by-step guides for essential security testing tools and methodologies
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) => (
            <Link key={method.id} href={`/methods/${method.id}`} className="block group">
              <div className="relative">
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-xl", method.color.split(" ")[0])} />
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("size-10 rounded-lg bg-gradient-to-br flex items-center justify-center", method.color)}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {method.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {method.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {method.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 bg-background/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {method.commands}+ commands
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
