import { ToolGuide } from "@/lib/guide-types"

export const hydraGuide: ToolGuide = {
  id: "hydra",
  name: "Hydra",
  icon: "shield",
  category: "Methods",
  description: "Fast online password brute-forcing tool supporting many protocols",
  installation: {
    title: "Installation",
    steps: ["Install via package manager", "Or compile from source", "Verify installation"],
    code: `# Kali Linux
apt install hydra

# macOS
brew install hydra

# Verify
hydra --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute-force login credentials for various network services",
    code: `# SSH bruteforce
hydra -l admin -P passwords.txt ssh://target.com

# Web form bruteforce
hydra -l user -P pass.txt target.com http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"

# FTP bruteforce
hydra -L users.txt -P passwords.txt ftp://target.com`
  },
  commands: [
    { command: "-l", description: "Single username" },
    { command: "-L", description: "Username wordlist" },
    { command: "-p", description: "Single password" },
    { command: "-P", description: "Password wordlist" },
    { command: "-t", description: "Tasks per target (threads)" },
    { command: "-v", description: "Verbose output" },
    { command: "-f", description: "Stop after first success" },
    { command: "-s", description: "Custom port" },
    { command: "-o", description: "Output file" },
    { command: "http-post-form", description: "Web form attack module" }
  ],
  whenToUse: [
    "Password auditing and recovery",
    "Testing weak credentials",
    "CTF challenges",
    "Post-exploitation lateral movement",
    "Validating password policies"
  ],
  notes: [
    "Supports 50+ protocols (SSH, FTP, HTTP, MySQL, etc.)",
    "Use -f flag to stop on first valid password",
    "Combine with CeWL for targeted wordlists",
    "Rate limiting may cause false negatives"
  ],
  commonErrors: [
    { error: "Connection refused", solution: "Check if service is running on the target" },
    { error: "Too many connections", solution: "Reduce threads with -t flag" },
    { error: "Invalid module", solution: "Use hydra -h to list available modules" }
  ],
  tags: ["bruteforce", "password", "authentication", "networking"]
}
