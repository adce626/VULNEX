import { ToolGuide } from "@/lib/guide-types"

export const masscanGuide: ToolGuide = {
  id: "masscan",
  name: "Masscan",
  icon: "network",
  category: "Tools & Methods",
  description: "Mass IP port scanner — the fastest Internet-scale scanner, scanning the entire Internet in minutes",
  installation: {
    title: "Installation",
    steps: ["Install via apt", "Build from source", "Verify installation"],
    code: `# Ubuntu/Debian
sudo apt install masscan

# Build from source
git clone https://github.com/robertdavidgraham/masscan.git
cd masscan && make && sudo make install

# Verify
masscan --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan large IP ranges for open ports at incredible speeds",
    code: `# Scan single IP
sudo masscan 192.168.1.1 -p80,443,8080

# Scan subnet
sudo masscan 192.168.1.0/24 -p1-1000 --rate=1000

# Scan from file
sudo masscan -iL ips.txt -p80,443 --rate=10000

# Exclude list
sudo masscan 0.0.0.0/0 -p443 --excludefile exclude.txt

# Banner grabbing
sudo masscan 10.0.0.0/8 -p80 --banners --rate=1000

# Save results
sudo masscan example.com -p1-65535 -oJ results.json`
  },
  commands: [
    { command: "-p", description: "Port range to scan" },
    { command: "--rate", description: "Packets per second" },
    { command: "--banners", description: "Grab service banners" },
    { command: "-iL", description: "Input file with targets" },
    { command: "--excludefile", description: "File with IPs to exclude" },
    { command: "-oJ", description: "JSON output" },
    { command: "-oB", description: "Binary output" },
    { command: "-oL", description: "List output" },
    { command: "--adapter-ip", description: "Source IP address" },
    { command: "--adapter-port", description: "Source port range" },
    { command: "--ttl", description: "TTL value for packets" },
    { command: "--wait", description: "Seconds to wait for responses" }
  ],
  whenToUse: [
    "Scanning entire ASN ranges for open services",
    "Finding exposed databases and web servers",
    "Large-scale Internet reconnaissance",
    "Cloud asset discovery across IP ranges",
    "Fast initial scan before targeted Nmap scanning"
  ],
  notes: [
    "Can scan the entire Internet on a single port in under 5 minutes",
    "Requires root for raw packet sending",
    "Use --excludefile to avoid scanning sensitive IPs",
    "Results can be piped to naabu or nmap for detailed scanning"
  ],
  commonErrors: [
    { error: "Permission denied", solution: "Masscan requires root. Run with sudo on Linux" },
    { error: "Adapter not found", solution: "Specify network interface with --adapter-ip or --adapter-port" }
  ],
  tags: ["port-scanner", "network", "masscan", "internet-scale", "enumeration"]
}
