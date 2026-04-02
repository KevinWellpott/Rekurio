import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(60vw,28rem)] w-[min(100vw,52rem)] bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,oklch(0.92_0.19_125/0.12),transparent_70%)] blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-6">
        <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
          404
        </span>
        <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-5xl">
          Seite nicht gefunden
        </h1>
        <p className="text-muted-foreground max-w-md text-base text-balance">
          Diese Seite existiert nicht – oder wurde verschoben. Geh zurück zur Startseite und finde,
          was du gesucht hast.
        </p>
        <Button asChild size="lg">
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </div>
  )
}
