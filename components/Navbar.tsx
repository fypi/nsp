"use client";

import Link from "next/link";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import BrandLogo from "@/components/BrandLogo";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];
type MegaKey = "product" | "solution" | "support" | "tool";

type LocaleText = { zh: string; en: string; tw: string };

type MegaCard = {
  title: LocaleText;
  desc: LocaleText;
  badge: string;
  route: string;
};

type MegaLink = {
  zh: string;
  en: string;
  tw: string;
  route: string;
};

const languageNames: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  "zh-TW": "繁體中文",
};

const navItems: Array<{
  key: MegaKey;
  name: LocaleText;
  path: string;
}> = [
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

function isPublicTool(route: string) {
  return [
    "/tool/json-formatter",
    "/tool/text-diff",
    "/tool/compound-interest",
    "/tool/base64",
    "/tool/url-codec",
    "/tool/document-template",
  ].includes(route);
}

function accountText(locale: Locale) {
  if (locale === "en") {
    return {
      account: "Account Center",
      profile: "Profile",
      security: "Security",
      logout: "Logout",
      login: "Login",
    };
  }

  if (locale === "zh-TW") {
    return {
      account: "個人中心",
      profile: "個人資訊",
      security: "安全設定",
      logout: "登出",
      login: "登入",
    };
  }

  return {
    account: "个人中心",
    profile: "个人信息",
    security: "安全设置",
    logout: "退出登录",
    login: "登录",
  };
}

const megaData: Record<MegaKey, { cards: MegaCard[]; links: MegaLink[] }> = {
  product: {
    cards: [
      {
        title: { zh: "智能投研", en: "Research Intelligence", tw: "智能投研" },
        desc: {
          zh: "研究、筛选、追踪，一套更轻的投研入口。",
          en: "A lighter entry for research, screening, and tracking.",
          tw: "研究、篩選、追蹤，一套更輕的投研入口。",
        },
        badge: "🔐",
        route: "/product",
      },
      {
        title: { zh: "技术服务", en: "Tech Services", tw: "技術服務" },
        desc: {
          zh: "网站、网络、系统与自动化的工程落地。",
          en: "Execution across web, network, systems, and automation.",
          tw: "網站、網路、系統與自動化的工程落地。",
        },
        badge: "💼",
        route: "/solution",
      },
      {
        title: { zh: "AI 工具", en: "AI Tools", tw: "AI 工具" },
        desc: {
          zh: "从内容到效率，逐步接入可直接使用的工具。",
          en: "Usable tools across content and productivity workflows.",
          tw: "從內容到效率，逐步接入可直接使用的工具。",
        },
        badge: "🔓",
        route: "/tool",
      },
      {
        title: { zh: "定制服务", en: "Custom Build", tw: "定制服務" },
        desc: {
          zh: "有明确需求，直接做成能跑的系统。",
          en: "When the need is clear, we build systems that run.",
          tw: "有明確需求，就直接做成能跑的系統。",
        },
        badge: "💼",
        route: "/contact",
      },
    ],
    links: [
      { zh: "产品总览", en: "Overview", tw: "產品總覽", route: "/product" },
      { zh: "工具中心", en: "Tool Center", tw: "工具中心", route: "/tool" },
      { zh: "解决方案", en: "Solutions", tw: "解決方案", route: "/solution" },
      { zh: "联系咨询", en: "Contact", tw: "聯絡諮詢", route: "/contact" },
    ],
  },

  solution: {
    cards: [
      {
        title: { zh: "投研方案", en: "Research Solutions", tw: "投研方案" },
        desc: {
          zh: "把信息流变成可持续跟踪的研究框架。",
          en: "Turn information flow into a sustainable research framework.",
          tw: "把資訊流變成可持續追蹤的研究框架。",
        },
        badge: "💼",
        route: "/solution",
      },
      {
        title: { zh: "技术服务", en: "Engineering", tw: "技術服務" },
        desc: {
          zh: "网站、网络、自动化，一起做下来。",
          en: "Web, network, and automation delivered together.",
          tw: "網站、網路、自動化，一起做下來。",
        },
        badge: "💼",
        route: "/solution",
      },
      {
        title: { zh: "AI 自动化", en: "AI Automation", tw: "AI 自動化" },
        desc: {
          zh: "让重复动作变成自动流程。",
          en: "Turn repetitive actions into automated workflows.",
          tw: "讓重複動作變成自動流程。",
        },
        badge: "💼",
        route: "/solution",
      },
      {
        title: { zh: "部署与运维", en: "Deploy & Ops", tw: "部署與維運" },
        desc: {
          zh: "从上线到维护，减少折返和踩坑。",
          en: "From launch to maintenance, with fewer reruns.",
          tw: "從上線到維護，減少折返和踩坑。",
        },
        badge: "💼",
        route: "/support",
      },
    ],
    links: [
      { zh: "方案总览", en: "All Solutions", tw: "方案總覽", route: "/solution" },
      { zh: "支持中心", en: "Support", tw: "支援中心", route: "/support" },
      { zh: "帮助中心", en: "Help Center", tw: "幫助中心", route: "/help" },
      { zh: "联系咨询", en: "Contact", tw: "聯絡諮詢", route: "/contact" },
    ],
  },

  support: {
    cards: [
      {
        title: { zh: "帮助中心", en: "Help Center", tw: "幫助中心" },
        desc: {
          zh: "快速了解产品、工具和常见使用问题。",
          en: "Quickly understand products, tools, and common usage questions.",
          tw: "快速了解產品、工具和常見使用問題。",
        },
        badge: "🔓",
        route: "/help",
      },
      {
        title: { zh: "支持中心", en: "Support Center", tw: "支援中心" },
        desc: {
          zh: "查看使用说明、反馈入口和服务支持方式。",
          en: "View usage guidance, feedback entries, and support options.",
          tw: "查看使用說明、反饋入口和服務支援方式。",
        },
        badge: "🔓",
        route: "/support",
      },
      {
        title: { zh: "隐私与法律", en: "Privacy & Legal", tw: "隱私與法律" },
        desc: {
          zh: "了解隐私、数据处理、免责声明和使用边界。",
          en: "Understand privacy, data handling, disclaimers, and usage boundaries.",
          tw: "了解隱私、資料處理、免責聲明和使用邊界。",
        },
        badge: "🔓",
        route: "/privacy",
      },
      {
        title: { zh: "联系方式", en: "Contact", tw: "聯絡方式" },
        desc: {
          zh: "合作、咨询、反馈，统一入口。",
          en: "A single entry for cooperation, questions, and feedback.",
          tw: "合作、諮詢、反饋，統一入口。",
        },
        badge: "🔓",
        route: "/contact",
      },
    ],
    links: [
      { zh: "支持中心", en: "Support Center", tw: "支援中心", route: "/support" },
      { zh: "帮助中心", en: "Help Center", tw: "幫助中心", route: "/help" },
      { zh: "隐私与法律", en: "Privacy & Legal", tw: "隱私與法律", route: "/privacy" },
      { zh: "联系九域", en: "Contact Us", tw: "聯絡九域", route: "/contact" },
    ],
  },

  tool: {
    cards: [
      {
        title: { zh: "JSON 格式化", en: "JSON Formatter", tw: "JSON 格式化" },
        desc: {
          zh: "格式化、压缩和校验 JSON，公开可用。",
          en: "Format, minify, and validate JSON. Publicly available.",
          tw: "格式化、壓縮和校驗 JSON，公開可用。",
        },
        badge: "🔓",
        route: "/tool/json-formatter",
      },
      {
        title: { zh: "文本对比", en: "Text Diff", tw: "文字對比" },
        desc: {
          zh: "对比两段文本差异，公开可用。",
          en: "Compare differences between two texts. Publicly available.",
          tw: "對比兩段文字差異，公開可用。",
        },
        badge: "🔓",
        route: "/tool/text-diff",
      },
      {
        title: { zh: "URL 编码 / 解码", en: "URL Encode / Decode", tw: "URL 編碼 / 解碼" },
        desc: {
          zh: "处理 URL 参数、查询字符串和特殊字符编码。",
          en: "Encode, decode, and transform URL parameters.",
          tw: "處理 URL 參數、查詢字串和特殊字元編碼。",
        },
        badge: "🔓",
        route: "/tool/url-codec",
      },
      {
        title: { zh: "Base64 工具", en: "Base64 Tool", tw: "Base64 工具" },
        desc: {
          zh: "Base64 编码与解码，公开可用。",
          en: "Base64 encode and decode. Publicly available.",
          tw: "Base64 編碼與解碼，公開可用。",
        },
        badge: "🔓",
        route: "/tool/base64",
      },
      {
        title: { zh: "复利计算器", en: "Compound Interest", tw: "複利計算器" },
        desc: {
          zh: "计算长期收益与复利增长，公开可用。",
          en: "Calculate long-term returns and compound growth.",
          tw: "計算長期收益與複利增長，公開可用。",
        },
        badge: "🔓",
        route: "/tool/compound-interest",
      },
    ],
    links: [
      { zh: "JSON 格式化", en: "JSON Formatter", tw: "JSON 格式化", route: "/tool/json-formatter" },
      { zh: "文本对比", en: "Text Diff", tw: "文字對比", route: "/tool/text-diff" },
      { zh: "URL 编码 / 解码", en: "URL Encode / Decode", tw: "URL 編碼 / 解碼", route: "/tool/url-codec" },
      { zh: "Base64 工具", en: "Base64 Tool", tw: "Base64 工具", route: "/tool/base64" },
      { zh: "复利计算器", en: "Compound Interest", tw: "複利計算器", route: "/tool/compound-interest" },
      { zh: "文书模板生成器", en: "Document Template", tw: "文書模板生成器", route: "/tool/document-template" },
      { zh: "Markdown 预览", en: "Markdown Preview", tw: "Markdown 預覽", route: "/tool/markdown-preview" },
    ],
  },
};

function pickLocaleText(text: LocaleText, locale: Locale) {
  if (locale === "en") return text.en;
  if (locale === "zh-TW") return text.tw;
  return text.zh;
}

function pickLinkText(link: MegaLink, locale: Locale) {
  if (locale === "en") return link.en;
  if (locale === "zh-TW") return link.tw;
  return link.zh;
}

function navPillStyle(): CSSProperties {
  return {
    background: "transparent",
    border: "1px solid transparent",
    color: "#111",
    transform: "none",
  };
}

const iconBtn: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 17,
  border: "1px solid transparent",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  cursor: "pointer",
  color: "#000",
  opacity: 1,
  transition: "all .18s ease",
};

