/**
 * Kanonische Basis-URL für Sitemap, robots.txt und konsistente absolute Links.
 * NEXT_PUBLIC_BASE_URL hat Vorrang, danach NEXT_PUBLIC_APP_URL (bestehendes Projekt),
 * Fallback: Production-Domain.
 */
export function getSiteBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://rekurio.de";
  return raw.replace(/\/$/, "");
}
