import { ToolGuide } from "@/lib/guide-types"

export const dnsgenGuide: ToolGuide = {
  id: "dnsgen",
  name: "Dnsgen",
  icon: "code",
  category: "Recon & OSINT",
  description: "DNS name generator from existing subdomains",
  installation: {
    title: "Installation",
    steps: [
      "Install via pip",
      "Verify installation"
    ],
    code: `pip install dnsgen

# Verify
dnsgen --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Dnsgen generates plausible subdomain names from existing subdomains using common patterns and prefixes/suffixes",
    code: `# Generate permutations and pipe to resolver
cat subdomains.txt | dnsgen - | dnsx -silent -a

# Use custom wordlist
cat subdomains.txt | dnsgen -w /usr/share/wordlists/dnsgen.txt

# Output to file
cat subdomains.txt | dnsgen -o permutations.txt`
  },
  commands: [
    { command: "-w", description: "Custom wordlist path" },
    { command: "-o", description: "Output file path" },
    { command: "-", description: "Read from stdin" }
  ],
  whenToUse: [
    "Generating new subdomain candidates from known ones",
    "Finding hidden subdomains through common naming patterns",
    "Post-processing after passive enumeration",
    "Pipeline automation with dnsx or massdns"
  ],
  notes: [
    "Lightweight and fast — ideal for piping in bash workflows",
    "Works best when combined with a resolver like dnsx or massdns",
    "Built-in wordlist covers common dev, staging, and admin patterns",
    "No active scanning — pure generation, needs external resolution"
  ],
  commonErrors: [
    {
      error: "dnsgen: command not found after pip install",
      solution: "Ensure Python Scripts directory is in your PATH, or use python -m dnsgen"
    },
    {
      error: "No output generated",
      solution: "Ensure input has valid subdomain names — one per line, domain-only format"
    }
  ],
  tags: ["dns", "generator", "subdomain", "permutation"]
}
