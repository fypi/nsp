"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

function normalizeLocale(raw: unknown): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW") return "zh-TW";
  return "zh";
}

const copy = {
  zh: {
    title: "忘记密码",
    desc: "输入注册邮箱，我们会发送密码重置链接。",
    email: "邮箱",
    emailPlaceholder: "请输入注册邮箱",
    send: "发送重置链接",
    sending: "发送中...",
    back: "返回登录",
    required: "请输入邮箱。",
    success: "如果该邮箱已注册，重置链接会发送到邮箱中。",
    failed: "发送失败，请检查网络、邮箱配置或稍后重试。",
  },
  en: {
    title: "Forgot password",
    desc: "Enter your registered email and we will send a password reset link.",
    email: "Email",
    emailPlaceholder: "Enter your registered email",
    send: "Send reset link",
    sending: "Sending...",
    back: "Back to login",
    required: "Please enter your email.",
    success: "If the email is registered, a reset link will be sent to it.",
    failed: "Failed to send. Please check the network, email configuration, or try again later.",
  },
  "zh-TW": {
    title: "忘記密碼",
    desc: "輸入註冊信箱，我們會發送密碼重設連結。",
    email: "信箱",
    emailPlaceholder: "請輸入註冊信箱",
    send: "發送重設連結",
    sending: "發送中...",
    back: "返回登入",
    required: "請輸入信箱。",
    success: "如果該信箱已註冊，重設連結會發送到信箱中。",
    failed: "發送失敗，請檢查網路、信箱設定或稍後重試。",
  },
};

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const c = copy[locale];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMessageType("error");

    if (!email.trim()) {
      setMessage(c.required);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/${locale}/reset-password`
            : undefined,
      });

      if (error) {
        setMessage(c.failed);
        setLoading(false);
        return;
      }

      setMessageType("success");
      setMessage(c.success);
    } catch {
      setMessage(c.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <h1>{c.title}</h1>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
          {c.desc}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">{c.email}</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={c.emailPlaceholder}
          />

          {message && (
            <p
              style={{
                color: messageType === "success" ? "#166534" : "#b42318",
                fontSize: 13,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? c.sending : c.send}
          </button>
        </form>

        <div
          className="auth-links"
          style={{
            display: "grid",
            justifyContent: "center",
            justifyItems: "start",
            gap: 10,
            marginTop: 24,
            fontSize: 15,
            lineHeight: 1.35,
          }}
        >
          <Link href={`/${locale}/login`}>{c.back}</Link>
        </div>
      </div>
    </main>
  );
}
