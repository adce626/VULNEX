import { ToolGuide } from "@/lib/guide-types"

export const intelxGuide: ToolGuide = {
  id: "intelx",
  name: "IntelX (Intelligence X)",
  icon: "search",
  category: "Recon & OSINT",
  description: "Darknet intelligence search engine and API client for OSINT investigations",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Configure API key"],
    code: `# Clone repository
git clone https://github.com/IntelligenceX/SDK.git
cd SDK

# Install dependencies
pip install -r requirements.txt

# Set API key
export INTELX_API_KEY="your-api-key"

# Python package
pip install intelligencex`
  },
  usage: {
    title: "Basic Usage",
    description: "Search Intelligence X data sources from the command line",
    code: `# Search by email
python intelx.py --email user@example.com

# Search by domain
python intelx.py --domain example.com

# Search by IP
python intelx.py --ip 192.168.0.1

# Search by URL
python intelx.py --url https://example.com

# Search by CIDR
python intelx.py --cidr 192.168.0.0/24`
  },
  commands: [
    { command: "--email", description: "Search by email address" },
    { command: "--domain", description: "Search by domain name" },
    { command: "--ip", description: "Search by IP address" },
    { command: "--url", description: "Search by URL" },
    { command: "--cidr", description: "Search by CIDR range" },
    { command: "--phone", description: "Search by phone number" },
    { command: "--breach", description: "Search data breaches" },
    { command: "--darknet", description: "Search darknet sources" },
    { command: "--output", description: "Output file path" },
    { command: "--limit", description: "Max results to return" }
  ],
  whenToUse: [
    "Deep OSINT investigations",
    "Finding leaked credentials and data breaches",
    "Darknet intelligence gathering",
    "Investigating compromised email addresses",
    "Correlating data across multiple sources"
  ],
  notes: [
    "Requires an API key from Intelligence X",
    "Covers darknet, pastebin, document sharing sites",
    "Can search historical data and deleted content",
    "Free tier available with limited requests",
    "Powerful for breach data correlation"
  ],
  commonErrors: [
    { error: "API key not found", solution: "Set INTELX_API_KEY environment variable or pass it as a parameter" },
    { error: "Rate limit exceeded", solution: "Wait before making additional requests or upgrade your plan" },
    { error: "No results returned", solution: "Try modifying search terms or use broader query parameters" }
  ],
  tags: ["osint", "intelligence", "darknet", "search", "breach"]
}
