"use client"

import { useState } from "react"
import { Calendar, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }

/** Gleiche Regel wie in `/api/subscribe` */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

export function Hero() {
  return (
    <section
      id="hero"
      className="section-spacing section-divider-b relative overflow-hidden"
    >
      {/* Gelber Schein von unten nach oben in die Section – nur Optik */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/2 h-[min(70vw,36rem)] w-[min(130vw,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_85%_65%_at_50%_100%,oklch(0.92_0.19_125/0.2),transparent_62%)] blur-3xl"
      />
      <div className="relative container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <motion.p
              className="text-primary/90 text-[11px] font-semibold tracking-[0.28em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Rekurio · DTC Retention
            </motion.p>

            <motion.h1
              className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-transparent sm:text-5xl md:text-[3.35rem] md:leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Hol mehr aus deinem <br /> Klaviyo raus.
            </motion.h1>

            <motion.p
              className="text-muted-foreground max-w-xl text-center text-lg font-medium leading-snug tracking-tight text-balance md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: "spring",
              }}
            >
              Rekurio zeigt dir täglich, was du als Nächstes tun solltest –
              und setzt es um.
            </motion.p>
          </div>

          <motion.div
            className="flex w-full justify-center px-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
          >
            <HeroLaunchForm calendlyUrl={calendlyUrl} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroLaunchForm({ calendlyUrl }: { calendlyUrl: string }) {
  const [email, setEmail] = useState("")
  const [fieldError, setFieldError] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setFieldError(true)
      setMessage("")
      setStatus("idle")
      return
    }

    setFieldError(false)
    setStatus("loading")
    setMessage("")

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
      setMessage("Danke — wir melden uns zum Launch.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="hero-email" className="sr-only">
        E-Mail für Launch-Updates
      </label>

      {/*
        Ein Block: Spaltenbreite = natürliche Breite der Button-Zeile (ab sm).
        E-Mail-Zeile: w-0 min-w-full verhindert, dass der Placeholder die Spalte aufzieht;
        die Spalte wird allein durch die zweite Zeile (flex + gap) bestimmt.
        Mobil: volle Breite (max. 22rem), E-Mail und Buttons gleich breit.
      */}
      <div
        className={cn(
          "mx-auto flex w-full max-w-[min(100%,22rem)] flex-col gap-3",
          "sm:inline-grid sm:w-max sm:max-w-full sm:gap-4 sm:[grid-template-columns:minmax(0,max-content)]"
        )}
      >
        <div className="min-w-0 w-full sm:col-span-full sm:w-0 sm:min-w-full sm:max-w-full">
          <div className="flex min-w-0 flex-col gap-2">
            <Input
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="E-Mail für deinen Zugang"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (fieldError) setFieldError(false)
              }}
              aria-invalid={fieldError}
              aria-describedby={fieldError ? "hero-email-error" : undefined}
              disabled={status === "loading"}
              className={cn(
                "h-11 w-full min-w-0 border-white/15 bg-black/20 text-foreground placeholder:text-muted-foreground/90",
                fieldError &&
                  "border-destructive ring-2 ring-destructive/45 focus-visible:border-destructive focus-visible:ring-destructive/50"
              )}
            />
            {fieldError ? (
              <p
                id="hero-email-error"
                className="text-center text-sm text-destructive"
                role="alert"
              >
                bitte mail eintragen
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:col-span-full sm:w-max sm:flex-row sm:gap-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="group w-full shadow-sm sm:w-auto"
          >
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="size-4" />
              Call buchen
              <ChevronRight className="size-4 translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </a>
          </Button>

          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={status === "loading"}
            className="w-full border-white/30 bg-white text-neutral-950 shadow-sm hover:bg-white/95 sm:w-auto"
          >
            {status === "loading" ? "Senden…" : "Zugang sichern"}
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {message ? (
          <p
            className={cn(
              "col-span-full text-center",
              status === "success"
                ? "text-sm text-primary"
                : "text-sm text-destructive"
            )}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
