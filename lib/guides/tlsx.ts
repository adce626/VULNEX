import { ToolGuide } from "@/lib/guide-types"

export const tlsxGuide: ToolGuide = {
  id: "tlsx",
  name: "Tlsx",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Fast TLS/SSL scanner by ProjectDiscovery for certificate enumeration and cipher detection",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/projectdiscovery/tlsx/cmd/tlsx@latest

# Verify
tlsx --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Enumerate TLS/SSL certificates and cipher information from targets",
    code: `# Scan single domain
tlsx -u https://example.com

# Scan multiple domains from file
tlsx -l domains.txt

# Show certificate details
tlsx -u example.com -san -cn

# TLS version and cipher info
tlsx -u example.com -tls-version -cipher

# JSON output
tlsx -l domains.txt -json -o results.json

# Scan specific ports
tlsx -u example.com -port 443,8443`
  },
  commands: [
    { command: "-u", description: "Target URL or domain" },
    { command: "-l", description: "File containing domains" },
    { command: "-san", description: "Show Subject Alternative Names" },
    { command: "-cn", description: "Show Common Name" },
    { command: "-tls-version", description: "Show TLS version supported" },
    { command: "-cipher", description: "Show cipher suites" },
    { command: "-json", description: "JSON output format" },
    { command: "-o", description: "Output file" },
    { command: "-port", description: "Port to connect on" },
    { command: "-silent", description: "Silent mode" }
  ],
  whenToUse: [
    "SSL/TLS certificate enumeration during recon",
    "Checking for certificate transparency issues",
    "Discovering subdomains via SAN entries",
    "Auditing TLS configuration and cipher strength",
    "Finding expired or misconfigured certificates"
  ],
  notes: [
    "Part of the ProjectDiscovery toolkit",
    "Can discover hidden subdomains via SAN fields",
    "Use -json for machine-readable output",
    "Supports both IPv4 and IPv6 targets"
  ],
  commonErrors: [
    { error: "Connection refused", solution: "Verify the host and port are reachable and TLS is enabled" },
    { error: "No certificates found", solution: "Ensure the target supports TLS on the specified port" }
  ],
  tags: ["tls", "ssl", "certificate", "projectdiscovery", "recon", "enumeration"]
}
