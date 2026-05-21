import { ToolGuide } from "@/lib/guide-types"

export const webscreenshotGuide: ToolGuide = {
  id: "webscreenshot",
  name: "Webscreenshot",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Simple Python script to take screenshots of websites from a list",
  installation: {
    title: "Installation",
    steps: ["Install using pip", "Verify installation"],
    code: `# Using pip
pip install webscreenshot

# Verify
webscreenshot --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Take screenshots of websites listed in a file",
    code: `# Screenshot from URL list
webscreenshot -i urls.txt

# Output to specific directory
webscreenshot -i urls.txt -o ./screenshots

# Set concurrency
webscreenshot -i urls.txt -w 10

# Set window size
webscreenshot -i urls.txt -W 1920 -H 1080

# Use proxy
webscreenshot -i urls.txt -p http://127.0.0.1:8080`
  },
  commands: [
    { command: "-i", description: "Input file with URLs" },
    { command: "-o", description: "Output directory for screenshots" },
    { command: "-w", description: "Number of concurrent workers" },
    { command: "-W", description: "Window width in pixels" },
    { command: "-H", description: "Window height in pixels" },
    { command: "-p", description: "HTTP proxy URL" },
    { command: "-t", description: "Timeout in seconds" },
    { command: "-f", description: "Output format (png/jpg)" },
    { command: "--no-xserver", description: "Use Xvfb for headless mode" }
  ],
  whenToUse: [
    "Quick visual checks of multiple websites",
    "Lightweight alternative to Aquatone or Gowitness",
    "CI/CD pipelines for visual regression testing",
    "Small to medium scope recon tasks"
  ],
  notes: [
    "Simple and easy to install via pip",
    "Lightweight compared to Go-based alternatives",
    "Requires Selenium and a browser driver (Chrome/Firefox)"
  ],
  commonErrors: [
    { error: "Selenium driver not found", solution: "Install chromedriver or geckodriver and add to PATH" },
    { error: "X server error on Linux", solution: "Use --no-xserver flag or install Xvfb" }
  ],
  tags: ["screenshot", "visual", "recon", "python"]
}
