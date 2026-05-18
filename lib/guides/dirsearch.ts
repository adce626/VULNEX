import { ToolGuide } from "@/lib/guide-types"

export const dirsearchGuide: ToolGuide = {
  id: "dirsearch",
  name: "Dirsearch",
  icon: "folder-search",
  category: "Methods",
  description: "Advanced web path brute-forcing tool with recursive scanning",
  installation: {
    title: "Installation",
    steps: [
      "Clone the repository",
      "Install Python dependencies",
      "Verify installation"
    ],
    code: `# Clone repository
git clone https://github.com/maurosoria/dirsearch.git

# Install dependencies
cd dirsearch && pip install -r requirements.txt

# Run
python3 dirsearch.py -u https://target.com`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute-force directories and files on web servers",
    code: `# Basic scan
python3 dirsearch.py -u https://target.com

# Specific extensions
python3 dirsearch.py -u https://target.com -e php,html

# Multiple targets from file
python3 dirsearch.py -l targets.txt`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-l", description: "File with list of URLs" },
    { command: "-e", description: "Extensions to check" },
    { command: "-x", description: "Exclude status codes" },
    { command: "-w", description: "Custom wordlist" },
    { command: "-r", description: "Recursive scan" },
    { command: "-R", description: "Recursion depth" },
    { command: "-t", description: "Number of threads" },
    { command: "--proxy", description: "Proxy for requests" },
    { command: "--cookies", description: "Cookies for authentication" }
  ],
  whenToUse: [
    "Directory discovery on web applications",
    "Finding hidden files and backup files",
    "Exposed API endpoints discovery",
    "Recursive scanning of found directories",
    "Web application asset mapping"
  ],
  notes: [
    "Use -r for recursive scanning through discovered directories",
    "Supports many file extensions with -e flag",
    "Pair with SecLists for comprehensive wordlists"
  ],
  commonErrors: [
    { error: "No results", solution: "Try a larger wordlist or more extensions" },
    { error: "False positives", solution: "Filter by status codes with -x flag" },
    { error: "Blocked by WAF", solution: "Reduce threads with -t flag or add delays" }
  ],
  tags: ["bruteforce", "directory", "discovery", "web"]
}
