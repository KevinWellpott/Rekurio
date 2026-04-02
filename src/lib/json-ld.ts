import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

function baseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");
}

function socialSameAs(): string[] {
  const singles = [
    siteConfig.links.twitter,
    siteConfig.links.instagram,
    siteConfig.links.youtube,
  ].filter((u): u is string => typeof u === "string" && u.length > 0 && u !== "#");

  const linkedInUrls = (siteConfig.links as Record<string, unknown>).linkedin;
  const linkedIn = Array.isArray(linkedInUrls)
    ? (linkedInUrls as string[]).filter(Boolean)
    : [];

  return [...singles, ...linkedIn];
}

/**
 * Homepage: Organization + WebSite + SoftwareApplication (schema.org @graph).
 */
export function getHomePageJsonLd() {
  const base = baseUrl();
  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;
  const softwareId = `${base}/#software`;
  const sameAs = socialSameAs();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: base,
        email: siteConfig.links.email,
        ...(sameAs.length > 0 ? { sameAs } : {}),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.svg"),
          width: 200,
          height: 48,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.links.email,
          contactType: "customer support",
          availableLanguage: "German",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: base,
        inLanguage: "de-DE",
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Email Marketing Software",
        operatingSystem: "Web",
        description: siteConfig.description,
        inLanguage: "de-DE",
        featureList: [
          "Klaviyo Performance-Dashboard",
          "E-Mail Flow-Templates (Welcome, Win-Back, Abandoned Cart)",
          "KI-gestütztes E-Mail-Copywriting",
          "Next-Best-Action Engine",
          "Segmentierungs-Vorlagen",
          "Send-Time Optimization",
          "1-Klick Klaviyo-Connect (OAuth)",
          "CLV & Repurchase Rate Tracking",
        ],
        offers: [
          {
            "@type": "Offer",
            name: "Core",
            price: "89",
            priceCurrency: "EUR",
            billingIncrement: "P1M",
            description: "Dashboard, 10 Templates, 3 Flow-Guides",
          },
          {
            "@type": "Offer",
            name: "Growth",
            price: "189",
            priceCurrency: "EUR",
            billingIncrement: "P1M",
            description: "Next-Best-Action Engine, KI-Copywriting, unlimitierte Flows",
          },
          {
            "@type": "Offer",
            name: "Elite",
            price: "349",
            priceCurrency: "EUR",
            billingIncrement: "P1M",
            description: "Mehrere Klaviyo-Accounts, White-Labeling, dedizierter Support",
          },
        ],
        url: base,
        provider: { "@id": orgId },
      },
    ],
  };
}
