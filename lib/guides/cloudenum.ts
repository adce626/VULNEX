import { ToolGuide } from "@/lib/guide-types"

export const cloudenumGuide: ToolGuide = {
  id: "cloudenum",
  name: "Cloud_Enum",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Multi-cloud enumeration tool for AWS, Azure, and GCP resources",
  installation: {
    title: "Installation",
    steps: ["Clone repository", "Install dependencies", "Verify installation"],
    code: `# Clone repository
git clone https://github.com/initstring/cloud_enum.git
cd cloud_enum

# Install dependencies
pip install -r requirements.txt

# Verify
python3 cloud_enum.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Enumerate cloud resources across AWS, Azure, and GCP",
    code: `# Basic enumeration
python3 cloud_enum.py -k example

# Enumerate all providers
python3 cloud_enum.py -k example --aws --azure --gcp

# Use custom keyword list
python3 cloud_enum.py -k keyword -w wordlist.txt

# Check specific cloud
python3 cloud_enum.py -k example --gcp-only

# Log output to file
python3 cloud_enum.py -k example -l results.log`
  },
  commands: [
    { command: "-k", description: "Base keyword(s) to enumerate" },
    { command: "-w", description: "Custom wordlist file" },
    { command: "--aws", description: "Check AWS only" },
    { command: "--azure", description: "Check Azure only" },
    { command: "--gcp", description: "Check GCP only" },
    { command: "-l", description: "Log file output" },
    { command: "-t", description: "Number of threads" },
    { command: "--timeout", description: "Request timeout in seconds" }
  ],
  whenToUse: [
    "Discovering cloud resources of a target organization",
    "Cloud penetration testing engagement recon",
    "Finding misconfigured cloud storage and services",
    "Red team cloud asset discovery"
  ],
  notes: [
    "Supports AWS (S3, CloudFront), Azure (Blob, Vaults), GCP (Storage, AppEngine)",
    "Multi-threaded for faster scanning",
    "Focuses on common naming patterns across cloud providers"
  ],
  commonErrors: [
    { error: "No results found", solution: "Try different keywords or use -w with a larger wordlist" },
    { error: "Rate limited by provider", solution: "Reduce threads with -t flag and increase --timeout" }
  ],
  tags: ["cloud", "enumeration", "aws", "azure", "gcp"]
}
