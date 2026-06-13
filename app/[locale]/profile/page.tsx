"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type Locale = "en" | "zh" | "zh-TW";

type ProfileText = {
  loading: string;
  title: string;
  email: string;
  userId: string;
  createdAt: string;
  noEmail: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const profileText: Record<Locale, ProfileText> = {
  zh: {
    loading: "加载中...",
    title: "个人信息",
    email: "邮箱：",
    userId: "用户 ID：",
    createdAt: "注册时间：",
    noEmail: "未提供邮箱",
  },

  "zh-TW": {
    loading: "載入中...",
    title: "個人資訊",
    email: "郵箱：",
    userId: "用戶 ID：",
    createdAt: "註冊時間：",
    noEmail: "未提供郵箱",
  },

  en: {
    loading: "Loading...",
    title: "Profile",
    email: "Email:",
    userId: "User ID:",
    createdAt: "Created at:",
    noEmail: "No email provided",
  },
};

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const dateLocale =
    locale === "en" ? "en-US" : locale === "zh-TW" ? "zh-TW" : "zh-CN";

  return date.toLocaleString(dateLocale);
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();

  const locale = useMemo(() => normalizeLocale(params?.locale), [params]);
  const t = profileText[locale];

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!data.user) {
        router.push(`/${locale}/login`);
        return;
      }

      setUser(data.user);
      setChecking(false);
    };

    getUser();

    return () => {
      mounted = false;
    };
  }, [router, locale]);

  if (checking) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <p>{t.loading}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="subpage-main">
      <div
        className="subpage-container"
        style={{
          maxWidth: 560,
        }}
      >
        <div className="subpage-hero">
          <h1>{t.title}</h1>
        </div>

        <section className="subpage-section">
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <strong>{t.email}</strong> {user.email || t.noEmail}
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong>{t.userId}</strong> {user.id}
            </div>

            <div style={{ marginBottom: 0 }}>
              <strong>{t.createdAt}</strong>{" "}
              {formatDate(user.created_at, locale)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}