# Rekurio – Claude Kontext & Projektdokumentation

> Letzte Aktualisierung: 2026-04-01
> Gepflegt von: Claude (claude-sonnet-4-6)
> Zweck: Vollständige Projektübersicht für zukünftige Gespräche

---

## 1. Produkt & Positionierung

**Rekurio** ist ein SaaS-Tool für DTC-Brands (Direct-to-Consumer), das Klaviyo-Nutzer dabei unterstützt, ihr Email-Marketing-Potenzial vollständig auszuschöpfen.

**Kernversprechen:** "Hol mehr aus deinem Klaviyo raus."
**Positionierung:** Smarter Klaviyo-Assistent – Dashboard, Flows und Next-Best-Actions ohne Agentur-Overhead.
**Zielgruppe:** DTC-Brand-Inhaber und Marketing-Teams, die Klaviyo haben, aber nur 20% davon nutzen.

**Pain Points (aus der Seite):**
- Durchschnittlich nur 20% von Klaviyo-Features werden genutzt
- 30% der Kunden kaufen nach dem Erstkauf nie wieder
- Zeit & Budget verbrennen ohne messbare Resultate

**Kernfeatures:**
- Performance-Dashboard (KPIs, Trends, Deliverability)
- Flow-Template-Bibliothek (Welcome, Cart, Win-Back etc.)
- 1-Klick Klaviyo-Connect via OAuth (kein API-Key nötig)
- Next-Best-Action Engine (priorisierte To-dos nach Umsatz-Impact)
- KI-gestütztes Copywriting (im Growth-Plan)

---

## 2. Tech Stack

| Layer | Technologie | Version |
|-------|-------------|---------|
| Framework | Next.js (App Router) | 15.3.5 |
| UI Library | React | 19.1.0 |
| Sprache | TypeScript | 5.8.3 |
| Styling | Tailwind CSS v4 | 4.1.11 |
| Animationen | motion/react (Framer Motion) | 12.38.0 |
| UI-Komponenten | Radix UI + shadcn-Style | verschiedene |
| Design-System | MagicUI (eigene Komponenten) | - |
| Icons | Lucide React + react-icons | 0.417.0 / 5.5.0 |
| Themes | next-themes (forced dark) | 0.4.6 |
| PostCSS | @tailwindcss/postcss | 4.x |

**Wichtig:** Tailwind v4 – keine tailwind.config.js, Config in globals.css via CSS-Variablen.

---

## 3. Projektstruktur

