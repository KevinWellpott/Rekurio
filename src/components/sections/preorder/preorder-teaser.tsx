"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  BarChart3, Zap, RefreshCcw, ShoppingCart,
  Sparkles, GitBranch, Users2, TrendingUp, Link2, ArrowUp,
  Check, Wifi,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Liquid Glass helpers ──────────────────────────────────────────────────────
const LQ_BG = "linear-gradient(158deg,rgba(209,254,73,0.035) 0%,rgba(255,255,255,0.015) 50%,rgba(255,255,255,0.025) 100%)"
const LQ_FILTER = "blur(44px) saturate(250%) brightness(1.02)"
const LQ_BORDER = "1px solid rgba(255,255,255,0.16)"

function lqShadow(accentRgba: string, hovered: boolean) {
  const spec = "inset 0 1.5px 0 rgba(255,255,255,0.80),inset 0 3px 12px rgba(209,254,73,0.08),inset 1.5px 0 0 rgba(255,255,255,0.18),inset 0 -1.5px 0 rgba(0,0,0,0.26)"
  const depth = hovered
    ? `0 20px 56px rgba(0,0,0,0.38),0 4px 14px rgba(0,0,0,0.22),0 0 0 0.5px ${accentRgba}0.32)`
    : `0 8px 32px rgba(0,0,0,0.22),0 2px 8px rgba(0,0,0,0.12),0 0 0 0.5px ${accentRgba}0.16)`
  return `${spec},${depth}`
}

// ══════════════════════════════════════════════════════════════════════════════
// Visuals
// ══════════════════════════════════════════════════════════════════════════════

// 1 – Dashboard
const D_BARS = [38, 52, 47, 68, 79, 100]
const D_LABELS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"]
const D_REVENUES = [3840, 4120, 3960, 4480, 4760, 5380]

