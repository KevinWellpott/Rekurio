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
import { siteConfig } from "@/lib/config";
import { getHomePageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Klaviyo-Assistent für DTC-Brands – Rekurio",
  description:
    "Mehr Revenue aus Klaviyo – ohne Agentur. Rekurio gibt DTC-Brands ein Dashboard, Flow-Templates und KI-Copywriting. 14 Tage kostenlos testen.",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  const structuredData = getHomePageJsonLd();

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
