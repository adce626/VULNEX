import { ToolGuide } from "@/lib/guide-types"

export const gobusterGuide: ToolGuide = {
  id: "gobuster",
  name: "Gobuster",
  icon: "folder-search",
  category: "Methods",
  description: "Directory/file/DNS subdomain brute-forcing tool written in Go",
  installation: {
    title: "Installation",
    steps: ["Install via package manager or Go", "Download wordlists", "Verify installation"],
    code: `# Kali Linux
apt install gobuster

# Using Go
go install github.com/OJ/gobuster/v3@latest

# Verify
gobuster --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute-force directories, files, DNS subdomains, and vhosts",
    code: `# Directory bruteforce
gobuster dir -u https://target.com -w wordlist.txt

# DNS subdomain enumeration
gobuster dns -d target.com -w subdomains.txt

# Virtual host discovery
gobuster vhost -u https://target.com -w vhosts.txt`
  },
  commands: [
    { command: "dir", description: "Directory/file bruteforce mode" },
    { command: "dns", description: "DNS subdomain enumeration mode" },
    { command: "vhost", description: "Virtual host discovery mode" },
    { command: "-u", description: "Target URL" },
    { command: "-w", description: "Wordlist path" },
    { command: "-t", description: "Number of threads" },
    { command: "-x", description: "File extensions to search" },
    { command: "-s", description: "Status codes to include" },
    { command: "-k", description: "Skip TLS verification" },
    { command: "-o", description: "Output file" }
  ],
  whenToUse: [
    "Finding hidden directories and files",
    "DNS subdomain enumeration",
    "Virtual host discovery bypassing DNS",
    "When ffuf is not available",
    "Quick content discovery"
  ],
  notes: [
    "Faster than ffuf for directory bruteforcing",
    "Use -x for extension bruteforcing (.php,.asp,.txt)",
    "DNS mode uses wildcard detection",
    "vhost mode doesn't depend on DNS resolution"
  ],
  commonErrors: [
    { error: "No results", solution: "Try different wordlist or check target is accessible" },
    { error: "Wildcard DNS detected", solution: "Gobuster handles this automatically with DNS mode" },
    { error: "Too slow", solution: "Increase threads with -t flag" }
  ],
  tags: ["bruteforce", "discovery", "dns", "directory"]
}
