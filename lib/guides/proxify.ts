import { ToolGuide } from "@/lib/guide-types"

export const proxifyGuide: ToolGuide = {
  id: "proxify",
  name: "proxify",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Swiss Army knife proxy by ProjectDiscovery for traffic interception",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `go install github.com/projectdiscovery/proxify/cmd/proxify@latest

# Verify
proxify --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Intercept, log, and replay HTTP/HTTPS traffic",
    code: `# Start proxy with default settings
proxify

# Start with custom upstream proxy
proxify -p http://localhost:8888

# Log traffic to file
proxify -o traffic.log

# Run with request and response dump
proxify -dump`
  },
  commands: [
    { command: "-p", description: "Upstream proxy URL" },
    { command: "-o", description: "Output file for logged traffic" },
    { command: "-dump", description: "Dump all requests and responses" },
    { command: "-port", description: "Listen port (default 8443)" },
    { command: "-cert", description: "Path to custom CA certificate" }
  ],
  whenToUse: [
    "Intercepting traffic during web application testing",
    "Logging HTTP/HTTPS requests for analysis",
    "Chaining with other tools for traffic inspection"
  ],
  notes: [
    "Automatically generates CA certificates for HTTPS interception",
    "Lightweight alternative to mitmproxy",
    "Built by ProjectDiscovery — integrates well with their toolchain"
  ],
  commonErrors: [
    { error: "Certificate errors", solution: "Install the proxify CA certificate on the target device" },
    { error: "Port in use", solution: "Use -port to specify a different port" }
  ],
  tags: ["proxy", "intercept", "projectdiscovery", "golang"]
}
