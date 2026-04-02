"use client"

import { motion } from "motion/react"
import { MagicCard } from "@/components/ui/magic-card"
import { Link2, Users, TrendingUp } from "lucide-react"

const viewportOnce = { once: true as const, amount: 0.15 }

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Bewirb dich & hol deinen Link",
    body: "Nach deiner Bewerbung bekommst du einen persönlichen Referral-Link und ein Partner-Dashboard zum Tracking deiner Conversions.",
  },
  {
    icon: Users,
    step: "02",
    title: "Empfehle Rekurio",
    body: "Teile deinen Link in deinen Kanälen — ob Newsletter, YouTube, Instagram oder direkt an Kunden. Jeder neue Account, der über deinen Link kommt, zählt.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Verdiene monatlich",
    body: "Für jeden aktiven Account auf jedem Plan bekommst du 30&nbsp;% recurring. Monatliche Auszahlung, voller Überblick im Dashboard.",
  },
]

const audiences = [
  {
    title: "E-Mail-Agenturen",
    body: "Du betreust DTC-Brands mit Klaviyo? Empfehle Rekurio als Self-Service-Lösung für Kunden, die mehr Eigenständigkeit wollen.",
  },
  {
    title: "Freelancer & Berater",
    body: "Du hilfst DTC-Brands beim Aufbau? Rekurio ist das Tool, das deine Empfehlungen verlängerbar macht — passives Einkommen vom ersten Tag.",
  },
  {
    title: "DTC-Content-Creator",
    body: "Du erreichst Shopify-Brands oder E-Commerce-Gründer? Deine Empfehlung hat Gewicht — und das soll sich für dich rechnen.",
  },
  {
    title: "Marketing-Netzwerke",
    body: "Du hast Zugang zu DTC-Community, Masterminds oder Netzwerken? Wir arbeiten auch an strukturierten B2B-Partnerschaften.",
  },
]

export function PartnerHowSection() {
  return (
    <>
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
              So funktioniert&apos;s
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              In 3 Schritten zum Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
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
                  className="h-full rounded-2xl p-px bg-card"
                  gradientColor="rgba(209,254,73,0.05)"
                  gradientFrom="#d1fe49"
                  gradientTo="#9E7AFF"
                >
                  <div className="flex h-full flex-col gap-4 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="size-5 text-primary" />
                      </div>
                      <span className="text-primary/30 text-2xl font-black tabular-nums">{item.step}</span>
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
              Für wen
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              Wer am meisten vom Programm profitiert
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {audiences.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: 0.05 + i * 0.07,
                  type: "spring",
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <h3 className="text-foreground mb-2 text-base font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
