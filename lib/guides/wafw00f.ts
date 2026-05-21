import { ToolGuide } from "@/lib/guide-types"

export const wafw00fGuide: ToolGuide = {
  id: "wafw00f",
  name: "WAFW00F",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Web application firewall fingerprinting and detection tool",
  installation: {
    title: "Installation",
    steps: ["Install using pip", "Verify installation"],
    code: `# Using pip
pip install wafw00f

# Verify
wafw00f -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect which WAF (if any) is protecting a website",
    code: `# Single URL
wafw00f https://example.com

# Multiple URLs from file
wafw00f -i urls.txt

# Verbose output
wafw00f https://example.com -v

# Find all WAFs detected
wafw00f https://example.com -a

# Output as JSON
wafw00f https://example.com -o results.json`
  },
  commands: [
    { command: "-i", description: "Input file with URLs" },
    { command: "-v", description: "Verbose output" },
    { command: "-a", description: "Show all detected WAFs" },
    { command: "-o", description: "Output file for results" },
    { command: "-l", description: "List all supported WAFs" },
    { command: "--proxy", description: "HTTP proxy for requests" },
    { command: "--timeout", description: "Request timeout" },
    { command: "--follow-redirects", description: "Follow redirects" }
  ],
  whenToUse: [
    "Pre-attack reconnaissance to identify WAFs",
    "Choosing appropriate evasion techniques",
    "Verifying WAF deployment after configuration changes",
    "Security assessment scope mapping"
  ],
  notes: [
    "Detects over 150 different WAF products",
    "Uses multiple fingerprinting techniques for accuracy",
    "Non-intrusive — safe to run without authorization (still get permission)"
  ],
  commonErrors: [
    { error: "False positives on CDNs", solution: "CDNs like Cloudflare may be detected as WAFs — check with -a flag" },
    { error: "Connection errors", solution: "Use --proxy if behind a corporate proxy or firewall" }
  ],
  tags: ["waf", "fingerprint", "firewall", "python"]
}
