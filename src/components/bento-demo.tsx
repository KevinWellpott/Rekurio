import { BarChart3Icon, Zap, Link2, CalendarCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import AnimatedBeamMultipleOutputDemo from "@/components/animated-beam-multiple-outputs"
import AnimatedListDemo from "@/components/animated-list-demo"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"

const kpiCards = [
  { metric: "Revenue / Subscriber", value: "€4.20", delta: "+12%" },
  { metric: "Flow Open Rate", value: "48 %", delta: "+8%" },
  { metric: "Win-Back Recovery", value: "22 %", delta: "+15%" },
  { metric: "List Health Score", value: "94", delta: "+" },
  { metric: "Deliverability", value: "99.1 %", delta: "stable" },
]

const features = [
  {
    Icon: BarChart3Icon,
    name: "Performance-Dashboard",
    description:
      "KPIs und Trends auf einen Blick – Revenue, Open Rates, Deliverability.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:18s]"
      >
        {kpiCards.map((card, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-col gap-1">
              <figcaption className="text-xs font-medium dark:text-white/60">
                {card.metric}
              </figcaption>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold dark:text-white">
                  {card.value}
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {card.delta}
                </span>
              </div>
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Zap,
    name: "Flow- & Template-Bibliothek",
    description:
      "Welcome, Abandoned Cart, Win-Back – Best-Practice-Flows, direkt einsatzbereit.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Link2,
    name: "1-Klick Klaviyo-Connect",
    description:
      "OAuth-Anbindung in wenigen Klicks. Kein manuelles API-Key-Handling, kein IT-Ticket.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarCheck,
    name: "Next-Best-Action Engine",
    description:
      "Rekurio sagt dir täglich, was als Nächstes den meisten Umsatz bringt.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Mehr erfahren",
    background: (
      <div className="absolute top-6 right-4 flex flex-col gap-2 opacity-80 transition-all duration-300 group-hover:opacity-100">
        {[
          { label: "Win-Back aktivieren", score: 92 },
          { label: "Betreffzeile A/B-Test", score: 85 },
          { label: "Segment bereinigen", score: 74 },
        ].map((action) => (
          <div
            key={action.label}
            className="flex w-52 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
          >
            <span>{action.label}</span>
            <span className="text-primary font-bold">{action.score}</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
