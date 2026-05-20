import { ToolGuide } from "@/lib/guide-types"

export const dnsreconGuide: ToolGuide = {
  id: "dnsrecon",
  name: "DNSRecon",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Advanced DNS enumeration tool for querying various DNS record types and performing zone transfers",
  installation: {
    title: "Installation",
    steps: [
      "Install via pip or package manager",
      "Verify Python 3 is available",
      "Test the installation"
    ],
    code: `# Using pip
pip install dnsrecon

# Kali Linux
apt install dnsrecon

# macOS
brew install dnsrecon

# Verify
dnsrecon --help`
  },
  usage: {
    title: "Basic Usage",
    description: "DNSRecon queries DNS records to map a target's infrastructure, including common record types, zone transfers, reverse lookups, and brute force subdomain discovery",
    code: `# Standard enumeration (A, AAAA, MX, NS, SOA, TXT)
dnsrecon -d example.com

# SRV record enumeration
dnsrecon -d example.com -t srv

# Zone transfer attempt
dnsrecon -d example.com -t axfr

# Reverse lookup on a CIDR range
dnsrecon -r 192.168.1.0/24

# Brute force subdomains with a wordlist
dnsrecon -d example.com -D subdomains.txt -t brt`
  },
  commands: [
    { command: "-d <domain>", description: "Target domain name" },
    { command: "-t <type>", description: "Scan type (std, srv, rev, brt, axfr, all)" },
    { command: "-D <file>", description: "Wordlist file for brute force" },
    { command: "-a", description: "Perform zone transfer against all discovered NS records" },
    { command: "-s", description: "Perform SRV record enum (equivalent to -t srv)" },
    { command: "-r <range>", description: "Reverse lookup on CIDR range" },
    { command: "-b", description: "Brute force subdomains (equivalent to -t brt)" },
    { command: "-z", description: "Perform DNSSEC zone walk" },
    { command: "-n <server>", description: "Custom DNS server to query" },
    { command: "-v", description: "Verbose output" }
  ],
  whenToUse: [
    "Mapping all DNS records for a target domain",
    "Checking for zone transfer vulnerabilities",
    "Discovering additional subdomains via brute force",
    "Performing reverse DNS lookups on IP ranges",
    "Enumerating SRV records for service discovery"
  ],
  notes: [
    "Zone transfers (-t axfr) rarely succeed on modern DNS servers",
    "Brute force effectiveness depends heavily on wordlist quality",
    "Can be rate-limited; consider adding delays or rotating DNS servers",
    "Combine with other tools like subfinder for comprehensive results"
  ],
  commonErrors: [
    {
      error: "Timeout or no response from DNS server",
      solution: "Use -n to specify a different DNS server (e.g. 8.8.8.8)"
    },
    {
      error: "No zone transfer available",
      solution: "Zone transfers are typically disabled; fall back to brute force or dictionary scanning (-t brt)"
    },
    {
      error: "Dictionary file not found",
      solution: "Verify the wordlist path with -D; ensure the file exists and is readable"
    }
  ],
  tags: ["dns", "recon", "enumeration", "subdomain", "python"]
}
