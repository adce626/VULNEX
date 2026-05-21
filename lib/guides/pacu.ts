import { ToolGuide } from "@/lib/guide-types"

export const pacuGuide: ToolGuide = {
  id: "pacu",
  name: "Pacu",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "AWS exploitation framework for post-exploitation testing",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Run install script", "Verify installation"],
    code: `git clone https://github.com/RhinoSecurityLabs/pacu.git
cd pacu
bash install.sh

# Verify
python3 pacu.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Post-exploitation framework for AWS environments",
    code: `# Start Pacu
python3 pacu.py

# Inside Pacu interactive shell:
# List AWS keys
list

# Set access keys
set_keys

# Run modules
run iam__enum_permissions
run ec2__enum
run s3__bucket_bruteforce

# List available modules
ls`
  },
  commands: [
    { command: "set_keys", description: "Configure AWS access keys" },
    { command: "run", description: "Execute a module" },
    { command: "ls", description: "List available modules" },
    { command: "list", description: "List configured AWS keys" },
    { command: "help", description: "Show help for commands" }
  ],
  whenToUse: [
    "AWS post-exploitation assessments",
    "Privilege escalation testing in AWS",
    "Simulating attacker post-compromise activities"
  ],
  notes: [
    "Interactive shell-based framework",
    "Dozens of modules for different AWS services",
    "Requires valid AWS credentials",
    "Use only with proper authorization"
  ],
  commonErrors: [
    { error: "Module not found", solution: "Run 'update' to fetch the latest modules" },
    { error: "Invalid credentials", solution: "Use set_keys to reconfigure AWS access keys" }
  ],
  tags: ["aws", "exploitation", "cloud", "framework"]
}
