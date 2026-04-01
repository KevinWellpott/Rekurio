import type { Metadata } from "next";
import { Header } from "@/components/sections/header-1";
import { Hero } from "@/components/sections/hero-2";
import { ProblemSection } from "@/components/sections/problem-section";
import { RoiCalculatorSection } from "@/components/sections/roi-calculator-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { HomeBentoSection } from "@/components/sections/home-bento-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Klaviyo-Assistent für DTC-Brands – Rekurio",
  description:
    "Mehr Revenue aus Klaviyo – ohne Agentur. Rekurio gibt DTC-Brands ein Dashboard, Flow-Templates und KI-Copywriting. 14 Tage kostenlos testen.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rekurio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Klaviyo-Assistent für DTC-Brands: Dashboard, Flows, KI-Copywriting und Next-Best-Actions.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "89",
    highPrice: "349",
    priceCurrency: "EUR",
    offerCount: "3",
  },
  url: "https://www.rekurio.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="flex flex-col gap-6 pb-10 md:gap-8">
        <Header />
        <Hero />
        <ProblemSection />
        <RoiCalculatorSection />
        <HowItWorksSection />
        <HomeBentoSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
    </>
  );
}
