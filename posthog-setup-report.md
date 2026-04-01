<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Rekurio Next.js App Router project. PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern), routed through a reverse proxy in `next.config.mjs`, and tracked both client-side and server-side across all major conversion touchpoints. Users are identified by email on signup, and their sessions are correlated between client and server using `X-POSTHOG-DISTINCT-ID` / `X-POSTHOG-SESSION-ID` headers.

| Event | Description | File |
|---|---|---|
| `hero_waitlist_signup_submitted` | User submitted the waitlist email form in the home hero section | `src/components/sections/hero-2.tsx` |
| `hero_waitlist_signup_succeeded` | Waitlist signup via home hero form was accepted by the API | `src/components/sections/hero-2.tsx` |
| `hero_call_booking_clicked` | User clicked the 'Call buchen' Calendly link in the home hero section | `src/components/sections/hero-2.tsx` |
| `cta_waitlist_signup_submitted` | User submitted the waitlist email form in the home CTA section | `src/components/sections/cta-section.tsx` |
| `cta_waitlist_signup_succeeded` | Waitlist signup via home CTA section form was accepted by the API | `src/components/sections/cta-section.tsx` |
| `cta_call_booking_clicked` | User clicked the 'Call buchen' Calendly link in the home CTA section | `src/components/sections/cta-section.tsx` |
| `preorder_hero_signup_submitted` | User submitted the waitlist form on the preorder hero section | `src/components/sections/preorder/preorder-hero.tsx` |
| `preorder_hero_signup_succeeded` | Waitlist signup via preorder hero form was accepted by the API | `src/components/sections/preorder/preorder-hero.tsx` |
| `preorder_hero_call_clicked` | User clicked the 'Kostenlosen Call buchen' Calendly link in the preorder hero | `src/components/sections/preorder/preorder-hero.tsx` |
| `preorder_dual_cta_signup_submitted` | User submitted the waitlist form in the preorder dual-CTA section | `src/components/sections/preorder/preorder-dual-cta.tsx` |
| `preorder_dual_cta_signup_succeeded` | Waitlist signup via preorder dual-CTA form was accepted by the API | `src/components/sections/preorder/preorder-dual-cta.tsx` |
| `preorder_dual_cta_call_clicked` | User clicked the 'Kostenlosen Call buchen' Calendly link in the preorder dual-CTA | `src/components/sections/preorder/preorder-dual-cta.tsx` |
| `pricing_plan_cta_clicked` | User clicked a pricing tier CTA button on the pricing section | `src/components/sections/pricing-section.tsx` |
| `subscribe_api_succeeded` | Server-side: email subscription to CRM provider completed successfully | `src/app/api/subscribe/route.ts` |
| `subscribe_api_failed` | Server-side: email subscription to CRM provider failed with an error | `src/app/api/subscribe/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard – Analytics basics**: https://eu.posthog.com/project/151795/dashboard/599739
- **Waitlist Signups by Source** (trends): https://eu.posthog.com/project/151795/insights/fCNkgw16
- **Home Hero Waitlist Signup Funnel** (funnel): https://eu.posthog.com/project/151795/insights/FwcuXYQE
- **Subscribe API Success vs Failure** (trends): https://eu.posthog.com/project/151795/insights/uMeeF3i7
- **Call Booking Clicks by Source** (trends): https://eu.posthog.com/project/151795/insights/2UFCNznO
- **Pricing Plan CTA Clicks by Plan** (trends, breakdown by plan): https://eu.posthog.com/project/151795/insights/ew1LK1na

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
