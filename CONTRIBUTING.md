# Contributing to VULNEX

First off, thank you for considering contributing! Every payload, tool guide, and technique helps the security community.

## How to Contribute

### 1. Report Issues

- Bug reports: include the page URL, expected behavior, and what went wrong
- Feature requests: describe the new payload, tool, or technique you'd like added
- Security concerns: open an issue on GitHub

### 2. Add New Payloads or Tools

Payloads live in `lib/*-data.ts` files. Each file exports `categories` (array of `{category, commands[]}`) and optionally `tools` (array of `{name, url, description}`).

**Example — adding a new command to SQL Injection:**

```typescript
// lib/sql-injection-data.ts
{
  category: "Time-Based: MySQL",
  commands: [
    {
      command: "1' AND SLEEP(5)-- -",
      description: "Time-based blind SQLi detection",
    },
  ],
}
```

**Adding a new tool to `lib/tools-data.ts`:**

```typescript
{
  id: "my-tool",
  name: "My Tool",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Short description",
  installation: { title: "Installation", steps: [...], code: "..." },
  usage: { title: "Basic Usage", description: "...", code: "..." },
  commands: [{ command: "-flag", description: "What it does" }],
  whenToUse: ["Scenario 1", "Scenario 2"],
  notes: ["Note 1", "Note 2"],
  commonErrors: [{ error: "Error text", solution: "How to fix" }],
  tags: ["tag1", "tag2"],
}
```

Then create `app/tools/my-tool/page.tsx` following the existing tool page pattern.

**Adding to the Quick Recon Toolkit:**

Edit `lib/toolkit-data.ts` and add a new section to the `sections` array:

```typescript
{
  id: "my-section",
  icon: Zap, // lucide-react icon
  title: "My Section",
  color: "from-blue-500 to-indigo-500",
  subs: [
    {
      title: "Subcategory",
      items: [
        { name: "Tool Name", command: "command --flag", description: "What it does" },
      ],
    },
  ],
}
```

### 3. Development Setup

```bash
git clone https://github.com/adce626/VULNEX.git
cd VULNEX
pnpm install
pnpm run dev
```

### 4. Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server (Turbopack) |
| `pnpm run build` | Production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:e2e` | Run E2E tests (Playwright) |

### 5. Style Guide

- All UI text in **English**
- Use tailwind classes; prefer `cn()` from `@/lib/utils` for conditional styles
- New components go in `components/`
- New data files go in `lib/`
- Use shared components: `Breadcrumb`, `CommandCard`, `PageTitle`
- Use shared icon mappings from `lib/icon-map.ts`
- Run `pnpm run lint` before submitting

### 6. Pull Requests

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`
2. Commit with clear messages
3. Push and open a PR against `main`
4. Describe what the PR changes and why

### 7. Project Structure

```
app/                    — Pages and layouts
├── api/search/         — Search endpoint
├── toolkit/            — Quick Recon Toolkit
├── tools/              — Tool guide pages
└── ...

components/             — React components
├── ui/                 — shadcn/ui components
├── breadcrumb.tsx      — Shared breadcrumb
├── command-card.tsx     — Command display card
└── main-sidebar.tsx    — Navigation sidebar

lib/                    — Data and utilities
├── guides/             — Tool guide data
├── toolkit-data.ts     — Toolkit sections
├── icon-map.ts         — Shared icon mappings
└── *-data.ts           — Topic data files
```

## Code of Conduct

Be respectful. This project is for learning and ethical security research.
