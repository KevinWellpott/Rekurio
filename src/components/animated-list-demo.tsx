"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let flowEvents: Item[] = [
  {
    name: "Welcome Series aktiviert",
    description: "Flow startet für neue Subscriber",
    time: "gerade eben",
    icon: "👋",
    color: "#d1fe49",
  },
  {
    name: "Abandoned Cart – Versuch 2",
    description: "Reminder für 38 Kontakte",
    time: "vor 2 Min.",
    icon: "🛒",
    color: "#FF9500",
  },
  {
    name: "Win-Back gestartet",
    description: "Zielgruppe: 120-Tage-inaktiv",
    time: "vor 5 Min.",
    icon: "🔄",
    color: "#30D158",
  },
  {
    name: "Post-Purchase Flow",
    description: "Cross-Sell nach erstem Kauf",
    time: "vor 8 Min.",
    icon: "📦",
    color: "#0A84FF",
  },
  {
    name: "Sunset Flow eingerichtet",
    description: "Bereinigung inaktiver Kontakte",
    time: "vor 12 Min.",
    icon: "🌅",
    color: "#BF5AF2",
  },
  {
    name: "Browse Abandonment",
    description: "Produktseite → kein Kauf",
    time: "vor 15 Min.",
    icon: "👁️",
    color: "#FF3B30",
  },
]

flowEvents = Array.from({ length: 5 }, () => flowEvents).flat()

const FlowNotification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {flowEvents.map((item, idx) => (
          <FlowNotification {...item} key={idx} />
        ))}
      </AnimatedList>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
    </div>
  )
}
