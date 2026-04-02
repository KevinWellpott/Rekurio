"use client"

import { motion } from "motion/react"

const viewportOnce = { once: true as const, amount: 0.15 }

const steps = [
  {
    step: "01",
    title: "Account verbinden",
    body: "Klaviyo per OAuth in 2&nbsp;Minuten verbinden. Keine API-Keys, kein Entwickler. Rekurio liest nur — du behältst die volle Kontrolle.",
  },
  {
    step: "02",
    title: "Analyse in Echtzeit",
    body: "Rekurio analysiert deine Flows, Segmente und Performance-Daten. Du siehst sofort: Was läuft, was fehlt, was als nächstes Revenue bringt.",
  },
  {
    step: "03",
    title: "Erste Empfehlung umsetzen",
    body: "Die Next-Best-Action Engine priorisiert für dich. Ein Klick, ein Template, eine konkrete Anleitung. Der erste Umsatzschub in Woche&nbsp;1.",
  },
]

export function DemoExpectSection() {
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
            Was dich erwartet
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Von 0 auf erste Ergebnisse — in unter 10 Minuten
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.55,
                delay: 0.08 + i * 0.1,
                type: "spring",
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-primary/40 text-4xl font-black tabular-nums leading-none">
                  {item.step}
                </span>
                <div className="h-px flex-1 bg-white/8" />
              </div>
              <h3 className="text-foreground text-base font-semibold">{item.title}</h3>
              <p
                className="text-muted-foreground text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
