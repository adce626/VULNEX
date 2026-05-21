import { ToolGuide } from "@/lib/guide-types"

export const purednsGuide: ToolGuide = {
  id: "puredns",
  name: "Puredns",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast domain resolver with wildcard detection",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.16+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/d3mondev/puredns/v2@latest

# Verify
puredns --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Puredns resolves domains with focus on accuracy: wildcard detection, massdns integration, and rate limiting",
    code: `# Resolve domains from file
puredns resolve domains.txt -r resolvers.txt

# With wildcard detection
puredns resolve domains.txt -r resolvers.txt --wildcard-batch domain.com

# Bruteforce with wordlist
puredns bruteforce wordlist.txt domain.com -r resolvers.txt

# Pipe from stdin
cat subdomains.txt | puredns resolve -r resolvers.txt`
  },
  commands: [
    { command: "resolve", description: "Resolve domain list" },
    { command: "bruteforce", description: "Bruteforce subdomains with a wordlist" },
    { command: "-r", description: "Resolvers file path" },
    { command: "--wildcard-batch", description: "Domain to test for wildcards" },
    { command: "-o", description: "Output file path" },
    { command: "-l", description: "Rate limit (queries per second)" },
    { command: "--massdns", description: "Path to massdns binary (faster resolution)" }
  ],
  whenToUse: [
    "Accurate domain resolution with wildcard filtering",
    "Subdomain validation in bug bounty workflows",
    "Processing large subdomain lists from passive tools",
    "When massdns results need wildcard cleanup"
  ],
  notes: [
    "Integrates with massdns for faster bulk resolution",
    "Wildcard detection is more accurate than shuffledns in some cases",
    "Built-in rate limiting prevents resolver bans",
    "Can output only valid (non-wildcard) subdomains"
  ],
  commonErrors: [
    {
      error: "Wildcard detection incorrectly flags domains",
      solution: "Use --wildcard-batch with the root domain, or increase sample size"
    },
    {
      error: "Massdns integration fails",
      solution: "Install massdns separately and pass the path with --massdns"
    }
  ],
  tags: ["dns", "resolve", "wildcard", "bruteforce"]
}
