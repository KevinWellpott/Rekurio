import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { RoiCalculatorSection } from "@/components/sections/roi-calculator-section"
import { CtaSection } from "@/components/sections/cta-section"
import { RoiStatsSection } from "@/components/sections/roi-stats-section"
import { constructMetadata } from "@/lib/utils"
import { getSiteBaseUrl } from "@/lib/site-url"

export const metadata: Metadata = constructMetadata({
  title: "Klaviyo ROI-Rechner – Ungenutztes E-Mail-Revenue berechnen",
  description:
    "Gratis Klaviyo-ROI-Rechner für DTC-Brands: Gib deinen Jahresumsatz ein und sieh, wie viel E-Mail-Revenue du jeden Monat liegen lässt. DTC-Brands schöpfen im Schnitt nur 20 % ihres Klaviyo-Potenzials aus.",
  path: "/roi",
})

const roiJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Klaviyo ROI-Rechner – Rekurio",
  url: `${getSiteBaseUrl()}/roi`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Interaktiver ROI-Rechner: Berechne, wie viel ungenutztes Klaviyo-Revenue dein DTC-Brand monatlich liegen lässt.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  inLanguage: "de-DE",
}

export default function RoiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roiJsonLd) }}
      />
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <section className="section-spacing section-divider-b">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
              <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
                Wie viel Klaviyo-Revenue lässt du gerade liegen?
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
