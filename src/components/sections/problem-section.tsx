"use client"

import { TrendingDown, RefreshCcw, Flame } from "lucide-react"
import { motion } from "motion/react"

import { NumberTicker } from "@/components/ui/number-ticker"

const viewportOnce = { once: true as const, amount: 0.2 }

const problems = [
  {
    icon: TrendingDown,
    stat: 20,
    suffix: "% genutzt",
    label: "Ungenutztes Potenzial",
    description:
      "Ihr zahlt für Klaviyo – nutzt aber nur einen Bruchteil des Potenzials. Flows schlafen, Reports werden ignoriert.",
  },
  {
    icon: RefreshCcw,
    stat: 30,
    suffix: "% kaufen nie wieder",
    label: "Verlorene Käufer",
    description:
      "Kunden, die nach dem ersten Kauf verschwinden. Ohne aktive Win-Back-Flows bleibt echtes Retention-Revenue liegen.",
  },
  {
    icon: Flame,
    stat: null,
    suffix: null,
    label: "Zeit & Budget verbrannt",
    description:
      "DIY frisst Zeit, Agenturen Budget. Weder noch liefert verlässlich – und der nächste Monat sieht genauso aus.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="section-spacing">
      <div className="container">
        <motion.div
          className="flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Das Problem
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Du zahlst für dein E-Mail-Tool –<br className="hidden sm:block" /> und nutzt 20&nbsp;% davon.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            30&nbsp;% deiner Kunden kaufen nie wieder. Das kostet dich jeden Monat echten Umsatz.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {problems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="glass flex flex-col gap-4 rounded-2xl p-6 transition-colors hover:border-white/15"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.1,
                  type: "spring",
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </div>

                <div>
                  {item.stat !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-primary text-4xl font-bold tabular-nums">
                        <NumberTicker value={item.stat} />
                      </span>
                      <span className="text-muted-foreground text-sm font-medium">
                        {item.suffix}
                      </span>
                    </div>
                  ) : (
                    <p className="text-foreground text-xl font-semibold">
                      {item.label}
                    </p>
                  )}
                  {item.stat !== null && (
                    <p className="text-foreground mt-0.5 text-sm font-medium">
                      {item.label}
                    </p>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
