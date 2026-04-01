import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth-server";
import { createSupabaseAdmin } from "@/lib/supabase-server";

export async function DELETE(request: NextRequest) {
  try {
    // JWT認証でユーザーIDを取得
    const auth = await verifyAuth(request);

    if (!auth.user) {
      return NextResponse.json(
        { error: "アカウントの削除にはログインが必要です。" },
        { status: 401 }
      );
    }

    const userId = auth.user.id;
    const supabase = createSupabaseAdmin();

    // Stripe環境変数が設定されている場合は、アクティブなサブスクリプションをキャンセル
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (stripeSecretKey) {
      try {
        const { getStripe } = await import("@/lib/stripe");
        const stripe = getStripe();

        // ユーザーのStripe Customer IDを取得（メタデータで検索）
        const customers = await stripe.customers.list({
          limit: 100,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(({ query: `metadata["user_id"]:"${userId}"` }) as any),
        });

        // 見つかった各カスタマーのアクティブなサブスクリプションをキャンセル
        for (const customer of customers.data) {
          const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: "active",
            limit: 100,
          });

          for (const subscription of subscriptions.data) {
            await stripe.subscriptions.cancel(subscription.id);
          }
        }
      } catch (stripeError) {
        // Stripeエラーは非致命的 — ログしても続行
        console.error("Stripe subscription cancellation error:", stripeError);
      }
    }

    // Supabase DB から purchases テーブルのデータを削除
    const { error: purchasesError } = await supabase
      .from("purchases")
      .delete()
      .eq("user_id", userId);

    if (purchasesError) {
      console.error("purchases deletion error:", purchasesError);
    }

    // Supabase DB から profiles テーブルのデータを削除
    const { error: profilesError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profilesError) {
      console.error("profiles deletion error:", profilesError);
    }

    // Supabase Auth ユーザーを削除（管理者権限で実行）
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Auth user deletion error:", authError);
      return NextResponse.json(
        {
          error:
            "アカウントの削除中に問題が起きてしまいました。お手数ですが、info@ciel-fortune.com までご連絡ください。",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "アカウントの削除が完了しました。ご利用いただきありがとうございました。",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      {
        error:
          "アカウントの削除中に問題が起きてしまいました。お手数ですが、info@ciel-fortune.com までご連絡ください。",
      },
      { status: 500 }
    );
  }
}
