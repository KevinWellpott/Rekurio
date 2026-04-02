"use client"

import { motion } from "motion/react"
import { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useCarouselButtons, NextButton, PrevButton } from "@/components/carousel-button"
import { useCarouselIndicator, CarouselIndicator } from "@/components/carousel-indicator"
import { cn } from "@/lib/utils"
import { EARLY_ACCESS_DISCOUNT_PERCENT } from "./preorder-offer"

// ─── Illustrations ──────────────────────────────────────────────────────────

function IlluHeadstart() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full" aria-hidden>
      {/* Background glow */}
      <ellipse cx="160" cy="90" rx="120" ry="70" fill="oklch(0.88 0.19 125 / 0.06)" />
      {/* Calendar base */}
      <rect x="80" y="40" width="160" height="110" rx="12" fill="oklch(1 0 0 / 0.05)" stroke="oklch(1 0 0 / 0.12)" strokeWidth="1.5" />
      {/* Calendar header */}
      <rect x="80" y="40" width="160" height="32" rx="12" fill="oklch(0.88 0.19 125 / 0.18)" />
      <rect x="80" y="60" width="160" height="12" fill="oklch(0.88 0.19 125 / 0.18)" />
      {/* Month label */}
      <text x="160" y="62" textAnchor="middle" fill="oklch(0.88 0.19 125)" fontSize="11" fontWeight="600" fontFamily="ui-sans-serif">EARLY ACCESS</text>
      {/* Grid lines */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={80 + i * 160/6} y1="72" x2={80 + i * 160/6} y2="150" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" />
      ))}
      {[0,1,2,3].map(i => (
        <line key={i} x1="80" y1={72 + i * 26} x2="240" y2={72 + i * 26} stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" />
      ))}
      {/* Day cells - highlight first month */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={83 + i * 26.5} y="75" width="22" height="20" rx="4" fill="oklch(0.88 0.19 125 / 0.22)" />
      ))}
      {/* "YOU" marker */}
      <circle cx="96" cy="85" r="9" fill="oklch(0.88 0.19 125)" />
      <text x="96" y="89" textAnchor="middle" fill="oklch(0.16 0.02 125)" fontSize="7" fontWeight="800" fontFamily="ui-sans-serif">YOU</text>
      {/* Rocket */}
      <g transform="translate(188, 50) rotate(35)">
        <ellipse cx="0" cy="0" rx="9" ry="18" fill="oklch(0.88 0.19 125)" />
        <polygon points="-9,8 -14,20 0,14" fill="oklch(0.7 0.15 125)" />
        <polygon points="9,8 14,20 0,14" fill="oklch(0.7 0.15 125)" />
        <ellipse cx="0" cy="4" rx="4" ry="5" fill="oklch(0.16 0.02 125)" />
        {/* Flame */}
        <ellipse cx="0" cy="20" rx="4" ry="7" fill="oklch(0.78 0.16 72 / 0.8)" />
      </g>
      {/* Stars */}
      {[[260,38],[270,58],[248,52],[240,30],[275,42]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="oklch(0.88 0.19 125 / 0.5)" />
      ))}
    </svg>
  )
}

