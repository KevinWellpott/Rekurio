"use client"

import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

export function PreorderHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container">
        {/*
          3-Spalten-Grid: linke/rechte Spalte gleich breit (1fr), Mitte nur so breit wie das Badge.
          So sitzt „Early Access“ wirklich in der Viewport-Mitte – nicht wie bei justify-between verschoben.
          Mobil: 2 Spalten (Logo | CTA), Badge ausgeblendet.
        */}
        <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="flex shrink-0 items-center justify-self-start"
            aria-label="Rekurio – zur Startseite"
          >
            <img
              src="/logo.svg"
              alt=""
              width={180}
              height={48}
              className="h-12 w-auto max-h-14 object-contain object-left md:h-14"
            />
          </Link>

          <div className="hidden justify-self-center md:col-start-2 md:row-start-1 md:flex">
            <span className="bg-primary/10 text-primary ring-primary/25 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              Early Access
            </span>
          </div>

          <Button
            asChild
            size="sm"
            className="group col-start-2 shrink-0 justify-self-end md:col-start-3"
          >
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              <Calendar className="size-3.5" />
              Call buchen
              <ChevronRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
