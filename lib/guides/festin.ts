import { ToolGuide } from "@/lib/guide-types"

export const festinGuide: ToolGuide = {
  id: "festin",
  name: "festin",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Cloud bucket enumeration and discovery tool",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `go install github.com/cruise-automation/festin@latest

# Verify
festin --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Enumerate cloud storage buckets for a given domain",
    code: `# Basic enumeration
festin -domain example.com

# Specify output file
festin -domain example.com -o results.txt`
  },
  commands: [
    { command: "-domain", description: "Target domain to enumerate" },
    { command: "-o", description: "Output file for results" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "Discovering cloud storage buckets for a target domain",
    "Identifying exposed S3, Azure Blob, and GCP buckets",
    "Asset discovery during reconnaissance"
  ],
  notes: [
    "Supports AWS S3, Azure Blob, and GCP Cloud Storage",
    "Use with proper authorization",
    "Results may include both public and private buckets"
  ],
  commonErrors: [
    { error: "No buckets found", solution: "The domain may not use cloud storage or may use non-standard naming" },
    { error: "Rate limiting", solution: "Add delays between requests or use a proxy rotation" }
  ],
  tags: ["cloud", "bucket", "enumerate", "s3"]
}
