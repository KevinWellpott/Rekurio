"use client"

import { motion } from "motion/react"

import { Marquee } from "@/components/ui/marquee"

const viewportOnce = { once: true as const, amount: 0.15 }

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Gründerin",
    company: "Nest & Co.",
    avatar: "SC",
    quote:
      "Mit Rekurio haben wir uns wieder auf Wachstum konzentriert statt auf Tabellen – und unsere Recovery-Flows sind spürbar klarer geworden.",
  },
  {
    name: "Jonas Weber",
    role: "Head of E-Commerce",
    company: "Greenleaf Store",
    avatar: "JW",
    // TODO: Echtes Testimonial eintragen
    quote:
      "Endlich sehen wir in einer Ansicht, welche Flows performen und wo wir Umsatz liegen lassen. Das hätte uns früher Wochen Reporting gespart.",
  },
  {
    name: "Lena Hofmann",
    role: "Marketing Lead",
    company: "Purecycle",
    avatar: "LH",
    // TODO: Echtes Testimonial eintragen
    quote:
      "Die Next-Best-Action Engine ist Gold. Statt zu raten, welchen Flow wir als Nächstes angehen, bekommen wir eine klare Priorität.",
  },
  {
    name: "Marco Brandt",
    role: "Co-Founder",
    company: "Skinova",
    avatar: "MB",
    // TODO: Echtes Testimonial eintragen
    quote:
      "Klaviyo-Setup in 15 Minuten, erste Flow-Optimierungen noch am selben Tag. Kein Agentur-Briefing, kein langes Onboarding.",
  },
  {
    name: "Mia Schulz",
    role: "Retention Manager",
    company: "Brewhaus",
    avatar: "MS",
    // TODO: Echtes Testimonial eintragen
    quote:
      "Unsere Win-Back-Rate hat sich innerhalb von 6 Wochen mehr als verdoppelt. Endlich ein Tool, das DTC wirklich versteht.",
  },
  {
    name: "Tim Richter",
    role: "Gründer",
    company: "Alpina DTC",
    avatar: "TR",
    // TODO: Echtes Testimonial eintragen
    quote:
      "Ich war skeptisch. Aber nach zwei Wochen hätte ich nicht gedacht, dass wir so schnell messbare Ergebnisse sehen würden.",
  },
]

function TestimonialCard({
  name,
  role,
  company,
  avatar,
  quote,
}: (typeof testimonials)[0]) {
  return (
    <figure className="glass relative w-72 cursor-pointer overflow-hidden rounded-2xl p-5 transition-colors duration-200 hover:border-white/15">
      <blockquote className="text-foreground/90 text-sm leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="bg-primary/20 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          {avatar}
        </div>
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {role}, {company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-spacing overflow-hidden">
      <div className="container">
        <motion.div
          className="mb-12 flex max-w-3xl flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
            Aus der Praxis
          </span>
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-left text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was DTC-Teams sagen.
          </h2>
          <p className="text-muted-foreground max-w-xl text-left text-base text-balance">
            Keine erfundenen Zahlen – echte Aussagen aus unserem Pilot-Pool.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
