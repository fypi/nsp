"use client";

import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

const megaData = {
  product: {
    cards: [
      { title: { zh: "产品A", en: "Product A", tw: "產品A" } },
      { title: { zh: "产品B", en: "Product B", tw: "產品B" } },
      { title: { zh: "产品C", en: "Product C", tw: "產品C" } },
      { title: { zh: "产品D", en: "Product D", tw: "產品D" } },
    ],
    links: [
      { zh: "产品对比", en: "Compare", tw: "產品比較" },
      { zh: "使用场景", en: "Use Cases", tw: "使用場景" },
      { zh: "购买咨询", en: "Sales Contact", tw: "購買諮詢" },
      { zh: "文档中心", en: "Docs", tw: "文件中心" },
    ],
  },
  solution: {
    cards: [
      { title: { zh: "行业方案", en: "Industry", tw: "行業方案" } },
      { title: { zh: "企业方案", en: "Enterprise", tw: "企業方案" } },
      { title: { zh: "AI方案", en: "AI Solution", tw: "AI方案" } },
      { title: { zh: "部署方案", en: "Deployment", tw: "部署方案" } },
    ],
    links: [
      { zh: "架构设计", en: "Architecture", tw: "架構設計" },
      { zh: "成本评估", en: "Pricing", tw: "成本評估" },
      { zh: "客户案例", en: "Cases", tw: "客戶案例" },
      { zh: "咨询顾问", en: "Consulting", tw: "顧問服務" },
    ],
  },
  support: {
    cards: [
      { title: { zh: "帮助中心", en: "Help Center", tw: "幫助中心" } },
      { title: { zh: "工单支持", en: "Tickets", tw: "工單支援" } },
      { title: { zh: "开发者支持", en: "Developer", tw: "開發者支援" } },
      { title: { zh: "状态监控", en: "Status", tw: "狀態監控" } },
    ],
    links: [
      { zh: "常见问题", en: "FAQ", tw: "常見問題" },
      { zh: "服务条款", en: "Terms", tw: "服務條款" },
      { zh: "隐私政策", en: "Privacy", tw: "隱私政策" },
      { zh: "联系我们", en: "Contact", tw: "聯絡我們" },
    ],
  },
  tool: {
    cards: [
      { title: { zh: "效率工具", en: "Productivity", tw: "效率工具" } },
      { title: { zh: "可视化工具", en: "Visual Tools", tw: "視覺化工具" } },
      { title: { zh: "运维工具", en: "Ops Tools", tw: "維運工具" } },
      { title: { zh: "测试工具", en: "Testing", tw: "測試工具" } },
    ],
    links: [
      { zh: "工具市场", en: "Marketplace", tw: "工具市場" },
      { zh: "下载中心", en: "Downloads", tw: "下載中心" },
      { zh: "更新日志", en: "Changelog", tw: "更新日誌" },
      { zh: "API 工具", en: "API Tools", tw: "API 工具" },
    ],
  },
} as const;

