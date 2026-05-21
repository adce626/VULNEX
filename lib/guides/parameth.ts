import { ToolGuide } from "@/lib/guide-types"

export const paramethGuide: ToolGuide = {
  id: "parameth",
  name: "Parameth",
  icon: "search",
  category: "Recon & OSINT",
  description: "Parameter discovery tool",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install Python dependencies", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/K0p1-Git/Parameth.git
cd Parameth

# Install dependencies
pip install -r requirements.txt

# Verify
python3 parameth.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Discover hidden parameters on web endpoints",
    code: `# Basic parameter discovery
python3 parameth.py -u https://example.com

# With custom wordlist
python3 parameth.py -u https://example.com -w params.txt

# POST method with data
python3 parameth.py -u https://example.com/api -m POST

# With cookies for authenticated scanning
python3 parameth.py -u https://example.com -c "session=abc123"`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-w", description: "Custom wordlist file" },
    { command: "-m", description: "HTTP method (GET/POST)" },
    { command: "-c", description: "Cookies for authentication" },
    { command: "-p", description: "Proxy URL" },
    { command: "-t", description: "Number of threads" },
    { command: "-d", description: "POST data body" },
    { command: "-H", description: "Custom headers" }
  ],
  whenToUse: [
    "Finding hidden GET/POST parameters",
    "API parameter enumeration",
    "Pre-exploitation reconnaissance",
    "Web application security testing",
    "Bug bounty parameter discovery"
  ],
  notes: [
    "Uses a large built-in wordlist for parameter brute-forcing",
    "Supports both GET and POST method scanning",
    "Can be used with custom headers and authentication",
    "Results show potential parameters with response differences",
    "Python 3 required"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: pip install -r requirements.txt" },
    { error: "No parameters found", solution: "Try a larger wordlist or check if the target is accessible" },
    { error: "Connection timeout", solution: "Reduce thread count with -t or check network connectivity" }
  ],
  tags: ["parameter", "discovery", "recon", "python"]
}
