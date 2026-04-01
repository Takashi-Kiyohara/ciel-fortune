import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase-server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      if (metadata.type === "per-reading" && metadata.user_id) {
        // 都度決済完了 → purchases テーブルに記録
        await supabase.from("purchases").insert({
          user_id: metadata.user_id,
          fortune_slug: metadata.fortune_slug,
          amount: 300,
          stripe_payment_intent_id: session.payment_intent as string,
          status: "completed",
        });
      }

      if (metadata.type === "premium" && metadata.user_id) {
        // サブスク開始 → profiles を更新
        await supabase
          .from("profiles")
          .update({
            subscription_status: "premium",
            stripe_customer_id: session.customer as string,
          })
          .eq("id", metadata.user_id);
      }

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // subscription_period_end を更新
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subAny = subscription as any;
      const periodEnd = new Date(
        (subAny.current_period_end || Math.floor(Date.now() / 1000) + 30 * 86400) * 1000
      ).toISOString();

      await supabase
        .from("profiles")
        .update({
          subscription_status:
            subscription.status === "active" ? "premium" : "cancelled",
          subscription_period_end: periodEnd,
        })
        .eq("stripe_customer_id", customerId);

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase
        .from("profiles")
        .update({
          subscription_status: "cancelled",
        })
        .eq("stripe_customer_id", customerId);

      break;
    }

    default:
      // 他のイベントは無視
      break;
  }

  return NextResponse.json({ received: true });
}
