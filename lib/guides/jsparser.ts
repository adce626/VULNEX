import { ToolGuide } from "@/lib/guide-types"

export const jsparserGuide: ToolGuide = {
  id: "jsparser",
  name: "JSParser",
  icon: "code",
  category: "Recon & OSINT",
  description: "JavaScript parser for URL extraction",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install via setup.py", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/nahamsec/JSParser.git
cd JSParser

# Install
python3 setup.py install

# Verify
python3 JSParser.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Parse JavaScript files to extract URLs and endpoints",
    code: `# Extract URLs from a JS file
python3 JSParser.py -u https://example.com/script.js

# With verbose output
python3 JSParser.py -u https://example.com/script.js -v

# Save results to file
python3 JSParser.py -u https://example.com/script.js -o results.txt`
  },
  commands: [
    { command: "-u", description: "Target URL of JS file" },
    { command: "-v", description: "Verbose output" },
    { command: "-o", description: "Output file" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Extracting URLs from JavaScript files",
    "Reconnaissance on web applications",
    "Bug bounty JS analysis",
    "Finding hidden API endpoints",
    "Pre-exploitation information gathering"
  ],
  notes: [
    "Originally designed by NahamSec for bug bounty recon",
    "Uses simple regex-based extraction from JS content",
    "Useful for finding hidden endpoints not visible in HTML",
    "Can process multiple JS files sequentially",
    "Lightweight and easy to use in pipelines"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: python3 setup.py install" },
    { error: "No URLs found", solution: "Ensure the JS file contains URL patterns" },
    { error: "File not found", solution: "Check the URL is accessible and returns JavaScript" }
  ],
  tags: ["js", "parser", "endpoint", "recon"]
}
