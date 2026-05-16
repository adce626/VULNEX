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

export default function ParamSpiderPage() {
  const [activeCategory, setActiveCategory] = useState("installation")

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="ParamSpider — Param Discovery" />
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
              <span className="text-foreground">ParamSpider</span>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="relative px-6 py-12 text-center lg:py-16">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">ParamSpider</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-pretty">
              أداة استخراج المعاملات من الـ Wayback Machine و Common Crawl بطريقة سلبية
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
                  { text: "git clone https://github.com/devanshbatham/ParamSpider.git", desc: "الكلون من GitHub" },
                  { text: "cd ParamSpider && pip install -r requirements.txt", desc: "تثبيت المتطلبات" },
                  { text: "python3 paramspider -h", desc: "التحقق من التثبيت" },
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
                { code: "python3 paramspider -d site.com", desc: "استخراج URLs من Wayback Machine" },
                { code: "python3 paramspider -d site.com -p \"FUZZ=value\"", desc: "حفظ النتائج مع placeholder" },
                { code: "python3 paramspider -d site.com -l 2", desc: "بحث بعمق 2 مستويات" },
                { code: "python3 paramspider -d site.com | grep xss > xss.txt", desc: "فلترة النتائج حسب نوع الثغرة" },
                { code: "python3 paramspider -d site.com -o output.txt", desc: "حفظ في ملف مخصص" },
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
                { cmd: "-d", desc: "النطاق المستهدف (domain)" },
                { cmd: "-p", desc: "نمط الإخراج مع FUZZ placeholder" },
                { cmd: "-l", desc: "عمق البحث (مستويات)" },
                { cmd: "-o", desc: "ملف الإخراج" },
                { cmd: "-s", desc: "البحث في Google بدل Wayback Machine" },
                { cmd: "-b", desc: "مكتبة البحث (baidu, bing, ...)" },
                { cmd: "-a", desc: "إضافة جميع الأنظمة في الـ domain" },
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
              <h2 className="text-2xl font-bold text-foreground">متى تستخدم ParamSpider؟</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "عند بدء اختبار اختراق على نطاق جديد",
                "لاكتشاف معاملات مخفية بدون التفاعل المباشر مع الموقع",
                "لجمع أكبر عدد ممكن من URLs مع معاملات",
                "عندما تريد نتائج سريعة من بيانات أرشيفية",
                "كخطوة أولى قبل استخدام Arjun أو ffuf",
                "لتحليل تاريخ التغييرات في معاملات الـ URLs",
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
                "يعمل بشكل سلبي — لا يتفاعل مباشرة مع الموقع المستهدف",
                "يستخدم Wayback Machine و Common Crawl كمصادر بيانات",
                "ممتاز لجمع بيانات أولية قبل الفحص العميق",
                "النتائج قد تحتوي على URLs منتهية الصلاحية",
                "يمكن الجمع بينه وبين Arjun للحصول على أفضل النتائج",
                "يدعم بحث Google كمصدر إضافي (خيار -s)",
                "سريع جداً مقارنة بالأدوات التفاعلية مثل Arjun",
                "لا يعمل على النطاقات التي لا توجد لها بيانات أرشيفية",
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
                { error: "No results found", solution: "هذا يعني أن الحفار لا يملك بيانات أرشيفية عن هذا النطاق. جرّب مصادر أخرى مثل Google" },
                { error: "Rate limiting from Wayback Machine", solution: "أضف تأخيراً بين الطلبات أو قلل عمق البحث" },
                { error: "ModuleNotFoundError", solution: "تأكد من تثبيت requirements.txt: pip install -r requirements.txt" },
                { error: "SSL Certificate errors", solution: "أضف --no-check-certificate أو حدّث مكتبة requests" },
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