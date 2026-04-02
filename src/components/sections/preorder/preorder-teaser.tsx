"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Lock, BarChart3, Zap, Sparkles, GitBranch,
  RefreshCcw, ShoppingCart, Users2, TrendingUp, Link2,
  ArrowRight, ArrowUp, CheckCircle2,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { EARLY_ACCESS_DISCOUNT_PERCENT } from "./preorder-offer"

const CYCLE_MS = 4400

// ─── Feature registry ────────────────────────────────────────────────────────

const features = [
  { id: "dashboard",   icon: BarChart3,   label: "Dashboard",          accent: "oklch(0.88 0.19 125)", locked: false },
  { id: "nba",         icon: Zap,         label: "Next-Best-Action",   accent: "oklch(0.65 0.22 280)", locked: true  },
  { id: "winback",     icon: RefreshCcw,  label: "Win-Back",           accent: "oklch(0.60 0.22 20)",  locked: false },
  { id: "cart",        icon: ShoppingCart,label: "Abandoned Cart",     accent: "oklch(0.78 0.16 72)",  locked: false },
  { id: "copy",        icon: Sparkles,    label: "KI-Copywriting",     accent: "oklch(0.68 0.18 220)", locked: true  },
  { id: "flows",       icon: GitBranch,   label: "Flow-Templates",     accent: "oklch(0.70 0.18 155)", locked: false },
  { id: "segment",     icon: Users2,      label: "Segmentierung",      accent: "oklch(0.60 0.20 260)", locked: true  },
  { id: "roi",         icon: TrendingUp,  label: "ROI-Rechner",        accent: "oklch(0.68 0.15 195)", locked: false },
  { id: "oauth",       icon: Link2,       label: "Klaviyo OAuth",      accent: "oklch(0.70 0.00 0)",   locked: false },
] as const

type FeatureId = typeof features[number]["id"]

// ─── Visual: Dashboard ───────────────────────────────────────────────────────

const bars = [42, 58, 51, 74, 83, 100]
const labels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"]

