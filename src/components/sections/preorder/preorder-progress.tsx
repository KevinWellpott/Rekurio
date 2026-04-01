"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

// Simulierter Füllstand – anpassen wenn echte Daten vorliegen
const FILLED_PERCENT = 78
const TOTAL_SPOTS = 500
const TAKEN_SPOTS = Math.round((FILLED_PERCENT / 100) * TOTAL_SPOTS)

export function PreorderProgress() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="border-y border-white/8 bg-black/10 py-6">
      <div className="container">
        <div className="mx-auto flex max-w-lg flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">
              Verfügbare Early-Access-Plätze
            </span>
            <span className="text-foreground font-semibold">
              {TAKEN_SPOTS} / {TOTAL_SPOTS} vergeben
            </span>
          </div>

          <div className="bg-white/8 h-2 w-full overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: animated ? `${FILLED_PERCENT}%` : 0 }}
              transition={{ duration: 1.2, ease: [0.32, 0, 0.67, 0] }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="text-muted-foreground text-xs">
              <span className="text-foreground/80 font-semibold">{FILLED_PERCENT}%</span> der Plätze sind vergeben · Geplanter Launch: Q2 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
