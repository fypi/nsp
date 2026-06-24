"use client";

import { FormEvent, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Locale = "zh" | "zh-TW" | "en";
type Mode = "login" | "register" | "reset";

const copy = {
  zh: {
    title: "登录",
    desc: "登录 NINESPRO 账号，使用 AI 工具、保存历史记录和管理额度。",
    login: "登录",
    register: "注册",
    reset: "重置密码",
    email: "邮箱",
    password: "密码",
    confirmPassword: "确认密码",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "至少 6 位密码",
    loginButton: "登录账号",
    registerButton: "创建账号",
    resetButton: "发送重置邮件",
    magicButton: "发送邮箱登录链接",
    googleButton: "使用 Google 登录",
    forgot: "忘记密码？",
    hasAccount: "已有账号？去登录",
    noAccount: "没有账号？去注册",
    backHome: "返回首页",
    account: "进入账号中心",
    successLogin: "登录成功，正在跳转。",
    successRegister: "注册成功。如果 Supabase 开启邮箱确认，请先检查邮箱。",
    successReset: "重置邮件已发送，请检查邮箱。",
    successMagic: "登录链接已发送，请检查邮箱。",
    passwordMismatch: "两次密码不一致。",
    missingPassword: "请输入密码。",
    loading: "处理中...",
    oauthNote: "如果 Google 登录未启用，请在 Supabase Authentication Providers 中开启。",
  },
  "zh-TW": {
    title: "登入",
    desc: "登入 NINESPRO 帳號，使用 AI 工具、保存歷史記錄和管理額度。",
    login: "登入",
    register: "註冊",
    reset: "重置密碼",
    email: "信箱",
    password: "密碼",
    confirmPassword: "確認密碼",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "至少 6 位密碼",
    loginButton: "登入帳號",
    registerButton: "建立帳號",
    resetButton: "發送重置郵件",
    magicButton: "發送信箱登入連結",
    googleButton: "使用 Google 登入",
    forgot: "忘記密碼？",
    hasAccount: "已有帳號？去登入",
    noAccount: "沒有帳號？去註冊",
    backHome: "返回首頁",
    account: "進入帳號中心",
    successLogin: "登入成功，正在跳轉。",
    successRegister: "註冊成功。如果 Supabase 開啟信箱確認，請先檢查信箱。",
    successReset: "重置郵件已發送，請檢查信箱。",
    successMagic: "登入連結已發送，請檢查信箱。",
    passwordMismatch: "兩次密碼不一致。",
    missingPassword: "請輸入密碼。",
    loading: "處理中...",
    oauthNote: "如果 Google 登入未啟用，請在 Supabase Authentication Providers 中開啟。",
  },
  en: {
    title: "Login",
    desc: "Login to your NINESPRO account to use AI tools, save history, and manage credits.",
    login: "Login",
    register: "Register",
    reset: "Reset Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "At least 6 characters",
    loginButton: "Login",
    registerButton: "Create account",
    resetButton: "Send reset email",
    magicButton: "Send email login link",
    googleButton: "Continue with Google",
    forgot: "Forgot password?",
    hasAccount: "Already have an account? Login",
    noAccount: "No account? Register",
    backHome: "Back Home",
    account: "Open Account Center",
    successLogin: "Logged in. Redirecting.",
    successRegister: "Account created. If email confirmation is enabled, check your inbox.",
    successReset: "Reset email sent. Check your inbox.",
    successMagic: "Login link sent. Check your inbox.",
    passwordMismatch: "Passwords do not match.",
    missingPassword: "Enter a password.",
    loading: "Processing...",
    oauthNote: "If Google login is not enabled, enable it in Supabase Authentication Providers.",
  },
} satisfies Record<Locale, Record<string, string>>;

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export default function LoginClient({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const accountHref = localePath(locale, "/account");
  const homeHref = localePath(locale, "/");
  const resetRedirectTo = typeof window === "undefined" ? undefined : `${window.location.origin}${localePath(locale, "/login")}`;
  const authCallback = typeof window === "undefined" ? undefined : `${window.location.origin}/auth/callback?next=${encodeURIComponent(accountHref)}`;

  function resetState(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
    setError("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: resetRedirectTo,
        });
        if (error) throw error;
        setMessage(t.successReset);
        setLoading(false);
        return;
      }

      if (!password) {
        setError(t.missingPassword);
        setLoading(false);
        return;
      }

      if (mode === "register") {
        if (password !== confirmPassword) {
          setError(t.passwordMismatch);
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authCallback,
          },
        });
        if (error) throw error;
        setMessage(t.successRegister);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setMessage(t.successLogin);
      window.location.href = accountHref;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auth error");
    }

    setLoading(false);
  }

  async function sendMagicLink() {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: authCallback,
        },
      });
      if (error) throw error;
      setMessage(t.successMagic);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Auth error");
    }
    setLoading(false);
  }

  async function signInWithGoogle() {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: authCallback,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth error");
      setLoading(false);
    }
  }

  return (
    <main className="loginRoot">
      <style>{`
        .loginRoot {
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 104px 24px 96px;
        }
        .loginShell {
          width: min(980px, calc(100vw - 48px));
          margin: 0 auto;
        }
        .loginHero {
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .loginHero h1 {
          margin: 0;
          font-size: clamp(32px, 4vw, 40px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 950;
        }
        .loginHero p {
          margin: 14px 0 0;
          max-width: 820px;
          font-size: clamp(17px, 1.8vw, 24px);
          line-height: 1.42;
          color: #5b6678;
          font-weight: 760;
          letter-spacing: -0.03em;
        }
        .loginDivider {
          width: 100vw;
          height: 24px;
          margin-left: calc(50% - 50vw);
          background: #fff;
        }
        .loginCard {
          margin-top: 46px;
          border-radius: 34px;
          padding: 30px;
          background: #d8dee8;
        }
        .loginTabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .loginTabs button,
        .loginButton,
        .loginLinkButton {
          min-height: 44px;
          border: 0;
          border-radius: 999px;
          padding: 0 20px;
          cursor: pointer;
          background: rgba(255,255,255,.58);
          color: #111827;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .loginTabs button[aria-current="true"],
        .loginButtonPrimary {
          background: #05070a;
          color: #fff;
        }
        .loginForm {
          display: grid;
          gap: 16px;
        }
        .loginField label {
          display: block;
          margin: 0 0 10px;
          color: #5b6678;
          font-size: 13px;
          letter-spacing: .12em;
          text-transform: uppercase;
          font-weight: 950;
        }
        .loginInput {
          width: 100%;
          min-height: 52px;
          border: 0;
          outline: none;
          border-radius: 22px;
          padding: 0 18px;
          background: rgba(255,255,255,.68);
          color: #111827;
          font-size: 15px;
          font-weight: 700;
        }
        .loginActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .loginMessage {
          margin: 10px 0 0;
          color: #067647;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 800;
        }
        .loginError {
          margin: 10px 0 0;
          color: #b42318;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 800;
        }
        .loginNote {
          margin: 20px 0 0;
          color: #5b6678;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 650;
        }
        @media (max-width: 760px) {
          .loginRoot { padding: 92px 18px 80px; }
          .loginShell { width: calc(100vw - 36px); }
          .loginCard { border-radius: 28px; padding: 22px; }
        }
      `}</style>

      <div className="loginShell">
        <section className="loginHero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </section>
        <div className="loginDivider" aria-hidden="true" />

        <section className="loginCard">
          <div className="loginTabs">
            <button type="button" aria-current={mode === "login" ? "true" : undefined} onClick={() => resetState("login")}>{t.login}</button>
            <button type="button" aria-current={mode === "register" ? "true" : undefined} onClick={() => resetState("register")}>{t.register}</button>
            <button type="button" aria-current={mode === "reset" ? "true" : undefined} onClick={() => resetState("reset")}>{t.reset}</button>
          </div>

          <form className="loginForm" onSubmit={submit}>
            <div className="loginField">
              <label>{t.email}</label>
              <input className="loginInput" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.emailPlaceholder} required />
            </div>

            {mode !== "reset" && (
              <div className="loginField">
                <label>{t.password}</label>
                <input className="loginInput" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.passwordPlaceholder} required minLength={6} />
              </div>
            )}

            {mode === "register" && (
              <div className="loginField">
                <label>{t.confirmPassword}</label>
                <input className="loginInput" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder={t.passwordPlaceholder} required minLength={6} />
              </div>
            )}

            <div className="loginActions">
              <button className="loginButton loginButtonPrimary" type="submit" disabled={loading}>
                {loading ? t.loading : mode === "login" ? t.loginButton : mode === "register" ? t.registerButton : t.resetButton}
              </button>

              {mode === "login" && (
                <button className="loginButton" type="button" disabled={loading || !email} onClick={sendMagicLink}>{t.magicButton}</button>
              )}

              {mode === "login" && (
                <button className="loginButton" type="button" disabled={loading} onClick={signInWithGoogle}>{t.googleButton}</button>
              )}

              <a className="loginLinkButton" href={homeHref}>{t.backHome}</a>
              <a className="loginLinkButton" href={accountHref}>{t.account}</a>
            </div>
          </form>

          {message && <p className="loginMessage">{message}</p>}
          {error && <p className="loginError">{error}</p>}
          <p className="loginNote">{t.oauthNote}</p>
        </section>
      </div>
    </main>
  );
}
