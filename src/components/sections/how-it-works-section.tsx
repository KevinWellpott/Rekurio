"use client"

import { ListTodo, Plug, BarChart3 } from "lucide-react"
import { motion } from "motion/react"

const viewportOnce = { once: true as const, amount: 0.2 }

const steps = [
  {
    number: "01",
    icon: ListTodo,
    title: "Kostenlos starten",
    description:
      "Konto erstellen, Klaviyo verbinden – in wenigen Minuten. Keine IT, keine Agentur.",
  },
  {
    number: "02",
    icon: Plug,
    title: "Klaviyo verbinden",
    description:
      "OAuth, wenige Klicks. Kein manuelles API-Key-Handling, keine IT-Tickets.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Flows & Actions umsetzen",
    description:
      "Rekurio priorisiert, was als Nächstes den meisten Umsatz bringt. Du setzt um – und misst die Wirkung direkt.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-spacing">
      <div className="container">
        <motion.div
          className="flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            So funktioniert&apos;s
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Drei Schritte bis zum ersten Ergebnis.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Kein langes Onboarding, kein Agentur-Overhead. Du siehst erste Ergebnisse, bevor du dich eingewöhnt hast.
          </p>
        </motion.div>

        <div className="relative mt-14">
          {/* Connecting line – desktop only */}
          <div
            aria-hidden
            className="border-border absolute top-9 right-0 left-0 hidden border-t border-dashed md:block"
            style={{ left: "calc(16.666% + 2.5rem)", right: "calc(16.666% + 2.5rem)" }}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center gap-4 text-center"
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
                  <div className="relative flex flex-col items-center">
                    <div className="glass relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl">
                      <Icon className="text-primary size-7" />
                    </div>
                    <span className="text-primary/50 mt-3 font-mono text-xs font-bold tracking-widest">
                      {step.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-foreground text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
