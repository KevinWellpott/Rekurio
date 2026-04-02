import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { RoiCalculatorSection } from "@/components/sections/roi-calculator-section"
import { CtaSection } from "@/components/sections/cta-section"
import { RoiStatsSection } from "@/components/sections/roi-stats-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Klaviyo ROI-Rechner – Wie viel Revenue lässt du liegen?",
  description:
    "Berechne, wie viel ungenutztes E-Mail-Revenue dein DTC-Brand in Klaviyo liegen lässt. DTC-Brands schöpfen im Schnitt nur 20 % ihres Klaviyo-Potenzials aus.",
})

export default function RoiPage() {
  return (
    <>
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <section className="section-spacing section-divider-b">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
              <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                ROI-Rechner
              </span>
              <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
                Wie viel Revenue lässt du gerade liegen?
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg text-balance">
                E-Mail macht im Schnitt 15&nbsp;% des E-Commerce-Umsatzes aus. Die meisten DTC-Brands
                schöpfen davon nur 20&nbsp;% ab — der Rest liegt brach. Stell deinen Jahresumsatz ein
                und sieh, was auf dem Tisch liegt.
              </p>
            </div>
          </div>
        </section>
        <RoiCalculatorSection />
        <RoiStatsSection />
        <CtaSection />
      </main>
    </>
  )
}
