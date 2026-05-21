import { ToolGuide } from "@/lib/guide-types"

export const gowitnessGuide: ToolGuide = {
  id: "gowitness",
  name: "Gowitness",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Web screenshot utility written in Go using Chrome Headless",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/sensepost/gowitness@latest

# Verify
gowitness -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Take screenshots of websites with headless Chrome",
    code: `# Single URL
gowitness single https://example.com

# Multiple URLs from file
gowitness file -f urls.txt

# Scan with Nmap XML
gowitness nmap -f scan.xml

# Serve report UI
gowitness report serve

# Generate PDF report
gowitness report generate`
  },
  commands: [
    { command: "single", description: "Screenshot a single URL" },
    { command: "file", description: "Screenshot URLs from a file" },
    { command: "nmap", description: "Parse Nmap XML and screenshot discovered hosts" },
    { command: "report serve", description: "Serve the report web UI" },
    { command: "report generate", description: "Generate a PDF report" },
    { command: "-H", description: "Custom HTTP headers" },
    { command: "-X", description: "HTTP method (GET/POST)" },
    { command: "-d", description: "Delay between screenshots" }
  ],
  whenToUse: [
    "Large-scale website screenshotting",
    "Visual recon of discovered subdomains",
    "Creating visual evidence for penetration test reports",
    "Comparing website appearances over time"
  ],
  notes: [
    "Uses Chrome Headless for accurate rendering",
    "Includes a built-in web server for viewing reports",
    "Supports custom headers for authenticated screenshots",
    "Can parse Nmap XML results directly"
  ],
  commonErrors: [
    { error: "Chrome not detected", solution: "Install Chrome/Chromium and ensure it's in your PATH" },
    { error: "Empty screenshots", solution: "Increase delay with -d or check if the site requires authentication" }
  ],
  tags: ["screenshot", "visual", "recon", "golang"]
}
