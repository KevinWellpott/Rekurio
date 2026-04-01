import type { Metadata } from "next"
import { PreorderHeader } from "@/components/sections/preorder/preorder-header"
import { PreorderHero } from "@/components/sections/preorder/preorder-hero"
import { PreorderUrgencyBar } from "@/components/sections/preorder/preorder-urgency-bar"
import { PreorderProgress } from "@/components/sections/preorder/preorder-progress"
import { PreorderProblem } from "@/components/sections/preorder/preorder-problem"
import { PreorderTeaser } from "@/components/sections/preorder/preorder-teaser"
import { PreorderBenefits } from "@/components/sections/preorder/preorder-benefits"
import { PreorderFaq } from "@/components/sections/preorder/preorder-faq"
import { PreorderDualCta } from "@/components/sections/preorder/preorder-dual-cta"
import { PreorderSocialProof } from "@/components/sections/preorder/preorder-social-proof"

export const metadata: Metadata = {
  title: "Early Access sichern – Rekurio",
  description:
    "Sichere dir jetzt deinen limitierten Early-Access-Platz für Rekurio – den smarten Klaviyo-Assistenten für DTC-Brands. Frühbucherpreis inklusive.",
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
      <PreorderSocialProof className="px-4 pb-2" />
      <PreorderUrgencyBar />
      <PreorderProgress />
      <PreorderProblem />
      <PreorderTeaser />
      <PreorderBenefits />
      <PreorderFaq />
      <PreorderDualCta />
    </main>
  )
}
