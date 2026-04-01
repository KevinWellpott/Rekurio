export function register() {
  // No-op – PostHog server-side wird über lib/posthog-server.ts initialisiert
}

export const onRequestError = async (
  err: unknown,
  request: { headers: { cookie?: string | string[] } },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _context: any
) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getPostHogClient } = await import("./src/lib/posthog-server")
    const posthog = getPostHogClient()

    let distinctId: string | undefined

    if (request.headers.cookie) {
      const cookieString = Array.isArray(request.headers.cookie)
        ? request.headers.cookie.join("; ")
        : request.headers.cookie
      const match = cookieString.match(/ph_phc_.*?_posthog=([^;]+)/)
      if (match?.[1]) {
        try {
          const decoded = JSON.parse(decodeURIComponent(match[1]))
          distinctId = decoded.distinct_id
        } catch {
          // cookie nicht parsebar – kein Problem
        }
      }
    }

    await posthog.captureException(err, distinctId)
  }
}
