import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Rekurio",
  robots: { index: false, follow: false },
}

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div className="text-muted-foreground mt-10 flex flex-col gap-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-foreground mb-2 font-semibold">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der DSGVO ist:<br /><br />
              [VORNAME NACHNAME / FIRMENNAME]<br />
              [STRAßE HAUSNUMMER]<br />
              [PLZ ORT]<br />
              E-Mail:{" "}
              <a href="mailto:hello@rekurio.com" className="text-primary hover:underline">
                hello@rekurio.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">2. Erhobene Daten & Zweck</h2>
            <p>
              Wir erheben und verarbeiten personenbezogene Daten nur, soweit
              dies zur Bereitstellung unserer Dienste erforderlich ist oder du
              ausdrücklich eingewilligt hast.
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1.5">
              <li>
                <strong className="text-foreground/80">E-Mail-Adresse</strong> — bei Eintragung in die
                Warteliste oder Anmeldung zum Newsletter. Rechtsgrundlage: Art.
                6 Abs. 1 lit. a DSGVO (Einwilligung via Double Opt-In).
              </li>
              <li>
                <strong className="text-foreground/80">Nutzungsdaten</strong> — anonymisierte
                Analysedaten (Seitenaufrufe, Klicks) über PostHog. Kein
                Tracking ohne Einwilligung (Cookie-Banner folgt).
              </li>
              <li>
                <strong className="text-foreground/80">Kalenderdaten</strong> — bei Buchung eines
                Demo-Calls über Calendly. Es gelten zusätzlich die
                Datenschutzbestimmungen von Calendly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">3. E-Mail-Marketing & Double Opt-In</h2>
            <p>
              Die Anmeldung zu unserem Newsletter oder unserer Warteliste
              erfolgt im Double-Opt-In-Verfahren. Du erhältst nach der
              Eintragung eine Bestätigungsmail mit einem Link. Erst nach Klick
              auf diesen Link wirst du in unsere Liste aufgenommen.
            </p>
            <p className="mt-2">
              Wir nutzen Klaviyo (Klaviyo, Inc., 125 Summer St, Boston, MA
              02110, USA) als E-Mail-Marketing-Plattform. Deine E-Mail-Adresse
              wird auf Servern in den USA gespeichert. Klaviyo ist nach dem
              EU-US Data Privacy Framework zertifiziert.
            </p>
            <p className="mt-2">
              Du kannst deine Einwilligung jederzeit widerrufen, indem du auf
              den Abmeldelink in jeder E-Mail klickst oder uns an{" "}
              <a href="mailto:hello@rekurio.com" className="text-primary hover:underline">
                hello@rekurio.com
              </a>{" "}
              schreibst.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">4. Analyse (PostHog)</h2>
            <p>
              Wir nutzen PostHog (PostHog Inc.) zur Analyse des
              Nutzerverhaltens. Dabei werden Daten wie Seitenaufrufe,
              Button-Klicks und Formular-Interaktionen erfasst. Die Daten
              werden auf EU-Servern verarbeitet (Region: EU). PostHog setzt
              ein Cookie, das eine pseudonyme Nutzer-ID speichert.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Analyse und Optimierung unseres Angebots). Du
              kannst der Verarbeitung jederzeit widersprechen.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">5. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. (340 Pine Street, Suite 701,
              San Francisco, CA 94104, USA) gehostet. Beim Aufruf der Seite
              werden automatisch Verbindungsdaten (IP-Adresse, Zeitstempel)
              in Vercel-Logs gespeichert. Rechtsgrundlage: Art. 6 Abs. 1
              lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">6. Deine Rechte</h2>
            <p>Du hast das Recht auf:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung deiner Rechte wende dich an:{" "}
              <a href="mailto:hello@rekurio.com" className="text-primary hover:underline">
                hello@rekurio.com
              </a>
            </p>
            <p className="mt-2">
              Du hast außerdem das Recht, bei einer Aufsichtsbehörde Beschwerde
              einzulegen.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-2 font-semibold">7. Aktualität</h2>
            <p>Stand: April 2026. Wir behalten uns vor, diese
            Datenschutzerklärung bei Bedarf anzupassen.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
