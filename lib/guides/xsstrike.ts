import { ToolGuide } from "@/lib/guide-types"

export const xsstrikeGuide: ToolGuide = {
  id: "xsstrike",
  name: "XSStrike",
  icon: "code",
  category: "Web Vulnerabilities",
  description: "Advanced XSS detection and exploitation suite",
  installation: {
    title: "Installation",
    steps: [
      "Clone repository",
      "Install dependencies",
      "Run XSStrike"
    ],
    code: `# Clone and setup
git clone https://github.com/s0md3v/XSStrike.git
cd XSStrike
pip3 install -r requirements.txt

# Run
python3 xsstrike.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect and exploit XSS vulnerabilities with intelligent payload generation",
    code: `# Basic scan
python3 xsstrike.py -u "https://example.com/search?q=test"

# POST request
python3 xsstrike.py -u "https://example.com/comment" --data "text=test"

# Crawl and scan
python3 xsstrike.py -u "https://example.com" --crawl

# Blind XSS
python3 xsstrike.py -u "https://example.com/page?id=1" --blind`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "--data", description: "POST data" },
    { command: "--crawl", description: "Crawl and test" },
    { command: "--blind", description: "Blind XSS mode" },
    { command: "--fuzzer", description: "Fuzzing mode" },
    { command: "-t", description: "Number of threads" },
    { command: "--skip-dom", description: "Skip DOM XSS check" },
    { command: "-d", description: "Delay between requests" }
  ],
  whenToUse: [
    "Testing for reflected XSS",
    "Finding DOM-based XSS",
    "Bypassing XSS filters",
    "Generating custom payloads"
  ],
  notes: [
    "Uses intelligent analysis not just fuzzing",
    "Can detect context and generate appropriate payloads",
    "Combine with manual testing for best results"
  ],
  commonErrors: [
    {
      error: "No vulnerabilities found",
      solution: "Try manual testing with different contexts"
    },
    {
      error: "Rate limited",
      solution: "Use -d flag to add delay"
    }
  ],
  tags: ["xss", "fuzzing", "exploitation", "web"]
}
