"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

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
        setErrorMsg(
          locale === "en"
            ? "Reset link is invalid or expired. Please request a new one."
            : locale === "zh-TW"
            ? "重設連結無效或已過期，請重新申請。"
            : "重置链接无效或已过期，请重新申请。"
        );
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
  }, [locale]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canReset) return;

    setErrorMsg(null);
    setInfoMsg(null);

    if (!password || !confirmPassword) {
      setErrorMsg(
        locale === "en"
          ? "Please fill in both password fields."
          : locale === "zh-TW"
          ? "請填寫兩個密碼欄位。"
          : "请填写两个密码字段。"
      );
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        locale === "en"
          ? "Password must be at least 6 characters."
          : locale === "zh-TW"
          ? "密碼至少需要 6 位。"
          : "密码至少需要 6 位。"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(
        locale === "en"
          ? "Passwords do not match."
          : locale === "zh-TW"
          ? "兩次輸入的密碼不一致。"
          : "两次输入的密码不一致。"
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setInfoMsg(
      locale === "en"
        ? "Password reset successful. Redirecting to login..."
        : locale === "zh-TW"
        ? "密碼重設成功，正在跳轉登入..."
        : "密码重置成功，正在跳转登录..."
    );

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
          {locale === "en"
            ? "Set New Password"
            : locale === "zh-TW"
            ? "設定新密碼"
            : "设置新密码"}
        </h1>

        {checkingSession ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
            }}
          >
            {locale === "en"
              ? "Checking reset link..."
              : locale === "zh-TW"
              ? "正在驗證重設連結..."
              : "正在验证重置链接..."}
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
                  {locale === "en"
                    ? "New Password"
                    : locale === "zh-TW"
                    ? "新密碼"
                    : "新密码"}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!canReset || loading}
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
                  {locale === "en"
                    ? "Confirm Password"
                    : locale === "zh-TW"
                    ? "確認密碼"
                    : "确认密码"}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!canReset || loading}
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
                {loading
                  ? "Loading..."
                  : locale === "en"
                  ? "Update password"
                  : locale === "zh-TW"
                  ? "更新密碼"
                  : "更新密码"}
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
          </>
        )}
      </div>
    </div>
  );
}
