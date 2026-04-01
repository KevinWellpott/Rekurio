import { NextResponse } from "next/server"
import { getPostHogClient } from "@/lib/posthog-server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type CrmProvider = "klaviyo" | "pipedrive" | "none"

function getProvider(): CrmProvider {
  const p = process.env.CRM_PROVIDER?.toLowerCase()
  if (p === "pipedrive") return "pipedrive"
  if (p === "none") return "none"
  return "klaviyo"
}

async function subscribeKlaviyo(email: string) {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY
  const listId = process.env.KLAVIYO_LIST_ID
  if (!key || !listId) {
    throw new Error("Klaviyo: KLAVIYO_PRIVATE_API_KEY oder KLAVIYO_LIST_ID fehlt")
  }

  const revision = process.env.KLAVIYO_API_REVISION || "2024-10-15"

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        revision,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    // Kein consent hier setzen – Klaviyo Double Opt-In Flow
                    // übernimmt die Bestätigung und setzt SUBSCRIBED nach Klick.
                  },
                },
              ],
            },
            custom_source: "Rekurio Hero Launch-Liste",
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Klaviyo ${res.status}: ${text.slice(0, 400)}`)
  }
}

async function subscribePipedrive(email: string) {
  const token = process.env.PIPEDRIVE_API_TOKEN
  const domain = process.env.PIPEDRIVE_COMPANY_DOMAIN
  if (!token || !domain) {
    throw new Error(
      "Pipedrive: PIPEDRIVE_API_TOKEN oder PIPEDRIVE_COMPANY_DOMAIN fehlt"
    )
  }

  const url = new URL(`https://${domain}.pipedrive.com/api/v1/persons`)
  url.searchParams.set("api_token", token)

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: email.split("@")[0] || "Newsletter",
      email: [{ value: email, primary: true }],
    }),
  })

  const json = (await res.json()) as { success?: boolean; error?: string }

  if (!res.ok || json.success === false) {
    throw new Error(
      json.error || `Pipedrive ${res.status}: ${JSON.stringify(json)}`
    )
  }
}

export async function POST(request: Request) {
  const distinctId = request.headers.get("X-POSTHOG-DISTINCT-ID") ?? "anonymous"
  const sessionId = request.headers.get("X-POSTHOG-SESSION-ID") ?? undefined

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body" }, { status: 400 })
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : ""

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Bitte eine gültige E-Mail eingeben." }, { status: 400 })
  }

  const provider = getProvider()

  try {
    if (provider === "none") {
      console.info("[subscribe] CRM_PROVIDER=none — E-Mail nur geloggt:", email)
      const posthog = getPostHogClient()
      posthog.capture({
        distinctId,
        event: "subscribe_api_succeeded",
        properties: { email, provider: "none", $session_id: sessionId },
      })
      return NextResponse.json({ ok: true, mode: "none" })
    }

    if (provider === "pipedrive") {
      await subscribePipedrive(email)
      const posthog = getPostHogClient()
      posthog.capture({
        distinctId,
        event: "subscribe_api_succeeded",
        properties: { email, provider: "pipedrive", $session_id: sessionId },
      })
      return NextResponse.json({ ok: true, provider: "pipedrive" })
    }

    await subscribeKlaviyo(email)
    const posthog = getPostHogClient()
    posthog.capture({
      distinctId,
      event: "subscribe_api_succeeded",
      properties: { email, provider: "klaviyo", $session_id: sessionId },
    })
    posthog.identify({ distinctId, properties: { email } })
    return NextResponse.json({ ok: true, provider: "klaviyo" })
  } catch (e) {
    console.error("[subscribe]", e)
    const message = e instanceof Error ? e.message : "CRM-Anbindung fehlgeschlagen"
    const posthog = getPostHogClient()
    posthog.capture({
      distinctId,
      event: "subscribe_api_failed",
      properties: { email, provider, error: message, $session_id: sessionId },
    })
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
