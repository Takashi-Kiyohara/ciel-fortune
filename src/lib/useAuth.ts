"use client";
import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowser } from "./supabase-browser";
import type { User } from "@supabase/supabase-js";

// デモモード: Supabase未接続時は認証なしで動作
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    if (!supabase) {
      // Supabase未接続 → デモモード
      setIsDemo(true);
      setLoading(false);
      return;
    }

    // 現在のセッション確認
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Auth state変化をリッスン
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    const supabase = createSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  // APIリクエスト用のアクセストークンを取得
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const supabase = createSupabaseBrowser();
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }, []);

  // 認証付きfetchヘルパー（Authorization: Bearer <token> を自動付与）
  const authFetch = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = await getAccessToken();
    const headers = new Headers(options.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(url, { ...options, headers });
  }, [getAccessToken]);

  return { user, loading, isDemo, signInWithGoogle, signOut, getAccessToken, authFetch };
}
