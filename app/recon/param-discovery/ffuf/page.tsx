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
  FolderSearch,
} from "lucide-react"
import Link from "next/link"

export default function FFUFPage() {
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
              <span className="text-foreground">ffuf</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">ffuf</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              أداة fuzzing سريعة للغبار — اكتشاف الدلائل والملفات والمعاملات
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Web Fuzzer</span>
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
                  { text: "go install github.com/ffuf/ffuf/v2@latest", desc: "التثبيت عبر Go" },
                  { text: "git clone https://github.com/ffuf/ffuf.git && cd ffuf && go build .", desc: "الكلون والبناء من المصدر" },
                  { text: "ffuf -h", desc: "التحقق من التثبيت" },
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
                { code: "ffuf -u https://site.com/FUZZ -w /usr/share/wordlists/dirb/common.txt", desc: "اكتشاف الملفات والمجلدات" },
                { code: 'ffuf -u "https://site.com/api?FUZZ=test" -w params.txt', desc: "fuzzing للمعاملات في URL" },
                { code: 'ffuf -u "https://site.com" -X POST -d "user=admin&pass=FUZZ" -w passwords.txt', desc: "fuzzing لكلمة المرور عبر POST" },
                { code: 'ffuf -w subdomains.txt -u "https://FUZZ.site.com"', desc: "fuzzing للـ subdomains" },
                { code: "ffuf -u https://site.com/FUZZ -w files.txt -e .php,.html,.js", desc: "fuzzing مع امتدادات محددة" },
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
                { cmd: "-u", desc: "الـ URL المستهدف مع كلمة FUZZ" },
                { cmd: "-w", desc: "ملف الكلمات (wordlist)" },
                { cmd: "-X", desc: "طريقة الطلب (GET, POST, PUT...)" },
                { cmd: "-d", desc: "بيانات POST" },
                { cmd: "-e", desc: "امتدادات الملفات للإضافة" },
                { cmd: "-mc", desc: "فلترة حسب أرقام حالة الاستجابة" },
                { cmd: "-fc", desc: "استبعاد أرقام حالة معينة" },
                { cmd: "-fs", desc: "استبعاد حسب حجم الاستجابة" },
                { cmd: "-t", desc: "عدد الـ concurrent threads" },
                { cmd: "-rate", desc: "معدل الطلبات في الثانية" },
                { cmd: "-recursion", desc: "فحص تكراري (recursion)" },
                { cmd: "-recursion-depth", desc: "عمق التكرار" },
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
              <h2 className="text-2xl font-bold text-foreground">متى تستخدم ffuf؟</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "اكتشاف الملفات والمجلدات المخفية على الويب",
                "فحص المعاملات (Parameter Fuzzing)",
                "اكتشاف الـ Virtual Hosts",
                "فحص كلمات المرور عبر brute force",
                "اكتشاف نقاط الدخول الخفية في API",
                "الفحص السريع مقارنة بالأدوات الأخرى",
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
                "من أسرع أدوات web fuzzing — مكتوب بـ Go",
                "يدعم الفحص التكراري (recursion) لاكتشاف طبقات متعددة",
                "يدعم mode clusterbomb و pitchfork للـ multi-parameter",
                "يحتاج wordlist جيد مثل SecLists",
                "يدعم حفظ النتائج بصيغ متعددة: HTML, JSON, CSV",
                "يمكن استخدامه مع Burp Suite عبر البروكسي",
                "يستخدم placeholder FUZZ لتحديد مكان الكلمة",
                "يدعم custom headers والـ cookies",
                "مناسب للـ API Fuzzing و Web Fuzzing معاً",
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
                { error: "403 Forbidden أو حجب الطلبات", solution: "أضف custom User-Agent باستخدام -H أو قلل معدل الطلبات" },
                { error: "Too many open files", solution: "قلل عدد الـ threads مع -t أو زِد حد النظام: ulimit -n 65535" },
                { error: "WAF detection / حظر IP", solution: "استخدم بروكسي أو قلل rate مع -rate flag" },
                { error: "wordlist parsing error", solution: "تأكد من ترميز الملف (UTF-8) وعدم وجود أسطر فارغة" },
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