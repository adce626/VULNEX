import { ToolGuide } from "@/lib/guide-types"

export const linkfinderGuide: ToolGuide = {
  id: "linkfinder",
  name: "LinkFinder",
  icon: "code",
  category: "Recon & OSINT",
  description: "Extract endpoints from JavaScript files",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install Python dependencies", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/GerbenJavado/LinkFinder.git
cd LinkFinder

# Install dependencies
pip install -r requirements.txt

# Verify
python3 linkfinder.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Extract URLs and endpoints from JavaScript files",
    code: `# Scan a remote JS file
python3 linkfinder.py -i https://example.com/script.js -o cli

# Scan with HTML output
python3 linkfinder.py -i https://example.com/script.js -o html

# Scan a local JS file
python3 linkfinder.py -i script.js -o cli

# Output to file
python3 linkfinder.py -i https://example.com/script.js -o html -d output_dir`
  },
  commands: [
    { command: "-i", description: "Input URL or file" },
    { command: "-o", description: "Output format (cli/html)" },
    { command: "-d", description: "Output directory for HTML" },
    { command: "-r", description: "Regex for custom endpoint matching" },
    { command: "-b", description: "Include subdomains" }
  ],
  whenToUse: [
    "Finding API endpoints in JavaScript files",
    "Reconnaissance on modern web applications",
    "Bug bounty JS endpoint discovery",
    "Mapping application attack surface",
    "Analyzing third-party JavaScript integrations"
  ],
  notes: [
    "Uses regex and JS parsing to extract endpoints",
    "Supports both remote and local JS file analysis",
    "HTML output provides an interactive view of results",
    "Can be piped into other recon tools",
    "Works well with gau and katana for URL collection"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: pip install -r requirements.txt" },
    { error: "No endpoints found", solution: "Check if the JS file contains URLs; try with -r for custom regex" },
    { error: "SSL errors", solution: "Use HTTP URL or check certificate validity" }
  ],
  tags: ["js", "link", "endpoint", "recon", "python"]
}
