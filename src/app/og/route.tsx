import { siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "Mehr Revenue aus Klaviyo. Ohne Agentur.";
  const description = searchParams.get("description") || "Dashboard, Flows und KI-Copywriting für DTC-Brands.";

  const fontData = await fetch(
    new URL("../../assets/fonts/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "64px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Lime glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(209,254,73,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Lime glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(209,254,73,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Top: Logo + Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Logo dot */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "#d1fe49",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#0a0a0a",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Rekurio
            </span>
          </div>
          <div
            style={{
              background: "rgba(209,254,73,0.12)",
              border: "1px solid rgba(209,254,73,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#d1fe49",
              letterSpacing: "0.04em",
            }}
          >
            Klaviyo-Assistent für DTC-Brands
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 52 : 64,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "-0.02em",
              lineHeight: 1.4,
              maxWidth: "700px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "-0.01em",
            }}
          >
            rekurio.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {["14 Tage kostenlos", "Kein Abo-Risiko", "OAuth Connect"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "100px",
                  padding: "5px 14px",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
