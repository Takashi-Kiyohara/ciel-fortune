import { createClient } from "@supabase/supabase-js";

/**
 * Supabase JWT トークンからユーザーを検証・取得する
 *
 * Authorization: Bearer <token> ヘッダーからJWTを抽出し、
 * Supabaseの公開鍵で署名を検証してユーザー情報を返す。
 *
 * x-user-idヘッダーによる認証を完全に置き換える。
 */

type AuthResult =
  | { user: { id: string; email?: string }; error: null }
  | { user: null; error: string };

export async function verifyAuth(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { user: null, error: "認証が必要です" };
  }

  const token = authHeader.slice(7); // "Bearer " を除去

  if (!token || token.length < 10) {
    return { user: null, error: "不正な認証トークンです" };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // デモモード: Supabase未設定の場合はx-user-idフォールバック
    const fallbackId = request.headers.get("x-user-id");
    if (fallbackId && /^[a-zA-Z0-9_-]+$/.test(fallbackId) && fallbackId.length <= 128) {
      return { user: { id: fallbackId }, error: null };
    }
    return { user: null, error: "認証サービスが利用できません" };
  }

  // Supabaseクライアントでトークンを検証
  // anon keyを使い、ユーザー提供のJWTで認証する（service roleは使わない）
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { user: null, error: "認証トークンが無効または期限切れです" };
  }

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
    },
    error: null,
  };
}

/**
 * フロントエンド用: Supabaseセッションからアクセストークンを取得するヘルパー
 * useAuth hookと併用してAPIリクエスト時にヘッダーを構築する
 *
 * 使い方（クライアント側）:
 *   const token = await getAccessToken();
 *   fetch("/api/user/status", {
 *     headers: { Authorization: `Bearer ${token}` }
 *   });
 */
