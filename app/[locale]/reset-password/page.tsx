"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type ResetPasswordText = {
  title: string;

  checkingLink: string;
  invalidLink: string;

  newPasswordLabel: string;
  newPasswordPlaceholder: string;

  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;

  emptyPassword: string;
  passwordTooShort: string;
  passwordMismatch: string;
  updateFailed: string;

  updatePassword: string;
  updating: string;

  successMessage: string;
  backToLogin: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const resetPasswordText: Record<Locale, ResetPasswordText> = {
  zh: {
    title: "设置新密码",

    checkingLink: "正在验证重置链接...",
    invalidLink: "重置链接无效或已过期，请重新申请。",

    newPasswordLabel: "新密码",
    newPasswordPlaceholder: "请输入新密码",

    confirmPasswordLabel: "确认密码",
    confirmPasswordPlaceholder: "请再次输入新密码",

    emptyPassword: "请填写两个密码字段。",
    passwordTooShort: "密码至少需要 6 位。",
    passwordMismatch: "两次输入的密码不一致。",
    updateFailed: "密码更新失败，请稍后再试。",

    updatePassword: "更新密码",
    updating: "更新中...",

    successMessage: "密码重置成功，正在跳转登录...",
    backToLogin: "返回登录",
  },

  "zh-TW": {
    title: "設定新密碼",

    checkingLink: "正在驗證重設連結...",
    invalidLink: "重設連結無效或已過期，請重新申請。",

    newPasswordLabel: "新密碼",
    newPasswordPlaceholder: "請輸入新密碼",

    confirmPasswordLabel: "確認密碼",
    confirmPasswordPlaceholder: "請再次輸入新密碼",

    emptyPassword: "請填寫兩個密碼欄位。",
    passwordTooShort: "密碼至少需要 6 位。",
    passwordMismatch: "兩次輸入的密碼不一致。",
    updateFailed: "密碼更新失敗，請稍後再試。",

    updatePassword: "更新密碼",
    updating: "更新中...",

    successMessage: "密碼重設成功，正在跳轉登入...",
    backToLogin: "返回登入",
  },

  en: {
    title: "Set New Password",

    checkingLink: "Checking reset link...",
    invalidLink: "Reset link is invalid or expired. Please request a new one.",

    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "Enter new password",

    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Enter new password again",

    emptyPassword: "Please fill in both password fields.",
    passwordTooShort: "Password must be at least 6 characters.",
    passwordMismatch: "Passwords do not match.",
    updateFailed: "Failed to update password. Please try again later.",

    updatePassword: "Update password",
    updating: "Updating...",

    successMessage: "Password reset successful. Redirecting to login...",
    backToLogin: "Back to login",
  },
};

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = resetPasswordText[locale];

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session) {
        setCanReset(true);
      } else {
        setCanReset(false);
        setErrorMsg(t.invalidLink);
      }

      setCheckingSession(false);
    };

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || session) {
        setCanReset(true);
        setErrorMsg(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [t.invalidLink]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canReset) return;

    setErrorMsg(null);
    setInfoMsg(null);

    if (!password || !confirmPassword) {
      setErrorMsg(t.emptyPassword);
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t.passwordMismatch);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(t.updateFailed);
      return;
    }

    setInfoMsg(t.successMessage);

    setTimeout(() => {
      router.replace(`/${locale}/login`);
    }, 1200);
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

        {checkingSession ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
            }}
          >
            {t.checkingLink}
          </p>
        ) : (
          <>
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
                  {t.newPasswordLabel}
                </label>

                <input
                  type="password"
                  required
                  value={password}
                  placeholder={t.newPasswordPlaceholder}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!canReset || loading}
                  autoComplete="new-password"
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "999px",
                    padding: "14px 18px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                    opacity: !canReset ? 0.6 : 1,
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
                  {t.confirmPasswordLabel}
                </label>

                <input
                  type="password"
                  required
                  value={confirmPassword}
                  placeholder={t.confirmPasswordPlaceholder}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!canReset || loading}
                  autoComplete="new-password"
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "999px",
                    padding: "14px 18px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                    opacity: !canReset ? 0.6 : 1,
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
                disabled={!canReset || loading}
                style={{
                  width: "100%",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px",
                  fontSize: "15px",
                  cursor: !canReset || loading ? "not-allowed" : "pointer",
                  opacity: !canReset || loading ? 0.7 : 1,
                }}
              >
                {loading ? t.updating : t.updatePassword}
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
          </>
        )}
      </div>
    </div>
  );
}