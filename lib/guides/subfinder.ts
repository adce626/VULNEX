import { ToolGuide } from "@/lib/guide-types"

export const subfinderGuide: ToolGuide = {
  id: "subfinder",
  name: "Subfinder",
  icon: "search",
  category: "Recon & OSINT",
  description: "Fast passive subdomain enumeration tool",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.21+ on your system",
      "Run the installation command",
      "Verify installation"
    ],
    code: `# Using Go
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Using Docker
docker pull projectdiscovery/subfinder:latest

# Verify
subfinder -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Subfinder is designed for passive subdomain discovery using various sources",
    code: `# Basic scan
subfinder -d example.com

# With output file
subfinder -d example.com -o subdomains.txt

# Multiple domains
subfinder -dL domains.txt -o results.txt

# Silent mode with only results
subfinder -d example.com -silent`
  },
  commands: [
    { command: "-d", description: "Target domain to enumerate" },
    { command: "-dL", description: "File containing list of domains" },
    { command: "-o", description: "Output file path" },
    { command: "-oJ", description: "Output in JSON format" },
    { command: "-silent", description: "Show only results" },
    { command: "-sources", description: "Specific sources to use" },
    { command: "-recursive", description: "Enable recursive enumeration" },
    { command: "-all", description: "Use all sources (slow)" },
    { command: "-config", description: "Config file path" },
    { command: "-t", description: "Number of threads" }
  ],
  whenToUse: [
    "Initial reconnaissance phase",
    "Expanding attack surface",
    "Before active scanning",
    "Bug bounty recon automation",
    "Asset discovery"
  ],
  notes: [
    "Configure API keys in ~/.config/subfinder/provider-config.yaml for better results",
    "Free sources have rate limits",
    "Combine with other tools like httpx for live host detection",
    "Use -all flag sparingly as it's slow but thorough"
  ],
  commonErrors: [
    {
      error: "No results found",
      solution: "Add API keys for sources like SecurityTrails, Shodan, Censys"
    },
    {
      error: "Rate limit exceeded",
      solution: "Use -rl flag to set rate limit or wait before retrying"
    },
    {
      error: "Config file not found",
      solution: "Run subfinder once to generate default config at ~/.config/subfinder/"
    }
  ],
  tags: ["recon", "subdomains", "passive", "osint"]
}
