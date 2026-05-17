import { ToolGuide } from "@/lib/guide-types"

export const nucleiGuide: ToolGuide = {
  id: "nuclei",
  name: "Nuclei",
  icon: "target",
  category: "Web Vulnerabilities",
  description: "Fast vulnerability scanner with template-based detection",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Update nuclei templates",
      "Verify installation"
    ],
    code: `# Using Go
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Update templates
nuclei -update-templates

# Verify
nuclei -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan targets using YAML templates for various vulnerabilities",
    code: `# Basic scan
nuclei -u https://example.com

# Scan with specific templates
nuclei -u https://example.com -t cves/

# Multiple targets
nuclei -l urls.txt -t vulnerabilities/

# Severity filter
nuclei -u https://example.com -s critical,high

# Custom template
nuclei -u https://example.com -t my-template.yaml`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-l", description: "List of target URLs" },
    { command: "-t", description: "Template or folder path" },
    { command: "-s", description: "Severity filter" },
    { command: "-tags", description: "Filter by tags" },
    { command: "-o", description: "Output file" },
    { command: "-json", description: "JSON output" },
    { command: "-rate-limit", description: "Requests per second" },
    { command: "-c", description: "Concurrent templates" },
    { command: "-silent", description: "Silent mode" }
  ],
  whenToUse: [
    "Automated vulnerability scanning",
    "CVE detection",
    "Misconfigurations discovery",
    "Custom security checks",
    "CI/CD security testing"
  ],
  notes: [
    "Templates updated frequently - run -update-templates regularly",
    "Create custom templates for specific checks",
    "Use -rate-limit to avoid overwhelming targets",
    "Combine with httpx for efficient scanning"
  ],
  commonErrors: [
    {
      error: "No templates found",
      solution: "Run nuclei -update-templates to download templates"
    },
    {
      error: "Rate limited",
      solution: "Use -rate-limit flag to slow down requests"
    },
    {
      error: "False positives",
      solution: "Verify manually and adjust template matchers"
    }
  ],
  tags: ["vuln-scanner", "templates", "automation", "cve"]
}
