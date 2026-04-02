"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "motion/react"
import { KeyRound, Crown, Check, ArrowUpRight } from "lucide-react"
import { HyperText } from "@/components/ui/hyper-text"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { cn } from "@/lib/utils"

// ── Liquid Glass dot styles ───────────────────────────────────────────────────
const LQ_BG     = "linear-gradient(158deg,rgba(209,254,73,0.04) 0%,rgba(255,255,255,0.018) 60%,rgba(255,255,255,0.028) 100%)"
const LQ_FILTER = "blur(44px) saturate(250%) brightness(1.02)"
const LQ_BORDER = "1px solid rgba(255,255,255,0.14)"
const LQ_SHADOW = "inset 0 1.5px 0 rgba(255,255,255,0.72),inset 0 3px 12px rgba(209,254,73,0.06),inset 1.5px 0 0 rgba(255,255,255,0.16),inset 0 -1.5px 0 rgba(0,0,0,0.24),0 8px 32px rgba(0,0,0,0.22),0 2px 8px rgba(0,0,0,0.12)"

// ── Inline buzzword effects ───────────────────────────────────────────────────
function InlineMorph({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2800)
    return () => clearInterval(t)
  }, [words.length])
  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span key={idx} className="inline-block"
          initial={{ opacity: 0, filter: "blur(7px)", y: 3 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(7px)", y: -3 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
        >{words[idx]}</motion.span>
      </AnimatePresence>
    </span>
  )
}

