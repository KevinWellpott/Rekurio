"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const painPoints = [
  {
    number: "01",
    title: "Du öffnest Klaviyo – und weißt nicht, wo anfangen.",
    body: "Dashboard voller Daten, aber keine Richtung. Welcher Flow fehlt? Welches Segment schläft gerade? Die Plattform zeigt alles und priorisiert nichts. Also scrollst du, klickst rum – und machst am Ende gar nichts.",
  },
  {
    number: "02",
    title: "Jeden Montag dieselbe Frage: Was soll ich diese Woche machen?",
    body: "Du weißt, dass Klaviyo Revenue bringt. Aber du hast keine Ahnung, wo du konkret ansetzen sollst. Also machst du das Gleiche wie letzte Woche – oder verschiebst es auf nächste Woche.",
  },
  {
    number: "03",
    title: "Die Agentur kostet zu viel. DIY dauert zu lang.",
    body: "2.000 € im Monat für Klaviyo-Management – für einen 8-stelligen Brand vielleicht. Für dich nicht. Also machst du es selbst, ohne System, ohne klare Prioritäten, ohne messbaren Fortschritt.",
  },
  {
    number: "04",
    title: "30 % deiner Kunden kaufen nie wieder.",
    body: "Kein Post-Purchase Flow. Kein Win-Back. Kein VIP-Segment. Die Revenue liegt bereit – und wird nicht abgeholt. Nicht weil du es nicht willst. Weil niemand dir sagt, dass es gerade passiert.",
  },
  {
    number: "05",
    title: "Deine Flows laufen – aber sind sie wirklich gut?",
    body: "Cart Abandonment, Welcome Series, Browse Abandonment. Sie senden irgendwas. Aber welcher Flow kostet dich Revenue? Welcher könnte doppelt so viel bringen? Du weißt es nicht – weil niemand die Zahlen für dich einordnet.",
  },
  {
    number: "06",
    title: "Dein Klaviyo-Konto kostet Geld. Was bringt es zurück?",
    body: "89 bis 450 € im Monat, je nach Plan. Aber welche Flows bringen wirklich Revenue? Welche Segmente konvertieren, welche nicht? Diese Frage klar beantworten zu können ist der Unterschied zwischen Tool-Ausgabe und echtem ROI.",
  },
  {
    number: "07",
    title: "Du bist zu beschäftigt, um dein wichtigstes Tool zu optimieren.",
    body: "Produkte sourcen, Ads managen, Kundenanfragen beantworten. Klaviyo läuft – irgendwie. Optimiert? Nie. Der Unterschied zwischen 'läuft' und 'maximiert' kostet dich jeden Monat mehrere tausend Euro.",
  },
  {
    number: "08",
    title: "Du weißt nicht, was du nicht weißt.",
    body: "Das ist das eigentliche Problem. Nicht fehlendes Wissen – fehlende Sichtbarkeit. Du kannst nicht optimieren, was du nicht siehst. Ohne einen Co-Piloten, der dir zeigt wo Revenue liegt, bleibt das so.",
  },
]

const SECTION_HEIGHT = `calc(100svh + ${painPoints.length * 10}vh)`

const CARD_GLOW = "none"

// ─── Mobile-only vertical slider ───────────────────────────────────────────

function MobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleDotClick = (i: number) => setActiveIndex(i)

  return (
    <section id="preorder-problem-mobile" className="section-spacing md:hidden">
      <div className="container">
        {/* Section header */}
        <div className="mb-6 max-w-2xl">
          <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
            Das passiert gerade in deinem Klaviyo-Account
          </p>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Erkennst du dich wieder?
          </h2>
        </div>

        {/* Progress dots */}
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-sm tabular-nums text-rose-400/80">
            {painPoints[activeIndex].number}
          </span>
          <span className="text-muted-foreground/25 font-mono text-sm">/</span>
          <span className="text-muted-foreground/30 font-mono text-sm tabular-nums">
            {String(painPoints.length).padStart(2, "0")}
          </span>
          <div className="ml-2 flex items-center gap-1.5">
            {painPoints.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Punkt ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "h-1.5 w-5 bg-rose-400/80"
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
                      color: "oklch(0.58 0.2 20 / 0.55)",
                      lineHeight: 1,
                    }}
                  >
                    {painPoints[activeIndex].number}
                  </span>
                  <h3 className="text-foreground text-lg font-semibold leading-snug tracking-tight">
                    {painPoints[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {painPoints[activeIndex].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="text-muted-foreground/50 disabled:opacity-20 text-sm transition-colors hover:text-foreground"
          >
            ← Zurück
          </button>
          <button
            onClick={() => setActiveIndex((i) => Math.min(painPoints.length - 1, i + 1))}
            disabled={activeIndex === painPoints.length - 1}
            className="text-muted-foreground/50 disabled:opacity-20 text-sm transition-colors hover:text-foreground"
          >
            Weiter →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Desktop sticky-scroll layout (original, with red styling) ─────────────

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
      const next = Math.min(Math.floor(v * painPoints.length), painPoints.length - 1)
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
      id="preorder-problem"
      className="relative hidden md:block"
      style={{ height: SECTION_HEIGHT }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        {/* Dot pattern */}
        <div aria-hidden className="bg-dot-pattern pointer-events-none absolute inset-0" />
        {/* Red ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "none",
          }}
        />

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
              Das passiert gerade in deinem Klaviyo-Account
            </p>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              Erkennst du dich wieder?
            </h2>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-[5fr_6fr] gap-8 lg:gap-12">
            {/* Left: numbered list */}
            <div className="flex flex-col">
              {painPoints.map((point, i) => (
                <button
                  key={point.number}
                  onClick={() => handleClick(i)}
                  className={cn(
                    "group flex items-start gap-3 border-l-2 py-2.5 pl-4 text-left transition-all duration-200",
                    i === activeIndex ? "border-rose-500/60" : "border-white/8 hover:border-white/20",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 font-mono text-xs tabular-nums transition-colors duration-200",
                      i === activeIndex
                        ? "text-rose-400/90"
                        : "text-muted-foreground/25 group-hover:text-muted-foreground/50",
                    )}
                  >
                    {point.number}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-snug transition-colors duration-200",
                      i === activeIndex
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/35 group-hover:text-muted-foreground/60",
                    )}
                  >
                    {point.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: detail card */}
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
                      color: "oklch(0.58 0.2 20 / 0.55)",
                      lineHeight: 1,
                    }}
                  >
                    {painPoints[activeIndex].number}
                  </span>
                  <h3 className="text-foreground text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                    {painPoints[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {painPoints[activeIndex].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Export ─────────────────────────────────────────────────────────────────

export function PreorderProblem() {
  return (
    <>
      <MobileSlider />
      <DesktopSlider />
    </>
  )
}
