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

  // 👇 移动端菜单状态
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
    setMobileMenuOpen(false);
  };

  const NAV_H = 52;
  const SCROLLBAR_W = 12;

  if (!mounted) return null;

  return (
    <>
      <nav
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
          backgroundColor: "#ffffff",
          borderBottom: "none",
          boxShadow: "none",
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

        {/* 👇 桌面端导航链接 - 完全保留原代码 */}
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
                  transition:
                    "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
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

        {/* 👇 移动端汉堡菜单按钮 */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
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

          {/* 👇 只修这里！登录后不跳注册，弹出菜单 */}
          <div style={{ position: "relative" }}>
            {!user ? (
              <Link href={`/${locale}/login`} style={{ textDecoration: "none" }}>
                <button style={iconBtn}>👤</button>
              </Link>
            ) : (
              <button
                style={iconBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>
            )}

            {/* 用户下拉菜单 */}
            {showUserMenu && (
              <div
                style={{
                  position: "absolute",
                  top: NAV_H + 4,
                  right: 0,
                  width: 160,
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                  padding: "6px 0",
                }}
              >
                <div
                  style={{
                    padding: "8px 14px",
                    fontSize: 12,
                    color: "#666",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {user.email}
                </div>

                <button
                  onClick={() => {
                    router.push(`/${locale}/profile`);
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  个人信息
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    fontSize: 14,
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  退出登录
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* 👇 移动端下拉菜单面板 */}
      <div className={`mobile-menu-panel ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.key}
                href={`/locale{item.path}`}
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {locale === "zh"
                  ? item.name.zh
                  : locale === "zh-TW"
                  ? item.name.tw
                  : item.name.en}
              </Link>
            );
          })}
          
          {/* 移动端语言切换 */}
          <div className="mobile-lang-section">
            <div className="mobile-lang-label">Language / 语言</div>
            <div className="mobile-lang-buttons">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  className={`mobile-lang-btn ${locale === l ? "active" : ""}`}
                >
                  {languageNames[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeMenu && (
        <div
          style={{
            position: "fixed",
            top: `${NAV_H}px`,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 4px 12px rgba(249, 250, 250, 0.05)",
            zIndex: 998,
            padding: "50px 30px",
            display: "flex",
            justifyContent: "center",
            gap: "50px",
          }}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={closeMenuWithDelay}
        >
          <div
            style={{
              maxWidth: 1220,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: 50,
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(130px, 1fr))",
                gap: "18px",
              }}
            >
              {megaData[activeMenu].cards.map((card, i) => (
                <div key={`${activeMenu}-card-${i}`} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      height: 88,
                      borderRadius: 12,
                      background: "linear-gradient(180deg,#f6f7f8 0%,#eceff2 100%)",
                      border: "1px solid rgba(0,0,0,0.04)",
                      marginBottom: 12,
                    }}
                  />
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#000" }}>
                    {pickLocaleText(card.title, locale)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {megaData[activeMenu].links.map((link, i) => (
                <a
                  key={`${activeMenu}-link-${i}`}
                  href="#"
                  style={{
                    fontSize: 14,
                    color: "#000",
                    textDecoration: "none",
                    padding: "8px 0",
                    borderBottom:
                      i < megaData[activeMenu].links.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                  }}
                >
                  {pickLocaleText(
                    { zh: link.zh, en: link.en, tw: link.tw },
                    locale
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 👇 移动端响应式样式 - 添加在文件末尾 */}
      <style jsx>{`
        /* 汉堡菜单按钮 - 默认隐藏 */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          gap: 5px;
        }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background-color: #000;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: center;
        }

        .hamburger-line.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger-line.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* 移动端菜单面板 - 默认隐藏 */
        .mobile-menu-panel {
          display: none;
          position: fixed;
          top: ${NAV_H}px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 9998;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }

        .mobile-menu-panel.open {
          max-height: calc(100vh - ${NAV_H}px);
          overflow-y: auto;
        }

        .mobile-menu-content {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-item {
          padding: 16px 0;
          font-size: 17px;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }

        .mobile-nav-item.active {
          color: #0066cc;
        }

        .mobile-nav-item:last-of-type {
          border-bottom: none;
        }

        .mobile-lang-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .mobile-lang-label {
          font-size: 13px;
          color: #666;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mobile-lang-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .mobile-lang-btn {
          padding: 8px 16px;
          font-size: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 20px;
          background: transparent;
          color: #000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-lang-btn.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        /* 移动端响应式断点 */
        @media (max-width: 768px) {
          /* 隐藏桌面端导航 */
          .desktop-nav {
            display: none !important;
          }

          /* 显示汉堡菜单 */
          .mobile-menu-btn {
            display: flex;
          }

          /* 显示移动端菜单面板 */
          .mobile-menu-panel {
            display: block;
          }

          /* 调整导航栏内边距 */
          nav {
            padding: 0 16px !important;
            width: 100% !important;
          }

          /* 修复滚动镂空：添加毛玻璃背景 */
          nav {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
          }

          /* 隐藏桌面端mega menu */
          nav + div[style*="position: fixed"] {
            display: none !important;
          }
        }

        /* 桌面端：隐藏移动端元素 */
        @media (min-width: 769px) {
          .mobile-menu-btn,
          .mobile-menu-panel {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const iconBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.04)",
  cursor: "pointer",
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};