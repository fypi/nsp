"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type Locale = "en" | "zh" | "zh-TW";

function normalizeLocale(value: unknown): Locale {
  if (value === "en" || value === "zh" || value === "zh-TW") {
    return value;
  }

  return "zh";
}

function getAccountLabels(locale: Locale) {
  if (locale === "en") {
    return {
      account: "Account Center",
      profile: "Profile",
      security: "Security",
      dashboard: "Dashboard",
      logout: "Logout",
      login: "Sign in",
      noEmail: "No email",
    };
  }

  if (locale === "zh-TW") {
    return {
      account: "個人中心",
      profile: "個人資訊",
      security: "安全設定",
      dashboard: "控制台",
      logout: "登出",
      login: "登入",
      noEmail: "無郵箱",
    };
  }

  return {
    account: "个人中心",
    profile: "个人信息",
    security: "安全设置",
    dashboard: "控制台",
    logout: "退出登录",
    login: "登录",
    noEmail: "无邮箱",
  };
}

function getUserDisplayName(user: User | null, fallback = "用户") {
  if (!user) return fallback;

  const meta = user.user_metadata || {};

  const name =
    meta.display_name ||
    meta.full_name ||
    meta.name ||
    meta.user_name ||
    meta.username ||
    meta.nickname;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return fallback;
}

function getAvatarUrl(user: User | null) {
  const meta = user?.user_metadata || {};

  const avatarUrl = meta.avatar_url || meta.picture || meta.image;

  if (typeof avatarUrl === "string" && avatarUrl.trim()) {
    return avatarUrl.trim();
  }

  return "";
}

const menuLinkStyle: CSSProperties = {
  display: "block",
  width: "100%",
  padding: "11px 18px",
  textAlign: "left",
  border: "none",
  background: "transparent",
  fontSize: 14,
  color: "#111827",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: 650,
};

export default function AuthButton() {
  const router = useRouter();
  const params = useParams();

  const locale = normalizeLocale(params?.locale);

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const labels = useMemo(() => getAccountLabels(locale), [locale]);

  const userDisplayName = useMemo(() => {
    return getUserDisplayName(user, labels.account);
  }, [user, labels.account]);

  const avatarUrl = getAvatarUrl(user);
  const avatarLetter = userDisplayName.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    router.push(`/${locale}`);
  };

  if (!user) {
    return (
      <button
        type="button"
        onClick={login}
        className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
      >
        {labels.login}
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label="User menu"
        title={user.email || userDisplayName}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: menuOpen
            ? "1px solid rgba(59,130,246,0.5)"
            : "1px solid rgba(0,0,0,0.08)",
          background: "#fff",
          boxShadow: menuOpen
            ? "0 10px 28px rgba(59,130,246,0.18)"
            : "0 6px 18px rgba(15,23,42,0.08)",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            width={40}
            height={40}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#111827",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            {avatarLetter}
          </span>
        )}
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-3 bg-white text-sm z-50"
          style={{
            width: 292,
            borderRadius: 22,
            padding: "8px 0",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 24px 60px rgba(15,23,42,0.16)",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#111827",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 17,
                  flex: "0 0 44px",
                }}
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="avatar"
                    width={44}
                    height={44}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 4,
                    maxWidth: 200,
                  }}
                  title={userDisplayName}
                >
                  {userDisplayName}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 200,
                  }}
                  title={user.email ?? ""}
                >
                  {user.email || labels.noEmail}
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/${locale}/account`}
            onClick={() => setMenuOpen(false)}
            style={menuLinkStyle}
          >
            {labels.account}
          </Link>

          <Link
            href={`/${locale}/account/profile`}
            onClick={() => setMenuOpen(false)}
            style={menuLinkStyle}
          >
            {labels.profile}
          </Link>

          <Link
            href={`/${locale}/account/security`}
            onClick={() => setMenuOpen(false)}
            style={menuLinkStyle}
          >
            {labels.security}
          </Link>

          <Link
            href={`/${locale}/dashboard`}
            onClick={() => setMenuOpen(false)}
            style={menuLinkStyle}
          >
            {labels.dashboard}
          </Link>

          <button
            type="button"
            onClick={logout}
            style={{
              ...menuLinkStyle,
              borderTop: "1px solid rgba(0,0,0,0.06)",
              marginTop: 4,
              paddingTop: 12,
              color: "#d11a2a",
              fontWeight: 800,
            }}
          >
            {labels.logout}
          </button>
        </div>
      )}
    </div>
  );
}