function pickLocaleText(
  text: { zh: string; en: string; tw: string },
  locale: Locale
) {
  if (locale === "en") return text.en;
  if (locale === "zh-TW") return text.tw;
  return text.zh;
}

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<keyof typeof megaData | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 👇 用户菜单弹出状态
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // 👇 新增：移动端菜单状态
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) return raw;
    return "zh";
  }, [params]);

  const currentPath = useMemo(() => stripLocaleFromPath(pathname), [pathname]);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
    };
  }, []);

  // 👇 退出登录
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.push(`/${locale}`);
  };

  const handleLiquidMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--lx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--ly", `${e.clientY - rect.top}px`);
  };

  const openMenu = (key: keyof typeof megaData) => {
    if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
    setActiveMenu(key);
  };

  const closeMenuWithDelay = () => {
    if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
    menuCloseTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const clickLiquid = (key: string) => {
    setPressedKey(key);
    setTimeout(
      () => setPressedKey((prev) => (prev === key ? null : prev)),
      220
    );
  };

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    const basePath = stripLocaleFromPath(pathname);
    router.push(`/l{basePath === "/" ? "" : basePath}`);
    setShowLangMenu(false);
  };

  const NAV_H = 52;
  const SCROLLBAR_W = 12;

  if (!mounted) return null;

  return (
    <>
      {/* 全局样式 - 修复镂空与动画 */}
      <style jsx global>{`
        /* 修复滚动镂空：毛玻璃背景 */
        .navbar-glass {
          background-color: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        }
        
        /* 移动端菜单动画 */
        .mobile-menu {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }
        
        /* 汉堡按钮动画 */
        .hamburger-line {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        
        .hamburger-open .hamburger-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        
        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        
        .hamburger-open .hamburger-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        
        /* 桌面端hover菜单保持原有逻辑 */
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        
        /* 移动端适配 */
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
          .navbar-glass {
            background-color: rgba(255, 255, 255, 0.95) !important;
          }
        }
      `}</style>

      <nav
        className="navbar-glass"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `calc(100% - SCROLLBARW​px)‘,height:‘{NAV_H}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 9999,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
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

        {/* 桌面端导航 - 保持原有逻辑 */}
        <div className="desktop-nav" style={{ display: "flex", gap: "6px", fontSize: "15px", color: "#000" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const clicked = pressedKey === item.key;

            return (
              <Link
                key={item.key}
                href={`/${locale}${item.path}`}
                className={`nav-link liquid-interactive ${
                  isActive ? "liquid-glass nav-active" : ""
                } ${clicked ? "liquid-clicked" : ""}`}
                onMouseMove={isActive ? handleLiquidMove : undefined}
                onMouseEnter={() => openMenu(item.key as keyof typeof megaData)}
                onMouseLeave={closeMenuWithDelay}
                onClick={() => clickLiquid(item.key)}
                style={{
                  padding: "7px 13px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
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

        {/* 移动端汉堡菜单按钮 */}
        <button
          className={`mobile-nav hamburger-${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" style={{ width: "24px", height: "2px", backgroundColor: "#000", borderRadius: "1px" }} />
          <span className="hamburger-line" style={{ width: "24px", height: "2px", backgroundColor: "#000", borderRadius: "1px" }} />
          <span className="hamburger-line" style={{ width: "24px", height: "2px", backgroundColor: "#000", borderRadius: "1px" }} />
        </button>

        <div style={{ display: "flex", gap: "12px", position: "relative" }}>
          <Link href={`/${locale}/support`} style={{ textDecoration: "none" }}>
            <button style={iconBtn} aria-label="Help">
              ?
            </button>
          </Link>

          <button
            style={iconBtn}
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-label="Language"
          >
            🌐
          </button>

          {showLangMenu && (
            <div
              style={{
                position: "absolute",
                top: `${NAV_H - 8}px`,
                right: 0,
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              {/* 语言菜单内容 */}
            </div>
          )}
        </div>
      </nav>

      {/* 移动端下拉菜单面板 */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          position: "fixed",
          top: `${NAV_H}px`,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 9998,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ padding: "16px 24px" }}>
          {navItems.map((item, index) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.path}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  color: isActive ? "#000" : "#666",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "16px",
                  textDecoration: "none",
                  borderBottom: index < navItems.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  transition: "color 0.2s ease",
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
      </div>

      {/* Mega Menu 桌面端下拉 - 保持原有逻辑 */}
      {activeMenu && (
        <div
          onMouseEnter={() => activeMenu && openMenu(activeMenu)}
          onMouseLeave={closeMenuWithDelay}
          style={{
            position: "fixed",
            top: `${NAV_H}px`,
            left: 0,
            width: `calc(100% - ${SCROLLBAR_W}px)`,
            backgroundColor: "#fff",
            zIndex: 9998,
            padding: "24px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Mega Menu 内容 */}
        </div>
      )}
    </>
  );
}

const iconBtn: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "rgba(0,0,0,0.05)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  transition: "background-color 0.2s",
};