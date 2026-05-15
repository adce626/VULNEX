# VULNEX — Web Hacking Playbook

A comprehensive platform for security researchers and bug hunters. Ready-to-use payloads, exploitation techniques, practical tools, and quick checklists — all in one place.

## Sections

| Section | Description |
|---------|-------------|
| **Recon & OSINT** | Google Dorks, Shodan Dorks, Param Discovery |
| **Web Vulnerabilities** | SQLi, XSS, SSRF, IDOR, CRLF, Open Redirect, 403 Bypass |
| **Tech-Specific** | IIS, Next.js, Swagger, API Fuzzing, Spring Boot |
| **Cloud & Assets** | AWS S3, Google API Keys |
| **Tools & Methods** | Burp Suite, Nuclei, ffuf, Nmap, Subfinder, Amass, and more |
| **WAF Bypass & PoCs** | SQLMap WAF evasion, IDOR & 403 bypass techniques |
| **Advanced Topics** | LLM Injection, Blind XSS |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + OKLCH colors
- **UI:** Radix UI + shadcn/ui + Lucide React
- **Fonts:** Inter (sans), JetBrains Mono (mono)

## Getting Started

```bash
git clone https://github.com/adce626/VULNEX.git
cd VULNEX
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> After editing files, delete `.next/` cache and restart dev server to avoid 404 / ChunkLoadError:
> ```bash
> rm -rf .next && npm run dev
> ```

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/            — Pages and layouts
components/     — React components (sidebar, cards, modals)
lib/            — Data files (tools, payloads, navigation)
hooks/          — Custom React hooks
public/         — Static assets (deleted; favicon is inline SVG)
```

## License

[MIT](LICENSE)

---

**For authorized security testing & CTF use only. Use responsibly.**
