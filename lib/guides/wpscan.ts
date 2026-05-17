import { ToolGuide } from "@/lib/guide-types"

export const wpscanGuide: ToolGuide = {
  id: "wpscan",
  name: "WPScan",
  icon: "globe",
  category: "Web Vulnerabilities",
  description: "WordPress security scanner for vulnerability detection and enumeration",
  installation: {
    title: "Installation",
    steps: [
      "Install via gem",
      "Install dependencies",
      "Verify installation"
    ],
    code: `# Using gem
gem install wpscan

# Verify
wpscan --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Enumerate WordPress vulnerabilities, users, plugins, and themes",
    code: `# Basic scan
wpscan --url https://target.com

# Enumerate users
wpscan --url https://target.com --enumerate u

# With API token for better results
wpscan --url https://target.com --api-token TOKEN`
  },
  commands: [
    { command: "--url", description: "Target WordPress URL" },
    { command: "--enumerate", description: "Enumerate (u=users, p=plugins, t=themes)" },
    { command: "--api-token", description: "WPVulnDB API token for live data" },
    { command: "--password-attack", description: "Password brute forcing (xmlrpc, wp-login)" },
    { command: "--plugins-version-detection", description: "Plugin version detection mode" },
    { command: "-o", description: "Output to file" },
    { command: "--format", description: "Output format (cli, json, etc.)" },
    { command: "--proxy", description: "Proxy for requests" },
    { command: "--cookie", description: "Cookie string for authentication" },
    { command: "--random-user-agent", description: "Randomize user agent" }
  ],
  whenToUse: [
    "WordPress reconnaissance and security auditing",
    "Vulnerability scanning for known CVEs",
    "User enumeration for brute force targets",
    "Plugin and theme version checking",
    "Password brute forcing on WordPress sites"
  ],
  notes: [
    "API token from WPVulnDB required for real-time vulnerability data",
    "Rate limiting may apply; use --throttle flag if needed",
    "Works best with full access to the target site"
  ],
  commonErrors: [
    { error: "Connection refused", solution: "Ensure the target URL is correct and reachable" },
    { error: "API token required", solution: "Register at wpvulndb.com and use --api-token" },
    { error: "Too many redirects", solution: "Use --follow-redirection or check URL format" }
  ],
  tags: ["wordpress", "cms", "scanner", "vulnerability"]
}
