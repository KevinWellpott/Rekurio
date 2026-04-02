"use client"

import { motion } from "motion/react"

const viewportOnce = { once: true as const, amount: 0.15 }

const story = [
  {
    label: "Das Problem",
    text: "Als wir mit DTC-Brand-Gründern gesprochen haben, hörten wir immer dasselbe: Klaviyo läuft, aber niemand weiß wirklich, ob er es richtig nutzt. Flows sind halb aufgesetzt. Templates wurden nie getestet. Der nächste sinnvolle Schritt ist unklar.",
  },
  {
    label: "Die Lösung",
    text: "Rekurio verbindet sich per OAuth mit Klaviyo und analysiert, was vorhanden ist — was fehlt, was schlecht performt, was als nächstes gebaut werden sollte. Keine Agentur, kein Entwickler, kein Raten.",
  },
  {
    label: "Für wen",
    text: "Wir bauen für Brands zwischen 60k und 5M€ Jahresumsatz, mit 1–15 Personen im Team. Founder und Marketing-Manager, die Klaviyo selbst in die Hand nehmen wollen — mit dem richtigen Werkzeug dabei.",
  },
]

export function AboutValuesSection() {
  return (
    <section className="section-spacing section-divider-b">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-10 flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              Unsere Geschichte
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              Warum wir das gebaut haben
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {story.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex gap-8 pb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.1,
                  type: "spring",
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="flex flex-col items-center gap-0 pt-1.5">
                  <div className="size-2.5 shrink-0 rounded-full bg-primary" />
                  {i < story.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-white/10" />
                  )}
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                  <p className="text-foreground/80 text-base leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.35, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hast du Fragen, Feedback oder willst einfach wissen, wie wir denken?{" "}
              <a
                href="mailto:hello@rekurio.com"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                hello@rekurio.com
              </a>{" "}
              — wir antworten.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
