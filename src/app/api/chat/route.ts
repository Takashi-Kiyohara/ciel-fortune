import { NextRequest } from "next/server";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { demoPatterns, defaultReplies } from "@/data/demo-chat-patterns";

// Misa チャット — Claude API Streaming
// ユーザーの恋愛相談にMisaとして応答する

const MISA_SYSTEM_PROMPT = `あなたは「Misa」という名前の国際線CA兼占い師です。
国際線のフライトで世界各地を巡り、パリ、ストックホルム、北京、レイキャビク、イスタンブール、アテネ、ジャイプール、マウイ島の占い師たちから直接技法を学びました。

【キャラクター】
- 30代前半、穏やかで包容力のある女性
- 話し方は親しみやすいが品のある丁寧語。友達ノリにはならない
- 恋愛経験も豊か。自身も失恋や遠距離を経験し、相談者の痛みがわかる
- 好きなもの：機内から見る夕焼け、各地のカフェ、手書きの手紙

【占い知識（会話で自然に使う）】
- タロット：カード名と恋愛的な意味を正確に使う
- 西洋占星術：金星星座（恋愛スタイル）、月星座（感情パターン）に触れられる
- 数秘術：ライフパスナンバーの恋愛的特性を語れる
- ルーン：エルダーフサルクの文字とその象徴を知っている
- コーヒー占い：カップに現れるシンボルの伝統的解釈ができる
- ヴェーダ占星術：ナクシャトラとカルマの概念を自然に使える
→ これらを「相手の悩みに合わせて適切な占術を選んで」会話に織り込む。全部使う必要はない

【会話の作法】
- 1回の返答は250〜450文字。短すぎず長すぎず
- まず相手の気持ちに共感する → 占いの知恵で視点を広げる → 具体的な行動提案か質問で締める
- 質問は1回の返答に1つまで。質問攻めにしない
- 3〜4往復に1回くらい、旅先エピソードを1〜2文で自然に挿入する（毎回入れない）
- 相手が詳しく話してくれたら、それに合った占術で「即席ミニ鑑定」を提供することもある
- 語尾は「〜ですね」「〜でしょう」「〜かもしれません」の柔らかいトーン

【絶対禁止】
- 「AI」「人工知能」「生成」「分析」「データ」「アルゴリズム」等のテクノロジーワード
- 箇条書き・記号リスト
- 機械的な定型応答（「お話しいただきありがとうございます」の連発等）
- 医療・法律等の専門的アドバイス
- ネガティブな断言（「別れた方がいい」「無理です」等）
- 同じエピソードの繰り返し使用`;

// デモ用応答（APIキー未設定時 — 正規表現マッチ + ランダム選択）
function getDemoChatReply(userMessage: string): string {
  for (const pattern of demoPatterns) {
    if (pattern.test.test(userMessage)) {
      return pattern.replies[Math.floor(Math.random() * pattern.replies.length)];
    }
  }
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

export async function POST(request: NextRequest) {
  try {
    // レートリミット
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { success } = rateLimit(`chat:${ip}`, RATE_LIMITS.chat.limit, RATE_LIMITS.chat.windowMs);
    if (!success) {
      return new Response(
        JSON.stringify({ error: "しばらく時間をおいてからお試しください。" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : undefined;

    // メッセージ数制限（最大50往復）
    if (messages.length > 100) {
      return new Response(
        JSON.stringify({ error: "会話が長くなりすぎました。新しい相談を始めてみてくださいね。" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 各メッセージの長さ制限（1メッセージ最大2000文字）
    for (const m of messages) {
      if (typeof m.content !== "string" || m.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "メッセージが長すぎます。もう少し短くお話しいただけますか？" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (m.role !== "user" && m.role !== "assistant") {
        return new Response(
          JSON.stringify({ error: "うまく受け取れませんでした。もう一度お試しいただけますか？" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const isRealKey = apiKey && !apiKey.includes("xxxx");

    // APIキー未設定 → デモ応答を返す
    if (!isRealKey) {
      const lastMessage = messages[messages.length - 1]?.content || "";
      const demoReply = getDemoChatReply(lastMessage);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // 文字を少しずつ流してストリーミング感を出す
          const chars = [...demoReply];
          let i = 0;
          const interval = setInterval(() => {
            if (i < chars.length) {
              const chunk = chars.slice(i, i + 3).join("");
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
              i += 3;
            } else {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
              controller.close();
              clearInterval(interval);
            }
          }, 50);
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
      });
    }

    // Claude API にストリーミングリクエスト
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250514",
        max_tokens: 800,
        system: MISA_SYSTEM_PROMPT,
        stream: true,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok || !response.body) {
      return new Response(
        JSON.stringify({ error: "あら、少し星の回線が乱れてしまったようです。もう一度お話しいただけますか？" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // SSE ストリームをそのままクライアントに転送
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.type === "text_delta"
                  ) {
                    const text = parsed.delta.text;
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    );
                  }
                  if (parsed.type === "message_stop") {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ done: true, sessionId })}\n\n`)
                    );
                  }
                } catch {
                  // パース失敗は無視
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "星の巡りが少し乱れてしまったようです。しばらくしてからお試しくださいね。" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
