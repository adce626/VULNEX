export interface GoogleAPIKeysCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const googleAPIKeysCategories: GoogleAPIKeysCategory[] = [
  {
    category: "Introduction",
    commands: [
      {
        command: "Google API Keys = credentials for Maps, Analytics, YouTube, etc.",
        description: "What are Google API Keys?",
      },
      {
        command: "Format: AIzaSyDaGivXXXXXXXXXXXXXXX (39 chars)",
        description: "Common Google API key format",
      },
      {
        command: "Found in: Client-side JS, GitHub, browser cache, public datasets",
        description: "Where are API keys exposed?",
      },
    ],
  },
  {
    category: "Finding API Keys in JavaScript",
    commands: [
      {
        command: 'intext:"AIzaSy" site:target.com',
        description: "#1 Google dork for API keys on target domain",
      },
      {
        command: 'intext:"AIzaSy" "target.com" filetype:js',
        description: "#2 Search in JavaScript files specifically",
      },
      {
        command: 'cat alljs.txt | grep -oE "AIzaSy[a-zA-Z0-9_-]{35}" | sort -u',
        description: "#3 Extract API keys from downloaded JS files",
      },
    ],
  },
  {
    category: "GitHub Dorks for API Keys",
    commands: [
      {
        command: 'org:target "AIzaSy"',
        description: "#1 Search GitHub repos for API keys",
      },
      {
        command: 'org:target "google_api_key" OR "googleapikey" OR "google_api"',
        description: "#2 Search for common variable names",
      },
    ],
  },
  {
    category: "Recon Tools for API Key Discovery",
    commands: [
      {
        command: "https://github.com/streaak/profanalyzer",
        description: "#1 Profanalyzer - tool for analyzing JS files",
      },
      {
        command: "https://github.com/ice3man/GSIL2",
        description: "#2 GSIL2 - Google Services Identifier Library",
      },
      {
        command: "katana -u https://target.com/ -d 3 -jc | grep '\\.js$' | tee alljs.txt",
        description: "#3 Crawl and collect all JS file URLs",
      },
    ],
  },
  {
    category: "Testing Discovered API Keys",
    commands: [
      {
        command: 'curl "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway&key=AIzaSyYOURKEY"',
        description: "#1 Test Google Maps API key (Geocoding)",
      },
      {
        command: 'curl "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=dQw4w9WgXcQ&key=AIzaSyYOURKEY"',
        description: "#2 Test YouTube Data API key",
      },
    ],
  },
  {
    category: "Common Google API Endpoints",
    commands: [
      {
        command: "https://maps.googleapis.com/maps/api/ (Maps API)",
        description: "Google Maps - Geocoding, Places, Directions, etc.",
      },
      {
        command: "https://www.googleapis.com/youtube/v3/ (YouTube Data API)",
        description: "YouTube - Videos, playlists, comments",
      },
      {
        command: "https://analyticsdata.googleapis.com/v1beta/ (Analytics Data API)",
        description: "Google Analytics - User activity data",
      },
    ],
  },
  {
    category: "Nuclei Scanning for API Keys",
    commands: [
      {
        command: 'nuclei -u https://target.com -t google-api-keys -o nuclei-results.txt',
        description: "#1 Scan target with Nuclei Google API template",
      },
      {
        command: 'cat js-files.txt | nuclei -t google-api-keys -o api-keys-results.txt',
        description: "#2 Scan list of JS files for exposed keys",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/google-api-keys.yaml",
        description: "#3 Nuclei template for Google API detection (reference)",
      },
    ],
  },
  {
    category: "Exploitation Examples",
    commands: [
      {
        command: "Free quota usage = Make unlimited API calls",
        description: "Impact: Consume victim's API quota",
      },
      {
        command: "Data access = Read sensitive info if permissions allow",
        description: "Impact: Access private data via API",
      },
      {
        command: "Service abuse = Spam, fake listings, data pollution",
        description: "Impact: Abuse services for malicious purposes",
      },
    ],
  },
  {
    category: "Mitigation & Prevention",
    commands: [
      {
        command: "#1: Never embed API keys in client-side code",
        description: "Use server-side proxies for API calls",
      },
      {
        command: "#2: Use environment variables for API keys",
        description: "Store keys in .env files (not committed to Git)",
      },
      {
        command: "#3: Restrict API key domains in Google Cloud Console",
        description: "Set HTTP referrer restrictions per key",
      },
      {
        command: "#4: Rotate API keys regularly",
        description: "Periodically regenerate and revoke old keys",
      },
      {
        command: "#5: Monitor API usage in Google Cloud Console",
        description: "Set up alerts for unusual activity",
      },
    ],
  },
]

export const googleAPIKeysTools = [
  {
    name: "Profanalyzer",
    url: "https://github.com/streaak/profanalyzer",
    description: "Tool for analyzing JS files and finding API keys",
  },
  {
    name: "GSIL2 - Google Services Identifier",
    url: "https://github.com/ice3man/GSIL2",
    description: "Library for identifying Google services in code",
  },
  {
    name: "Nuclei Google API Keys Template",
    url: "https://github.com/coffinxp/nuclei-templates/blob/main/google-api-keys.yaml",
    description: "Ready-to-use Nuclei template for detection",
  },
  {
    name: "Google Cloud API Keys Docs",
    url: "https://cloud.google.com/docs/api-keys",
    description: "Official documentation on API key security",
  },
]
