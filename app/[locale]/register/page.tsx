"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

export default function RegisterPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      const origin = window.location.origin;
      const redirectTo = `${origin}/${locale}/login`;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setInfoMsg(
          locale === "en"
            ? "Account created. Please check your email to confirm it."
            : locale === "zh-TW"
            ? "帳號已建立，請到信箱完成確認。"
            : "账号已创建，请到邮箱完成确认。"
        );
      }
    } catch {
      setErrorMsg(
        locale === "en"
          ? "Network error, please try again."
          : locale === "zh-TW"
          ? "網路異常，請重試"
          : "网络异常，请重试"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {locale === "en" ? "Register" : locale === "zh-TW" ? "註冊" : "注册"}
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
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "14px 18px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              {locale === "en" ? "Password" : locale === "zh-TW" ? "密碼" : "密码"}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "14px 18px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {errorMsg && (
            <p style={{ color: "red", fontSize: "13px", textAlign: "center" }}>
              {errorMsg}
            </p>
          )}

          {infoMsg && (
            <p style={{ color: "green", fontSize: "13px", textAlign: "center" }}>
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
              padding: "14px",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Loading..."
              : locale === "en"
              ? "Create account"
              : locale === "zh-TW"
              ? "建立帳號"
              : "创建账号"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center" }}>
          <Link href={`/${locale}/login`} style={{ color: "#007bff" }}>
            {locale === "en"
              ? "Back to login"
              : locale === "zh-TW"
              ? "返回登入"
              : "返回登录"}
          </Link>
        </p>
      </div>
    </div>
  );
}
