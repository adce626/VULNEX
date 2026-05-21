import { ToolGuide } from "@/lib/guide-types"

export const findomainGuide: ToolGuide = {
  id: "findomain",
  name: "Findomain",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Fastest subdomain finder using multiple sources",
  installation: {
    title: "Installation",
    steps: [
      "Install Rust/Cargo or download prebuilt binary",
      "Run the install command",
      "Verify installation"
    ],
    code: `# Using Cargo
cargo install findomain

# Or download from GitHub releases
# https://github.com/Findomain/Findomain/releases

# Verify
findomain --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Findomain queries multiple sources (crt.sh, Virustotal, SecurityTrails, etc.) for subdomain discovery",
    code: `# Basic scan
findomain -t example.com

# Output to file
findomain -t example.com -o results.txt

# Multiple targets
findomain -f domains.txt -o results.txt

# Resolve found subdomains
findomain -t example.com --resolved`
  },
  commands: [
    { command: "-t", description: "Target domain to enumerate" },
    { command: "-f", description: "File containing list of domains" },
    { command: "-o", description: "Output file path" },
    { command: "--resolved", description: "Resolve subdomains and show IPs" },
    { command: "-q", description: "Quiet mode" }
  ],
  whenToUse: [
    "Need fast subdomain results",
    "Rust-based performance is desired",
    "Quick passive recon on multiple targets",
    "Automated pipeline subdomain discovery"
  ],
  notes: [
    "One of the fastest subdomain tools available",
    "Supports custom resolvers via config file",
    "Rate limiting built-in for API sources",
    "Can export results in JSON, CSV, or TXT"
  ],
  commonErrors: [
    {
      error: "Rust/Cargo not installed",
      solution: "Install Rust from https://rustup.rs/ or use prebuilt binaries from releases"
    },
    {
      error: "API rate limits hit",
      solution: "Create a config file with API keys for higher rate limits"
    }
  ],
  tags: ["subdomain", "recon", "osint", "rust"]
}
