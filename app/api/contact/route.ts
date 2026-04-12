import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, budget, goal, message } = body;

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "SEA Gute Freelancer <onboarding@resend.dev>",
      to: "hello@robertmiler.com",
      replyTo: email,
      subject: `Neue Anfrage von ${name} – ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e1a16;">
          <div style="background: #C9A96E; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #1e1a16; font-size: 22px;">Neue Anfrage über SEA-gute-Freelancer.de</h1>
          </div>
          <div style="background: #faf8f4; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8dfc8; border-top: none;">

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px; width: 140px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px;">Unternehmen</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: 600;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px;">E-Mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">
                  <a href="mailto:${email}" style="color: #C9A96E;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px;">Telefon</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${phone || "–"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px;">Budget</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${budget || "–"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; color: #7a6e62; font-size: 13px;">Ziel</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${goal || "–"}</td>
              </tr>
            </table>

            ${message ? `
            <div style="margin-top: 24px;">
              <p style="margin: 0 0 8px; color: #7a6e62; font-size: 13px;">Nachricht</p>
              <div style="background: #fff; border: 1px solid #e8dfc8; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            ` : ""}

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e8dfc8; font-size: 12px; color: #a89e94;">
              Gesendet über das Kontaktformular auf sea-gute-freelancer.de
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Interner Fehler." }, { status: 500 });
  }
}
