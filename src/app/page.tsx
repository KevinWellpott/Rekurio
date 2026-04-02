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
  title: "Rekurio – Klaviyo-Assistent für DTC-Brands",
  description:
    "Mehr Revenue aus Klaviyo – ohne Agentur. Rekurio gibt DTC-Brands Dashboard, Flow-Templates, KI-Copywriting und Next-Best-Actions. 14 Tage kostenlos, keine Kreditkarte.",
  keywords: [
    "Klaviyo optimieren",
    "Klaviyo Assistent",
    "Klaviyo Dashboard",
    "Klaviyo Flows",
    "Email Marketing DTC",
    "DTC Email Marketing Tool",
    "Klaviyo Agentur Alternative",
    "Retention Marketing Software",
    "Klaviyo Win-Back Flow",
    "Email Automation DTC Brand",
    "Klaviyo Next Best Action",
    "Klaviyo KI Copywriting",
    "Rekurio",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekurio – Klaviyo-Assistent für DTC-Brands",
    description:
      "Mehr Revenue aus Klaviyo – ohne Agentur. Dashboard, Flows, KI-Copywriting. 14 Tage kostenlos.",
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
