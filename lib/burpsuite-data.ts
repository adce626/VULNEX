export interface BurpSuiteCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const burpsuiteCategories: BurpSuiteCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "Download from https://portswigger.net/burp/releases",
        description: "Download latest Burp Suite Community or Professional",
      },
      {
        command: "sudo apt install burpsuite",
        description: "Install on Kali Linux",
      },
      {
        command: "burpsuite",
        description: "Launch Burp Suite after installation",
      },
    ],
  },
  {
    category: "Proxy Setup",
    commands: [
      {
        command: "Proxy -> Options -> Add listener on 127.0.0.1:8080",
        description: "Step 1: Configure proxy listener on default port",
      },
      {
        command: "Set browser proxy to 127.0.0.1:8080",
        description: "Step 2: Configure your browser to use Burp proxy",
      },
      {
        command: "Proxy -> Intercept -> Intercept is on",
        description: "Step 3: Enable intercept to capture requests",
      },
      {
        command: "Import CA cert from http://burpsuite",
        description: "Install Burp CA certificate for HTTPS interception",
      },
    ],
  },
  {
    category: "Proxy Interception",
    commands: [
      {
        command: "Forward = Send request to server",
        description: "Forward intercepted request to target server",
      },
      {
        command: "Drop = Discard request",
        description: "Drop the intercepted request without sending",
      },
      {
        command: "Action -> Send to Repeater",
        description: "Send request to Repeater for manual testing",
      },
      {
        command: "Action -> Send to Intruder",
        description: "Send request to Intruder for automated attacks",
      },
      {
        command: "Raw/Params/Headers/Hex = Tab navigation",
        description: "Switch between different views of the request",
      },
    ],
  },
  {
    category: "Repeater",
    commands: [
      {
        command: "Ctrl+R = Send to Repeater",
        description: "Quick shortcut to send request to Repeater",
      },
      {
        command: "Modify request -> Send -> Analyze response",
        description: "Manual request modification workflow",
      },
      {
        command: "Right-click -> Change request method",
        description: "Switch between GET and POST methods",
      },
      {
        command: "Right-click -> Add/Remove parameter",
        description: "Manipulate request parameters",
      },
      {
        command: "Right-click -> Copy as curl command",
        description: "Export request as curl command",
      },
    ],
  },
  {
    category: "Intruder",
    commands: [
      {
        command: "Sniper = Single payload set, one position at a time",
        description: "Test single parameter with wordlist (most common)",
      },
      {
        command: "Battering ram = Single payload set, all positions same value",
        description: "Use same payload in all positions simultaneously",
      },
      {
        command: "Pitchfork = Multiple payload sets, paired by index",
        description: "Process multiple payload sets in parallel pairs",
      },
      {
        command: "Cluster bomb = Multiple payload sets, all combinations",
        description: "Test every combination of multiple payload sets",
      },
    ],
  },
  {
    category: "Scanner (Pro)",
    commands: [
      {
        command: "Right-click -> Do active scan",
        description: "Actively scan a request for vulnerabilities",
      },
      {
        command: "Right-click -> Do passive scan",
        description: "Passively analyze traffic without sending requests",
      },
      {
        command: "Dashboard -> Scan queue",
        description: "Monitor and manage active scans",
      },
      {
        command: "Issue activity = View findings",
        description: "Review all discovered security issues",
      },
    ],
  },
  {
    category: "Decoder & Comparer",
    commands: [
      {
        command: "Selected text -> Send to Decoder",
        description: "Quick shortcut for decoding/encoding data",
      },
      {
        command: "Decoder: URL, Base64, HTML, Hex, ASCII",
        description: "Supported encoding/decoding formats",
      },
      {
        command: "Select requests/responses -> Send to Comparer",
        description: "Compare two requests or responses side by side",
      },
      {
        command: "Comparer: Words/Lines/Reflected diff",
        description: "Comparison modes for analyzing differences",
      },
    ],
  },
  {
    category: "Scope & Target",
    commands: [
      {
        command: "Target -> Scope -> Add URL",
        description: "Define scope to filter traffic to specific targets",
      },
      {
        command: 'Proxy -> Intercept -> Enable scope restriction',
        description: "Only intercept requests within defined scope",
      },
      {
        command: "Target -> Site map",
        description: "View hierarchical map of all discovered content",
      },
      {
        command: "Engagement tools -> Find scripts",
        description: "Discover JavaScript files used by the application",
      },
    ],
  },
  {
        category: "Quick Reference",
    commands: [
      {
        command: "Ctrl+R = Send to Repeater",
        description: "Fast access to request manipulation",
      },
      {
        command: "Ctrl+I = Send to Intruder",
        description: "Fast access to automated attacks",
      },
      {
        command: "Ctrl+Shift+R = Repeat request",
        description: "Resend last request in Repeater",
      },
      {
        command: "Ctrl+F = Search in response",
        description: "Find text within response body",
      },
      {
        command: "Proxy = Traffic interception",
        description: "Intercept and modify HTTP/HTTPS traffic",
      },
      {
        command: "Repeater = Manual testing",
        description: "Modify and resend individual requests",
      },
      {
        command: "Intruder = Automated attacks",
        description: "Brute-force, fuzzing, and parameter testing",
      },
      {
        command: "Decoder = Encode/Decode",
        description: "URL, Base64, Hex, HTML encodings",
      },
    ],
  },
]

export const burpsuiteTools = [
  {
    name: "Burp Suite Downloads",
    url: "https://portswigger.net/burp/releases",
    description: "Download the latest version of Burp Suite",
  },
  {
    name: "PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
    description: "Free web security training aligned with Burp Suite",
  },
  {
    name: "Burp Extensions (BApp Store)",
    url: "https://portswigger.net/bappstore",
    description: "Browse community-built extensions for Burp Suite",
  },
  {
    name: "PortSwigger Research",
    url: "https://portswigger.net/research",
    description: "Latest web security research from PortSwigger",
  },
]
