"use client";

import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

const languageNames: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  "zh-TW": "繁體中文",
};

const brandNames: Record<Locale, string> = {
  en: "NinesPro",
  zh: "九域",
  "zh-TW": "九域",
};

function stripLocaleFromPath(path: string): string {
  const parts = path.split("/");
  const maybeLocale = parts[1];

  if (locales.includes(maybeLocale as Locale)) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/+$/, "");
  }

  return path;
}

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) return raw as Locale;
    return "zh";
  }, [params]);

  const brand = brandNames[locale];

  useEffect(() => {
    setMounted(true);

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;

    const basePath = stripLocaleFromPath(pathname);
    const nextPath = basePath === "/" ? `/${l}` : `/${l}${basePath}`;

    router.push(nextPath);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ===== Navbar 主体 ===== */}
      <nav
        className={`fixed top-0 w-full h-16 px-10 flex items-center justify-between z-50 transition-all duration-500
        ${scrolled ? "bg-white/70 backdrop-blur-xl border-b border-gray-200" : "bg-transparent"}`}
      >
        {/* ===== LOGO（这里就是你问的地方） ===== */}
        <Link
          href={`/${locale}`}
          className="text-sm md:text-base tracking-[0.3em] font-medium text-black hover:opacity-70"
        >
          {brand}
        </Link>

        {/* ===== 中间导航 ===== */}
        <div className="hidden md:flex gap-10 text-sm tracking-wide">
          {["products", "tools", "support"].map((item) => (
            <div
              key={item}
              onMouseEnter={() => setMenu(item)}
              onMouseLeave={() => setMenu(null)}
              className="cursor-pointer hover:opacity-60"
            >
              {item.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ===== 右侧按钮 ===== */}
        <div className="flex gap-4">
          <button className="circle-btn">?</button>

          {/* 语言 */}
          <div
            onMouseEnter={() => setMenu("lang")}
            onMouseLeave={() => setMenu(null)}
            className="relative"
          >
            <button className="circle-btn">🌐</button>
            {menu === "lang" && (
              <div className="dropdown">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLanguage(l)}
                    className="dropdown-item"
                  >
                    {languageNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 用户 */}
          <div
            onMouseEnter={() => setMenu("user")}
            onMouseLeave={() => setMenu(null)}
            className="relative"
          >
            <button className="circle-btn">
              {user ? user.email?.[0].toUpperCase() : "👤"}
            </button>

            {menu === "user" && (
              <div className="dropdown">
                {!user ? (
                  <Link href={`/${locale}/login`} className="dropdown-item">
                    Sign In
                  </Link>
                ) : (
                  <>
                    <Link href={`/${locale}/account`} className="dropdown-item">
                      Account
                    </Link>
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="dropdown-item"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ===== 大下拉 ===== */}
      {menu && ["products", "tools", "support"].includes(menu) && (
        <div
          onMouseEnter={() => setMenu(menu)}
          onMouseLeave={() => setMenu(null)}
          className="fixed top-16 left-0 w-full bg-white border-t border-gray-200 z-40 animate-fade"
        >
          <div className="max-w-6xl mx-auto py-20 text-center">
            <h1 className="text-4xl font-medium mb-4">{brand}</h1>
            <p className="text-gray-500 text-lg">
              {locale === "zh"
                ? "尽知天下事，弹指皆可得"
                : "Everything you need, instantly."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}