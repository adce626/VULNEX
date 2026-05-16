export interface S3BucketCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "AWS S3 bucket enumeration, permission testing, and misconfiguration exploitation."

export const s3BucketCategories: S3BucketCategory[] = [
  // ==================== UNDERSTANDING ===================
  {
    category: "Understanding AWS S3 Buckets",
    commands: [
      {
        command: "S3 bucket reconnaissance = identifying publicly accessible or misconfigured AWS S3 buckets",
        description: "What is S3 Bucket Reconnaissance?",
      },
      {
        command: "Helps organizations secure their cloud storage by finding exposed data",
        description: "Purpose of S3 reconnaissance",
      },
      {
        command: "AWS CLI: aws s3 ls (requires configured credentials)",
        description: "Test access to a bucket with AWS CLI",
      },
      {
        command: "curl -I https://target.s3.amazonaws.com",
        description: "Check if bucket exists and is accessible (HTTP headers)",
      },
    ],
  },

  // ==================== MANUAL METHODS ===================
  {
    category: "Manual Methods for Identifying S3 Buckets",
    commands: [
      {
        command: "https://target.s3.amazonaws.com",
        description: "Test in browser URL bar - basic bucket URL format",
      },
      {
        command: "https://s3.amazonaws.com/target",
        description: "Alternative bucket URL format (older style)",
      },
      {
        command: "https://target.s3-external-1.amazonaws.com",
        description: "S3 external endpoint format",
      },
      {
        command: "https://target.s3.dualstack.us-east-1.amazonaws.com",
        description: "Dual-stack endpoint (IPv4 + IPv6)",
      },
    ],
  },

  // ==================== GOOGLE DORKS ===================
  {
    category: "Google Dorking for AWS S3 Buckets",
    commands: [
      {
        command: 'site:s3.amazonaws.com "target.com"',
        description: "#1 Find S3 buckets related to target domain",
      },
      {
        command: 'site:*.s3.amazonaws.com "target.com"',
        description: "#2 Wildcard search for all subdomain buckets",
      },
      {
        command: 'site:s3-external-1.amazonaws.com "target.com"',
        description: "#3 Search external S3 endpoints",
      },
      {
        command: 'site:s3.amazonaws.com intitle:"index of"',
        description: "#4 Find buckets with directory listing enabled",
      },
      {
        command: 'site:s3.amazonaws.com "target.com" "bucket" OR "aws_access_key" OR "secret"',
        description: "#5 Search for buckets containing sensitive keywords",
      },
      {
        command: 'site:amazonaws.com inurl:s3.amazonaws.com',
        description: "#6 Broad search across all Amazon AWS domains",
      },
    ],
  },

  // ==================== DORKEYE ===================
  {
    category: "Automating Google Dorking with DorkEye",
    commands: [
      {
        command: "https://github.com/BullsEye0/dorks-eye",
        description: "DorkEye automates Google dorking for faster recon",
      },
      {
        command: "python3 dorkeye.py -d target.com -o s3-results.txt",
        description: "Run DorkEye with target domain and output file",
      },
      {
        command: "cat s3-results.txt | grep -i s3.amazonaws.com",
        description: "Filter results for S3 bucket URLs",
      },
    ],
  },

  // ==================== S3MISCONFIG ===================
  {
    category: "Using S3Misconfig for Fast Bucket Enumeration",
    commands: [
      {
        command: "https://github.com/Atharv834/S3BucketMisconf",
        description: "S3Misconfig scans for buckets with listing enabled",
      },
      {
        command: "python3 s3misconfig.py -l bucket-list.txt -o results.html",
        description: "Scan list of bucket URLs and generate HTML report",
      },
      {
        command: "cat results.html | grep -i 'open bucket\|listing enabled'",
        description: "Extract open buckets from HTML report",
      },
    ],
  },

  // ==================== HTTPX + NUCLEI ===================
  {
    category: "Finding S3 Buckets with HTTPX and Nuclei",
    commands: [
      {
        command: "subfinder -d target.com -all -silent | httpx-toolkit -sc -title | grep -i 'amazon s3\|s3.amazonaws'",
        description: "#1 Use Subfinder + HTTPX to find S3 in page titles",
      },
      {
        command: "subfinder -d target.com -all -silent | nuclei -t s3-detect.yaml -o s3-nuclei.txt",
        description: "#2 Scan subdomains with Nuclei S3 detection template",
      },
      {
        command: "cat s3-nuclei.txt | grep -i 's3\|bucket'",
        description: "#3 Filter Nuclei results for S3 findings",
      },
    ],
  },

  // ==================== JAVA2S3 ===================
  {
    category: "Extracting S3 URLs from JavaScript Files with java2s3",
    commands: [
      {
        command: "https://github.com/projectdiscovery/katana",
        description: "Katana: Tool to crawl and extract URLs from JS files",
      },
      {
        command: "katana -u https://target.com/ -d 5 -jc | grep '\\.js$' | tee alljs.txt",
        description: "#1 Crawl target and extract JS file URLs",
      },
      {
        command: "cat alljs.txt | xargs -I {} curl -s {} | grep -oE 'https?://[^\\\"]*\\.s3\\.amazonaws\\.com[^\\\"]*' | sort -u",
        description: "#2 Extract S3 URLs from all JS files",
      },
      {
        command: "https://github.com/mexploit30/java2s3",
        description: "java2s3: Alternative tool for extracting S3 URLs from JS",
      },
    ],
  },

  // ==================== LAZYS3 ===================
  {
    category: "Brute-Forcing S3 Bucket Names with LazyS3",
    commands: [
      {
        command: "https://github.com/nahamsec/lazys3",
        description: "LazyS3: Brute force tool for AWS S3 bucket names",
      },
      {
        command: "ruby lazys3.rb target.com",
        description: "Basic LazyS3 run with target domain",
      },
      {
        command: "ruby lazys3.rb target.com -w custom-wordlist.txt",
        description: "Use custom wordlist with LazyS3",
      },
    ],
  },

  // ==================== CEWL + S3SCANNER ===================
  {
    category: "Using CeWL + S3Scanner to find open buckets",
    commands: [
      {
        command: "cewl https://target.com/ -d 3 -m 5 -w cewl-words.txt",
        description: "#1 Generate custom wordlist from target website",
      },
      {
        command: "cat cewl-words.txt rockyou.txt > final-wordlist.txt",
        description: "#2 Combine CeWL output with generic wordlist",
      },
      {
        command: "https://github.com/sa7mon/S3Scanner",
        description: "S3Scanner: Identify valid/invalid S3 buckets with permission checks",
      },
      {
        command: "s3scanner -bucket-file final-wordlist.txt -enumerate -threads 10",
        description: "Scan wordlist and enumerate bucket permissions",
      },
    ],
  },

  // ==================== GITHUB DORKS ===================
  {
    category: "Extracting S3 Buckets from GitHub Repositories",
    commands: [
      {
        command: 'org:target "amazonaws"',
        description: "#1 Search GitHub repos for amazonaws references",
      },
      {
        command: 'org:target "aws_access_key"',
        description: "#2 Find exposed AWS access keys in repos",
      },
      {
        command: 'org:target "aws_secret_key" OR "aws_secret" OR "aws_key"',
        description: "#3 Search for various AWS secret key formats",
      },
      {
        command: 'org:target "S3_BUCKET"',
        description: "#4 Find S3 bucket references in code",
      },
    ],
  },

  // ==================== WEBSITES ===================
  {
    category: "Websites for Public S3 Bucket Discovery",
    commands: [
      {
        command: "https://buckets.grayhatwarfare.com/",
        description: "#1 GrayHatWarfare: Search public S3 buckets by keyword",
      },
      {
        command: "https://osint.sh/buckets/",
        description: "#2 OSINT.sh: Another public S3 bucket search engine",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/http/technologies/s3-detect.yaml",
        description: "#3 Nuclei template for S3 detection (reference)",
      },
    ],
  },

  // ==================== HIDDEN S3 URLS ===================
  {
    category: "Finding Hidden S3 URLs with Extensions",
    commands: [
      {
        command: "https://chromewebstore.google.com/detail/s3bucketlist/anngjobjhcbancaaogmlcffohpmcniki",
        description: "S3BucketList Chrome extension for finding S3 URLs",
      },
      {
        command: "cat js-files.txt | grep -oE 'https?://[^\\\"]*\\.s3\\.amazonaws\\.com/[^\\\"]*\\.(zip|tar|gz|sql|env|log|key|pem|bak)' | sort -u",
        description: "Find S3 URLs with sensitive file extensions",
      },
    ],
  },

  // ==================== AWS CLI MANAGEMENT ===================
  {
    category: "AWS S3 Bucket Listing & File Management",
    commands: [
      {
        command: "aws s3 ls s3://bucket-name --no-sign-request",
        description: "#1 List files in bucket (no credentials needed if public)",
      },
      {
        command: "aws s3 ls s3://bucket-name --recursive --human-readable --no-sign-request",
        description: "#2 Recursively list all files in human-readable format",
      },
      {
        command: "aws s3 ls s3://bucket-name --no-sign-request | grep -E '\\.(env|pem|key|json|yml|yaml|config|php|ini|sql|db|log|backup|bak|zip|rar|7z|tar|gz)'",
        description: "#3 Filter for potentially sensitive files",
      },
      {
        command: "aws s3 cp s3://bucket-name/file.txt ./ --no-sign-request",
        description: "#4 Download a specific file from bucket",
      },
      {
        command: "aws s3 cp s3://bucket-name/ ./ --recursive --no-sign-request",
        description: "#5 Download entire bucket recursively",
      },
      {
        command: "aws s3 rm s3://bucket-name/file.txt --no-sign-request",
        description: "#6 Delete file (if WRITE permission exists - for authorized testing!)",
      },
    ],
  },

  // ==================== EXPLOITATION ===================
  {
    category: "Exploiting Misconfigured Buckets",
    commands: [
      {
        command: "Public READ = Anyone can list and download files",
        description: "Risk: Data exfiltration, sensitive info disclosure",
      },
      {
        command: "Public WRITE = Anyone can upload files to bucket",
        description: "Risk: Malware hosting, defacement, data poisoning",
      },
      {
        command: "Public FULL_CONTROL = Read + Write + Delete permissions",
        description: "Risk: Complete bucket takeover, data destruction possible",
      },
      {
        command: "aws s3 cp malicious-file.php s3://bucket-name/ --no-sign-request",
        description: "EXAMPLE: Upload malicious file if WRITE permission exists",
      },
    ],
  },

  // ==================== MITIGATION ===================
  {
    category: "Securing S3 Buckets",
    commands: [
      {
        command: "Enable bucket policies and restrict access",
        description: "Use IAM policies to strictly control who can access the bucket",
      },
      {
        command: "Disable public ACLs unless necessary",
        description: "Avoid using public-read or public-read-write ACLs",
      },
      {
        command: "Monitor logs using AWS CloudTrail",
        description: "Enable logging to detect unauthorized access attempts",
      },
      {
        command: "Implement encryption for sensitive data",
        description: "Use S3 server-side encryption or client-side encryption",
      },
      {
        command: "Use S3 Block Public Access at account level",
        description: "Enable S3 Block Public Access to prevent accidental exposure",
      },
    ],
  },
]

