"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useMemo, useRef, useEffect } from "react"
import { navigation } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  Search,
  Bug,
  Server,
  Cloud,
  Wrench,
  Brain,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Shield,
  Menu,
  X,
  ArrowRight,
  Puzzle,
  Bookmark,
  Sun,
  Moon,
  Siren,
  Keyboard,
} from "lucide-react"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  bug: <Bug className="h-4 w-4" />,
  server: <Server className="h-4 w-4" />,
  cloud: <Cloud className="h-4 w-4" />,
  wrench: <Wrench className="h-4 w-4" />,
  brain: <Brain className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
  puzzle: <Puzzle className="h-4 w-4" />,
  siren: <Siren className="h-4 w-4" />,
}

const allPages = [
  { title: "Recon Toolkit", href: "/toolkit", keywords: "toolkit,recon,command,generator,all-in-one,quick" },
  { title: "Google Dorks", href: "/recon/google-dorks", keywords: "google,search,dork,recon,osint" },
  { title: "Shodan Dorks", href: "/recon/shodan-dorks", keywords: "shodan,iot,recon,server,osint" },
  { title: "Param Discovery", href: "/recon/param-discovery", keywords: "param,parameter,discovery,fuzz,hidden" },
  { title: "GitHub Recon", href: "/recon/github-recon", keywords: "github,dork,secret,token,git,credential,leak" },
  { title: "IDOR & 403 Bypass", href: "/waf-bypass/idor", keywords: "idor,403,bypass,privilege,access control" },
  { title: "SQL Injection", href: "/vulnerabilities/sql-injection", keywords: "sql,sqli,database,injection,mysql,postgres" },
  { title: "SSRF", href: "/vulnerabilities/ssrf", keywords: "ssrf,server side,request forgery,internal,cloud" },
  { title: "WordPress", href: "/vulnerabilities/wordpress", keywords: "wordpress,cms,wp,plugin,theme" },
  { title: "Open Redirect", href: "/vulnerabilities/open-redirect", keywords: "redirect,open redirect,ssrf,phishing" },
  { title: "CRLF Injection", href: "/vulnerabilities/crlf-injection", keywords: "crlf,injection,http,response splitting,header" },
  { title: "Dependency Confusion", href: "/vulnerabilities/dependency-confusion", keywords: "dependency,confusion,npm,pypi,package,malicious" },
  { title: "Host Header Injection", href: "/vulnerabilities/host-header-injection", keywords: "host header,injection,cache,password reset" },
  { title: "403 Bypass", href: "/vulnerabilities/403-bypass", keywords: "403,forbidden,bypass,header,method" },
  { title: "Microsoft IIS", href: "/tech-specific/iis", keywords: "iis,microsoft,windows,asp,shortname" },
  { title: "Next.js", href: "/tech-specific/nextjs", keywords: "nextjs,middleware,cve,vercel" },
  { title: "Swagger XSS", href: "/tech-specific/swagger", keywords: "swagger,openapi,xss,documentation,api" },
  { title: "API Fuzzing", href: "/tech-specific/api-fuzzing", keywords: "api,fuzzing,ffuf,rest,graphql,endpoint" },
  { title: "Spring Boot", href: "/tech-specific/spring-boot", keywords: "spring,boot,java,actuator,heapdump" },
  { title: "S3 Buckets", href: "/cloud/s3-buckets", keywords: "s3,bucket,aws,cloud,storage,leak" },
  { title: "Google API Keys", href: "/cloud/google-api-keys", keywords: "google,api key,cloud,gcp" },
  { title: "FFUF Techniques", href: "/methods/ffuf", keywords: "ffuf,fuzz,web fuzz,directory,file" },
  { title: "Nuclei Templates", href: "/methods/nuclei-templates", keywords: "nuclei,template,yaml,scan,automation,custom" },
  { title: "Rapid Bug Discovery", href: "/methods/rapid-bug-discovery", keywords: "rapid,bug,discovery,shodan,automation,recon,uncover" },
  { title: "Fast XSS", href: "/tools/fast-xss", keywords: "xss,fast,gau,gf,gxss,kxss,dalfox,loxs,pipeline" },
  { title: "Subfinder", href: "/tools/subfinder", keywords: "subfinder,subdomain,recon,dns,passive" },
  { title: "Amass", href: "/tools/amass", keywords: "amass,subdomain,recon,dns,osint" },
  { title: "HTTPx", href: "/tools/httpx", keywords: "httpx,probe,http,alive,status" },
  { title: "Nuclei", href: "/tools/nuclei", keywords: "nuclei,scanner,vulnerability,yaml,template" },
  { title: "SQLMap", href: "/tools/sqlmap", keywords: "sqlmap,sqli,automation,database,injection" },
  { title: "XSStrike", href: "/tools/xsstrike", keywords: "xsstrike,xss,cross site,scanner" },
  { title: "Burp Suite", href: "/tools/burpsuite", keywords: "burp,proxy,intercept,repeater,scanner" },
  { title: "Nmap", href: "/tools/nmap", keywords: "nmap,port,scan,network,discovery" },
  { title: "Gobuster", href: "/tools/gobuster", keywords: "gobuster,directory,dns,bruteforce" },
  { title: "Hydra", href: "/tools/hydra", keywords: "hydra,bruteforce,password,login,authentication" },
  { title: "WhatWeb", href: "/tools/whatweb", keywords: "whatweb,fingerprinting,technology,recon,cms,framework" },
  { title: "WPScan", href: "/tools/wpscan", keywords: "wpscan,wordpress,cms,scanner,plugin,theme,vulnerability" },
  { title: "Dirsearch", href: "/tools/dirsearch", keywords: "dirsearch,directory,bruteforce,discovery,path,file" },
  { title: "John the Ripper", href: "/tools/john", keywords: "john,ripper,password,crack,hash,bruteforce" },
  { title: "Searchsploit", href: "/tools/searchsploit", keywords: "searchsploit,exploit,database,vulnerability,0day" },
  { title: "Hashcat", href: "/tools/hashcat", keywords: "hashcat,hash,crack,gpu,password" },
  { title: "Masscan", href: "/tools/masscan", keywords: "masscan,port,scan,network,fast" },
  { title: "Naabu", href: "/tools/naabu", keywords: "naabu,port,scan,network,fast" },
  { title: "Katana", href: "/tools/katana", keywords: "katana,crawl,spider,recon,endpoint" },
  { title: "GAU", href: "/tools/gau", keywords: "gau,url,wayback,history,endpoint" },
  { title: "Dalfox", href: "/tools/dalfox", keywords: "dalfox,xss,scanner,automation" },
  { title: "CloudFox", href: "/tools/cloudfox", keywords: "cloudfox,aws,cloud,enumeration" },
  { title: "JWT Tool", href: "/tools/jwt_tool", keywords: "jwt,token,json,web,attack,signature" },
  { title: "Arjun", href: "/tools/arjun", keywords: "arjun,param,parameter,discovery,http" },
  { title: "ParamSpider", href: "/tools/paramspider", keywords: "paramspider,param,parameter,recon" },
  { title: "X8", href: "/tools/x8", keywords: "x8,param,parameter,fuzz,hidden" },
  { title: "GF", href: "/tools/gf", keywords: "gf,pattern,grep,filter,xss,sqli,ssrf" },
  { title: "TruffleHog", href: "/tools/trufflehog", keywords: "trufflehog,secret,scan,git,credential,leak" },
  { title: "Browser Extensions", href: "/browser-extensions", keywords: "browser,extension,recon,debug,hack" },
  { title: "LLM Injection", href: "/advanced/llm-injection", keywords: "llm,ai,prompt,gpt,injection" },
  { title: "Blind XSS Advanced", href: "/advanced/blind-xss", keywords: "blind xss,bxss,xss,cross site" },
  { title: "Blind XSS PasteJacking", href: "/advanced/blind-xss-pastejacking", keywords: "pastejacking,clipboard,xss,blind,paste,html" },
  { title: "Registration Vulns", href: "/advanced/registration-vulns", keywords: "registration,signup,bypass,otp,xss,rate limit,duplicate" },
  { title: "Rate Limit Bypass", href: "/advanced/rate-limit-bypass", keywords: "rate,limit,bypass,ip,spoof,proxy,header,rotate" },
  { title: "Auth & Session Vulns", href: "/auth-session", keywords: "auth,session,jwt,cookie,token,fixation,logout" },
  { title: "Email Input Testing", href: "/vulnerabilities/email-input-testing", keywords: "email,xss,ssrf,header,injection,sqli,rfc822,validation" },
  { title: "WAF Bypass & PoCs", href: "/waf-bypass", keywords: "waf,bypass,poc,firewall,idor" },
  { title: "WAF SQLMap", href: "/waf-bypass/sqlmap", keywords: "waf,sqlmap,sqli,bypass,tamper" },
  { title: "403 Header Payloads", href: "/payloads/403-header-payloads", keywords: "403,bypass,header,payload,cloud" },
  { title: "SSRF Payloads", href: "/payloads/ssrf", keywords: "ssrf,payload,cloud,metadata,gopher" },
  { title: "SSTI Payloads", href: "/payloads/ssti", keywords: "ssti,template,injection,jinja2,payload" },
  { title: "XML Paths", href: "/payloads/xml-paths", keywords: "xml,path,traversal,lfi,java" },
  { title: "SQLi Payloads", href: "/payloads/sqli", keywords: "sqli,sql,injection,database,payload" },
  { title: "XOR SQLi Payloads", href: "/payloads/xor-sqli", keywords: "xor,sqli,time,blind,injection" },
  { title: "403 URL Payloads", href: "/payloads/403-url-payloads", keywords: "403,url,bypass,encoding,path" },
  { title: "CRLF Payloads", href: "/payloads/crlf", keywords: "crlf,injection,header,response,payload" },
  { title: "XSS WAF Bypass Payloads", href: "/payloads/xss-waf-bypass", keywords: "xss,waf,bypass,cross site,payload" },
  { title: "XSS Payloads", href: "/payloads/xss", keywords: "xss,cross site,script,payload,injection" },
  { title: "Bookmarks", href: "/bookmarks", keywords: "bookmark,saved,favorite,star" },
  { title: "ffuf", href: "/tools/ffuf", keywords: "ffuf,fuzz,fuzzer,directory,discovery" },
  { title: "Assetfinder", href: "/tools/assetfinder", keywords: "assetfinder,subdomain,passive,recon,tomnomnom" },
  { title: "Findomain", href: "/tools/findomain", keywords: "findomain,subdomain,fast,recon,rust" },
  { title: "Sublist3r", href: "/tools/sublist3r", keywords: "sublist3r,subdomain,recon,enumeration,python" },
  { title: "dnsx", href: "/tools/dnsx", keywords: "dnsx,dns,query,resolve,projectdiscovery" },
  { title: "Massdns", href: "/tools/massdns", keywords: "massdns,dns,resolver,bulk,high-performance" },
  { title: "Puredns", href: "/tools/puredns", keywords: "puredns,dns,resolve,wildcard,bruteforce" },
  { title: "Rustscan", href: "/tools/rustscan", keywords: "rustscan,port,scanner,fast,rust" },
  { title: "Feroxbuster", href: "/tools/feroxbuster", keywords: "feroxbuster,content,discovery,bruteforce,rust" },
  { title: "Wfuzz", href: "/tools/wfuzz", keywords: "wfuzz,fuzzer,content,discovery,python" },
  { title: "Waybackurls", href: "/tools/waybackurls", keywords: "waybackurls,urls,archive,recon,tomnomnom" },
  { title: "Gauplus", href: "/tools/gauplus", keywords: "gauplus,urls,wayback,recon,gau" },
  { title: "Hakrawler", href: "/tools/hakrawler", keywords: "hakrawler,crawl,endpoint,recon,hakluke" },
  { title: "xnLinkFinder", href: "/tools/xnlinkfinder", keywords: "xnlinkfinder,js,endpoint,link,recon" },
  { title: "GetJS", href: "/tools/getjs", keywords: "getjs,javascript,extract,recon" },
  { title: "SubJS", href: "/tools/subjs", keywords: "subjs,javascript,extract,recon,subdomain" },
  { title: "SecretFinder", href: "/tools/secretfinder", keywords: "secretfinder,js,secret,apikey,recon" },
  { title: "Gowitness", href: "/tools/gowitness", keywords: "gowitness,screenshot,visual,recon,sensepost" },
  { title: "Aquatone", href: "/tools/aquatone", keywords: "aquatone,screenshot,visual,recon,web" },
  { title: "Wafw00f", href: "/tools/wafw00f", keywords: "wafw00f,waf,firewall,fingerprint,python" },
  { title: "S3Scanner", href: "/tools/s3scanner", keywords: "s3scanner,s3,aws,bucket,cloud,scanner" },
  { title: "Recon-ng", href: "/tools/recon-ng", keywords: "recon-ng,recon,framework,osint,python" },
  { title: "SpiderFoot", href: "/tools/spiderfoot", keywords: "spiderfoot,osint,threat,intelligence,automation" },
  { title: "Photon", href: "/tools/photon", keywords: "photon,crawler,osint,recon,python,s0md3v" },
  { title: "GitLeaks", href: "/tools/gitleaks", keywords: "gitleaks,secret,git,leak,detection" },
  { title: "Holehe", href: "/tools/holehe", keywords: "holehe,email,osint,recon,python" },
  { title: "Maigret", href: "/tools/maigret", keywords: "maigret,osint,username,social,recon" },
  { title: "IntelX", href: "/tools/intelx", keywords: "intelx,intelligence,osint,darknet,search" },
  { title: "Maltego", href: "/tools/maltego", keywords: "maltego,osint,link,analysis,graph,visualization" },
  { title: "Gospider", href: "/tools/gospider", keywords: "gospider,crawl,spider,endpoint" },
  { title: "CeWL", href: "/tools/cewl", keywords: "cewl,wordlist,crawl,password" },
  { title: "KiteRunner", href: "/tools/kiterunner", keywords: "kiterunner,api,discovery,endpoint,jwt" },
  { title: "Nikto", href: "/tools/nikto", keywords: "nikto,scanner,vulnerability,web,server" },
  { title: "theHarvester", href: "/tools/theharvester", keywords: "theharvester,osint,email,subdomain,recon" },
  { title: "Metasploit", href: "/tools/metasploit", keywords: "metasploit,exploit,framework,payload,msf" },
  { title: "DNSRecon", href: "/tools/dnsrecon", keywords: "dnsrecon,dns,enumeration,recon,subdomain" },
  { title: "Sherlock", href: "/tools/sherlock", keywords: "sherlock,osint,username,social,recon" },
  { title: "Payloads Library", href: "/payloads", keywords: "payload,xss,sqli,ssti,lfi,injection,exploit" },
  { title: "HOPE — Mindset & Roadmap", href: "/Hope", keywords: "hope,mindset,roadmap,hunter,beginner,growth" },
  { title: "All Sections", href: "/all", keywords: "all,index,overview,sections,browse" },
]

