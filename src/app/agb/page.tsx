import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AGB – Rekurio",
  robots: { index: false, follow: false },
}

export default function Agb() {
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
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">Stand: April 2026</p>

        <div className="text-muted-foreground mt-10 flex flex-col gap-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle
              Verträge zwischen Rekurio ([FIRMENNAME], [ADRESSE]) –
              nachfolgend &bdquo;Anbieter&ldquo; &ndash; und dem Kunden über die Nutzung der
              SaaS-Plattform Rekurio.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 2 Leistungsgegenstand</h2>
            <p>
              Der Anbieter stellt dem Kunden eine cloudbasierte
              Software-Plattform (SaaS) zur Optimierung von E-Mail-Marketing
              über Klaviyo zur Verfügung. Der Leistungsumfang richtet sich
              nach dem gewählten Tarif (Core, Growth oder Elite).
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 3 Vertragsschluss & Laufzeit</h2>
            <p>
              Der Vertrag kommt mit Abschluss des Bestellvorgangs zustande.
              Abonnements werden monatlich abgerechnet und verlängern sich
              automatisch, sofern sie nicht fristgerecht gekündigt werden.
              Die Kündigung ist jederzeit zum Ende des laufenden
              Abrechnungszeitraums möglich.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 4 Preise & Zahlung</h2>
            <p>
              Die aktuellen Preise sind auf der Website unter /pricing
              einsehbar. Alle Preise verstehen sich zzgl. der gesetzlichen
              Mehrwertsteuer. Die Zahlung erfolgt monatlich im Voraus per
              Kreditkarte oder SEPA-Lastschrift über unseren
              Zahlungsdienstleister.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 5 Testphase</h2>
            <p>
              Neukunden erhalten Zugang zu einer 14-tägigen kostenlosen
              Testphase. Während der Testphase ist keine Kreditkarte
              erforderlich. Nach Ablauf der Testphase wird der gewählte Tarif
              kostenpflichtig, sofern der Nutzer das Abonnement nicht vorher
              beendet.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 6 Pflichten des Kunden</h2>
            <p>Der Kunde verpflichtet sich:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>die Plattform nur für rechtmäßige Zwecke zu nutzen</li>
              <li>Zugangsdaten vertraulich zu behandeln</li>
              <li>keine Inhalte zu verbreiten, die gegen geltendes Recht verstoßen</li>
              <li>die Plattform nicht zu überlasten oder zu manipulieren</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 7 Verfügbarkeit</h2>
            <p>
              Der Anbieter bemüht sich um eine Verfügbarkeit von 99 % im
              Jahresmittel, übernimmt jedoch keine Garantie. Wartungsarbeiten
              werden nach Möglichkeit außerhalb der Hauptnutzungszeiten
              durchgeführt.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 8 Haftungsbeschränkung</h2>
            <p>
              Der Anbieter haftet nur bei Vorsatz und grober Fahrlässigkeit.
              Bei leichter Fahrlässigkeit haftet der Anbieter nur bei
              Verletzung wesentlicher Vertragspflichten, begrenzt auf den
              vorhersehbaren, vertragstypischen Schaden. Die Haftung für
              entgangenen Gewinn und Datenverlust ist ausgeschlossen, sofern
              nicht grobe Fahrlässigkeit oder Vorsatz vorliegen.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 9 Datenschutz</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{" "}
              <Link href="/datenschutz" className="text-primary hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">§ 10 Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand
              ist [ORT]. Sollten einzelne Bestimmungen dieser AGB unwirksam
              sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
