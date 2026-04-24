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

const navItems = [
  {
    key: "product",
    name: { zh: "产品中心", en: "Products", tw: "產品中心" },
    path: "/product",
  },
  {
    key: "solution",
    name: { zh: "解决方案", en: "Solutions", tw: "解決方案" },
    path: "/solution",
  },
  {
    key: "support",
    name: { zh: "支持中心", en: "Support", tw: "支援中心" },
    path: "/support",
  },
  {
    key: "tool",
    name: { zh: "工具中心", en: "Tools", tw: "工具中心" },
    path: "/tool",
  },
];

function stripLocaleFromPath(path: string): string {
  const parts = path.split("/");
  const maybeLocale = parts[1];
  if (locales.includes(maybeLocale as Locale)) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest;
  }
  return path;
}

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) return raw;
    return "zh";
  }, [params]);

  const currentPath = useMemo(() => {
    return stripLocaleFromPath(pathname);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    const basePath = stripLocaleFromPath(pathname);
    router.push(`/${l}${basePath === "/" ? "" : basePath}`);
    setShowLangMenu(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 导航栏保持纯白色，不影响玻璃效果 */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "calc(100% - 12px)",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 9999,
          backgroundColor: "#ffffff",
          borderBottom: "none",
        }}
      >
        <Link
          href={`/${locale}`}
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#000",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {locale === "en" ? "NINESPRO" : "九域"}
        </Link>

        <div
          style={{
            display: "flex",
            gap: "6px",
            fontSize: "15px",
            color: "#000",
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.path}`}
                style={{
                  padding: "7px 13px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",

                  // ✅ 核心：纯背景下的液态玻璃效果
                  background: isActive
                    ? "rgba(240, 240, 240, 0.6)"
                    : "transparent",
                  backdropFilter: isActive ? "blur(15px) saturate(120%)" : "none",
                  WebkitBackdropFilter: isActive ? "blur(15px) saturate(120%)" : "none",
                  border: isActive
                    ? "1px solid rgba(255, 255, 255, 0.7)"
                    : "none",
                  boxShadow: isActive
                    ? `
                      0 3px 10px rgba(0, 0, 0, 0.05),
                      inset 0 1px 2px rgba(255, 255, 255, 0.9),
                      inset 0 -1px 2px rgba(0, 0, 0, 0.03)
                    `
                    : "none",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  // 鼠标 hover 时的玻璃效果
                  Object.assign(e.target.style, {
                    background: "rgba(240, 240, 240, 0.6)",
                    backdropFilter: "blur(15px) saturate(120%)",
                    WebkitBackdropFilter: "blur(15px) saturate(120%)",
                    border: "1px solid rgba(255, 255, 255, 0.7)",
                    boxShadow: `
                      0 3px 10px rgba(0, 0, 0, 0.05),
                      inset 0 1px 2px rgba(255, 255, 255, 0.9),
                      inset 0 -1px 2px rgba(0, 0, 0, 0.03)
                    `,
                    transform: "scale(1.02)",
                  });
                  setActiveMenu(item.key);
                }}
                onMouseLeave={(e) => {
                  // 鼠标离开时恢复
                  Object.assign(e.target.style, {
                    background: isActive ? "rgba(240, 240, 240, 0.6)" : "transparent",
                    backdropFilter: isActive ? "blur(15px) saturate(120%)" : "none",
                    WebkitBackdropFilter: isActive ? "blur(15px) saturate(120%)" : "none",
                    border: isActive ? "1px solid rgba(255, 255, 255, 0.7)" : "none",
                    boxShadow: isActive
                      ? `
                        0 3px 10px rgba(0, 0, 0, 0.05),
                        inset 0 1px 2px rgba(255, 255, 255, 0.9),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.03)
                      `
                      : "none",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  });
                  setActiveMenu(null);
                }}
              >
                {locale === "zh"
                  ? item.name.zh
                  : locale === "zh-TW"
                  ? item.name.tw
                  : item.name.en}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "12px", position: "relative" }}>
          <button style={iconBtn}>?</button>

          <button
            style={iconBtn}
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            🌐
          </button>
          {showLangMenu && (
            <div
              style={{
                position: "absolute",
                top: "44px",
                right: "0",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 1000,
                padding: "6px",
                border: "none",
              }}
            >
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    borderRadius: "8px",
                    color: "#000",
                    opacity: 1,
                    fontWeight: 500,
                  }}
                >
                  {languageNames[l]}
                </button>
              ))}
            </div>
          )}

          <Link href={`/${locale}/login`} style={{ textDecoration: "none" }}>
            <button style={iconBtn}>
              {user ? user.email?.charAt(0).toUpperCase() : "👤"}
            </button>
          </Link>
        </div>
      </nav>

      {activeMenu && (
        <div
          style={{
            position: "fixed",
            top: "52px",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            zIndex: 998,
            padding: "50px 30px",
            display: "flex",
            justifyContent: "center",
            gap: "50px",
          }}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {activeMenu === "product" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 120, height: 120, background: "#f5f5f5", borderRadius: 12, margin: "0 auto 12px" }}></div>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
                {locale === "zh" ? "产品A" : locale === "zh-TW" ? "產品A" : "Product A"}
              </h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const iconBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "17px",
  border: "none",
  background: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  cursor: "pointer",
  color: "#000",
  opacity: 1,
};