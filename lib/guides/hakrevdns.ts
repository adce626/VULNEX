import { ToolGuide } from "@/lib/guide-types"

export const hakrevdnsGuide: ToolGuide = {
  id: "hakrevdns",
  name: "Hakrevdns",
  icon: "search",
  category: "Recon & OSINT",
  description: "Reverse DNS lookup tool",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.16+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/hakluke/hakrevdns@latest

# Verify
hakrevdns -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Hakrevdns performs reverse DNS lookups on IP addresses to discover associated domain names",
    code: `# Reverse DNS from stdin
cat ips.txt | hakrevdns

# Custom DNS servers
cat ips.txt | hakrevdns -r 8.8.8.8 -r 1.1.1.1

# Output to file
cat ips.txt | hakrevdns > domains.txt

# Reduce concurrency
cat ips.txt | hakrevdns -t 10`
  },
  commands: [
    { command: "-r", description: "Custom DNS server (can be used multiple times)" },
    { command: "-t", description: "Number of concurrent threads (default: 100)" },
    { command: "-d", description: "Domain filter — only show PTRs matching this domain" }
  ],
  whenToUse: [
    "Enumerating domains on known IP ranges",
    "Finding virtual hosts sharing an IP address",
    "Expanding attack surface from IP data",
    "Cloud asset discovery from IP lists"
  ],
  notes: [
    "Fast and concurrent — built by hakluke for bug bounty workflows",
    "Pipe-friendly design for easy integration",
    "Results depend on PTR records being configured",
    "Combine with httpx to find live web servers"
  ],
  commonErrors: [
    {
      error: "No PTR records found",
      solution: "Many IPs don't have reverse DNS configured; this is expected"
    },
    {
      error: "Slow resolution",
      solution: "Use -t to increase threads or specify faster DNS servers with -r"
    }
  ],
  tags: ["dns", "reverse", "resolve", "hakluke"]
}
