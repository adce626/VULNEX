import { ToolGuide } from "@/lib/guide-types"

export const zmapGuide: ToolGuide = {
  id: "zmap",
  name: "Zmap",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Internet-wide port scanner capable of scanning the entire IPv4 address space in minutes",
  installation: {
    title: "Installation",
    steps: ["Install via apt", "Build from source", "Verify installation"],
    code: `# Debian/Ubuntu
sudo apt install zmap

# Fedora/RHEL
sudo dnf install zmap

# Build from source
git clone https://github.com/zmap/zmap.git
cd zmap
cmake . && make && sudo make install

# Verify
zmap --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan specific ports across large IP ranges with high throughput",
    code: `# Scan port 80 on subnet
zmap -p 80 10.0.0.0/8

# Scan with output to file
zmap -p 443 192.168.0.0/16 -o results.csv

# Rate-limited scan
zmap -p 22 10.0.0.0/8 --rate=1000

# Banner grab
zmap -p 80 --banner 10.0.0.0/8

# Exclude specific IPs/subnets
zmap -p 8080 0.0.0.0/0 --exclude-file exclude.txt

# JSON output
zmap -p 443 --output-module=json 192.168.0.0/16

# Scan with custom probe module
zmap -p 443 --probe-module=tcp_syn 10.0.0.0/8`
  },
  commands: [
    { command: "-p", description: "Port to scan" },
    { command: "-o", description: "Output file" },
    { command: "--rate", description: "Packets per second" },
    { command: "--banner", description: "Banner grab" },
    { command: "--exclude-file", description: "File with IPs/subnets to exclude" },
    { command: "--output-module", description: "Output format (csv, json)" },
    { command: "--probe-module", description: "Probe type (tcp_syn, icmp_echo)" },
    { command: "--seed", description: "Scan seed for reproducibility" }
  ],
  whenToUse: [
    "Internet-wide scanning for exposed services",
    "Finding all web servers on a large IP block",
    "Research and academic network measurement",
    "Identifying vulnerable services across IP ranges",
    "Open port discovery on cloud provider ranges"
  ],
  notes: [
    "Capable of scanning the entire IPv4 internet in ~45 minutes on 10GbE",
    "Requires root privileges for raw packet operations",
    "Only scans one port at a time",
    "Use responsibly and respect network policies"
  ],
  commonErrors: [
    { error: "Permission denied (raw sockets)", solution: "Run with sudo or set capabilities: sudo setcap cap_net_raw=ep /usr/sbin/zmap" },
    { error: "Network congestion", solution: "Reduce rate with --rate flag to avoid overwhelming the network" }
  ],
  tags: ["port", "scanner", "internet", "network", "masscan"]
}
