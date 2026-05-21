import { ToolGuide } from "@/lib/guide-types"

export const holeheGuide: ToolGuide = {
  id: "holehe",
  name: "holehe",
  icon: "search",
  category: "Recon & OSINT",
  description: "Check if an email is used on various online services",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install via setuptools", "Verify installation"],
    code: `git clone https://github.com/megadose/holehe.git
cd holehe
python3 setup.py install

# Verify
holehe --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Check email addresses for account presence on popular services",
    code: `# Check a single email
holehe email@example.com

# Check with only positive results
holehe email@example.com --only-used

# Output as JSON
holehe email@example.com --json

# Disable color output
holehe email@example.com --no-color`
  },
  commands: [
    { command: "--only-used", description: "Show only used accounts" },
    { command: "--json", description: "Output results in JSON format" },
    { command: "--no-color", description: "Disable colored output" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "OSINT investigations on email addresses",
    "Finding what services a target uses",
    "Account discovery for social engineering assessments"
  ],
  notes: [
    "Checks 120+ online services for account presence",
    "Does not alert the target (no login or password reset triggered)",
    "Results are based on public endpoints and error messages"
  ],
  commonErrors: [
    { error: "Rate limited", solution: "Add delays between queries or use proxies" },
    { error: "Service not available", solution: "The service may be blocking requests — try from a different IP" }
  ],
  tags: ["email", "osint", "recon", "python"]
}
