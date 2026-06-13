"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type RegisterText = {
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  createAccount: string;
  creating: string;
  successMessage: string;
  networkError: string;
  registerFailed: string;
  backToLogin: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const registerText: Record<Locale, RegisterText> = {
  zh: {
    title: "注册",
    emailLabel: "邮箱",
    emailPlaceholder: "请输入邮箱",
    passwordLabel: "密码",
    passwordPlaceholder: "请输入密码",
    createAccount: "创建账号",
    creating: "创建中...",
    successMessage: "账号已创建，请到邮箱完成确认。",
    networkError: "网络异常，请重试。",
    registerFailed: "注册失败，请检查信息后重试。",
    backToLogin: "返回登录",
  },

  "zh-TW": {
    title: "註冊",
    emailLabel: "郵箱",
    emailPlaceholder: "請輸入郵箱",
    passwordLabel: "密碼",
    passwordPlaceholder: "請輸入密碼",
    createAccount: "建立帳號",
    creating: "建立中...",
    successMessage: "帳號已建立，請到信箱完成確認。",
    networkError: "網路異常，請重試。",
    registerFailed: "註冊失敗，請檢查資訊後重試。",
    backToLogin: "返回登入",
  },

  en: {
    title: "Register",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    createAccount: "Create account",
    creating: "Creating...",
    successMessage: "Account created. Please check your email to confirm it.",
    networkError: "Network error. Please try again.",
    registerFailed: "Registration failed. Please check your information and try again.",
    backToLogin: "Back to login",
  },
};

export default function RegisterPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = registerText[locale];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setErrorMsg(t.registerFailed);
        return;
      }

      setInfoMsg(t.successMessage);
    } catch {
      setErrorMsg(t.networkError);
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
          {t.title}
        </h1>

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
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
              autoComplete="email"
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
              {t.passwordLabel}
            </label>

            <input
              type="password"
              required
              value={password}
              placeholder={t.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
            <p
              style={{
                color: "red",
                fontSize: "13px",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {errorMsg}
            </p>
          )}

          {infoMsg && (
            <p
              style={{
                color: "green",
                fontSize: "13px",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
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
            {loading ? t.creating : t.createAccount}
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          <Link href={`/${locale}/login`} style={{ color: "#007bff" }}>
            {t.backToLogin}
          </Link>
        </p>
      </div>
    </div>
  );
}