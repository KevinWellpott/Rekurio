"use client"

import { Calendar, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"

const viewportOnce = { once: true as const, amount: 0.15 }

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

export function Hero() {
  return (
    <section
      id="hero"
      className="section-spacing section-divider-b relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/2 h-[min(70vw,36rem)] w-[min(130vw,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_85%_65%_at_50%_100%,oklch(0.92_0.19_125/0.2),transparent_62%)] blur-3xl"
      />
      <div className="relative container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <motion.p
              className="text-primary/90 text-[11px] font-semibold tracking-[0.28em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Rekurio · Klaviyo-Assistent für DTC-Brands
            </motion.p>

            <motion.h1
              className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-transparent sm:text-5xl md:text-[3.35rem] md:leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Mehr Revenue aus Klaviyo. <br /> Ohne Agentur.
            </motion.h1>

            <motion.p
              className="text-muted-foreground max-w-xl text-center text-lg font-medium leading-snug tracking-tight text-balance md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Du nutzt 20 % deines Klaviyo-Potenzials. Rekurio holt den Rest raus –
              mit konkreten Schritten, messbarem Revenue, ohne Agentur-Overhead.
            </motion.p>
          </div>

          <motion.div
            className="flex w-full justify-center px-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
          >
            <Button
              asChild
              size="lg"
              className="group shadow-sm"
            >
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("hero_democall_clicked")}
              >
                <Calendar className="size-4" />
                Democall buchen
                <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
