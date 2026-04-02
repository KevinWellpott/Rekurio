"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/lib/config"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const footerColumns: {
  heading?: string
  links: { title: string; url: string }[]
}[] = [
  {
    links: [
      { title: "ROI", url: "/#roi" },
      { title: "Preise", url: "/pricing" },
      { title: "Partner", url: "/partner" },
      { title: "Demo buchen", url: "/pricing" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { title: "Impressum", url: "/impressum" },
      { title: "Datenschutz", url: "/datenschutz" },
      { title: "AGB", url: "/agb" },
    ],
  },
  {
    links: [
      { title: "Blog", url: "/blog" },
      { title: "Über uns", url: "/about" },
      { title: "Early Access", url: "/preorder" },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setStatus("error")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!res.ok) {
        setStatus("error")
        return
      }
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    } catch {
      setStatus("error")
    }
  }

  return (
    <footer className="border-t border-white/15 px-7 py-10 md:px-10"
      style={{
        background: "linear-gradient(158deg, rgba(209,254,73,0.03) 0%, rgba(255,255,255,0.012) 50%, rgba(255,255,255,0.022) 100%)",
        backdropFilter: "blur(44px) saturate(250%) brightness(1.02)",
        WebkitBackdropFilter: "blur(44px) saturate(250%) brightness(1.02)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.50)",
      }}
    >
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col gap-x-8 gap-y-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col items-start gap-y-4 lg:max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${siteConfig.name} – zur Startseite`}
            >
              <img
                className="h-10 w-auto max-h-12 object-contain object-left md:h-12"
                src="/logo.svg"
                alt=""
                width={180}
                height={48}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed tracking-tight">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-wrap items-start justify-start gap-x-12 gap-y-8 sm:gap-x-16">
            {footerColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-y-3">
                {column.heading ? (
                  <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
                    {column.heading}
                  </p>
                ) : null}
                <ul className="flex flex-col gap-y-2">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.url}
                        className="text-[15px] font-medium text-muted-foreground transition-colors duration-100 hover:text-foreground hover:underline hover:underline-offset-4"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full lg:max-w-sm">
            <p className="text-lg font-semibold text-foreground">Updates &amp; Kontakt</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Neuigkeiten zum Launch und Hilfe vom Team – kein Spam.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <Input
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === "error") setStatus("idle")
                }}
                placeholder="E-Mail-Adresse"
                required
                disabled={status === "loading"}
                className="h-11 min-w-0 flex-1 border-white/15 bg-black/20"
              />
              <Button
                type="submit"
                variant="default"
                disabled={status === "loading"}
                className="h-11 shrink-0 px-6 sm:w-auto"
              >
                {status === "loading"
                  ? "…"
                  : status === "success"
                    ? "Gesendet ✓"
                    : "Eintragen"}
              </Button>
            </form>
            {status === "error" ? (
              <p className="text-destructive mt-2 text-xs" role="alert">
                Bitte gültige E-Mail eingeben.
              </p>
            ) : null}
          </div>
        </div>

        <div className="text-muted-foreground mx-auto mt-12 max-w-6xl border-t border-white/[0.06] pt-8 text-xs">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-5">
              <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
              <Link href="/agb" className="hover:text-foreground transition-colors">AGB</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
