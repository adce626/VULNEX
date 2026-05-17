import { ToolGuide } from "@/lib/guide-types"

export const burpsuiteGuide: ToolGuide = {
  id: "burpsuite",
  name: "Burp Suite",
  icon: "shield",
  category: "Tools & Methods",
  description: "Industry-standard web security testing platform",
  installation: {
    title: "Installation",
    steps: [
      "Download from PortSwigger website",
      "Install Java if needed",
      "Run installer"
    ],
    code: `# Download from
https://portswigger.net/burp/releases

# Kali Linux
apt install burpsuite

# Run
burpsuite

# Configure browser proxy: 127.0.0.1:8080`
  },
  usage: {
    title: "Basic Usage",
    description: "Intercept, modify, and analyze HTTP traffic",
    code: `# Key steps:
1. Set browser proxy to 127.0.0.1:8080
2. Import Burp CA certificate
3. Enable intercept in Proxy tab
4. Browse target application
5. Send interesting requests to Repeater/Intruder

# Useful shortcuts:
Ctrl+R - Send to Repeater
Ctrl+I - Send to Intruder
Ctrl+Shift+R - Repeat request`
  },
  commands: [
    { command: "Proxy", description: "Intercept HTTP traffic" },
    { command: "Repeater", description: "Manually modify requests" },
    { command: "Intruder", description: "Automated attacks" },
    { command: "Scanner", description: "Vulnerability scanning (Pro)" },
    { command: "Decoder", description: "Encode/decode data" },
    { command: "Comparer", description: "Compare responses" },
    { command: "Logger", description: "View all traffic" }
  ],
  whenToUse: [
    "Manual web application testing",
    "Request manipulation",
    "Authentication testing",
    "Parameter fuzzing",
    "Business logic testing"
  ],
  notes: [
    "Free Community edition has limited features",
    "Pro version includes scanner and advanced tools",
    "Install CA cert to intercept HTTPS",
    "Use scope to filter traffic"
  ],
  commonErrors: [
    {
      error: "HTTPS not working",
      solution: "Install Burp CA certificate in browser"
    },
    {
      error: "Intercept not catching requests",
      solution: "Check proxy settings and scope configuration"
    },
    {
      error: "Java errors",
      solution: "Update Java to latest version"
    }
  ],
  tags: ["proxy", "manual-testing", "web", "essential"]
}
