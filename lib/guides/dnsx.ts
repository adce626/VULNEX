import { ToolGuide } from "@/lib/guide-types"

export const dnsxGuide: ToolGuide = {
  id: "dnsx",
  name: "Dnsx",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast DNS query tool by ProjectDiscovery",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.21+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/projectdiscovery/dnsx/cmd/dnsx@latest

# Verify
dnsx -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Dnsx is a fast, multi-purpose DNS toolkit for querying various DNS record types at scale",
    code: `# Query A records
dnsx -d example.com -a

# Query multiple record types
dnsx -d example.com -a -aaaa -cname -mx -txt

# Bulk query from file
cat domains.txt | dnsx -a -o results.txt

# With custom resolvers
dnsx -d example.com -r resolvers.txt

# JSON output
dnsx -d example.com -a -json`
  },
  commands: [
    { command: "-d", description: "Target domain" },
    { command: "-a", description: "Query A record" },
    { command: "-aaaa", description: "Query AAAA record" },
    { command: "-cname", description: "Query CNAME record" },
    { command: "-mx", description: "Query MX record" },
    { command: "-txt", description: "Query TXT record" },
    { command: "-ns", description: "Query NS record" },
    { command: "-r", description: "Custom resolvers file" },
    { command: "-o", description: "Output file path" },
    { command: "-json", description: "JSON output format" },
    { command: "-silent", description: "Show only results" },
    { command: "-retry", description: "Retry attempts on failure" }
  ],
  whenToUse: [
    "Bulk DNS resolution of subdomains",
    "Checking CNAMEs for takeover vectors",
    "Validating discovered subdomains",
    "DNS record fingerprints and mapping"
  ],
  notes: [
    "Extremely fast — built on retryablehttp with concurrency",
    "Pipes well with subfinder, assetfinder, etc.",
    "Supports wildcard detection",
    "Can output in JSON, CSV, or stdout"
  ],
  commonErrors: [
    {
      error: "No results returned",
      solution: "Check that resolvers are working; use -r with a list of public resolvers"
    },
    {
      error: "Too many open files error",
      solution: "Reduce concurrency with -t flag (default: 25)"
    }
  ],
  tags: ["dns", "recon", "query", "projectdiscovery"]
}
