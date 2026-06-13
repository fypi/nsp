"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type LoginText = {
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  signIn: string;
  signingIn: string;
  createAccount: string;
  forgotPassword: string;
  loginFailed: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const loginText: Record<Locale, LoginText> = {
  zh: {
    title: "登录",
    emailLabel: "邮箱",
    emailPlaceholder: "请输入邮箱",
    passwordLabel: "密码",
    passwordPlaceholder: "请输入密码",
    signIn: "登录",
    signingIn: "登录中...",
    createAccount: "注册账号",
    forgotPassword: "忘记密码？",
    loginFailed: "登录失败，请检查邮箱和密码后重试。",
  },

  "zh-TW": {
    title: "登入",
    emailLabel: "郵箱",
    emailPlaceholder: "請輸入郵箱",
    passwordLabel: "密碼",
    passwordPlaceholder: "請輸入密碼",
    signIn: "登入",
    signingIn: "登入中...",
    createAccount: "註冊帳號",
    forgotPassword: "忘記密碼？",
    loginFailed: "登入失敗，請檢查郵箱和密碼後重試。",
  },

  en: {
    title: "Login",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign in",
    signingIn: "Signing in...",
    createAccount: "Create an account",
    forgotPassword: "Forgot password?",
    loginFailed: "Login failed. Please check your email and password and try again.",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = loginText[locale];

  const nextPath = search.get("next") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(t.loginFailed);
      return;
    }

    const target =
      nextPath && nextPath.startsWith("/") ? nextPath : `/${locale}`;

    router.replace(target);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            textAlign: "center",
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
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "9999px",
                padding: "14px 18px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder={t.emailPlaceholder}
              autoComplete="email"
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
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "9999px",
                padding: "14px 18px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder={t.passwordPlaceholder}
              autoComplete="current-password"
            />
          </div>

          {errorMsg && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "13px",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {errorMsg}
            </div>
          )}

          <button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "9999px",
              border: "none",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
            type="submit"
          >
            {loading ? t.signingIn : t.signIn}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center",
            gap: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link href={`/${locale}/register`} style={{ color: "#007bff" }}>
            {t.createAccount}
          </Link>

          <Link
            href={`/${locale}/forgot-password`}
            style={{ color: "#007bff" }}
          >
            {t.forgotPassword}
          </Link>
        </div>
      </div>
    </div>
  );
}