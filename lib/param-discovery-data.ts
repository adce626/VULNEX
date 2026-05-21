export interface ParamDiscoveryCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const paramDiscoveryCategories: ParamDiscoveryCategory[] = [
  // =================== ARJUN ==================
  {
    category: "Arjun - Best Tool for Discovering Hidden Parameters",
    commands: [
      {
        command: "pip install arjun",
        description: "#1 Install Arjun via pip",
      },
      {
        command: "arjun -u \"https://site.com/endpoint.php\"",
        description: "#2 Basic scan for GET parameters",
      },
      {
        command: "arjun -u \"https://site.com/api/user\" -t 100 -o output.txt",
        description: "#3 With custom thread count and output file",
      },
      {
        command: "arjun -u \"https://site.com/login\" -m POST",
        description: "#4 POST method parameter discovery",
      },
      {
        command: "arjun -u \"https://site.com/api\" --include '{\"test\":\"value\"}' -m JSON",
        description: "#5 JSON endpoint parameter discovery",
      },
    ],
  },

  // =================== PARAMSPIDER ==================
  {
    category: "ParamSpider - Passive Parameter Extraction from Archives",
    commands: [
      {
        command: "git clone https://github.com/devanshbatham/ParamSpider.git",
        description: "#1 Clone ParamSpider repository",
      },
      {
        command: "cd ParamSpider && pip install -r requirements.txt",
        description: "#2 Install dependencies",
      },
      {
        command: "paramspider -d site.com",
        description: "#3 Basic crawl for URLs with parameters",
      },
      {
        command: "paramspider -d site.com -p \"FUZZ=value\"",
        description: "#4 Save output with FUZZ placeholder",
      },
      {
        command: "paramspider -d site.com | grep xss > xss.txt",
        description: "#5 Filter results by vulnerability type",
      },
    ],
  },

  // =================== FFUF PARAMETERS ==================
  {
    category: "ffuf - Parameter Fuzzing",
    commands: [
      {
        command: "ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -u \"https://site.com/endpoint?FUZZ=test\"",
        description: "#1 Fuzz GET parameter names",
      },
      {
        command: "ffuf -w paramnames.txt -u \"https://site.com/api?FUZZ=value\" -mc 200 -c",
        description: "#2 Fuzz with colored output, filter 200",
      },
      {
        command: "ffuf -w values.txt -u \"https://site.com/endpoint?param=FUZZ\" -X POST -d \"param=FUZZ\"",
        description: "#3 Fuzz POST parameter values",
      },
      {
        command: "ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -u \"https://site.com/endpoint\" -H \"Content-Type: application/x-www-form-urlencoded\" -X POST -d \"FUZZ=value\"",
        description: "#4 POST with custom header and body parameter",
      },
    ],
  },

  // =================== X8 - FAST ALTERNATIVE ==================
  {
    category: "x8 - Very Fast Alternative to ffuf",
    commands: [
      {
        command: "cargo install x8",
        description: "#1 Install x8 via Cargo (Rust)",
      },
      {
        command: "x8 -u \"https://site.com/endpoint?FUZZ=test\" -w paramnames.txt",
        description: "#2 Basic parameter fuzzing with x8",
      },
      {
        command: "x8 -u \"https://site.com/api?param=FUZZ\" -w values.txt --filter-status 200,403",
        description: "#3 Filter specific status codes",
      },
      {
        command: "x8 -u \"https://site.com/endpoint\" -w params.txt -t 200 --threads 50",
        description: "#4 High-speed fuzzing with 50 threads",
      },
    ],
  },

  // =================== GF - FILTER URLS BY TYPE ==================
  {
    category: "gf - Filter URLs by Vulnerability Type",
    commands: [
      {
        command: "go install github.com/tomnomnom/gf@latest",
        description: "#1 Install gf via Go",
      },
      {
        command: "cat all_urls.txt | gf xss > xss.txt",
        description: "#2 Filter URLs that may be vulnerable to XSS",
      },
      {
        command: "cat all_urls.txt | gf ssrf > ssrf.txt",
        description: "#3 Filter SSRF-vulnerable URLs",
      },
      {
        command: "cat all_urls.txt | gf redirect > redirect.txt",
        description: "#4 Filter Open Redirect candidates",
      },
      {
        command: "cat all_urls.txt | gf sql > sql.txt",
        description: "#5 Filter SQL injection candidates",
      },
    ],
  },

  // =================== COMBINED WORKFLOW ==================
  {
    category: "Recommended Full Workflow",
    commands: [
      {
        command: "# Step 1: Run ParamSpider to collect URLs with parameters",
        description: "paramspider -d target.com -o all_params.txt",
      },
      {
        command: "# Step 2: Extract parameter names and values",
        description: "cat all_params.txt | grep -oE '[?&][^=]+=' | sort -u > param_names.txt",
      },
      {
        command: "# Step 3: Run Arjun for hidden parameters",
        description: "arjun -u \"https://target.com/endpoint\" -t 100",
      },
      {
        command: "# Step 4: Fuzz with ffuf for more parameters",
        description: "ffuf -w param_names.txt -u \"https://target.com/endpoint?FUZZ=test\"",
      },
      {
        command: "# Step 5: Filter results with gf by vulnerability",
        description: "cat results.txt | gf xss,ssrf,redirect,sql",
      },
    ],
  },

  // =================== TOOLS & RESOURCES ==================
  {
    category: "Tools & References",
    commands: [
      {
        command: "https://github.com/s0md3v/Arjun",
        description: "Official Arjun repository - Best parameter discovery tool",
      },
      {
        command: "https://github.com/devanshbatham/ParamSpider",
        description: "ParamSpider - Passive parameter extraction from Wayback Machine",
      },
      {
        command: "https://github.com/Sh1Yo/x8",
        description: "x8 - Extremely fast parameter fuzzer (Rust)",
      },
      {
        command: "https://github.com/tomnomnom/gf",
        description: "gf - Filter URLs by vulnerability type (XSS, SSRF, etc.)",
      },
      {
        command: "https://github.com/coffinxp/payloads",
        description: "CoffinXP Payloads - Collection of ready-to-use payloads",
      },
    ],
  },
]

export const paramDiscoveryTools = [
  {
    name: "Arjun - Parameter Discovery",
    url: "https://github.com/s0md3v/Arjun",
    description: "Best tool for discovering hidden parameters with brute-force",
  },
  {
    name: "ParamSpider",
    url: "https://github.com/devanshbatham/ParamSpider",
    description: "Passive parameter extraction from Wayback Machine and Common Crawl",
  },
  {
    name: "x8 - Fast Fuzzer",
    url: "https://github.com/Sh1Yo/x8",
    description: "Very fast alternative to ffuf for parameter fuzzing",
  },
  {
    name: "gf - URL Filter",
    url: "https://github.com/tomnomnom/gf",
    description: "Filter URLs by vulnerability type (XSS, SSRF, Redirect, SQL)",
  },
  {
    name: "Seclists - Parameter Names",
    url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content",
    description: "Wordlists for parameter name discovery",
  },
]
