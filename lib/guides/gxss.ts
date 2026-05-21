import { ToolGuide } from "@/lib/guide-types"

export const gxssGuide: ToolGuide = {
  id: "gxss",
  name: "Gxss",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Reflected XSS parameter detection",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/KathanP19/Gxss@latest

# Verify
Gxss -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect reflected XSS parameters by injecting test payloads",
    code: `# Scan URLs with a test payload
cat urls.txt | Gxss -p "test"

# Scan with custom payload and threads
cat urls.txt | Gxss -p "<script>alert(1)</script>" -t 50

# Output only vulnerable parameters
cat urls.txt | Gxss -p "test" -o output.txt

# Quiet mode for piping
cat urls.txt | Gxss -p "test" -c 100`
  },
  commands: [
    { command: "-p", description: "Payload to inject" },
    { command: "-t", description: "Number of threads" },
    { command: "-o", description: "Output file" },
    { command: "-c", description: "Concurrent requests" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Reflected XSS parameter discovery",
    "Mass scanning URL collections",
    "Automated bug bounty workflows",
    "Filtering URLs for XSS testing",
    "Pre-scanning before manual XSS exploitation"
  ],
  notes: [
    "Detects which parameters reflect input in the response",
    "Does not confirm actual XSS — only detects reflection",
    "Fast multi-threaded scanning",
    "Use with -c for concurrent request control",
    "Works well with dalfox for full XSS verification"
  ],
  commonErrors: [
    { error: "No URLs provided", solution: "Pipe URLs via stdin: cat urls.txt | Gxss -p test" },
    { error: "No reflection found", solution: "Try different payloads or verify URLs contain parameters" }
  ],
  tags: ["xss", "reflected", "detection", "golang"]
}
