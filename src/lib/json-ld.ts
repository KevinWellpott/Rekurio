import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

function baseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");
}

function socialSameAs(): string[] {
  return [siteConfig.links.twitter, siteConfig.links.instagram, siteConfig.links.youtube].filter(
    (u): u is string => typeof u === "string" && u.length > 0 && u !== "#",
  );
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
        ...(sameAs.length > 0 ? { sameAs } : {}),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.svg"),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: base,
        inLanguage: "de-DE",
        publisher: { "@id": orgId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteConfig.description,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "89",
          highPrice: "349",
          priceCurrency: "EUR",
          offerCount: "3",
        },
        url: base,
        provider: { "@id": orgId },
      },
    ],
  };
}
