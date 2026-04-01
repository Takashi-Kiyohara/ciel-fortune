"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MisaAvatar from "@/components/MisaAvatar";
import { sendGAEvent } from "@/components/GoogleAnalytics";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
};

const CHAT_STORAGE_KEY = "ciel-fortune-chat";
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "こんにちは、Misaです。\n\n恋愛のこと、気になるあの人のこと、なんでも聞いてくださいね。パリで学んだタロットの知恵や、バリで出会った星の教えを使って、あなたの恋を一緒に見つめてみましょう。",
};

function loadChatHistory(): Message[] {
  if (typeof window === "undefined") return [WELCOME_MESSAGE];
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return [WELCOME_MESSAGE];
}

function saveChatHistory(messages: Message[]) {
  if (typeof window === "undefined") return;
  try {
    // 最大30メッセージを保存（古いものを切る）
    const toSave = messages.slice(-30);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toSave));
  } catch { /* quota exceeded等 */ }
}

function formatTimestamp(ts?: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

// Misaの思考中インジケーター
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="mr-2 mt-1">
        <MisaAvatar size={32} />
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] border border-[var(--border-thin)] rounded-lg px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isWaitingReply, setIsWaitingReply] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shouldAutoScrollRef = useRef(true);

  // localStorage から復元
  useEffect(() => {
    const stored = loadChatHistory();
    setMessages(stored);
    setIsInitialized(true);
  }, []);

  // メッセージ変更時に保存（初期化後のみ）
  useEffect(() => {
    if (isInitialized && !isStreaming) {
      saveChatHistory(messages);
    }
  }, [messages, isInitialized, isStreaming]);

  // 新しい会話を始める
  const handleClearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    saveChatHistory([WELCOME_MESSAGE]);
  }, []);

  // アイドル時の会話候補表示
  const [showIdleSuggestions, setShowIdleSuggestions] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 会話中のアイドル検知: 最後のassistant返信後10秒で候補を表示
  useEffect(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setShowIdleSuggestions(false);

    // 条件: 会話が2往復以上、ストリーミング中でない、最後のメッセージがassistant
    const lastMsg = messages[messages.length - 1];
    if (messages.length >= 3 && !isStreaming && lastMsg?.role === "assistant" && lastMsg.id !== "welcome") {
      idleTimerRef.current = setTimeout(() => {
        setShowIdleSuggestions(true);
      }, 10000);
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [messages, isStreaming]);

  // 会話の文脈に応じた候補を生成
  const getIdleSuggestions = useCallback((): string[] => {
    const lastAssistant = [...messages].reverse().find(m => m.role === "assistant" && m.id !== "welcome");
    const content = lastAssistant?.content || "";
    // キーワードに応じた候補分岐
    if (content.includes("タロット") || content.includes("カード")) {
      return ["もう1枚引いてもらえますか？", "このカードの恋愛での意味をもっと教えて", "彼との相性も見てほしいです"];
    }
    if (content.includes("星座") || content.includes("占星術")) {
      return ["相性の良い星座は？", "今月の恋愛運をもっと詳しく", "金星の影響について教えて"];
    }
    if (content.includes("片思い") || content.includes("好きな人")) {
      return ["告白のタイミングはいつがいい？", "脈ありサインを教えて", "彼の気持ちが知りたいです"];
    }
    if (content.includes("元彼") || content.includes("忘れられない")) {
      return ["復縁の可能性はありますか？", "新しい恋に進むべき？", "気持ちの整理の仕方を教えて"];
    }
    // デフォルト候補
    return ["もう少し詳しく教えて", "他の占いでも見てほしいです", "具体的なアドバイスがほしいです"];
  }, [messages]);

  // スマートスクロール: ユーザーが下部近くにいるときだけ自動スクロール
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const threshold = 100;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    shouldAutoScrollRef.current = isNearBottom;
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    sendGAEvent("chat_message_sent", { message_length: text.length });

    const now = Date.now();
    const userMessage: Message = {
      id: `user-${now}`,
      role: "user",
      content: text,
      timestamp: now,
    };

    const assistantMessage: Message = {
      id: `assistant-${now}`,
      role: "assistant",
      content: "",
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsWaitingReply(true);
    setIsStreaming(true);

    // 送信後にスクロールを強制
    shouldAutoScrollRef.current = true;

    try {
      const conversationHistory = [
        ...messages.filter((m) => m.id !== "welcome"),
        userMessage,
      ].map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!res.ok || !res.body) {
        throw new Error("API error");
      }

      // ストリーミング開始 — typing indicatorを消してassistantメッセージを追加
      setIsWaitingReply(false);
      setMessages((prev) => [...prev, assistantMessage]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      let streamBroken = false;
      while (true) {
        let done: boolean;
        let value: Uint8Array | undefined;
        try {
          ({ done, value } = await reader.read());
        } catch {
          // ネットワーク切断時
          streamBroken = true;
          break;
        }
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: m.content + data.text }
                      : m
                  )
                );
              }
            } catch {
              // パース失敗は無視
            }
          }
        }
      }

      // ストリーミング途中で接続が切れた場合
      if (streamBroken) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: m.content + "\n\n（接続が途中で途切れてしまいました。もう一度お試しください）", id: `error-${Date.now()}` }
              : m
          )
        );
      }
    } catch {
      setIsWaitingReply(false);
      setMessages((prev) => [
        ...prev,
        {
          ...assistantMessage,
          id: `error-${Date.now()}`,
          content:
            "あら、少し星の回線が乱れてしまったようです。\n\n下のボタンからもう一度お試しいただけますか？",
        },
      ]);
    } finally {
      setIsStreaming(false);
      // 返信完了後に入力欄にフォーカス
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="h-screen flex flex-col bg-[var(--bg-deep)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-thin)]">
        <Link
          href="/"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
        >
          &larr; 戻る
        </Link>
        <div className="flex items-center gap-2">
          <MisaAvatar size={28} />
          <div>
            <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase">
              Misa
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {isStreaming ? "返信中..." : "恋愛相談 · オンライン"}
            </p>
          </div>
        </div>
        {messages.length > 1 ? (
          <button
            onClick={handleClearChat}
            className="text-[10px] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            aria-label="新しい相談を始める"
          >
            新規相談
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Screen reader status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isWaitingReply && "Misaが返信を考えています"}
        {isStreaming && "Misaが返信中です"}
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        role="log"
        aria-label="チャット履歴"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="mr-2 mt-1">
                <MisaAvatar size={32} />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === "user"
                  ? "bg-[var(--gold)] text-[var(--bg-deep)]"
                  : "bg-[rgba(255,255,255,0.05)] border border-[var(--border-thin)] text-[var(--text-light)]"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
                {isStreaming &&
                  message.id === messages[messages.length - 1].id &&
                  message.role === "assistant" && (
                    <span className="inline-block w-1.5 h-4 bg-[var(--gold)] ml-0.5 animate-pulse" />
                  )}
              </p>
              {message.timestamp && message.id !== "welcome" && (
                <p className={`text-[10px] mt-1.5 opacity-40 ${message.role === "user" ? "text-[var(--bg-deep)]" : "text-[var(--text-muted)]"}`}>
                  {formatTimestamp(message.timestamp)}
                </p>
              )}
              {message.id.startsWith("error-") && !isStreaming && (
                <button
                  onClick={() => {
                    // Remove error message and last user message, then resend
                    const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
                    if (lastUserMsg) {
                      setMessages(prev => prev.filter(m => m.id !== message.id));
                      setInput(lastUserMsg.content);
                    }
                  }}
                  className="mt-2 text-xs text-[var(--gold)] hover:underline"
                >
                  もう一度試す
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Conversation Starters — only show when just welcome message */}
        {messages.length === 1 && messages[0].id === "welcome" && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center pt-2"
          >
            {[
              "片思いの彼のことが気になっています",
              "最近恋愛運が下がっている気がします",
              "元彼のことが忘れられません",
              "出会いがなくて悩んでいます",
            ].map((starter) => (
              <button
                key={starter}
                onClick={() => {
                  setInput(starter);
                  // テキストエリアを自動リサイズ
                  setTimeout(() => {
                    const el = inputRef.current;
                    if (el) {
                      el.style.height = "auto";
                      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
                      el.focus();
                    }
                  }, 50);
                }}
                className="text-xs text-[var(--text-muted)] border border-[var(--border-thin)] rounded-full px-4 py-2 hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
              >
                {starter}
              </button>
            ))}
          </motion.div>
        )}

        {/* Idle Suggestions — 10秒無操作時に表示 */}
        <AnimatePresence>
          {showIdleSuggestions && !isStreaming && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-2 justify-center pt-2"
            >
              <p className="w-full text-center text-[10px] text-[var(--text-muted)] mb-1 opacity-60">
                こんなことも聞いてみませんか？
              </p>
              {getIdleSuggestions().map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    setShowIdleSuggestions(false);
                    setTimeout(() => {
                      const el = inputRef.current;
                      if (el) {
                        el.style.height = "auto";
                        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
                        el.focus();
                      }
                    }, 50);
                  }}
                  className="text-xs text-[var(--text-muted)] border border-[var(--border-thin)] rounded-full px-4 py-2 hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isWaitingReply && <TypingIndicator />}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[var(--border-thin)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize: 最大4行まで伸びる
              const el = e.target;
              el.style.height = "auto";
              el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder="恋の悩みを聞かせてください..."
            rows={1}
            className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[var(--border-mid)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-light)] placeholder-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--gold)] transition-colors"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className="bg-[var(--gold)] text-[var(--bg-deep)] px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-30"
            aria-label="メッセージを送信"
          >
            {isStreaming ? "..." : "話す"}
          </button>
        </div>
        <p className="text-center text-[10px] text-[var(--text-muted)] mt-2 opacity-50">
          Misaとの恋愛相談を無料で体験できます
        </p>
      </div>
    </main>
  );
}
