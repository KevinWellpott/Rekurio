"use client"

import { useState } from "react"
import { CreditCard, ShieldCheck, Lock, Tag } from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"
import { EARLY_ACCESS_DISCOUNT_PERCENT, earlyAccessOfferShort } from "./preorder-offer"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const trustBadges = [
  { icon: CreditCard, label: "Keine Kreditkarte n\u00f6tig" },
  { icon: ShieldCheck, label: "DSGVO-konform \u00b7 Double Opt-In" },
  { icon: Tag, label: `Dauerhaft ${EARLY_ACCESS_DISCOUNT_PERCENT}\u00a0% unter Listenpreis` },
]

function EmailForm() {
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

    posthog.capture("preorder_dual_cta_signup_submitted", { email: trimmed })

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
        setMessage(data.error || "Das hat nicht geklappt. Bitte sp\u00e4ter erneut.")
        return
      }
      posthog.capture("preorder_dual_cta_signup_succeeded", { email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage("Du bist dabei. Wir melden uns vor dem Launch.")
      setEmail("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte sp\u00e4ter erneut.")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-md flex-col items-center gap-3 text-center"
      >
        <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
          <span className="text-primary text-lg">&#10003;</span>
        </div>
        <p className="text-foreground font-semibold">{message}</p>
        <p className="text-muted-foreground text-sm">Schau auch in deinen Spam-Ordner.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-3">
        <label htmlFor="dual-cta-email" className="sr-only">
          E-Mail-Adresse
        </label>
        <Input
          id="dual-cta-email"
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
            "h-12 w-full border-white/15 bg-black/25 text-foreground placeholder:text-muted-foreground/70",
            fieldError && "border-destructive ring-2 ring-destructive/40"
          )}
        />
        {fieldError && (
          <p className="text-center text-sm text-destructive" role="alert">
            Bitte eine g\u00fcltige E-Mail eintragen
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-12 w-full font-semibold"
        >
          {status === "loading" ? (
            "Moment\u2026"
          ) : (
            <>
              <Lock className="size-4" />
              Jetzt Early Access sichern
            </>
          )}
        </Button>
        {message && status === "error" && (
          <p className="text-center text-sm text-destructive" role="alert">
            {message}
          </p>
        )}
      </div>
    </form>
  )
}

export function PreorderDualCta() {
  return (
    <section id="preorder-dual-cta" className="section-spacing">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
            <BorderBeam
              size={180}
              duration={9}
              colorFrom="oklch(0.92 0.19 125)"
              colorTo="transparent"
            />

            <div className="mx-auto flex max-w-lg flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-2xl font-semibold tracking-tighter text-balance text-transparent sm:text-3xl">
                  Der beste Zeitpunkt ist jetzt \u2013 bevor die Pl\u00e4tze weg sind.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">
                  Eintragen: kostenlos, in 20 Sekunden, keine Kreditkarte.{" "}
                  <span className="text-foreground/85 font-medium">{earlyAccessOfferShort}</span>
                </p>
              </div>

              <EmailForm />

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
