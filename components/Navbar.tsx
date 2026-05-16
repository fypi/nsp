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
] as const;

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
    "/tool/data-converter",
    "/tool/text-formatter",
  ].includes(route);
}

const megaData = {
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
      {
        zh: "产品总览",
        en: "Overview",
        tw: "產品總覽",
        route: "/product",
      },
      {
        zh: "工具中心",
        en: "Tool Center",
        tw: "工具中心",
        route: "/tool",
      },
      {
        zh: "解决方案",
        en: "Solutions",
        tw: "解決方案",
        route: "/solution",
      },
      {
        zh: "联系咨询",
        en: "Contact",
        tw: "聯絡諮詢",
        route: "/contact",
      },
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
          zh: "网站、网络、自动化，一体化落地。",
          en: "Web, network, and automation delivery in one stream.",
          tw: "網站、網路、自動化，一體化落地。",
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
      {
        zh: "方案总览",
        en: "All Solutions",
        tw: "方案總覽",
        route: "/solution",
      },
      {
        zh: "支持中心",
        en: "Support",
        tw: "支援中心",
        route: "/support",
      },
      {
        zh: "帮助中心",
        en: "Help Center",
        tw: "幫助中心",
        route: "/help",
      },
      {
        zh: "联系咨询",
        en: "Contact",
        tw: "聯絡諮詢",
        route: "/contact",
      },
    ],
  },
  support: {
    cards: [
      {
        title: { zh: "帮助中心", en: "Help Center", tw: "幫助中心" },
        desc: {
          zh: "快速搞清怎么用、去哪找、哪里反馈。",
          en: "Quickly find how to use, where to go, and how to ask.",
          tw: "快速搞清怎麼用、去哪找、哪裡反饋。",
        },
        badge: "🔓",
        route: "/help",
      },
      {
        title: { zh: "常见问题", en: "FAQ", tw: "常見問題" },
        desc: {
          zh: "先把最常见的问题讲透。",
          en: "Cover the most common questions first.",
          tw: "先把最常見的問題講透。",
        },
        badge: "🔓",
        route: "/support",
      },
      {
        title: { zh: "隐私与法律", en: "Privacy & Legal", tw: "隱私與法律" },
        desc: {
          zh: "隐私、条款、免责声明放在这里。",
          en: "Privacy, terms, and disclaimer live here.",
          tw: "隱私、條款、免責聲明放在這裡。",
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
      {
        zh: "支持中心",
        en: "Support Center",
        tw: "支援中心",
        route: "/support",
      },
      {
        zh: "帮助中心",
        en: "Help Center",
        tw: "幫助中心",
        route: "/help",
      },
      {
        zh: "隐私与法律",
        en: "Privacy & Legal",
        tw: "隱私與法律",
        route: "/privacy",
      },
      {
        zh: "联系九域",
        en: "Contact Us",
        tw: "聯絡九域",
        route: "/contact",
      },
    ],
  },
  tool: {
    cards: [
      {
        title: { zh: "数据转换器", en: "Data Converter", tw: "資料轉換器" },
        desc: {
          zh: "格式转换，公开可用，直接打开就能试。",
          en: "Format conversion, publicly available, open and try.",
          tw: "格式轉換，公開可用，打開就能試。",
        },
        badge: "🔓",
        route: "/tool/data-converter",
      },
      {
        title: { zh: "文本格式化", en: "Text Formatter", tw: "文字格式化" },
        desc: {
          zh: "文本清洗与整理，公开可用。",
          en: "Text cleanup and formatting, publicly available.",
          tw: "文字清洗與整理，公開可用。",
        },
        badge: "🔓",
        route: "/tool/text-formatter",
      },
      {
        title: { zh: "AI 工作台", en: "AI Workspace", tw: "AI 工作台" },
        desc: {
          zh: "更多工具登录后解锁。",
          en: "More tools unlock after login.",
          tw: "更多工具登入後解鎖。",
        },
        badge: "🔐",
        route: "/tool/ai-workspace",
      },
      {
        title: { zh: "网络检测", en: "Network Check", tw: "網路檢測" },
        desc: {
          zh: "登录后可用的诊断能力。",
          en: "Diagnostic capabilities available after login.",
          tw: "登入後可用的診斷能力。",
        },
        badge: "🔐",
        route: "/tool/network-check",
      },
    ],
    links: [
      {
        zh: "公开工具",
        en: "Public Tools",
        tw: "公開工具",
        route: "/tool",
      },
      {
        zh: "登录后工具",
        en: "Member Tools",
        tw: "登入後工具",
        route: "/login-required",
      },
      {
        zh: "更新日志",
        en: "Changelog",
        tw: "更新日誌",
        route: "/tool",
      },
      {
        zh: "定制服务",
        en: "Custom Service",
        tw: "定制服務",
        route: "/contact",
      },
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

function glassStyle(mode: "default" | "hover" | "active"): CSSProperties {
  if (mode === "active") {
    return {
      background: "rgba(255,255,255,0.62)",
      border: "1px solid rgba(126,177,231,0.92)",
      backdropFilter: "blur(14px) saturate(150%)",
      WebkitBackdropFilter: "blur(14px) saturate(150%)",
      boxShadow:
        "0 10px 24px rgba(16,24,40,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
      color: "#0f1720",
      transform: "translateY(-1px) scale(1.04)",
    };
  }

  if (mode === "hover") {
    return {
      background: "rgba(255,255,255,0.40)",
      border: "1px solid rgba(255,255,255,0.68)",
      backdropFilter: "blur(12px) saturate(135%)",
      WebkitBackdropFilter: "blur(12px) saturate(135%)",
      boxShadow:
        "0 8px 18px rgba(16,24,40,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
      color: "#111",
      transform: "translateY(-1px)",
    };
  }

  return {
    background: "transparent",
    border: "1px solid transparent",
    color: "#111",
    transform: "none",
  };
}

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<keyof typeof megaData | null>(
    null
  );
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navAreaRef = useRef<HTMLDivElement | null>(null);

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

  const currentPath = useMemo(() => stripLocaleFromPath(pathname), [pathname]);

  useEffect(() => {
    setMounted(true);

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navAreaRef.current && !navAreaRef.current.contains(e.target as Node)) {
        if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
        setActiveMenu(null);
        setShowLangMenu(false);
        setShowUserMenu(false);
        setMobileOpen(false);
        setHoveredNav(null);
        setHoveredIcon(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setShowLangMenu(false);
    setShowUserMenu(false);
    setMobileOpen(false);
    setHoveredNav(null);
    setHoveredIcon(null);
  }, [pathname, searchParams]);

  const clearCloseTimer = () => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  };

  const openMenu = (key: keyof typeof megaData) => {
    clearCloseTimer();
    setActiveMenu(key);
    setHoveredNav(key);
  };

  const closeMenuWithDelay = () => {
    clearCloseTimer();
    menuCloseTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredNav(null);
    }, 180);
  };

  const changeLanguage = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    const basePath = stripLocaleFromPath(pathname);
    router.push(`/${l}${basePath === "/" ? "" : basePath}`);
    setShowLangMenu(false);
    setMobileOpen(false);
    setActiveMenu(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.push(`/${locale}`);
  };

  const handleToolRoute = (route: string) => {
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

  const NAV_H = 52;
  const SCROLLBAR_W = 12;
  const isReady = mounted;

  return (
    <div ref={navAreaRef} onMouseLeave={closeMenuWithDelay}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `calc(100% - ${SCROLLBAR_W}px)`,
          height: `${NAV_H}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 9999,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          borderBottom: "1px solid rgba(255,255,255,0.65)",
          boxShadow: "0 8px 30px rgba(15,23,42,0.05)",
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
          className="nav-center"
          style={{ display: "flex", gap: "8px", fontSize: "15px", color: "#000" }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const isHover = hoveredNav === item.key;
            const glass = isActive
              ? glassStyle("active")
              : isHover
              ? glassStyle("hover")
              : glassStyle("default");

            return (
              <Link
                key={item.key}
                href={`/${locale}${item.path}`}
                onMouseEnter={() => openMenu(item.key)}
                style={{
                  padding: "7px 13px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  position: "relative",
                  ...glass,
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

        <div
          className="nav-icons-desktop"
          style={{ display: "flex", gap: "12px", position: "relative" }}
        >
          <Link
            href={`/${locale}/support`}
            onMouseEnter={() => setHoveredIcon("help")}
            onMouseLeave={() => setHoveredIcon((v) => (v === "help" ? null : v))}
            style={{
              ...iconBtn,
              ...(hoveredIcon === "help" ? glassStyle("hover") : glassStyle("default")),
              textDecoration: "none",
            }}
            aria-label="Help"
          >
            <span>?</span>
          </Link>

          <button
            style={{
              ...iconBtn,
              ...(hoveredIcon === "lang" ? glassStyle("hover") : glassStyle("default")),
            }}
            onMouseEnter={() => setHoveredIcon("lang")}
            onMouseLeave={() => setHoveredIcon((v) => (v === "lang" ? null : v))}
            onClick={() => isReady && setShowLangMenu(!showLangMenu)}
            aria-label="Language"
            type="button"
          >
            🌐
          </button>

          {showLangMenu && (
            <div
              style={{
                position: "absolute",
                top: `${NAV_H - 8}px`,
                right: 0,
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                borderRadius: "14px",
                boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
                zIndex: 1000,
                padding: "6px",
                border: "1px solid rgba(255,255,255,0.72)",
              }}
            >
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  type="button"
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    borderRadius: "10px",
                    color: "#000",
                    fontWeight: 500,
                    display: "block",
                    width: "100%",
                  }}
                >
                  {languageNames[l]}
                </button>
              ))}
            </div>
          )}

          <div style={{ position: "relative" }}>
            {!isReady ? (
              <span style={iconBtn}>⋯</span>
            ) : !user ? (
              <Link
                href={`/${locale}/login`}
                onMouseEnter={() => setHoveredIcon("login")}
                onMouseLeave={() => setHoveredIcon((v) => (v === "login" ? null : v))}
                style={{
                  ...iconBtn,
                  ...(hoveredIcon === "login"
                    ? glassStyle("hover")
                    : glassStyle("default")),
                  textDecoration: "none",
                }}
                aria-label="Login"
              >
                <span>👤</span>
              </Link>
            ) : (
              <button
                style={{
                  ...iconBtn,
                  ...(hoveredIcon === "user" ? glassStyle("hover") : glassStyle("default")),
                }}
                onMouseEnter={() => setHoveredIcon("user")}
                onMouseLeave={() => setHoveredIcon((v) => (v === "user" ? null : v))}
                onClick={() => setShowUserMenu(!showUserMenu)}
                type="button"
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>
            )}

            {showUserMenu && (
              <div
                style={{
                  position: "absolute",
                  top: NAV_H + 4,
                  right: 0,
                  width: 160,
                  background: "rgba(255,255,255,0.82)",
                  backdropFilter: "blur(16px) saturate(140%)",
                  WebkitBackdropFilter: "blur(16px) saturate(140%)",
                  borderRadius: 14,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                  padding: "6px 0",
                  border: "1px solid rgba(255,255,255,0.75)",
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
                  type="button"
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
                  type="button"
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

        <div
          className="nav-icons-mobile"
          style={{
            display: "none",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* 移动端删掉冗余 ⋯ 登录，只保留汉堡菜单 */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "17px",
              border: "1px solid rgba(255,255,255,0.7)",
              background: mobileOpen
                ? "rgba(255,255,255,0.52)"
                : "rgba(255,255,255,0.28)",
              backdropFilter: "blur(14px) saturate(140%)",
              WebkitBackdropFilter: "blur(14px) saturate(140%)",
              boxShadow: "0 8px 18px rgba(16,24,40,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              cursor: "pointer",
              color: "#111",
            }}
            aria-label="Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: `${NAV_H}px`,
            left: 0,
            width: "100%",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(18px) saturate(140%)",
            WebkitBackdropFilter: "blur(18px) saturate(140%)",
            padding: "20px",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderTop: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.path}`}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#111",
                fontSize: "15px",
                fontWeight: 500,
                background: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.7)",
              }}
            >
              {locale === "zh"
                ? item.name.zh
                : locale === "zh-TW"
                ? item.name.tw
                : item.name.en}
            </Link>
          ))}

          <Link
            href={`/${locale}/login`}
            onClick={() => setMobileOpen(false)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#111",
              fontSize: "15px",
              fontWeight: 500,
              background: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            {locale === "en" ? "Login" : locale === "zh-TW" ? "登入" : "登录"}
          </Link>

          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "10px",
              marginTop: "6px",
              display: "flex",
              gap: "8px",
            }}
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                type="button"
                style={{
                  padding: "8px 12px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  background: locale === l ? "#111" : "#fff",
                  color: locale === l ? "#fff" : "#111",
                  fontSize: "13px",
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

      {activeMenu && (
        <div
          onMouseEnter={clearCloseTimer}
          onMouseLeave={closeMenuWithDelay}
          style={{
            position: "fixed",
            top: `${NAV_H}px`,
            left: 0,
            width: "100%",
            background: "rgba(255,255,255,0.84)",
            backdropFilter: "blur(20px) saturate(145%)",
            WebkitBackdropFilter: "blur(20px) saturate(145%)",
            border: "none",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
            zIndex: 998,
            padding: "50px 30px",
            display: "flex",
            justifyContent: "center",
            gap: "50px",
          }}
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
              {megaData[activeMenu].cards.map((card, i) => {
                const href = `/${locale}${card.route}`;
                const title = pickLocaleText(card.title, locale);
                const desc = pickLocaleText(card.desc, locale);

                const content = (
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      padding: 14,
                      background: "rgba(255,255,255,0.34)",
                      border: "1px solid rgba(255,255,255,0.72)",
                      boxShadow:
                        "0 10px 22px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.82)",
                      transition: "all .22s ease",
                      minHeight: 132,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#111",
                          padding: "4px 8px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(255,255,255,0.7)",
                        }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#000",
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </h3>

                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "#4b5563",
                        margin: 0,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                );

                if (activeMenu === "tool") {
                  return (
                    <button
                      key={`${activeMenu}-card-${i}`}
                      type="button"
                      onClick={() => handleToolRoute(card.route)}
                      style={{
                        textAlign: "left",
                        background: "none",
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
                    key={`${activeMenu}-card-${i}`}
                    href={href}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            <div
              style={{
                borderLeft: "1px solid rgba(0,0,0,0.08)",
                paddingLeft: 26,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {megaData[activeMenu].links.map((link, i) => {
                const label =
                  locale === "en" ? link.en : locale === "zh-TW" ? link.tw : link.zh;

                if (activeMenu === "tool" && link.route === "/login-required") {
                  return (
                    <button
                      key={`${activeMenu}-link-${i}`}
                      type="button"
                      onClick={() => handleToolRoute("/tool/ai-workspace")}
                      style={{
                        color: "#111",
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: 1.2,
                        border: "none",
                        background: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={`${activeMenu}-link-${i}`}
                    href={`/${locale}${link.route}`}
                    style={{
                      color: "#111",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const iconBtn: CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "17px",
  border: "1px solid transparent",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  cursor: "pointer",
  color: "#000",
  opacity: 1,
  transition: "all .22s ease",
};
