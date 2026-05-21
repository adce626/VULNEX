import { ToolGuide } from "@/lib/guide-types"

export const photonGuide: ToolGuide = {
  id: "photon",
  name: "Photon",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Fast web crawler designed for OSINT and reconnaissance",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Verify installation"],
    code: `git clone https://github.com/s0md3v/Photon.git
cd Photon
pip install -r requirements.txt

# Verify
python3 photon.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Crawl a target domain to extract URLs, endpoints, and intelligence",
    code: `# Basic crawl
python3 photon.py -u https://example.com

# Crawl with depth limit
python3 photon.py -u https://example.com -l 3

# Extract specific information
python3 photon.py -u https://example.com --emails --socials

# Export results
python3 photon.py -u https://example.com -o output_dir`
  },
  commands: [
    { command: "-u", description: "Target URL to crawl" },
    { command: "-l", description: "Crawl depth level (default 2)" },
    { command: "--emails", description: "Extract email addresses" },
    { command: "--socials", description: "Extract social media links" },
    { command: "-o", description: "Output directory for results" },
    { command: "--timeout", description: "Request timeout in seconds" }
  ],
  whenToUse: [
    "Extracting URLs and endpoints from a target domain",
    "Gathering emails, social media, and JavaScript files",
    "OSINT reconnaissance and attack surface mapping"
  ],
  notes: [
    "Extremely fast compared to traditional crawlers",
    "Extracts URLs, emails, social media, files, and more",
    "Results saved in organized output structure"
  ],
  commonErrors: [
    { error: "Crawl too slow", solution: "Reduce the depth level with -l or increase timeout" },
    { error: "Blocked by WAF", solution: "Use --delay to add delays between requests" }
  ],
  tags: ["crawler", "osint", "recon", "python"]
}
