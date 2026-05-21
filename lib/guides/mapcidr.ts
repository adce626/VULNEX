import { ToolGuide } from "@/lib/guide-types"

export const mapcidrGuide: ToolGuide = {
  id: "mapcidr",
  name: "MapCIDR",
  icon: "network",
  category: "Recon & OSINT",
  description: "Map CIDR ranges to IP addresses by ProjectDiscovery with expansion and filtering capabilities",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/projectdiscovery/mapcidr/cmd/mapcidr@latest

# Verify
mapcidr --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Expand CIDR ranges to individual IP addresses with various filtering options",
    code: `# Expand a single CIDR range
mapcidr -cl 192.168.0.0/24

# Expand multiple CIDRs from file
mapcidr -l cidrs.txt

# Count IPs in a range
mapcidr -cl 10.0.0.0/16 -count

# Filter by octet pattern
mapcidr -cl 192.168.0.0/16 -o 192.168.1

# Output to file
mapcidr -cl 192.168.0.0/24 -o ips.txt

# Aggregate IPs to CIDR notation
mapcidr -aggregate -l ips.txt`
  },
  commands: [
    { command: "-cl", description: "CIDR list (comma-separated)" },
    { command: "-l", description: "File containing CIDR ranges" },
    { command: "-o", description: "Output file" },
    { command: "-count", description: "Count IPs in range" },
    { command: "-aggregate", description: "Aggregate IPs to CIDR notation" },
    { command: "-filter-ip", description: "Filter IPs by pattern" },
    { command: "-silent", description: "Silent mode" },
    { command: "-version", description: "Show version" }
  ],
  whenToUse: [
    "Expanding CIDR ranges for mass scanning",
    "Counting IPs in subnet ranges",
    "Generating IP lists from network blocks",
    "Aggregating scattered IPs back to CIDR notation",
    "Filtering IPs by specific octet patterns"
  ],
  notes: [
    "Part of the ProjectDiscovery ecosystem",
    "Can handle both IPv4 and IPv6 ranges",
    "Use -silent for clean output piped to other tools",
    "Combine with httpx or naabu for service discovery"
  ],
  commonErrors: [
    { error: "Invalid CIDR format", solution: "Ensure CIDR notation is correct (e.g., 192.168.0.0/24)" },
    { error: "No output", solution: "Check that the CIDR range is valid and accessible" }
  ],
  tags: ["cidr", "network", "ip", "projectdiscovery", "recon"]
}
