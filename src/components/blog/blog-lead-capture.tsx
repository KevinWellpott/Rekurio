"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronRight, Mail } from "lucide-react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "https://calendly.com"

export type BlogLeadPlacement = "blog-index" | "blog-post"

type BlogLeadCaptureProps = {
  placement: BlogLeadPlacement
  className?: string
}

/**
 * Blog-Funnel: kalter Traffic → zuerst E-Mail (Newsletter/Updates),
 * dann Call, dann Link zur Produktseite.
 */
export function BlogLeadCapture({ placement, className }: BlogLeadCaptureProps) {
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
      return
    }

    setFieldError(false)
    setStatus("loading")
    setMessage("")

    posthog.capture("blog_newsletter_submitted", { placement, email: trimmed })

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

      posthog.capture("blog_newsletter_succeeded", { placement, email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage("Danke — bestätige kurz deine E-Mail im Postfach.")
      setEmail("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  const isPost = placement === "blog-post"

  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/10 p-6 md:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
          <Mail className="size-3.5" />
          Newsletter
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-foreground text-xl font-semibold tracking-tight text-balance md:text-2xl">
            {isPost
              ? "Magst du mehr davon?"
              : "Klaviyo-Updates für dein Postfach"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed text-balance">
            {isPost
              ? "Trag dich ein — wir schicken dir neue Artikel, Flow-Ideen und Revenue-Tipps. Kein Spam."
              : "Kalter Coffee, warmer Inhalt: praktische Tipps zu Klaviyo, DTC und E-Mail-Revenue — ohne Fluff."}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
            <label htmlFor={`blog-lead-${placement}`} className="sr-only">
              E-Mail-Adresse
            </label>
            <Input
              id={`blog-lead-${placement}`}
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
                "h-11 min-w-0 flex-1 border-white/15 bg-black/20 text-foreground",
                fieldError && "border-destructive ring-2 ring-destructive/40"
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="h-11 shrink-0 px-6 font-semibold sm:w-auto"
            >
              {status === "loading" ? "Senden…" : "Eintragen"}
            </Button>
          </div>
          {fieldError ? (
            <p className="text-destructive text-xs" role="alert">
              Bitte gültige E-Mail eingeben.
            </p>
          ) : null}
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

        <div className="flex w-full flex-col items-center gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/20 bg-transparent text-foreground hover:bg-white/5"
          >
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("blog_secondary_call_clicked", { placement })
              }
            >
              <Calendar className="size-3.5" />
              Call buchen
            </a>
          </Button>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium underline-offset-4 transition-colors hover:underline"
            onClick={() =>
              posthog.capture("blog_tertiary_pricing_clicked", { placement })
            }
          >
            Rekurio &amp; Preise ansehen
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
