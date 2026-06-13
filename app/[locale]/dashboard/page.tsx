"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type Locale = "zh" | "zh-TW" | "en";

type DashboardText = {
  title: string;
  welcome: string;
  loading: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const dashboardText: Record<Locale, DashboardText> = {
  zh: {
    title: "控制台",
    welcome: "欢迎，",
    loading: "正在加载...",
  },

  "zh-TW": {
    title: "控制台",
    welcome: "歡迎，",
    loading: "正在載入...",
  },

  en: {
    title: "Dashboard",
    welcome: "Welcome, ",
    loading: "Loading...",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();

  const locale = normalizeLocale(params?.locale);
  const t = dashboardText[locale];

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;

      if (!data.user) {
        router.push(`/${locale}/login-required`);
        return;
      }

      setUser(data.user);
      setChecking(false);
    });

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
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>
            {t.welcome}
            {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
``