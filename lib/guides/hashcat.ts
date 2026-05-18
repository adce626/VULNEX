import { ToolGuide } from "@/lib/guide-types"

export const hashcatGuide: ToolGuide = {
  id: "hashcat",
  name: "Hashcat",
  icon: "key",
  category: "Methods",
  description: "World's fastest password recovery tool with GPU acceleration and multiple attack modes",
  installation: {
    title: "Installation",
    steps: ["Install via apt", "Download from website", "Verify installation"],
    code: `# Ubuntu/Debian
sudo apt install hashcat

# Download binary
wget https://hashcat.net/files/hashcat-6.2.6.7z
7z x hashcat-6.2.6.7z

# Verify
hashcat --version

# List supported hash modes
hashcat --help | grep 'SHA\|MD5\|bcrypt'`
  },
  usage: {
    title: "Basic Usage",
    description: "Crack password hashes using dictionary, brute-force, and rule-based attacks",
    code: `# Dictionary attack
hashcat -m 0 -a 0 hash.txt wordlist.txt

# Mask attack (brute-force)
hashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l

# Rule-based attack
hashcat -m 0 -a 0 hash.txt wordlist.txt -r rules/best64.rule

# Combination attack
hashcat -m 0 -a 1 hash.txt wordlist1.txt wordlist2.txt

# Show cracked passwords
hashcat -m 0 --show hash.txt

# Benchmark
hashcat -b --benchmark-all`
  },
  commands: [
    { command: "-m", description: "Hash type (0=MD5, 1000=NTLM, 3200=bcrypt)" },
    { command: "-a", description: "Attack mode (0=dictionary, 3=mask, 6=hybrid)" },
    { command: "-r", description: "Rules file for word mangling" },
    { command: "-o", description: "Output file for cracked hashes" },
    { command: "--show", description: "Show cracked passwords" },
    { command: "--force", description: "Ignore warnings" },
    { command: "--potfile-path", description: "Custom potfile path" },
    { command: "-w", description: "Workload profile (1-4)" },
    { command: "-D", description: "Device type (1=CPU, 2=GPU)" },
    { command: "--status", description: "Show status updates" },
    { command: "--status-timer", description: "Status update interval" },
    { command: "-O", description: "Optimized kernel" }
  ],
  whenToUse: [
    "Password cracking in penetration tests",
    "Recovering lost passwords from hashes",
    "Auditing password policy strength",
    "CTF challenges involving hash cracking",
    "Validating hash extraction results"
  ],
  notes: [
    "GPU acceleration makes it significantly faster than CPU-based tools",
    "Always use rules with dictionary attacks for better results",
    "The rockyou.txt wordlist is a good starting point",
    "Use --force only when you understand the warnings"
  ],
  commonErrors: [
    { error: "No hashes cracked", solution: "Try larger wordlists like rockyou, add rules with -r, or use mask attacks" },
    { error: "CUDA/OpenCL device not found", solution: "Install GPU drivers, or use CPU with -D 1 flag" }
  ],
  tags: ["password", "cracking", "hash", "gpu", "bruteforce"]
}
