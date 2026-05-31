# VULNEX — Web Hacking Playbook

A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists — all in one place.

## Live Demo

[https://vulnex.vercel.app](https://vulnex.vercel.app)

## Sections

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

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5.7 (strict mode)
- **Styling:** Tailwind CSS v4 + OKLCH colors
- **UI:** Radix UI + shadcn/ui (New York style) + Lucide React
- **Themes:** Dark, Light, Neon
- **Fonts:** Inter (sans), JetBrains Mono (mono)

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

```bash
docker compose up --build
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server (Turbopack) |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:e2e` | Run E2E tests (Playwright) |

## Project Structure

```
app/                    — Pages and layouts (App Router)
├── api/search/         — Server-side search endpoint
├── toolkit/            — Quick Recon Toolkit (interactive)
├── tools/              — 104 individual tool guide pages
├── vulnerabilities/    — Vulnerability methodology pages
├── recon/              — Recon & OSINT pages
└── ...

components/             — React components
├── ui/                 — shadcn/ui components (55+)
├── breadcrumb.tsx      — Shared breadcrumb component
├── command-card.tsx     — Command display card (memoized)
├── content-layout.tsx  — Content wrapper
└── main-sidebar.tsx    — Navigation sidebar

lib/                    — Data and utilities
├── guides/             — 104 tool guide data files
├── toolkit-data.ts     — Toolkit sections data
├── icon-map.ts         — Shared icon mappings
├── site-data.ts        — Navigation structure
├── search-index.ts     — Client-side search index
└── *-data.ts           — Topic-specific data files

hooks/                  — Custom React hooks
tests/                  — Unit and E2E tests
.github/workflows/      — CI/CD pipeline
```

## CI/CD

GitHub Actions runs automatically on push/PR to `main`:
- Lint check
- TypeScript build
- Unit tests (Vitest)

## Performance Features

- **IntersectionObserver lazy loading** — Sections fade in on scroll
- **React.memo** — Memoized components reduce re-renders
- **CSS variables** — Theme switching without re-render
- **3D card tilt** — Interactive hover effects
- **Cursor trail** — Animated cursor following (desktop only)
- **Floating particles** — Background particle system

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)

---

**For authorized security testing & CTF use only. Use responsibly.**
