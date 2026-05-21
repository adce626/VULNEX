import { ToolGuide } from "@/lib/guide-types"

export const chaosGuide: ToolGuide = {
  id: "chaos",
  name: "Chaos",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Chaos (ProjectDiscovery) subdomain enumeration API client",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.21+ on your system",
      "Run the Go install command",
      "Set CHAOS_API_KEY environment variable",
      "Verify installation"
    ],
    code: `go install github.com/projectdiscovery/chaos-client/cmd/chaos@latest

# Set API key
export CHAOS_API_KEY="your-api-key-here"

# Verify
chaos -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Chaos uses ProjectDiscovery's Chaos dataset to enumerate subdomains from a curated passive database",
    code: `# Basic enumeration
chaos -d example.com

# Output to file
chaos -d example.com -o subs.txt

# JSON output
chaos -d example.com -o subs.json -json

# Silent mode (subdomains only)
chaos -d example.com -silent`
  },
  commands: [
    { command: "-d", description: "Target domain" },
    { command: "-o", description: "Output file path" },
    { command: "-json", description: "Output in JSON format" },
    { command: "-silent", description: "Show only results" },
    { command: "-count", description: "Show total count of results" }
  ],
  whenToUse: [
    "Accessing ProjectDiscovery's curated subdomain dataset",
    "Validating and enriching subdomain findings",
    "Bug bounty reconnaissance",
    "Combining with other ProjectDiscovery tools"
  ],
  notes: [
    "Requires a free API key from https://chaos.projectdiscovery.io",
    "Dataset updated daily from passive sources",
    "Not a replacement for active scanning — use with dnsx for resolution",
    "Results are already validated by the dataset pipeline"
  ],
  commonErrors: [
    {
      error: "CHAOS_API_KEY not set",
      solution: "Set the environment variable: export CHAOS_API_KEY='your-key'"
    },
    {
      error: "Authentication failed",
      solution: "Verify your API key is valid at https://chaos.projectdiscovery.io"
    }
  ],
  tags: ["subdomain", "chaos", "recon", "api"]
}
