import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Impressum – Rekurio",
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <main className="container py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-foreground mt-6 text-3xl font-semibold tracking-tight">
          Impressum
        </h1>

        <div className="text-muted-foreground mt-10 flex flex-col gap-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground mb-2 font-semibold">Angaben gemäß § 5 TMG</h2>
            <p>
              [VORNAME NACHNAME / FIRMENNAME]<br />
              [STRAßE HAUSNUMMER]<br />
              [PLZ ORT]<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href="mailto:hello@rekurio.com" className="text-primary hover:underline">
                hello@rekurio.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>
              [VORNAME NACHNAME]<br />
              [STRAßE HAUSNUMMER]<br />
              [PLZ ORT]
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
              nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
