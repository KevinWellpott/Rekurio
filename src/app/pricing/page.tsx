import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { PricingSection } from "@/components/sections/pricing-section"
import { CtaSection } from "@/components/sections/cta-section"
import { PricingComparisonSection } from "@/components/sections/pricing-comparison-section"
import { PricingFaqSection } from "@/components/sections/pricing-faq-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Preise – Core ab 89 € / Monat",
  description:
    "Rekurio ab 89 € / Monat. Keine Kreditkarte, 14 Tage kostenlos. Eine Klaviyo-Agentur kostet 1.500–3.000 € – Rekurio liefert mehr für einen Bruchteil davon.",
})

export default function PricingPage() {
  return (
    <>
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
                <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                  Preise
                </span>
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
