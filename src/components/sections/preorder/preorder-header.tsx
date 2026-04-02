"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PreorderHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-50">
      <div className="container">
        <div className="pointer-events-auto grid h-16 grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
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

          <Button
            asChild
            size="sm"
            className="col-start-2 shrink-0 justify-self-end md:col-start-3"
          >
            <Link href="#preorder-hero">
              <Lock className="size-3.5" />
              Sichern
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
