"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const viewportOnce = { once: true as const, amount: 0.15 }

const faqs = [
  {
    question: "Kostet mich das Eintragen etwas?",
    answer:
      "Nein, komplett kostenlos. Kein Abo, keine Kreditkarte, keine versteckten Kosten. Du trägst dich ein, wir informieren dich vor dem Launch.",
  },
  {
    question: "Was passiert nach der Anmeldung?",
    answer:
      "Du bekommst sofort eine Bestätigungsmail. Nach der Bestätigung erhältst du 4 kurze Mails mit Einblicken in das Produkt. Beim Launch bist du als Erstes drin – mit Frühbucherpreis.",
  },
  {
    question: "Was ist der Unterschied zwischen Rekurio und Klaviyo?",
    answer:
      "Klaviyo ist dein E-Mail-Marketing-Tool – das Werkzeug. Rekurio ist der Co-Pilot der dir sagt, was du damit tun sollst: Welcher Flow fehlt, welches Segment ungenutzt bleibt, welche Kampagne als nächstes den meisten Umsatz bringt.",
  },
  {
    question: "Wann startet Rekurio?",
    answer:
      "Wir planen den Launch für Q2 2026. Early-Access-Mitglieder werden als Erstes informiert und ongeboardet – vor allen anderen.",
  },
  {
    question: "Was ist der Frühbucherpreis genau?",
    answer:
      "Als Early-Access-Mitglied zahlst du dauerhaft 20 % weniger als der reguläre Listenpreis. Dieser Rabatt bleibt – solange du dabei bleibst. Wer nach dem offiziellen Launch einsteigt, zahlt den vollen Preis.",
  },
  {
    question: "Was passiert mit meiner E-Mail-Adresse?",
    answer:
      "Nur Launch-Infos und Produkt-Updates. Kein Spam, kein Verkauf deiner Daten. DSGVO-konform via Double Opt-In. Du kannst dich jederzeit mit einem Klick abmelden.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-foreground/90 text-sm font-medium leading-snug">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
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
            transition={{ duration: 0.22, ease: [0.32, 0, 0.67, 0] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground pb-4 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PreorderFaq() {
  return (
    <section className="section-spacing section-divider-b">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="mb-8 flex flex-col gap-2">
            <span className="bg-primary/15 text-primary ring-primary/30 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
              FAQ
            </span>
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-2xl font-semibold tracking-tighter text-transparent sm:text-3xl">
              Häufige Fragen
            </h2>
          </div>

          <div className="glass rounded-2xl px-6">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
