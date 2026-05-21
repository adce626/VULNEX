import { ToolGuide } from "@/lib/guide-types"

export const gitleaksGuide: ToolGuide = {
  id: "gitleaks",
  name: "Gitleaks",
  icon: "key",
  category: "Recon & OSINT",
  description: "Detect secrets, API keys, and passwords in Git repositories",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `go install github.com/zricethezav/gitleaks/v8@latest

# Verify
gitleaks --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan Git repositories for hardcoded secrets and credentials",
    code: `# Scan local directory
gitleaks detect -s .

# Scan a remote repository
gitleaks git -r https://github.com/org/repo

# Scan with custom rules
gitleaks detect -s . --config custom.toml

# Output results to JSON
gitleaks detect -s . -r results.json`
  },
  commands: [
    { command: "detect", description: "Scan a local directory for secrets" },
    { command: "git", description: "Scan a remote Git repository" },
    { command: "-s", description: "Source path to scan" },
    { command: "-r", description: "Remote repository URL or output file" },
    { command: "--config", description: "Custom configuration file" },
    { command: "--verbose", description: "Verbose output" }
  ],
  whenToUse: [
    "Scanning your own repos for accidentally committed secrets",
    "Security audits of third-party repositories",
    "CI/CD pipeline integration to prevent secret leaks",
    "Post-compromise assessment for credential exposure"
  ],
  notes: [
    "Supports over 150 built-in secret patterns",
    "Can be integrated into CI/CD pipelines via GitHub Actions, GitLab CI, etc.",
    "Custom rules can be defined in a TOML config file",
    "Pre-commit hook available to prevent secrets from being committed"
  ],
  commonErrors: [
    { error: "False positives", solution: "Use --config to create a custom allowlist for known false positives" },
    { error: "Scan too slow", solution: "Use --log-level warn to reduce output or scan specific directories" }
  ],
  tags: ["secret", "git", "leak", "detection"]
}
