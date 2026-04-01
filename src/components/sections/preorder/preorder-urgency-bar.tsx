"use client"

import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const trustItems = [
  "✓ Kein API-Key nötig",
  "✓ Klaviyo OAuth",
  "✓ Ergebnisse ab Tag 1",
  "✓ Monatlich kündbar",
  "✓ Frühbucherpreise gesichert",
  "✓ Persönliches Onboarding",
  "✓ Keine Kreditkarte nötig",
  "✓ KI-gestütztes Copywriting",
  "✓ Limitierte Early-Access Plätze",
]

function TrustItem({ text }: { text: string }) {
  return (
    <span
      className={cn(
        "text-primary/80 mx-6 shrink-0 text-[11px] font-semibold tracking-[0.2em] uppercase"
      )}
    >
      {text}
    </span>
  )
}

export function PreorderUrgencyBar() {
  return (
    <div className="border-y border-primary/15 bg-primary/5 py-3 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:35s]">
        {trustItems.map((item) => (
          <TrustItem key={item} text={item} />
        ))}
      </Marquee>
    </div>
  )
}
