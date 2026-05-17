import { ToolGuide } from "@/lib/guide-types"

export const whatwebGuide: ToolGuide = {
  id: "whatweb",
  name: "WhatWeb",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Web technology identification and fingerprinting tool",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager",
      "Or install via gem",
      "Verify installation"
    ],
    code: `# Debian/Ubuntu
apt install whatweb

# Using gem
gem install whatweb

# Verify
whatweb --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Identify web technologies, CMS, frameworks, and server software",
    code: `# Basic scan
whatweb example.com

# Verbose output
whatweb -v example.com

# Aggressive mode
whatweb --aggression 3 example.com`
  },
  commands: [
    { command: "-v", description: "Verbose output" },
    { command: "--aggression", description: "Set aggression level (1-3)" },
    { command: "--color", description: "Colorize output" },
    { command: "-a", description: "Set user agent" },
    { command: "-H", description: "Add custom header" },
    { command: "-t", description: "Set request timeout" },
    { command: "-q", description: "Quiet mode" },
    { command: "--log-json", description: "Log output in JSON format" },
    { command: "--log-xml", description: "Log output in XML format" },
    { command: "--proxy", description: "Use proxy" }
  ],
  whenToUse: [
    "Technology profiling of web applications",
    "Reconnaissance and asset inventory",
    "Before exploitation to identify vulnerable components",
    "Finding version-specific vulnerabilities",
    "Competitor technology analysis"
  ],
  notes: [
    "Can be noisy; use in controlled environments for best results",
    "Combine with nmap for comprehensive fingerprinting",
    "Supports 1800+ plugins for wide coverage"
  ],
  commonErrors: [
    { error: "No results", solution: "Ensure the URL is correct and reachable" },
    { error: "Connection refused", solution: "Check if the target allows inbound connections" },
    { error: "Timeout", solution: "Increase timeout with -t flag or reduce aggression level" }
  ],
  tags: ["recon", "fingerprinting", "technology", "web"]
}
