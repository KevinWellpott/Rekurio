"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronRight, Gift } from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const viewportOnce = { once: true as const, amount: 0.2 }

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

export function CtaSection() {
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

    posthog.capture("cta_freebies_newsletter_submitted", { email: trimmed })

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id(),
          "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
        },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Das hat nicht geklappt. Bitte später erneut.")
        return
      }

      posthog.capture("cta_freebies_newsletter_succeeded", { email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage(
        "Danke — in deiner Inbox findest du bald die ersten Freebies und E-Mail-Marketing-Updates für deinen Store."
      )
      setEmail("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  return (
    <section id="cta" className="section-spacing">
      <div className="container">
        <motion.div
          className="glass mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-3xl p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="flex max-w-xl flex-col gap-3">
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center self-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              Jetzt starten
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              14 Tage kostenlos. Kein Risiko.
            </h2>
            <p className="text-muted-foreground text-base text-balance">
              Verbinde Klaviyo in wenigen Minuten, sieh deine KPIs sofort – und lass Rekurio dir sagen,
              welcher Flow als Nächstes den meisten Umsatz bringt. Start geht über deinen Account.
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="group w-full shadow-sm sm:w-auto">
              <Link
                href="/signup"
                onClick={() => posthog.capture("cta_signup_clicked")}
              >
                Kostenlos starten
                <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full text-foreground sm:w-auto [background:linear-gradient(158deg,rgba(209,254,73,0.04)_0%,rgba(255,255,255,0.015)_50%,rgba(255,255,255,0.025)_100%)] [border:1px_solid_rgba(255,255,255,0.16)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.68),inset_0_2px_10px_rgba(209,254,73,0.07),inset_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.22),0_4px_16px_rgba(0,0,0,0.18),0_0_0_0.5px_rgba(209,254,73,0.12)] [backdrop-filter:blur(44px)_saturate(250%)_brightness(1.02)] hover:[background:linear-gradient(158deg,rgba(209,254,73,0.06)_0%,rgba(255,255,255,0.025)_50%,rgba(255,255,255,0.04)_100%)]"
            >
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("cta_democall_clicked")}
              >
                <Calendar className="size-4" />
                Democall buchen
                <ChevronRight className="size-4 translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>

          <div className="border-white/10 flex w-full max-w-lg flex-col gap-4 border-t pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-primary inline-flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                <Gift className="size-3.5" />
                Wir tauschen deine E-Mail gegen Mehrwert
              </span>
            
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col items-stretch gap-3">
              <div className="flex w-full min-w-0 flex-col gap-2">
                <label htmlFor="cta-email" className="sr-only">
                  E-Mail für Freebies und Updates
                </label>
                <Input
                  id="cta-email"
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
                  aria-describedby={fieldError ? "cta-email-error" : undefined}
                  disabled={status === "loading"}
                  className={cn(
                    "h-11 w-full border-white/15 bg-black/20 text-foreground placeholder:text-muted-foreground/90",
                    fieldError &&
                      "border-destructive ring-2 ring-destructive/45 focus-visible:border-destructive focus-visible:ring-destructive/50"
                  )}
                />
                {fieldError ? (
                  <p
                    id="cta-email-error"
                    className="text-center text-sm text-destructive"
                    role="alert"
                  >
                    Bitte gültige E-Mail eingeben.
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={status === "loading"}
                className="group w-full"
              >
                {status === "loading" ? "Senden…" : "Freebies & Updates sichern"}
                <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Button>
              {message ? (
                <p
                  className={cn(
                    "text-sm",
                    status === "success" ? "text-primary" : "text-destructive"
                  )}
                  role="status"
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>

          <div className="text-muted-foreground flex flex-col items-center gap-3 text-xs sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
            <span>14 Tage Trial über Signup · Democall optional</span>
            <span>Newsletter mit Mehrwert · Doppeltes Opt-in möglich</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
