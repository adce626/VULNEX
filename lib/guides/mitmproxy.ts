import { ToolGuide } from "@/lib/guide-types"

export const mitmproxyGuide: ToolGuide = {
  id: "mitmproxy",
  name: "mitmproxy",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Interactive HTTPS proxy for security testing and traffic inspection",
  installation: {
    title: "Installation",
    steps: ["Install via pip", "Verify installation"],
    code: `pip install mitmproxy

# Verify
mitmproxy --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Intercept, inspect, and modify HTTP/HTTPS traffic",
    code: `# Start the terminal-based proxy
mitmproxy

# Start the web-based proxy UI
mitmweb

# Start in transparent proxy mode
mitmproxy --mode transparent

# Run as reverse proxy
mitmproxy --mode reverse:https://example.com`
  },
  commands: [
    { command: "mitmproxy", description: "Terminal-based interactive proxy" },
    { command: "mitmweb", description: "Web-based proxy UI" },
    { command: "mitmdump", description: "Command-line non-interactive proxy" },
    { command: "--mode", description: "Proxy mode (regular, transparent, reverse)" },
    { command: "-p", description: "Listen port (default 8080)" }
  ],
  whenToUse: [
    "Intercepting and analyzing HTTP/HTTPS traffic",
    "Mobile application security testing",
    "API endpoint discovery",
    "Modifying requests/responses in transit"
  ],
  notes: [
    "Requires installing the mitmproxy CA certificate on the target device",
    "Supports Python scripting for automation",
    "Can decrypt HTTPS traffic with certificate pinning bypass"
  ],
  commonErrors: [
    { error: "SSL certificate errors", solution: "Install the mitmproxy CA certificate on the client device" },
    { error: "Connection refused", solution: "Check if the port is available and firewall is not blocking" }
  ],
  tags: ["proxy", "mitm", "intercept", "python"]
}
