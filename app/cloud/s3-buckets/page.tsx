"use client"

import { useState } from "react"
import Image from "next/image"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import {
  HardDrive, Terminal, ChevronRight, ExternalLink,
  Search, Shield, Globe, Github, BookOpen, FileText, Video,
  Cloud, FolderSearch, Lock, Zap,
} from "lucide-react"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "manual-methods", label: "Manual Methods" },
  { id: "google-dorking", label: "Google Dorking" },
  { id: "automation-tools", label: "Automation Tools" },
  { id: "js-extraction", label: "JS Extraction" },
  { id: "brute-forcing", label: "Brute-Forcing" },
  { id: "github-oss", label: "GitHub & OSINT" },
  { id: "aws-cli", label: "AWS CLI" },
  { id: "exploitation", label: "Exploitation" },
]

export default function S3BucketsPage() {
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
      pageTitle="S3 Buckets"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Cloud & Assets", href: "/cloud" },
        { label: "S3 Buckets" },
      ]}
      hero={{
        icon: HardDrive,
        title: "S3 Bucket Recon — Finding Exposed AWS Buckets Like a Pro!",
        description: "A Step-by-Step Guide to Identifying and Exploiting Misconfigured AWS Buckets",
        stats: [
          { label: "16 Techniques", className: "bg-primary/10 text-primary" },
          { label: "40+ Commands", className: "bg-accent/10 text-accent" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-accent/10 via-background to-primary/5",
        iconBg: "bg-accent/10 text-accent",
        image: { src: "/images/cloud/s3-buckets/1_lrpLawRfabEFg9VYyfDcRg.webp", alt: "S3 Bucket Recon hero" },
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-accent text-accent-foreground"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
    >

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Amazon S3 (Simple Storage Service) is one of the most widely used cloud storage solutions, but misconfigurations can lead to serious security vulnerabilities. In this guide we&apos;ll explore how to audit S3 environments, uncover exposed buckets, analyze permissions and mitigate security risks. Using AWS tools and open-source scanners you&apos;ll learn to identify vulnerabilities before they become threats.
            </p>
            <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">What is S3 Bucket Reconnaissance?</h3>
            <p className="text-muted-foreground leading-relaxed">
              S3 bucket reconnaissance refers to the process of identifying and investigating publicly accessible or misconfigured AWS S3 buckets that may expose sensitive data. Developers or security professionals can use these techniques to help organizations secure their cloud storage.
            </p>
          </section>

          {/* Manual Methods */}
          <section id="manual-methods" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">Manual Methods for Identifying S3 Buckets</h2>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using Browser URL Inspection</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              One of the simplest ways to check if a website is hosted on AWS is by entering the following in the browser URL bar:
            </p>
            <CommandCard command="%c0" description="Check if site is hosted on AWS via URL bar" index={1} />
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_axzR338K5l1mDnumW6ok1A.webp")}>
              <Image src="/images/cloud/s3-buckets/1_axzR338K5l1mDnumW6ok1A.webp" alt="Browser URL inspection" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Checking the Source Code</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Inspect the website source code and search for &ldquo;s3&rdquo; to find any hidden S3 bucket URLs. If you find any, just open and check if bucket listing is enabled.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_u2BV1WXL_Wd1lLShGHjIHg.webp")}>
                <Image src="/images/cloud/s3-buckets/1_u2BV1WXL_Wd1lLShGHjIHg.webp" alt="Source code inspection 1" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_DYHbnF5fK2XKvOd2PbkR6g.webp")}>
                <Image src="/images/cloud/s3-buckets/1_DYHbnF5fK2XKvOd2PbkR6g.webp" alt="Source code inspection 2" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>
          </section>

          {/* Google Dorking */}
          <section id="google-dorking" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Google Dorking for AWS S3 Buckets</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Google dorking helps uncover exposed S3 buckets. Use the following dorks to find open S3 buckets:
            </p>
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Google Dorks</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`site:s3.amazonaws.com "target.com"
site:*.s3.amazonaws.com "target.com"
site:s3-external-1.amazonaws.com "target.com"
site:s3.dualstack.us-east-1.amazonaws.com "target.com"
site:amazonaws.com inurl:s3.amazonaws.com 
site:s3.amazonaws.com intitle:"index of"  
site:s3.amazonaws.com inurl:".s3.amazonaws.com/"  
site:s3.amazonaws.com intitle:"index of" "bucket"
(site:*.s3.amazonaws.com OR site:*.s3-external-1.amazonaws.com OR site:*.s3.dualstack.us-east-1.amazonaws.com OR site:*.s3.ap-south-1.amazonaws.com) "target.com"`}</code></pre>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              If bucket listing is enabled you&apos;ll be able to view the entire directory and its files. If you see an &ldquo;Access Denied&rdquo; message it means the bucket is private.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Automating Google Dorking with DorkEye</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              DorkEye automates Google dorking making reconnaissance faster by quickly extracting multiple AWS URLs for analysis.
            </p>
            <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_w8ZEJbOwDBu5cxddc4B8Sw.webp")}>
              <Image src="/images/cloud/s3-buckets/1_w8ZEJbOwDBu5cxddc4B8Sw.webp" alt="DorkEye tool" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <a href="https://github.com/BullsEye0/dorks-eye" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
              <Github className="h-4 w-4" /> BullsEye0/dorks-eye <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Automation Tools */}
          <section id="automation-tools" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">Automation Tools for S3 Enumeration</h2>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Using S3Misconfig for Fast Bucket Enumeration</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                S3Misconfig scans a list of URLs for open S3 buckets with listing enabled and saves the results in a user friendly HTML format for easy review.
              </p>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_wx_5hm39q3F5lqpSe_im5Q.webp")}>
                <Image src="/images/cloud/s3-buckets/1_wx_5hm39q3F5lqpSe_im5Q.webp" alt="S3Misconfig results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a href="https://github.com/Atharv834/S3BucketMisconf" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
                <Github className="h-4 w-4" /> Atharv834/S3BucketMisconf <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Finding S3 Buckets with HTTPX and Nuclei</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Use the HTTPX command along with the Nuclei tool to quickly identify all S3 buckets across subdomains.
              </p>
              <div className="space-y-2">
                <CommandCard command="subfinder -d target.com -all -silent | httpx-toolkit -sc -title -td | grep 'Amazon S3'" description="Find S3 buckets with subfinder + httpx" index={2} />
                <CommandCard command="subfinder -d target.com -all -silent | nuclei -t /home/coffinxp/.local/nuclei-templates/http/technologies/s3-detect.yaml" description="Mass S3 detection with Nuclei" index={3} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_NmnvzSXA1uUfssFBUkIKWA.webp")}>
                  <Image src="/images/cloud/s3-buckets/1_NmnvzSXA1uUfssFBUkIKWA.webp" alt="HTTPX S3 detection" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
                </div>
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_qTQ4DK9CyfSLcMWcFUmzaA.webp")}>
                  <Image src="/images/cloud/s3-buckets/1_qTQ4DK9CyfSLcMWcFUmzaA.webp" alt="Nuclei S3 detection" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
                </div>
              </div>
            </div>
          </section>

          {/* JS Extraction */}
          <section id="js-extraction" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 4</span>
                <h2 className="text-2xl font-bold text-foreground">Extracting S3 URLs from JavaScript Files</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Next we&apos;ll use the Katana tool to download JavaScript files from target subdomains and extract S3 URLs:
            </p>
            <CommandCard command={`katana -u https://site.com/ -d 5 -jc | grep '\\.js$' | tee alljs.txt`} description="Crawl and collect JS file URLs" index={4} />
            <CommandCard command={`cat alljs.txt | xargs -I {} curl -s {} | grep -oE 'http[s]?://[^"]*\\.s3\\.amazonaws\\.com[^" ]*' | sort -u`} description="Extract S3 URLs from JS files" index={5} />
            <a href="https://github.com/projectdiscovery/katana" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
              <Github className="h-4 w-4" /> projectdiscovery/katana <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Using java2s3 Tool</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Alternatively, use this powerful approach to extract all S3 URLs from JavaScript files of subdomains. First combine Subfinder and HTTPX to generate the final list of subdomains then run the java2s3 tool:
            </p>
            <div className="space-y-2">
              <CommandCard command="subfinder -d target.com -all -silent | httpx-toolkit -o file.txt" description="Generate subdomain list" index={6} />
              <CommandCard command="cat file.txt | grep -oP '(?<=https?://).*' >input.txt" description="Clean URLs to input format" index={7} />
              <CommandCard command="python java2s3.py input.txt target.com output.txt" description="Extract S3 URLs from JS files" index={8} />
              <CommandCard command='cat output3.txt | grep -E "S3 Buckets: [^]]+"' description="Filter S3 bucket results" index={9} />
              <CommandCard command='cat output.txt | grep -oP "https?://[a-zA-Z0-9.-]*s3(\\.dualstack)?\\.ap-[a-z0-9-]+\\.amazonaws\\.com/[^\\s\"<>]+" | sort -u' description="Extract unique S3 URLs" index={10} />
              <CommandCard command='cat output3.txt | grep -oP "([a-zA-Z0-9.-]+\\.s3(\\.dualstack)?\\.[a-z0-9-]+\\.amazonaws\\.com)" | sort -u' description="Extract S3 domains" index={11} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_mFDGZ-qIqJ5yfndI5OTsJQ.webp")}>
                <Image src="/images/cloud/s3-buckets/1_mFDGZ-qIqJ5yfndI5OTsJQ.webp" alt="java2s3 step 1" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_0j06i80VcXoHABAhFRzufw.webp")}>
                <Image src="/images/cloud/s3-buckets/1_0j06i80VcXoHABAhFRzufw.webp" alt="java2s3 step 2" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_pqC9rKvaQFug_EWxV6ucKg.webp")}>
                <Image src="/images/cloud/s3-buckets/1_pqC9rKvaQFug_EWxV6ucKg.webp" alt="java2s3 step 3" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              After this you can use the S3Misconfig tool to identify publicly accessible S3 buckets with listing enabled by sending all these S3 URLs to the tool.
            </p>
            <a href="https://github.com/mexploit30/java2s3" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
              <Github className="h-4 w-4" /> mexploit30/java2s3 <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Brute-Forcing */}
          <section id="brute-forcing" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FolderSearch className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 5</span>
                <h2 className="text-2xl font-bold text-foreground">Brute-Forcing S3 Bucket Names</h2>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Using LazyS3</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                LazyS3 is a brute force tool for AWS S3 buckets using different permutations. Run the following command by specifying the target:
              </p>
              <CommandCard command="ruby lazys3.rb <COMPANY>" description="Brute-force S3 bucket names" index={12} />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_iUwhnIahsqxHtjktldmvYw.webp")}>
                <Image src="/images/cloud/s3-buckets/1_iUwhnIahsqxHtjktldmvYw.webp" alt="LazyS3 results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a href="https://github.com/nahamsec/lazys3" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
                <Github className="h-4 w-4" /> nahamsec/lazys3 <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Using CeWL + S3Scanner</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Use CeWL to generate a custom wordlist from the target domain. Then run S3Scanner with the list to identify valid and invalid S3 buckets.
              </p>
              <div className="space-y-2">
                <CommandCard command="cewl https://site.com/ -d 3 -w file.txt" description="Generate custom wordlist from target" index={13} />
                <CommandCard command="s3scanner -bucket-file file.txt -enumerate -threads 10 | grep -aE 'AllUsers: \\[.*(READ|WRITE|FULL).*\\]'" description="Scan and filter public buckets" index={14} />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_rdvGquu0uRpw_cBh_KJgIA.webp")}>
                <Image src="/images/cloud/s3-buckets/1_rdvGquu0uRpw_cBh_KJgIA.webp" alt="CeWL + S3Scanner results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
              <a href="https://github.com/sa7mon/S3Scanner" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
                <Github className="h-4 w-4" /> sa7mon/S3Scanner <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </section>

          {/* GitHub & OSINT */}
          <section id="github-oss" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Cloud className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 6</span>
                <h2 className="text-2xl font-bold text-foreground">GitHub & OSINT Discovery</h2>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Extracting S3 Buckets from GitHub Repositories</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Use GitHub dorks to find AmazonAWS results in public repositories. Check S3 URLs for bucket listings and verify access with AWS CLI.
              </p>
              <div className="mb-6 rounded-lg border border-border bg-muted p-3">
                <pre className="text-sm text-foreground"><code>{`org:target "amazonaws"
org:target "bucket_name" 
org:target "aws_access_key"
org:target "aws_access_key_id"
org:target "aws_key"
org:target "aws_secret"
org:target "aws_secret_key"
org:target "S3_BUCKET"`}</code></pre>
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_woVUKNX5FuHbmh-rI2tbfg.webp")}>
                <Image src="/images/cloud/s3-buckets/1_woVUKNX5FuHbmh-rI2tbfg.webp" alt="GitHub dork results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Websites for Public S3 Bucket Discovery</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Use these websites to search for files in public AWS buckets by keyword. Download and inspect the contents and if you find any sensitive files report them responsibly:
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <a href="https://buckets.grayhatwarfare.com/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-accent/50">
                  <Globe className="h-3 w-3" /> GrayHatWarfare
                </a>
                <a href="https://osint.sh/buckets/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-accent/50">
                  <Globe className="h-3 w-3" /> OSINT.sh Buckets
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_MJsAyjGQVWQE0UD-j9tlzg.webp")}>
                <Image src="/images/cloud/s3-buckets/1_MJsAyjGQVWQE0UD-j9tlzg.webp" alt="Public bucket search websites" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Finding Hidden S3 URLs with Extensions</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                The S3BucketList Chrome extension scans web pages for exposed S3 URLs, helping researchers quickly identify misconfigured buckets without manually inspecting the source code.
              </p>
              <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_Q2kWnYn7eaZUjFn_91Vv9g.webp")}>
                <Image src="/images/cloud/s3-buckets/1_Q2kWnYn7eaZUjFn_91Vv9g.webp" alt="S3BucketList Chrome extension" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>
          </section>

          {/* AWS CLI */}
          <section id="aws-cli" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 7</span>
                <h2 className="text-2xl font-bold text-foreground">AWS S3 Bucket Listing & File Management</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Easily manage AWS S3 buckets with these AWS CLI commands. These commands help security researchers, penetration testers and cloud administrators list, copy, delete and download files for efficient storage management and security assessments.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Reading Files</h3>
            <CommandCard command="aws s3 ls s3://[bucketname] --no-sign-request" description="List bucket contents without signing" index={15} />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Recursively List All Files</h3>
            <CommandCard command="aws s3 ls s3://[bucketname] --no-sign-request --recursive --human-readable" description="Recursive listing in human-readable format" index={16} />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Identify Potentially Sensitive Files</h3>
            <div className="space-y-2">
              <CommandCard command={`aws s3 ls s3://[bucketname] --no-sign-request --recursive | grep -E '\\.env|\\.pem|\\.key|\\.json|\\.yml|\\.yaml|\\.config|config\\.php|\\.ini|\\.sql|\\.db|\\.log|\\.backup|\\.bkp|\\.crt|\\.cert|\\.pfx|\\.p12|\\.keystore|id_rsa|id_dsa|\\.passwd|\\.htpasswd|\\.htaccess|\\.csv|\\.xlsx|\\.docx|\\.pdf'`} description="Find sensitive file types" index={17} />
              <CommandCard command={`aws s3 ls s3://[bucketname] --no-sign-request --recursive | grep -E '\\.(env|pem|key|json|yml|yaml|config|php|ini|sql|db|log|backup|bkp|crt|cert|pfx|p12|keystore|rsa|dsa|passwd|htpasswd|htaccess|csv|xlsx|xls|docx|doc|pdf|pptx|ppt|md|txt|bak|old|orig|swp|tar|zip|rar|7z|gz|tgz|enc|sh|ps1|bat|exe|dll|class|jar|war|jsp|asp|php|py|rb|cgi|pl|cfm|aspx|vb|vbs|c|cpp|h|cs|swift|go|rs|log|session|token|auth|access|secret|private|ssh|gpg|pgp|kdbx|wallet|dat|sqlite|ldb|ndjson|nd|out|pid|dump|tar\\.gz|tar\\.bz2|zipx|xz|bak\\.gz)'`} description="Extended sensitive file discovery" index={18} />
            </div>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Copying Files</h3>
            <CommandCard command="aws s3 cp file.txt s3://[bucketname] --no-sign-request" description="Upload a file to the bucket" index={19} />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Deleting Files</h3>
            <CommandCard command="aws s3 rm s3://[bucketname]/file.txt --no-sign-request" description="Delete a file from the bucket" index={20} />

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Downloading All Files</h3>
            <CommandCard command="aws s3 cp s3://[bucketname]/ ./ --recursive --no-sign-request" description="Download entire bucket contents" index={21} />

            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/cloud/s3-buckets/1_0Lzdbdr9MJj7ciuSjj8UWQ.webp")}>
              <Image src="/images/cloud/s3-buckets/1_0Lzdbdr9MJj7ciuSjj8UWQ.webp" alt="AWS CLI bucket management" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <p className="mt-4 text-sm text-amber-400">
              Buckets with &ldquo;Full Control&rdquo; permission allow file uploads and deletions which could lead to security risks. Always follow responsible disclosure policies when reporting vulnerabilities.
            </p>
          </section>

          {/* Exploitation & Security */}
          <section id="exploitation" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Phase 8</span>
                <h2 className="text-2xl font-bold text-foreground">Securing S3 Buckets</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Organizations should follow best practices to prevent unauthorized access:
            </p>
            <ul className="mb-6 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
                <span><strong className="text-foreground">Enable bucket policies</strong> and restrict access.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
                <span><strong className="text-foreground">Disable public ACLs</strong> unless necessary.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
                <span><strong className="text-foreground">Monitor logs</strong> using AWS CloudTrail.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
                <span><strong className="text-foreground">Implement encryption</strong> for sensitive data.</span>
              </li>
            </ul>

            <p className="mb-4 text-sm text-muted-foreground">
              You can also watch this video where I showed the complete practical of this method:
            </p>
            <a href="https://youtu.be/LEFikziGL6s?si=3UeYFT80PqoJ3MnB" target="_blank" rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
              <Video className="h-4 w-4" /> Watch Practical Demo <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Conclusion */}
          <section className="scroll-mt-24">
            <div className="rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 via-background to-primary/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                S3 bucket reconnaissance is essential for ethical hackers and security professionals. Identifying and securing misconfigured buckets helps organizations strengthen their cloud security and prevent data leaks.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-accent">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/nahamsec/lazys3" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><FolderSearch className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">LazyS3</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">AWS S3 bucket brute-forcing tool</p>
                </div>
              </a>
              <a href="https://github.com/sa7mon/S3Scanner" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><HardDrive className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">S3Scanner</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Scan for open AWS S3 buckets</p>
                </div>
              </a>
              <a href="https://github.com/mexploit30/java2s3" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><FileText className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">java2s3</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Extract S3 URLs from JavaScript files</p>
                </div>
              </a>
              <a href="https://github.com/Atharv834/S3BucketMisconf" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><Shield className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">S3BucketMisconf</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Scan URLs for open S3 buckets with HTML reporting</p>
                </div>
              </a>
              <a href="https://buckets.grayhatwarfare.com/" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><Globe className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">GrayHatWarfare</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Search public AWS buckets by keyword</p>
                </div>
              </a>
              <a href="https://osint.sh/buckets/" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent"><Search className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-accent">OSINT.sh Buckets</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Public bucket search engine</p>
                </div>
              </a>
            </div>
          </section>

    </ContentLayout>
  )
}
