export interface CewlCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const cewlCategories: CewlCategory[] = [
  // =================== INSTALLATION ===================
  {
    category: "Installation",
    commands: [
      {
        command: "cewl",
        description: "Check if CeWL is installed (Kali Linux usually has it pre-installed)",
      },
      {
        command: "sudo apt update && sudo apt install cewl",
        description: "Install CeWL on Debian/Ubuntu/Kali",
      },
      {
        command: "git clone https://github.com/digininja/CeWL.git && cd CeWL && sudo ./install.sh",
        description: "Install from source (latest version)",
      },
    ],
  },

  // =================== BASIC USAGE ===================
  {
    category: "Basic Wordlist Generation",
    commands: [
      {
        command: "cewl https://example.com",
        description: "Basic wordlist generation from target website",
      },
      {
        command: "cewl https://example.com -w wordlist.txt",
        description: "-w = write output to file",
      },
      {
        command: "cewl https://example.com -d 2",
        description: "-d = set crawl depth (1=main page, 2+=follow internal links)",
      },
      {
        command: "cewl https://example.com -m 6",
        description: "-m = minimum word length (ignores words shorter than 6 chars)",
      },
    ],
  },

  // =================== ADVANCED OPTIONS ===================
  {
    category: "Advanced Options",
    commands: [
      {
        command: "cewl https://example.com -d 3 -m 5 -w final.txt",
        description: "Deep crawl (depth 3) with min word length 5",
      },
      {
        command: "cewl https://example.com --email",
        description: "--email = extract email addresses from the site",
      },
      {
        command: "cewl https://example.com --meta",
        description: "--meta = extract meta tags/keywords from pages",
      },
      {
        command: "cewl https://example.com --no-check-certificate",
        description: "Ignore SSL certificate errors",
      },
      {
        command: "cewl https://example.com --link-count 10",
        description: "Limit links per page to 10 (reduce noise)",
      },
    ],
  },

  // =================== CTF & BUG BOUNTY ===================
  {
    category: "CTF & Bug Bounty Workflow",
    commands: [
      {
        command: "cewl http://target.com -d 2 -m 5 -w cewl.txt",
        description: "Step 1: Generate targeted wordlist from target",
      },
      {
        command: "cat cewl.txt",
        description: "Step 2: Review extracted words",
      },
      {
        command: "cat cewl.txt rockyou.txt > final_wordlist.txt",
        description: "Step 3: Combine with generic wordlists (rockyou)",
      },
      {
        command: "hydra -l admin -P final_wordlist.txt http-post-form \"/login:username=^USER^&password=^PASS^:F=invalid\"",
        description: "Step 4: Use with Hydra for brute-force",
      },
    ],
  },

  // =================== EXAMPLE OUTPUT ===================
  {
    category: "Example Output",
    commands: [
      {
        command: "admin\ndashboard\npassword\nsecure\nuser\naccount\nlogin\nsettings\nprofile\nadmin-panel",
        description: "Sample words extracted from a corporate website",
      },
      {
        command: "cewl https://example.com -d 3 -m 5 -w words.txt && cat words.txt",
        description: "Generate and view the wordlist immediately",
      },
    ],
  },

  // =================== WHEN POWERFUL ===================
  {
    category: "When CeWL is Powerful",
    commands: [
      {
        command: "Corporate websites with structured content",
        description: "Extracts company-specific terms, product names, department names",
      },
      {
        command: "Web applications with repeated keywords",
        description: "Finds recurring terms used in the application",
      },
      {
        command: "Admin dashboards and panels",
        description: "Extracts navigation terms, menu items, common paths",
      },
      {
        command: "E-commerce sites",
        description: "Product names, categories, brand-specific terms",
      },
      {
        command: "Platforms with structured content",
        description: "CMS, forums, documentation sites with rich text",
      },
    ],
  },

  // =================== COMPARISON ===================
  {
    category: "Why CeWL Over Generic Lists",
    commands: [
      {
        command: "Generic: rockyou.txt = 14M+ passwords, most irrelevant",
        description: "Problem: Too many unrelated words for specific target",
      },
      {
        command: "CeWL: 50-500 targeted words from ACTUAL target site",
        description: "Advantage: High relevance, focused on actual content",
      },
      {
        command: "cewl + rockyou = best of both worlds",
        description: "Strategy: Combine targeted + generic for maximum coverage",
      },
    ],
  },
]

export const cewlTools = [
  {
    name: "CeWL GitHub Repository",
    url: "https://github.com/digininja/CeWL",
    description: "Official CeWL repository with full documentation and source code",
  },
  {
    name: "Kali Linux Tools",
    url: "https://www.kali.org/tools/cewl/",
    description: "CeWL comes pre-installed on Kali Linux",
  },
  {
    name: "Hydra - Brute Force",
    url: "https://github.com/vanhauser-thc/thc-hydra",
    description: "Use generated wordlists with Hydra for login brute-forcing",
  },
  {
    name: "RockYou Wordlist",
    url: "https://github.com/brannondorsey/rockyou.txt",
    description: "Classic generic wordlist to combine with CeWL output",
  },
]
