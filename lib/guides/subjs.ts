import { ToolGuide } from "@/lib/guide-types"

export const subjsGuide: ToolGuide = {
  id: "subjs",
  name: "SubJS",
  icon: "code",
  category: "Recon & OSINT",
  description: "Find JavaScript files from subdomains",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/lc/subjs@latest

# Verify
subjs -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Discover JavaScript files loaded by subdomains",
    code: `# Scan a single URL
subjs -i https://example.com

# Scan from stdin
cat urls.txt | subjs

# With concurrency
subjs -i https://example.com -c 50

# Output to file
subjs -i https://example.com -o results.txt`
  },
  commands: [
    { command: "-i", description: "Input URL" },
    { command: "-o", description: "Output file" },
    { command: "-c", description: "Concurrency level" },
    { command: "-t", description: "Timeout in seconds" },
    { command: "-ua", description: "Custom user agent" },
    { command: "-H", description: "Custom header" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "JavaScript file discovery from subdomains",
    "Bug bounty recon and asset discovery",
    "Collecting JS for vulnerability analysis",
    "Mapping JavaScript dependencies across subdomains",
    "Preparing JS file lists for content analysis"
  ],
  notes: [
    "Fast concurrent JS file discovery",
    "Designed for subdomain JS enumeration",
    "Can be piped from subdomain enumeration tools",
    "Use custom headers for authenticated scanning",
    "Works well in automated recon pipelines"
  ],
  commonErrors: [
    { error: "No JS files found", solution: "The target may not load external JavaScript files" },
    { error: "Connection timeout", solution: "Increase timeout with -t flag" },
    { error: "No input provided", solution: "Use -i flag or pipe URLs via stdin" }
  ],
  tags: ["js", "subdomain", "recon", "golang"]
}
