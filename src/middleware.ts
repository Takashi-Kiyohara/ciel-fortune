import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が必要なAPIパス
const PROTECTED_API_ROUTES = ["/api/user/status", "/api/stripe/checkout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Stripe/LINE Webhook は署名検証で保護するため、ミドルウェアではスキップ
  if (
    pathname.startsWith("/api/stripe/webhook") ||
    pathname.startsWith("/api/line/webhook")
  ) {
    return NextResponse.next();
  }

  // 公開API（fortune, chat）はレートリミットのみで保護
  if (
    pathname.startsWith("/api/fortune") ||
    pathname.startsWith("/api/chat") ||
    pathname.startsWith("/api/auth")
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // 保護されたAPIルートはAuthorization Bearerトークンを確認
  if (PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route))) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // フォールバック: デモモード用にx-user-idも許容（Supabase未設定時のみ）
      const userId = request.headers.get("x-user-id");
      if (!userId) {
        return NextResponse.json(
          { error: "認証が必要です" },
          { status: 401 }
        );
      }
      // ヘッダー値のサニタイズ（フォールバック時のみ）
      if (!/^[a-zA-Z0-9_-]+$/.test(userId) || userId.length > 128) {
        return NextResponse.json(
          { error: "不正なリクエストです" },
          { status: 400 }
        );
      }
    }
    // JWT検証自体はルートハンドラ内のverifyAuth()で実施
    // ミドルウェアではヘッダーの存在のみ確認（Edge Runtimeの制約）
  }

  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
