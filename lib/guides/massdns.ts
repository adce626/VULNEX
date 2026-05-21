import { ToolGuide } from "@/lib/guide-types"

export const massdnsGuide: ToolGuide = {
  id: "massdns",
  name: "Massdns",
  icon: "zap",
  category: "Recon & OSINT",
  description: "High-performance DNS resolver for bulk lookups",
  installation: {
    title: "Installation",
    steps: [
      "Clone the repository",
      "Navigate into the directory",
      "Compile with make",
      "Verify installation"
    ],
    code: `git clone https://github.com/blechschmidt/massdns.git
cd massdns
make

# Verify
./bin/massdns --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Massdns resolves thousands of domain names per second using asynchronous DNS queries",
    code: `# Bulk resolve A records
./bin/massdns -r resolvers.txt -t A -w results.txt domains.txt

# Resolve AAAA records
./bin/massdns -r resolvers.txt -t AAAA -w results.txt domains.txt

# Reduce noise via output filter
./bin/massdns -r resolvers.txt -t A -o S -w results.txt domains.txt

# Use custom socket count for speed
./bin/massdns -r resolvers.txt -t A -w results.txt domains.txt -s 10000`
  },
  commands: [
    { command: "-r", description: "Resolvers file (one IP per line)" },
    { command: "-t", description: "DNS record type (A, AAAA, CNAME, MX, etc.)" },
    { command: "-w", description: "Output file path" },
    { command: "-s", description: "Number of concurrent sockets (default: 1000)" },
    { command: "-o", description: "Output format (S=simplified, F=full, J=JSON)" },
    { command: "-q", description: "Quiet mode" },
    { command: "--sticky", description: "Use sticky sockets (faster)" }
  ],
  whenToUse: [
    "Bulk DNS resolution of millions of domains",
    "Performance-critical resolution tasks",
    "Processing large subdomain wordlists",
    "Research and large-scale scanning"
  ],
  notes: [
    "Extremely fast — capable of millions of queries per minute",
    "Use with high-quality resolvers for accuracy",
    "Can overwhelm DNS servers — use responsibly",
    "Output is in a custom format by default; use -o J for JSON"
  ],
  commonErrors: [
    {
      error: "Too many sockets error",
      solution: "Reduce -s value or increase system limits: ulimit -n 65536"
    },
    {
      error: "No valid resolvers found",
      solution: "Provide a resolvers list with working DNS servers; check format (one IP per line)"
    }
  ],
  tags: ["dns", "resolver", "high-performance", "bulk"]
}
