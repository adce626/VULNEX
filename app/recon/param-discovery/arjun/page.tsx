"use client"

import { PageTitle } from "@/components/page-title"
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
  Link2,
} from "lucide-react"
import Link from "next/link"

export default function ArjunPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Arjun — Param Discovery" />
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
              <span className="text-foreground">Arjun</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Arjun</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              أفضل أداة لاكتشاف المعاملات المخفية (Hidden Parameters) بالـ brute-force الذكي
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Parameter Discovery</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">Python</span>
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
                  { text: "pip install arjun", desc: "التثبيت عبر pip" },
                  { text: "git clone https://github.com/s0md3v/Arjun && cd Arjun", desc: "الكلون من GitHub" },
                  { text: "pip install -r requirements.txt", desc: "تثبيت المتطلبات" },
                  { text: "python arjun.py -h", desc: "التحقق من التثبيت" },
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
                { code: "python arjun.py -u https://site.com/endpoint.php", desc: "مسح GET أساسي" },
                { code: 'python arjun.py -u https://site.com/api -m POST -T "application/json"', desc: "مسح POST بمحتوى JSON" },
                { code: "python arjun.py -u https://site.com/api -o results.json", desc: "حفظ النتائج بصيغة JSON" },
                { code: "python arjun.py -u https://site.com/api -t 120", desc: "استخدام 120 thread بالتوازي" },
                { code: 'python arjun.py -u "https://site.com/api?id=1&name=test"', desc: "مسح مع معاملات موجودة" },
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
                { cmd: "-u", desc: "الـ URL المستهدف" },
                { cmd: "-o", desc: "ملف الإخراج" },
                { cmd: "-m", desc: "طريقة الطلب (GET/POST)" },
                { cmd: "-T", desc: "نوع المحتوى (Content-Type)" },
                { cmd: "-t", desc: "عدد الـ threads" },
                { cmd: "-oA", desc: "حفظ بأكثر من صيغة" },
                { cmd: "-d", desc: "إرسال البيانات الخام" },
                { cmd: "-i", desc: "إدخال من ملف" },
                { cmd: "-p", desc: "إضافة معاملات ثابتة" },
                { cmd: "-q", desc: "وضع صامت" },
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
              <h2 className="text-2xl font-bold text-foreground">متى تستخدم Arjun؟</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "عندما تريد اكتشاف المعاملات المخفية في API",
                "اختبار تطبيقات REST API قبل الفحص اليدوي",
                "البحث عن معاملات ممنوعة (Blocked Parameters)",
                "اكتشاف نقاط الضعف في الـ API endpoints",
                "خلال مرحلة الاستطلاع في اختبار الاختراق",
                "لإيجاد معاملات جديدة لم تكن موثقة",
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
                "Arjun يكتشف المعاملات تلقائياً بدون الحاجة لقوائم مسبقة",
                "يعمل بتقنية الـ API-specific payloads وليس مجرد brute-force",
                "يدعم Content-Type متعددة: JSON, form-data, x-www-form-urlencoded",
                "مناسب لـ RESTful APIs أكثر من الـ HTML forms",
                "يمكن الجمع بينه وبين ffuf للحصول على نتائج أفضل",
                "يحفظ النتائج بصيغة JSON لسهولة التحليل الآلي",
                "يحتاج Python 3.6+ للتشغيل",
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
                { error: "ConnectionError / Connection Refused", solution: "تأكد من أن السيرفر يعمل وأن الـ URL صحيح" },
                { error: "403 Forbidden", solution: "أضف headers مخصصة أو استخدم cookies للتوثيق" },
                { error: "ModuleNotFoundError (missing dependencies)", solution: "شغّل: pip install -r requirements.txt" },
                { error: "Slow scanning speed", solution: "زيد عدد الـ threads باستخدام -t أو قلل عدد المعاملات المدروسة" },
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