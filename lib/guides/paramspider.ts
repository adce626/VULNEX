import { ToolGuide } from "@/lib/guide-types"

export const paramSpiderGuide: ToolGuide = {
  id: "paramspider",
  name: "ParamSpider",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Passive parameter extraction from web archives",
  installation: {
    title: "Installation",
    steps: [
      "Clone from GitHub",
      "Install Python dependencies",
      "Verify installation"
    ],
    code: `# Clone repository
git clone https://github.com/devanshbatham/ParamSpider.git
cd ParamSpider
pip install -r requirements.txt

# Verify
python3 paramspider -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Extract URLs with parameters from Wayback Machine and Common Crawl",
    code: `# Basic domain scan
python3 paramspider -d site.com

# Save with FUZZ placeholder
python3 paramspider -d site.com -p "FUZZ=value"

# Set depth
python3 paramspider -d site.com -l 2

# Filter by vulnerability type
python3 paramspider -d site.com | grep xss > xss.txt

# Save to file
python3 paramspider -d site.com -o output.txt`
  },
  commands: [
    { command: "-d", description: "Target domain" },
    { command: "-p", description: "Output pattern with FUZZ placeholder" },
    { command: "-l", description: "Search depth (levels)" },
    { command: "-o", description: "Output file" },
    { command: "-s", description: "Search in Google instead of Wayback" },
    { command: "-b", description: "Search engine (baidu, bing, etc.)" },
    { command: "-a", description: "Include all subdomains" },
    { command: "-q", description: "Quiet mode" }
  ],
  whenToUse: [
    "Initial reconnaissance on new targets",
    "Discovering hidden parameters without touching the target",
    "Collecting URLs before deep testing",
    "Quick parameter discovery from historical data",
    "Before using Arjun or ffuf for deeper testing"
  ],
  notes: [
    "Works passively — no direct interaction with target",
    "Uses Wayback Machine and Common Crawl as data sources",
    "Excellent for gathering initial data before active testing",
    "Results may contain outdated or invalid URLs",
    "Can be combined with Arjun for comprehensive coverage",
    "Very fast compared to interactive tools",
    "Does not work on domains without archived data"
  ],
  commonErrors: [
    {
      error: "No results found",
      solution: "Target may have no archived data. Try Google source (-s) or different domain"
    },
    {
      error: "Rate limiting from Wayback Machine",
      solution: "Add delay between requests or reduce depth"
    },
    {
      error: "ModuleNotFoundError",
      solution: "Install requirements: pip install -r requirements.txt"
    },
    {
      error: "SSL Certificate errors",
      solution: "Update requests library or use --no-check-certificate"
    }
  ],
  tags: ["passive", "recon", "parameters", "wayback", "archives"]
}
