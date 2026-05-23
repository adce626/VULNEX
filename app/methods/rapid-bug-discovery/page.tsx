"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { CommandCard } from "@/components/command-card"
import {
  Terminal, ChevronRight, Home, ExternalLink,
  Search, Zap, Globe, Github, BookOpen,
  CheckCircle, Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "method-1", label: "Method 1 — Shodan & Nuclei" },
  { id: "method-2", label: "Method 2 — Unhidden Elements" },
  { id: "method-3", label: "Method 3 — Automation Toolkit" },
  { id: "conclusion", label: "Conclusion" },
]

export default function RapidBugDiscoveryPage() {
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
    <div className="min-h-screen bg-background">
      <PageTitle title="Rapid Bug Discovery" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/methods" className="hover:text-foreground">Methods</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Rapid Bug Discovery</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-violet-500/10 via-background to-cyan-500/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              Rapid Bug Discovery — Find Bugs in Under 5 Minutes
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              A fast shortcut that combines Shodan dorking, client-side bypasses, and automated recon tools to find the most important vulnerabilities without wasting time
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500">3 Methods</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">10+ Tools</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => scrollToSection(phase.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeCategory === phase.id
                      ? "bg-violet-500 text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl space-y-16 p-6">

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hi everyone, welcome back! Today, I&apos;m going to show you the exact method I use to find bugs on almost any website in under five minutes. I&apos;ll show you exactly how I do it. I use a really fast shortcut that combines a few clever tricks to quickly understand a website and then I let automated tools do the hard work of scanning for bugs. It&apos;s all about working smart, not hard, so you can find the most important vulnerabilities without wasting any time.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In this walkthrough, I&apos;ll cover:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {[
                "How I use Shodan to quickly identify mass-scale CVE exposures.",
                "Scripts that uncover hidden inputs, forms and URLs.",
                "Automation workflows with Nuclei, GF patterns, Uro and other tools.",
                "Recon techniques with WaybakURLs, AlienVault, URLScan, VirusTotal and more.",
                "My own custom scripts like Lost Uncover and LostFuzzer to streamline scanning.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-violet-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Method 1 — Mass Scanning with Shodan & Nuclei */}
          <section id="method-1" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-500">Method 1</span>
                <h2 className="text-2xl font-bold text-foreground">Mass Scanning with Shodan & Nuclei</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              This is my go-to method for finding recently disclosed CVEs at a massive scale. It&apos;s incredibly efficient for identifying low-hanging fruit across thousands of targets.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Find Your Target CVE</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              First, pick a CVE you want to hunt for. For this example, let&apos;s say we&apos;re looking for a specific vulnerability in a popular software.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Shodan Dorking</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Head over to Shodan and use a specific search dork related to the product or CVE. Shodan will instantly show you all the internet-connected devices matching your query.
            </p>
            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/c150a47216c81a34fbcaf3bfe04b5f9c01ebefb2.webp")}>
              <Image src="/images/methods/Rapid-bug-discovery/c150a47216c81a34fbcaf3bfe04b5f9c01ebefb2.webp" alt="Shodan dorking results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Facet Analysis for IPs</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              On the results page, click the &ldquo;More&rdquo; option to open the Facet Analysis tab. From there, select the &ldquo;ip&rdquo; option. This neatly organizes all the results by their IP address.
            </p>
            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/70f42eba2ef97d837bfd44d8c2465ab22bc28fdc.webp")}>
              <Image src="/images/methods/Rapid-bug-discovery/70f42eba2ef97d837bfd44d8c2465ab22bc28fdc.webp" alt="Facet Analysis tab" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Extract and Scan</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Now for the magic. I use a custom bookmarklet I wrote that automatically fetches all the IP addresses from the Shodan results and downloads them as a .txt file.
            </p>

            <h4 className="mb-2 font-medium text-foreground">Bookmarklet for IPs</h4>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">JavaScript</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`javascript:(function(){var ipElements=document.querySelectorAll('strong');var ips=[];ipElements.forEach(function(e){ips.push(e.innerHTML.replace(/["']/g,''))});var ipsString=ips.join('\\n');var a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(ipsString);a.download='ip.txt';document.body.appendChild(a);a.click();})();`}</code></pre>
            </div>

            <h4 className="mb-2 font-medium text-foreground">Bookmarklet for Domains</h4>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">JavaScript</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`javascript:(function(){var ipElements=document.querySelectorAll('strong'),ips=[],domains=[];ipElements.forEach(function(e){var t=e.innerHTML.replace(/['"]/g,'').trim();/^(\\d{1,3}\\.){3}\\d{1,3}$/.test(t)?ips.push(t):/^(?!\\d+\\.)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(t)&&domains.push(t)});var dataString='IPs:\\n'+ips.join('\\n')+'\\n\\nDomains:\\n'+domains.join('\\n'),a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(dataString);a.download='domains.txt';document.body.appendChild(a);a.click();})();`}</code></pre>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              You can also use <strong className="text-foreground">shef</strong>, a lightweight command-line tool written in Go by our team. Shef integrates Facets into your terminal environment and operates without requiring an API key.
            </p>
            <a
              href="https://github.com/1hehaq/shef"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
            >
              <Github className="h-4 w-4" />
              github.com/1hehaq/shef
              <ExternalLink className="h-3 w-3" />
            </a>

            <p className="mb-4 text-sm text-muted-foreground">
              Once you have the file, you can feed it directly into Nuclei for automated scanning. Simply replace the tags or template name with the one relevant to your CVE. In minutes, Nuclei will scan the entire list and highlight any vulnerable hosts.
            </p>
            <CommandCard
              command="cat ip.txt | nuclei -tags grafana -bs 50 -c 50 -es info"
              description="Nuclei mass scan with Shodan IPs"
              index={1}
            />
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/b74fedbcb6602b4bd2097618141cd32079f77806.webp")}>
              <Image src="/images/methods/Rapid-bug-discovery/b74fedbcb6602b4bd2097618141cd32079f77806.webp" alt="Nuclei scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Method 2 — Uncovering What's Hidden in Plain Sight */}
          <section id="method-2" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-500">Method 2</span>
                <h2 className="text-2xl font-bold text-foreground">Uncovering What&apos;s Hidden in Plain Sight</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Developers often disable form inputs, buttons or hide entire sections of a page, thinking they are secure. This script helps you bypass those client-side restrictions.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Quick Unhide Bookmarklet</h3>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">JavaScript</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`javascript:(function(){document.querySelectorAll('[disabled],[readonly]').forEach(el=>{el.removeAttribute('disabled');el.removeAttribute('readonly');});document.querySelectorAll('[style*="display: none"]').forEach(el=>{el.style.display='block';});document.querySelectorAll('[style*="pointer-events: none"]').forEach(el=>{el.style.pointerEvents='auto';el.style.opacity='1';});alert('Disabled, readonly, and hidden elements are now active!');})();`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Lost Uncover — Full Scanner Panel</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              I&apos;ve integrated a handy script into my Lost Uncover tool that automatically finds and modifies these elements on a webpage:
            </p>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">JavaScript</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`javascript:(function(){if(document.getElementById('lostsec-scanner'))return;let e=!1,t=[],n=document.createElement('div');n.id='lostsec-scanner',n.style='position:fixed;bottom:0;left:0;width:100%;height:350px;background:#181818;color:#00bcd4;z-index:999999;padding:20px;font-family:monospace;box-shadow:0 -2px 10px rgba(0,0,0,0.7);border-top:2px solid #00bcd4;overflow:hidden;';let o=document.createElement('div');o.style='position:absolute;top:0;left:0;width:100%;height:10px;background:#222;cursor:ns-resize;',n.appendChild(o);let i=!1,a=0,l=0;o.addEventListener('mousedown',r=>{i=!0,a=r.clientY,l=n.offsetHeight,r.preventDefault()});function d(r){if(i){let d=l-(r.clientY-a);d=Math.max(200,Math.min(d,window.innerHeight*.9)),n.style.height=d+'px';let s=document.getElementById('results-wrapper');s&&(s.style.maxHeight=d-140+'px')}}function c(){i=!1}document.addEventListener('mousemove',d),document.addEventListener('mouseup',c);let s=document.createElement('div');s.textContent='\\u274c',s.style='position:absolute;top:10px;right:20px;font-size:18px;color:#ff4081;cursor:pointer;';function u(){e=!0,document.removeEventListener('mousemove',d),document.removeEventListener('mouseup',c),document.removeEventListener('keydown',f),n.remove(),t.forEach(e=>e.abort())}s.onclick=u,n.appendChild(s);let m=document.createElement('h3');m.textContent='\\ud83d\\udd0d Lostsec Uncover',m.style='margin:10px 0;color:#00bcd4;',n.appendChild(m);let v=document.createElement('input');v.placeholder='Search URLs...',v.style='width:100%;padding:6px;margin-bottom:10px;border-radius:4px;border:none;font-size:14px;outline:none;background:#222;color:#00bcd4;',n.appendChild(v);let y=document.createElement('div');y.style='margin-bottom:10px;display:flex;gap:10px;flex-wrap:wrap;';let h=document.createElement('button');h.textContent='\\ud83d\\udccb Copy All',h.style='padding:5px 10px;background:#222;color:#00bcd4;border:none;border-radius:3px;cursor:pointer;';let g=document.createElement('button');g.textContent='\\u2b07\\ufe0f Export .txt',g.style='padding:5px 10px;background:#222;color:#00bcd4;border:none;border-radius:3px;cursor:pointer;';let z=document.createElement('button');z.textContent='\\ud83e\\ude84 Unhide Elements',z.style='padding:5px 10px;background:#222;color:#00bcd4;border:none;border-radius:3px;cursor:pointer;';z.onclick=()=>{document.querySelectorAll('[disabled],[readonly]').forEach(el=>{el.removeAttribute('disabled');el.removeAttribute('readonly');});document.querySelectorAll('[style*="display: none"],.hidden').forEach(el=>{el.style.display='block';});document.querySelectorAll('[style*="pointer-events: none"],.grayed').forEach(el=>{el.style.pointerEvents='auto';el.style.opacity='1';});alert('\\u2705 Disabled, readonly, and hidden elements are now active!');};let p=document.createElement('label');p.style='display:flex;align-items:center;gap:5px;color:#00bcd4;font-size:14px;cursor:pointer;';let b=document.createElement('input');b.type='checkbox',p.appendChild(b),p.appendChild(document.createTextNode('Domain only')),y.appendChild(h),y.appendChild(g),y.appendChild(z),y.appendChild(p),n.appendChild(y);let w=document.createElement('div');w.id='results',w.style='margin-top:10px;color:#00bcd4;';let k=document.createElement('div');k.id='results-wrapper',k.style='background:#222;padding:10px;border-radius:5px;max-height:180px;overflow:auto;margin-top:10px;',n.appendChild(w),n.appendChild(k),document.body.appendChild(n);let x=new URL(window.location.href).hostname;function f(r){'Escape'===r.key&&u()}document.addEventListener('keydown',f);let totalScripts=0,processedScripts=0,foundSet=new Set,domUrls=[];function updateProgress(){w.innerHTML='<div style="margin:10px 0;color:#00bcd4">Scanning... ('+processedScripts+'/'+totalScripts+' scripts processed)</div>'}function updateResults(){let arr=[...new Set([...domUrls,...foundSet])];C=arr,T(arr)}async function scanExternalScripts(){let scripts=document.getElementsByTagName('script');totalScripts=Array.from(scripts).filter(s=>s.src).length,processedScripts=0;let regex=/["'\\u0060]\\/[a-zA-Z0-9_?&=\\/\\-\\#\\.]*(?=["'\\u0060])/g,promises=[];for(let s of scripts)if(s.src){let ctrl=new AbortController;t.push(ctrl),promises.push(fetch(s.src,{signal:ctrl.signal}).then(r=>r.text()).then(text=>{if(e)return;let matches=text.matchAll(regex);for(let m of matches)foundSet.add(m[0]);processedScripts++,updateProgress(),updateResults()}).catch(err=>{processedScripts++,updateProgress();'AbortError'!==err.name&&console.error(err)}))}await Promise.all(promises)}function L(){let e=new Set;document.querySelectorAll('a,script,img,link,form').forEach(t=>{t.href&&e.add(t.href),t.src&&e.add(t.src),t.action&&e.add(t.action)});let n=document.documentElement.innerHTML,o=/(?:url\\(|href=|src=|action=|url:|endpoint:|path:|route:)\\s*["'\\u0060]?([^"'\\u005c)\\s>]+)(?=["'>\\s])/gi,i;for(;null!==(i=o.exec(n));)i[1]&&!i[1].startsWith('data:')&&e.add(i[1]);(n.match(/"[^"]*"|'[^']*'/g)||[]).forEach(t=>{let n=/(?:\\/[a-zA-Z0-9_-]+)+(?:\\.[a-zA-Z0-9]+)?/g,o=t.match(n)||[];o.forEach(t=>e.add(t))}),performance.getEntriesByType('resource').forEach(t=>e.add(t.name));return Array.from(e).sort()}function T(n){k.innerHTML='';let o=n.filter(t=>{if(b.checked&&!t.includes(x))return!1;let n=v.value.toLowerCase();return!(n&&!t.toLowerCase().includes(n))});o.forEach(e=>{let t=document.createElement('div');t.style='color:#fff;margin:4px 0;padding:5px;background:#333;border-radius:3px;word-break:break-all;',t.textContent=e,k.appendChild(t)})}function U(e){return e.filter(t=>{if(b.checked&&!t.includes(x))return!1;let n=v.value.toLowerCase();return!(n&&!t.toLowerCase().includes(n))})}let C=[];v.addEventListener('input',()=>T(C)),b.addEventListener('change',()=>T(C)),h.addEventListener('click',()=>{let e=U(C);navigator.clipboard.writeText(e.join('\\n')).then(()=>alert('\\u2705 URLs copied!'))}),g.addEventListener('click',()=>{let e=U(C),t=new Blob([e.join('\\n')]),n=document.createElement('a');n.href=URL.createObjectURL(t),n.download='lostsec_urls.txt',n.click()}),function init(){w.textContent='Scanning...';domUrls=L(),updateResults(),scanExternalScripts().then(()=>{if(e)return;w.innerHTML='<div style="margin:10px 0;color:#00bcd4">\\u2705 Scan complete! Found '+C.length+' unique URLs & Endpoints on '+x+'</div>',T(C)}).catch(n=>{if(e)return;console.error(n),w.textContent='\\u274c Error during scan. Check console for details.'})}();})();`}</code></pre>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              You can use this HTML file to test the script. Simply open the file and use the &ldquo;Lost Uncover → Unhide Element&rdquo; option:
            </p>

            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">HTML</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bookmarklet Test Page</title>
  <style>
    body {
      background-color: black;
      color: #00ff88;
      font-family: monospace;
      padding: 20px;
    }
    input, button {
      font-family: monospace;
      margin-top: 5px;
      margin-bottom: 20px;
      padding: 5px;
    }
    .hidden {
      display: none;
    }
    .grayed {
      pointer-events: none;
      opacity: 0.4;
    }
  </style>
</head>
<body>
  <h1>Bookmarklet Test Page</h1>
  <h2>Disabled Input</h2>
  <label>Email (Disabled):<br>
    <input type="text" value="you@nowhere.com123" disabled>
  </label>
  <h2>Readonly Input</h2>
  <label>Username (Readonly):<br>
    <input type="text" value="readonly_user123" readonly>
  </label>
  <h2>Hidden Button</h2>
  <button class="hidden" id="secret-btn">Secret Admin Button</button>
  <h2>Grayed-Out Section</h2>
  <div class="grayed">Premium Content</div>
</body>
</html>`}</code></pre>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/49b6ed33cbd4951dd8842039a8c9c3425b3acf3a.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/49b6ed33cbd4951dd8842039a8c9c3425b3acf3a.webp" alt="Before unhiding elements" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/218f22ffd3b6cbd65e61a136ee4d35f960bd4949.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/218f22ffd3b6cbd65e61a136ee4d35f960bd4949.webp" alt="After unhiding elements" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <p className="mb-4 text-muted-foreground leading-relaxed">
              As you can see, after clicking &ldquo;Unhide Element,&rdquo; it reveals Disabled Inputs, Readonly Inputs, Hidden Buttons, Grayed-Out Sections and similar elements.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              You can also use this script to quickly scan any website for URLs, endpoints, and hidden resources directly from your browser.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">What the Script Does</h3>
            <ul className="mb-6 space-y-2 text-muted-foreground">
              {[
                "Opens a floating, resizable panel at the bottom of the page.",
                "Collects URLs from the page &mdash; a, script, img, link, form tags, inline HTML, CSS url() paths, and browser resource performance entries.",
                "Scans external JavaScript files to find more endpoints using regex.",
                "Lets you search/filter URLs, copy all URLs to clipboard, or export them as a .txt file.",
                "Can unhide hidden or disabled elements on the page for testing purposes.",
                "Supports a domain-only filter to focus on internal links.",
                "Shows scan progress and total URLs found.",
                "Can be closed with Escape key or by clicking the close button, aborting ongoing fetches.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-3 w-3 shrink-0 text-violet-500" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              By re-enabling these elements, you can often access forgotten or administrative functionalities that are still active on the backend. It&apos;s amazing what you can find just by poking around in features that were meant to be hidden.
            </p>
          </section>

          {/* Method 3 — Automated Bug Hunting Toolkit */}
          <section id="method-3" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-500">Method 3</span>
                <h2 className="text-2xl font-bold text-foreground">My Automated Bug Hunting Toolkit</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              To really speed things up, I rely on a set of powerful scripts and tools that automate the most time-consuming parts of reconnaissance. Here&apos;s a look at the key players in my automation workflow.
            </p>

            {/* AlienVault OTX */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">AlienVault OTX: The Foundation for Mass URL Discovery</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                This is where my main automation begins. The first step is to get a complete map of the target&apos;s web presence, and for that, I use a script that queries AlienVault&apos;s Open Threat Exchange (OTX).
              </p>
              <CommandCard
                command="./alienvault.sh domain.com"
                description="Query AlienVault OTX for all known URLs"
                index={2}
              />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/8920c14c369de2873e2936661c3161924ccd79bd.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/8920c14c369de2873e2936661c3161924ccd79bd.webp" alt="AlienVault OTX results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a
                href="https://github.com/coffinxp/scripts/blob/main/alienvault.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <Github className="h-4 w-4" />
                github.com/coffinxp/scripts
                <ExternalLink className="h-3 w-3" />
              </a>

              <p className="mt-6 mb-3 text-sm text-muted-foreground">
                Its superpower is its thoroughness. It digs deep and fetches every known URL associated with a domain, crawling through pages until it has a massive list. Once I have this raw data, I refine it to find the most interesting targets:
              </p>
              <ul className="mb-4 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>Generate the URL list using the AlienVault script.</li>
                <li>Filter for interesting parameters using gf patterns (like gf xss or gf sqli).</li>
                <li>Remove duplicates with a tool like uro.</li>
              </ul>
              <p className="mb-3 text-sm text-muted-foreground">
                The final command looks something like this, leaving me with a clean list of potentially vulnerable URLs ready for testing:
              </p>
              <div className="space-y-2">
                <CommandCard command="cat all_urls.txt | gf xss | uro > unique_xss_targets.txt" description="Filter XSS targets" index={3} />
                <CommandCard command="cat all_urls.txt | gf sqli | uro > unique_sqli_targets.txt" description="Filter SQLi targets" index={4} />
                <CommandCard command="cat all_urls.txt | gf idor | uro > unique_idor_targets.txt" description="Filter IDOR targets" index={5} />
                <CommandCard command="cat all_urls.txt | gf ssrf | uro > unique_ssrf_targets.txt" description="Filter SSRF targets" index={6} />
                <CommandCard command="cat all_urls.txt | gf redirect | uro > unique_redirect_targets.txt" description="Filter Redirect targets" index={7} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://github.com/coffinxp/GFpattren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-violet-500/50"
                >
                  <Github className="h-3 w-3" />
                  coffinxp/GFpattren
                </a>
                <a
                  href="https://github.com/tomnomnom/gf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-violet-500/50"
                >
                  <Github className="h-3 w-3" />
                  tomnomnom/gf
                </a>
              </div>
            </div>

            {/* LostFuzzer */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">LostFuzzer: Your Quick & Easy DAST Scanner</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You can use my LostFuzzer script for a simple, direct approach. Provide a domain (or a list of domains) and it will automatically run a Nuclei DAST scan to find vulnerabilities. It&apos;s lightweight, easy to use, and delivers high-impact results with minimal effort.
              </p>
              <a
                href="https://infosecwriteups.com/lostfuzzer-passive-url-fuzzing-nuclei-dast-for-bug-hunters-a33501b9563b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <BookOpen className="h-4 w-4" />
                Read the Medium Article
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* URLScan.io */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">URLScan.io: Uncovering Hidden Subdomains and Endpoints</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                URLScan.io is another goldmine for reconnaissance, and using a script to automate queries is a huge time-saver. This tool is great for two main tasks:
              </p>
              <ul className="mb-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li><strong className="text-foreground">Finding Subdomains:</strong> Run the script in &ldquo;Subdomains&rdquo; mode to get a list of all related subdomains. I often pipe this output directly to HTTPX to see which ones are live and what technology they&apos;re running.</li>
                <li><strong className="text-foreground">Discovering More URLs:</strong> In &ldquo;URLs&rdquo; mode, it fetches another unique set of URLs. You can add these to the list you got from AlienVault or scan them separately with Nuclei DAST.</li>
              </ul>
              <div className="space-y-2">
                <CommandCard command="python urlscan.py -d redbull.com --mode urls" description="Fetch URLs from URLScan.io" index={8} />
                <CommandCard command="python urlscan.py -d redbull.com --mode subdomains" description="Fetch subdomains from URLScan.io" index={9} />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/678dfc75881c0f557d05ae5a5a1690fb1ba4c1ff.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/678dfc75881c0f557d05ae5a5a1690fb1ba4c1ff.webp" alt="URLScan.io results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a
                href="https://github.com/coffinxp/scripts/blob/main/urlscan.py"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <Github className="h-4 w-4" />
                github.com/coffinxp/scripts
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* VirusTotal */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">VirusTotal Script: Mining for Digital Gold</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                This is one of my secret weapons for finding the kind of sensitive information that other tools often miss. Using a script written by Orwa that queries VirusTotal, you can uncover some incredible findings.
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Because VirusTotal analyzes files and URLs submitted by users worldwide, its database sometimes contains exposed secrets related to your target. I have personally used this script to find:
              </p>
              <ul className="mb-4 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>Email and password combinations.</li>
                <li>Internal API keys.</li>
                <li>Password reset tokens and other sensitive links.</li>
              </ul>
              <p className="mb-4 text-sm text-muted-foreground">
                It&apos;s always worth a quick check &mdash; you never know what secrets might be hiding in plain sight. Also make sure to add your three different VirusTotal API keys in the given script.
              </p>
              <CommandCard command="./virustotal.sh domain.com" description="Query VirusTotal for exposed secrets" index={10} />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/265520ac5bf2cc709c47e306af99887ffa2f95f7.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/265520ac5bf2cc709c47e306af99887ffa2f95f7.webp" alt="VirusTotal results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a
                href="https://github.com/coffinxp/scripts/blob/main/virustotal.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <Github className="h-4 w-4" />
                github.com/coffinxp/scripts
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Waybackurls */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Waybackurls: The Engine of My Recon Workflow</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                This is my updated all‑in‑one URL‑gathering script &mdash; fast, flexible and integrates with other tools. It uses waybackurls as the core engine to pull historical URLs from sources like the Wayback Machine and Common Crawl, perfect for finding forgotten endpoints.
              </p>
              <p className="mb-3 text-sm text-muted-foreground">Here are its key features:</p>
              <div className="mb-4 rounded-lg border border-border bg-muted p-3 text-sm text-muted-foreground">
                <p className="mb-1"><strong className="text-foreground">Usage:</strong> ./wayback.sh domain.com [-s] [-e] [-sc codes] [-scx codes]</p>
                <p className="mb-1"><strong className="text-foreground">Examples:</strong></p>
                <pre className="mt-2 text-xs"><code>{`./wayback.sh example.com -s -sc 200
./wayback.sh example.com -sc 200,302,403
./wayback.sh example.com -scx 404,500
./wayback.sh example.com -e`}</code></pre>
              </div>
              <ul className="mb-4 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong className="text-foreground">Subdomain Support (-s):</strong> Include all subdomains for wildcard scope programs.</li>
                <li><strong className="text-foreground">Status Code Filtering (-sc & -scx):</strong> Filter for specific status codes or exclude codes.</li>
                <li><strong className="text-foreground">Extension Filtering (-e):</strong> Retrieve only URLs with specific file types.</li>
              </ul>
              <p className="mb-3 text-sm text-muted-foreground">
                The best part is that it&apos;s built for one-liners. You can chain it directly with other tools:
              </p>
              <CommandCard command="./wayback.sh example.com -s -sc 200 | gf xss" description="Chain wayback.sh with gf patterns" index={11} />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/2497e7b5f3c9f8fe724724d8ea83f910f0feb1b1.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/2497e7b5f3c9f8fe724724d8ea83f910f0feb1b1.webp" alt="Waybackurls results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a
                href="https://github.com/coffinxp/scripts/blob/main/wayback.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <Github className="h-4 w-4" />
                github.com/coffinxp/scripts
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Gospider */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Gospider: Fast Crawling & JS Harvesting</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Here&apos;s another fast crawler I use for site mapping, JS analysis and endpoint discovery. Lightweight and perfect for one-liners with jsleaks, lazyegg, gf patterns and nuclei, it can generate and verify links from JavaScript using LinkFinder, detect AWS S3 buckets from page sources and extract subdomains or hidden URLs. It also pulls data from the Wayback Machine, Common Crawl, VirusTotal and AlienVault, giving a complete view of your target&apos;s exposed assets for a fast, powerful recon workflow.
              </p>

              <h4 className="mb-2 font-medium text-foreground">Basic Commands</h4>
              <div className="space-y-2">
                <CommandCard command="gospider -s https://example.com" description="Crawl the site and print discovered URLs/paths" index={12} />
                <CommandCard command="gospider -s https://example.com -a" description="Crawl and gather URLs from 3rd-party sources (Archive.org, CommonCrawl, VirusTotal, AlienVault)" index={13} />
                <CommandCard command="gospider -s https://example.com -d 3" description="Crawl with recursion depth 3" index={14} />
                <CommandCard command="gospider -s https://example.com --subs" description="Crawl and include discovered subdomains" index={15} />
                <CommandCard command="gospider -s https://example.com --sitemap -d 2" description="Parse sitemap.xml and crawl with max depth 2" index={16} />
                <CommandCard command="gospider -s https://example.com -p http://127.0.0.1:8080" description="Crawl through an HTTP proxy" index={17} />
                <CommandCard command="gospider -s https://example.com/upload/ -d 3 --whitelist '/upload/'" description="Crawl only paths matching the whitelist" index={18} />
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/bb923374a47bf0276e8617d825024b2e0f93d4e3.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/bb923374a47bf0276e8617d825024b2e0f93d4e3.webp" alt="Gospider basic commands" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>

              <h4 className="mb-2 mt-6 font-medium text-foreground">Pro JS One‑Liners for Hunting Secrets</h4>
              <div className="space-y-2">
                <CommandCard command={`gospider -s https://example.com | grep -Eo 'https?://[^"'<>[:space:]]+' | sort -u`} description="Crawl domain, extract absolute URLs, sort & dedupe" index={19} />
                <CommandCard command={`gospider -s https://example.com -d 3 | grep '\\.js$' | grep -Eo 'https?://[^"'<>[:space:]]+'`} description="Crawl to depth 3, keep .js URLs, extract absolute URLs" index={20} />
                <CommandCard command={`gospider -s https://example.com | grep -Eo 'https?://[^"'<>[:space:]]+' | grep '\\.js$' | jsleaks -s -k`} description="Find JS file URLs and scan with jsleaks for secrets" index={21} />
                <CommandCard command={`gospider -s https://example.com | grep -Eo 'https?://[^"'<>[:space:]]+' | grep '\\.js$' | xargs -I{} bash -c 'echo -e "\\ntarget : {}\\n" && python lazyegg.py "{}" --js_urls --domains --ips --leaked_creds --local_storage'`} description="For each JS URL, run lazyegg to extract endpoints, domains, IPs, leaked creds" index={22} />
                <CommandCard command={`gospider -s https://example.com | grep -Eo 'https?://[^"'<>[:space:]]+' | grep '\\.js$' | nuclei -t credentials-disclosure-all.yaml -c 30`} description="Feed JS URLs into Nuclei to hunt for exposed credentials/tokens" index={23} />
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/methods/Rapid-bug-discovery/224e8ce9017d67e36f8cae4379ebbd253f218c6a.webp")}>
                <Image src="/images/methods/Rapid-bug-discovery/224e8ce9017d67e36f8cae4379ebbd253f218c6a.webp" alt="Gospider JS one-liners" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>

              <a
                href="https://github.com/jaeles-project/gospider"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500 hover:bg-violet-500/20"
              >
                <Github className="h-4 w-4" />
                github.com/jaeles-project/gospider
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-background to-cyan-500/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                This is the exact workflow I use to find bugs on any website in under five minutes. With the right mix of Shodan searches, automation scripts and scanning tools, you&apos;ll uncover vulnerabilities faster than ever. Remember, the goal isn&apos;t just to find bugs &mdash; it&apos;s to report them responsibly and keep the internet a safer place.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/coffinxp/scripts" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-500">
                  <Github className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-violet-500">CoffinXP Scripts</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Collection of bug hunting scripts — AlienVault, URLScan, VirusTotal, Waybackurls and more</p>
                </div>
              </a>
              <a href="https://github.com/1hehaq/shef" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-500">
                  <Terminal className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-violet-500">Shef</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Lightweight Go CLI for Shodan Facet extraction without an API key</p>
                </div>
              </a>
              <a href="https://github.com/coffinxp/GFpattren" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-500">
                  <Search className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-violet-500">GF Patterns</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Custom GF patterns for XSS, SQLi, IDOR, SSRF, Redirect and more</p>
                </div>
              </a>
              <a href="https://infosecwriteups.com/lostfuzzer-passive-url-fuzzing-nuclei-dast-for-bug-hunters-a33501b9563b" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-violet-500">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-violet-500">LostFuzzer Article</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Passive URL Fuzzing + Nuclei DAST for Bug Hunters — Medium write-up</p>
                </div>
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              This guide is for ethical use and authorized penetration testing only
            </p>
          </footer>
        </div>
      </main>

      {/* Lightbox Overlay */}
      {expandedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setExpandedImg(null)}
        >
          <button
            onClick={() => setExpandedImg(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white text-xl hover:bg-black/70"
          >
            ✕
          </button>
          <Image
            src={expandedImg}
            alt="Expanded view"
            width={1200}
            height={675}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
