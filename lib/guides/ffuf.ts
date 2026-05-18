import { ToolGuide } from "@/lib/guide-types"

export const ffufGuide: ToolGuide = {
  id: "ffuf",
  name: "ffuf",
  icon: "folder-search",
  category: "Methods",
  description: "Fast web fuzzer for content discovery and parameter fuzzing",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Download wordlists",
      "Verify installation"
    ],
    code: `# Using Go
go install github.com/ffuf/ffuf/v2@latest

# Download SecLists
git clone https://github.com/danielmiessler/SecLists.git

# Verify
ffuf -V`
  },
  usage: {
    title: "Basic Usage",
    description: "Fuzz web endpoints for directories, files, and parameters",
    code: `# Directory bruteforce
ffuf -u https://example.com/FUZZ -w wordlist.txt

# File extension fuzzing
ffuf -u https://example.com/FUZZ -w files.txt -e .php,.html,.js

# Parameter fuzzing
ffuf -u "https://example.com/api?FUZZ=test" -w params.txt

# POST data fuzzing
ffuf -u https://example.com/login -X POST -d "user=admin&pass=FUZZ" -w passwords.txt

# Subdomain fuzzing
ffuf -u https://FUZZ.example.com -w subdomains.txt`
  },
  commands: [
    { command: "-u", description: "Target URL with FUZZ keyword" },
    { command: "-w", description: "Wordlist path" },
    { command: "-e", description: "Extensions to append" },
    { command: "-X", description: "HTTP method" },
    { command: "-d", description: "POST data" },
    { command: "-H", description: "HTTP header" },
    { command: "-mc", description: "Match status codes" },
    { command: "-fc", description: "Filter status codes" },
    { command: "-fs", description: "Filter response size" },
    { command: "-t", description: "Number of threads" },
    { command: "-rate", description: "Requests per second" },
    { command: "-o", description: "Output file" }
  ],
  whenToUse: [
    "Content discovery",
    "Finding hidden endpoints",
    "Parameter bruteforcing",
    "Virtual host discovery",
    "API endpoint enumeration"
  ],
  notes: [
    "Use -fc to filter unwanted responses",
    "Calibrate with -ac for auto-calibration",
    "Use SecLists for comprehensive wordlists",
    "Rate limit to avoid detection"
  ],
  commonErrors: [
    {
      error: "Too many results",
      solution: "Use -fc to filter status codes or -fs to filter sizes"
    },
    {
      error: "Blocked by WAF",
      solution: "Reduce rate with -rate flag, use -H for custom headers"
    }
  ],
  tags: ["fuzzing", "bruteforce", "discovery", "enumeration"]
}
