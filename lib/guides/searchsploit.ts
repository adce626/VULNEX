import { ToolGuide } from "@/lib/guide-types"

export const searchsploitGuide: ToolGuide = {
  id: "searchsploit",
  name: "Searchsploit",
  icon: "search",
  category: "Tools & Methods",
  description: "Exploit Database search tool for finding public exploits",
  installation: {
    title: "Installation",
    steps: [
      "Install exploitdb package",
      "Update the database",
      "Verify installation"
    ],
    code: `# Debian/Ubuntu
apt install exploitdb

# Update database
searchsploit -u

# Search
searchsploit apache`
  },
  usage: {
    title: "Basic Usage",
    description: "Search offline copies of Exploit-DB for public exploits",
    code: `# Search term
searchsploit apache

# Title search
searchsploit -t wordpress

# Show exploit details
searchsploit -p 12345`
  },
  commands: [
    { command: "-t", description: "Search by title only" },
    { command: "-p", description: "Show full path to exploit" },
    { command: "-c", description: "Case-sensitive search" },
    { command: "-j", description: "JSON output" },
    { command: "--nmap", description: "Search by Nmap service version" },
    { command: "--exclude", description: "Exclude results by category" },
    { command: "-s", description: "Strict search" },
    { command: "-w", description: "Show full URL to Exploit-DB" },
    { command: "-v", description: "Verbose output" },
    { command: "--id", description: "Display EDB-ID (default)" }
  ],
  whenToUse: [
    "Finding public exploits for known vulnerabilities",
    "Vulnerability research and PoC collection",
    "Locating exploit source code and details",
    "CTF challenges requiring known exploits",
    "Penetration testing exploit verification"
  ],
  notes: [
    "Update regularly with -u for latest exploits",
    "Use -w to get full URL to the Exploit-DB entry",
    "Mirrors the Exploit-DB database offline"
  ],
  commonErrors: [
    { error: "Outdated database", solution: "Run searchsploit -u to update" },
    { error: "No results", solution: "Try broader search terms or use -t for title search" },
    { error: "Wrong search term", solution: "Use -t for title-specific matching" }
  ],
  tags: ["exploit", "search", "database", "vulnerability"]
}
