import type { ReconChapter } from "./recon-flow-data"

export const platformChapters: ReconChapter[] = [
  {
    id: "hackerone",
    number: 1,
    title: "HackerOne",
    subtitle: "The world's largest bug bounty platform — public, private, and VDP programs",
    color: "oklch(0.55 0.22 25)",
    overview:
      "HackerOne is the most popular bug bounty platform with thousands of programs. It pioneered the hacker-powered security model. The platform features a reputation system based on signal (quality) and impact (severity), which determines your visibility to program managers. HackerOne offers both public programs (anyone can submit) and private invitations. Building a strong reputation is essential for earning invites to high-paying private programs.",
    sections: [
      {
        title: "Account Setup & Profile Optimization",
        text: "Your HackerOne profile is your resume. Program managers review profiles before sending private invitations. A complete profile with a strong hacker reputation, clear methodology write-ups, and resolved reports signals professionalism. Include your skills, tools you're proficient with, and links to your write-ups or research.",
        commands: [
          {
            cmd: "## HackerOne Profile Checklist\n\n- [ ] Username: professional, not offensive\n- [ ] Bio: 1-2 lines describing your focus area (web, mobile, API, infra)\n- [ ] Skills: add relevant tags (XSS, SQLi, SSRF, IDOR, RCE)\n- [ ] Website/GitHub: link to your write-ups or research\n- [ ] Signal > 0: maintain positive signal by submitting quality reports\n- [ ] Impact > 0: focus on confirmed vulnerabilities with clear impact\n- [ ] Profile picture: professional or avatar (not blank)",
            desc: "Profile checklist — complete these before submitting to any program",
          },
          {
            cmd: "## Signal & Impact Explained\n\n**Signal** = Reputation score based on report quality\n  - Accepted report: +10 to +50 signal\n  - Duplicate: 0 signal change\n  - N/A (informative): -5 signal\n  - N/A (not a vulnerability): -10 signal\n  - Spam: -50 signal\n\n**Impact** = Severity score based on confirmed findings\n  - None: 0\n  - Low: 0.5-3.9\n  - Medium: 4.0-6.9\n  - High: 7.0-8.9\n  - Critical: 9.0-10.0\n\n**Formula**: Signal trends up with quality reports. Impact reflects the total severity of your confirmed findings.",
            desc: "HackerOne's reputation system — understand how signal and impact are calculated",
          },
          {
            cmd: "## Private Program Invitations\n\nPrivate programs invite hackers based on:\n1. Signal (reputation quality) — higher is better\n2. Impact (severity of confirmed findings)\n3. Recent activity — active hackers get prioritized\n4. Program-specific criteria — some programs want mobile experts\n5. Location — some programs restrict by region\n\n**Tips to get invited:**\n- Maintain signal > 10 with at least 3-5 accepted reports\n- Focus on one program at a time instead of spraying\n- Write clear reports with reproduction steps\n- Respond to triage questions promptly\n- Follow disclosure guidelines exactly",
            desc: "How private program invitations work and how to get on the invite list",
          },
        ],
        tips: [
          "Never submit automated scanner output as a report — it hurts your signal badly",
          "If a report is marked N/A, politely ask what evidence would make it valid — don't argue",
          "Build signal on public programs before expecting private invites",
          "Set up two-factor authentication on your HackerOne account immediately",
        ],
      },
      {
        title: "Program Types & Selection Strategy",
        text: "HackerOne has three program types: Public (anyone can submit), Private (invite-only), and VDP (Vulnerability Disclosure Program — no monetary rewards). Beginners should target VDPs and low-competition public programs to build signal. Experienced hunters focus on private invitations to high-bounty programs.",
        commands: [
          {
            cmd: "## Program Selection Strategy\n\n**Beginner (0-5 accepted reports):**\n- Target VDPs and public programs with wide scopes\n- Focus on low-hanging fruit: XSS, IDOR, Open Redirect\n- Build signal by submitting quality reports, even for low severity\n\n**Intermediate (5-20 accepted reports):**\n- Target public programs in your niche (API, mobile, infrastructure)\n- Apply for private programs through program invitations\n- Start chaining low-severity bugs into medium/high impact\n\n**Advanced (20+ accepted reports):**\n- Focus on private programs with bounties > $1000\n- Look for logic flaws, race conditions, and complex chains\n- Build relationships with specific program managers\n\n**Tips:**\n- Sort by \"Earliest 1st Report\" for fresh programs with less competition\n- Filter by bounty range to match your effort level\n- Read program scope carefully — out-of-scope = wasted time",
            desc: "Program selection strategy based on your experience level",
          },
          {
            cmd: "curl -s 'https://hackerone.com/programs/search?query=&sort=launched_at:ascending&limit=50' -H 'Accept: application/json' | jq '.results[] | {name: .name, url: .url, bounties: .bounties_enabled}' | head -30",
            desc: "Find newly launched programs sorted by oldest first — less competition early on",
          },
          {
            cmd: "## HackerOne Bounty Payout Ranges\n\n| Severity   | Typical Range    | Top Programs    |\n|------------|-----------------|-----------------|\n| Critical   | $3,000 - $10,000 | $50,000+        |\n| High       | $1,000 - $4,000  | $10,000+        |\n| Medium     | $250 - $1,000    | $2,500+         |\n| Low        | $100 - $250      | $500+           |\n| None       | $0 (informative) | N/A             |\n\n**Note:** These are approximate. Payouts vary by program. Some programs pay flat rates per severity, others use sliding scales based on CVSS score and business impact.",
            desc: "Typical HackerOne bounty ranges by severity — use this to estimate potential earnings",
          },
        ],
        tips: [
          "Filter programs by 'Bounties: Yes' if you want paid programs only",
          "Check the program's response time — programs that respond within 48h are ideal",
          "Look at recent disclosures on HackerOne's Hacktivity page to spot trends",
          "Programs with fewer than 50 total reports often have more remaining bugs",
        ],
      },
      {
        title: "Submission Best Practices",
        text: "HackerOne's triage team reviews every report. Clear, well-structured reports get triaged faster and are less likely to be marked as N/A. Follow the platform's expected format: vulnerability type, impact, steps to reproduce, proof of concept, and remediation suggestion. Include screenshots and HTTP request/response pairs.",
        commands: [
          {
            cmd: "## HackerOne Report Template\n\n**Summary:**\n[Vulnerability Type] in [Endpoint/Parameter] — [Brief Impact]\n\n**Severity:** [Critical/High/Medium/Low]\n\n**Affected URL:**\nhttps://target.com/[endpoint]\n\n**Description:**\n[2-3 sentences explaining what the vulnerability is and why it matters]\n\n**Steps to Reproduce:**\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\n**Proof of Concept:**\n```http\n[Raw request/response]\n```\n\n**Impact:**\n[What an attacker can achieve]\n\n**Remediation:**\n[Suggested fix]\n\n**Attachment:**\n[Screenshot or video demonstrating the issue]",
            desc: "HackerOne report template — write reports in this format for faster triage",
          },
          {
            cmd: "## Common Reasons Reports Get Marked N/A\n\n1. **Scanner output only** — no manual verification or impact explanation\n2. **Missing reproduction steps** — triage can't reproduce the issue\n3. **Out of scope** — the endpoint or vulnerability type isn't covered\n4. **Self-XSS** — requires the victim to paste attacker-controlled input\n5. **Missing browser/PoC** — no screenshot, video, or request/response pair\n6. **Informational only** — no security impact demonstrated\n7. **Duplicate** — already reported — check before submitting\n\n**Pro tip:** Search the program's disclosure timeline on Hacktivity to check if your bug was already reported before submitting.",
            desc: "Reasons HackerOne triage marks reports as N/A — avoid these mistakes",
          },
        ],
        tips: [
          "Use the 'Report a Vulnerability' button on the program page — don't email the program directly",
          "Set up your payout method (PayPal, TransferWise, BTC) before your first bounty to avoid delays",
          "Respond to triage questions within 24 hours — delayed responses can lead to auto-closure",
          "If your report is marked as duplicate but you have a different attack vector, ask for clarification",
        ],
      },
    ],
    tools: [
      { name: "Hacktivity", desc: "Live feed of HackerOne disclosures — see what's being found and how", link: "https://hackerone.com/hacktivity" },
      { name: "Program Search", desc: "Search and filter programs by scope, bounty, and response time", link: "https://hackerone.com/programs" },
      { name: "H1 Resources", desc: "Official documentation for hackers — best practices, policies, guides", link: "https://docs.hackerone.com" },
    ],
    summary: "HackerOne is the premier bug bounty platform. Build signal, target the right programs for your level, and submit clear reports to succeed. Private program invitations follow naturally from a strong reputation.",
  },
  {
    id: "bugcrowd",
    number: 2,
    title: "Bugcrowd",
    subtitle: "Crowdsourced security with a strong focus on priority ratings and managed triage",
    color: "oklch(0.65 0.18 50)",
    overview:
      "Bugcrowd uses a priority rating system (P1-P5) instead of traditional CVSS scoring. The platform emphasizes managed triage — their internal team validates your findings before passing them to the customer. Bugcrowd has both public and private programs, and their 'Strengthen Your Resume' feature lets you earn recognized badges. The platform is especially strong for infrastructure and web application testing.",
    sections: [
      {
        title: "Account Setup & Priority Rating System",
        text: "Bugcrowd uses a unique priority rating system (P1-P5). Understanding this system is essential for writing reports that earn maximum bounties. Your researcher rank (based on reputation points and priority submissions) determines visibility to program managers for private invitations.",
        commands: [
          {
            cmd: "## Bugcrowd Priority Rating (P1-P5)\n\n| Priority | Label       | Definition                                      | Typical Payout |\n|----------|-------------|-------------------------------------------------|----------------|\n| P1       | Critical    | Direct threat to business operations or data    | $2,000 - $10,000 |\n| P2       | High        | Significant impact on security posture           | $500 - $3,000 |\n| P3       | Medium      | Moderate impact, limited exploitation            | $200 - $750 |\n| P4       | Low         | Minor impact, requires unusual conditions        | $50 - $200 |\n| P5       | Informational | No direct exploit, but useful for defense      | $0 (acknowledgment) |\n\n**Key difference from HackerOne:** Bugcrowd uses prioritization (business impact), not just technical severity. A reflected XSS on a critical login page might be P2 here, not P3.",
            desc: "Bugcrowd's priority rating system — understand P1-P5 for accurate self-scoring",
          },
          {
            cmd: "## Bugcrowd Researcher Ranks\n\n| Rank    | Points Required | Benefits                                      |\n|---------|-----------------|-----------------------------------------------|\n| Level 1 | 0               | Basic access to public programs                |\n| Level 2 | 250             | Access to some private programs                |\n| Level 3 | 1,000           | Priority triage, more private invitations      |\n| Level 4 | 5,000           | Premium support, early access to new programs  |\n| Level 5 | 25,000          | VIP status, direct program manager access      |\n\n**Points are earned by:**\n- Accepted submissions: 10-100 points per P1-P3 finding\n- Briefings and research contributions\n- Helping other researchers (community engagement)\n- Participating in Bugcrowd events and CTFs",
            desc: "Bugcrowd researcher ranks — how points and levels work",
          },
        ],
        tips: [
          "Bugcrowd's triage team is known for thorough validation — provide complete reproduction steps or they'll mark it as 'needs more info'",
          "The 'Strengthen Your Resume' feature lets you highlight your top submissions on your profile",
          "P5 (informational) findings don't earn bounties but still contribute to your researcher rank",
        ],
      },
      {
        title: "Program Types & Submission Workflow",
        text: "Bugcrowd programs follow a structured submission workflow. After you submit, Bugcrowd's internal triage team validates the finding, then passes it to the customer. This means you get feedback even if the customer is slow to respond. The platform supports both public and private programs, with a strong emphasis on VDPs as an entry point for new researchers.",
        commands: [
          {
            cmd: "## Bugcrowd Submission Workflow\n\n1. **Submit** — Submit your finding through the platform with title, description, priority, and evidence\n2. **Triage Review** — Bugcrowd's internal team reviews within 48 hours\n3. **Customer Validation** — Customer reviews and either accepts, disputes, or requests more info\n4. **Bounty or Kudos** — If accepted, you receive bounty (or Kudos for non-monetary programs)\n5. **Disclosure** — After the customer resolves the issue, you can choose to publicly disclose\n\n**Timeline:**\n- Triage review: 24-48 hours\n- Customer validation: 1-14 days\n- Bounty payment: 30-60 days after acceptance\n- Public disclosure: at the customer's discretion, typically 90-180 days",
            desc: "Bugcrowd submission workflow — from submission to payout",
          },
          {
            cmd: "## Bugcrowd Submission Template\n\n**Title:** [Priority] [Vulnerability Type] in [Endpoint]\n\n**Priority:** P1 / P2 / P3 / P4 / P5\n\n**Asset:** [URL or scope item]\n\n**Description:**\n[Clear explanation of the vulnerability and its impact on the business]\n\n**Steps to Reproduce:**\n1. [Navigate to URL]\n2. [Perform action]\n3. [Observe result]\n\n**Proof of Concept:**\n[Screenshot or video link — Bugcrowd supports video uploads]\n\n**Technical Details:**\n[HTTP request/response, payload used, any relevant code]\n\n**Remediation Advice:**\n[Your suggested fix]\n\n**Business Impact:**\n[Explain what an attacker could realistically achieve]",
            desc: "Bugcrowd submission template — formatted for their triage system",
          },
          {
            cmd: "curl -s 'https://bugcrowd.com/programs.json' | jq '.programs[] | {name: .name, url: .url, bounty: .bounty, scope: .scope}' | head -40",
            desc: "Fetch Bugcrowd programs list — filter by bounty and scope size",
          },
        ],
        tips: [
          "Bugcrowd encourages video PoCs for complex vulnerabilities — record your screen showing the exploit",
          "Use the 'Needs More Info' status as an opportunity to improve your report, not a rejection",
          "Some Bugcrowd programs offer 'Bonus Bounties' for particularly creative or high-impact findings",
          "Complete your profile with your payment info (PayPal) before submitting to avoid payout delays",
        ],
      },
    ],
    tools: [
      { name: "Bugcrowd Forums", desc: "Community discussions, program announcements, and researcher tips", link: "https://forum.bugcrowd.com" },
      { name: "Bugcrowd University", desc: "Free training courses for bug bounty hunting fundamentals", link: "https://www.bugcrowd.com/resources/bugcrowd-university" },
    ],
    summary: "Bugcrowd's priority rating system and managed triage make it unique. Focus on P1-P3 submissions for maximum value. Build your researcher rank through consistent quality submissions to unlock private programs.",
  },
  {
    id: "intigriti",
    number: 3,
    title: "Intigriti",
    subtitle: "Europe's leading bug bounty platform — lower competition, regional focus",
    color: "oklch(0.72 0.16 75)",
    overview:
      "Intigriti is a European bug bounty platform headquartered in Belgium. It has fewer hackers than HackerOne or Bugcrowd, which means less competition for finding bugs. The platform is particularly strong for European targets and has a growing number of global programs. Intigriti offers both public and private programs with a straightforward submission system. Their 'Intigriti Experience' level system rewards consistent participation.",
    sections: [
      {
        title: "Platform Overview & Competition Advantage",
        text: "Intigriti's smaller researcher pool means each report you submit has a higher chance of being unique. The platform is ideal for new researchers who want to build experience with less competition. Intigriti also runs regular community challenges (XSS challenges) that help build skills and earn recognition.",
        commands: [
          {
            cmd: "## Intigriti vs HackerOne vs Bugcrowd\n\n| Feature                | Intigriti          | HackerOne       | Bugcrowd          |\n|------------------------|-------------------|----------------|-------------------|\n| Total researchers      | ~50,000           | ~1,000,000     | ~500,000          |\n| Geographic focus       | Europe            | Global          | Global            |\n| Average response time  | 2-3 days          | 1-2 days        | 1-2 days          |\n| Payout speed           | 15-30 days        | 30-60 days      | 30-60 days        |\n| Unique programs        | European SMBs     | US tech giants  | US and AU        |\n| XSS challenges         | Yes (monthly)     | No             | No               |\n| Researcher levels      | Intigriti XP     | Signal/Impact   | Rank levels      |\n\n**Advantage for beginners:** Less competition means more unique findings. European programs often have less tested attack surfaces.",
            desc: "Platform comparison — Intigriti's smaller pool means less competition",
          },
          {
            cmd: "## Intigriti XP & Researcher Levels\n\n| Level | XP Required | Benefits                                         |\n|-------|-------------|--------------------------------------------------|\n| 1     | 0           | Basic access to public programs                   |\n| 2     | 500         | Priority support ticket access                    |\n| 3     | 2,000       | Access to some private programs                   |\n| 4     | 8,000       | Premium support, exclusive program invitations    |\n| 5     | 25,000      | VIP researcher status, direct access to program managers |\n\n**How to earn XP:**\n- Accepted report: 100-500 XP (based on severity)\n- Monthly challenge completion: 200 XP\n- Helping other researchers: 50-100 XP\n- Platform participation: variable XP",
            desc: "Intigriti's experience system — XP levels and how to progress",
          },
        ],
        tips: [
          "Intigriti's monthly XSS challenges are great for building skills — winners get XP and swag",
          "European programs often have different data protection requirements (GDPR) that create unique attack surfaces",
          "Intigriti pays out faster than other platforms — typically within 2-4 weeks",
        ],
      },
      {
        title: "Program Selection & Submission Guide",
        text: "Intigriti programs tend to be European companies with smaller security teams. This means your reports need to be extra clear and self-contained, as the internal team may have less bandwidth. Focus on programs aligned with your skills and the timezone of the target.",
        commands: [
          {
            cmd: "## Intigriti Submission Template\n\n**Title:** [Vulnerability Type] - [Brief Description]\n\n**Program:** [Program Name]\n\n**Severity:** [Critical/High/Medium/Low]\n\n**Target:**\nhttps://[target-domain.com]\n\n**Vulnerability Description:**\n[2-3 sentences]\n\n**Proof of Concept:**\n1. [Step-by-step]\n2. [Include screenshots with annotations]\n3. [Show the impact clearly]\n\n**Request/Response:**\n```http\n[Raw traffic]\n```\n\n**Suggested Fix:**\n[Brief remediation advice]\n\n**References:**\n[Link to OWASP, CWE, or similar documentation]",
            desc: "Intigriti submission template — self-contained reports help smaller security teams",
          },
          {
            cmd: "## Finding Intigriti Programs\n\nBrowse programs: https://www.intigriti.com/programs\n\n**Filters to use:**\n- Sort by 'Newest' to find fresh programs\n- Filter by 'Bounties: Yes' for paid programs\n- Check 'European targets' if you're in a compatible timezone\n- Look for programs with 'View all' scope — wider scope = more attack surface\n\n**Pro tip:** Many Intigriti programs are managed through their 'Extreme' level, which offers premium support and direct communication with the program team.",
            desc: "How to find and filter programs on Intigriti platform",
          },
        ],
        tips: [
          "Intigriti's support team is known for being responsive — use the live chat for quick questions",
          "Many Intigriti programs accept submissions in local European languages — an advantage if you're multilingual",
          "Check the 'Rules & Rewards' page carefully — some programs offer fixed bounties while others use sliding scales",
        ],
      },
    ],
    tools: [
      { name: "Intigriti Platform", desc: "Browse programs, submit reports, track your earnings", link: "https://www.intigriti.com" },
      { name: "Intigriti Blog", desc: "Write-ups, challenge solutions, and platform updates", link: "https://blog.intigriti.com" },
    ],
    summary: "Intigriti offers lower competition and faster payouts than the major platforms. Ideal for European targets and new researchers looking to build a track record. The monthly XSS challenges are a bonus learning opportunity.",
  },
  {
    id: "synack",
    number: 4,
    title: "Synack",
    subtitle: "Invite-only elite platform — higher barriers, higher payouts",
    color: "oklch(0.7 0.14 65)",
    overview:
      "Synack is an invite-only bug bounty platform that positions itself as an elite hacker community. Unlike other platforms, Synack requires you to pass a verification process before joining. The platform offers higher base payouts, a steady stream of private programs, and direct relationships with program managers. Synack is best for experienced hunters who can pass the vetting process and want access to exclusive, high-bounty programs.",
    sections: [
      {
        title: "Getting Into Synack — The Vetting Process",
        text: "Synack's entry process is the most rigorous of any bug bounty platform. You must apply, pass a background check, and complete a skills assessment. The process ensures quality but also means less competition once you're in. Synack values professionalism, clear communication, and demonstrated technical skill.",
        commands: [
          {
            cmd: "## Synack Vetting Process\n\n**Step 1: Application**\n- Submit an application on the Synack website\n- Provide your background, experience level, and areas of expertise\n- Include links to your LinkedIn, GitHub, or published research\n\n**Step 2: Background Check**\n- Synack requires a background check for all researchers\n- Must be 18+ and legally eligible to perform security testing\n- Criminal background check is standard\n\n**Step 3: Skills Assessment**\n- Complete a technical challenge on Synack's test range\n- Tests: web application testing, network testing, mobile (optional)\n- Must demonstrate ability to find and document vulnerabilities\n- Scoring is based on accuracy, completeness, and report quality\n\n**Step 4: Interview (Sometimes)**\n- Some candidates are interviewed by the Synack team\n- Focus: communication skills, methodology, professionalism\n\n**Step 5: Onboarding**\n- Platform orientation\n- NDA signing\n- Payment setup",
            desc: "Synack's 5-step vetting process — what to expect at each stage",
          },
          {
            cmd: "## Synack Payout Structure\n\n| Vulnerability Type | Typical Payout     | Notes                            |\n|-------------------|-------------------|----------------------------------|\n| Critical          | $5,000 - $25,000  | RCE, SQLi leading to data access  |\n| High              | $2,000 - $10,000  | SSRF, IDOR, Auth bypass          |\n| Medium            | $500 - $3,000     | XSS, CSRF, Miscategorized bugs   |\n| Low               | $100 - $500       | Information disclosure, missing headers |\n\n**Synack exclusives:**\n- 'Red Team' engagements: $500-$2,000/day for penetration testing\n- Special bounties: some programs offer bonuses for specific vulnerability types\n- Loyalty bonuses: long-term researchers get priority access to new programs",
            desc: "Synack payout ranges — typically higher than public platforms",
          },
        ],
        tips: [
          "The Synack skills assessment focuses on real-world scenarios — practice on HackTheBox or PentesterLab beforehand",
          "Synack values professionalism — use proper English in your reports and communicate clearly",
          "Once accepted, you get access to programs that aren't available on any other platform",
          "The background check can take 2-4 weeks — plan accordingly",
        ],
      },
      {
        title: "Life as a Synack Researcher",
        text: "Synack researchers enjoy lower competition, higher payouts, and direct program manager access. However, the platform requires consistent activity to maintain your status. Synack has a 'minimum activity' requirement that varies by tier. Inactive researchers may lose access to top programs.",
        commands: [
          {
            cmd: "## Synack Researcher Tiers\n\n| Tier   | Requirements                    | Benefits                                    |\n|--------|---------------------------------|---------------------------------------------|\n| Silver | Pass vetting, active in 30 days | Access to 10-20 programs                     |\n| Gold   | 5+ accepted reports, 3 months   | Access to 20-50 programs, priority support   |\n| Platinum | 20+ accepted reports, 1 year  | Access to 50+ programs, Red Team invites     |\n\n**Maintaining your status:**\n- Submit at least 1 report every 30 days\n- Respond to triage requests within 48 hours\n- Maintain professional communication\n- Participate in special projects and Red Team engagements\n\n**Getting kicked out:**\n- No activity for 60+ days (automatic suspension)\n- Low-quality submissions (multiple N/As)\n- Violating program scope or testing guidelines",
            desc: "Synack researcher tiers and activity requirements to maintain access",
          },
          {
            cmd: "## Tips for Synack Success\n\n1. **Focus on one program at a time** — Synack programs reward depth over breadth\n2. **Build relationships with program managers** — direct communication leads to more invites\n3. **Report everything** — even low-severity findings build your reputation on the platform\n4. **Use the Synack-provided VPN** — all testing goes through their infrastructure\n5. **Request access to Red Team engagements** — these pay daily rates, not per-bug\n6. **Check the 'Special Projects' tab** — time-limited projects with bonus payouts\n7. **Join the Synack Slack** — community support, tips, and program announcements",
            desc: "Strategies for succeeding on the Synack platform",
          },
        ],
        tips: [
          "Synack's VPN ensures your testing is legal and monitored — always use it when testing Synack programs",
          "Red Team engagements pay even if you don't find bugs — they're the best way to earn consistently",
          "Keep your Synack profile updated with new skills and tools you've mastered",
        ],
      },
    ],
    tools: [
      { name: "Synack Platform", desc: "Access programs, submit reports, track Red Team engagements", link: "https://www.synack.com/red-team" },
      { name: "Synack Blog", desc: "Researcher stories, platform updates, and technical resources", link: "https://www.synack.com/blog" },
    ],
    summary: "Synack is the premium bug bounty platform with higher barriers to entry but also higher rewards. The vetting process filters out low-quality researchers, meaning less competition. Ideal for experienced hunters who want access to exclusive programs and Red Team engagements.",
  },
  {
    id: "openbugbounty",
    number: 5,
    title: "OpenBugBounty",
    subtitle: "Free, non-monetary disclosure platform — ideal for beginners and VDP-only programs",
    color: "oklch(0.55 0.22 25)",
    overview:
      "OpenBugBounty is a unique platform that focuses on coordinated disclosure rather than monetary rewards. It's completely free — no commissions, no bounties. Researchers submit vulnerabilities and receive credit for their findings. After a 90-day disclosure period, the vulnerability is publicly disclosed (unless the vendor fixes it earlier). OpenBugBounty is excellent for building a track record, collecting CVE IDs, and practicing disclosures without the pressure of bounty competition.",
    sections: [
      {
        title: "How OpenBugBounty Works",
        text: "OpenBugBounty operates differently from bounty platforms. There are no bounties — the reward is public credit for your finding. The platform connects researchers with website owners for responsible disclosure. After the 90-day disclosure period, vulnerabilities are published. Researchers build a profile showing their total disclosures, affected sites, and responsible disclosure compliance.",
        commands: [
          {
            cmd: "## OpenBugBounty Process\n\n1. **Find a vulnerability** — any web vulnerability (XSS, SQLi, CSRF, etc.)\n2. **Submit through OpenBugBounty** — provide the URL, vulnerability details, and PoC\n3. **Notification** — OBB contacts the website owner with your report\n4. **Mitigation Period (90 days)** — the owner has 90 days to fix the issue\n5. **Early fix** — if the owner fixes it before 90 days, disclosure can happen immediately\n6. **Public Disclosure** — after 90 days, the vulnerability is published with your credit\n\n**Key differences:**\n- No bounties — it's purely for credit and experience\n- No competition — multiple researchers can report to the same website\n- Focus on coordinated disclosure methodology\n- Great for building a public research portfolio",
            desc: "OpenBugBounty's disclosure process — step by step",
          },
          {
            cmd: "## OpenBugBounty Guidelines\n\n**Do's:**\n- Report verified vulnerabilities only\n- Provide clear reproduction steps\n- Wait the full 90-day disclosure period\n- Help the vendor understand the issue if they ask\n- Build your profile with consistent quality reports\n\n**Don'ts:**\n- Don't report automated scanner findings\n- Don't contact vendors directly — use OBB's notification system\n- Don't demand payment or bounties (this violates OBB policy)\n- Don't report vulnerabilities on sites with active bug bounty programs\n- Don't publicly disclose before the 90-day period ends\n\n**Scope:**\n- Any publicly accessible website\n- All standard web vulnerabilities\n- No network-level or physical security issues\n- No vulnerabilities requiring authentication (unless you have authorized access)",
            desc: "OpenBugBounty guidelines — what's allowed and what's not",
          },
        ],
        tips: [
          "OpenBugBounty is excellent for beginners — no pressure, just practice and build your disclosure history",
          "Many researchers start on OBB to build a portfolio before applying to paid platforms",
          "OBB disclosures can help you get CVEs for your findings, which strengthens your researcher profile",
        ],
      },
      {
        title: "Building Your Researcher Profile on OBB",
        text: "Your OpenBugBounty profile shows your total disclosed vulnerabilities, the types of bugs you've found, and your disclosure compliance rate. A strong OBB profile demonstrates responsible disclosure practices and technical competence. Many researchers use their OBB profile as a reference when applying to paid programs or security jobs.",
        commands: [
          {
            cmd: "## Optimizing Your OBB Profile\n\n**Profile elements:**\n- Full name or pseudonym (consistent across platforms)\n- Biography: your focus areas and experience level\n- Stats: total disclosures, types of bugs, compliance rate\n- External links: Twitter, LinkedIn, GitHub\n\n**Stats that matter:**\n- Total disclosed vulnerabilities: 50+ shows consistent activity\n- Compliance rate: 95%+ (never violate the disclosure period)\n- Vulnerability diversity: XSS, CSRF, SQLi, IDOR, etc.\n- Response rate: high rate of vendor fixes indicates quality reports\n\n**Progression path:**\n1. Start with 10-20 OBB disclosures to learn the process\n2. Move to VDPs on HackerOne/Bugcrowd for structured programs\n3. Graduate to paid bounty programs with a proven track record\n4. Use your OBB + paid program history when applying to Synack",
            desc: "How to optimize your OpenBugBounty researcher profile",
          },
          {
            cmd: "## Getting CVEs Through OpenBugBounty\n\nSome OBB disclosures qualify for CVE assignment:\n1. The vulnerability must be a distinct security issue (not a duplicate)\n2. The vendor must acknowledge the issue (fixing it counts as acknowledgment)\n3. Submit CVE request through MITRE or your preferred CNA\n4. Reference the OBB disclosure ID in your CVE request\n\n**Tips:**\n- SQL injection, RCE, and authentication bypasses are most likely to get CVEs\n- XSS rarely gets CVEs unless it's stored and affects a significant application\n- Having CVEs on your profile significantly boosts your credibility as a researcher",
            desc: "How to get CVE IDs for your OpenBugBounty disclosures",
          },
        ],
        tips: [
          "Use a consistent researcher name across OBB, HackerOne, Bugcrowd, and Twitter to build a recognizable brand",
          "OBB disclosures are indexed by Google — a strong profile helps with professional opportunities",
          "Don't submit to OBB if the site has an active bug bounty program — submit there instead for potential payouts",
        ],
      },
    ],
    tools: [
      { name: "OpenBugBounty", desc: "Submit vulnerabilities, track disclosures, build your profile", link: "https://www.openbugbounty.org" },
      { name: "OBB Stats", desc: "Analytics dashboards for your submissions and researcher performance", link: "https://www.openbugbounty.org/statistics" },
    ],
    summary: "OpenBugBounty is the best platform for beginners and researchers who want to practice responsible disclosure without the pressure of paid bounties. Build your profile, collect CVEs, and use the experience as a stepping stone to paid platforms.",
  },
]
