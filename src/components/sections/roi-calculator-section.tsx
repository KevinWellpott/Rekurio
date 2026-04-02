"use client"

import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import posthog from "posthog-js"

const viewportOnce = { once: true as const, amount: 0.2 }

// Formatiert Zahlen als Euro (z.B. 12.400 €)
function formatEur(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value)
}

// Berechnung:
// - Email macht im E-Commerce ~15% des Umsatzes aus (Branchendurchschnitt)
// - ICP nutzt davon nur ~20% (laut eigener Datenbasis)
// - Volles Potenzial = aktuelles Email-Revenue / 0.20
// - Ungenutztes Revenue = Potenzial - aktuelles Revenue
function calculateROI(annualRevenue: number) {
  const emailRevenueShare = 0.15
  const currentUtilization = 0.20
  const currentEmailRevenue = annualRevenue * emailRevenueShare
  const fullPotential = currentEmailRevenue / currentUtilization
  const untapped = fullPotential - currentEmailRevenue
  const agencyYearlyCost = 1_500 * 12
  const rekurioYearlyCost = 189 * 12
  const savingsVsAgency = agencyYearlyCost - rekurioYearlyCost
  return { currentEmailRevenue, fullPotential, untapped, agencyYearlyCost, rekurioYearlyCost, savingsVsAgency }
}

const STEPS = [
  { label: "100k", value: 100_000 },
  { label: "250k", value: 250_000 },
  { label: "500k", value: 500_000 },
  { label: "1 Mio", value: 1_000_000 },
  { label: "2 Mio", value: 2_000_000 },
  { label: "5 Mio", value: 5_000_000 },
]

export function RoiCalculatorSection() {
  const [stepIndex, setStepIndex] = useState(2) // default: 500k

  const currentStep = STEPS[stepIndex]
  const roi = calculateROI(currentStep.value)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value)
    setStepIndex(idx)
    posthog.capture("roi_calculator_used", {
      revenue_label: STEPS[idx].label,
      revenue_value: STEPS[idx].value,
      untapped_eur: Math.round(calculateROI(STEPS[idx].value).untapped),
    })
  }, [])

  return (
    <section id="roi" className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            ROI-Rechner
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Wie viel lässt du gerade liegen?
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            DTC-Brands machen im Schnitt 15 % ihres Umsatzes über E-Mail. Die meisten schöpfen
            davon nur 20 % ab. Stell deinen Jahresumsatz ein.
          </p>
        </motion.div>

        <motion.div
          className="glass mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.1, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Slider */}
          <div className="border-b border-white/8 px-8 py-8 md:px-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-muted-foreground text-sm font-medium">Dein Jahresumsatz</p>
              <motion.span
                key={currentStep.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-foreground text-xl font-bold tabular-nums tracking-tight"
              >
                {formatEur(currentStep.value)}
              </motion.span>
            </div>

            <input
              type="range"
              min={0}
              max={STEPS.length - 1}
              step={1}
              value={stepIndex}
              onChange={handleChange}
              className={cn(
                "w-full h-2 rounded-full appearance-none cursor-pointer",
                "bg-white/10",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-primary",
                "[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(209,254,73,0.25)]",
                "[&::-webkit-slider-thumb]:cursor-pointer",
                "[&::-webkit-slider-thumb]:transition-transform",
                "[&::-webkit-slider-thumb]:hover:scale-110",
                "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
                "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
                "[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer"
              )}
              style={{
                background: `linear-gradient(to right, oklch(0.92 0.19 125) 0%, oklch(0.92 0.19 125) ${(stepIndex / (STEPS.length - 1)) * 100}%, rgba(255,255,255,0.1) ${(stepIndex / (STEPS.length - 1)) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />

            <div className="mt-2 flex justify-between">
              {STEPS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setStepIndex(i)}
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    i === stepIndex ? "text-primary" : "text-muted-foreground hover:text-foreground/60"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 gap-0 divide-y divide-white/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col gap-1.5 px-8 py-6 md:px-8">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Aktuelles E-Mail-Revenue
              </p>
              <motion.p
                key={`cur-${stepIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-foreground/80 text-2xl font-bold tabular-nums tracking-tight"
              >
                {formatEur(roi.currentEmailRevenue)}
              </motion.p>
              <p className="text-muted-foreground text-xs">bei 20&nbsp;% Nutzung</p>
            </div>

            <div className="flex flex-col gap-1.5 px-8 py-6 md:px-8">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Ungenutztes Potenzial
              </p>
              <motion.p
                key={`unt-${stepIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-2xl font-bold tabular-nums tracking-tight"
              >
                {formatEur(roi.untapped)}
              </motion.p>
              <p className="text-muted-foreground text-xs">
                {formatEur(roi.untapped / 12)}&nbsp;/ Monat verschenkt
              </p>
            </div>

            <div className="flex flex-col gap-1.5 px-8 py-6 md:px-8">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Rekurio vs. Agentur
              </p>
              <motion.p
                key={`sav-${stepIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-foreground/80 text-2xl font-bold tabular-nums tracking-tight"
              >
                {formatEur(roi.savingsVsAgency)}
              </motion.p>
              <p className="text-muted-foreground text-xs">Ersparnis pro Jahr vs. Agentur</p>
            </div>
          </div>

          {/* Footer-Zeile */}
          <div className="border-t border-white/8 px-8 py-6 md:px-10">
            <p className="text-muted-foreground text-sm text-balance">
              <span className="text-foreground font-semibold">{formatEur(roi.untapped)}</span> ungenutztes Revenue –
              Rekurio holt davon einen messbaren Teil zurück.
            </p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-muted-foreground mx-auto mt-5 max-w-3xl text-left text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          * Berechnung basiert auf dem E-Commerce-Branchendurchschnitt (15&nbsp;% E-Mail-Revenue-Anteil)
          und einer durchschnittlichen Klaviyo-Nutzungsrate von 20&nbsp;% im ICP-Segment.
          Individuelle Ergebnisse können abweichen.
        </motion.p>
      </div>
    </section>
  )
}
