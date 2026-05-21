import { ToolGuide } from "@/lib/guide-types"

export const githubsubdomainsGuide: ToolGuide = {
  id: "githubsubdomains",
  name: "GitHub-Subdomains",
  icon: "code",
  category: "Recon & OSINT",
  description: "Enumerate subdomains from GitHub repositories",
  installation: {
    title: "Installation",
    steps: [
      "Install Go 1.16+ on your system",
      "Run the Go install command",
      "Configure a GitHub personal access token",
      "Verify installation"
    ],
    code: `go install github.com/gwen001/github-subdomains@latest

# Verify
github-subdomains -h`
  },
  usage: {
    title: "Basic Usage",
    description: "GitHub-Subdomains searches GitHub repositories for subdomains by scanning code, issues, and commit history",
    code: `# Basic search with token
github-subdomains -t YOUR_GITHUB_TOKEN -d example.com

# Output to file
github-subdomains -t YOUR_GITHUB_TOKEN -d example.com -o results.txt

# Raw output (pipe-friendly)
github-subdomains -t YOUR_GITHUB_TOKEN -d example.com -raw`
  },
  commands: [
    { command: "-t", description: "GitHub personal access token" },
    { command: "-d", description: "Target domain to search" },
    { command: "-o", description: "Output file path" },
    { command: "-raw", description: "Raw output (one per line)" },
    { command: "-v", description: "Verbose mode" }
  ],
  whenToUse: [
    "Finding subdomains leaked in source code",
    "Discovering forgotten development/staging subdomains",
    "Expanding recon beyond traditional DNS sources",
    "Bug hunting for exposed internal endpoints"
  ],
  notes: [
    "Requires a GitHub personal access token (free)",
    "Higher rate limits with a token vs unauthenticated",
    "Searches code, commits, issues, and wikis",
    "Results may include false positives — validate with dnsx or httpx"
  ],
  commonErrors: [
    {
      error: "API rate limited",
      solution: "Use a GitHub token for higher limits or reduce request frequency"
    },
    {
      error: "Token expired or invalid",
      solution: "Regenerate your token at https://github.com/settings/tokens"
    }
  ],
  tags: ["subdomain", "github", "recon", "osint"]
}
