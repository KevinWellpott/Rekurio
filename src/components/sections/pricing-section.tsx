"use client"

import { Check } from "lucide-react"
import { motion } from "motion/react"

import { BorderBeam } from "@/components/ui/border-beam"
import { MagicCard } from "@/components/ui/magic-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }

// TODO: Preise eintragen – aktuell Platzhalter
const tiers = [
  {
    name: "Starter",
    price: "??",
    period: "/ Monat",
    description: "Für DTC-Brands, die Klaviyo endlich richtig nutzen wollen.",
    featured: false,
    cta: "Jetzt starten",
    features: [
      "Performance-Dashboard",
      "Bis zu 3 aktive Flows",
      "Flow-Template-Bibliothek",
      "1-Klick Klaviyo-Connect",
      "E-Mail-Support",
    ],
  },
  {
    name: "Growth",
    price: "??",
    period: "/ Monat",
    description: "Der Standard für wachsende DTC-Brands mit vollem Klaviyo-Potenzial.",
    featured: true,
    cta: "Growth wählen",
    features: [
      "Alles in Starter",
      "Unbegrenzte Flows",
      "Next-Best-Action Engine",
      "KI-gestütztes Copywriting",
      "Deliverability & Reporting",
      "Priority-Support",
    ],
  },
  {
    name: "Pro",
    price: "??",
    period: "/ Monat",
    description: "Für Teams mit mehreren Marken und individuellem Optimierungsbedarf.",
    featured: false,
    cta: "Pro wählen",
    features: [
      "Alles in Growth",
      "Mehrere Klaviyo-Accounts",
      "Custom Automations",
      "Dedizierter Onboarding-Call",
      "SLA & dedizierter Support",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="section-spacing">
      <div className="container">
        <motion.div
          className="mb-12 flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Preise
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Klar kalkulierbar.<br className="hidden sm:block" /> Kein Agentur-Budget.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Alle 3 Tiers sind monatlich kündbar. Keine Kreditkarte für die Waitlist nötig.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={cn("relative rounded-2xl", tier.featured && "z-10 scale-[1.02] md:scale-[1.03]")}
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
              <MagicCard
                className={cn("h-full rounded-2xl p-px bg-card")}
                gradientColor={tier.featured ? "rgba(209,254,73,0.08)" : "rgba(255,255,255,0.04)"}
                gradientFrom={tier.featured ? "#d1fe49" : "#ffffff"}
                gradientTo={tier.featured ? "#9E7AFF" : "#888888"}
              >
                <div className="relative flex h-full flex-col gap-6 rounded-2xl p-6">
                  {tier.featured && (
                    <>
                      <BorderBeam
                        colorFrom="#d1fe49"
                        colorTo="#9E7AFF"
                        duration={4}
                        size={80}
                      />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-[11px] font-bold tracking-wide">
                          Most Popular
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-base font-semibold">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-4xl font-bold tracking-tight">
                        €{tier.price}
                      </span>
                      <span className="text-muted-foreground text-sm">{tier.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <Button
                      asChild
                      variant={tier.featured ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        "w-full",
                        !tier.featured && "border-white/20 bg-white/5 text-foreground hover:bg-white/10"
                      )}
                    >
                      <a href="#">{tier.cta}</a>
                    </Button>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground mt-8 text-left text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Alle Pläne monatlich kündbar · Keine Kreditkarte für die Waitlist · Preise exkl. MwSt.
        </motion.p>
      </div>
    </section>
  )
}