function IlluDiscount() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="90" rx="110" ry="65" fill="oklch(0.65 0.22 280 / 0.07)" />
      {/* Big price tag */}
      <path d="M100 55 L190 55 L220 90 L190 125 L100 125 Z" fill="oklch(0.65 0.22 280 / 0.15)" stroke="oklch(0.65 0.22 280 / 0.35)" strokeWidth="1.5" />
      {/* Hole in tag */}
      <circle cx="115" cy="90" r="8" fill="none" stroke="oklch(0.65 0.22 280 / 0.5)" strokeWidth="2" />
      {/* Percent symbol */}
      <text x="165" y="99" textAnchor="middle" fill="oklch(0.75 0.22 280)" fontSize="42" fontWeight="800" fontFamily="ui-sans-serif" letterSpacing="-2">
        {`${EARLY_ACCESS_DISCOUNT_PERCENT}%`}
      </text>
      {/* "off forever" ribbon */}
      <rect x="88" y="133" width="148" height="22" rx="11" fill="oklch(0.65 0.22 280 / 0.18)" stroke="oklch(0.65 0.22 280 / 0.3)" strokeWidth="1" />
      <text x="162" y="148" textAnchor="middle" fill="oklch(0.75 0.22 280)" fontSize="10" fontWeight="600" fontFamily="ui-sans-serif" letterSpacing="1">DAUERHAFT · KEIN LIMIT</text>
      {/* Sparkles */}
      {[[62,50],[258,48],[268,110],[55,115]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <line x1="0" y1="-6" x2="0" y2="6" stroke="oklch(0.65 0.22 280 / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-6" y1="0" x2="6" y2="0" stroke="oklch(0.65 0.22 280 / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

function IlluChat() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="95" rx="115" ry="65" fill="oklch(0.60 0.22 20 / 0.06)" />
      {/* You bubble */}
      <rect x="55" y="42" width="130" height="52" rx="16" fill="oklch(0.60 0.22 20 / 0.2)" stroke="oklch(0.60 0.22 20 / 0.4)" strokeWidth="1.5" />
      <polygon points="70,94 60,110 86,94" fill="oklch(0.60 0.22 20 / 0.2)" />
      {/* Message lines */}
      <rect x="70" y="57" width="80" height="7" rx="3.5" fill="oklch(0.60 0.22 20 / 0.5)" />
      <rect x="70" y="69" width="55" height="7" rx="3.5" fill="oklch(0.60 0.22 20 / 0.3)" />
      {/* Team bubble */}
      <rect x="145" y="100" width="118" height="52" rx="16" fill="oklch(1 0 0 / 0.06)" stroke="oklch(1 0 0 / 0.14)" strokeWidth="1.5" />
      <polygon points="248,100 263,86 258,100" fill="oklch(1 0 0 / 0.06)" />
      {/* Team message lines */}
      <rect x="160" y="116" width="70" height="7" rx="3.5" fill="oklch(1 0 0 / 0.3)" />
      <rect x="160" y="128" width="48" height="7" rx="3.5" fill="oklch(1 0 0 / 0.18)" />
      {/* Lightning bolt (direct line) */}
      <g transform="translate(135, 78)">
        <polygon points="6,0 0,10 5,10 -1,22 8,10 3,10 9,0" fill="oklch(0.88 0.19 125)" />
      </g>
      {/* Avatar circles */}
      <circle cx="70" cy="118" r="12" fill="oklch(0.60 0.22 20 / 0.25)" stroke="oklch(0.60 0.22 20 / 0.5)" strokeWidth="1.5" />
      <text x="70" y="122" textAnchor="middle" fill="oklch(0.70 0.22 20)" fontSize="9" fontWeight="700" fontFamily="ui-sans-serif">YOU</text>
      <circle cx="253" cy="82" r="12" fill="oklch(0.88 0.19 125 / 0.2)" stroke="oklch(0.88 0.19 125 / 0.4)" strokeWidth="1.5" />
      <text x="253" y="86" textAnchor="middle" fill="oklch(0.78 0.19 125)" fontSize="8" fontWeight="700" fontFamily="ui-sans-serif">TEAM</text>
    </svg>
  )
}

function IlluOnboarding() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="90" rx="115" ry="65" fill="oklch(0.68 0.18 220 / 0.06)" />
      {/* Laptop frame */}
      <rect x="75" y="45" width="170" height="105" rx="10" fill="oklch(1 0 0 / 0.05)" stroke="oklch(1 0 0 / 0.12)" strokeWidth="1.5" />
      <rect x="75" y="45" width="170" height="110" rx="10" fill="none" stroke="oklch(1 0 0 / 0.12)" strokeWidth="1.5" />
      {/* Screen content */}
      <rect x="85" y="54" width="150" height="80" rx="6" fill="oklch(0.08 0.01 260)" />
      {/* Checklist items */}
      {[
        { y: 68, done: true,  label: "Klaviyo verbinden", color: "oklch(0.88 0.19 125)" },
        { y: 88, done: true,  label: "Flows einrichten",  color: "oklch(0.88 0.19 125)" },
        { y: 108, done: false, label: "Erste Revenue live", color: "oklch(0.68 0.18 220)" },
      ].map((item, i) => (
        <g key={i}>
          <circle cx="100" cy={item.y} r="6" fill={item.done ? item.color : "oklch(1 0 0 / 0.08)"} stroke={item.done ? "none" : "oklch(1 0 0 / 0.2)"} strokeWidth="1" />
          {item.done && (
            <polyline
              points={`96.5,${item.y} 99,${item.y + 2.5} 103.5,${item.y - 2.5}`}
              stroke="oklch(0.16 0.02 125)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
          <rect x="113" y={item.y - 4} width={item.done ? 70 : 50} height="7" rx="3.5" fill={`${item.color.replace(')', ' / 0.35)')}`} />
        </g>
      ))}
      {/* "No call" badge */}
      <rect x="186" y="100" width="42" height="22" rx="11" fill="oklch(0.60 0.22 20 / 0.15)" stroke="oklch(0.60 0.22 20 / 0.3)" strokeWidth="1" />
      <text x="207" y="115" textAnchor="middle" fill="oklch(0.65 0.22 20)" fontSize="8" fontWeight="700" fontFamily="ui-sans-serif">No Call</text>
      <line x1="186" y1="100" x2="228" y2="122" stroke="oklch(0.60 0.22 20 / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Laptop base */}
      <rect x="60" y="154" width="200" height="8" rx="4" fill="oklch(1 0 0 / 0.08)" stroke="oklch(1 0 0 / 0.1)" strokeWidth="1" />
      {/* Camera dot */}
      <circle cx="160" cy="152" r="2" fill="oklch(1 0 0 / 0.2)" />
    </svg>
  )
}

