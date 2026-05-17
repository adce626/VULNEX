import { ToolGuide } from "@/lib/guide-types"

export const gospiderGuide: ToolGuide = {
  id: "gospider",
  name: "Gospider",
  icon: "globe",
  category: "Tools & Methods",
  description: "Fast web crawler and content discovery tool written in Go",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/jaeles-project/gospider@latest

# Verify
gospider --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Crawl websites and discover hidden endpoints",
    code: `# Basic crawl
gospider -s "https://target.com"

# With depth and output
gospider -s "https://target.com" -d 2 -o output.txt

# Crawl with subdomains
gospider -s "https://target.com" --subs`
  },
  commands: [
    { command: "-s", description: "Target site URL" },
    { command: "-d", description: "Crawl depth" },
    { command: "--subs", description: "Include subdomains" },
    { command: "-o", description: "Output directory" },
    { command: "-c", description: "Concurrency" },
    { command: "-t", description: "Request delay (seconds)" },
    { command: "--js", description: "Parse JavaScript files" },
    { command: "--sitemap", description: "Parse sitemap.xml" },
    { command: "--robots", description: "Parse robots.txt" },
    { command: "--no-redirect", description: "Disable redirects" }
  ],
  whenToUse: [
    "Initial reconnaissance for endpoint discovery",
    "Finding hidden files and directories",
    "Collecting JavaScript files for analysis",
    "Mapping site structure before manual testing",
    "Automated content discovery in bug bounty"
  ],
  notes: [
    "Combines crawling, JS parsing, and form extraction",
    "Use --subs to discover subdomain endpoints",
    "Output is saved as separate files per source",
    "Works well with gf for filtering results"
  ],
  commonErrors: [
    { error: "Too many requests", solution: "Use -t flag to add delay between requests" },
    { error: "No results found", solution: "Increase depth with -d flag or check target accessibility" },
    { error: "TLS errors", solution: "Use -k flag to skip certificate verification" }
  ],
  tags: ["crawler", "spider", "discovery", "go"]
}
