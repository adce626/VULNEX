export interface JohnCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const johnCategories: JohnCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "apt install john", description: "Install on Kali/Debian" },
      { command: "brew install john", description: "Install on macOS" },
      { command: "john --version", description: "Verify installation" },
    ],
  },
  {
    category: "Basic Cracking",
    commands: [
      { command: "john hash.txt", description: "#1 Auto-detect hash and crack with default mode" },
      { command: "john --wordlist=rockyou.txt hash.txt", description: "#2 Dictionary attack with wordlist" },
      { command: "john --show hash.txt", description: "#3 Show all cracked passwords" },
      { command: "john hash.txt --format=raw-md5", description: "#4 Specify hash format explicitly" },
    ],
  },
  {
    category: "Wordlist & Rules",
    commands: [
      { command: "john --wordlist=rockyou.txt --rules hash.txt", description: "#1 Wordlist with mangling rules" },
      { command: "john --wordlist=cewl.txt --rules=best64 hash.txt", description: "#2 Custom wordlist with best64 rules" },
      { command: "john --stdout --wordlist=dictionary.txt", description: "#3 Generate all word combinations to stdout" },
      { command: "john --wordlist=passwords.txt --rules --stdout | wc -l", description: "#4 Count total word combinations" },
    ],
  },
  {
    category: "Incremental (Brute Force)",
    commands: [
      { command: "john --incremental hash.txt", description: "#1 Brute force with incremental mode (slow)" },
      { command: "john --incremental=LowerNum hash.txt", description: "#2 Incremental with charset: lowercase + numbers" },
      { command: "john --incremental --max-length=8 hash.txt", description: "#3 Limit to max 8 characters" },
      { command: "john --incremental --min-length=6 --max-length=10 hash.txt", description: "#4 Brute force passwords 6-10 chars long" },
    ],
  },
  {
    category: "Session Management",
    commands: [
      { command: "john --session=mycrack hash.txt", description: "#1 Save session with custom name" },
      { command: "john --restore=mycrack", description: "#2 Restore interrupted cracking session" },
      { command: "john --status=mycrack", description: "#3 Check progress of active session" },
      { command: 'john --pot=mycrack.pot hash.txt', description: "#4 Use custom .pot file for cracked passwords" },
    ],
  },
  {
    category: "Advanced Techniques",
    commands: [
      { command: "john --fork=4 hash.txt", description: "#1 Use 4 CPU cores for parallel cracking" },
      { command: "unshadow passwd shadow > hashes.txt && john hashes.txt", description: "#2 Crack Linux /etc/shadow passwords" },
      { command: "zip2hash encrypted.zip > hash.txt && john hash.txt", description: "#3 Crack ZIP file password" },
      { command: "rar2hash encrypted.rar > hash.txt && john hash.txt", description: "#4 Crack RAR file password" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "john --list=formats | grep -i nt", description: "List available formats (filter for NT/Windows)" },
      { command: "john --wordlist=rockyou.txt --rules --fork=8 hash.txt", description: "Use all CPU cores + wordlist + rules for fastest results" },
      { command: "john --show hash.txt | cut -d: -f2 | sort -u > cracked.txt", description: "Extract only cracked passwords for reuse" },
      { command: "john hash.txt --pot=results.pot && john --show hash.txt", description: "Save pot file + show results workflow" },
    ],
  },
]

export const johnTools = [
  { name: "John the Ripper GitHub", url: "https://github.com/openwall/john", description: "Official repository with documentation" },
  { name: "RockYou Wordlist", url: "https://github.com/praetorian-code/Hob0Rules", description: "Most famous password wordlist (compressed)" },
  { name: "Hashcat", url: "/tools/hashcat", description: "GPU-accelerated password cracking alternative" },
]