const mobileLinkStyle: CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  color: "#111",
  fontSize: 15,
  fontWeight: 600,
  background: "#f5f5f5",
};

const userMenuLinkStyle: CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  textAlign: "left",
  border: "none",
  background: "transparent",
  fontSize: 14,
  color: "#111827",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: 650,
};

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [activeMenu, setActiveMenu] = useState<MegaKey | null>(null);
  const [lastMenu, setLastMenu] = useState<MegaKey>("product");

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [langMenuPos, setLangMenuPos] = useState<{ top: number; left: number } | null>(null);

  const navAreaRef = useRef<HTMLDivElement | null>(null);
  const langBtnWrapRef = useRef<HTMLDivElement | null>(null);
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) return raw as Locale;
    return "zh";
  }, [params]);

  const currentPath = useMemo(() => stripLocaleFromPath(pathname), [pathname]);

  const NAV_H = 52;
  const SCROLLBAR_W = 12;
  const fixedRight = isMobile ? 0 : SCROLLBAR_W;

  const isReady = mounted;
  const isMegaOpen = activeMenu !== null && !isMobile;
  const currentMega = megaData[activeMenu ?? lastMenu];
  const accountLabels = accountText(locale);

  const updateLangMenuPosition = () => {
    const el = langBtnWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLangMenuPos({
      top: Math.round(rect.bottom + 8),
      left: Math.round(rect.left + rect.width / 2),
    });
  };

  useEffect(() => {
    setMounted(true);

    const updateIsMobile = () => setIsMobile(window.innerWidth <= 1180);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    window.addEventListener("resize", updateLangMenuPosition);
    window.addEventListener("scroll", updateLangMenuPosition, true);

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });

    return () => {
      window.removeEventListener("resize", updateIsMobile);
      window.removeEventListener("resize", updateLangMenuPosition);
      window.removeEventListener("scroll", updateLangMenuPosition, true);
      listener.subscription.unsubscribe();
      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
      if (langCloseTimerRef.current) clearTimeout(langCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navAreaRef.current && !navAreaRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, searchParams]);

  const clearCloseTimer = () => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  };

  const clearLangCloseTimer = () => {
    if (langCloseTimerRef.current) {
      clearTimeout(langCloseTimerRef.current);
      langCloseTimerRef.current = null;
    }
  };

  const openMenu = (key: MegaKey) => {
    if (isMobile) return;
    clearCloseTimer();
    clearLangCloseTimer();
    setActiveMenu(key);
    setLastMenu(key);
    setHoveredNav(key);
    setShowLangMenu(false);
    setShowUserMenu(false);
  };

  const closeMenuWithDelay = () => {
    clearCloseTimer();
    menuCloseTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredNav(null);
    }, 160);
  };

  const openLanguageMenu = () => {
    if (!isReady) return;
    clearLangCloseTimer();
    clearCloseTimer();
    updateLangMenuPosition();
    setShowLangMenu(true);
    setShowUserMenu(false);
    setActiveMenu(null);
    setHoveredIcon("lang");
  };

  const closeLanguageMenuWithDelay = () => {
    clearLangCloseTimer();
    langCloseTimerRef.current = setTimeout(() => {
      setShowLangMenu(false);
      setHoveredIcon((v) => (v === "lang" ? null : v));
    }, 180);
  };

  const closeAll = () => {
    clearCloseTimer();
    clearLangCloseTimer();
    setActiveMenu(null);
    setShowLangMenu(false);
    setShowUserMenu(false);
    setMobileOpen(false);
    setHoveredNav(null);
    setHoveredIcon(null);
  };

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    const basePath = stripLocaleFromPath(pathname);
    router.push(`/${l}${basePath === "/" ? "" : basePath}`);
    closeAll();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.push(`/${locale}`);
  };

  const handleToolRoute = (route: string) => {
    closeAll();
    if (isPublicTool(route)) {
      router.push(`/${locale}${route}`);
      return;
    }
    if (!user) {
      router.push(`/${locale}/login?next=${encodeURIComponent(`/${locale}${route}`)}`);
      return;
    }
    router.push(`/${locale}${route}`);
  };

  return (
    <div ref={navAreaRef}>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: `${NAV_H}px`,
          left: 0,
          right: fixedRight,
          bottom: 0,
          background: "rgba(0,0,0,0.045)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: isMegaOpen ? 1 : 0,
          visibility: isMegaOpen ? "visible" : "hidden",
          pointerEvents: "none",
          zIndex: 9996,
          transition: "opacity 160ms ease, visibility 160ms ease",
        }}
      />

      <nav
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeMenuWithDelay}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: fixedRight,
          width: "auto",
          height: `${NAV_H}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 32px",
          zIndex: 10000,
          background: "#ffffff",
          borderBottom: "none",
          boxShadow: "none",
        }}
      >
        <BrandLogo locale={locale} compact={isMobile} />

        {!isMobile && (
          <div className="nav-center" style={{ display: "flex", gap: 8, fontSize: 15, color: "#000" }}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              const isHover = hoveredNav === item.key;
              const pill = navPillStyle();

              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.path}`}
                  className={[
                    "liquidGlassNavItem",
                    isActive ? "liquidGlassNavActive" : "",
                    isHover ? "liquidGlassNavHover" : "",
                  ].filter(Boolean).join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => openMenu(item.key)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: isActive ? 800 : 600,
                    textDecoration: "none",
                    position: "relative",
                    ...pill,
                  }}
                >
                  {pickLocaleText(item.name, locale)}
                </Link>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <div className="nav-icons-desktop" style={{ display: "flex", gap: 12, position: "relative" }}>
            <Link
              href={`/${locale}/support`}
              onClick={closeAll}
              onMouseEnter={() => setHoveredIcon("help")}
              onMouseLeave={() => setHoveredIcon((v) => (v === "help" ? null : v))}
              className={["liquidGlassNavItem", hoveredIcon === "help" ? "liquidGlassNavHover" : ""].filter(Boolean).join(" ")}
              style={{ ...iconBtn, textDecoration: "none" }}
              aria-label="Help"
            >
              <span>?</span>
            </Link>

            <div
              ref={langBtnWrapRef}
              onMouseEnter={openLanguageMenu}
              onMouseLeave={closeLanguageMenuWithDelay}
              style={{
                position: "relative",
                width: 34,
                height: 34,
                flex: "0 0 34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className={["liquidGlassNavItem", hoveredIcon === "lang" || showLangMenu ? "liquidGlassNavHover" : ""].filter(Boolean).join(" ")}
                style={iconBtn}
                onClick={() => {
                  if (!isReady) return;
                  updateLangMenuPosition();
                  setShowLangMenu((v) => !v);
                  setShowUserMenu(false);
                  setActiveMenu(null);
                }}
                aria-label="Language"
                type="button"
              >
                🌐
              </button>
            </div>

            <div style={{ position: "relative" }}>
              {!isReady ? (
                <span style={iconBtn}>⋯</span>
              ) : !user ? (
                <Link
                  href={`/${locale}/login`}
                  onClick={closeAll}
                  onMouseEnter={() => setHoveredIcon("login")}
                  onMouseLeave={() => setHoveredIcon((v) => (v === "login" ? null : v))}
                  className={["liquidGlassNavItem", hoveredIcon === "login" ? "liquidGlassNavHover" : ""].filter(Boolean).join(" ")}
                  style={{ ...iconBtn, textDecoration: "none" }}
                  aria-label="Login"
                >
                  <span>👤</span>
                </Link>
              ) : (
                <button
                  className={["liquidGlassNavItem", hoveredIcon === "user" ? "liquidGlassNavHover" : ""].filter(Boolean).join(" ")}
                  style={iconBtn}
                  onMouseEnter={() => setHoveredIcon("user")}
                  onMouseLeave={() => setHoveredIcon((v) => (v === "user" ? null : v))}
                  onClick={() => {
                    setShowUserMenu((v) => !v);
                    setShowLangMenu(false);
                    setActiveMenu(null);
                  }}
                  type="button"
                >
                  {user.user_metadata?.display_name
                    ? String(user.user_metadata.display_name).charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase()}
                </button>
              )}

              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: 42,
                    right: 0,
                    width: 220,
                    borderRadius: 24,
                    zIndex: 10002,
                    padding: "8px 0",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 18px 42px rgba(15,23,42,0.12)",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 14px",
                      fontSize: 12,
                      color: "#666",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.email}
                  </div>

                  <Link
                    href={`/${locale}/account`}
                    onClick={closeAll}
                    style={userMenuLinkStyle}
                  >
                    {accountLabels.account}
                  </Link>

                  <Link
                    href={`/${locale}/account/profile`}
                    onClick={closeAll}
                    style={userMenuLinkStyle}
                  >
                    {accountLabels.profile}
                  </Link>

                  <Link
                    href={`/${locale}/account/security`}
                    onClick={closeAll}
                    style={userMenuLinkStyle}
                  >
                    {accountLabels.security}
                  </Link>

                  <button
                    onClick={handleLogout}
                    type="button"
                    style={{
                      ...userMenuLinkStyle,
                      color: "#d11a2a",
                      fontWeight: 700,
                    }}
                  >
                    {accountLabels.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="nav-icons-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              className="mobile-menu-btn"
              onClick={() => {
                setMobileOpen((v) => !v);
                setActiveMenu(null);
                setShowLangMenu(false);
                setShowUserMenu(false);
              }}
              type="button"
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                border: "1px solid #eeeeee",
                background: mobileOpen ? "#f5f5f5" : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                cursor: "pointer",
                color: "#111",
                transition: "all .18s ease",
              }}
              aria-label="Menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        )}
      </nav>

      {showLangMenu && langMenuPos && !isMobile && (
        <div
          onMouseEnter={openLanguageMenu}
          onMouseLeave={closeLanguageMenuWithDelay}
          style={{
            position: "fixed",
            top: langMenuPos.top,
            left: langMenuPos.left,
            transform: "translate3d(-50%, 0, 0)",
            minWidth: 136,
            width: "max-content",
            zIndex: 10003,
            padding: 8,
            borderRadius: 22,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            textAlign: "center",
            background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,251,0.88))",
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow: "0 18px 42px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              type="button"
              style={{
                padding: "10px 18px",
                border: "none",
                background: locale === l ? "rgba(255,255,255,0.82)" : "transparent",
                textAlign: "center",
                cursor: "pointer",
                fontSize: 15,
                borderRadius: 14,
                color: "#05070a",
                fontWeight: 800,
                display: "block",
                width: "100%",
                whiteSpace: "nowrap",
                lineHeight: 1.2,
              }}
            >
              {languageNames[l]}
            </button>
          ))}
        </div>
      )}

      <div
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeMenuWithDelay}
        style={{
          position: "fixed",
          top: `${NAV_H}px`,
          left: 0,
          right: fixedRight,
          width: "auto",
          background: "#ffffff",
          border: "none",
          boxShadow: "none",
          zIndex: 9999,
          padding: "54px 48px 56px",
          display: isMobile ? "none" : "flex",
          justifyContent: "center",
          opacity: isMegaOpen ? 1 : 0,
          visibility: isMegaOpen ? "visible" : "hidden",
          transform: isMegaOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: isMegaOpen ? "auto" : "none",
          transition: "opacity 160ms ease, visibility 160ms ease, transform 160ms ease",
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 240px",
            gap: 54,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(currentMega.cards.length, 5)}, minmax(130px, 1fr))`,
              gap: 22,
            }}
          >
            {currentMega.cards.map((card, i) => {
              const title = pickLocaleText(card.title, locale);
              const desc = pickLocaleText(card.desc, locale);
              const content = (
                <div
                  className="liquidGlassCard"
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    padding: 16,
                    transition: "all .18s ease",
                    minHeight: 142,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#111",
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.72)",
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "#000", marginBottom: 8 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 12, lineHeight: 1.55, color: "#4b5563", margin: 0 }}>
                    {desc}
                  </p>
                </div>
              );

              if ((activeMenu ?? lastMenu) === "tool") {
                return (
                  <button
                    key={`mega-card-${i}`}
                    type="button"
                    onClick={() => handleToolRoute(card.route)}
                    style={{
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={`mega-card-${i}`}
                  href={`/${locale}${card.route}`}
                  onClick={closeAll}
                  style={{ textDecoration: "none" }}
                >
                  {content}
                </Link>
              );
            })}
          </div>

          <div
            style={{
              borderLeft: "none",
              paddingLeft: 18,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {currentMega.links.map((link, i) => {
              const label = pickLinkText(link, locale);

              if ((activeMenu ?? lastMenu) === "tool") {
                return (
                  <button
                    key={`mega-link-${i}`}
                    type="button"
                    onClick={() => handleToolRoute(link.route)}
                    className="liquidGlassPill"
                    style={{
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    {label}
                  </button>
                );
              }

              return (
                <Link
                  key={`mega-link-${i}`}
                  href={`/${locale}${link.route}`}
                  onClick={closeAll}
                  className="liquidGlassPill"
                  style={{ width: "fit-content" }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {mobileOpen && isMobile && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: `${NAV_H}px`,
            left: 0,
            right: fixedRight,
            width: "auto",
            background: "#ffffff",
            padding: 20,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderTop: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.path}`}
              onClick={closeAll}
              style={mobileLinkStyle}
            >
              {pickLocaleText(item.name, locale)}
            </Link>
          ))}

          {!user && (
            <Link href={`/${locale}/login`} onClick={closeAll} style={mobileLinkStyle}>
              {accountLabels.login}
            </Link>
          )}

          {user && (
            <Link href={`/${locale}/account`} onClick={closeAll} style={mobileLinkStyle}>
              {accountLabels.account}
            </Link>
          )}

          {user && (
            <Link href={`/${locale}/account/profile`} onClick={closeAll} style={mobileLinkStyle}>
              {accountLabels.profile}
            </Link>
          )}

          {user && (
            <Link href={`/${locale}/account/security`} onClick={closeAll} style={mobileLinkStyle}>
              {accountLabels.security}
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              type="button"
              style={{
                ...mobileLinkStyle,
                border: "none",
                textAlign: "left",
                color: "#d11a2a",
                cursor: "pointer",
              }}
            >
              {accountLabels.logout}
            </button>
          )}

          <div
            style={{
              borderTop: "1px solid #eeeeee",
              paddingTop: 10,
              marginTop: 6,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                type="button"
                style={{
                  padding: "8px 12px",
                  border: "1px solid #eeeeee",
                  borderRadius: 8,
                  background: locale === l ? "#111" : "#ffffff",
                  color: locale === l ? "#ffffff" : "#111",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {languageNames[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}