import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRICES } from "@/lib/stripe";
import { verifyAuth } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const { type, fortuneSlug } = await request.json();
    const stripe = getStripe();
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // JWT認証でユーザーIDを取得（クライアント提供のuserIdは使わない）
    const auth = await verifyAuth(request);
    const userId = auth.user?.id || "";

    if (type === "per-reading") {
      // 1回鑑定 ¥300 — Checkout Session (one-time payment)
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "jpy",
              product_data: {
                name: `Ciel Fortune — 詳細鑑定`,
                description: `${fortuneSlug} の恋愛鑑定`,
              },
              unit_amount: PRICES.perReading,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: "per-reading",
          fortune_slug: fortuneSlug,
          user_id: userId, // JWT検証済みのユーザーID
        },
        success_url: `${origin}/fortune/${fortuneSlug}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/fortune/${fortuneSlug}?payment=cancelled`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (type === "premium") {
      // Premium ¥400/月 — Subscription
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "jpy",
              product_data: {
                name: "Ciel Fortune Premium",
                description: "全占い見放題 + 優先鑑定",
              },
              unit_amount: PRICES.premiumMonthly,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: "premium",
          user_id: userId, // JWT検証済みのユーザーID
        },
        success_url: `${origin}/fortune/${fortuneSlug || "tarot"}?payment=success&premium=true`,
        cancel_url: `${origin}/fortune/${fortuneSlug || "tarot"}?payment=cancelled`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (type === "portal") {
      // Stripe Billing Portal — プラン管理・解約
      if (!auth.user) {
        return NextResponse.json({ error: "プランの管理にはログインが必要です。" }, { status: 401 });
      }

      // ユーザーのStripe Customer IDを取得
      const customers = await stripe.customers.list({
        limit: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(({ query: `metadata["user_id"]:"${userId}"` }) as any),
      });

      if (customers.data.length === 0) {
        return NextResponse.json({ error: "ご契約情報が見つかりませんでした。お手数ですが、お問い合わせください。" }, { status: 404 });
      }

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customers.data[0].id,
        return_url: `${origin}/mypage`,
      });

      return NextResponse.json({ url: portalSession.url });
    }

    return NextResponse.json({ error: "お手続きの種類を確認できませんでした。もう一度お試しください。" }, { status: 400 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "お手続きの準備中に問題が起きてしまいました。しばらくしてからお試しくださいね。" },
      { status: 500 }
    );
  }
}
