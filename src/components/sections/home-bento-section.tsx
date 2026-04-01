"use client"

import { motion } from "motion/react"

import BentoDemo from "@/components/bento-demo"

const viewportOnce = { once: true as const, amount: 0.15 }

export function HomeBentoSection() {
  return (
    <section id="features" className="section-spacing">
      <div className="container">
        <motion.div
          className="mb-12 flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Features
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Alles, was du brauchst,<br className="hidden sm:block" /> um Klaviyo voll auszureizen.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Dashboard, Flows, KI-Copywriting und Next-Best-Actions – in einer Plattform,
            die mit deinem Team wächst.
          </p>
        </motion.div>

        <BentoDemo />
      </div>
    </section>
  )
}
