import { ToolGuide } from "@/lib/guide-types"

export const enumerateiamGuide: ToolGuide = {
  id: "enumerateiam",
  name: "enumerate-iam",
  icon: "key",
  category: "Cloud & Assets",
  description: "Enumerate IAM permissions on AWS using brute force",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Verify installation"],
    code: `git clone https://github.com/andresriancho/enumerate-iam.git
cd enumerate-iam
pip install -r requirements.txt

# Verify
python3 enumerate-iam.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute force IAM permissions to determine effective access",
    code: `# Basic enumeration with access keys
python3 enumerate-iam.py --access-key AKIA... --secret-key ...

# With session token
python3 enumerate-iam.py --access-key AKIA... --secret-key ... --session-token ...

# Output to file
python3 enumerate-iam.py --access-key AKIA... --secret-key ... -o results.json`
  },
  commands: [
    { command: "--access-key", description: "AWS access key ID" },
    { command: "--secret-key", description: "AWS secret access key" },
    { command: "--session-token", description: "AWS session token (if using STS)" },
    { command: "-o", description: "Output file for results" }
  ],
  whenToUse: [
    "Determining effective IAM permissions for an AWS key",
    "Privilege escalation path discovery",
    "Post-exploitation AWS environment assessment"
  ],
  notes: [
    "Does not require any permissions to start — uses brute force enumeration",
    "May generate CloudTrail logs",
    "Use only with proper authorization"
  ],
  commonErrors: [
    { error: "Invalid access key", solution: "Verify the AWS access key and secret key are correct" },
    { error: "All actions denied", solution: "The key may have no permissions or be expired" }
  ],
  tags: ["aws", "iam", "permissions", "enumerate"]
}
