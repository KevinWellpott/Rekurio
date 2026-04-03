"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

const ENTRIES = [
  { name: "Luca M.", city: "Hamburg" },
  { name: "Sarah K.", city: "Berlin" },
  { name: "Jonas W.", city: "München" },
  { name: "Anna R.", city: "Köln" },
  { name: "Felix B.", city: "Stuttgart" },
  { name: "Lisa H.", city: "Frankfurt" },
  { name: "Tim S.", city: "Düsseldorf" },
  { name: "Nina P.", city: "Leipzig" },
  { name: "Marc D.", city: "Hamburg" },
  { name: "Julia E.", city: "Wien" },
  { name: "David G.", city: "Zürich" },
  { name: "Lea C.", city: "München" },
  { name: "Max F.", city: "Berlin" },
  { name: "Sophie T.", city: "Bremen" },
  { name: "Jan K.", city: "Hannover" },
] as const

const ROTATE_MS = 4200

/**
 * Dezentes „Social Activity“-Toast (unten), ähnlich dem früheren Rotator –
 * wirkt als Urgency/Reassurance ohne die Seite zu überladen.
 */
export function PreorderActivityToast({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % ENTRIES.length)
        setVisible(true)
      }, 320)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const entry = ENTRIES[index]

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-4 left-1/2 z-[100] w-[min(100%-1.5rem,20rem)] -translate-x-1/2 md:left-6 md:translate-x-0",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong rounded-xl px-3.5 py-2.5"
          >
            <p className="text-foreground text-sm leading-snug">
              <span className="font-medium">{entry.name}</span>
              <span className="text-muted-foreground"> aus {entry.city}</span>
              <span className="text-muted-foreground"> hat sich für Early Access eingetragen</span>
            </p>
            <p className="text-muted-foreground mt-0.5 text-[10px] tracking-wide uppercase">
              Live-Aktivität
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
