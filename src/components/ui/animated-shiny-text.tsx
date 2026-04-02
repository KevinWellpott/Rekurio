import { cn } from "@/lib/utils"

interface AnimatedShinyTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number
}

/**
 * Legt einen animierten Lichtschimmer als Overlay über beliebigen Text,
 * ohne die bestehende Textfarbe zu verändern.
 */
export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 80,
}: AnimatedShinyTextProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      {children}
      <span
        aria-hidden
        style={{ "--shiny-width": `${shimmerWidth}px` } as React.CSSProperties}
        className="pointer-events-none absolute inset-0 animate-shiny-text bg-gradient-to-r from-transparent via-white/25 via-50% to-transparent bg-no-repeat [background-size:var(--shiny-width)_100%]"
      />
    </span>
  )
}
