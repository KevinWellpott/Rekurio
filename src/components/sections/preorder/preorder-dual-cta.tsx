"use client"

import { useState } from "react"
import { Calendar, ChevronRight, CreditCard, Unplug, Lock } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

const trustBadges = [
  { icon: CreditCard, label: "Keine Kreditkarte nötig" },
  { icon: Unplug, label: "Klaviyo OAuth" },
  { icon: Lock, label: "Frühbucherpreis gesichert" },
]

const avatars = ["MK", "LS", "JR", "TW", "AP"]

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
      setMessage("Du bist dabei. Wir melden uns vor dem Launch.")
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
        className="flex flex-col items-start gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full">
            <span className="text-primary text-xs">✓</span>
          </div>
          <p className="text-foreground font-semibold text-sm">{message}</p>
        </div>
        <p className="text-muted-foreground text-xs">Schau auch in deinen Spam-Ordner.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="dual-cta-email" className="sr-only">E-Mail-Adresse</label>
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
            "h-11 w-full border-white/15 bg-black/25 text-foreground placeholder:text-muted-foreground/70",
            fieldError && "border-destructive ring-2 ring-destructive/40"
          )}
        />
        {fieldError && (
          <p className="text-sm text-destructive" role="alert">
            Bitte eine gültige E-Mail eintragen
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="w-full font-semibold"
        >
          {status === "loading" ? "Moment…" : (
            <>
              <Lock className="size-4" />
              Warteliste beitreten
            </>
          )}
        </Button>
        {message && status === "error" && (
          <p className="text-sm text-destructive" role="alert">{message}</p>
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
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="glass overflow-hidden rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* LEFT: Email Form */}
              <div className="flex flex-col gap-6 p-8 md:p-10">
                <div className="flex flex-col gap-2">
                  <span className="bg-primary/15 text-primary ring-primary/30 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                    Warteliste
                  </span>
                  <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-2xl font-semibold tracking-tighter text-balance text-transparent sm:text-3xl">
                    Platz auf der Warteliste sichern
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Trag dich ein – kostenlos, ohne Kreditkarte. Wir informieren dich als Erstes, wenn wir live gehen.
                  </p>
                </div>

                <EmailForm />

                {/* Trust Badges */}
                <div className="flex flex-col gap-2">
                  {trustBadges.map(({ icon: Icon, label }) => (
                    <div key={label} className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Icon className="size-3.5 shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2.5 border-t border-white/8 pt-4">
                  <div className="flex -space-x-1.5">
                    {avatars.map((initials, i) => (
                      <div
                        key={i}
                        className="bg-primary/20 border-background flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold text-primary"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    <span className="text-foreground/80 font-semibold">234+</span> bereits dabei
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative hidden items-stretch md:flex">
                <div className="border-white/8 absolute top-8 bottom-8 left-0 border-l" />
              </div>
              <div className="border-white/8 mx-8 border-t md:hidden" />

              {/* RIGHT: Call Booking */}
              <div className="flex flex-col gap-6 p-8 md:p-10">
                <div className="flex flex-col gap-2">
                  <span className="bg-white/8 text-foreground/70 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1 ring-white/10">
                    Direktgespräch
                  </span>
                  <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-2xl font-semibold tracking-tighter text-balance text-transparent sm:text-3xl">
                    Lieber sofort reden?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Buch dir einen kostenlosen 20-Minuten-Call mit uns. Wir schauen uns deine Klaviyo-Situation an und zeigen dir, was Rekurio konkret für dich tun kann.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group w-full border-white/20 bg-white/5 font-semibold text-foreground hover:bg-white/10"
                  >
                    <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                      <Calendar className="size-4" />
                      Kostenlosen Call buchen
                      <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </Button>

                  <p className="text-muted-foreground text-center text-xs">
                    Kein Verkaufsgespräch. Ehrliche Einschätzung, ob Rekurio zu dir passt.
                  </p>
                </div>

                {/* What to expect */}
                <div className="flex flex-col gap-2.5 border-t border-white/8 pt-4">
                  <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide">Im Call:</p>
                  {[
                    "Analyse deiner aktuellen Klaviyo-Nutzung",
                    "Konkrete Quick-Wins für dein Setup",
                    "Ehrliche Einschätzung zum Fit",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-primary font-bold">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