function VisualDashboard() {
  return (
    <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground/60 text-xs uppercase tracking-widest">Monatlicher Revenue</p>
          <p className="text-foreground text-4xl font-bold tabular-nums sm:text-5xl">€ 4.280</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 ring-1 ring-primary/30">
          <ArrowUp className="text-primary size-3.5" />
          <span className="text-primary text-sm font-bold">+34 %</span>
        </div>
      </div>
      <div className="flex flex-1 items-end gap-2 sm:gap-3">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <motion.div
              className={cn("w-full rounded-t-sm", i === bars.length - 1 ? "bg-primary" : "bg-primary/25")}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              style={{ minHeight: 4 }}
            />
            <span className="text-muted-foreground/35 text-[9px]">{labels[i]}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Revenue/Email", val: "+34 %", hi: true },
          { label: "Öffnungsrate",  val: "42.1 %", hi: false },
          { label: "Click-Rate",    val: "8.7 %",  hi: false },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/8 bg-white/3 px-3 py-2.5">
            <p className="text-muted-foreground/50 text-[9px] uppercase tracking-wide">{k.label}</p>
            <p className={cn("text-sm font-bold tabular-nums mt-0.5", k.hi ? "text-primary" : "text-foreground/65")}>{k.val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Visual: Next-Best-Action ────────────────────────────────────────────────

function VisualNBA() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
      <p className="text-muted-foreground/40 text-xs font-medium uppercase tracking-widest">Heute&apos;s Priorität</p>
      <div className="rounded-2xl border border-violet-500/25 bg-violet-500/8 p-5 sm:p-6">
        <p className="text-foreground/90 text-xl font-semibold leading-snug sm:text-2xl">
          Win-Back Flow aktivieren
        </p>
        <p className="text-violet-300/70 mt-1 text-sm">Deine inaktiven Kunden der letzten 90 Tage</p>
        <p className="text-violet-300 mt-4 text-4xl font-bold tabular-nums sm:text-5xl">
          +€ 1.240<span className="text-violet-300/50 text-lg font-medium"> / Mo.</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { label: "Post-Purchase Sequenz", val: "+€ 890 / Mo." },
          { label: "VIP-Segment anlegen",   val: "+€ 620 / Mo." },
        ].map((a) => (
          <div key={a.label} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-2.5">
            <span className="text-foreground/50 text-sm">{a.label}</span>
            <span className="text-foreground/35 text-sm font-semibold tabular-nums">{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Visual: Win-Back ────────────────────────────────────────────────────────

function VisualWinBack() {
  const total = 80
  const sleeping = Math.round(total * 0.23)
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <div>
        <p className="text-muted-foreground/40 text-xs uppercase tracking-widest">Deine Kundenbasis</p>
        <p className="text-foreground text-3xl font-bold sm:text-4xl">
          23 %<span className="text-foreground/40 text-xl font-medium"> schlafen gerade</span>
        </p>
      </div>
      {/* Dot grid */}
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2.5 w-2.5 shrink-0 rounded-full",
              i < sleeping ? "bg-rose-400/70" : "bg-white/20",
            )}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: i * 0.008 }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-500/8 px-5 py-4">
        <div>
          <p className="text-muted-foreground/60 text-xs">Win-Back Potenzial</p>
          <p className="text-rose-300 text-2xl font-bold tabular-nums">+€ 840 / Mo.</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-muted-foreground/50 text-xs">3 gerade reaktiviert</span>
        </div>
      </div>
    </div>
  )
}

// ─── Visual: Abandoned Cart ──────────────────────────────────────────────────

function VisualCart() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
      <div className="flex items-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center gap-1">
          <p className="text-foreground/30 text-5xl font-bold tabular-nums sm:text-6xl">68 %</p>
          <p className="text-muted-foreground/40 text-xs">verlassene Carts</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="text-amber-400/60 size-6" />
          <span className="text-muted-foreground/30 text-[9px]">Rekurio</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <motion.p
            className="text-amber-300 text-5xl font-bold tabular-nums sm:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            8.7 %
          </motion.p>
          <p className="text-amber-400/60 text-xs">Recovery Rate</p>
        </div>
      </div>
      <div className="h-px bg-white/6" />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
          <p className="text-muted-foreground/50 text-[10px] uppercase tracking-wide">Vorher (∅)</p>
          <p className="text-foreground/35 text-xl font-bold tabular-nums">€ 320 / Mo.</p>
        </div>
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 px-4 py-3">
          <p className="text-amber-400/60 text-[10px] uppercase tracking-wide">Mit Rekurio</p>
          <p className="text-amber-300 text-xl font-bold tabular-nums">+€ 1.440 / Mo.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Visual: KI-Copy ─────────────────────────────────────────────────────────

const variants = [
  { sub: "Du hast etwas vergessen… 👀", open: "48 %", best: false },
  { sub: "Nur noch 3 in deiner Größe",  open: "52 %", best: false },
  { sub: "Exklusiv für dich – heute",   open: "61 %", best: true  },
]

function VisualCopy() {
  const [cursor, setCursor] = useState(true)
  const [active, setActive] = useState(2)
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % variants.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
      {/* Fake email chrome */}
      <div className="rounded-xl border border-white/8 bg-black/30 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/6 px-3 py-2">
          <div className="flex gap-1">
            {[0,1,2].map(i => <div key={i} className="h-2 w-2 rounded-full bg-white/10" />)}
          </div>
          <span className="text-muted-foreground/40 text-[10px] mx-auto">Neues E-Mail – Rekurio KI</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground/40 w-14">An:</span>
            <span className="text-foreground/60">Win-Back Segment · 1.240 Kontakte</span>
          </div>
          <div className="flex items-baseline gap-2 text-xs">
            <span className="text-muted-foreground/40 w-14">Betreff:</span>
            <span className="text-foreground/80 font-medium">{variants[active].sub}</span>
            <span className={cn("w-px h-3.5 bg-foreground/70 inline-block", cursor ? "opacity-100" : "opacity-0")} />
          </div>
        </div>
      </div>
      {/* Variant comparison */}
      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground/40 text-[10px] uppercase tracking-widest">KI-Varianten</p>
        {variants.map((v, i) => (
          <motion.div
            key={v.sub}
            className={cn(
              "relative flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-[11px]",
              i === active ? "border-sky-500/30 bg-sky-500/8" : "border-white/5 bg-white/2",
            )}
          >
            <span className={cn("truncate", i === active ? "text-foreground/85" : "text-foreground/35")}>{v.sub}</span>
            <div className="flex shrink-0 items-center gap-2">
              <span className={cn("font-bold tabular-nums", i === active ? "text-sky-300" : "text-muted-foreground/25")}>{v.open}</span>
              {v.best && <span className="rounded-full bg-sky-500/20 px-1.5 py-0.5 text-[8px] font-bold text-sky-300 border border-sky-500/25">BEST</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Visual: Flow-Templates ──────────────────────────────────────────────────

const flowNodes = [
  { icon: ShoppingCart, label: "Trigger",  sub: "Kaufabbruch",   color: "text-amber-400",   bg: "bg-amber-500/15" },
  { icon: Zap,          label: "Mail 1",   sub: "+€ 420 / Mo.",  color: "text-sky-400",     bg: "bg-sky-500/15"   },
  { icon: RefreshCcw,   label: "3 Tage",   sub: "Wartezeit",     color: "text-white/30",    bg: "bg-white/5"      },
  { icon: Sparkles,     label: "Mail 2",   sub: "+€ 680 / Mo.",  color: "text-violet-400",  bg: "bg-violet-500/15"},
  { icon: TrendingUp,   label: "Revenue",  sub: "+€ 1.100 / Mo.", color: "text-primary",    bg: "bg-primary/15"   },
]

function VisualFlows() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
      <div>
        <p className="text-muted-foreground/40 text-xs uppercase tracking-widest">Beispiel: Cart-Abandonment Flow</p>
        <p className="text-foreground/70 text-sm mt-0.5">73 vorgefertigte Flows – aktivierbar in Minuten</p>
      </div>
      <div className="flex items-center justify-between overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {flowNodes.map((node, i) => {
          const Icon = node.icon
          return (
            <div key={node.label} className="flex shrink-0 items-center gap-2">
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.1 }}
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8", node.bg)}>
                  <Icon className={cn("size-5", node.color)} />
                </div>
                <p className="text-foreground/70 text-[10px] font-medium">{node.label}</p>
                <p className={cn("text-[9px] font-semibold tabular-nums", node.color)}>{node.sub}</p>
              </motion.div>
              {i < flowNodes.length - 1 && (
                <motion.div
                  className="flex shrink-0 items-center gap-0.5"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.25, delay: 0.2 + i * 0.1 }}
                >
                  <div className="h-px w-6 bg-white/15" />
                  <ArrowRight className="text-white/15 size-3 -ml-1.5" />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-3 flex items-center justify-between">
        <p className="text-emerald-400/70 text-sm">Gesamter Flow-Umsatz</p>
        <p className="text-emerald-300 text-2xl font-bold tabular-nums">+€ 2.100 / Mo.</p>
      </div>
    </div>
  )
}

// ─── Visual: Segmentierung ───────────────────────────────────────────────────

function VisualSegment() {
  const segs = [
    { name: "VIP",       pct: 15, rev: "€ 124/Kunde", color: "bg-indigo-500",   textColor: "text-indigo-300" },
    { name: "Aktiv",     pct: 45, rev: "€ 38/Kunde",  color: "bg-indigo-500/35",textColor: "text-foreground/50" },
    { name: "Inaktiv",   pct: 40, rev: "€ 2/Kunde",   color: "bg-white/8",      textColor: "text-foreground/25" },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <div>
        <p className="text-muted-foreground/40 text-xs uppercase tracking-widest">Deine Kundensegmente</p>
        <p className="text-foreground text-3xl font-bold sm:text-4xl">
          4×<span className="text-foreground/40 text-xl font-medium"> mehr Revenue mit VIP-Segment</span>
        </p>
      </div>
      <div className="flex gap-2 items-end" style={{ height: 100 }}>
        {segs.map((s, i) => (
          <motion.div
            key={s.name}
            className={cn("flex flex-col justify-end items-center rounded-xl overflow-hidden", s.color)}
            style={{ flex: s.pct }}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
          >
            <div className="p-2 text-center">
              <p className={cn("text-[10px] font-bold", s.textColor)}>{s.name}</p>
              <p className={cn("text-[9px] tabular-nums", s.textColor)}>{s.rev}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/8 px-5 py-3 flex items-center justify-between">
        <p className="text-indigo-400/70 text-sm">VIP-Reaktivierung Potenzial</p>
        <p className="text-indigo-300 text-2xl font-bold tabular-nums">+€ 1.860 / Mo.</p>
      </div>
    </div>
  )
}

// ─── Visual: ROI ─────────────────────────────────────────────────────────────

function VisualROI() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <p className="text-muted-foreground/40 text-xs uppercase tracking-widest">Dein Klaviyo-Potenzial</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1 rounded-2xl border border-white/8 bg-white/3 p-5">
          <p className="text-muted-foreground/50 text-xs uppercase tracking-wide">Aktueller Revenue</p>
          <p className="text-foreground/60 mt-1 text-4xl font-bold tabular-nums">€ 200k</p>
          <p className="text-muted-foreground/30 text-xs mt-1">Jahresumsatz</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="text-teal-400/50 size-8 hidden sm:block" />
          <ArrowRight className="text-teal-400/50 size-6 rotate-90 sm:hidden" />
          <p className="text-muted-foreground/30 text-[9px]">Rekurio</p>
        </div>
        <div className="flex-1 rounded-2xl border border-teal-500/30 bg-teal-500/8 p-5">
          <p className="text-teal-400/60 text-xs uppercase tracking-wide">Neues Potenzial</p>
          <motion.p
            className="text-teal-300 mt-1 text-4xl font-bold tabular-nums"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            +€ 28k
          </motion.p>
          <p className="text-teal-400/50 text-xs mt-1">/ Jahr</p>
        </div>
      </div>
    </div>
  )
}

// ─── Visual: OAuth ───────────────────────────────────────────────────────────

function VisualOAuth() {
  const steps = [
    { n: 1, label: "Klaviyo API-Key eingeben", done: true  },
    { n: 2, label: "Account wird analysiert",  done: true  },
    { n: 3, label: "Revenue-Insights live",    done: false },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <div>
        <p className="text-muted-foreground/40 text-xs uppercase tracking-widest">Setup</p>
        <p className="text-foreground text-3xl font-bold sm:text-4xl">
          &lt;&nbsp;2 Min<span className="text-foreground/40 text-xl font-medium"> bis zur ersten Analyse</span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            className={cn(
              "flex items-center gap-4 rounded-xl border px-5 py-4",
              step.done
                ? "border-primary/25 bg-primary/8"
                : "border-white/8 bg-white/3",
            )}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {step.done
              ? <CheckCircle2 className="text-primary size-5 shrink-0" />
              : <div className="h-5 w-5 shrink-0 rounded-full border border-white/20 flex items-center justify-center"><span className="text-muted-foreground/40 text-[10px] font-bold">{step.n}</span></div>
            }
            <span className={cn("text-sm font-medium", step.done ? "text-foreground/80" : "text-muted-foreground/40")}>
              {step.label}
            </span>
            {!step.done && (
              <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground/40">
                ausstehend
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Spotlight router ─────────────────────────────────────────────────────────

function FeatureVisual({ id }: { id: FeatureId }) {
  switch (id) {
    case "dashboard": return <VisualDashboard />
    case "nba":       return <VisualNBA />
    case "winback":   return <VisualWinBack />
    case "cart":      return <VisualCart />
    case "copy":      return <VisualCopy />
    case "flows":     return <VisualFlows />
    case "segment":   return <VisualSegment />
    case "roi":       return <VisualROI />
    case "oauth":     return <VisualOAuth />
  }
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function PreorderTeaser() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((p) => (p + 1) % features.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [paused])

  const handleSelect = useCallback((i: number) => {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 10000)
  }, [])

  const feat = features[active]

  return (
    <section id="preorder-teaser" className="section-spacing">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-10 flex max-w-2xl flex-col items-start gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Dein Klaviyo-Revenue – maximiert, automatisch.
          </h2>
          <p className="text-muted-foreground max-w-lg text-base text-balance">
            Erster Monat gratis, danach dauerhaft{" "}
            {EARLY_ACCESS_DISCOUNT_PERCENT}&nbsp;% günstiger als der Listenpreis.
          </p>
        </motion.div>

        {/* ── Feature spotlight ── */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border transition-colors duration-500"
          style={{
            borderColor: `color-mix(in oklch, ${feat.accent} 30%, transparent)`,
            background: `linear-gradient(160deg, oklch(0.10 0.02 260), oklch(0.13 0.03 260))`,
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Ambient glow per feature */}
          <div
            className="pointer-events-none absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in oklch, ${feat.accent} 8%, transparent), transparent)`,
            }}
          />

          {/* Feature header bar */}
          <div className="relative flex items-center justify-between border-b border-white/8 px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-500"
                style={{ background: `color-mix(in oklch, ${feat.accent} 18%, transparent)` }}
              >
                <feat.icon
                  className="size-4 transition-colors duration-500"
                  style={{ color: feat.accent }}
                />
              </div>
              <span className="text-foreground font-semibold transition-colors duration-500">
                {feat.label}
              </span>
            </div>
            {feat.locked && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                <Lock className="size-3" />
                Early Access
              </span>
            )}
          </div>

          {/* Animated visual */}
          <div className="relative" style={{ minHeight: 360 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FeatureVisual id={feat.id} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            key={`pb-${active}`}
            className="h-0.5 transition-colors duration-500"
            style={{ background: `color-mix(in oklch, ${feat.accent} 55%, transparent)`, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
          />
        </motion.div>

        {/* Feature pill navigation */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {features.map((f, i) => {
            const isActive = i === active
            return (
              <button
                key={f.id}
                onClick={() => handleSelect(i)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200"
                style={isActive
                  ? { background: `color-mix(in oklch, ${f.accent} 15%, transparent)`, borderColor: `color-mix(in oklch, ${f.accent} 40%, transparent)`, color: f.accent }
                  : { background: "oklch(1 0 0 / 0.04)", borderColor: "oklch(1 0 0 / 0.08)", color: "oklch(0.65 0 0)" }
                }
              >
                <f.icon className="size-3" />
                {f.label}
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
