import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { DemoBookingSection } from "@/components/sections/demo-booking-section"
import { DemoExpectSection } from "@/components/sections/demo-expect-section"
import { CtaSection } from "@/components/sections/cta-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Demo buchen – Rekurio in 30 Minuten kennenlernen",
  description:
    "Buch dir eine kostenlose 30-Minuten-Demo mit dem Rekurio-Team. Wir zeigen dir, wie du in Woche 1 messbar mehr Revenue aus Klaviyo holst.",
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
              <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                Demo &amp; Trial
              </span>
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
