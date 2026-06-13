"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Locale = "en" | "zh" | "zh-TW";

type LoginRequiredText = {
  title: string;
  desc: string;
  goHome: string;
  goLogin: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const loginRequiredText: Record<Locale, LoginRequiredText> = {
  zh: {
    title: "需要登录",
    desc: "你需要先登录，才能访问这个页面。",
    goHome: "返回首页",
    goLogin: "前往登录",
  },

  "zh-TW": {
    title: "需要登入",
    desc: "你需要先登入，才能訪問這個頁面。",
    goHome: "返回首頁",
    goLogin: "前往登入",
  },

  en: {
    title: "Login Required",
    desc: "You must sign in to access this page.",
    goHome: "Go Home",
    goLogin: "Sign In",
  },
};

export default function LoginRequired() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = loginRequiredText[locale];

  return (
    <main className="subpage-main">
      <div
        className="subpage-container"
        style={{
          maxWidth: 480,
          textAlign: "center",
        }}
      >
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href={`/${locale}`}
            style={{
              display: "inline-block",
              padding: "12px 22px",
              background: "#111",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t.goHome}
          </Link>

          <Link
            href={`/${locale}/login`}
            style={{
              display: "inline-block",
              padding: "12px 22px",
              background: "#f4f4f4",
              color: "#111",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t.goLogin}
          </Link>
        </div>
      </div>
    </main>
  );
}