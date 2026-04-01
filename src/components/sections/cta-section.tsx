"use client"

import { useState } from "react"
import { Calendar, ChevronRight, CreditCard, Unplug, X } from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const viewportOnce = { once: true as const, amount: 0.2 }

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

const trustBadges = [
  { icon: CreditCard, label: "Keine Kreditkarte nötig" },
  { icon: Unplug, label: "Klaviyo OAuth – kein API-Key" },
  { icon: X, label: "Kündigung jederzeit" },
]

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

    posthog.capture("cta_waitlist_signup_submitted", { email: trimmed })

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

      posthog.capture("cta_waitlist_signup_succeeded", { email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage("Danke – wir melden uns zum Launch.")
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
          className="glass mx-auto flex max-w-2xl flex-col items-start gap-8 rounded-3xl p-8 text-left md:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="flex flex-col gap-3">
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              Jetzt starten
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              Bereit, Klaviyo voll auszureizen?
            </h2>
            <p className="text-muted-foreground text-left text-base text-balance">
              Starte jetzt direkt oder buch einen kurzen Call – wir zeigen dir, wie Rekurio
              deinen konkreten Klaviyo-Setup sofort besser macht.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="w-full">
            <div
              className={cn(
                "mr-auto ml-0 flex w-full max-w-[min(100%,22rem)] flex-col gap-3",
                "sm:inline-grid sm:w-max sm:max-w-full sm:gap-4 sm:[grid-template-columns:minmax(0,max-content)]"
              )}
            >
              <div className="min-w-0 w-full sm:col-span-full sm:w-0 sm:min-w-full sm:max-w-full">
                <div className="flex min-w-0 flex-col gap-2">
                  <Input
                    id="cta-email"
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
                    aria-describedby={fieldError ? "cta-email-error" : undefined}
                    disabled={status === "loading"}
                    className={cn(
                      "h-11 w-full min-w-0 border-white/15 bg-black/20 text-foreground placeholder:text-muted-foreground/90",
                      fieldError &&
                        "border-destructive ring-2 ring-destructive/45 focus-visible:border-destructive focus-visible:ring-destructive/50"
                    )}
                  />
                  {fieldError ? (
                    <p
                      id="cta-email-error"
                      className="text-left text-sm text-destructive"
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
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture("cta_call_booking_clicked")}>
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
                    "col-span-full text-left",
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

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="text-muted-foreground flex items-center gap-1.5 text-xs"
              >
                <Icon className="size-3.5 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
