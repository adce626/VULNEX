import { ToolGuide } from "@/lib/guide-types"

export const xnlinkfinderGuide: ToolGuide = {
  id: "xnlinkfinder",
  name: "xnLinkFinder",
  icon: "code",
  category: "Recon & OSINT",
  description: "Find hidden endpoints in JS files",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install Python dependencies", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/xnl-h4ck3r/xnLinkFinder.git
cd xnLinkFinder

# Install dependencies
pip install -r requirements.txt

# Verify
python3 xnLinkFinder.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Extract endpoints and links from a target website",
    code: `# Basic scan of a single URL
python3 xnLinkFinder.py -i https://example.com

# Scan with output file
python3 xnLinkFinder.py -i https://example.com -o results.txt

# Scan multiple URLs from a file
python3 xnLinkFinder.py -i urls.txt -o results.txt

# With verbose output
python3 xnLinkFinder.py -i https://example.com -v`
  },
  commands: [
    { command: "-i", description: "Input URL or file containing URLs" },
    { command: "-o", description: "Output file path" },
    { command: "-sp", description: "Subdomain prefix to filter" },
    { command: "-d", description: "Maximum crawl depth" },
    { command: "-v", description: "Verbose mode" },
    { command: "-s", description: "Silent mode" },
    { command: "-t", description: "Number of threads" },
    { command: "-c", description: "Cookies for authenticated requests" }
  ],
  whenToUse: [
    "Finding API endpoints in JavaScript files",
    "Discovering hidden links and paths",
    "Reconnaissance on single-page applications",
    "Bug bounty recon on complex web apps",
    "Extracting endpoints from JS bundles"
  ],
  notes: [
    "More thorough than simple grep-based approaches",
    "Supports regex patterns for different endpoint types",
    "Can extract endpoints from inline JavaScript as well",
    "Respects robots.txt by default",
    "Use -sp to focus on specific subdomains"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: pip install -r requirements.txt" },
    { error: "No endpoints found", solution: "Ensure the target contains JavaScript files; increase depth with -d" },
    { error: "SSL errors", solution: "The target may have certificate issues; try with different URL format" }
  ],
  tags: ["js", "endpoint", "recon", "link", "python"]
}
