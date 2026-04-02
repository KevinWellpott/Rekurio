"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Calendar, ChevronRight, CreditCard, Unplug, X } from "lucide-react"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

const trustBadges = [
  { icon: CreditCard, label: "Keine Kreditkarte" },
  { icon: Unplug, label: "OAuth – kein API-Key" },
  { icon: X, label: "Jederzeit kündbar" },
]

function TrialForm() {
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
    posthog.capture("demo_trial_signup_submitted", { email: trimmed })
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
        setMessage(data.error || "Das hat nicht geklappt.")
        return
      }
      posthog.capture("demo_trial_signup_succeeded", { email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage("Danke — check deine Inbox für den Bestätigungslink.")
      setEmail("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <Input
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
          "h-11 border-white/15 bg-black/20",
          fieldError && "border-destructive ring-2 ring-destructive/45"
        )}
      />
      {fieldError && (
        <p className="text-sm text-destructive" role="alert">
          Bitte gültige E-Mail eingeben.
        </p>
      )}
      <Button
        type="submit"
        variant="outline"
        size="lg"
        disabled={status === "loading"}
        className="w-full border-white/30 bg-white text-neutral-950 hover:bg-white/95"
      >
        {status === "loading" ? "Senden…" : "14 Tage kostenlos starten"}
        <ChevronRight className="size-4" />
      </Button>
      {message && (
        <p
          className={cn(
            "text-sm",
            status === "success" ? "text-primary" : "text-destructive"
          )}
          role="status"
        >
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon className="size-3.5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </form>
  )
}

export function DemoBookingSection() {
  return (
    <section id="demo" className="section-spacing section-divider-b">
      <div className="container">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Demo booking */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <MagicCard
              className="h-full rounded-2xl p-px bg-card"
              gradientColor="rgba(209,254,73,0.08)"
              gradientFrom="#d1fe49"
              gradientTo="#9E7AFF"
            >
              <div className="flex h-full flex-col gap-6 rounded-2xl p-6 md:p-8">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="size-6 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-foreground text-xl font-semibold">Demo buchen</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    30&nbsp;Minuten mit dem Rekurio-Team. Wir analysieren dein Klaviyo-Setup live,
                    zeigen dir die größten Hebel und beantworten alle Fragen.
                  </p>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">→</span>
                    Live-Analyse deines Klaviyo-Accounts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">→</span>
                    Konkrete Next Steps für dein Setup
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">→</span>
                    Keine Sales-Pitch – echte Beratung
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="group w-full"
                  >
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => posthog.capture("demo_page_call_booking_clicked")}
                    >
                      <Calendar className="size-4" />
                      Termin wählen
                      <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </MagicCard>
          </motion.div>

          {/* Trial */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <MagicCard
              className="h-full rounded-2xl p-px bg-card"
              gradientColor="rgba(255,255,255,0.04)"
              gradientFrom="#ffffff"
              gradientTo="#888888"
            >
              <div className="flex h-full flex-col gap-6 rounded-2xl p-6 md:p-8">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/8">
                  <ChevronRight className="size-6 text-foreground/60" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-foreground text-xl font-semibold">14 Tage kostenlos testen</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Lieber direkt loslegen? Trag dich ein, verbinde Klaviyo und sieh deine ersten
                    Empfehlungen in unter 5&nbsp;Minuten — ohne Demo, ohne Wartezeit.
                  </p>
                </div>
                <div className="mt-auto">
                  <TrialForm />
                </div>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
