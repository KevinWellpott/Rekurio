"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function PartnerFormSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [channel, setChannel] = useState("")
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim()
    const trimmedName = name.trim()

    if (!trimmedName) {
      setFieldError("name")
      return
    }
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setFieldError("email")
      return
    }
    setFieldError(null)
    setStatus("loading")

    posthog.capture("partner_application_submitted", {
      email: trimmedEmail,
      name: trimmedName,
      channel: channel.trim() || "not_specified",
    })

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id(),
          "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Das hat nicht geklappt. Bitte später erneut.")
        return
      }
      posthog.capture("partner_application_succeeded", { email: trimmedEmail })
      posthog.identify(trimmedEmail, { email: trimmedEmail, name: trimmedName })
      setStatus("success")
      setMessage(
        "Super! Wir melden uns innerhalb von 24 Stunden bei dir mit deinem Partner-Link."
      )
      setEmail("")
      setName("")
      setChannel("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  return (
    <section id="partner" className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="glass mx-auto max-w-2xl rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="mb-8 flex flex-col gap-3">
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              Jetzt bewerben
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent">
              Partner werden
            </h2>
            <p className="text-muted-foreground text-base text-balance">
              Füll das Formular aus — wir melden uns innerhalb von 24 Stunden mit deinem
              persönlichen Referral-Link und Zugang zum Partner-Dashboard.
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              className="rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-primary font-semibold">{message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="partner-name" className="text-sm font-medium text-foreground/80">
                  Dein Name
                </label>
                <Input
                  id="partner-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Max Mustermann"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (fieldError === "name") setFieldError(null)
                  }}
                  aria-invalid={fieldError === "name"}
                  disabled={status === "loading"}
                  className={cn(
                    "h-11 border-white/15 bg-black/20",
                    fieldError === "name" && "border-destructive ring-2 ring-destructive/45"
                  )}
                />
                {fieldError === "name" && (
                  <p className="text-sm text-destructive" role="alert">Bitte Namen eingeben.</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="partner-email" className="text-sm font-medium text-foreground/80">
                  E-Mail-Adresse
                </label>
                <Input
                  id="partner-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="deine@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (fieldError === "email") setFieldError(null)
                  }}
                  aria-invalid={fieldError === "email"}
                  disabled={status === "loading"}
                  className={cn(
                    "h-11 border-white/15 bg-black/20",
                    fieldError === "email" && "border-destructive ring-2 ring-destructive/45"
                  )}
                />
                {fieldError === "email" && (
                  <p className="text-sm text-destructive" role="alert">Bitte gültige E-Mail eingeben.</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="partner-channel" className="text-sm font-medium text-foreground/80">
                  Wie erreichst du DTC-Brands? <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  id="partner-channel"
                  type="text"
                  placeholder="z.B. Newsletter, YouTube, Agentur, Instagram …"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  disabled={status === "loading"}
                  className="h-11 border-white/15 bg-black/20"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={status === "loading"}
                className="group w-full mt-2"
              >
                {status === "loading" ? "Bewerbung wird gesendet…" : "Bewerbung absenden"}
                <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>

              {status === "error" && (
                <p className="text-sm text-destructive text-center" role="alert">{message}</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
