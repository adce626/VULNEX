import { ToolGuide } from "@/lib/guide-types"

export const scoutsuiteGuide: ToolGuide = {
  id: "scoutsuite",
  name: "ScoutSuite",
  icon: "shield",
  category: "Cloud & Assets",
  description: "Multi-cloud security auditing tool for AWS, Azure, and GCP",
  installation: {
    title: "Installation",
    steps: ["Install via pip", "Verify installation"],
    code: `pip install scoutsuite

# Verify
scout --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Audit cloud environment security configurations",
    code: `# AWS audit
scout aws --access-keys --session-token

# Azure audit
scout azure --cli

# GCP audit
scout gcp --service-account /path/to/key.json

# AWS with specific profile
scout aws --profile myprofile`
  },
  commands: [
    { command: "aws", description: "Audit AWS environment" },
    { command: "azure", description: "Audit Azure environment" },
    { command: "gcp", description: "Audit GCP environment" },
    { command: "--profile", description: "Use a specific cloud profile" },
    { command: "--report-dir", description: "Output directory for the report" }
  ],
  whenToUse: [
    "Cloud security posture assessments",
    "Compliance auditing for cloud infrastructure",
    "Identifying cloud misconfigurations",
    "Pre-production security reviews"
  ],
  notes: [
    "Generates an HTML report with findings",
    "Supports AWS, Azure, and GCP",
    "Requires read-only credentials for best results"
  ],
  commonErrors: [
    { error: "Credential errors", solution: "Verify cloud credentials are correctly configured" },
    { error: "Missing permissions", solution: "Ensure the credentials have read access to cloud resources" }
  ],
  tags: ["cloud", "audit", "security", "aws", "azure", "gcp"]
}
