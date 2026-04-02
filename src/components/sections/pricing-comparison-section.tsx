"use client"

import { Check, X, Minus } from "lucide-react"
import { motion } from "motion/react"

const viewportOnce = { once: true as const, amount: 0.15 }

const rows = [
  { label: "Monatliche Kosten",         rekurio: "89–349 €",       agentur: "1.500–3.000 €",  diy: "0 €"        },
  { label: "Setup-Zeit",                 rekurio: "< 5 Minuten",    agentur: "2–4 Wochen",     diy: "Wochen"     },
  { label: "Flow-Templates",            rekurio: true,              agentur: true,              diy: false        },
  { label: "KI-Copywriting",            rekurio: true,              agentur: "extra €",         diy: false        },
  { label: "Next-Best-Actions",         rekurio: true,              agentur: false,             diy: false        },
  { label: "Performance-Dashboard",     rekurio: true,              agentur: "selten",          diy: false        },
  { label: "A/B-Test-Vorlagen",         rekurio: true,              agentur: true,              diy: false        },
  { label: "24/7 Verfügbar",            rekurio: true,              agentur: false,             diy: true         },
  { label: "Volle Datenkontrolle",      rekurio: true,              agentur: false,             diy: true         },
  { label: "Ohne Technikkenntnisse",    rekurio: true,              agentur: true,              diy: false        },
  { label: "Kündbar monatlich",         rekurio: true,              agentur: false,             diy: true         },
]

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-muted-foreground">{value}</span>
  }
  if (value === true) {
    return <Check className="size-5 text-primary mx-auto" />
  }
  return <X className="size-4 text-muted-foreground/40 mx-auto" />
}

export function PricingComparisonSection() {
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
            Vergleich
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Rekurio vs. Agentur vs. DIY
          </h2>
          <p className="text-muted-foreground max-w-xl text-base text-balance">
            Die ehrliche Gegenüberstellung — damit du siehst, was du für dein Geld bekommst.
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.15, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 pr-6 text-left text-sm font-medium text-muted-foreground w-1/3" />
                <th className="py-4 px-6 text-center w-1/5">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="bg-primary/15 text-primary ring-primary/25 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ring-1">
                      Rekurio
                    </span>
                  </div>
                </th>
                <th className="py-4 px-6 text-center text-sm font-medium text-muted-foreground w-1/5">
                  Klaviyo-Agentur
                </th>
                <th className="py-4 pl-6 text-center text-sm font-medium text-muted-foreground w-1/5">
                  DIY in Klaviyo
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="py-3.5 pr-6 text-sm text-foreground/80">{row.label}</td>
                  <td className="py-3.5 px-6 text-center bg-primary/[0.04]">
                    <Cell value={row.rekurio} />
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <Cell value={row.agentur} />
                  </td>
                  <td className="py-3.5 pl-6 text-center">
                    <Cell value={row.diy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          className="text-muted-foreground mt-6 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          * Agenturkosten basieren auf Marktdurchschnittswerten für DACH-E-Mail-Marketing-Agenturen (Stand 2025).
        </motion.p>
      </div>
    </section>
  )
}
