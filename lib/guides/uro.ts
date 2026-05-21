import { ToolGuide } from "@/lib/guide-types"

export const uroGuide: ToolGuide = {
  id: "uro",
  name: "Uro",
  icon: "code",
  category: "Recon & OSINT",
  description: "URL deduplicator and cleaner that removes duplicates and low-quality paths from URL lists",
  installation: {
    title: "Installation",
    steps: ["Install via pip", "Verify installation"],
    code: `# Using pip
pip install uro

# Verify
uro --help

# Update
pip install --upgrade uro`
  },
  usage: {
    title: "Basic Usage",
    description: "Deduplicate and clean URL lists by removing duplicates, similar paths, and low-value entries",
    code: `# Deduplicate URLs from stdin
cat urls.txt | uro

# Deduplicate and sort by path depth
cat urls.txt | uro --depth

# Only keep unique paths (ignore query params)
cat urls.txt | uro --unique

# Output to file
cat urls.txt | uro > clean-urls.txt

# Include subdomains
cat urls.txt | uro --subs

# Show statistics
cat urls.txt | uro --stats

# Keep URLs with specific extensions
cat urls.txt | uro --include php,asp,jsp

# Exclude specific extensions
cat urls.txt | uro --exclude png,jpg,css`
  },
  commands: [
    { command: "--depth", description: "Sort by path depth" },
    { command: "--unique", description: "Keep only unique paths" },
    { command: "--subs", description: "Include subdomain URLs" },
    { command: "--stats", description: "Show deduplication statistics" },
    { command: "--include", description: "Keep only URLs with these extensions" },
    { command: "--exclude", description: "Remove URLs with these extensions" },
    { command: "--similar", description: "Group similar URLs" }
  ],
  whenToUse: [
    "Cleaning up large URL lists before vulnerability scanning",
    "Removing duplicate entries from multiple recon sources",
    "Reducing noise by excluding static file extensions",
    "Preparing clean input for tools like gf or dalfox",
    "Analyzing URL dataset statistics and patterns"
  ],
  notes: [
    "Reduces URL list size significantly by removing duplicates",
    "Can filter by file extension to focus on dynamic pages",
    "Use --depth to prioritize shallow paths for manual review",
    "Works well in pipelines with gau, waybackurls, and other URL tools"
  ],
  commonErrors: [
    { error: "Empty output", solution: "Check input format — each URL should be on a separate line" },
    { error: "Too aggressive filtering", solution: "Remove --exclude or adjust include/exclude lists" }
  ],
  tags: ["url", "deduplicate", "cleanup", "python", "recon"]
}
