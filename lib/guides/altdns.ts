import { ToolGuide } from "@/lib/guide-types"

export const altdnsGuide: ToolGuide = {
  id: "altdns",
  name: "Altdns",
  icon: "target",
  category: "Recon & OSINT",
  description: "Subdomain discovery via permutations",
  installation: {
    title: "Installation",
    steps: [
      "Install via pip or clone from GitHub",
      "Install Python dependencies",
      "Verify installation"
    ],
    code: `# Using pip
pip install py-altdns

# Or from source
git clone https://github.com/infosec-au/altdns.git
cd altdns
pip install -r requirements.txt

# Verify
altdns --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Altdns generates subdomain permutations based on existing subdomains and a custom wordlist, then resolves them",
    code: `# Generate and resolve permutations
altdns -i subdomains.txt -o data_output -w words.txt

# Custom resolvers
altdns -i subdomains.txt -o data_output -w words.txt -r resolvers.txt

# Screenshot output for found subdomains
altdns -i subdomains.txt -o data_output -w words.txt -s screenshot_output`
  },
  commands: [
    { command: "-i", description: "Input subdomains file" },
    { command: "-o", description: "Output data directory" },
    { command: "-w", description: "Permutation words file" },
    { command: "-r", description: "Custom resolvers file" },
    { command: "-s", description: "Screenshots output directory" },
    { command: "-t", description: "Thread count" }
  ],
  whenToUse: [
    "Discovering subdomains through common name patterns",
    "Finding admin/staging/dev subdomains via permutations",
    "Expanding a known subdomain list",
    "Bug bounty recon after passive enumeration"
  ],
  notes: [
    "Combines existing subdomains with wordlist to create permutations",
    "Examples: admin.example.com → dev-admin.example.com, admin-dev.example.com, etc.",
    "Results need validation with a resolver or httpx",
    "The wordlist determines permutation quality"
  ],
  commonErrors: [
    {
      error: "No permutations generated",
      solution: "Ensure the input file has subdomains and the wordlist is not empty"
    },
    {
      error: "Py-altdns not found after pip install",
      solution: "Use pip3 or install from source via git clone"
    }
  ],
  tags: ["dns", "permutation", "subdomain", "recon"]
}
