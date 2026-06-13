"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type ForgotPasswordText = {
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  send: string;
  sending: string;
  successMessage: string;
  errorMessage: string;
  backToLogin: string;
};

const locales: Locale[] = ["en", "zh", "zh-TW"];

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const forgotPasswordText: Record<Locale, ForgotPasswordText> = {
  zh: {
    title: "重置密码",
    emailLabel: "邮箱",
    emailPlaceholder: "请输入你的邮箱",
    send: "发送邮件",
    sending: "发送中...",
    successMessage: "如果该邮箱存在，你将收到重置链接。",
    errorMessage: "发送失败，请稍后再试。",
    backToLogin: "返回登录",
  },

  "zh-TW": {
    title: "重設密碼",
    emailLabel: "郵箱",
    emailPlaceholder: "請輸入你的郵箱",
    send: "發送郵件",
    sending: "發送中...",
    successMessage: "如果該郵箱存在，你將收到重設連結。",
    errorMessage: "發送失敗，請稍後再試。",
    backToLogin: "返回登入",
  },

  en: {
    title: "Reset Password",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    send: "Send email",
    sending: "Sending...",
    successMessage: "If the email exists, you’ll receive a reset link.",
    errorMessage: "Failed to send reset email. Please try again later.",
    backToLogin: "Back to login",
  },
};

export default function ForgotPasswordPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = forgotPasswordText[locale];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = `${origin}/${locale}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(t.errorMessage);
      return;
    }

    setInfoMsg(t.successMessage);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {t.title}
        </h1>

        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
                textAlign: "left",
              }}
            >
              {t.emailLabel}
            </label>

            <input
              type="email"
              required
              value={email}
              placeholder={t.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "12px 16px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {errorMsg && (
            <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {errorMsg}
            </p>
          )}

          {infoMsg && (
            <p style={{ color: "green", fontSize: "12px", textAlign: "center" }}>
              {infoMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "12px",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              boxSizing: "border-box",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? t.sending : t.send}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "13px", textAlign: "center" }}>
          <Link href={`/${locale}/login`} style={{ color: "#007bff" }}>
            {t.backToLogin}
          </Link>
        </p>
      </div>
    </div>
  );
}