import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// LINE Messaging API Webhook
// 週間占い配信 + ユーザーからのメッセージ受信

type LineEvent = {
  type: string;
  replyToken: string;
  source: { userId: string; type: string };
  message?: { type: string; text: string };
};

// LINE署名検証
function verifySignature(body: string, signature: string): boolean {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) return false;

  const hash = crypto
    .createHmac("SHA256", channelSecret)
    .update(body)
    .digest("base64");

  return hash === signature;
}

// LINEにメッセージ送信
async function replyMessage(replyToken: string, messages: object[]) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) return;

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  });
}

// 週間占い Flex Message テンプレート
function createWeeklyFortuneFlex(fortuneText: string, fortuneName: string) {
  return {
    type: "flex",
    altText: `今週の${fortuneName}をお届けします`,
    contents: {
      type: "bubble",
      styles: {
        header: { backgroundColor: "#0d0d1a" },
        body: { backgroundColor: "#0d0d1a" },
        footer: { backgroundColor: "#0d0d1a" },
      },
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "CIEL FORTUNE",
            color: "#c4a265",
            size: "xs",
            weight: "bold",
          },
          {
            type: "text",
            text: `今週の${fortuneName}`,
            color: "#f8f5f0",
            size: "lg",
            weight: "bold",
            margin: "sm",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: fortuneText,
            color: "#e8e4df",
            size: "sm",
            wrap: true,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "もっと詳しく見る",
              uri: `${process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app"}/fortune/tarot`,
            },
            style: "link",
            color: "#c4a265",
          },
        ],
      },
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-line-signature");

    // 署名検証
    if (!signature || !verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const parsed = JSON.parse(body);
    const events: LineEvent[] = parsed.events || [];

    for (const event of events) {
      if (event.type === "follow") {
        // 友だち追加時のウェルカムメッセージ
        await replyMessage(event.replyToken, [
          {
            type: "text",
            text: "はじめまして、Misaです。\n\n世界中を飛び回るなかで出会った占いの知恵を、毎週あなたにお届けします。\n\n恋の悩み、気になるあの人のこと、何でも聞いてくださいね。",
          },
        ]);
      }

      if (event.type === "message" && event.message?.type === "text") {
        const userText = event.message.text;

        // 簡単なキーワード応答
        if (userText.includes("占い") || userText.includes("恋")) {
          await replyMessage(event.replyToken, [
            {
              type: "text",
              text: "恋の相談ですね。\n\nもっと詳しくお話を聞かせていただけたら、カードを引いてみますね。\n\nWebサイトでは8種類の占いをご体験いただけます。",
            },
            createWeeklyFortuneFlex(
              "今週は金星の動きが活発で、恋愛運が上昇中。気になる人がいるなら、今週中にアクションを起こしてみて。",
              "恋愛タロット"
            ),
          ]);
        } else {
          await replyMessage(event.replyToken, [
            {
              type: "text",
              text: `ありがとうございます。\n\n「${userText.slice(0, 20)}」について、少し考えさせてくださいね。\n\nより詳しい鑑定はWebサイトでお受けいただけます。`,
            },
          ]);
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("LINE webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

// LINE Webhook 検証用（GET）
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
