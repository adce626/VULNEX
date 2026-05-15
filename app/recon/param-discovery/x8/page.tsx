"use client"

import { useState } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { CommandCard } from "@/components/command-card"
import {
  Home,
  ChevronRight,
  Download,
  Terminal,
  Command,
  Clock,
  FileText,
  AlertTriangle,
  Check,
} from "lucide-react"
import Link from "next/link"

export default function X8Page() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/recon" className="hover:text-foreground">Recon</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/recon/param-discovery" className="hover:text-foreground">Param Discovery</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">x8</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">x8</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              بديل سريع جداً لـ ffuf في fuzzing المعاملات — مكتوب بلغة Go
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Parameter Fuzzing</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">Go</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          <section id="installation">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">التثبيت</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {[
                  { text: "go install github.com/tomnomnom/x8@latest", desc: "التثبيت عبر Go" },
                  { text: "x8 -h", desc: "التحقق من التثبيت" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">{idx + 1}</span>
                    <code className="font-mono text-sm bg-muted/50 px-2 py-0.5 rounded">{step.text}</code>
                    <span className="text-sm">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="usage">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">الاستخدام الأساسي</h2>
            </div>
            <div className="space-y-4">
              {[
                { code: 'x8 -u "https://site.com/endpoint?FUZZ=test" -w paramnames.txt', desc: "Fuzzing أساسي للمعاملات" },
                { code: 'x8 -u "https://site.com/api?param=FUZZ" -w values.txt --filter-status 200,403', desc: "فلترة حسب حالة الاستجابة" },
                { code: 'x8 -u "https://site.com/endpoint" -w params.txt -t 200 --threads 50', desc: "Fuzzing عالي السرعة بـ 50 thread" },
                { code: 'cat urls.txt | x8 -w params.txt -json', desc: "Fuzzing مع إخراج JSON لعدة URLs" },
              ].map((item, idx) => (
                <div key={idx} className="bg-muted/50 border border-border/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">{item.desc}</div>
                  <pre className="bg-background rounded p-3 overflow-x-auto"><code className="text-sm font-mono">{item.code}</code></pre>
                </div>
              ))}
            </div>
          </section>

          <section id="commands">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Command className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">أهم الخيارات</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { cmd: "-u", desc: "الـ URL المستهدف (مع FUZZ)" },
                { cmd: "-w", desc: "ملف الكلمات (wordlist)" },
                { cmd: "-t", desc: "عدد الـ concurrent requests" },
                { cmd: "--threads", desc: "عدد الـ threads للتنفيذ" },
                { cmd: "--filter-status", desc: "فلترة حسب رموز الحالة" },
                { cmd: "-m", desc: "طريقة الطلب (GET/POST)" },
                { cmd: "-j", desc: "إخراج JSON" },
                { cmd: "-d", desc: "إضافة بيانات POST" },
                { cmd: "-H", desc: "إضافة headers مخصصة" },
                { cmd: "--help", desc: "عرض المساعدة" },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="font-mono text-sm text-primary mb-1">{item.cmd}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="when">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">متى تستخدم x8؟</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "عندما تحتاج لفحص المعاملات بسرعة عالية",
                "كبديل سريع عن ffuf في parameter fuzzing",
                "لمسح عدد كبير من URLs في وقت قصير",
                "عند استخدامه مع Arjun لتغطية شاملة",
                "في الحوسبة عالية الأداء مع عدة threads",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="notes">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">ملاحظات ونصائح</h2>
            </div>
            <div className="space-y-3">
              {[
                "أسرع 10-100 مرة من ffuf في بعض السيناريوهات",
                "يدعم التحديث التلقائي: x8 --self-update",
                "يدعم URLs متعددة باستخدام -l أو stdin",
                "متوافق مع wordlists العادية المستخدمة مع ffuf",
                "يدعم كل من GET و POST methods",
                "يستهلك موارد أقل بسبب كونه مكتوب بـ Go",
                "يمكن دمجه مع gf لتصفية النتائج",
                "مناسب للفحص السريع في مرحلة الاستطلاع الأولية",
              ].map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</div>
                  <span className="text-foreground">{note}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="errors">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">أخطاء شائعة وحلولها</h2>
            </div>
            <div className="space-y-4">
              {[
                { error: "no response from the target", solution: "تأكد من أن السيرفر يعمل والـ URL صحيح" },
                { error: "rate limiting / 429 Too Many Requests", solution: "قلل عدد الـ threads أو أضف --delay" },
                { error: "panic: runtime error", solution: "حدث خطأ في المعالجة — راجع الـ input وتأكد من صحة الـ URL" },
                { error: "wordlist file not found", solution: "تأكد من مسار ملف الكلمات واستخدم مسار كامل إن لزم" },
              ].map((err, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 overflow-hidden">
                  <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                    <div className="flex items-center gap-2 text-destructive font-medium">
                      <AlertTriangle className="size-4" />
                      {err.error}
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/5">
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{err.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">This guide is for ethical use and authorized penetration testing only</p>
          </footer>
        </div>
      </main>
    </div>
  )
}