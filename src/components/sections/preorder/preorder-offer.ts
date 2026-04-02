/**
 * Festes Early-Access-Angebot für /preorder – hier zentral, damit Zahlen und Claims konsistent bleiben.
 */
export const EARLY_ACCESS_DISCOUNT_PERCENT = 10

/** Ein Satz für Fließtexte (Hero, CTA, Meta). */
export const earlyAccessOfferShort = `Ein Monat vor dem öffentlichen Release verfügbar, erster Monat gratis, danach dauerhaft ${EARLY_ACCESS_DISCOUNT_PERCENT} % günstiger als der Listenpreis.`

/** Kompakte Aufzählung (Badges, FAQ, Benefits). */
export const earlyAccessOfferBullets = [
  "1 Monat vor dem öffentlichen Release nutzbar",
  "Erster Monat gratis",
  `Danach dauerhaft ${EARLY_ACCESS_DISCOUNT_PERCENT} % günstiger als der Listenpreis`,
] as const
