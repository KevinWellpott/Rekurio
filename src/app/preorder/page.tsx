import type { Metadata } from "next"
import { PreorderHeader } from "@/components/sections/preorder/preorder-header"
import { PreorderHero } from "@/components/sections/preorder/preorder-hero"
import { PreorderUrgencyBar } from "@/components/sections/preorder/preorder-urgency-bar"
import { PreorderProblem } from "@/components/sections/preorder/preorder-problem"
import { PreorderTeaser } from "@/components/sections/preorder/preorder-teaser"
import { PreorderBenefits } from "@/components/sections/preorder/preorder-benefits"
import { PreorderDualCta } from "@/components/sections/preorder/preorder-dual-cta"

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
      <PreorderUrgencyBar />
      <PreorderProblem />
      <PreorderTeaser />
      <PreorderBenefits />
      <PreorderDualCta />
    </main>
  )
}
