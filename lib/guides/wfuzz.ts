import { ToolGuide } from "@/lib/guide-types"

export const wfuzzGuide: ToolGuide = {
  id: "wfuzz",
  name: "Wfuzz",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Web fuzzer for content discovery supporting multiple injection points and authentication",
  installation: {
    title: "Installation",
    steps: ["Install via pip", "Verify installation"],
    code: `# Using pip
pip install wfuzz

# Verify
wfuzz --help

# Update
pip install --upgrade wfuzz`
  },
  usage: {
    title: "Basic Usage",
    description: "Fuzz web applications for hidden content with multiple payload positions",
    code: `# Directory fuzzing
wfuzz -w wordlist.txt https://example.com/FUZZ

# Multiple payload positions
wfuzz -w users.txt -w passwords.txt https://example.com/FUZZ/FUZ2Z

# File extension fuzzing
wfuzz -w wordlist.txt -w extensions.txt https://example.com/FUZZ.FUZ2Z

# POST parameter fuzzing
wfuzz -w params.txt -d "FUZZ=test" https://example.com/login

# HTTP header fuzzing
wfuzz -w wordlist.txt -H "User-Agent: FUZZ" https://example.com

# Filter by response code
wfuzz -w wordlist.txt --hc 404 https://example.com/FUZZ

# Filter by response size
wfuzz -w wordlist.txt --hw 123 https://example.com/FUZZ

# With cookie authentication
wfuzz -w wordlist.txt -b "session=abc123" https://example.com/FUZZ`
  },
  commands: [
    { command: "-w", description: "Wordlist file (multiple -w for multiple payloads)" },
    { command: "--hc", description: "Hide responses with status code" },
    { command: "--hw", description: "Hide responses with word count" },
    { command: "--hl", description: "Hide responses with line count" },
    { command: "--hh", description: "Hide responses with character count" },
    { command: "-b", description: "Cookie data" },
    { command: "-H", description: "Custom header" },
    { command: "-d", description: "POST data" },
    { command: "-X", description: "HTTP method" },
    { command: "-p", description: "Proxy (e.g., 127.0.0.1:8080)" },
    { command: "-t", description: "Number of threads" }
  ],
  whenToUse: [
    "Content discovery in web application assessments",
    "Authentication bypass testing with multiple payload positions",
    "Parameter fuzzing for hidden functionality",
    "Header injection testing",
    "HTTP method brute-forcing and discovery"
  ],
  notes: [
    "Supports multiple payload injection points with FUZZ, FUZ2Z, etc.",
    "Can output results in different formats (json, html, raw)",
    "Built-in filtering by response code, size, lines, or words",
    "Compatible with Burp Suite proxy for manual review"
  ],
  commonErrors: [
    { error: "No results matching filter", solution: "Reduce filter strictness or check if the target is accessible" },
    { error: "Connection errors", solution: "Use -p flag with proxy or increase timeout with -t flag" }
  ],
  tags: ["fuzzer", "content", "discovery", "python", "web"]
}
