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
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Dein Klaviyo Revenue –<br className="hidden sm:block" /> maximiert. Automatisch.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Dashboard, Flows, KI-Copywriting und Next-Best-Actions in einer Plattform.
            Rekurio zeigt dir täglich, was als Nächstes Geld bringt – und macht es möglich.
          </p>
        </motion.div>

        <BentoDemo />
      </div>
    </section>
  )
}
