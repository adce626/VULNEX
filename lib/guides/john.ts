import { ToolGuide } from "@/lib/guide-types"

export const johnGuide: ToolGuide = {
  id: "john",
  name: "John the Ripper",
  icon: "key",
  category: "Tools & Methods",
  description: "Fast password cracking tool supporting many hash formats",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager",
      "Or build from source",
      "Verify installation"
    ],
    code: `# Debian/Ubuntu
apt install john

# Verify
john --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Crack password hashes using wordlists, rules, and brute force",
    code: `# Basic cracking
john hash.txt

# Wordlist attack
john --wordlist=rockyou.txt hash.txt

# Show cracked passwords
john --show hash.txt`
  },
  commands: [
    { command: "--wordlist", description: "Use wordlist for dictionary attack" },
    { command: "--rules", description: "Apply word mangling rules" },
    { command: "--incremental", description: "Brute force incremental mode" },
    { command: "--format", description: "Specify hash format" },
    { command: "--show", description: "Show cracked passwords" },
    { command: "--session", description: "Session name for resuming" },
    { command: "--restore", description: "Restore interrupted session" },
    { command: "--pot", description: "Pot file to use" },
    { command: "--fork", description: "Number of parallel processes" },
    { command: "--stdout", description: "Print words to stdout" }
  ],
  whenToUse: [
    "Password cracking from captured hashes",
    "Hash type analysis and identification",
    "CTF challenges requiring hash cracking",
    "Auditing password policy strength",
    "Penetration testing post-exploitation"
  ],
  notes: [
    "Use --wordlist for dictionary attacks with common passwords",
    "Use --incremental for brute force on short passwords",
    "GPU support available with john --devices for faster cracking"
  ],
  commonErrors: [
    { error: "No hashes loaded", solution: "Verify hash format and use --format flag" },
    { error: "Wrong format", solution: "Check if hashes are in valid format for John" },
    { error: "Too slow", solution: "Use --fork for multiprocessing or enable GPU" }
  ],
  tags: ["password", "cracking", "hash", "bruteforce"]
}
