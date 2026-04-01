"use client"

import { TrendingDown, RefreshCcw } from "lucide-react"
import { motion } from "motion/react"
import { NumberTicker } from "@/components/ui/number-ticker"

const viewportOnce = { once: true as const, amount: 0.2 }

const stats = [
  {
    icon: TrendingDown,
    value: 20,
    suffix: "%",
    label: "von Klaviyo wird durchschnittlich genutzt",
    detail: "Die anderen 80% – Flows, Segmente, Automations – liegen ungenutzt. Du zahlst für Potenzial, das du nicht abrufst.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: RefreshCcw,
    value: 30,
    suffix: "%",
    label: "deiner Kunden kaufen nach dem ersten Kauf nie wieder",
    detail: "Ohne gezielte Win-Back- und Retention-Flows verlierst du sie still. Kein Alarm, keine zweite Chance.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
]

export function PreorderProblem() {
  return (
    <section id="preorder-problem" className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Das Problem
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Das kostet dich fehlende Optimierung – jeden Monat.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass flex flex-col gap-4 rounded-2xl p-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.12,
                  type: "spring",
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>

                <div className="flex flex-col gap-1">
                  <div className={`text-5xl font-bold tabular-nums tracking-tight ${stat.color}`}>
                    <NumberTicker value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-foreground/80 text-sm font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.detail}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
