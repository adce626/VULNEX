import { ToolGuide } from "@/lib/guide-types"

export const getjsGuide: ToolGuide = {
  id: "getjs",
  name: "GetJS",
  icon: "code",
  category: "Recon & OSINT",
  description: "Extract JavaScript files from a target",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/bluesentinelsec/getJS@latest

# Verify
getJS -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Extract JavaScript file URLs from a target website",
    code: `# Extract JS from a single URL
getJS --url https://example.com

# Extract from multiple URLs
cat urls.txt | getJS

# Extract and output to file
getJS --url https://example.com --output results.txt

# Complete extraction (including inline JS)
getJS --url https://example.com --complete`
  },
  commands: [
    { command: "--url", description: "Target URL" },
    { command: "--output", description: "Output file path" },
    { command: "--complete", description: "Extract inline JS as well" },
    { command: "--resolve", description: "Resolve relative URLs" },
    { command: "--insecure", description: "Skip TLS verification" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Collecting JS files for analysis",
    "Bug bounty recon automation",
    "Finding JavaScript endpoints for secret scanning",
    "Preparing JS files for tools like SecretFinder",
    "Mapping external JS dependencies"
  ],
  notes: [
    "Outputs only the JS file URLs, not their content",
    "Use --complete to also extract inline JavaScript",
    "Works well piped from other recon tools",
    "Combine with SecretFinder or LinkFinder for deep analysis",
    "Lightweight and fast"
  ],
  commonErrors: [
    { error: "No JS files found", solution: "The target may not load external JS; try --complete flag" },
    { error: "No input URL", solution: "Use --url flag or pipe URLs via stdin" },
    { error: "TLS errors", solution: "Use --insecure flag to skip certificate verification" }
  ],
  tags: ["js", "extract", "recon", "golang"]
}
