"use client"

import { Quote } from "lucide-react"
import { motion } from "motion/react"
import { MagicCard } from "@/components/ui/magic-card"

const viewportOnce = { once: true as const, amount: 0.15 }

const testimonials = [
  {
    quote:
      "Nach 10 Minuten wussten wir genau, welcher Flow als nächstes Geld bringt. Das hat unser Klaviyo-Chaos in eine klare To-do-Liste verwandelt.",
    name: "Lena M.",
    role: "Gründerin, Fashion-Brand",
    revenue: "~800k\u20ac Umsatz",
  },
  {
    quote:
      "Wir nutzen Klaviyo seit zwei Jahren. Rekurio hat gezeigt, dass wir 60\u00a0% unseres Potenzials liegen gelassen haben. Kein Consultant hätte das so schnell gefunden.",
    name: "Stefan K.",
    role: "Founder & CEO, Beauty-Brand",
    revenue: "~1,4M\u20ac Umsatz",
  },
  {
    quote:
      "Endlich keine Agentur mehr. Ich verstehe wieder selbst, was in meinem Klaviyo-Account passiert \u2013 und spare dabei noch Geld.",
    name: "Julia R.",
    role: "Marketing-Managerin, Home & Living",
    revenue: "~400k\u20ac Umsatz",
  },
]

export function PreorderSocialProof() {
  return (
    <section id="preorder-social-proof" className="section-spacing">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Stimmen aus der Beta
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was DTC-Gründer sagen
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.12,
                type: "spring",
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="rounded-2xl"
            >
              <MagicCard
                className="flex h-full flex-col gap-5 rounded-2xl p-6"
                gradientColor="oklch(0.92 0.19 125 / 0.07)"
                gradientFrom="oklch(0.92 0.19 125)"
                gradientTo="oklch(0.7 0.15 125)"
              >
                <Quote className="text-primary/35 size-5 shrink-0" />
                <p className="text-foreground/75 flex-1 text-sm leading-relaxed">
                  &bdquo;{t.quote}&ldquo;
                </p>
                <div className="border-t border-white/8 pt-4">
                  <p className="text-foreground text-sm font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                  <p className="text-primary/60 mt-0.5 text-xs font-medium">{t.revenue}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
