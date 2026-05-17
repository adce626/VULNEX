import { ToolGuide } from "@/lib/guide-types"

export const amassGuide: ToolGuide = {
  id: "amass",
  name: "Amass",
  icon: "globe",
  category: "Recon & OSINT",
  description: "In-depth attack surface mapping and asset discovery",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager or Go",
      "Configure API keys",
      "Verify installation"
    ],
    code: `# Using Go
go install -v github.com/owasp-amass/amass/v4/...@master

# macOS
brew install amass

# Kali Linux
apt install amass

# Verify
amass -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Amass performs network mapping and external asset discovery",
    code: `# Passive enumeration
amass enum -passive -d example.com

# Active enumeration
amass enum -active -d example.com -p 80,443,8080

# With brute force
amass enum -brute -d example.com -w wordlist.txt

# Intel gathering
amass intel -whois -d example.com`
  },
  commands: [
    { command: "enum", description: "Perform subdomain enumeration" },
    { command: "intel", description: "Gather intelligence on targets" },
    { command: "-passive", description: "Passive mode only" },
    { command: "-active", description: "Enable active techniques" },
    { command: "-brute", description: "Enable brute force" },
    { command: "-w", description: "Wordlist for brute force" },
    { command: "-d", description: "Target domain" },
    { command: "-o", description: "Output file" },
    { command: "-config", description: "Config file path" }
  ],
  whenToUse: [
    "Comprehensive asset discovery",
    "When you need more than subdomains",
    "Finding related domains and ASNs",
    "Building complete attack surface map"
  ],
  notes: [
    "More thorough but slower than subfinder",
    "Configure data sources in config.yaml",
    "Use -passive for stealth",
    "Database stored in ~/.config/amass/"
  ],
  commonErrors: [
    {
      error: "Slow performance",
      solution: "Use -passive mode or limit data sources in config"
    },
    {
      error: "Memory issues",
      solution: "Limit concurrent requests with -max-dns-queries"
    }
  ],
  tags: ["recon", "subdomains", "osint", "mapping"]
}
