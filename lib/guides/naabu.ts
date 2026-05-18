import { ToolGuide } from "@/lib/guide-types"

export const naabuGuide: ToolGuide = {
  id: "naabu",
  name: "Naabu",
  icon: "network",
  category: "Recon & OSINT",
  description: "Fast port scanner by ProjectDiscovery with service discovery and Nmap integration",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Install via apt", "Verify installation"],
    code: `# Using Go
go install github.com/projectdiscovery/naabu/v2/cmd/naabu@latest

# Linux via apt
sudo apt install naabu

# Verify
naabu --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Discover open ports on targets with fast SYN scanning",
    code: `# Scan single host
naabu -host example.com

# Scan multiple hosts
naabu -list hosts.txt

# Scan specific ports
naabu -host example.com -p 80,443,8080,8443

# Scan port range
naabu -host example.com -p 1-1000

# Fast top 100 ports
naabu -host example.com -top-ports 100

# Output with Nmap service detection
naabu -host example.com -nmap-cli "nmap -sV"

# JSON output
naabu -host example.com -json -o results.json`
  },
  commands: [
    { command: "-host", description: "Target host or IP" },
    { command: "-list", description: "File with host list" },
    { command: "-p", description: "Ports to scan" },
    { command: "-top-ports", description: "Top N ports to scan" },
    { command: "-exclude-ports", description: "Ports to exclude" },
    { command: "-rate", description: "Packets per second" },
    { command: "-timeout", description: "Timeout in milliseconds" },
    { command: "-nmap-cli", description: "Nmap command for service detection" },
    { command: "-json", description: "JSON output format" },
    { command: "-o", description: "Output file" },
    { command: "-v", description: "Verbose output" },
    { command: "-verify", description: "Verify ports with TCP connect" }
  ],
  whenToUse: [
    "Fast port scanning during recon",
    "Discovering web servers and services",
    "Mass scanning of IP ranges",
    "Integration with automation pipelines",
    "Preliminary scan before Nmap detailed enumeration"
  ],
  notes: [
    "Requires root privileges for SYN scan on Linux",
    "Top 1000 ports covers most common services",
    "Use -verify for TCP connect scan (no root required)",
    "Pipe results to httpx for HTTP service probing"
  ],
  commonErrors: [
    { error: "Permission denied (SYN scan)", solution: "Run with sudo or use -verify flag for TCP connect scan" },
    { error: "No ports found", solution: "Try -top-ports full or scan broader range. Some hosts block SYN probes" }
  ],
  tags: ["port-scanner", "recon", "network", "projectdiscovery", "enumeration"]
}
