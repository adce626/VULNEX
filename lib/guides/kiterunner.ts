import { ToolGuide } from "@/lib/guide-types"

export const kiterunnerGuide: ToolGuide = {
  id: "kiterunner",
  name: "KiteRunner",
  icon: "target",
  category: "Methods",
  description: "Fast API endpoint and content discovery tool that uses JWT patterns, K8s service account tokens, and swagger specs to discover hidden API routes",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Download API wordlists",
      "Verify installation"
    ],
    code: `# Using Go
go install github.com/assetnote/kiterunner@latest

# Verify
kr -V`
  },
  usage: {
    title: "Basic Usage",
    description: "Discover API endpoints using built-in wordlists and JWT/K8s patterns",
    code: `# List all routes from a wordlist
kr list wordlist.txt

# Basic API scan against a target
kr scan https://api.target.com -w wordlist.txt

# Scan with JWT authentication
kr scan https://api.target.com -w wordlist.txt -H "Authorization: Bearer <token>"

# Bruteforce API paths recursively
kr scan https://target.com -w wordlist.txt -k`
  },
  commands: [
    { command: "kr scan", description: "Scan target URL with wordlist" },
    { command: "kr list", description: "List and inspect routes from a wordlist" },
    { command: "-k", description: "Skip TLS certificate verification" },
    { command: "-w", description: "Path to wordlist file" },
    { command: "-t", description: "Number of concurrent threads" },
    { command: "-o", description: "Output results to file" },
    { command: "-H", description: "Add custom HTTP header" },
    { command: "-x", description: "Proxy URL for routing traffic" },
    { command: "-r", description: "Follow redirects" },
    { command: "-d", description: "Delay between requests in ms" },
    { command: "-v", description: "Verbose output" },
    { command: "-s", description: "Silent mode (suppress banner)" }
  ],
  whenToUse: [
    "Discovering hidden API endpoints during black-box testing",
    "Mapping API attack surface from JWT/K8s token contexts",
    "Finding undocumented or deprecated API routes",
    "Validating API route permissions and access control",
    "Combining with swagger/openapi specs for route enumeration"
  ],
  notes: [
    "Use assetnote's API-specific wordlists for best results",
    "JWT tokens used during scan should have minimal privileges",
    "Combining with proxy (-x) enables request inspection in Burp Suite",
    "Kiterunner works best against REST and GraphQL APIs"
  ],
  commonErrors: [
    {
      error: "No routes discovered",
      solution: "Try a larger wordlist or check if the target requires authentication headers"
    },
    {
      error: "TLS certificate errors",
      solution: "Use -k to skip TLS verification if testing internal/staging environments"
    },
    {
      error: "Rate limiting blocks requests",
      solution: "Reduce thread count with -t and add delay with -d between requests"
    }
  ],
  tags: ["api", "discovery", "fuzzing", "go"]
}