function VisualDashboard() {
  const [go, setGo] = useState(false)
  const [tick, setTick] = useState(0)
  useEffect(() => { const t = setTimeout(() => setGo(true), 200); return () => clearTimeout(t) }, [])
  useEffect(() => { const id = setInterval(() => setTick(n => n + 1), 3000); return () => clearInterval(id) }, [])
  const rev = D_REVENUES[tick % D_REVENUES.length]
  return (
    <div className="flex h-full flex-col gap-3 p-5 pt-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-[9px] uppercase tracking-widest text-white/30">Email Revenue</p>
          <AnimatePresence mode="wait">
            <motion.p key={rev} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="text-3xl font-bold tabular-nums text-foreground">
              € {rev.toLocaleString("de-DE")}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 ring-1 ring-primary/30">
          <ArrowUp className="size-3 text-primary" />
          <span className="text-xs font-bold text-primary">+34 %</span>
        </motion.div>
      </div>
      <div className="flex flex-1 items-end gap-1.5">
        {D_BARS.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-sm"
              style={{ background: i === D_BARS.length - 1 ? "oklch(0.92 0.19 125)" : "oklch(0.92 0.19 125 / 28%)", minHeight: 3 }}
              initial={{ height: 0 }} animate={{ height: go ? `${h * 0.9}%` : 0 }}
              transition={{ duration: 0.85, delay: 0.15 + i * 0.06, type: "spring", stiffness: 55, damping: 12 }}
            />
            <span className="text-[9px] text-white/25">{D_LABELS[i]}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-white/8 pt-2.5">
        {[{ l: "Open Rate", v: "48 %" }, { l: "CTR", v: "12 %" }, { l: "Unsub", v: "0.1 %" }].map(k => (
          <div key={k.l}><span className="text-[9px] uppercase tracking-wide text-white/25">{k.l}</span><p className="text-sm font-semibold text-foreground">{k.v}</p></div>
        ))}
      </div>
    </div>
  )
}

// 2 – Win-Back
const WB_STEPS = [
  { icon: "👥", label: "Lapsed Segment", count: "843" },
  { icon: "📧", label: "E-Mail versendet", count: "843" },
  { icon: "👁", label: "Geöffnet", count: "412" },
  { icon: "🖱", label: "Geklickt", count: "187" },
  { icon: "✅", label: "Zurückgewonnen", count: "94" },
]

function VisualWinBack() {
  const [rev, setRev] = useState(0)
  useEffect(() => {
    if (rev < WB_STEPS.length) { const t = setTimeout(() => setRev(r => r + 1), 500); return () => clearTimeout(t) }
    const t = setTimeout(() => setRev(0), 2800); return () => clearTimeout(t)
  }, [rev])
  return (
    <div className="flex h-full flex-col gap-1.5 p-5">
      <p className="mb-1 text-[9px] uppercase tracking-widest text-white/30">Win-Back Flow</p>
      <div className="mb-2 rounded-lg border border-rose-500/20 bg-rose-500/6 px-3 py-2">
        <p className="text-[9px] text-white/30 uppercase tracking-wide">Ungenutztes Potenzial</p>
        <p className="text-xl font-bold text-rose-400">+€ 840 / Mo.</p>
      </div>
      {WB_STEPS.map((s, i) => (
        <AnimatePresence key={s.label}>
          {i < rev && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }}
              className="flex items-center gap-2 overflow-hidden rounded-lg border border-white/7 bg-white/[0.025] px-3 py-1.5">
              <span className="text-sm">{s.icon}</span>
              <span className="flex-1 text-xs text-foreground/75">{s.label}</span>
              <span className="text-xs font-bold tabular-nums text-white/35">{s.count}</span>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  )
}

// 3 – Next-Best-Action
const NBA = [
  { label: "Win-Back Flow aktivieren", score: 94 },
  { label: "Cart-Reminder A/B-Test", score: 88 },
  { label: "VIP-Segment bereinigen", score: 81 },
  { label: "Betreffzeilen testen", score: 76 },
  { label: "Welcome-Flow optimieren", score: 71 },
]

function VisualNBA() {
  const [active, setActive] = useState(0)
  useEffect(() => { const id = setInterval(() => setActive(i => (i + 1) % NBA.length), 1900); return () => clearInterval(id) }, [])
  return (
    <div className="flex h-full flex-col gap-2 p-5">
      <p className="mb-1 text-[9px] uppercase tracking-widest text-white/30">Nächste Priorität</p>
      {NBA.map((a, i) => (
        <motion.div key={a.label} animate={{ opacity: i === active ? 1 : 0.3, x: i === active ? 3 : 0 }} transition={{ duration: 0.22 }}
          className="flex items-center gap-2 rounded-lg border px-3 py-2"
          style={{ background: i === active ? "rgba(209,254,73,0.06)" : "rgba(255,255,255,0.025)", borderColor: i === active ? "rgba(209,254,73,0.28)" : "rgba(255,255,255,0.06)" }}>
          {i === active
            ? <motion.div layoutId="nba-preorder-dot" className="size-1.5 shrink-0 rounded-full bg-primary" />
            : <div className="size-1.5 shrink-0 rounded-full bg-white/20" />}
          <span className="flex-1 text-xs text-foreground/80">{a.label}</span>
          <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: i === active ? "oklch(0.92 0.19 125)" : "rgba(255,255,255,0.22)" }}>{a.score}</span>
        </motion.div>
      ))}
    </div>
  )
}

// 4 – KI-Copywriting
const SUBJECTS = [
  "Hey {Name}, dein Warenkorb vermisst dich 🛒",
  "Nur noch 3 Stück – jetzt zuschlagen?",
  "{Vorname}, wir haben etwas für dich reserviert",
  "Letzte Chance: 20 % nur heute für dich",
  "Wir haben dich vermisst – komm zurück 💌",
]

function VisualCopywriting() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState("")
  const [cur, setCur] = useState(true)
  const c = useRef(0)
  useEffect(() => {
    c.current = 0; setText(""); setCur(true)
    const target = SUBJECTS[idx]
    const id = setInterval(() => {
      c.current++; setText(target.slice(0, c.current))
      if (c.current >= target.length) { clearInterval(id); setCur(false); setTimeout(() => setIdx(i => (i + 1) % SUBJECTS.length), 2200) }
    }, 30)
    return () => clearInterval(id)
  }, [idx])
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.025]">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2">
          <span className="w-12 shrink-0 text-[9px] uppercase tracking-widest text-white/25">Von</span>
          <span className="text-xs text-foreground/50">hello@yourshop.com</span>
        </div>
        <div className="flex min-h-[2.5rem] items-start gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="w-12 shrink-0 text-[9px] uppercase tracking-widest text-white/25 pt-0.5">Betreff</span>
          <span className="text-xs text-foreground leading-snug">
            {text}
            {cur && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="ml-0.5 inline-block h-3 w-0.5 align-middle bg-primary" />}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          {[80, 65, 72, 45].map((w, i) => (
            <motion.div key={i} className="h-1.5 rounded-full bg-white/6" style={{ width: `${w}%` }}
              animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.8, delay: i * 0.3, repeat: Infinity }} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 self-start rounded-full bg-sky-500/10 px-3 py-1.5 ring-1 ring-sky-500/20">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="size-3 text-sky-400" />
        </motion.div>
        <span className="text-[10px] font-medium text-sky-400">KI-Vorschlag generiert</span>
      </div>
    </div>
  )
}

