import { ToolGuide } from "@/lib/guide-types"

export const sublist3rGuide: ToolGuide = {
  id: "sublist3r",
  name: "Sublist3r",
  icon: "search",
  category: "Recon & OSINT",
  description: "Fast subdomain enumeration using search engines",
  installation: {
    title: "Installation",
    steps: [
      "Clone the repository",
      "Navigate into the directory",
      "Install Python dependencies",
      "Verify installation"
    ],
    code: `git clone https://github.com/aboul3la/Sublist3r.git
cd Sublist3r
pip install -r requirements.txt

# Verify
python sublist3r.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Sublist3r uses search engines (Google, Bing, Yahoo, Baidu, etc.) and other sources to find subdomains",
    code: `# Basic scan
python sublist3r.py -d example.com

# Save results
python sublist3r.py -d example.com -o results.txt

# Enable brute force
python sublist3r.py -d example.com -b

# Quiet mode
python sublist3r.py -d example.com -v`
  },
  commands: [
    { command: "-d", description: "Target domain" },
    { command: "-b", description: "Enable brute force mode" },
    { command: "-p", description: "Ports to scan on found subdomains" },
    { command: "-v", description: "Verbose mode" },
    { command: "-o", description: "Output file path" },
    { command: "-t", description: "Number of threads" }
  ],
  whenToUse: [
    "Quick passive subdomain enumeration",
    "When search engine scraping is preferred",
    "Lightweight alternative to amass",
    "Initial recon before deeper scanning"
  ],
  notes: [
    "Uses Google, Bing, Yahoo, Baidu, Ask, Netcraft, DNSDumpster, Virustotal",
    "Brute force mode uses a built-in wordlist",
    "Python 3 required",
    "Search engines may rate-limit aggressive requests"
  ],
  commonErrors: [
    {
      error: "ModuleNotFoundError for requests/dnspython",
      solution: "Run pip install -r requirements.txt in the Sublist3r directory"
    },
    {
      error: "Captcha or rate limit from search engines",
      solution: "Reduce thread count with -t, or add delays between runs"
    }
  ],
  tags: ["subdomain", "recon", "osint", "python"]
}
