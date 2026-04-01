"use client"

import { useState } from "react"
import { Calendar, ChevronRight, Lock } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

// Fake avatars (initials) – ersetze mit echten Fotos sobald vorhanden
const avatars = ["MK", "LS", "JR", "TW", "AP"]

function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [fieldError, setFieldError] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setFieldError(true)
      return
    }
    setFieldError(false)
    setStatus("loading")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Das hat nicht geklappt. Bitte später erneut.")
        return
      }
      setStatus("success")
      setMessage("Du bist dabei. Wir melden uns, bevor alle gehen.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass flex flex-col items-center gap-3 rounded-2xl px-8 py-6 text-center"
      >
        <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
          <span className="text-primary text-xl">✓</span>
        </div>
        <p className="text-foreground font-semibold">{message}</p>
        <p className="text-muted-foreground text-sm">
          Schau auch in deinen Spam-Ordner.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <label htmlFor="preorder-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <Input
            id="preorder-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="deine@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (fieldError) setFieldError(false)
            }}
            aria-invalid={fieldError}
            disabled={status === "loading"}
            className={cn(
              "h-12 w-full border-white/15 bg-black/25 text-base text-foreground placeholder:text-muted-foreground/70",
              fieldError && "border-destructive ring-2 ring-destructive/40"
            )}
          />
          {fieldError && (
            <p className="text-center text-sm text-destructive sm:text-left" role="alert">
              Bitte eine gültige E-Mail eintragen
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-12 shrink-0 px-6 text-base font-semibold sm:w-auto"
        >
          {status === "loading" ? (
            "Moment…"
          ) : (
            <>
              <Lock className="size-4" />
              Platz sichern
            </>
          )}
        </Button>
      </div>

      {message && status === "error" && (
        <p className="mt-2 text-center text-sm text-destructive" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}

export function PreorderHero() {
  return (
    <section
      id="preorder-hero"
      className="section-spacing relative overflow-hidden"
    >
      {/* Lime Glow von unten */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[min(80vw,42rem)] w-[min(140vw,72rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,oklch(0.92_0.19_125/0.18),transparent_65%)] blur-3xl"
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">

          {/* Scarcity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.05, type: "spring" }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Limitierter Early Access · Nur noch wenige Plätze verfügbar
            </span>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col gap-5">
            <motion.h1
              className="from-foreground to-foreground/50 bg-linear-to-br from-25% bg-clip-text text-4xl leading-[1.07] font-semibold tracking-[-0.04em] text-balance text-transparent sm:text-5xl md:text-[3.5rem]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, delay: 0.1, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Du lässt täglich Umsatz liegen. Rekurio holt ihn zurück.
            </motion.h1>

            <motion.p
              className="text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed tracking-tight text-balance"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.18, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Sichere dir jetzt deinen Early-Access-Platz – mit Frühbucherpreis
              und persönlichem Onboarding, bevor wir offiziell starten.
            </motion.p>
          </div>

          {/* Email Form */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.26, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <WaitlistForm />
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.34, type: "spring" }}
          >
            <p className="text-muted-foreground text-sm">
              Lieber direkt reden?{" "}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 group inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
              >
                Kostenlosen Call buchen
                <ChevronRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </p>
          </motion.div>

          {/* Social Proof Counter */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <div className="flex items-center gap-3">
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {avatars.map((initials, i) => (
                  <div
                    key={i}
                    className="bg-primary/20 border-background ring-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold text-primary ring-1"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">234+</span>{" "}
                DTC-Brands bereits auf der Warteliste
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