// 5 – Abandoned Cart
const CART_ITEMS = ["Linen Shirt (M)", "Canvas Sneaker", "Wool Sweater"]
const CART_TIMES = ["sofort", "nach 1h", "nach 24h"]

function VisualCart() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % CART_TIMES.length), 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="text-[9px] uppercase tracking-widest text-white/30">Abandoned Cart Recovery</p>
      <div className="flex flex-col gap-1.5">
        {CART_ITEMS.map((item, i) => (
          <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 rounded-lg border border-white/7 bg-white/[0.025] px-3 py-2">
            <ShoppingCart className="size-3 shrink-0 text-amber-400/60" />
            <span className="flex-1 text-xs text-foreground/70">{item}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2">
        {CART_TIMES.map((t, i) => (
          <motion.div key={t} animate={{ opacity: i === step ? 1 : 0.35, scale: i === step ? 1.05 : 1 }} transition={{ duration: 0.22 }}
            className="flex-1 rounded-lg border px-2 py-1.5 text-center"
            style={{ borderColor: i === step ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.06)", background: i === step ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.02)" }}>
            <span className="block text-[9px] uppercase tracking-wide text-white/30">E-Mail</span>
            <span className="text-[10px] font-semibold" style={{ color: i === step ? "rgba(251,191,36,1)" : "rgba(255,255,255,0.4)" }}>{t}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-lg border border-amber-400/20 bg-amber-400/6 px-3 py-2">
        <span className="text-[9px] uppercase tracking-wide text-white/30">Recovery Revenue</span>
        <p className="text-lg font-bold text-amber-400">+€ 890 / Mo.</p>
      </div>
    </div>
  )
}

// 6 – Flow-Templates
const FL = [
  { label: "Welcome Series", revenue: "+€ 1.240", active: true },
  { label: "Abandoned Cart", revenue: "+€ 890", active: true },
  { label: "Win-Back", revenue: "+€ 530", active: true },
  { label: "VIP Upgrade", revenue: "+€ 320", active: false },
]

function VisualFlows() {
  const [flash, setFlash] = useState<number | null>(null)
  useEffect(() => {
    const cycle = () => { const i = Math.floor(Math.random() * FL.length); setFlash(i); setTimeout(() => setFlash(null), 500) }
    const id = setInterval(cycle, 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-full flex-col gap-2 p-5">
      <p className="mb-1 text-[9px] uppercase tracking-widest text-white/30">Aktive Flows</p>
      {FL.map((f, i) => (
        <motion.div key={f.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          className="flex items-center gap-2 rounded-lg border px-3 py-2.5"
          style={{ background: flash === i ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.025)", borderColor: flash === i ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.07)", transition: "all 0.3s" }}>
          <motion.div className="size-1.5 shrink-0 rounded-full"
            style={{ background: f.active ? "oklch(0.92 0.19 125)" : "rgba(255,255,255,0.2)" }}
            animate={f.active ? { opacity: [1, 0.35, 1], scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }} />
          <span className="flex-1 text-xs text-foreground/75">{f.label}</span>
          <span className="text-[10px] font-semibold text-primary/80">{f.revenue}</span>
        </motion.div>
      ))}
    </div>
  )
}

// 7 – Segmentierung
const SEGS = [
  { label: "Champions", count: "284", pct: 100, color: "rgba(209,254,73," },
  { label: "Aktive Käufer", count: "1.240", pct: 80, color: "rgba(56,189,248," },
  { label: "At Risk", count: "613", pct: 52, color: "rgba(251,191,36," },
  { label: "Lapsed", count: "843", pct: 35, color: "rgba(251,113,133," },
]

function VisualSegment() {
  const [go, setGo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGo(true), 300); return () => clearTimeout(t) }, [])
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="mb-0.5 text-[9px] uppercase tracking-widest text-white/30">Segmente</p>
      {SEGS.map((s, i) => (
        <div key={s.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/70">{s.label}</span>
            <span className="text-xs font-semibold tabular-nums text-white/40">{s.count}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(to right,${s.color}0.9),${s.color}0.5))` }}
              initial={{ width: "0%" }} animate={{ width: go ? `${s.pct}%` : "0%" }}
              transition={{ duration: 1.0, delay: 0.1 + i * 0.1, type: "spring", stiffness: 50, damping: 14 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// 8 – ROI-Rechner
const ROI_VALS = [1240, 1890, 2350, 3120, 4480, 5820]

function VisualROI() {
  const [idx, setIdx] = useState(0)
  const [go, setGo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGo(true), 400); return () => clearTimeout(t) }, [])
  useEffect(() => { const id = setInterval(() => setIdx(i => (i + 1) % ROI_VALS.length), 2200); return () => clearInterval(id) }, [])
  const val = ROI_VALS[idx]
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="text-[9px] uppercase tracking-widest text-white/30">Ungenutztes Revenue</p>
      <AnimatePresence mode="wait">
        <motion.p key={val} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
          className="text-4xl font-bold tabular-nums text-foreground">
          +€ {val.toLocaleString("de-DE")}
        </motion.p>
      </AnimatePresence>
      <p className="text-xs text-muted-foreground">pro Monat – basierend auf deinem Jahresumsatz</p>
      <div className="mt-auto flex flex-col gap-1.5">
        {[40, 65, 80, 100].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
              <motion.div className="h-full rounded-full bg-primary/70"
                initial={{ width: "0%" }} animate={{ width: go ? `${w}%` : "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, type: "spring", stiffness: 55 }} />
            </div>
            <span className="w-10 text-right text-[9px] text-white/30">{w} %</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 9 – Klaviyo OAuth
function VisualOAuth() {
  const [connected, setConnected] = useState(false)
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => { setConnected(true); setTimeout(() => setPulse(true), 400) }, 1200)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-5">
      <div className="flex items-center gap-4">
        {/* Rekurio */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
          <span className="text-lg font-bold text-primary">R</span>
        </motion.div>

        {/* Beam */}
        <div className="relative flex h-2 w-20 items-center">
          <div className="absolute inset-0 rounded-full bg-white/8" />
          <AnimatePresence>
            {connected && (
              <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-primary/70" />
            )}
          </AnimatePresence>
          {connected && (
            <motion.div
              className="absolute left-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(209,254,73,0.6)]"
              animate={{ x: [0, 76, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
            />
          )}
        </div>

        {/* Klaviyo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
          <span className="text-lg font-bold text-foreground/70">K</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {pulse && (
          <motion.div initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Check className="size-3.5 text-primary" />
            </motion.div>
            <span className="text-xs font-medium text-primary">Klaviyo verbunden</span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs leading-snug text-muted-foreground max-w-[14rem]">
        1-Klick OAuth — kein API-Key, kein IT-Ticket.
      </p>
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
  accent: string   // rgba prefix
  accentFull: string
}

const CARDS: CardDef[] = [
  {
    id: "dashboard", icon: BarChart3,
    title: "Performance-Dashboard",
    desc: "Revenue, Open Rates und Deliverability auf einen Blick — live aus Klaviyo.",
    Visual: VisualDashboard, col: "col-span-3 lg:col-span-2",
    accent: "rgba(209,254,73,", accentFull: "oklch(0.92 0.19 125)",
  },
  {
    id: "winback", icon: RefreshCcw,
    title: "Win-Back Automation",
    desc: "Inaktive Kunden reaktivieren — zur richtigen Zeit, mit dem richtigen Angebot.",
    Visual: VisualWinBack, col: "col-span-3 lg:col-span-1",
    accent: "rgba(251,113,133,", accentFull: "oklch(0.60 0.22 20)",
  },
  {
    id: "nba", icon: Zap,
    title: "Next-Best-Action Engine",
    desc: "Die eine Maßnahme pro Tag, die deinen Umsatz am meisten bewegt.",
    Visual: VisualNBA, col: "col-span-3 lg:col-span-1",
    accent: "rgba(139,92,246,", accentFull: "oklch(0.65 0.22 280)",
  },
  {
    id: "copy", icon: Sparkles,
    title: "KI-Copywriting",
    desc: "Personalisierte Betreffzeilen und Flows, die konvertieren — in Sekunden.",
    Visual: VisualCopywriting, col: "col-span-3 lg:col-span-2",
    accent: "rgba(56,189,248,", accentFull: "oklch(0.68 0.18 220)",
  },
  {
    id: "cart", icon: ShoppingCart,
    title: "Abandoned Cart Recovery",
    desc: "Automatisierte Sequenz: sofort, 1h, 24h — jedes verlorene Item eine zweite Chance.",
    Visual: VisualCart, col: "col-span-3 lg:col-span-1",
    accent: "rgba(251,191,36,", accentFull: "oklch(0.78 0.16 72)",
  },
  {
    id: "flows", icon: GitBranch,
    title: "Flow-Templates",
    desc: "Welcome, Cart, Win-Back — Best-Practice-Flows, direkt in Klaviyo einsatzbereit.",
    Visual: VisualFlows, col: "col-span-3 lg:col-span-1",
    accent: "rgba(52,211,153,", accentFull: "oklch(0.70 0.18 155)",
  },
  {
    id: "segment", icon: Users2,
    title: "Segmentierung",
    desc: "Champions, Aktive, At-Risk — automatisch klassifiziert und stets aktuell.",
    Visual: VisualSegment, col: "col-span-3 lg:col-span-1",
    accent: "rgba(99,102,241,", accentFull: "oklch(0.60 0.20 260)",
  },
  {
    id: "roi", icon: TrendingUp,
    title: "ROI-Rechner",
    desc: "Sieh sofort, wie viel Revenue du monatlich liegen lässt.",
    Visual: VisualROI, col: "col-span-3 lg:col-span-2",
    accent: "rgba(209,254,73,", accentFull: "oklch(0.88 0.16 195)",
  },
  {
    id: "oauth", icon: Link2,
    title: "Klaviyo OAuth Connect",
    desc: "Kein API-Key, kein IT-Ticket. Verbunden in 60 Sekunden.",
    Visual: VisualOAuth, col: "col-span-3 lg:col-span-1",
    accent: "rgba(255,255,255,", accentFull: "rgba(255,255,255,0.7)",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// BentoCard
// ══════════════════════════════════════════════════════════════════════════════

function BentoCard({ card }: { card: CardDef }) {
  const [hovered, setHovered] = useState(false)
  const Icon = card.icon
  const { Visual } = card
  return (
    <motion.div
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl", card.col)}
      style={{ background: LQ_BG, border: LQ_BORDER, backdropFilter: LQ_FILTER, WebkitBackdropFilter: LQ_FILTER, boxShadow: lqShadow(card.accent, hovered) }}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-[11rem] flex-1 overflow-hidden">
        <Visual />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="relative border-t border-white/8 p-5">
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 rounded-b-2xl"
          style={{ background: `radial-gradient(ellipse 70% 120% at 15% 110%,${card.accent}0.10),transparent 70%)` }} />
        <motion.div animate={{ color: hovered ? card.accentFull : "rgba(255,255,255,0.35)" }} transition={{ duration: 0.22 }}>
          <Icon className="mb-3 size-5" />
        </motion.div>
        <h3 className="mb-1.5 text-sm font-semibold tracking-tight text-foreground/90 transition-colors duration-200 group-hover:text-foreground">{card.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Section export
// ══════════════════════════════════════════════════════════════════════════════

const viewportOnce = { once: true as const, amount: 0.08 }

export function PreorderTeaser() {
  return (
    <section className="section-spacing">
      <div className="container">
        <motion.div
          className="mb-10 flex max-w-3xl flex-col items-start gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was dich als Early-Access Nutzer erwartet.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Alle Features. Automatisch. Du startest einen Monat früher — und zahlst diesen Monat nicht.
          </p>
        </motion.div>

        <motion.div
          className="grid w-full auto-rows-[20rem] grid-cols-3 gap-4 md:auto-rows-[22rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CARDS.map(card => (
            <BentoCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
