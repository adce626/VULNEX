import { ToolGuide } from "@/lib/guide-types"

export const crobatGuide: ToolGuide = {
  id: "crobat",
  name: "Crobat",
  icon: "database",
  category: "Recon & OSINT",
  description: "Subdomain enumeration using SonarDNS data",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.16+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/cgboal/sonarsearch/cmd/crobat@latest

# Verify
crobat -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Crobat queries the SonarDNS dataset from Project Sonar (Rapid7) to find subdomains with known DNS records",
    code: `# Basic search
crobat -s example.com

# Output to file
crobat -s example.com -o results.txt

# JSON format
crobat -s example.com -o results.json -j

# Multiple domains from file
crobat -sL domains.txt`
  },
  commands: [
    { command: "-s", description: "Target domain to search" },
    { command: "-sL", description: "File with list of domains" },
    { command: "-o", description: "Output file path" },
    { command: "-j", description: "JSON output format" }
  ],
  whenToUse: [
    "Leveraging Rapid7's Project Sonar DNS dataset",
    "Validating subdomains with known DNS records",
    "Finding subdomains missed by other passive tools",
    "Historical DNS reconnaissance"
  ],
  notes: [
    "Dataset sourced from Rapid7's Project Sonar — updated regularly",
    "Results are subdomains that had DNS records at scan time",
    "May not include very new subdomains — depends on scan cadence",
    "No API key required for basic usage"
  ],
  commonErrors: [
    {
      error: "No results found",
      solution: "The domain may not have subdomains in the Sonar dataset; try other sources"
    },
    {
      error: "API endpoint unreachable",
      solution: "Check internet connectivity; the Sonar API may be temporarily down"
    }
  ],
  tags: ["subdomain", "sonar", "recon", "osint"]
}