```
/Users/kevinwellpott/Desktop/Projekte/SaaS/Rekurio/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Haupt-Landingpage (Produkt-Funnel)
│   │   ├── layout.tsx                  # Root layout (lang="de", dark forced)
│   │   ├── globals.css                 # Design-System, CSS-Variablen, Utility-Klassen
│   │   ├── sitemap.ts
│   │   ├── preorder/                   # ← NEU: Wartelisten-Funnel
│   │   │   └── page.tsx
│   │   ├── (marketing)/blog/           # Blog-Seiten
│   │   ├── (auth)/login|signup/        # Auth-Seiten
│   │   └── api/
│   │       ├── subscribe/route.ts      # Email-Capture API
│   │       ├── waitlist/               # Waitlist API (existiert)
│   │       └── og/route.tsx            # OG-Image-Generierung
│   ├── components/
│   │   ├── ui/                         # Basis UI-Komponenten
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── magic-card.tsx          # Gradient-Border-Card mit interaktivem Effekt
│   │   │   ├── border-beam.tsx         # Animierter rotierender Border
│   │   │   ├── animated-beam.tsx       # Animierte Verbindungslinien
│   │   │   ├── animated-list.tsx       # Liste mit Item-Animationen
│   │   │   ├── marquee.tsx             # Horizontal/Vertikal scrollend
│   │   │   ├── blur-fade.tsx           # Blur + Fade Animation
│   │   │   ├── retro-grid.tsx          # Retro-Grid-Hintergrund
│   │   │   └── number-ticker.tsx       # Animierter Nummern-Counter
│   │   ├── sections/
│   │   │   ├── header-1.tsx            # Sticky Nav Header (scrollanimiert)
│   │   │   ├── hero-2.tsx              # Hero + Email-Form (HeroLaunchForm)
│   │   │   ├── problem-section.tsx     # 3 Stat-Cards (Problem)
│   │   │   ├── how-it-works-section.tsx# 3-Schritte Prozess
│   │   │   ├── home-bento-section.tsx  # Feature-Showcase Grid
│   │   │   ├── testimonials-section.tsx# Scrollende Testimonials (Marquee)
│   │   │   ├── pricing-section.tsx     # 3 Pricing-Tiers
│   │   │   ├── cta-section.tsx         # Final CTA + Trust-Badges
│   │   │   └── preorder/               # ← NEU: Preorder-Funnel Sections
│   │   │       ├── preorder-header.tsx
│   │   │       ├── preorder-hero.tsx
│   │   │       ├── preorder-urgency-bar.tsx
│   │   │       ├── preorder-problem.tsx
│   │   │       ├── preorder-teaser.tsx
│   │   │       ├── preorder-benefits.tsx
│   │   │       ├── preorder-dual-cta.tsx
│   │   │       └── preorder-footer.tsx
│   │   ├── bento-demo.tsx              # Feature-Grid Demo (KPIs, Flows, Connect, NBA)
│   │   ├── animated-list-demo.tsx
│   │   ├── animated-beam-multiple-outputs.tsx
│   │   ├── icons.tsx
│   │   ├── menu.tsx
│   │   ├── drawer.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── config.tsx                  # siteConfig (Name, Links, FAQs, etc.)
│   │   ├── utils.ts                    # cn(), constructMetadata()
│   │   └── blog.ts
│   └── assets/fonts/
├── public/
│   ├── android-chrome-512x512.png      # App-Icon / Logo
│   ├── site-background.png             # Full-Page Hintergrundbild
│   └── favicon.ico
├── CLAUDE_CONTEXT.md                   # Diese Datei
└── src/package.json
```

---

## 4. Design-System (globals.css)

**Tailwind v4** – Config über CSS-Variablen in `:root`.

### Farben (oklch)
| Token | Wert | Verwendung |
|-------|------|------------|
| `--primary` | `oklch(0.92 0.19 125)` | Lime-Grün `#d1fe49` – Brand-Farbe |
| `--background` | `oklch(0.12 0.01 260)` | Sehr dunkles Navy |
| `--foreground` | `oklch(0.985 0 0)` | Fast-Weiß |
| `--muted-foreground` | `oklch(0.65 0.01 260)` | Grau für Body-Text |
| `--card` | `oklch(0.17 0.01 260)` | Card-Hintergrund |
| `--border` | `oklch(1 0 0 / 0.1)` | Subtiler weißer Border |
| `--ring` | `oklch(0.72 0.16 125)` | Focus-Ring (Lime) |

### Glassmorphism
```css
.glass          /* border + fill + blur – für Cards */
.glass-strong   /* stärkerer Hintergrund */
.glass-inner    /* fill + blur, kein border */
```

### Layout-Utilities
```css
.container          /* Responsive max-width wrapper */
.section-spacing    /* Padding oben/unten (fluid clamp) */
.section-divider-b  /* Border-Bottom zwischen Sections */
```

### Animationen (definiert in globals.css)
- `marquee` / `marquee-vertical` – für Marquee-Komponente
- `border-beam` – rotierender Border-Effekt
- `accordion-down/up` – Accordion
- `ripple`, `shimmer-slide`, `spin-around`

### Animations-Pattern (motion/react)
```tsx
// Standard viewport config
const viewportOnce = { once: true as const, amount: 0.15 }

// Standard transition
transition={{ duration: 0.6, delay: 0.1, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}

// Stagger: delay: 0.1 + i * 0.12
```

