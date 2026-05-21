import { ToolGuide } from "@/lib/guide-types"

export const shufflednsGuide: ToolGuide = {
  id: "shuffledns",
  name: "Shuffledns",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Subdomain resolver using bruteforce and wildcard filtering",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.21+ on your system",
      "Run the Go install command",
      "Verify installation"
    ],
    code: `go install github.com/projectdiscovery/shuffledns/cmd/shuffledns@latest

# Verify
shuffledns -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Shuffledns resolves subdomains from a wordlist using bruteforce with built-in wildcard IP filtering",
    code: `# Bruteforce subdomains
shuffledns -d example.com -w subdomains.txt -r resolvers.txt

# Output resolved subdomains
shuffledns -d example.com -w subdomains.txt -r resolvers.txt -o resolved.txt

# With wildcard filtering
shuffledns -d example.com -w subdomains.txt -r resolvers.txt -wildcard

# Use stdin input
cat subdomains.txt | shuffledns -d example.com -r resolvers.txt`
  },
  commands: [
    { command: "-d", description: "Target domain" },
    { command: "-w", description: "Wordlist file" },
    { command: "-r", description: "Resolvers file" },
    { command: "-o", description: "Output file" },
    { command: "-wildcard", description: "Enable wildcard filtering" },
    { command: "-silent", description: "Show only results" },
    { command: "-t", description: "Number of concurrent threads" },
    { command: "-timeout", description: "DNS query timeout (ms)" }
  ],
  whenToUse: [
    "Resolving subdomains from a wordlist",
    "Filtering out wildcard DNS entries",
    "Validating bulk subdomain lists",
    "Mass DNS resolution with bruteforce"
  ],
  notes: [
    "Designed to handle wildcard DNS efficiently",
    "Use a curated resolvers list for best results",
    "Part of ProjectDiscovery toolchain — pairs with subfinder, dnsx",
    "Fast enough for million+ wordlist bruteforcing"
  ],
  commonErrors: [
    {
      error: "Wildcard detection false positives",
      solution: "Provide more resolvers and increase -wildcard-threshold to 5+"
    },
    {
      error: "Slow resolution with large wordlists",
      solution: "Increase thread count with -t and use faster resolvers"
    }
  ],
  tags: ["dns", "resolve", "bruteforce", "projectdiscovery"]
}
