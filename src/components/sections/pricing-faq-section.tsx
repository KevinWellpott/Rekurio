"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.1 }

const faqs = [
  {
    q: "Muss ich eine Kreditkarte hinterlegen?",
    a: "Nein. Die 14-tägige Testphase startet ohne Kreditkarte. Du hinterlegst eine Zahlungsmethode erst, wenn du nach dem Test weitermachen möchtest.",
  },
  {
    q: "Was passiert nach den 14 Tagen?",
    a: "Du bekommst 3 Tage vorher eine E-Mail. Wenn du nicht aktiv upgraderst, läuft die Testphase einfach aus — keine automatische Abbuchung.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja, monatlich kündbar ohne Mindestlaufzeit. Das Abo endet zum Ende der bezahlten Periode.",
  },
  {
    q: "Gibt es Jahrestarife mit Rabatt?",
    a: "Jahrestarife mit ca. 20&nbsp;% Rabatt sind für den Launch geplant. Wenn du dich jetzt einträgst, bekommst du Early-Access-Konditionen.",
  },
  {
    q: "Was ist im Core-Plan enthalten vs. Growth?",
    a: "Core deckt das Essenzielle ab: Dashboard, 10 Templates, 3 Flow-Guides. Growth fügt die Next-Best-Action Engine, KI-Copywriting und unlimitierte Templates hinzu — alles, was Wachstum systematisch beschleunigt.",
  },
  {
    q: "Kann ich meinen Plan wechseln?",
    a: "Ja. Upgrade jederzeit, Downgrade zum Ende der Periode. Kein Datenverlust bei Plan-Wechsel.",
  },
  {
    q: "Bekomme ich eine Rechnung mit MwSt.?",
    a: "Ja, alle Pläne können mit Unternehmensadresse und Steuernummer abgerechnet werden. Reverse Charge für EU-Unternehmen außerhalb Deutschlands wird unterstützt.",
  },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.04, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground/90">{q}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-muted-foreground pb-5 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function PricingFaqSection() {
  return (
    <section className="section-spacing section-divider-b">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-10 flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              FAQ
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
              Häufige Fragen zu Preisen
            </h2>
          </motion.div>

          <div className="border-t border-white/10">
            {faqs.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
