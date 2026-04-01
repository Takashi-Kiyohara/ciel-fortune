import Stripe from "stripe";

// Server-side Stripe client
export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe環境変数が設定されていません");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion,
  });
}

// Price IDs — Stripe Dashboard で作成後に .env.local に設定
export const PRICES = {
  // 1回鑑定: ¥300
  perReading: 300,
  // Premium月額: ¥400
  premiumMonthly: 400,
  // チャット相談: ¥500
  chatSession: 500,
} as const;
