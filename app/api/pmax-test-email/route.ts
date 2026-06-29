import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Test-Delivery-Mail für den PMax-Builder.
//
// Zweck: verifiziert, dass Resend im Projekt korrekt verdrahtet ist und
// eine Bestätigungs-Mail nach erfolgreichem (Mock-)Bezahlvorgang zustellt.
// Bewusst OHNE Anhänge — wir wollen dem Empfänger-Postfach keine 25–40 MB
// aufzwingen. Echte Asset-Lieferung läuft später über signed Download-
// Links (siehe /api/pmax-order in der nächsten Iteration).
//
// Request-Body:
//   { email: string, url?: string, orderId?: string,
//     wantsLogos?: boolean, scope?: string }
// Response:
//   200 { success: true, messageId: string, sandbox: boolean }
//   400/500 { error: string }

export const runtime = "nodejs";

interface TestEmailBody {
  email?: string;
  url?: string;
  orderId?: string;
  wantsLogos?: boolean;
  scope?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FROM = "SEA Gute Freelancer <onboarding@resend.dev>";
const SANDBOX_DOMAINS = ["resend.dev", "onboarding@resend.dev"];

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY fehlt in der Umgebung." },
      { status: 500 }
    );
  }

  let body: TestEmailBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "E-Mail ist erforderlich und muss valide sein." },
      { status: 400 }
    );
  }

  const url = body.url?.trim() || "—";
  const orderId = body.orderId?.trim() || `sgf-test-${Date.now().toString(36)}`;
  const wantsLogos = Boolean(body.wantsLogos);
  const scope = body.scope?.trim() || "";

  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const isSandbox = SANDBOX_DOMAINS.some((s) => from.includes(s));

  const resend = new Resend(apiKey);

  const subject = `Test · Dein PMax Asset Paket (${orderId})`;

  const html = renderEmail({
    orderId,
    url,
    wantsLogos,
    scope,
    isSandbox,
    recipient: email,
  });

  const textFallback = [
    `Hi,`,
    ``,
    `dein PMax Asset Paket ist in Arbeit.`,
    ``,
    `Bestell-Nr: ${orderId}`,
    `URL: ${url}`,
    `Logos: ${wantsLogos ? "2 PMax-Varianten inklusive" : "ohne"}`,
    scope ? `Fokus: ${scope}` : null,
    ``,
    `Hinweis: Dies ist eine Test-Mail. Die fertigen Assets werden später`,
    `über einen Download-Link geliefert (keine ZIP-Anhänge).`,
    ``,
    `— SEA Gute Freelancer`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
      text: textFallback,
      tags: [
        { name: "product", value: "pmax_builder" },
        { name: "mode", value: "test" },
      ],
    });

    if (error) {
      console.error("[pmax-test-email] Resend error:", error);
      return NextResponse.json(
        { error: error.message || "E-Mail konnte nicht gesendet werden." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id ?? null,
      sandbox: isSandbox,
      orderId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[pmax-test-email] unexpected error:", msg);
    return NextResponse.json(
      { error: `Interner Fehler: ${msg}` },
      { status: 500 }
    );
  }
}

// ─── HTML-Template ───────────────────────────────────────────────────────────
// Minimal-Design im SGF-Stil (gold/cream/charcoal). Table-Layout, damit
// Outlook & Gmail das nicht zerschießen. Keine externen Assets, keine JS.

function renderEmail(params: {
  orderId: string;
  url: string;
  wantsLogos: boolean;
  scope: string;
  isSandbox: boolean;
  recipient: string;
}): string {
  const { orderId, url, wantsLogos, scope, isSandbox, recipient } = params;
  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) => {
      switch (c) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "\"": return "&quot;";
        case "'": return "&#39;";
        default: return c;
      }
    });

  const gold = "#C9A96E";
  const goldDark = "#A8894F";
  const charcoal = "#1E1A16";
  const cream = "#FAF8F4";
  const border = "#E8DFC8";
  const muted = "#7A6E62";

  return `
  <!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escape(`Dein PMax Asset Paket · ${orderId}`)}</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f1e8; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:${charcoal};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f1e8; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:${cream}; border:1px solid ${border}; border-radius:14px; overflow:hidden;">

            <!-- Banner -->
            <tr>
              <td style="background:${gold}; padding:28px 32px;">
                <div style="display:inline-block; background:${charcoal}; color:${cream}; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:4px 8px; border-radius:4px; margin-bottom:10px;">PMax Builder</div>
                <h1 style="margin:0; color:${charcoal}; font-size:22px; line-height:1.3; font-weight:800;">Dein Asset Paket läuft. 🚀</h1>
                <p style="margin:6px 0 0; color:${charcoal}; opacity:0.75; font-size:13px;">Bestell-Nr. <strong style="font-family:ui-monospace, SFMono-Regular, monospace;">${escape(orderId)}</strong></p>
              </td>
            </tr>

            ${isSandbox ? `
            <tr>
              <td style="background:#fff6e5; border-bottom:1px solid #f1d9a0; padding:10px 32px; color:#8a5a00; font-size:12px;">
                <strong>Sandbox-Modus:</strong> Diese Mail wurde über Resends Test-Sender <code>onboarding@resend.dev</code> verschickt — in Prod ersetzen wir das durch eine verifizierte Domain.
              </td>
            </tr>
            ` : ""}

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 16px; color:${charcoal}; font-size:15px; line-height:1.55;">
                  Hey, willkommen! Dein PMax Asset Paket ist bestätigt. Wir analysieren gerade deine Marke und bauen die Bilder — du bekommst den Download-Link, sobald alles fertig ist.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px; border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; color:${muted}; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; width:130px;">Website</td>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; font-size:14px; word-break:break-all;"><a href="${escape(url)}" style="color:${goldDark}; text-decoration:none;">${escape(url)}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; color:${muted}; font-size:12px; letter-spacing:0.5px; text-transform:uppercase;">Lieferumfang</td>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; font-size:14px;">12 PMax-Asset-Bilder${wantsLogos ? " + 2 Logo-Varianten" : ""}</td>
                  </tr>
                  ${scope ? `
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; color:${muted}; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; vertical-align:top;">Fokus</td>
                    <td style="padding:10px 0; border-bottom:1px solid ${border}; font-size:14px; line-height:1.5; white-space:pre-wrap;">${escape(scope)}</td>
                  </tr>
                  ` : ""}
                  <tr>
                    <td style="padding:10px 0; color:${muted}; font-size:12px; letter-spacing:0.5px; text-transform:uppercase;">Empfänger</td>
                    <td style="padding:10px 0; font-size:14px;">${escape(recipient)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Next Steps -->
            <tr>
              <td style="padding:20px 32px 28px;">
                <div style="background:#fff; border:1px solid ${border}; border-radius:10px; padding:18px 20px;">
                  <p style="margin:0 0 6px; color:${muted}; font-size:11px; letter-spacing:1px; text-transform:uppercase; font-weight:700;">So geht's weiter</p>
                  <ol style="margin:0; padding-left:18px; color:${charcoal}; font-size:14px; line-height:1.7;">
                    <li>KI-Agenten analysieren CI, Produkte &amp; Zielgruppe (~2 Min)</li>
                    <li>12 fotorealistische Motive werden generiert (~8–10 Min)</li>
                    <li>Du bekommst eine zweite Mail mit <strong>Download-Link</strong> — keine ZIP im Anhang, damit&apos;s auch an Gmail/Outlook zustellbar bleibt.</li>
                  </ol>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px 24px; border-top:1px solid ${border}; background:#f1eadb;">
                <p style="margin:0; color:${muted}; font-size:12px; line-height:1.6;">
                  Fragen? Antworte einfach auf diese Mail.<br />
                  SEA Gute Freelancer · PMax Builder · sea-gute-freelancer.de
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `.trim();
}
