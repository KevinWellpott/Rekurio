import type { Metadata } from "next"
import { PreorderHeader } from "@/components/sections/preorder/preorder-header"
import { PreorderHero } from "@/components/sections/preorder/preorder-hero"
import { PreorderUrgencyBar } from "@/components/sections/preorder/preorder-urgency-bar"
import { PreorderProblem } from "@/components/sections/preorder/preorder-problem"
import { PreorderTeaser } from "@/components/sections/preorder/preorder-teaser"
import { PreorderHowItWorks } from "@/components/sections/preorder/preorder-how-it-works"
import { PreorderBenefits } from "@/components/sections/preorder/preorder-benefits"
import { PreorderFaq } from "@/components/sections/preorder/preorder-faq"
import { PreorderDualCta } from "@/components/sections/preorder/preorder-dual-cta"
import { PreorderActivityToast } from "@/components/sections/preorder/preorder-activity-toast"
import { earlyAccessOfferShort } from "@/components/sections/preorder/preorder-offer"

export const metadata: Metadata = {
  title: "Early Access sichern – Rekurio",
  description: `Rekurio Early Access: ${earlyAccessOfferShort} Klaviyo-Co-Pilot für DTC.`,
  robots: {
    index: false,
    follow: false,
  },
}

export default function PreorderPage() {
  return (
    <main className="flex flex-col pb-0">
      <PreorderHeader />
      <PreorderHero />
      <PreorderUrgencyBar />

      {/* All post-hero sections share a subtle dot-pattern background layer */}
      <div className="relative">
        <div aria-hidden className="bg-dot-pattern pointer-events-none absolute inset-0" />
        {/* Problem + Lösung als visuell zusammengehörendes Paar */}
        <div>
          <PreorderProblem />
          <PreorderHowItWorks />
        </div>
        <PreorderTeaser />
        <PreorderBenefits />
        <PreorderFaq />
        <PreorderDualCta />
      </div>

      <PreorderActivityToast />
    </main>
  )
}
