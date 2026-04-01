"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

const NOTIFICATIONS = [
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
]

const INTERVAL = 3200

export function PreorderSocialProof({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % NOTIFICATIONS.length)
        setVisible(true)
      }, 350)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const notif = NOTIFICATIONS[currentIndex]

  return (
    <div className={cn("flex h-9 items-center justify-center", className)}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-medium">{notif.name}</span>{" "}
              aus {notif.city} hat sich gerade angemeldet
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
