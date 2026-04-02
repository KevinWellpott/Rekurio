import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { PricingSection } from "@/components/sections/pricing-section"
import { CtaSection } from "@/components/sections/cta-section"
import { PricingComparisonSection } from "@/components/sections/pricing-comparison-section"
import { PricingFaqSection } from "@/components/sections/pricing-faq-section"
import { constructMetadata } from "@/lib/utils"
import { getSiteBaseUrl } from "@/lib/site-url"

export const metadata: Metadata = constructMetadata({
  title: "Preise – Klaviyo-Optimierung ab 89 € / Monat",
  description:
    "Rekurio Core ab 89 €, Growth ab 189 €, Elite ab 349 € pro Monat. 14 Tage gratis, keine Kreditkarte. Ersetzt eine Klaviyo-Agentur (1.500–3.000 €) für einen Bruchteil.",
  path: "/pricing",
})

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Muss ich eine Kreditkarte hinterlegen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Die 14-tägige Testphase startet ohne Kreditkarte. Du hinterlegst eine Zahlungsmethode erst, wenn du nach dem Test weitermachen möchtest.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert nach den 14 Tagen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du bekommst 3 Tage vorher eine E-Mail. Wenn du nicht aktiv upgraderst, läuft die Testphase einfach aus – keine automatische Abbuchung.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich jederzeit kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, monatlich kündbar ohne Mindestlaufzeit. Das Abo endet zum Ende der bezahlten Periode.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist im Core-Plan enthalten vs. Growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Core deckt das Essenzielle ab: Dashboard, 10 Templates, 3 Flow-Guides. Growth fügt die Next-Best-Action Engine, KI-Copywriting und unlimitierte Templates hinzu – alles, was Wachstum systematisch beschleunigt.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es Jahrestarife mit Rabatt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jahrestarife mit ca. 20 % Rabatt sind für den Launch geplant. Early-Access-Nutzer erhalten die besten Konditionen.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich meinen Plan wechseln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Upgrade jederzeit, Downgrade zum Ende der Periode. Kein Datenverlust bei Plan-Wechsel.",
      },
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }}
      />
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <section className="section-spacing section-divider-b">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-6 text-left">
              <div className="border-primary/40 bg-primary/12 ring-primary/25 relative overflow-hidden rounded-2xl border-2 p-6 shadow-lg shadow-primary/15 ring-1 md:p-8">
                <p className="text-foreground text-center text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
                  14 Tage komplett gratis.
                </p>
                <p className="text-foreground/95 mt-3 text-center text-base font-semibold leading-snug text-balance md:text-lg">
                  Keine Kreditkarte nötig.{" "}
                  <span className="text-primary">
                    Du zahlst erst, wenn Umsatz über Rekurio läuft
                  </span>
                  — bis dahin bleibt die Software für dich ohne Kosten.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
                  Klar kalkulierbar.<br className="hidden sm:block" /> Kein Agentur-Budget.
                </h1>
                <p className="text-muted-foreground max-w-xl text-lg text-balance">
                  Eine Klaviyo-Agentur kostet 1.500–3.000&nbsp;€ pro Monat — und du bist trotzdem
                  abhängig. Rekurio gibt dir dieselbe Performance für einen Bruchteil des Preises.
                </p>
              </div>
            </div>
          </div>
        </section>
        <PricingSection />
        <PricingComparisonSection />
        <PricingFaqSection />
        <CtaSection />
      </main>
    </>
  )
}
