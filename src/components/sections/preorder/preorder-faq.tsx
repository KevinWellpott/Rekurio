"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { earlyAccessOfferShort } from "./preorder-offer"

const viewportOnce = { once: true as const, amount: 0.15 }

const faqs = [
  {
    question: "Kostet mich das Eintragen etwas?",
    answer:
      "Nein, komplett kostenlos. Kein Abo, keine Kreditkarte, keine versteckten Kosten. Du tr\u00e4gst dich ein, wir halten dich zum Start von Early Access auf dem Laufenden.",
  },
  {
    question: "Was passiert nach der Anmeldung?",
    answer:
      "Du bekommst sofort eine Best\u00e4tigungsmail. Nach der Best\u00e4tigung erh\u00e4ltst du ein paar kurze Mails mit Einblicken ins Produkt. Sobald Early Access startet, greifen f\u00fcr dich die festen Vorteile: " +
      earlyAccessOfferShort,
  },
  {
    question: "Was ist der Unterschied zwischen Rekurio und Klaviyo?",
    answer:
      "Klaviyo ist dein E-Mail-Marketing-Tool \u2013 das Werkzeug. Rekurio ist der Co-Pilot, der dir sagt, was du damit tun sollst: Welcher Flow fehlt, welches Segment ungenutzt bleibt, welche Kampagne als n\u00e4chstes den meisten Umsatz bringt.",
  },
  {
    question: "Wann startet Rekurio \u2013 und was hei\u00dft \u201eein Monat fr\u00fcher\u201c?",
    answer:
      "\u00d6ffentlicher Launch ist f\u00fcr Q2 2026 geplant. Early-Access-Nutzer bekommen Zugang, sobald das Produkt f\u00fcr euch stabil genug ist \u2013 in der Regel bis zu einem Monat vor dem \u00f6ffentlichen Go-live. Der erste Monat in Early Access ist kostenlos; danach zahlst du dauerhaft 10\u00a0% weniger als der sp\u00e4tere Listenpreis, solange du Kunde bleibst.",
  },
  {
    question: "Was genau ist das Early-Access-Angebot?",
    answer:
      "Es ist f\u00fcr alle Early-Access-Nutzer gleich: " +
      earlyAccessOfferShort +
      " Wer erst nach dem \u00f6ffentlichen Launch einsteigt, zahlt den regul\u00e4ren Listenpreis ohne diesen Rabatt.",
  },
  {
    question: "Was wenn ich nach dem kostenlosen Monat unzufrieden bin?",
    answer:
      "Dann kannst du einfach nicht weitermachen \u2013 kein Abo l\u00e4uft automatisch an, keine Rechnung. Du entscheidest nach dem ersten Monat selbst, ob Rekurio f\u00fcr dich passt. Kein Risiko, keine versteckte Bindung.",
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
            <p className="text-muted-foreground pb-4 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PreorderFaq() {
  return (
    <section className="section-spacing">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-2xl font-semibold tracking-tighter text-transparent sm:text-3xl">
              H\u00e4ufige Fragen
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
