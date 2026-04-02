import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { DemoBookingSection } from "@/components/sections/demo-booking-section"
import { DemoExpectSection } from "@/components/sections/demo-expect-section"
import { CtaSection } from "@/components/sections/cta-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Demo buchen – Rekurio live erleben",
  description:
    "Kostenlose 30-Minuten-Demo mit dem Rekurio-Team: Welche Flows dir fehlen, was du sofort tun kannst und wie viel Revenue du gerade liegen lässt. Oder direkt 14 Tage gratis testen.",
  path: "/demo",
})

export default function DemoPage() {
  return (
    <>
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <section className="section-spacing section-divider-b relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-[min(50vw,26rem)] w-[min(100vw,54rem)] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.92_0.19_125/0.15),transparent_65%)] blur-3xl"
          />
          <div className="container relative">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
                Sieh Rekurio in Aktion. Kostenlos.
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg text-balance">
                In 30 Minuten zeigen wir dir, welche Flows fehlen, was du sofort tun kannst — und
                wie viel Revenue du gerade liegen lässt. Oder starte direkt mit dem 14-Tage-Trial.
              </p>
            </div>
          </div>
        </section>
        <DemoBookingSection />
        <DemoExpectSection />
        <CtaSection />
      </main>
    </>
  )
}
