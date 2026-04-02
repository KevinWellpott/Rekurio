"use client"

import { useState } from "react"
import { Mail, KeyRound, Plug, TrendingUp, BrainCircuit, Crown } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type HoverTheme = {
  bg: string
  border: string
  glow: string
  iconColor: string
  numberColor: string
}

type Step = {
  number: string
  title: string
  description: string
  icon: React.ElementType
  /** Tailwind grid-column classes, responsive */
  colSpan: string
  theme: HoverTheme
  /** Wide card gets horizontal layout on desktop */
  wide?: boolean
}

const steps: Step[] = [
  {
    number: "01",
    title: "E-Mail eintragen",
    description:
      "Unter 30 Sekunden. Kein Call, keine Kreditkarte, kein Risiko. Einfach rein.",
    icon: Mail,
    colSpan: "col-span-1",
    theme: {
      bg: "oklch(0.60 0.22 280 / 0.11)",
      border: "oklch(0.60 0.22 280 / 0.4)",
      glow: "0 0 50px -10px oklch(0.60 0.22 280 / 0.5)",
      iconColor: "oklch(0.72 0.20 280)",
      numberColor: "oklch(0.72 0.20 280 / 0.22)",
    },
  },
  {
    number: "02",
    title: "Early Access erhalten",
    description:
      "Einen Monat vor dem öffentlichen Launch – der erste Monat komplett gratis.",
    icon: KeyRound,
    colSpan: "col-span-1",
    theme: {
      bg: "oklch(0.70 0.18 160 / 0.10)",
      border: "oklch(0.70 0.18 160 / 0.4)",
      glow: "0 0 50px -10px oklch(0.70 0.18 160 / 0.45)",
      iconColor: "oklch(0.76 0.18 160)",
      numberColor: "oklch(0.76 0.18 160 / 0.22)",
    },
  },
  {
    number: "03",
    title: "Klaviyo kinderleicht verbinden",
    description:
      "API-Key eingeben, fertig. Rekurio liest deinen Account in Minuten und erkennt sofort wo Revenue verloren geht.",
    icon: Plug,
    colSpan: "col-span-1",
    theme: {
      bg: "oklch(0.65 0.18 220 / 0.10)",
      border: "oklch(0.65 0.18 220 / 0.4)",
      glow: "0 0 50px -10px oklch(0.65 0.18 220 / 0.45)",
      iconColor: "oklch(0.72 0.18 220)",
      numberColor: "oklch(0.72 0.18 220 / 0.22)",
    },
  },
  {
    number: "04",
    title: "Erste Revenue mit Rekurio erzielen",
    description:
      "Rekurio zeigt dir sofort: Welche Flows fehlen, was sie dich kosten, was du als Nächstes tust. Kein Raten mehr – klare Prioritäten, direkte Maßnahmen.",
    icon: TrendingUp,
    colSpan: "col-span-1 lg:col-span-2",
    wide: true,
    theme: {
      bg: "oklch(0.78 0.16 72 / 0.10)",
      border: "oklch(0.78 0.16 72 / 0.4)",
      glow: "0 0 60px -10px oklch(0.78 0.16 72 / 0.5)",
      iconColor: "oklch(0.80 0.16 72)",
      numberColor: "oklch(0.80 0.16 72 / 0.22)",
    },
  },
  {
    number: "05",
    title: "Rekurio optimiert automatisch",
    description:
      "Segmente, Flows, Kampagnen. Rekurio lernt, priorisiert und verbessert – damit du dich aufs Business konzentrierst.",
    icon: BrainCircuit,
    colSpan: "col-span-1",
    theme: {
      bg: "oklch(0.68 0.15 200 / 0.10)",
      border: "oklch(0.68 0.15 200 / 0.4)",
      glow: "0 0 50px -10px oklch(0.68 0.15 200 / 0.45)",
      iconColor: "oklch(0.74 0.15 200)",
      numberColor: "oklch(0.74 0.15 200 / 0.22)",
    },
  },
  {
    number: "06",
    title: "Marktführer deiner Branche",
    description:
      "Während deine Konkurrenz noch manuell optimiert und rät, entscheidet Rekurio bereits für dich. Du nimmst dir den Umsatz – nicht sie.",
    icon: Crown,
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    wide: true,
    theme: {
      bg: "oklch(0.88 0.19 125 / 0.09)",
      border: "oklch(0.88 0.19 125 / 0.45)",
      glow: "0 0 70px -10px oklch(0.88 0.19 125 / 0.55)",
      iconColor: "oklch(0.88 0.19 125)",
      numberColor: "oklch(0.88 0.19 125 / 0.22)",
    },
  },
]

const viewportOnce = { once: true as const, amount: 0.08 }

function StepCard({ step, index }: { step: Step; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = step.icon

  const isFullWidth = step.colSpan.includes("lg:col-span-3")

  return (
    <motion.div
      className={cn(
        "glass group relative overflow-hidden rounded-2xl border border-white/8 p-6 transition-[background-color,border-color,box-shadow] duration-300",
        "flex flex-col gap-8",
        step.colSpan,
        isFullWidth ? "sm:flex-row sm:items-end sm:justify-between sm:gap-12" : "",
      )}
      style={
        hovered
          ? {
              backgroundColor: step.theme.bg,
              borderColor: step.theme.border,
              boxShadow: step.theme.glow,
            }
          : {}
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.theme.border}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Watermark icon (abstract background element) */}
      <Icon
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-3 transition-all duration-500"
        style={{
          width: isFullWidth ? "10rem" : "8rem",
          height: isFullWidth ? "10rem" : "8rem",
          color: step.theme.iconColor,
          opacity: hovered ? 0.13 : 0.04,
          transform: `rotate(-12deg) scale(${hovered ? 1.08 : 1})`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      />

      {/* Content: icon chip + text */}
      <div className={cn("relative flex flex-col gap-4", isFullWidth && "sm:max-w-lg")}>
        {/* Icon chip */}
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300"
          style={
            hovered
              ? {
                  backgroundColor: step.theme.bg,
                  borderColor: step.theme.border,
                  color: step.theme.iconColor,
                }
              : {
                  backgroundColor: "oklch(1 0 0 / 0.05)",
                  borderColor: "oklch(1 0 0 / 0.09)",
                  color: "oklch(0.65 0 0)",
                }
          }
        >
          <Icon className="size-4" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h3
            className={cn(
              "font-semibold tracking-tight transition-colors duration-300",
              isFullWidth ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
            style={{ color: hovered ? step.theme.iconColor : undefined }}
          >
            {step.title}
          </h3>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Decorative step number */}
      <span
        aria-hidden
        className="relative select-none self-end font-bold tabular-nums leading-none tracking-tighter transition-colors duration-300"
        style={{
          fontSize: isFullWidth ? "clamp(5rem, 9vw, 8rem)" : "clamp(3.5rem, 6vw, 5rem)",
          lineHeight: 1,
          color: hovered ? step.theme.numberColor : "oklch(1 0 0 / 0.06)",
        }}
      >
        {step.number}
      </span>
    </motion.div>
  )
}

export function PreorderHowItWorks() {
  return (
    <section id="preorder-how-it-works" className="section-spacing">
      <div className="container">
        <motion.div
          className="mb-12 flex max-w-2xl flex-col items-start gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Von Early Access zur Marktführerschaft
          </h2>
          <p className="text-muted-foreground max-w-md text-base text-balance">
            Sechs Schritte. Kein Onboarding-Marathon, kein Tech-Setup, kein Sales-Call.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
