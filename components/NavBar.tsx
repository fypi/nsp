"use client";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = typeof locales[number];

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

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  const locale = (params.locale as Locale) || "en";
  const brand = brandNames[locale];

  useEffect(() => {
    setMounted(true);

    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    router.push(`/${l}`);
  };

  if (!mounted) return null;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full h-16 px-8 flex items-center justify-between z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        {/* LOGO */}
        <Link
          href={`/${locale}`}
          className="text-lg tracking-widest font-medium text-black hover:opacity-70"
        >
          {brand}
        </Link>

        {/* 中间导航 */}
        <div className="hidden md:flex gap-10 text-sm">
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

        {/* 右侧按钮 */}
        <div className="flex gap-4">
          {/* 帮助 */}
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

      {/* 大下拉面板 */}
      {menu && ["products", "tools", "support"].includes(menu) && (
        <div
          onMouseEnter={() => setMenu(menu)}
          onMouseLeave={() => setMenu(null)}
          className="fixed top-16 left-0 w-full bg-white border-t border-gray-200 z-40 animate-fade"
        >
          <div className="max-w-6xl mx-auto py-20 text-center">
            <h1 className="text-4xl font-medium mb-4">
              {locale === "zh" ? "九域" : "NinesPro"}
            </h1>
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