"use client"

import { Marquee } from "@/components/ui/marquee"

const trustItems = [
  "Klaviyo per OAuth",
  "Kein API-Key nötig",
  "Keine Kreditkarte",
  "DSGVO-konform",
  "Launch Q2 2026",
  "In 2 Minuten eingerichtet",
  "Keine Kreditkarte für die Warteliste",
  "Persönliches Onboarding",
]

function TrustItem({ text }: { text: string }) {
  return (
    <span className="text-muted-foreground/50 mx-6 shrink-0 text-[11px] font-medium tracking-wide">
      {text}
    </span>
  )
}

function Separator() {
  return <span className="text-muted-foreground/25 mx-1 shrink-0 select-none text-[11px]">·</span>
}

export function PreorderUrgencyBar() {
  return (
    <div className="border-y border-white/5 bg-muted/20 py-3">
      <Marquee pauseOnHover className="[--duration:50s] [--gap:0rem]">
        {trustItems.map((item) => (
          <span key={item} className="flex items-center">
            <TrustItem text={item} />
            <Separator />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
