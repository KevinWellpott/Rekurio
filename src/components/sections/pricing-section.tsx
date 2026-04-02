"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"

import { BorderBeam } from "@/components/ui/border-beam"
import { MagicCard } from "@/components/ui/magic-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }

const tiers = [
  {
    name: "Core",
    price: "89",
    period: "/ Monat",
    description: "Für DTC-Brands, die Klaviyo endlich voll nutzen wollen – ohne Agentur.",
    featured: false,
    cta: "14 Tage kostenlos testen",
    features: [
      "Core Dashboard (Revenue, Open Rate, CTR)",
      "10 E-Mail-Templates",
      "3 Flow-Guides (Welcome, Cart, Win-Back)",
      "5 Segment-Vorlagen",
      "1-Klick Klaviyo-Connect (OAuth)",
      "Kampagnen-Kalender",
      "Community-Support",
    ],
  },
  {
    name: "Growth",
    price: "189",
    period: "/ Monat",
    description: "Der Standard für wachsende DTC-Brands. ROI ab Woche 1.",
    featured: true,
    cta: "14 Tage kostenlos testen",
    features: [
      "Alles aus Core, plus:",
      "Advanced Dashboard (CLV, Repurchase Rate, A/B)",
      "Unlimitierte Templates & Flows",
      "Next-Best-Action Engine",
      "KI-gestütztes Copywriting",
      "Send-Time Optimization",
      "Performance-Prognosen",
      "Priority-Support",
    ],
  },
  {
    name: "Elite",
    price: "349",
    period: "/ Monat",
    description: "Für Teams mit mehreren Brands und maximalem Optimierungsbedarf.",
    featured: false,
    cta: "14 Tage kostenlos testen",
    features: [
      "Alles aus Growth, plus:",
      "Mehrere Klaviyo-Accounts",
      "Auto. Segment-Empfehlungen",
      "Churn-Prävention",
      "Custom Templates (Brand Voice)",
      "A/B Test Vorlagen & Auswertung",
      "Dedicated Support & SLA",
      "Früher Zugang zu neuen Features",
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
            Eine Klaviyo-Agentur kostet 1.500–3.000 € pro Monat. Rekurio ab 89 €.
            Monatlich kündbar, 14 Tage kostenlos – keine Kreditkarte nötig.
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
              {tier.featured ? (
                <div className="pointer-events-none absolute left-1/2 top-0 z-[60] -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-md ring-2 ring-background">
                    Most Popular
                  </span>
                </div>
              ) : null}
              <MagicCard
                className={cn("h-full rounded-2xl p-px", tier.featured ? "glass-strong" : "glass")}
                gradientColor={tier.featured ? "rgba(209,254,73,0.10)" : "rgba(255,255,255,0.05)"}
                gradientFrom={tier.featured ? "#d1fe49" : "#ffffff"}
                gradientTo={tier.featured ? "#9E7AFF" : "#888888"}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-6 rounded-2xl p-6",
                    tier.featured && "pt-10"
                  )}
                >
                  {tier.featured ? (
                    <BorderBeam
                      colorFrom="#d1fe49"
                      colorTo="#9E7AFF"
                      duration={4}
                      size={80}
                    />
                  ) : null}

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
                      <Link
                        href="/signup"
                        onClick={() =>
                          posthog.capture("pricing_plan_cta_clicked", {
                            plan: tier.name,
                            featured: tier.featured,
                          })
                        }
                      >
                        {tier.cta}
                      </Link>
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
          Alle Pläne monatlich kündbar · Keine Kreditkarte nötig · Preise exkl. MwSt.
        </motion.p>
      </div>
    </section>
  )
}
