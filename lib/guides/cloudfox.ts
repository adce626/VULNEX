import { ToolGuide } from "@/lib/guide-types"

export const cloudfoxGuide: ToolGuide = {
  id: "cloudfox",
  name: "CloudFox",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "AWS and Azure enumeration and privilege escalation tool",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Configure cloud credentials",
      "Verify installation"
    ],
    code: `# Using Go
go install github.com/BishopFox/cloudfox@latest

# Configure AWS credentials
aws configure

# Verify
cloudfox --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Enumerate cloud resources and find attack paths",
    code: `# AWS - All checks
cloudfox aws --profile victim all-checks

# Specific commands
cloudfox aws principals
cloudfox aws permissions
cloudfox aws secrets

# Azure
cloudfox azure --tenant xxx all-checks`
  },
  commands: [
    { command: "all-checks", description: "Run all enumeration" },
    { command: "principals", description: "List IAM principals" },
    { command: "permissions", description: "Check permissions" },
    { command: "secrets", description: "Find secrets" },
    { command: "instances", description: "List EC2 instances" },
    { command: "--profile", description: "AWS profile to use" }
  ],
  whenToUse: [
    "Cloud security assessments",
    "Post-compromise enumeration",
    "Privilege escalation research",
    "Finding misconfigurations"
  ],
  notes: [
    "Requires valid cloud credentials",
    "Results saved to loot directory",
    "Use with proper authorization"
  ],
  commonErrors: [
    {
      error: "Invalid credentials",
      solution: "Check AWS/Azure credential configuration"
    },
    {
      error: "Access denied",
      solution: "Credentials may lack required permissions"
    }
  ],
  tags: ["cloud", "aws", "azure", "enumeration"]
}
