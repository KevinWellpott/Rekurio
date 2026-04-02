"use client"

import { motion } from "motion/react"
import { MagicCard } from "@/components/ui/magic-card"
import { NumberTicker } from "@/components/ui/number-ticker"

const viewportOnce = { once: true as const, amount: 0.15 }

const stats = [
  {
    value: 15,
    suffix: "%",
    label: "E-Mail-Anteil am Umsatz",
    detail: "E-Commerce-Branchendurchschnitt für Brands, die ihre Flows korrekt aufgesetzt haben.",
  },
  {
    value: 20,
    suffix: "%",
    label: "Durchschnittliche Klaviyo-Nutzung",
    detail: "So viel nutzen DTC-Brands in unserem ICP-Segment von Klaviyo — im Schnitt.",
  },
  {
    value: 15732,
    prefix: "€",
    label: "Ersparnis vs. Agentur / Jahr",
    detail: "Rechnung: Agentur 18.000 € – Rekurio Growth 2.268 € = 15.732 € Ersparnis.",
  },
  {
    value: 2,
    suffix: " Min.",
    label: "Setup-Zeit",
    detail: "Klaviyo per OAuth verbinden, loslegen. Keine API-Keys, kein Entwickler nötig.",
  },
]

export function RoiStatsSection() {
  return (
    <section className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mb-10 flex max-w-3xl flex-col items-start gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Die Zahlen dahinter
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Warum der Rechner realistisch ist
          </h2>
          <p className="text-muted-foreground max-w-xl text-base text-balance">
            Die Berechnung basiert auf echten E-Commerce-Benchmarks — keine Marketing-Zahlen,
            sondern Daten aus dem DTC-Alltag.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.55,
                delay: 0.08 + i * 0.08,
                type: "spring",
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <MagicCard
                className="h-full rounded-2xl p-px bg-card"
                gradientColor="rgba(209,254,73,0.05)"
                gradientFrom="#d1fe49"
                gradientTo="#9E7AFF"
              >
                <div className="flex h-full flex-col gap-3 rounded-2xl p-6">
                  <div className="flex items-baseline gap-0.5">
                    {stat.prefix && (
                      <span className="text-primary text-2xl font-bold">{stat.prefix}</span>
                    )}
                    <NumberTicker
                      value={stat.value}
                      className="text-primary text-3xl font-bold tabular-nums"
                    />
                    {stat.suffix && (
                      <span className="text-primary text-xl font-bold">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-foreground/90 text-sm font-semibold">{stat.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{stat.detail}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground mt-8 text-xs max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Quellen: Klaviyo E-Commerce Benchmark Report 2024, interne Auswertung ICP-Segment (n=120),
          DACH-Agenturmarkt-Durchschnittswerte. Individuelle Ergebnisse können abweichen.
        </motion.p>
      </div>
    </section>
  )
}
