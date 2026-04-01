"use client"

import { Tag, Phone, MessageSquareHeart, Rocket } from "lucide-react"
import { motion } from "motion/react"

const viewportOnce = { once: true as const, amount: 0.15 }

const benefits = [
  {
    icon: Tag,
    title: "Frühbucherpreis",
    description:
      "Als Early-Access-Mitglied zahlst du dauerhaft weniger – dein Tarif wird nie teurer, solange du dabei bleibst.",
    highlight: true,
  },
  {
    icon: Phone,
    title: "Persönlicher Onboarding-Call",
    description:
      "Wir nehmen uns Zeit für dich: Ein 1:1-Call mit dem Team, damit dein Setup vom ersten Tag an sitzt.",
    highlight: false,
  },
  {
    icon: MessageSquareHeart,
    title: "Dein Feedback formt das Produkt",
    description:
      "Du bist nicht Kunde – du bist Mitgestalter. Deine Rückmeldungen fließen direkt in die Roadmap ein.",
    highlight: false,
  },
  {
    icon: Rocket,
    title: "Sofortiger Zugang beim Launch",
    description:
      "Während andere warten, bist du als Erstes drin. Kein Wartemodus, kein Onboarding-Rückstau.",
    highlight: false,
  },
]

export function PreorderBenefits() {
  return (
    <section id="preorder-benefits" className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Nur für Early Access
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was du bekommst, wenn du jetzt dabei bist.
          </h2>
          <p className="text-muted-foreground max-w-md text-base text-balance">
            Diese Vorteile gibt es nur in der Early-Access-Phase. Wer wartet, zahlt später mehr – und bekommt weniger.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                className={`glass relative flex flex-col gap-4 rounded-2xl p-6 ${
                  benefit.highlight
                    ? "ring-primary/30 ring-1"
                    : ""
                }`}
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
                {benefit.highlight && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wide">
                      Größter Vorteil
                    </span>
                  </div>
                )}

                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  benefit.highlight ? "bg-primary/20" : "bg-white/6"
                }`}>
                  <Icon className={`size-5 ${benefit.highlight ? "text-primary" : "text-foreground/60"}`} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-foreground font-semibold tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
