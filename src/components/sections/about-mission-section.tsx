"use client"

import { motion } from "motion/react"
import { MagicCard } from "@/components/ui/magic-card"
import { BarChart2, Zap, Target, Shield } from "lucide-react"

const viewportOnce = { once: true as const, amount: 0.15 }

const beliefs = [
  {
    icon: Target,
    title: "Revenue first.",
    body: "Jedes Feature, jede Empfehlung in Rekurio ist auf eine Frage optimiert: Bringt das messbar mehr Umsatz? Kein Feature-Bloat, kein Vanity-Dashboard.",
  },
  {
    icon: Zap,
    title: "Geschwindigkeit schlägt Perfektion.",
    body: "Ein Flow, der heute live geht und 70&nbsp;% optimal ist, verdient mehr als der perfekte Flow in drei Wochen. Rekurio hilft dir, schneller zu starten.",
  },
  {
    icon: BarChart2,
    title: "Daten ohne Interpretation sind nutzlos.",
    body: "Wir zeigen dir nicht nur, was passiert — sondern was du konkret als nächstes tun sollst. Next-Best-Actions, nicht Datenpunkte.",
  },
  {
    icon: Shield,
    title: "Deine Daten, deine Kontrolle.",
    body: "Klaviyo-Verbindung über OAuth — du vergibst genau die Rechte, die du willst. Kein Vendor-Lock-in, kein Datenmissbrauch.",
  },
]

export function AboutMissionSection() {
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
            Was wir glauben
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Die Prinzipien hinter Rekurio
          </h2>
          <p className="text-muted-foreground max-w-xl text-base text-balance">
            Wir bauen nicht für jeden. Wir bauen für DTC-Brands, die Klaviyo ernst nehmen — und die
            Ergebnisse sehen wollen, nicht Prozesse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {beliefs.map((item, i) => (
            <motion.div
              key={item.title}
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
                <div className="flex h-full flex-col gap-4 rounded-2xl p-6">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-base font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
