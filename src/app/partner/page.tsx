import type { Metadata } from "next"
import { Header } from "@/components/sections/header-1"
import { PartnerHeroSection } from "@/components/sections/partner-hero-section"
import { PartnerHowSection } from "@/components/sections/partner-how-section"
import { PartnerFormSection } from "@/components/sections/partner-form-section"
import { CtaSection } from "@/components/sections/cta-section"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Partner werden – 30 % Provision auf jeden Plan",
  description:
    "Empfehle Rekurio und verdiene 30 % monatliche Provision auf jeden aktiven Account. Ideal für Agenturen, Berater und DTC-Content-Creator.",
})

export default function PartnerPage() {
  return (
    <>
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <PartnerHeroSection />
        <PartnerHowSection />
        <PartnerFormSection />
        <CtaSection />
      </main>
    </>
  )
}
