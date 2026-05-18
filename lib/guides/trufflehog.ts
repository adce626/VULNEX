import { ToolGuide } from "@/lib/guide-types"

export const trufflehogGuide: ToolGuide = {
  id: "trufflehog",
  name: "TruffleHog",
  icon: "shield",
  category: "Cloud & Assets",
  description: "Scan Git repositories and filesystems for leaked secrets, credentials, and API keys",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Install using pip", "Download binary", "Verify installation"],
    code: `# Using Go
go install github.com/trufflesecurity/trufflehog/v3@latest

# Using pip
pip install trufflehog

# Using Docker
docker run --rm -it trufflesecurity/trufflehog:latest

# Verify
trufflehog --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect exposed secrets in Git repos, filesystems, and S3 buckets",
    code: `# Scan a GitHub repo
trufflehog git https://github.com/user/repo

# Scan a GitLab repo
trufflehog git https://gitlab.com/user/repo --since-commit HEAD~10

# Scan filesystem recursively
trufflehog filesystem /path/to/directory

# Scan S3 bucket
trufflehog s3 --bucket=my-bucket

# Scan with JSON output
trufflehog git https://github.com/user/repo --json

# Scan for specific entropy level
trufflehog git https://github.com/user/repo --only-verified`
  },
  commands: [
    { command: "git", description: "Scan a Git repository" },
    { command: "filesystem", description: "Scan local filesystem" },
    { command: "s3", description: "Scan AWS S3 buckets" },
    { command: "github", description: "Scan GitHub repos and orgs" },
    { command: "gitlab", description: "Scan GitLab repos" },
    { command: "--json", description: "JSON output format" },
    { command: "--only-verified", description: "Show only verified secrets" },
    { command: "--concurrency", description: "Number of concurrent workers" },
    { command: "--since-commit", description: "Scan from specific commit" },
    { command: "--branch", description: "Scan specific branch" },
    { command: "--exclude-paths", description: "File with paths to exclude" },
    { command: "--no-verification", description: "Skip secret verification" }
  ],
  whenToUse: [
    "Scanning organization repos for leaked credentials",
    "CI/CD pipeline integration for secret detection",
    "Post-compromise assessment of exposed secrets",
    "Third-party vendor security review",
    "Bug bounty recon for leaked API keys"
  ],
  notes: [
    "Uses entropy detection and pattern matching for finding secrets",
    "Can verify discovered secrets by attempting API calls",
    "Integrates with GitHub Actions, GitLab CI, and Jenkins",
    "Scans all commit history, not just the latest version"
  ],
  commonErrors: [
    { error: "Too many false positives", solution: "Use --only-verified to show only confirmed secrets" },
    { error: "Rate limited by GitHub", solution: "Reduce concurrency with --concurrency flag or use a token" }
  ],
  tags: ["secrets", "credentials", "git", "leaks", "scanning"]
}
