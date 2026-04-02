"use client"

import { useState } from "react"
import {
  Lock,
  BarChart3,
  Sparkles,
  Zap,
  GitBranch,
  RefreshCcw,
  Users2,
  TrendingUp,
  ShoppingCart,
  Link2,
} from "lucide-react"
import { motion } from "motion/react"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BorderBeam } from "@/components/ui/border-beam"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { EARLY_ACCESS_DISCOUNT_PERCENT } from "./preorder-offer"

const viewportOnce = { once: true as const, amount: 0.15 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const offerItems = [
  { value: "1 Monat", label: "gratis zum Start" },
  { value: "1 Monat", label: "vor dem öffentlichen Launch" },
  { value: `\u2212${EARLY_ACCESS_DISCOUNT_PERCENT}\u202f%`, label: "dauerhaft auf den Listenpreis" },
]

const featureBadges = [
  {
    icon: BarChart3,
    label: "Dashboard",
    highlighted: true,
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground",
    glowColor: "oklch(0.92 0.19 125 / 0.55)",
  },
  {
    icon: Zap,
    label: "Next-Best-Action",
    highlighted: false,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    glowColor: "rgba(139,92,246,0.5)",
  },
  {
    icon: Sparkles,
    label: "KI-Copywriting",
    highlighted: false,
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    glowColor: "rgba(56,189,248,0.5)",
  },
  {
    icon: GitBranch,
    label: "Flow-Templates",
    highlighted: false,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "rgba(52,211,153,0.5)",
  },
  {
    icon: RefreshCcw,
    label: "Win-Back",
    highlighted: false,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    glowColor: "rgba(251,113,133,0.5)",
  },
  {
    icon: ShoppingCart,
    label: "Abandoned Cart",
    highlighted: false,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    glowColor: "rgba(251,191,36,0.5)",
  },
  {
    icon: Users2,
    label: "Segmentierung",
    highlighted: false,
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    glowColor: "rgba(129,140,248,0.5)",
  },
  {
    icon: TrendingUp,
    label: "ROI-Rechner",
    highlighted: false,
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
    glowColor: "rgba(45,212,191,0.5)",
  },
  {
    icon: Link2,
    label: "Klaviyo OAuth",
    highlighted: false,
    iconBg: "bg-white/10",
    iconColor: "text-foreground/60",
    glowColor: "rgba(255,255,255,0.2)",
  },
]

type Badge = (typeof featureBadges)[number]

function BadgeItem({ badge }: { badge: Badge }) {
  const [hovered, setHovered] = useState(false)
  const Icon = badge.icon

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium cursor-default transition-all duration-300",
        badge.highlighted
          ? "border border-primary/40 bg-primary/10 text-primary"
          : "text-foreground/70"
      )}
      style={badge.highlighted ? undefined : {
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all duration-300",
          badge.highlighted ? "bg-primary" : badge.iconBg
        )}
        style={undefined}
      >
        <Icon
          className={cn(
            "size-3",
            badge.highlighted ? "text-primary-foreground" : badge.iconColor
          )}
        />
      </div>
      <span className="whitespace-nowrap text-xs">{badge.label}</span>
    </div>
  )
}

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
    posthog.capture("preorder_hero_signup_submitted", { email: trimmed })

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
      posthog.capture("preorder_hero_signup_succeeded", { email: trimmed })
      posthog.identify(trimmed, { email: trimmed })
      setStatus("success")
      setMessage("Du bist dabei. Wir melden uns, bevor alle anderen Zugang bekommen.")
      setEmail("")
    } catch (err) {
      posthog.captureException(err)
      setStatus("error")
      setMessage("Netzwerkfehler. Bitte später erneut.")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-2 text-center"
      >
        <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
          <span className="text-primary text-xl">✓</span>
        </div>
        <p className="text-foreground font-semibold">{message}</p>
        <p className="text-muted-foreground text-sm">Schau auch in deinen Spam-Ordner.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <label htmlFor="preorder-email" className="sr-only">E-Mail-Adresse</label>
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
            "Moment\u2026"
          ) : (
            <>
              <Lock className="size-4" />
              Platz sichern
            </>
          )}
        </Button>
      </div>
      {message && status === "error" && (
        <p className="mt-2 text-center text-sm text-destructive" role="alert">{message}</p>
      )}
    </form>
  )
}

export function PreorderHero() {
  return (
    <section id="preorder-hero" className="section-spacing relative overflow-hidden pb-16">
      {/* Hintergrund-Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[min(80vw,52rem)] w-[min(160vw,88rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,oklch(0.92_0.19_125/0.20),transparent_62%)] blur-3xl"
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">

          {/* Headline */}
          <div className="flex flex-col gap-5">
            <motion.h1
              className="from-foreground to-foreground/50 bg-linear-to-br from-25% bg-clip-text text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-transparent sm:text-[2.6rem] sm:leading-[1.07] sm:tracking-[-0.04em] md:text-5xl lg:text-[3.5rem]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, delay: 0.08, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Du zahlst für Klaviyo. Aber nutzt 20&nbsp;% davon.
            </motion.h1>

            <motion.p
              className="text-muted-foreground mx-auto max-w-lg text-base leading-relaxed tracking-tight text-balance sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.16, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Rekurio holt den Rest raus &ndash; und zeigt dir täglich, welche eine Maßnahme deinen
              Umsatz am meisten bewegt. Ohne Agentur, ohne Overhead.
            </motion.p>
          </div>

          {/* Offer Block – 3-Spalten-Glas */}
          <motion.div
            className="glass-strong w-full max-w-md overflow-hidden rounded-2xl divide-x divide-white/10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.22, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="grid grid-cols-3">
              {offerItems.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-0.5 px-2 py-3 sm:px-3 sm:py-3.5">
                  <span className="text-primary text-base font-bold tracking-tight leading-none sm:text-lg">
                    {item.value}
                  </span>
                  <span className="text-muted-foreground text-[9px] leading-tight text-center sm:text-[10px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.28, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="glass-strong rounded-2xl p-4 sm:p-5">
              <WaitlistForm />
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Keine Kreditkarte &middot; DSGVO-konform &middot; Jederzeit abmeldbar
              </p>
            </div>
            <BorderBeam size={120} duration={7} colorFrom="oklch(0.92 0.19 125)" colorTo="transparent" />
          </motion.div>

        </div>

        {/* ── Feature Badges ── */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.35, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="text-muted-foreground mb-5 text-center text-xs font-medium uppercase tracking-widest">
            Was dich im Produkt erwartet
          </p>

          {/*
            Desktop (≥ md): Marquee mit Arc-Kurve via perspective + rotateX.
            Mobile (< md):  overflow-x scroll, kein sichtbarer Slider.
          */}
          <div className="hidden md:block">
            {/* Arc-Wrapper: erzeugt die Viertel-O-Kurven-Optik */}
            <div
              style={{
                perspective: "900px",
                perspectiveOrigin: "50% 0%",
              }}
            >
              <div
                style={{
                  transform: "rotateX(-7deg)",
                  transformOrigin: "center bottom",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <Marquee pauseOnHover className="[--duration:38s] [--gap:0.625rem]" repeat={3}>
                  {featureBadges.map((badge) => (
                    <BadgeItem key={badge.label} badge={badge} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>

          {/* Mobile: kein Marquee, kein sichtbarer Scrollbar */}
          <div
            className="md:hidden flex gap-2.5 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featureBadges.map((badge) => (
              <BadgeItem key={badge.label} badge={badge} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
