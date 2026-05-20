import { ToolGuide } from "@/lib/guide-types"

export const niktoGuide: ToolGuide = {
  id: "nikto",
  name: "Nikto",
  icon: "shield",
  category: "Web Vulnerabilities",
  description: "Classic web server scanner that checks for outdated versions, dangerous files, misconfigurations, and common vulnerabilities",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager",
      "Verify Perl dependency",
      "Update the database"
    ],
    code: `# macOS
brew install nikto

# Debian/Ubuntu
apt install nikto

# RHEL/CentOS
yum install nikto

# Update database
nikto -update`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan a target web server for vulnerabilities, outdated software, and misconfigurations",
    code: `# Basic scan
nikto -h http://target.com

# Scan on specific port
nikto -h target.com -p 8443

# Scan with SSL
nikto -h https://target.com -ssl

# Output results to file
nikto -h target.com -o report.html -Format htm

# Custom tuning
nikto -h target.com -Tuning 123`
  },
  commands: [
    { command: "-h", description: "Target host (IP or hostname with protocol)" },
    { command: "-p", description: "Target port(s) to scan" },
    { command: "-ssl", description: "Force SSL/TLS mode" },
    { command: "-Format", description: "Output format (htm, csv, json, txt, xml)" },
    { command: "-o", description: "Write output to specified file" },
    { command: "-Tuning", description: "Tuning control (bitmask to enable specific checks)" },
    { command: "-evasion", description: "Evasion technique (use IDs from table)" },
    { command: "-DispVuln", description: "Display only vulnerability details" },
    { command: "-mutate", description: "Mutate input for deeper checking" },
    { command: "-Plugins", description: "Plugins to run (comma-separated list)" },
    { command: "-Cgidirs", description: "Scan CGI directories" },
    { command: "-id", description: "Host authentication (user:pass)" }
  ],
  whenToUse: [
    "Initial web server reconnaissance and version detection",
    "Identifying outdated software with known vulnerabilities",
    "Discovering dangerous files and misconfigurations",
    "Compliance auditing of web server security posture",
    "Quick baseline scan before deeper manual testing"
  ],
  notes: [
    "Nikto is not stealthy — it generates significant traffic and is easily detected",
    "Always have permission before scanning targets you do not own",
    "Use -Tuning to disable noisy checks like XSS or file uploads when targeting production systems",
    "Results should be verified manually as Nikto can produce false positives"
  ],
  commonErrors: [
    { error: "Can't locate Net/SSLeay.pm", solution: "Install Perl SSL module: cpan -i Net::SSLeay or apt install libnet-ssleay-perl" },
    { error: "No such host or invalid hostname", solution: "Include http:// or https:// prefix with -h, or verify DNS resolution" },
    { error: "Timeout when connecting", solution: "Increase timeout with -timeout or check firewall/network connectivity" }
  ],
  tags: ["scanner", "vulnerability", "web", "perl"]
}
