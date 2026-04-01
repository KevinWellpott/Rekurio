"use client"

import { Lock, BarChart3, Zap, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }

const teaserFeatures = [
  {
    icon: BarChart3,
    title: "Performance-Dashboard",
    description: "Alle KPIs, Trends und Deliverability-Metriken auf einen Blick. Keine Suche mehr – alles priorisiert.",
    locked: false,
    preview: (
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Revenue/Email</span>
          <span className="text-primary font-semibold">+34%</span>
        </div>
        <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[34%] rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Open Rate</span>
          <span className="text-foreground/80 font-semibold">42.1%</span>
        </div>
        <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-foreground/40 h-full w-[42%] rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Click Rate</span>
          <span className="text-foreground/80 font-semibold">8.7%</span>
        </div>
        <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-foreground/40 h-full w-[9%] rounded-full" />
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Next-Best-Action Engine",
    description: "Rekurio zeigt dir täglich, welche eine Maßnahme den größten Umsatz-Impact hat.",
    locked: true,
    preview: (
      <div className="flex flex-col gap-2.5 text-xs">
        {[
          { action: "Win-Back Flow aktivieren", impact: "+€ 1.240 / Mo.", priority: "Hoch" },
          { action: "Post-Purchase Sequenz", impact: "+€ 890 / Mo.", priority: "Mittel" },
          { action: "Segment VIP-Kunden", impact: "+€ 620 / Mo.", priority: "Mittel" },
        ].map((item) => (
          <div key={item.action} className="glass-inner flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-foreground/70 truncate mr-2">{item.action}</span>
            <span className="text-primary shrink-0 font-semibold">{item.impact}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: "KI-Copywriting",
    description: "Flows und Kampagnen mit KI-generiertem Copy – auf deinen Brand-Voice trainiert.",
    locked: true,
    preview: (
      <div className="flex flex-col gap-2 text-xs">
        <div className="glass-inner rounded-lg px-3 py-2">
          <p className="text-muted-foreground mb-1">Betreff:</p>
          <p className="text-foreground/80">Du hast etwas vergessen… 👀</p>
        </div>
        <div className="glass-inner rounded-lg px-3 py-2">
          <p className="text-muted-foreground mb-1">Preview:</p>
          <p className="text-foreground/70 leading-relaxed">Dein Warenkorb wartet noch auf dich. Aber nicht für immer –…</p>
        </div>
      </div>
    ),
  },
]

export function PreorderTeaser() {
  return (
    <section id="preorder-teaser" className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Exklusiver Vorgeschmack
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was dich als Early-Access-Nutzer erwartet.
          </h2>
          <p className="text-muted-foreground max-w-lg text-base text-balance">
            Ein erster Blick ins Produkt. Features 2 und 3 sind für Early-Access-Mitglieder reserviert.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {teaserFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="glass relative flex flex-col gap-5 overflow-hidden rounded-2xl p-6"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.1,
                  type: "spring",
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="bg-primary/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="text-primary size-4.5" />
                  </div>
                  {feature.locked && (
                    <span className="glass-inner flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase">
                      <Lock className="size-3" />
                      Early Access
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-foreground font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Preview */}
                <div
                  className={cn(
                    "relative rounded-xl border border-white/8 bg-black/20 p-3",
                    feature.locked && "select-none"
                  )}
                >
                  <div className={cn(feature.locked && "blur-[3px] saturate-50 opacity-60 pointer-events-none")}>
                    {feature.preview}
                  </div>

                  {feature.locked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl">
                      <div className="glass flex h-9 w-9 items-center justify-center rounded-full">
                        <Lock className="text-primary size-4" />
                      </div>
                      <span className="text-foreground/70 text-[11px] font-semibold tracking-wide uppercase">
                        Frühen Zugang sichern
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
