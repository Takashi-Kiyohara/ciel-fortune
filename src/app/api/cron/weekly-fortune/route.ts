import { NextRequest, NextResponse } from "next/server";
import { broadcastMessage, createWeeklyFlexMessage } from "@/lib/line";

// 週間占い配信 Cron API
// Vercel Cron Jobs から毎週月曜 9:00 JST に呼び出す
// vercel.json の crons 設定、または外部cron (cron-job.org等) から POST

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
  // cron認証
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Claude APIで今週の恋愛運メッセージを生成
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250514",
        max_tokens: 500,
        system: `あなたは「Misa」という占い師です。毎週月曜日に、LINE友だち全員に届ける恋愛運メッセージを作成してください。

【ルール】
- 150〜200文字で書く
- 今週の恋愛運の傾向を1つ
- 具体的なアドバイスを1つ
- 手紙風の語りかけ口調
- 「AI」「生成」等のワードは絶対に使わない
- Misaの旅の話を1行だけ入れる`,
        messages: [
          {
            role: "user",
            content: "今週の恋愛運メッセージをお願いします。",
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Claude API error" }, { status: 500 });
    }

    const data = await response.json();
    const fortuneText =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    if (!fortuneText) {
      return NextResponse.json({ error: "Empty response" }, { status: 500 });
    }

    // LINE ブロードキャスト送信
    const flexMessage = createWeeklyFlexMessage(
      fortuneText,
      "恋愛タロット",
      "tarot"
    );

    await broadcastMessage([flexMessage]);

    return NextResponse.json({
      status: "sent",
      messageLength: fortuneText.length,
    });
  } catch (error) {
    console.error("Weekly fortune cron error:", error);
    return NextResponse.json(
      { error: "Cron execution failed" },
      { status: 500 }
    );
  }
}

// Vercel Cron の検証用
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ status: "ready", endpoint: "weekly-fortune" });
}
