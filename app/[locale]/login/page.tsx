"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
    title: "登录",
    email: "邮箱",
    password: "密码",
    login: "登录",
    loggingIn: "登录中...",
    register: "注册账号",
    forgot: "忘记密码",
    required: "请输入邮箱和密码。",
    failed: "登录失败，请检查邮箱和密码。",
    network: "登录失败，请检查网络或稍后重试。",
    emailPlaceholder: "请输入邮箱",
    passwordPlaceholder: "请输入密码",
  },
  en: {
    title: "Login",
    email: "Email",
    password: "Password",
    login: "Login",
    loggingIn: "Logging in...",
    register: "Create account",
    forgot: "Forgot password",
    required: "Please enter your email and password.",
    failed: "Login failed. Please check your email and password.",
    network: "Login failed. Please check the network or try again later.",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
  },
  "zh-TW": {
    title: "登入",
    email: "信箱",
    password: "密碼",
    login: "登入",
    loggingIn: "登入中...",
    register: "註冊帳號",
    forgot: "忘記密碼",
    required: "請輸入信箱和密碼。",
    failed: "登入失敗，請檢查信箱和密碼。",
    network: "登入失敗，請檢查網路或稍後重試。",
    emailPlaceholder: "請輸入信箱",
    passwordPlaceholder: "請輸入密碼",
  },
};

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = normalizeLocale(params?.locale);
  const c = copy[locale];
  const nextPath = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const registerHref = useMemo(() => `/${locale}/register`, [locale]);
  const forgotHref = useMemo(() => `/${locale}/forgot-password`, [locale]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage(c.required);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(c.failed);
        setLoading(false);
        return;
      }

      router.push(nextPath || `/${locale}`);
    } catch {
      setMessage(c.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <h1>{c.title}</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">{c.email}</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={c.emailPlaceholder} />

          <label htmlFor="password">{c.password}</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={c.passwordPlaceholder} />

          {message && <p style={{ color: "#b42318", fontSize: 13, lineHeight: 1.55, margin: 0 }}>{message}</p>}

          <button type="submit" disabled={loading}>{loading ? c.loggingIn : c.login}</button>
        </form>

        <div className="auth-links" style={{ display: "grid", justifyContent: "center", justifyItems: "start", gap: 10, marginTop: 24, fontSize: 15, lineHeight: 1.35 }}>
          <Link href={registerHref}>{c.register}</Link>
          <Link href={forgotHref}>{c.forgot}</Link>
        </div>
      </div>
    </main>
  );
}
