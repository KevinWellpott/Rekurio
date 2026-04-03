"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  BarChart3, Zap, GitBranch, Sparkles,
  RefreshCcw, Users2, ArrowUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Accent colors (rgba for safe inline usage) ───────────────────────────────
const BRAND = "rgba(209,254,73,"    // lime green
const VIOLET = "rgba(139,92,246,"   // next-best-action
const EMERALD = "rgba(52,211,153,"  // flows
const SKY = "rgba(56,189,248,"      // copywriting
const ROSE = "rgba(251,113,133,"    // win-back
const INDIGO = "rgba(99,102,241,"   // segmentation

// ─── Liquid Glass helpers ─────────────────────────────────────────────────────
const LQ_BG = "linear-gradient(158deg,rgba(209,254,73,0.035) 0%,rgba(255,255,255,0.015) 50%,rgba(255,255,255,0.025) 100%)"
const LQ_FILTER = "blur(44px) saturate(250%) brightness(1.02)"
const LQ_BORDER = "1px solid rgba(255,255,255,0.16)"

function lqShadow(accentRgba: string, hovered: boolean) {
  const specular = "inset 0 1.5px 0 rgba(255,255,255,0.80),inset 0 3px 12px rgba(209,254,73,0.08),inset 1.5px 0 0 rgba(255,255,255,0.18),inset 0 -1.5px 0 rgba(0,0,0,0.26)"
  const depth = hovered
    ? `0 20px 56px rgba(0,0,0,0.38),0 4px 14px rgba(0,0,0,0.22),0 0 0 0.5px ${accentRgba}0.30)`
    : `0 8px 32px rgba(0,0,0,0.22),0 2px 8px rgba(0,0,0,0.12),0 0 0 0.5px ${accentRgba}0.15)`
  return `${specular},${depth}`
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 1 – Performance Dashboard
// ══════════════════════════════════════════════════════════════════════════════

const BARS = [38, 52, 47, 68, 79, 100]
const BAR_LABELS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"]
const KPIS = [
  { label: "Open Rate", val: "48 %" },
  { label: "CTR", val: "12 %" },
  { label: "Unsub", val: "0.1 %" },
]

function DashboardVisual() {
  const [mounted, setMounted] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 3200)
    return () => clearInterval(id)
  }, [])

  const revenues = [3840, 4120, 3960, 4480, 4760, 5380]
  const current = revenues[tick % revenues.length]

  return (
    <div className="flex h-full flex-col gap-3 p-5 pt-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-[10px] uppercase tracking-widest text-white/30">Email Revenue</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-3xl font-bold tabular-nums text-foreground"
            >
              € {current.toLocaleString("de-DE")}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 ring-1 ring-primary/30"
        >
          <ArrowUp className="size-3 text-primary" />
          <span className="text-xs font-bold text-primary">+34 %</span>
        </motion.div>
      </div>

      {/* Bar chart */}
      <div className="flex flex-1 items-end gap-1.5">
        {BARS.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-sm"
              style={{
                background: i === BARS.length - 1 ? "oklch(0.92 0.19 125)" : "oklch(0.92 0.19 125 / 30%)",
                minHeight: 4,
              }}
              initial={{ scaleY: 0, originY: "bottom" }}
              animate={{ scaleY: mounted ? 1 : 0, height: `${h * 0.9}%` }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.07, type: "spring", stiffness: 55, damping: 12 }}
            />
            <span className="text-[9px] text-white/25">{BAR_LABELS[i]}</span>
          </div>
        ))}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 border-t border-white/8 pt-3">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wide text-white/30">{kpi.label}</span>
            <span className="text-sm font-semibold text-foreground">{kpi.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 2 – Next-Best-Action
// ══════════════════════════════════════════════════════════════════════════════

const NBA_ACTIONS = [
  { label: "Win-Back Flow aktivieren", score: 94 },
  { label: "Cart-Reminder A/B-Test", score: 88 },
  { label: "VIP-Segment bereinigen", score: 81 },
  { label: "Betreffzeilen testen", score: 76 },
  { label: "Welcome-Flow optimieren", score: 71 },
]

function NBAVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % NBA_ACTIONS.length), 1900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full flex-col gap-2 p-5">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-white/30">Nächste Priorität</p>
      {NBA_ACTIONS.map((a, i) => (
        <motion.div
          key={a.label}
          animate={{ opacity: i === active ? 1 : 0.3, x: i === active ? 3 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 rounded-lg border px-3 py-2.5"
          style={{
            background: i === active ? "rgba(209,254,73,0.06)" : "rgba(255,255,255,0.025)",
            borderColor: i === active ? "rgba(209,254,73,0.28)" : "rgba(255,255,255,0.06)",
          }}
        >
          {i === active && (
            <motion.div
              layoutId="nba-dot"
              className="size-1.5 shrink-0 rounded-full bg-primary"
            />
          )}
          {i !== active && <div className="size-1.5 shrink-0 rounded-full bg-white/20" />}
          <span className="flex-1 text-xs leading-tight text-foreground/80">{a.label}</span>
          <span
            className="shrink-0 text-sm font-bold tabular-nums"
            style={{ color: i === active ? "oklch(0.92 0.19 125)" : "rgba(255,255,255,0.25)" }}
          >
            {a.score}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 3 – Flow-Templates
// ══════════════════════════════════════════════════════════════════════════════

const FLOWS = [
  { label: "Welcome Series", revenue: "+€ 1.240", active: true },
  { label: "Abandoned Cart", revenue: "+€ 890", active: true },
  { label: "Win-Back", revenue: "+€ 530", active: true },
  { label: "VIP Upgrade", revenue: "+€ 320", active: false },
]

function FlowsVisual() {
  const [flash, setFlash] = useState<number | null>(null)

  useEffect(() => {
    const cycle = () => {
      const idx = Math.floor(Math.random() * FLOWS.length)
      setFlash(idx)
      setTimeout(() => setFlash(null), 600)
    }
    const id = setInterval(cycle, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full flex-col gap-2 p-5">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-white/30">Aktive Flows</p>
      {FLOWS.map((flow, i) => (
        <motion.div
          key={flow.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 + i * 0.07 }}
          className="flex items-center gap-2.5 rounded-lg border border-white/7 px-3 py-2.5 transition-colors"
          style={{
            background: flash === i ? "rgba(209,254,73,0.08)" : "rgba(255,255,255,0.025)",
            borderColor: flash === i ? "rgba(209,254,73,0.25)" : "rgba(255,255,255,0.07)",
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          <motion.div
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: flow.active ? "oklch(0.92 0.19 125)" : "rgba(255,255,255,0.2)" }}
            animate={flow.active ? { opacity: [1, 0.35, 1], scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
          />
          <span className="flex-1 text-xs text-foreground/75">{flow.label}</span>
          <span className="text-[10px] font-semibold text-primary/80">{flow.revenue}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 4 – KI-Copywriting (Typewriter)
// ══════════════════════════════════════════════════════════════════════════════

const SUBJECTS = [
  "Hey {Name}, dein Warenkorb vermisst dich 🛒",
  "Nur noch 3 Stück – jetzt zuschlagen?",
  "{Vorname}, wir haben etwas für dich reserviert",
  "Letzte Chance: 20 % nur heute für dich",
  "Wir haben dich vermisst – komm zurück 💌",
]

function CopywritingVisual() {
  const [lineIdx, setLineIdx] = useState(0)
  const [text, setText] = useState("")
  const [cursor, setCursor] = useState(true)
  const charIdx = useRef(0)

  useEffect(() => {
    charIdx.current = 0
    setText("")
    setCursor(true)
    const target = SUBJECTS[lineIdx]

    const typeId = setInterval(() => {
      charIdx.current++
      setText(target.slice(0, charIdx.current))
      if (charIdx.current >= target.length) {
        clearInterval(typeId)
        setCursor(false)
        setTimeout(() => setLineIdx(i => (i + 1) % SUBJECTS.length), 2400)
      }
    }, 28)

    return () => clearInterval(typeId)
  }, [lineIdx])

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      {/* Email composer mock */}
      <div className="flex flex-1 flex-col gap-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.025]">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="w-12 shrink-0 text-[9px] uppercase tracking-widest text-white/25">Von</span>
          <span className="text-xs text-foreground/50">hello@yourshop.com</span>
        </div>
        <div className="flex min-h-[2.5rem] items-start gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="w-12 shrink-0 text-[9px] uppercase tracking-widest text-white/25 pt-0.5">Betreff</span>
          <span className="text-xs text-foreground leading-snug">
            {text}
            {cursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-0.5 inline-block h-3 w-0.5 align-middle bg-primary"
              />
            )}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          {[80, 65, 72, 45].map((w, i) => (
            <motion.div
              key={i}
              className="h-2 rounded-full bg-white/6"
              style={{ width: `${w}%` }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 2.8, delay: i * 0.35, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* AI badge */}
      <div className="flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1.5 ring-1 ring-sky-500/20 self-start">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="size-3 text-sky-400" />
        </motion.div>
        <span className="text-[10px] font-medium text-sky-400">KI-Vorschlag generiert</span>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 5 – Win-Back
// ══════════════════════════════════════════════════════════════════════════════

const WINBACK = [
  { label: "Lapsed Segment", count: "843", icon: "👥" },
  { label: "E-Mail versendet", count: "843", icon: "📧" },
  { label: "Geöffnet", count: "412", icon: "👁" },
  { label: "Geklickt", count: "187", icon: "🖱" },
  { label: "Zurückgewonnen", count: "94", icon: "✅" },
]

function WinBackVisual() {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (revealed < WINBACK.length) {
      const id = setTimeout(() => setRevealed(r => r + 1), 540)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setRevealed(0), 2800)
    return () => clearTimeout(id)
  }, [revealed])

  return (
    <div className="flex h-full flex-col gap-1.5 p-5">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-white/30">Win-Back Flow</p>
      {WINBACK.map((step, i) => (
        <AnimatePresence key={step.label}>
          {i < revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex items-center gap-2.5 overflow-hidden rounded-lg border border-white/7 bg-white/[0.025] px-3 py-2"
            >
              <span className="text-sm">{step.icon}</span>
              <span className="flex-1 text-xs text-foreground/75">{step.label}</span>
              <span className="text-xs font-bold tabular-nums text-foreground/40">{step.count}</span>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Visual 6 – Segmentierung
// ══════════════════════════════════════════════════════════════════════════════

const SEGS = [
  { label: "Champions", count: "284", pct: 100, rgb: "rgba(209,254,73," },
  { label: "Aktive Käufer", count: "1.240", pct: 80, rgb: "rgba(56,189,248," },
  { label: "At Risk", count: "613", pct: 52, rgb: "rgba(251,191,36," },
  { label: "Lapsed", count: "843", pct: 35, rgb: "rgba(251,113,133," },
]

function SegmentVisual() {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="mb-0.5 text-[10px] uppercase tracking-widest text-white/30">Segmente</p>
      {SEGS.map((seg, i) => (
        <div key={seg.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/70">{seg.label}</span>
            <span className="text-xs font-semibold tabular-nums text-foreground/45">{seg.count}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${seg.rgb}0.9), ${seg.rgb}0.55))` }}
              initial={{ width: "0%" }}
              animate={{ width: go ? `${seg.pct}%` : "0%" }}
              transition={{ duration: 1.0, delay: 0.1 + i * 0.12, type: "spring", stiffness: 50, damping: 14 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Card registry
// ══════════════════════════════════════════════════════════════════════════════

interface CardDef {
  id: string
  icon: React.ElementType
  title: string
  desc: string
  Visual: React.FC
  col: string
  accent: string   // rgba prefix e.g. "rgba(209,254,73,"
  accentFull: string  // full color for icon
}

const CARDS: CardDef[] = [
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Performance-Dashboard",
    desc: "Revenue, Open Rates und Deliverability auf einen Blick – live aus Klaviyo gezogen.",
    Visual: DashboardVisual,
    col: "col-span-3 lg:col-span-2",
    accent: BRAND,
    accentFull: "oklch(0.92 0.19 125)",
  },
  {
    id: "nba",
    icon: Zap,
    title: "Next-Best-Action Engine",
    desc: "Täglich die eine Maßnahme, die deinen Umsatz am meisten bewegt.",
    Visual: NBAVisual,
    col: "col-span-3 lg:col-span-1",
    accent: VIOLET,
    accentFull: "oklch(0.65 0.22 280)",
  },
  {
    id: "flows",
    icon: GitBranch,
    title: "Flow-Templates",
    desc: "Welcome, Abandoned Cart, Win-Back – sofort einsatzbereit, direkt in Klaviyo.",
    Visual: FlowsVisual,
    col: "col-span-3 lg:col-span-1",
    accent: EMERALD,
    accentFull: "oklch(0.70 0.18 155)",
  },
  {
    id: "copy",
    icon: Sparkles,
    title: "KI-Copywriting",
    desc: "Personalisierte Betreffzeilen und Texte, die konvertieren – generiert in Sekunden.",
    Visual: CopywritingVisual,
    col: "col-span-3 lg:col-span-2",
    accent: SKY,
    accentFull: "oklch(0.68 0.18 220)",
  },
  {
    id: "winback",
    icon: RefreshCcw,
    title: "Win-Back Automation",
    desc: "Inaktive Kunden reaktivieren – zum richtigen Zeitpunkt mit dem richtigen Angebot.",
    Visual: WinBackVisual,
    col: "col-span-3 lg:col-span-1",
    accent: ROSE,
    accentFull: "oklch(0.60 0.22 20)",
  },
  {
    id: "segment",
    icon: Users2,
    title: "Segmentierung",
    desc: "Champions, Aktive, At-Risk – automatisch klassifiziert, stets aktuell.",
    Visual: SegmentVisual,
    col: "col-span-3 lg:col-span-1",
    accent: INDIGO,
    accentFull: "oklch(0.60 0.20 260)",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// BentoCard
// ══════════════════════════════════════════════════════════════════════════════

function BentoCardItem({ card }: { card: CardDef }) {
  const [hovered, setHovered] = useState(false)
  const Icon = card.icon
  const { Visual } = card

  return (
    <motion.div
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl", card.col)}
      style={{
        background: LQ_BG,
        border: LQ_BORDER,
        backdropFilter: LQ_FILTER,
        WebkitBackdropFilter: LQ_FILTER,
        boxShadow: lqShadow(card.accent, hovered),
      }}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated visual */}
      <div className="relative min-h-[11rem] flex-1 overflow-hidden">
        <Visual />
        {/* Fade toward the label section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Label section (Motion.dev style: icon + title + description) */}
      <div className="relative border-t border-white/8 p-5">
        {/* Per-card accent glow behind label area on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 rounded-b-2xl"
          style={{
            background: `radial-gradient(ellipse 70% 120% at 15% 110%, ${card.accent}0.10), transparent 70%)`,
          }}
        />

        <motion.div
          animate={{ color: hovered ? card.accentFull : "rgba(255,255,255,0.35)" }}
          transition={{ duration: 0.25 }}
        >
          <Icon className="mb-3 size-6" />
        </motion.div>

        <h3 className="mb-1.5 text-base font-semibold tracking-tight text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Export
// ══════════════════════════════════════════════════════════════════════════════

export default function BentoDemo() {
  return (
    <div className="grid w-full auto-rows-[20rem] grid-cols-3 gap-4 md:auto-rows-[22rem]">
      {CARDS.map(card => (
        <BentoCardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
