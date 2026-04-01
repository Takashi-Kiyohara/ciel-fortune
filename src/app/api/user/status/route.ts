import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-server";
import { verifyAuth } from "@/lib/auth-server";

// ユーザーの購入状態・サブスク状態を確認
export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);

  if (auth.error || !auth.user) {
    return NextResponse.json({
      isPremium: false,
      purchasedSlugs: [],
    });
  }

  const userId = auth.user.id;
  const supabase = createSupabaseAdmin();

  // プロフィール（サブスク状態）
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, subscription_period_end")
    .eq("id", userId)
    .single();

  const isPremium =
    profile?.subscription_status === "premium" &&
    (!profile?.subscription_period_end ||
      new Date(profile.subscription_period_end) > new Date());

  // 購入済みの占いスラッグ一覧
  const { data: purchases } = await supabase
    .from("purchases")
    .select("fortune_slug")
    .eq("user_id", userId)
    .eq("status", "completed");

  const purchasedSlugs = (purchases || []).map((p) => p.fortune_slug);

  return NextResponse.json({
    isPremium,
    purchasedSlugs,
    subscriptionStatus: profile?.subscription_status || "free",
  });
}