// ─── Slide data ──────────────────────────────────────────────────────────────

const slides = [
  {
    Illustration: IlluHeadstart,
    label: "Kern-Vorteil",
    accentBg: "bg-primary/12",
    accentBorder: "border-primary/25",
    accentText: "text-primary",
    title: "Einen Monat Vorsprung",
    body: `Während andere noch auf den öffentlichen Launch warten, hast du Rekurio bereits im Einsatz. Flows laufen, Revenue kommt – ein voller Monat früher.`,
  },
  {
    Illustration: IlluDiscount,
    label: "Dauerhaft",
    accentBg: "bg-violet-500/12",
    accentBorder: "border-violet-500/25",
    accentText: "text-violet-400",
    title: `Dauerhaft ${EARLY_ACCESS_DISCOUNT_PERCENT}\u00a0% günstiger`,
    body: `Kein zeitliches Limit – solange du Kunde bleibst, zahlst du weniger als jeder, der nach dem Launch einsteigt.`,
  },
  {
    Illustration: IlluChat,
    label: "Direkter Draht",
    accentBg: "bg-rose-500/12",
    accentBorder: "border-rose-500/25",
    accentText: "text-rose-400",
    title: "Direkter Draht zum Team",
    body: `Kein Ticket-System, keine anonyme Hotline. Du erreichst uns direkt – und dein Feedback fließt direkt in die Roadmap.`,
  },
  {
    Illustration: IlluOnboarding,
    label: "Ohne Zwang",
    accentBg: "bg-sky-500/12",
    accentBorder: "border-sky-500/25",
    accentText: "text-sky-400",
    title: "Onboarding ohne Pflicht-Call",
    body: `Wir begleiten dich beim Start – per Video, Chat oder Live, ganz wie es dir passt. Kein Sales-Call als Voraussetzung.`,
  },
]

// ─── Carousel wrapper (re-uses EmblaCarousel internals directly) ─────────────

function BenefitsCarousel() {
  const OPTIONS: EmblaOptionsType = { loop: true, align: "start" }
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 4500, stopOnInteraction: true }),
  ])
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useCarouselButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselIndicator(emblaApi)

  return (
    <div>
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide, i) => {
            const { Illustration } = slide
            return (
              <div
                key={i}
                className="min-w-0 shrink-0 grow-0 basis-[min(320px,85vw)]"
              >
                <div
                  className={cn(
                    "flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border",
                    slide.accentBorder,
                    slide.accentBg,
                  )}
                >
                  {/* Illustration */}
                  <div className="relative flex-1 overflow-hidden">
                    <Illustration />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2 border-t border-white/8 p-5">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", slide.accentText)}>
                      {slide.label}
                    </span>
                    <h3 className="text-foreground text-base font-semibold leading-snug tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{slide.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-4">
        <PrevButton
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 disabled:opacity-25"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <div className="flex flex-1 items-center gap-2">
          {scrollSnaps.map((_, idx) => (
            <CarouselIndicator
              key={idx}
              onClick={() => onDotButtonClick(idx)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                idx === selectedIndex ? "w-8 bg-primary" : "w-4 bg-white/20 hover:bg-white/35",
              )}
            />
          ))}
        </div>
        <NextButton
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 disabled:opacity-25"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function PreorderBenefits() {
  return (
    <section id="preorder-benefits" className="section-spacing">
      <div className="container">
        <motion.div
          className="mb-10 flex max-w-2xl flex-col items-start gap-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="from-foreground to-foreground/60 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tighter text-balance text-transparent sm:text-4xl">
            Was du als Early-Access-Nutzer bekommst
          </h2>
          <p className="text-muted-foreground max-w-md text-base text-balance">
            Ein Monat Vorsprung, erster Monat gratis, danach dauerhaft{" "}
            {EARLY_ACCESS_DISCOUNT_PERCENT}&nbsp;% günstiger.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <BenefitsCarousel />
        </motion.div>
      </div>
    </section>
  )
}
