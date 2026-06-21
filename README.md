```
██╗   ██╗██╗   ██╗██╗     ███╗   ██╗███████╗██╗  ██╗
██║   ██║██║   ██║██║     ████╗  ██║██╔════╝╚██╗██╔╝
██║   ██║██║   ██║██║     ██╔██╗ ██║█████╗   ╚███╔╝ 
╚██╗ ██╔╝██║   ██║██║     ██║╚██╗██║██╔══╝   ██╔██╗ 
 ╚████╔╝ ╚██████╔╝███████╗██║ ╚████║███████╗██╔╝ ██╗
  ╚═══╝   ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
```

<p align="center">
  <strong>Web Hacking Playbook — Bug Bounty Methodology, Payloads, Recon & Interactive Security Tools</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript" alt="TypeScript 5.7">
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss" alt="Tailwind v4">
  <img src="https://img.shields.io/badge/Radix_UI-shadcn/ui-white?logo=radixui" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT">
  <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm" alt="pnpm">
  <br>
  <a href="https://vulnex.vercel.app"><img src="https://img.shields.io/badge/LIVE_DEMO-vulnex.vercel.app-ff6b6b?logo=vercel&style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 📋 Table of Contents

- [What is VULNEX?](#what-is-vulnex)
- [Interactive Tools](#-interactive-tools)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Performance Features](#performance-features)
- [Stats](#-stats)
- [License](#license)

---

## 🎯 What is VULNEX?

A comprehensive platform for **security researchers**, **bug bounty hunters**, and **penetration testers**. Ready-to-use payloads, exploitation techniques, practical tools, quick checklists, and **interactive client-side analyzers** — all in one place.

No backend, no API calls — everything runs in your browser.

---

## 🛠 Interactive Tools

| Tool | Description | Tech |
|------|-------------|------|
| **JS Source Inspector** | Extract API keys, tokens, secrets, routes, and sensitive data from JavaScript source code. 150+ detection patterns, entropy scanning, obfuscation detection (array-based, control-flow flattening), risk scoring, comment-aware filtering, ignore with localStorage persistence. | `100% client-side · React · Web Crypto · Regex` |
| **JWT Debugger** | Decode, inspect, and verify JWT tokens. Supports HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512, EdDSA. PEM & JWK key import. Real-time verification. | `100% client-side · Web Crypto API · React` |

---

## 📚 Sections

| Section | Description |
|---------|-------------|
| **HOPE — Bug Bounty Guide** | Complete bug bounty methodology — mindset, recon, exploitation, WAF bypass, chaining, reporting. Includes "How I Deal with Bug Hunting" personal workflow |
| **Recon & OSINT** | Google Dorks, Shodan Dorks, GitHub Recon, Param Discovery |
| **Recon Toolkit** | 17 categories, 2700+ commands with domain auto-replace, copy-to-clipboard, theme toggle, and animations |
| **Web Vulnerabilities** | SQLi, XSS, SSRF, IDOR, CRLF, Open Redirect, Host Header Injection, 403 Bypass, Email Input Testing, JSON Privilege Escalation |
| **Tech-Specific** | IIS, Next.js, Swagger, API Fuzzing, Spring Boot |
| **Cloud & Assets** | AWS S3, Google API Keys |
| **Methods** | FFUF Techniques, Nuclei Templates, Rapid Bug Discovery |
| **Tools** | 104 tool guides — Burp Suite, Nuclei, ffuf, Nmap, Subfinder, Amass, SQLMap, and more |
| **WAF Bypass & PoCs** | SQLMap WAF evasion, IDOR & 403 bypass techniques |
| **Advanced Topics** | LLM Injection, Blind XSS, Rate Limit Bypass, Registration Vulns |
| **Payloads** | XSS, SQLi, SSTI, Deserialization, Command Injection, and more |
| **Browser Extensions** | 20+ curated extensions for bug hunting |

---

## 🧱 Tech Stack

```
Framework   →  Next.js 16 (App Router · Turbopack)  
Language    →  TypeScript 5.7 (strict mode)  
Styling     →  Tailwind CSS v4 + OKLCH colors  
UI Library  →  Radix UI + shadcn/ui (New York style)  
Icons       →  Lucide React  
Themes      →  Dark · Light · Neon  
Fonts       →  Inter (sans) · JetBrains Mono (mono)  
Testing     →  Vitest + Playwright  
CI/CD       →  GitHub Actions  
Deploy      →  Vercel  
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- pnpm (recommended) or npm

### Installation

```bash
git clone https://github.com/adce626/VULNEX.git
cd VULNEX
pnpm install
pnpm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Docker

```bash
docker compose up --build
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server (Turbopack) |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:e2e` | Run E2E tests (Playwright) |

---

## 📁 Project Structure

```
app/                          # Pages and layouts (App Router)
├── interactive/
│   ├── js-inspector/         ← JS Source Inspector tool
│   └── jwt-debugger/         ← JWT Debugger tool
├── api/search/               # Server-side search endpoint
├── toolkit/                  # Quick Recon Toolkit
├── tools/                    # 104 tool guide pages
├── vulnerabilities/          # Vulnerability methodology pages
├── recon/                    # Recon & OSINT pages
└── ...

components/                   # React components
├── ui/                       # shadcn/ui components (55+)
├── breadcrumb.tsx
├── command-card.tsx
├── content-layout.tsx
└── main-sidebar.tsx

lib/                          # Data and utilities
├── guides/                   # 104 tool guide data files
├── toolkit-data.ts           # Toolkit sections data
├── icon-map.ts               # Shared icon mappings
├── js-inspector-patterns.ts  # 150+ secret detection patterns
└── ...

hooks/                        # Custom React hooks
tests/                        # Unit and E2E tests
.github/workflows/            # CI/CD pipeline
```

---

## ⚡ Performance Features

- **IntersectionObserver lazy loading** — Sections fade in on scroll
- **React.memo** — Memoized components reduce re-renders
- **CSS variables** — Theme switching without re-render
- **3D card tilt** — Interactive hover effects
- **Cursor trail** — Animated cursor following (desktop only)
- **Floating particles** — Background particle system

---

## 📊 Stats

```
★ 150+  secret detection patterns (JS Inspector)
★ 104   tool guides
★ 2700+ recon commands
★ 55+   shadcn/ui components
★ 17    recon toolkit categories
★ 20+   browser extension recommendations
★ 3     themes (Dark · Light · Neon)
★ 100%  client-side interactive tools
```

---

<hr>

> [!WARNING]  
> vulnex is intended for educational and ethical hacking purposes only. It should only be used to test systems you own or have explicit permission to test. Unauthorized use of third-party websites or systems without consent is illegal and unethical.

---

## 📄 License

[MIT](LICENSE)

---


<br>

<p align="center">
<img src="https://github.com/user-attachments/assets/9ec3fed0-45ff-4cb3-988c-f8cd66e85082">
</p>

<br>