---

## 5. Bestehende Seite `/` – Haupt-Landingpage

**Zweck:** Produkt-Funnel → Abo abschließen / Call buchen / Email sammeln

**Section-Reihenfolge:**
```
Header → Hero → ProblemSection → HowItWorksSection → HomeBentoSection → TestimonialsSection → PricingSection → CtaSection
```

### Sections im Detail

**Header (`header-1.tsx`)**
- Sticky, scrollanimiert
- Logo scrollt raus, Nav-Pill bleibt + "Call buchen" Button erscheint
- Nav-Links: Problem, So funktioniert's, Features, Preise
- Mobile: Hamburger-Menu
- Calendly-Link via `NEXT_PUBLIC_CALENDLY_URL`

**Hero (`hero-2.tsx`)**
- Tagline: "Rekurio · DTC Retention"
- Headline: "Hol mehr aus deinem Klaviyo raus."
- Sub: "Rekurio zeigt dir täglich, was du als Nächstes tun solltest – und setzt es um."
- Form: `HeroLaunchForm` – Email-Input + "Call buchen" (primary) + "Updates sichern" (outline)
- Radial-Glow von unten

**ProblemSection (`problem-section.tsx`)**
- Badge: "Das Problem"
- Headline: Über 20% Nutzung
- 3 Stat-Cards: 20% genutzt / 30% kaufen nie wieder / Zeit & Budget verbrannt
- `NumberTicker` in Cards

**HowItWorksSection (`how-it-works-section.tsx`)**
- Badge: "So funktioniert's"
- 3 Schritte: ~~Waitlist~~ → Klaviyo verbinden → Flows & Actions umsetzen
- **⚠️ GEÄNDERT:** Schritt 1 war "Waitlist" – wurde auf "Kostenlos starten" geändert

**HomeBentoSection (`home-bento-section.tsx`)**
- Badge: "Features"
- BentoDemo-Grid: Dashboard / Flow-Templates / 1-Klick-Connect / Next-Best-Actions

**TestimonialsSection (`testimonials-section.tsx`)**
- Badge: "Aus der Praxis"
- 6 Testimonials (TODO: echte Testimonials eintragen)
- Doppel-Marquee (normal + reversed)

**PricingSection (`pricing-section.tsx`)**
- 3 Tiers: Starter / Growth (featured, BorderBeam) / Pro
- Alle Preise: "??" (TODO: Preise eintragen)
- MagicCard für alle Tiers
- **⚠️ GEÄNDERT:** Fußnote ohne Waitlist-Erwähnung

**CtaSection (`cta-section.tsx`)**
- Glass-Card
- Email-Form + Calendly-Button
- 3 Trust-Badges: Keine Kreditkarte / Klaviyo OAuth / Kündigung jederzeit
- **⚠️ GEÄNDERT:** Texte auf Abo-Fokus (statt Warteliste)

---

## 6. Neue Seite `/preorder` – Wartelisten-Funnel

**Zweck:** Email sammeln (primary) + Call buchen (secondary)
**Psychologie:** Curiosity → FOMO → Pain → Desire → Trust → Action

**Section-Reihenfolge:**
```
PreorderHeader → PreorderHero → PreorderUrgencyBar → PreorderProblem → PreorderTeaser → PreorderBenefits → PreorderDualCta → PreorderFooter
```

### Psychologisches Framework

| Phase | Section | Hebel |
|-------|---------|-------|
| Hook | Header + Hero | Curiosity, Scarcity Badge |
| Trust | Urgency Bar | Social Proof (Anzahl Brands) |
| Pain | Problem | Pain Agitation |
| Desire | Teaser | Curiosity Gap, FOMO |
| Reason | Benefits | Exklusivität, Reciprocity |
| Action | Dual CTA | Low-Friction Email + High-Intent Call |

