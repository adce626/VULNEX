import { ToolGuide } from "@/lib/guide-types"

export const cewlGuide: ToolGuide = {
  id: "cewl",
  name: "CeWL",
  icon: "search",
  category: "Methods",
  description: "Custom wordlist generator that crawls websites for targeted brute-forcing",
  installation: {
    title: "Installation",
    steps: ["Install Ruby", "Install CeWL via gem", "Verify installation"],
    code: `# Using gem
gem install cewl

# Kali Linux
apt install cewl

# Verify
cewl --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Generate custom wordlists from target website content",
    code: `# Basic wordlist generation
cewl https://target.com -w wordlist.txt

# With minimum word length
cewl https://target.com -m 6 -w wordlist.txt

# Verbose output
cewl https://target.com -v`
  },
  commands: [
    { command: "-w", description: "Output wordlist file" },
    { command: "-m", description: "Minimum word length" },
    { command: "-d", description: "Crawl depth" },
    { command: "-c", description: "Count of words found" },
    { command: "-v", description: "Verbose mode" },
    { command: "--with-numbers", description: "Include words with numbers" },
    { command: "--email", description: "Extract email addresses" },
    { command: "--meta", description: "Extract meta data" },
    { command: "--lowercase", description: "Convert to lowercase" },
    { command: "--auth_type", description: "Authentication type" }
  ],
  whenToUse: [
    "Creating targeted wordlists for brute-force attacks",
    "Password spraying preparation",
    "Custom dictionary generation",
    "When default wordlists are too generic",
    "Pre-engagement reconnaissance"
  ],
  notes: [
    "Works best with deeper crawl depths",
    "Combine with hydra for targeted attacks",
    "Extracted emails can be used for username enumeration",
    "Use --with-numbers for password-like patterns"
  ],
  commonErrors: [
    { error: "Empty wordlist", solution: "Increase crawl depth with -d flag" },
    { error: "Slow crawling", solution: "Reduce depth or use --agent for custom user-agent" },
    { error: "Blocked by WAF", solution: "Add delays or use alternative user-agent" }
  ],
  tags: ["wordlist", "crawler", "password", "brute-force"]
}
