import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { CtaSection } from "@/components/sections/cta-section"
import { AboutMissionSection } from "@/components/sections/about-mission-section"
import { AboutValuesSection } from "@/components/sections/about-values-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Über uns – Warum wir Rekurio gebaut haben",
  description:
    "Rekurio entstand aus einer einfachen Beobachtung: DTC-Brands zahlen für Klaviyo, nutzen aber nur einen Bruchteil. Wir haben das geändert.",
})

export default function AboutPage() {
  return (
    <>
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <section className="section-spacing section-divider-b relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-0 h-[min(50vw,28rem)] w-[min(80vw,42rem)] bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,oklch(0.92_0.19_125/0.13),transparent_65%)] blur-3xl"
          />
          <div className="container relative">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-5">
              <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                Über Rekurio
              </span>
              <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
                Wir hassen es, wenn gutes E-Mail-Marketing an Komplexität scheitert.
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
                DTC-Brands investieren Zeit und Geld in Klaviyo — und nutzen dann 20&nbsp;% davon.
                Nicht weil sie keine Ambitionen haben. Sondern weil Klaviyo mächtig, aber komplex ist.
                Weil Agenturen teuer und intransparent sind. Weil niemand erklärt hat, was&nbsp;
                <em>wirklich</em> Revenue bringt.
              </p>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
                Rekurio ist unsere Antwort darauf.
              </p>
            </div>
          </div>
        </section>
        <AboutMissionSection />
        <AboutValuesSection />
        <CtaSection />
      </main>
    </>
  )
}
