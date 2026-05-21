import { ToolGuide } from "@/lib/guide-types"

export const qsreplaceGuide: ToolGuide = {
  id: "qsreplace",
  name: "Qsreplace",
  icon: "code",
  category: "Recon & OSINT",
  description: "Replace query string parameters",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/tomnomnom/qsreplace@latest

# Verify
qsreplace -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Replace or manipulate query string values in URLs",
    code: `# Replace all parameter values with a payload
cat urls.txt | qsreplace "payload"

# Accept all parameters (remove values)
cat urls.txt | qsreplace -a

# Replace with blank values
cat urls.txt | qsreplace ""

# Pipe to other tools for testing
cat urls.txt | qsreplace "><script>alert(1)</script>" | dalfox pipe`
  },
  commands: [
    { command: "-a", description: "Accept all parameters (remove values)" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Preparing URLs for XSS payload injection",
    "SQL injection parameter testing",
    "Replacing parameter values for fuzzing",
    "Normalizing URL structures for comparison",
    "Piping cleaned URLs into other tools"
  ],
  notes: [
    "Simple but powerful tool for URL manipulation",
    "Often used in pipelines with httpx, dalfox, and nuclei",
    "Preserves URL structure while swapping parameter values",
    "Designed for chaining with other TomNomNom tools"
  ],
  commonErrors: [
    { error: "No input URLs", solution: "Pipe URLs via stdin: cat urls.txt | qsreplace" },
    { error: "No parameters in URLs", solution: "Input URLs must contain query parameters to replace" }
  ],
  tags: ["url", "query", "replace", "golang"]
}