export function MainSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([
  ])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.setAttribute("data-sidebar-collapsed", collapsed ? "true" : "false")
  }, [collapsed])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === "Escape") {
        setMobileOpen(false)
      }
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        setShortcutsOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return allPages.filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.keywords.includes(query)
    ).slice(0, 8)
  }, [searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.length > 0)
  }

  const handleFocus = () => {
    if (searchQuery.length > 0) {
      setShowResults(true)
    }
  }

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowResults(false)
    }
  }

  const handleResultClick = (href: string) => {
    router.push(href)
    setSearchQuery("")
    setShowResults(false)
    setMobileOpen(false)
  }

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
          <Shield className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <Link href="/" className="text-sm font-bold text-foreground block truncate">
              VULNEX
            </Link>
            <p className="text-xs text-muted-foreground truncate">Web Hacking Playbook</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4 relative">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search pages and tools"
          />
          <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground sm:block">
            /
          </kbd>
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 mt-1 rounded-lg border border-border bg-card shadow-lg">
            {searchResults.map((result) => (
              <button
                key={result.href}
                onClick={() => handleResultClick(result.href)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted"
                aria-label={`Go to ${result.title}`}
              >
                <span>{result.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {showResults && searchResults.length === 0 && searchQuery && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 mt-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
            No results for &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
      )}

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-1 overflow-y-auto pb-4", collapsed ? "px-2" : "px-3")}>
        {navigation.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              aria-expanded={expandedSections.includes(section.title)}
              title={collapsed ? section.title : undefined}
              className={cn(
                "flex w-full items-center rounded-lg py-2 text-sm font-medium transition-colors",
                collapsed ? "justify-center px-2" : "justify-between px-3",
                isActive(section.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                {iconMap[section.icon]}
                {!collapsed && section.title}
              </span>
              {!collapsed && section.items && (
                <span className="text-muted-foreground">
                  {expandedSections.includes(section.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              )}
            </button>
            {section.items && expandedSections.includes(section.title) && !collapsed && (
              <div className="mt-1 space-y-1 pl-4">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                      {item.title}
                    </span>
                    {item.tag && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-xs",
                          item.tag === "New"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.tag}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
          ))}
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-border", collapsed ? "p-2" : "p-4")}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <p className="text-center text-xs text-muted-foreground">
              For ethical use only
            </p>
          )}
          <div className={cn("flex items-center", collapsed ? "flex-col gap-1" : "gap-1")}>
              <button
                onClick={() => {
                  const order = ["dark", "light", "neon"]
                  const idx = order.indexOf(theme || "dark")
                  setTheme(order[(idx + 1) % order.length])
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-amber-400 hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && theme === "neon" ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" />
                    <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z" />
                    <path d="M12 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
                  </svg>
                ) : mounted && theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShortcutsOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                aria-label="Keyboard shortcuts"
                title="Keyboard shortcuts"
              >
                <Keyboard className="h-4 w-4" />
              </button>
              <Link
                href="/bookmarks"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                aria-label="Bookmarks"
              >
                <Bookmark className="h-4 w-4" />
              </Link>
          </div>
        </div>
      </div>
      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-card text-foreground shadow-lg lg:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-card transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className={cn("fixed left-0 top-0 z-30 hidden h-full flex-col border-r border-border bg-card lg:flex transition-all duration-300", collapsed ? "w-16" : "w-64")}>
        <SidebarContent />
      </aside>
    </>
  )
}