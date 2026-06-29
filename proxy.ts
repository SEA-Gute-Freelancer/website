import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth Gate für den pMax-Builder.
//
// Schützt die Builder-Seite und alle dazugehörigen API-Routes vor dem
// Public-Launch. Sobald `PMAX_BUILDER_PASS` als Env-Var gesetzt ist (auf
// Vercel und/oder in .env.local), erscheint der native Browser-Login-Dialog.
// Ohne Env-Var ist das Gate offen — bewusst so, damit Local-Dev ohne extra
// Setup läuft, wenn niemand die Vars in seine .env.local kopiert hat.
//
// Auth-Modell: Browser-Basic-Auth. Credentials werden vom Browser pro Origin
// gespeichert und automatisch mit jedem Request mitgeschickt — auch bei
// fetch() aus der Builder-Page heraus. Damit funktionieren die geschützten
// API-Calls nahtlos, sobald der User einmal eingeloggt ist.
//
// Limitierungen (bewusst akzeptiert für ein Soft-Gate):
//   - Keine Constant-Time-Vergleich → kleine Timing-Angriffsfläche, für ein
//     Pre-Launch-Gate egal.
//   - Browser-Native-UI ist nicht hübsch. Wenn das Produkt produktiv wird,
//     auf Stripe-Checkout-Gate oder Magic-Link-Auth umstellen.
//   - Logout = Browser-Cache leeren / Inkognito-Tab. Kein server-side Session-
//     Invalidate.

export const config = {
  // Edge-Matcher müssen statisch sein. Eine Regel pro geschütztem
  // Pfad-Namespace.
  matcher: [
    "/pmax-builder/:path*",
    "/pmax-builder",
    "/api/pmax/:path*",
    "/api/pmax-images/:path*",
    "/api/pmax-test-email",
  ],
};

export function proxy(req: NextRequest) {
  const expectedPass = process.env.PMAX_BUILDER_PASS;

  // Kein Pass konfiguriert → Gate offen. Local-Dev-Convenience.
  if (!expectedPass) {
    return NextResponse.next();
  }

  const expectedUser = process.env.PMAX_BUILDER_USER ?? "demo";
  const authHeader = req.headers.get("authorization") ?? "";

  if (authHeader.startsWith("Basic ")) {
    try {
      const decoded = atob(authHeader.slice(6));
      const sep = decoded.indexOf(":");
      const user = sep >= 0 ? decoded.slice(0, sep) : decoded;
      const pass = sep >= 0 ? decoded.slice(sep + 1) : "";
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      /* base64 invalid — fall through to 401 */
    }
  }

  return new NextResponse("Authentifizierung erforderlich.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="pMax-Builder", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