function InlineRotate({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [words.length])
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={idx} className="inline-block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >{words[idx]}</motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Apple Mail icon (inline SVG) ──────────────────────────────────────────────
function AppleMailIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4BA3EE"/>
          <stop offset="100%" stopColor="#1A63C8"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#mg)"/>
      <rect x="7.5" y="14" width="33" height="22" rx="2.5" fill="white"/>
      <path d="M7.5 17 L24 27.5 L40.5 17" stroke="url(#mg)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Step definitions ──────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    titleText: "E-Mail eintragen",
    renderTitle: () => <span>E-Mail eintragen</span>,
    effect: "hypertext" as const,
    description: "30 Sekunden. Kein Call, keine Kreditkarte, kein Risiko.",
    metric: "< 30 Sek.",
    colorRaw: "139,92,246",
  },
  {
    number: "02",
    renderTitle: () => (
      <span><InlineRotate words={["Early Access", "Beta-Zugang", "Exklusiv-Platz"]} /> erhalten</span>
    ),
    effect: "plain" as const,
    description: "Einen Monat vor dem öffentlichen Launch — der erste Monat komplett gratis.",
    metric: "1 Monat gratis",
    colorRaw: "52,211,153",
  },
  {
    number: "03",
    renderTitle: () => (
      <span>Klaviyo <InlineMorph words={["verbinden", "aktivieren", "live schalten"]} /></span>
    ),
    effect: "plain" as const,
    description: "1-Klick OAuth. Kein API-Key, kein IT-Ticket. Sofort live.",
    metric: "60 Sek.",
    colorRaw: "56,189,248",
  },
  {
    number: "04",
    renderTitle: () => (
      <span>Erste <InlineRotate words={["Revenue", "Umsätze", "Ergebnisse"]} /> erzielen</span>
    ),
    effect: "plain" as const,
    description: "Dashboard aktiv, Flows live. Ab Woche 1 messbar mehr Umsatz.",
    metric: "Woche 1",
    colorRaw: "209,254,73",
  },
  {
    number: "05",
    renderTitle: () => (
      <span>Rekurio <InlineMorph words={["automatisch", "KI-gestützt", "eigenständig"]} /> optimiert</span>
    ),
    effect: "plain" as const,
    description: "Next-Best-Actions, KI-Copywriting, Segmentierung — täglich.",
    metric: "täglich",
    colorRaw: "251,191,36",
  },
  {
    number: "06",
    renderTitle: () => (
      <span>Der <InlineRotate words={["Marktführer", "Platzhirsch", "Benchmark"]} /> deiner Branche</span>
    ),
    effect: "crown" as const,
    description: "Deine Konkurrenz verliert Kunden an dich — dauerhaft.",
    metric: "dauerhaft",
    colorRaw: "209,254,73",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// Visuals — minimal: just the icon with a subtle glow, no clutter
// ══════════════════════════════════════════════════════════════════════════════

function Visual({ number, colorRaw, inView }: { number: string; colorRaw: string; inView: boolean }) {
  const glowColor = `rgba(${colorRaw},0.25)`
  const ringColor = `rgba(${colorRaw},0.12)`

  // Shared wrapper
  const icon = (() => {
    switch (number) {
      case "01":
        return (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.45, type: "spring", stiffness: 180 }}
            className="relative"
          >
            <AppleMailIcon size={52} />
            {/* Sent check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.65, type: "spring", stiffness: 280 }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
            >
              <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
            </motion.div>
          </motion.div>
        )

      case "02":
        return (
          <motion.div
            initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
            animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 0.45, type: "spring", stiffness: 160 }}
            className="rounded-2xl p-3"
            style={{ background: `rgba(${colorRaw},0.10)` }}
          >
            <KeyRound className="h-10 w-10 text-white/80" strokeWidth={1.5} />
          </motion.div>
        )

      case "03":
        return (
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden"
              style={{ background: "rgba(209,254,73,0.10)", border: "1px solid rgba(209,254,73,0.22)" }}
            >
              <Image src="/logo.svg" alt="Rekurio" width={28} height={28} className="object-contain" />
            </motion.div>

            {/* beam */}
            <div className="relative h-px w-12">
              <div className="absolute inset-0 bg-white/10" />
              <motion.div
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/75"
                animate={inView ? { x: [0, 40, 0] } : {}}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <Image src="/klaviyo-icon.svg" alt="Klaviyo" width={22} height={22}
                className="object-contain brightness-0 invert opacity-70" />
            </motion.div>
          </div>
        )

      case "04": {
        const bars = [30, 42, 38, 55, 68, 88]
        return (
          <div className="flex flex-col items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-1"
            >
              <ArrowUpRight className="h-5 w-5 text-white/50" />
              <span className="text-xl font-bold tabular-nums text-white/75">+34 %</span>
            </motion.div>
            <div className="flex items-end gap-1">
              {bars.map((h, i) => (
                <motion.div key={i}
                  className="w-4 rounded-sm"
                  style={{
                    background: i === bars.length - 1 ? `rgba(${colorRaw},0.7)` : `rgba(${colorRaw},0.18)`,
                    minHeight: 3,
                  }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: h } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.06, type: "spring", stiffness: 60, damping: 12 }}
                />
              ))}
            </div>
          </div>
        )
      }

      case "05":
        return (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.45, type: "spring", stiffness: 160 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <Image
              src="/openai-icon.svg"
              alt="OpenAI"
              width={36}
              height={36}
              className="object-contain"
            />
          </motion.div>
        )

      case "06":
        return (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.55, type: "spring", stiffness: 150, delay: 0.05 }}
            className="rounded-2xl p-3"
            style={{
              background: `rgba(${colorRaw},0.08)`,
              filter: inView ? `drop-shadow(0 0 16px rgba(${colorRaw},0.35))` : "none",
            }}
          >
            <Crown className="h-10 w-10 text-white/80" strokeWidth={1.5} />
          </motion.div>
        )

      default: return null
    }
  })()

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Subtle ambient ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 96, height: 96, background: `radial-gradient(circle, ${ringColor} 0%, transparent 70%)` }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Drop-shadow glow */}
      <motion.div
        className="absolute rounded-full opacity-0"
        style={{ width: 56, height: 56, background: glowColor, filter: "blur(18px)" }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      {icon}
    </div>
  )
}

// ── Liquid glass dot ──────────────────────────────────────────────────────────
function LiquidDot({ number, inView }: { number: string; inView: boolean }) {
  return (
    <motion.div
      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums text-white/60 transition-transform duration-200 group-hover:scale-110"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      style={{ background: LQ_BG, backdropFilter: LQ_FILTER, border: LQ_BORDER, boxShadow: LQ_SHADOW }}
    >
      {number}
    </motion.div>
  )
}

