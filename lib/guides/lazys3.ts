import { ToolGuide } from "@/lib/guide-types"

export const lazys3Guide: ToolGuide = {
  id: "lazys3",
  name: "LazyS3",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Brute force AWS S3 bucket names using permutations and common patterns",
  installation: {
    title: "Installation",
    steps: ["Clone repository", "Install dependencies", "Verify installation"],
    code: `# Clone repository
git clone https://github.com/nahamsec/lazys3.git
cd lazys3

# Install dependencies
pip install -r requirements.txt

# Verify
python3 lazys3.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute force S3 bucket names based on a target keyword",
    code: `# Basic brute force
python3 lazys3.py example

# Custom wordlist
python3 lazys3.py example -w wordlist.txt

# Check specific region
python3 lazys3.py example -r us-west-2

# Output results to file
python3 lazys3.py example -o results.txt`
  },
  commands: [
    { command: "-w", description: "Custom wordlist file" },
    { command: "-r", description: "AWS region to check" },
    { command: "-o", description: "Output file for results" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "Discovering hidden S3 buckets related to a target",
    "Recon phase for cloud asset discovery",
    "Finding misconfigured storage buckets",
    "Bug bounty recon for S3 vulnerabilities"
  ],
  notes: [
    "Created by nahamsec — popular bug bounty resource",
    "Generates permutations based on the target keyword",
    "Use with a custom wordlist for better coverage"
  ],
  commonErrors: [
    { error: "No buckets found", solution: "Try a larger wordlist or different naming patterns" },
    { error: "Rate limiting", solution: "Add delays between requests to avoid AWS rate limits" }
  ],
  tags: ["s3", "aws", "bucket", "bruteforce"]
}
