"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// ─── Solution steps (content from the "how it works" timeline) ──────────────

const solutionSteps = [
  {
    number: "01",
    title: "E-Mail eintragen",
    body: "30 Sekunden. Kein Call, keine Kreditkarte, kein Risiko. Du bist in der Liste – das ist alles.",
    metric: "< 30 Sek.",
  },
  {
    number: "02",
    title: "Early Access erhalten",
    body: "Einen Monat vor dem öffentlichen Launch bekommst du Zugang. Der erste Monat ist komplett gratis – ohne Risiko, ohne Commitment.",
    metric: "1 Monat gratis",
  },
  {
    number: "03",
    title: "Klaviyo verbinden",
    body: "1-Klick OAuth. Kein API-Key, kein IT-Ticket, kein Setup-Aufwand. Rekurio ist sofort live mit deinen echten Daten.",
    metric: "60 Sek.",
  },
  {
    number: "04",
    title: "Erste Revenue erzielen",
    body: "Dashboard aktiv, Flows live. Rekurio zeigt dir sofort die größten Revenue-Chancen in deinem Account. Ab Woche 1 messbar mehr Umsatz.",
    metric: "Woche 1",
  },
  {
    number: "05",
    title: "Rekurio optimiert automatisch",
    body: "Next-Best-Actions, KI-Copywriting, Segmentierung – täglich. Kein manueller Aufwand. Rekurio arbeitet, während du verkaufst.",
    metric: "täglich",
  },
  {
    number: "06",
    title: "Der Marktführer deiner Branche",
    body: "Deine Konkurrenz verliert Kunden an dich – dauerhaft. Early Adopter haben einen Vorsprung, den andere nicht mehr aufholen können.",
    metric: "dauerhaft",
  },
]

const SECTION_HEIGHT = `calc(100svh + ${solutionSteps.length * 10}vh)`
const CARD_GLOW = "none"

// ─── Mobile slider ────────────────────────────────────────────────────────────

function MobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="preorder-solution-mobile" className="pb-[var(--section-spacing-y)] pt-4 md:hidden">
      <div className="container">
        {/* Header */}
        <div className="mb-6 max-w-2xl">
          <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
            Von Early Access zur Marktführerschaft
          </p>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            So läuft es ab.
          </h2>
        </div>

        {/* Progress dots */}
        <div className="mb-5 flex items-center gap-3">
          <span className="text-primary/80 font-mono text-sm tabular-nums">
            {solutionSteps[activeIndex].number}
          </span>
          <span className="text-muted-foreground/25 font-mono text-sm">/</span>
          <span className="text-muted-foreground/30 font-mono text-sm tabular-nums">
            {String(solutionSteps.length).padStart(2, "0")}
          </span>
          <div className="ml-2 flex items-center gap-1.5">
            {solutionSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Schritt ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "h-1.5 w-5 bg-primary/80"
                    : "h-1.5 w-1.5 bg-white/15 hover:bg-white/35",
                )}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="glass relative overflow-hidden rounded-2xl border border-primary/15 p-6"
          style={{ boxShadow: CARD_GLOW }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.26, ease: [0.32, 0, 0.67, 0] }}
              className="flex flex-col gap-4"
            >
              <span
                aria-hidden
                className="select-none font-bold tabular-nums leading-none tracking-tighter"
                style={{
                  fontSize: "clamp(4.5rem, 22vw, 7rem)",
                  color: "oklch(0.92 0.19 125 / 0.45)",
                  lineHeight: 1,
                }}
              >
                {solutionSteps[activeIndex].number}
              </span>
              <h3 className="text-foreground text-lg font-semibold leading-snug tracking-tight">
                {solutionSteps[activeIndex].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {solutionSteps[activeIndex].body}
              </p>
              <span className="text-xs text-primary/50 tabular-nums">
                {solutionSteps[activeIndex].metric}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="text-muted-foreground/50 disabled:opacity-20 text-sm transition-colors hover:text-foreground"
          >
            ← Zurück
          </button>
          <button
            onClick={() => setActiveIndex((i) => Math.min(solutionSteps.length - 1, i + 1))}
            disabled={activeIndex === solutionSteps.length - 1}
            className="text-muted-foreground/50 disabled:opacity-20 text-sm transition-colors hover:text-foreground"
          >
            Weiter →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Desktop sticky-scroll layout (mirrored: card LEFT, list RIGHT) ──────────

function DesktopSlider() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isManualRef = useRef(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (isManualRef.current) return
      const next = Math.min(Math.floor(v * solutionSteps.length), solutionSteps.length - 1)
      setActiveIndex(next)
    })
    return unsubscribe
  }, [scrollYProgress])

  const handleClick = (i: number) => {
    isManualRef.current = true
    setActiveIndex(i)
    setTimeout(() => {
      isManualRef.current = false
    }, 4000)
  }

  return (
    <section
      ref={containerRef}
      id="preorder-solution"
      className="relative hidden md:block"
      style={{ height: SECTION_HEIGHT }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        {/* Dot pattern */}
        <div aria-hidden className="bg-dot-pattern pointer-events-none absolute inset-0" />

        <div className="container relative">
          {/* Header */}
          <motion.div
            className="mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
              Von Early Access zur Marktführerschaft
            </p>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              So läuft es ab.
            </h2>
          </motion.div>

          {/* Two-column layout — FLIPPED vs. problem: card LEFT, list RIGHT */}
          <div className="grid grid-cols-[6fr_5fr] gap-8 lg:gap-12">
            {/* LEFT: detail card */}
            <div
              className="glass relative flex min-h-[280px] items-start overflow-hidden rounded-2xl border border-primary/15 p-6 lg:p-8"
              style={{ boxShadow: CARD_GLOW }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  {/* Big punchy number */}
                  <span
                    aria-hidden
                    className="select-none font-bold tabular-nums leading-none tracking-tighter"
                    style={{
                      fontSize: "clamp(5rem, 8vw, 9rem)",
                      color: "oklch(0.92 0.19 125 / 0.45)",
                      lineHeight: 1,
                    }}
                  >
                    {solutionSteps[activeIndex].number}
                  </span>
                  <h3 className="text-foreground text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                    {solutionSteps[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {solutionSteps[activeIndex].body}
                  </p>
                  <span className="text-xs text-primary/50 tabular-nums">
                    {solutionSteps[activeIndex].metric}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: numbered list */}
            <div className="flex flex-col">
              {solutionSteps.map((step, i) => (
                <button
                  key={step.number}
                  onClick={() => handleClick(i)}
                  className={cn(
                    "group flex items-start gap-3 border-l-2 py-2.5 pl-4 text-left transition-all duration-200",
                    i === activeIndex ? "border-primary/60" : "border-white/8 hover:border-white/20",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 font-mono text-xs tabular-nums transition-colors duration-200",
                      i === activeIndex
                        ? "text-primary/90"
                        : "text-muted-foreground/25 group-hover:text-muted-foreground/50",
                    )}
                  >
                    {step.number}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-snug transition-colors duration-200",
                      i === activeIndex
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/35 group-hover:text-muted-foreground/60",
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function PreorderHowItWorks() {
  return (
    <>
      <MobileSlider />
      <DesktopSlider />
    </>
  )
}
