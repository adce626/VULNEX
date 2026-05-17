"use client";

import { PageTitle } from "@/components/page-title";
import { useState } from "react";
import { MainSidebar } from "@/components/main-sidebar";
import { googleDorksData } from "@/lib/google-dorks-data";
import { Search, ExternalLink, Globe, ChevronDown, ChevronUp, AlertTriangle, Copy, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function GoogleDorksPage() {
  const [domain, setDomain] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    googleDorksData.map((cat) => cat.id)
  );
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedCategories(googleDorksData.map((cat) => cat.id));
  };

  const collapseAll = () => {
    setExpandedCategories([]);
  };

  const getProcessedQuery = (query: string) => {
    const targetDomain = domain.trim() || "example.com";
    return query.replace(/\{domain\}/g, targetDomain);
  };

  const openInGoogle = (query: string) => {
    const processedQuery = getProcessedQuery(query);
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(processedQuery)}`;
    window.open(googleUrl, "_blank");
  };

  const copyQuery = (query: string) => {
    const processedQuery = getProcessedQuery(query);
    navigator.clipboard.writeText(processedQuery);
    setCopiedQuery(query);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const totalDorks = googleDorksData.reduce((acc, cat) => acc + cat.dorks.length, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <PageTitle title="Google Dorks" />
      <MainSidebar />

      <main className="flex-1 lg:pl-64">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Google Dorks</h1>
                <p className="text-sm text-muted-foreground">
                  {totalDorks} dorks across {googleDorksData.length} categories
                </p>
              </div>

              {/* Domain Input */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:w-80">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter target domain (e.g., example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={expandAll}
                    className="border-border text-muted-foreground hover:text-foreground"
                  >
                    Expand All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={collapseAll}
                    className="border-border text-muted-foreground hover:text-foreground"
                  >
                    Collapse All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Warning Banner */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-500">Legal Disclaimer</p>
              <p className="text-sm text-yellow-500/80">
                Only use these dorks on domains you have explicit authorization to test. 
                Unauthorized reconnaissance may violate computer crime laws.
              </p>
            </div>
          </div>

          {/* Domain Status */}
          {!domain && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 p-4">
              <Search className="h-5 w-5 text-accent" />
              <p className="text-sm text-accent">
                Enter a domain above to customize all dork queries. Currently showing queries with <code className="rounded bg-accent/20 px-1.5 py-0.5 font-mono text-xs">example.com</code>
              </p>
            </div>
          )}

          {domain && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-4">
              <Check className="h-5 w-5 text-primary" />
              <p className="text-sm text-primary">
                All queries are now targeting <code className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs">{domain}</code>
              </p>
            </div>
          )}

          {/* Featured External Tool */}
          <div className="group relative mb-8 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">Deep Google Search</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">247 Dorks</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Comprehensive Google Dorks platform with <strong className="text-foreground">247 dorks</strong> across 14 categories — sensitive files, cloud storage, API endpoints, admin panels, mobile/IoT, crypto & more. Filter, search, and export your recon workspace.
                </p>
                <a
                  href="https://deep-shadow-wings-x.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-2"
                >
                  Open Deep Google Search
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {googleDorksData.map((category, catIndex) => (
              <div
                key={category.id}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {catIndex + 1}
                    </span>
                    <div>
                      <h2 className="font-semibold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {category.description} • {category.dorks.length} dorks
                      </p>
                    </div>
                  </div>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Dorks List */}
                {expandedCategories.includes(category.id) && (
                  <div className="border-t border-border">
                    {category.dorks.map((dork, dorkIndex) => (
                      <div
                        key={dorkIndex}
                        className={cn(
                          "group p-4 transition-colors hover:bg-secondary/30",
                          dorkIndex !== category.dorks.length - 1 && "border-b border-border/50"
                        )}
                      >
                        {dork.description && (
                          <p className="mb-2 text-sm text-muted-foreground">
                            {dork.description}
                          </p>
                        )}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <code className="flex-1 rounded-md bg-secondary/50 px-3 py-2 font-mono text-sm text-foreground break-all">
                            {getProcessedQuery(dork.command)}
                          </code>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyQuery(dork.command)}
                              className="border-border text-muted-foreground hover:text-foreground"
                            >
                              {copiedQuery === dork.command ? (
                                <>
                                  <Check className="mr-1.5 h-3.5 w-3.5 text-primary" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                                  Copy
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openInGoogle(dork.command)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              Search
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                onClick={() => openInGoogle(`site:${domain || "example.com"}`)}
                className="h-auto flex-col gap-2 border-border py-4 text-foreground hover:bg-secondary/50"
              >
                <Search className="h-5 w-5 text-primary" />
                <span>All Indexed Pages</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => openInGoogle(`site:${domain || "example.com"} filetype:pdf`)}
                className="h-auto flex-col gap-2 border-border py-4 text-foreground hover:bg-secondary/50"
              >
                <Search className="h-5 w-5 text-accent" />
                <span>Find PDFs</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => openInGoogle(`"${domain || "example.com"}" inurl:admin`)}
                className="h-auto flex-col gap-2 border-border py-4 text-foreground hover:bg-secondary/50"
              >
                <Search className="h-5 w-5 text-yellow-500" />
                <span>Admin Panels</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => openInGoogle(`site:github.com "${domain || "example.com"}"`)}
                className="h-auto flex-col gap-2 border-border py-4 text-foreground hover:bg-secondary/50"
              >
                <Search className="h-5 w-5 text-orange-500" />
                <span>GitHub Leaks</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
