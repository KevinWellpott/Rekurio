import { Header } from "@/components/sections/header-1";
import { Hero } from "@/components/sections/hero-2";
import { ProblemSection } from "@/components/sections/problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { HomeBentoSection } from "@/components/sections/home-bento-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 pb-10 md:gap-8">
      <Header />
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <HomeBentoSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
