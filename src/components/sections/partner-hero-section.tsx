"use client"

import { motion } from "motion/react"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"

const viewportOnce = { once: true as const, amount: 0.15 }

const tiers = [
  {
    label: "Core",
    price: "89 €",
    commission: "26,70 €",
    period: "/ Monat",
    featured: false,
  },
  {
    label: "Growth",
    price: "189 €",
    commission: "56,70 €",
    period: "/ Monat",
    featured: true,
  },
  {
    label: "Elite",
    price: "349 €",
    commission: "104,70 €",
    period: "/ Monat",
    featured: false,
  },
]

export function PartnerHeroSection() {
  return (
    <section className="section-spacing section-divider-b relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-[min(60vw,32rem)] w-[min(90vw,48rem)] bg-[radial-gradient(ellipse_70%_55%_at_80%_10%,oklch(0.92_0.19_125/0.14),transparent_65%)] blur-3xl"
      />
      <div className="container relative">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
          <motion.span
            className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Partner-Programm
          </motion.span>

          <motion.h1
            className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Verdiene 30&nbsp;% auf jeden Account.<br className="hidden sm:block" /> Monatlich. Recurring.
          </motion.h1>

          <motion.p
            className="text-muted-foreground max-w-xl text-lg text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Empfehle Rekurio an DTC-Brands und bekomme 30&nbsp;% des monatlichen Plan-Preises —
            solange der Account aktiv ist. Keine Deckelung, keine Mindestanzahl.
            Ideal für Agenturen, Freelancer und Creator.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.3, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {tiers.map((tier) => (
            <div key={tier.label} className="relative">
              <MagicCard
                className="h-full rounded-2xl p-px bg-card"
                gradientColor={tier.featured ? "rgba(209,254,73,0.08)" : "rgba(255,255,255,0.04)"}
                gradientFrom={tier.featured ? "#d1fe49" : "#ffffff"}
                gradientTo={tier.featured ? "#9E7AFF" : "#888888"}
              >
                <div className="relative flex h-full flex-col gap-3 rounded-2xl p-5 text-center">
                  {tier.featured && (
                    <BorderBeam colorFrom="#d1fe49" colorTo="#9E7AFF" duration={4} size={60} />
                  )}
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
                    {tier.label}
                  </p>
                  <p className="text-foreground/60 text-sm">Planpreis: {tier.price}{tier.period}</p>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-muted-foreground mb-1">Deine Provision</p>
                    <p className="text-primary text-2xl font-bold tabular-nums">{tier.commission}</p>
                    <p className="text-muted-foreground text-xs">{tier.period} pro Account</p>
                  </div>
                </div>
              </MagicCard>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-muted-foreground mt-4 text-xs max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          * 30&nbsp;% recurring auf alle aktiven Pläne. Auszahlung monatlich. Genaue Konditionen werden
          im Partner-Onboarding kommuniziert.
        </motion.p>
      </div>
    </section>
  )
}