// ── Text content ──────────────────────────────────────────────────────────────
function TextContent({ step, inView }: { step: (typeof STEPS)[number]; inView: boolean }) {
  const title = (() => {
    if (step.effect === "hypertext" && step.titleText) {
      return (
        <HyperText as="span" startOnView animateOnHover duration={600}
          className="py-0 font-medium tracking-tight text-foreground"
          style={{ fontSize: "inherit", lineHeight: "inherit" }}
        >{step.titleText}</HyperText>
      )
    }
    if (step.effect === "crown") {
      return (
        <motion.span
          className="inline-block font-medium tracking-tight text-foreground"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          <AnimatedShinyText shimmerWidth={100} className="text-inherit">
            {step.renderTitle()}
          </AnimatedShinyText>
        </motion.span>
      )
    }
    return (
      <motion.span
        className="font-medium tracking-tight text-foreground"
        initial={{ opacity: 0, x: -6 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.35, delay: 0.06 }}
      >
        {step.renderTitle()}
      </motion.span>
    )
  })()

  return (
    <div className="w-full max-w-[280px] text-left">
      <h3 className="text-lg font-medium leading-snug">{title}</h3>
      <motion.p
        className="mt-1.5 text-sm leading-relaxed text-muted-foreground/80"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.18 }}
      >
        {step.description}
      </motion.p>
      <motion.span
        className="mt-2 inline-block text-xs text-white/35 tabular-nums"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.28 }}
      >
        {step.metric}
      </motion.span>
    </div>
  )
}

// ── Step row ──────────────────────────────────────────────────────────────────
function StepRow({ step, index, isLast }: { step: (typeof STEPS)[number]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="group relative">
      {/* Hover micro-glow */}
      <div
        className="pointer-events-none absolute inset-0 -mx-6 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 55% 70% at 50% 50%, rgba(${step.colorRaw},0.04) 0%, transparent 70%)` }}
      />

      <div className="relative grid grid-cols-[1fr_52px_1fr] items-center">
        {/* LEFT */}
        <div className={cn("flex items-center py-9 min-h-[160px]", isEven ? "justify-end pr-8" : "justify-start pl-8")}>
          {isEven ? (
            <TextContent step={step} inView={inView} />
          ) : (
            <div className="hidden h-36 w-full max-w-[220px] items-center justify-center transition-transform duration-300 group-hover:scale-[1.04] md:flex">
              <Visual number={step.number} colorRaw={step.colorRaw} inView={inView} />
            </div>
          )}
        </div>

        {/* CENTER: line + dot */}
        <div className="flex flex-col items-center self-stretch">
          <div className="relative w-px flex-1 overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.04]" />
            {!isLast && (
              <motion.div
                className="absolute inset-x-0 top-0 w-full origin-top"
                style={{ height: "100%", background: `rgba(${step.colorRaw},0.25)` }}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
              />
            )}
          </div>
          <LiquidDot number={step.number} inView={inView} />
          <div className="flex-1" />
        </div>

        {/* RIGHT */}
        <div className={cn("flex items-center py-9 min-h-[160px]", isEven ? "justify-start pl-8" : "justify-end pr-8")}>
          {isEven ? (
            <div className="hidden h-36 w-full max-w-[220px] items-center justify-center transition-transform duration-300 group-hover:scale-[1.04] md:flex">
              <Visual number={step.number} colorRaw={step.colorRaw} inView={inView} />
            </div>
          ) : (
            <TextContent step={step} inView={inView} />
          )}
        </div>
      </div>

      {/* Mobile visual */}
      <div className="flex h-28 items-center justify-center pb-4 md:hidden">
        <Visual number={step.number} colorRaw={step.colorRaw} inView={inView} />
      </div>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export function PreorderHowItWorks() {
  return (
    <section className="section-spacing">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 flex max-w-lg flex-col items-center gap-2.5 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-transparent sm:text-4xl">
            Von Early Access zur Marktführerschaft.
          </h2>
          <p className="text-sm text-muted-foreground">
            Sechs Schritte. Ein Ziel.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