export const s3BucketTools = [
  {
    name: "S3Misconfig Tool",
    url: "https://github.com/Atharv834/S3BucketMisconf",
    description: "Scans for S3 buckets with listing enabled",
  },
  {
    name: "DorkEye - Google Dorking",
    url: "https://github.com/BullsEye0/dorks-eye",
    description: "Automates Google dorking for S3 discovery",
  },
  {
    name: "LazyS3 - Brute Forcer",
    url: "https://github.com/nahamsec/lazys3",
    description: "Brute force S3 bucket names with permutations",
  },
  {
    name: "java2s3 - JS Extractor",
    url: "https://github.com/mexploit30/java2s3",
    description: "Extract S3 URLs from JavaScript files",
  },
  {
    name: "S3Scanner",
    url: "https://github.com/sa7mon/S3Scanner",
    description: "Find open buckets and check permissions",
  },
  {
    name: "Katana - Crawler",
    url: "https://github.com/projectdiscovery/katana",
    description: "Crawl and extract URLs from JS files",
  },
  {
    name: "GrayHatWarfare",
    url: "https://buckets.grayhatwarfare.com/",
    description: "Public S3 bucket search engine",
  },
  {
    name: "Nuclei S3 Detect Template",
    url: "https://github.com/coffinxp/nuclei-templates/blob/main/http/technologies/s3-detect.yaml",
    description: "Nuclei template for S3 bucket detection",
  },
  {
    name: "AWS CLI Documentation",
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3.html",
    description: "Official AWS CLI S3 command reference",
  },
]
