import { ToolGuide } from "@/lib/guide-types"

export const unicornscanGuide: ToolGuide = {
  id: "unicornscan",
  name: "Unicornscan",
  icon: "target",
  category: "Recon & OSINT",
  description: "High-powered port scanner with asynchronous probing and service detection capabilities",
  installation: {
    title: "Installation",
    steps: ["Install via apt", "Build from source", "Verify installation"],
    code: `# Debian/Ubuntu
sudo apt install unicornscan

# Fedora/RHEL
sudo dnf install unicornscan

# Build from source
git clone https://github.com/dankamongmen/unicornscan.git
cd unicornscan
./configure && make && sudo make install

# Verify
unicornscan --version`
  },
  usage: {
    title: "Basic Usage",
    description: "High-performance asynchronous port scanning with full customization",
    code: `# TCP scan on all ports
unicornscan -mT 192.168.0.0/24:1-65535

# UDP scan
unicornscan -mU 192.168.0.1:1-1024

# Show service banners
unicornscan -mT -Iv 192.168.0.1:80

# Scan with specific source port
unicornscan -s 53 192.168.0.1:22

# Increase verbosity for detailed output
unicornscan -mT -vv 192.168.0.1:1-1000

# Save results to file
unicornscan -mT 192.168.0.1:1-65535 -r results.txt`
  },
  commands: [
    { command: "-mT", description: "TCP scan mode" },
    { command: "-mU", description: "UDP scan mode" },
    { command: "-Iv", description: "Show service banners" },
    { command: "-s", description: "Spoof source IP/port" },
    { command: "-vv", description: "Very verbose output" },
    { command: "-r", description: "Save results to file" },
    { command: "-R", description: "Show relative timestamp" }
  ],
  whenToUse: [
    "Fast full-port scans on large networks",
    "UDP service discovery",
    "Stealth scanning with custom source ports",
    "Service banner grabbing",
    "Performance-critical scanning scenarios"
  ],
  notes: [
    "Uses asynchronous I/O for high-speed scanning",
    "Supports both TCP and UDP scan modes",
    "Can be unstable on some network configurations",
    "Requires root privileges for raw socket operations"
  ],
  commonErrors: [
    { error: "Permission denied", solution: "Run with sudo or root privileges for raw packet operations" },
    { error: "No results on UDP scan", solution: "UDP scanning is slow; increase timeout and try specific ports" }
  ],
  tags: ["port", "scanner", "network", "recon", "asynchronous"]
}
