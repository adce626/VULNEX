import { ToolGuide } from "@/lib/guide-types"

export const assetfinderGuide: ToolGuide = {
  id: "assetfinder",
  name: "Assetfinder",
  icon: "search",
  category: "Recon & OSINT",
  description: "Find domains and subdomains by passive sources",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.16+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/tomnomnom/assetfinder@latest

# Verify
assetfinder -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Assetfinder uses passive sources like crt.sh, CertSpotter, and DNSDumpster to find subdomains",
    code: `# Basic scan for subdomains only
assetfinder --subs-only example.com

# Full output (includes related domains)
assetfinder example.com

# Pipe to httpx for live host filtering
assetfinder --subs-only example.com | httpx -silent`
  },
  commands: [
    { command: "--subs-only", description: "Show subdomains only, exclude related domains" },
    { command: "-v", description: "Enable verbose output" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Quick passive subdomain recon",
    "Lightweight enumeration without API keys",
    "Generating input for httpx or other tools",
    "Initial phase of bug bounty recon"
  ],
  notes: [
    "No API keys required — uses only public sources",
    "Results from crt.sh can be stale",
    "For deeper results, combine with subfinder or amass",
    "Output is one subdomain per line, easy to pipe"
  ],
  commonErrors: [
    {
      error: "No results returned",
      solution: "Check internet connectivity; some sources may be temporarily down"
    },
    {
      error: "Go not found",
      solution: "Install Go from https://go.dev/dl/ and ensure GOPATH/bin is in your PATH"
    }
  ],
  tags: ["subdomain", "recon", "osint", "passive"]
}