### Conversion-Events (priorisiert)
1. **Email eintragen** – niedrigste Hürde, höchstes Volumen
2. **Call buchen** – höchster Intent, direktester Abschluss

---

## 7. API-Routen

### POST `/api/subscribe`
- Input: `{ email: string }`
- Validierung: Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Providers (via `CRM_PROVIDER` env):
  - `klaviyo` (default): Bulk-Subscribe via Klaviyo API
  - `pipedrive`: Contact erstellen
  - `none`: Nur loggen
- Success: `{ ok: true, provider: "klaviyo" }`
- Error: `{ error: "message" }` (400/502)

---

## 8. Environment Variables

```env
# CRM
CRM_PROVIDER=klaviyo
KLAVIYO_PRIVATE_API_KEY=pk_...
KLAVIYO_LIST_ID=...
KLAVIYO_API_REVISION=2024-10-15

# Pipedrive (Alternativ)
PIPEDRIVE_API_TOKEN=...
PIPEDRIVE_COMPANY_DOMAIN=...

# Public
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...   # Wichtig: Call-Booking
```

---

## 9. siteConfig Highlights (lib/config.tsx)

```typescript
siteConfig.name = "Rekurio"
siteConfig.links.email = "hello@rekurio.com"
siteConfig.url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
// TODO: Twitter/Instagram noch auf magicuidesign – muss aktualisiert werden
```

---

## 10. Wichtige Entwicklungs-Regeln

1. **globals.css NICHT anfassen** – Design-System ist fertig, Änderungen brechen UI
2. **Tailwind v4** – Keine `tailwind.config.js`, alle Custom-Tokens in `:root` von globals.css
3. **Dark mode forced** – `next-themes` mit `defaultTheme="dark"`, keine Light-Mode-Logik nötig
4. **motion/react** – nicht `framer-motion`, der Import heißt `from "motion/react"`
5. **`"use client"`** – an jeder Datei die useState/useEffect/motion nutzt
6. **Path-Alias** – `@/` = `src/`
7. **Bestehende Sections nicht brechen** – Neue Komponenten für `/preorder` sind eigenständig

---

## 11. Offene TODOs (aus dem Code)

- [ ] Pricing: Preise eintragen (alle auf "??")
- [ ] Testimonials: Echte Testimonials sammeln (6 Platzhalter)
- [ ] siteConfig.links: Twitter/Instagram aktualisieren (noch magicuidesign)
- [ ] Pricing CTA Buttons: `href="#"` – auf echte Signup-URLs zeigen lassen
- [ ] NEXT_PUBLIC_CALENDLY_URL: Echten Calendly-Link eintragen

---

## 12. Funnel-Strategie (Entschieden am 2026-04-01)

### Warum zwei Funnels?
Die ursprüngliche Seite mischte Wartelisten-Sprache ("frühen Zugang sichern", "Waitlist" als How-it-works Schritt 1) mit Produkt-Sprache (Pricing, vollständige Features). Das verwässerte beide Ziele.

### Lösung
- `/preorder` = Wartelisten-Funnel (teaser, FOMO, Email + Call)
- `/` = Produkt-Landingpage (Vollständige Features, Pricing, Abo-Abschluss)

### Traffic-Routing (Empfehlung)
- **Kalte Ads / Social Media** → `/preorder` (Interesse wecken, Email sammeln)
- **Direktsuche / Warm Traffic** → `/` (Kaufbereit, alle Infos)
- **Wartelisten-Email-Sequenz** → nach 3-5 Mails → Link zu `/`

---

## 13. Datei-Konventionen

```tsx
// Jede Section-Datei folgt diesem Muster:
"use client"

import { motion } from "motion/react"
// ... weitere imports

const viewportOnce = { once: true as const, amount: 0.15 }

export function SectionName() {
  return (
    <section id="section-id" className="section-spacing">
      <div className="container">
        {/* Content */}
      </div>
    </section>
  )
}
```

---

*Diese Datei wird bei relevanten Änderungen manuell aktualisiert.*
