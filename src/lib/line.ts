// LINE Messaging API ユーティリティ
// cron job や API route から呼び出して使う

export async function pushMessage(to: string, messages: object[]) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN が設定されていません");
  }

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ to, messages }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("LINE push error:", error);
    throw new Error(`LINE push failed: ${res.status}`);
  }
}

export async function broadcastMessage(messages: object[]) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN が設定されていません");
  }

  const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("LINE broadcast error:", error);
    throw new Error(`LINE broadcast failed: ${res.status}`);
  }
}

// 週間占い配信用 Flex Message
export function createWeeklyFlexMessage(
  fortuneText: string,
  fortuneName: string,
  fortuneSlug: string,
  appUrl = "https://ciel-fortune.vercel.app"
) {
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
              uri: `${appUrl}/fortune/${fortuneSlug}`,
            },
            style: "link",
            color: "#c4a265",
          },
        ],
      },
    },
  };
}
