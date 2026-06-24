"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
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
type MegaKey = "products" | "solutions" | "technology" | "resources" | "company";

type LocaleText = {
  zh: string;
  en: string;
  tw: string;
};

type MegaCard = {
  title: LocaleText;
  desc: LocaleText;
  badge: LocaleText;
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

const navItems: Array<{ key: MegaKey; name: LocaleText; path: string }> = [
  {
    key: "products",
    name: { zh: "产品", en: "Product", tw: "產品" },
    path: "/product",
  },
  {
    key: "solutions",
    name: { zh: "解决方案", en: "Solution", tw: "解決方案" },
    path: "/solution",
  },
  {
    key: "technology",
    name: { zh: "技术", en: "Technology", tw: "技術" },
    path: "/technology",
  },
  {
    key: "resources",
    name: { zh: "资源", en: "Resources", tw: "資源" },
    path: "/resources",
  },
  {
    key: "company",
    name: { zh: "公司", en: "Company", tw: "公司" },
    path: "/company",
  },
];

const megaData: Record<MegaKey, { cards: MegaCard[]; links: MegaLink[] }> = {
  products: {
    cards: [
      {
        title: { zh: "文书与内容", en: "Documents & Content", tw: "文書與內容" },
        desc: {
          zh: "文书模板、写作助手、报告生成与合同摘要。",
          en: "Templates, writing assistant, reports, and contract summaries.",
          tw: "文書模板、寫作助手、報告生成與合約摘要。",
        },
        badge: { zh: "文", en: "DOC", tw: "文" },
        route: "/product#documents",
      },
      {
        title: { zh: "学习与知识", en: "Learning & Knowledge", tw: "學習與知識" },
        desc: {
          zh: "学习计划、知识库、题目解析与阅读总结。",
          en: "Study plans, knowledge base, explanations, and summaries.",
          tw: "學習計畫、知識庫、題目解析與閱讀總結。",
        },
        badge: { zh: "学", en: "EDU", tw: "學" },
        route: "/product#learning",
      },
      {
        title: { zh: "智能自动化", en: "AI Automation", tw: "智能自動化" },
        desc: {
          zh: "工作流自动化、数据处理、智能客服与任务代理。",
          en: "Workflow automation, data processing, AI support, and task agents.",
          tw: "工作流自動化、數據處理、智能客服與任務代理。",
        },
        badge: { zh: "智", en: "AI", tw: "智" },
        route: "/product#automation",
      },
      {
        title: { zh: "工具中心", en: "Tools", tw: "工具中心" },
        desc: {
          zh: "进入 NINESPRO 在线工具矩阵。",
          en: "Open the NINESPRO online tools matrix.",
          tw: "進入 NINESPRO 線上工具矩陣。",
        },
        badge: { zh: "工", en: "TOOL", tw: "工" },
        route: "/tool",
      },
    ],
    links: [
      { zh: "产品总览", en: "Product Overview", tw: "產品總覽", route: "/product" },
      { zh: "文书与内容", en: "Documents", tw: "文書與內容", route: "/product#documents" },
      { zh: "学习与知识", en: "Learning", tw: "學習與知識", route: "/product#learning" },
      { zh: "智能自动化", en: "AI Automation", tw: "智能自動化", route: "/product#automation" },
      { zh: "工具中心", en: "Tools", tw: "工具中心", route: "/tool" },
    ],
  },

  solutions: {
    cards: [
      {
        title: { zh: "业务", en: "Business", tw: "業務" },
        desc: {
          zh: "业务自动化、运营管理、数据洞察与客户支持。",
          en: "Automation, operations, insights, and customer support.",
          tw: "業務自動化、營運管理、數據洞察與客戶支持。",
        },
        badge: { zh: "业", en: "BIZ", tw: "業" },
        route: "/solution#business",
      },
      {
        title: { zh: "教育", en: "Education", tw: "教育" },
        desc: {
          zh: "学习计划、资料总结、题目解析与知识管理。",
          en: "Study planning, material summaries, explanations, and knowledge management.",
          tw: "學習計畫、資料總結、題目解析與知識管理。",
        },
        badge: { zh: "教", en: "EDU", tw: "教" },
        route: "/solution#education",
      },
      {
        title: { zh: "创业", en: "Startup", tw: "新創" },
        desc: {
          zh: "MVP、官网落地页、SaaS 基础与品牌系统。",
          en: "MVP, landing pages, SaaS foundation, and brand systems.",
          tw: "MVP、官網落地頁、SaaS 基礎與品牌系統。",
        },
        badge: { zh: "创", en: "UP", tw: "創" },
        route: "/solution#startup",
      },
      {
        title: { zh: "服务能力", en: "Services", tw: "服務能力" },
        desc: {
          zh: "查看开发、设计、自动化与企业平台服务。",
          en: "Explore development, design, automation, and enterprise services.",
          tw: "查看開發、設計、自動化與企業平台服務。",
        },
        badge: { zh: "服", en: "SVC", tw: "服" },
        route: "/service",
      },
    ],
    links: [
      { zh: "解决方案总览", en: "Solution Overview", tw: "解決方案總覽", route: "/solution" },
      { zh: "业务", en: "Business", tw: "業務", route: "/solution#business" },
      { zh: "教育", en: "Education", tw: "教育", route: "/solution#education" },
      { zh: "创业", en: "Startup", tw: "新創", route: "/solution#startup" },
      { zh: "服务能力", en: "Services", tw: "服務能力", route: "/service" },
    ],
  },

  technology: {
    cards: [
      {
        title: { zh: "智能代理", en: "AI Agents", tw: "智能代理" },
        desc: {
          zh: "任务理解、流程拆解、工具调用与结果校验。",
          en: "Task understanding, workflow breakdown, tool calling, and validation.",
          tw: "任務理解、流程拆解、工具調用與結果校驗。",
        },
        badge: { zh: "智", en: "AI", tw: "智" },
        route: "/technology#ai",
      },
      {
        title: { zh: "云端架构", en: "Cloud Architecture", tw: "雲端架構" },
        desc: {
          zh: "API 架构、权限系统、数据存储与监控运维。",
          en: "API architecture, permissions, data storage, and monitoring.",
          tw: "API 架構、權限系統、數據存儲與監控運維。",
        },
        badge: { zh: "云", en: "CLOUD", tw: "雲" },
        route: "/technology#cloud",
      },
      {
        title: { zh: "自动化引擎", en: "Automation Engine", tw: "自動化引擎" },
        desc: {
          zh: "触发器、规则引擎、执行记录与集成连接。",
          en: "Triggers, rule engine, execution logs, and integrations.",
          tw: "觸發器、規則引擎、執行記錄與整合連接。",
        },
        badge: { zh: "自", en: "AUTO", tw: "自" },
        route: "/technology#automation",
      },
      {
        title: { zh: "开发者", en: "Developer", tw: "開發者" },
        desc: {
          zh: "开发者能力、接口、工程结构与系统集成。",
          en: "Developer capabilities, APIs, engineering structure, and integrations.",
          tw: "開發者能力、接口、工程結構與系統整合。",
        },
        badge: { zh: "开", en: "DEV", tw: "開" },
        route: "/developer",
      },
    ],
    links: [
      { zh: "技术总览", en: "Technology Overview", tw: "技術總覽", route: "/technology" },
      { zh: "智能代理", en: "AI Agents", tw: "智能代理", route: "/technology#ai" },
      { zh: "云端架构", en: "Cloud Architecture", tw: "雲端架構", route: "/technology#cloud" },
      { zh: "自动化引擎", en: "Automation Engine", tw: "自動化引擎", route: "/technology#automation" },
      { zh: "开发者", en: "Developer", tw: "開發者", route: "/developer" },
    ],
  },

  resources: {
    cards: [
      {
        title: { zh: "博客", en: "Blog", tw: "部落格" },
        desc: {
          zh: "AI、自动化、产品设计和工程实践文章。",
          en: "Articles on AI, automation, product design, and engineering practice.",
          tw: "AI、自動化、產品設計和工程實踐文章。",
        },
        badge: { zh: "博", en: "BLOG", tw: "博" },
        route: "/resources#blog",
      },
      {
        title: { zh: "文档", en: "Documentation", tw: "文檔" },
        desc: {
          zh: "产品能力、API、流程、模板和使用说明。",
          en: "Product capabilities, APIs, workflows, templates, and guides.",
          tw: "產品能力、API、流程、模板和使用說明。",
        },
        badge: { zh: "文", en: "DOC", tw: "文" },
        route: "/resources#docs",
      },
      {
        title: { zh: "支持", en: "Support", tw: "支持" },
        desc: {
          zh: "帮助中心、FAQ、更新日志和服务支持。",
          en: "Help center, FAQ, changelog, and service support.",
          tw: "幫助中心、FAQ、更新日誌和服務支持。",
        },
        badge: { zh: "助", en: "?", tw: "助" },
        route: "/resources#support",
      },
      {
        title: { zh: "工具中心", en: "Tools", tw: "工具中心" },
        desc: {
          zh: "JSON、文本处理、金融计算与效率工具。",
          en: "JSON, text tools, finance calculators, and productivity utilities.",
          tw: "JSON、文字處理、金融計算與效率工具。",
        },
        badge: { zh: "工", en: "TOOL", tw: "工" },
        route: "/tool",
      },
    ],
    links: [
      { zh: "资源总览", en: "Resources Overview", tw: "資源總覽", route: "/resources" },
      { zh: "博客", en: "Blog", tw: "部落格", route: "/resources#blog" },
      { zh: "文档", en: "Documentation", tw: "文檔", route: "/resources#docs" },
      { zh: "支持", en: "Support", tw: "支持", route: "/resources#support" },
      { zh: "工具中心", en: "Tools", tw: "工具中心", route: "/tool" },
    ],
  },

  company: {
    cards: [
      {
        title: { zh: "关于", en: "About", tw: "關於" },
        desc: {
          zh: "品牌、愿景、产品原则与工程标准。",
          en: "Brand, vision, product principles, and engineering standards.",
          tw: "品牌、願景、產品原則與工程標準。",
        },
        badge: { zh: "关", en: "N", tw: "關" },
        route: "/company#about",
      },
      {
        title: { zh: "加入我们", en: "Careers", tw: "加入我們" },
        desc: {
          zh: "设计、工程、AI 和产品方向的合作机会。",
          en: "Future opportunities in design, engineering, AI, and product.",
          tw: "設計、工程、AI 和產品方向的合作機會。",
        },
        badge: { zh: "加", en: "+", tw: "加" },
        route: "/company#careers",
      },
      {
        title: { zh: "联系", en: "Contact", tw: "聯絡" },
        desc: {
          zh: "商务、合作、销售和项目需求联系入口。",
          en: "Business, partnership, sales, and project contact channels.",
          tw: "商務、合作、銷售和項目需求聯絡入口。",
        },
        badge: { zh: "联", en: "→", tw: "聯" },
        route: "/company#contact",
      },
      {
        title: { zh: "反馈", en: "Feedback", tw: "反饋" },
        desc: {
          zh: "提交产品建议、问题反馈和合作想法。",
          en: "Submit product suggestions, issues, and partnership ideas.",
          tw: "提交產品建議、問題反饋和合作想法。",
        },
        badge: { zh: "馈", en: "◎", tw: "饋" },
        route: "/feedback",
      },
    ],
    links: [
      { zh: "公司总览", en: "Company Overview", tw: "公司總覽", route: "/company" },
      { zh: "关于", en: "About", tw: "關於", route: "/company#about" },
      { zh: "加入我们", en: "Careers", tw: "加入我們", route: "/company#careers" },
      { zh: "联系", en: "Contact", tw: "聯絡", route: "/company#contact" },
      { zh: "隐私政策", en: "Privacy Policy", tw: "隱私政策", route: "/privacy" },
    ],
  },
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  if (rawLocale === "en") return "en";
  return "en";
}

function stripLocaleFromPath(path: string): string {
  const clean = path || "/";
  const parts = clean.split("/").filter(Boolean);
  const first = parts[0];

  if (first === "zh" || first === "zh-TW" || first === "zh-tw" || first === "en") {
    const rest = "/" + parts.slice(1).join("/");
    return rest === "/" ? "/" : rest;
  }

  return clean.startsWith("/") ? clean : `/${clean}`;
}

function localePath(locale: Locale, route: string) {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  return `/${locale}${cleanRoute === "/" ? "" : cleanRoute}`;
}

function accountText(locale: Locale) {
  if (locale === "en") {
    return {
      account: "Account Center",
      profile: "Profile",
      security: "Security",
      favorites: "Favorites",
      history: "History",
      downloads: "Downloads",
      logout: "Logout",
      login: "Login",
      contact: "Contact",
    };
  }

  if (locale === "zh-TW") {
    return {
      account: "個人中心",
      profile: "個人資訊",
      security: "安全設定",
      favorites: "收藏",
      history: "歷史記錄",
      downloads: "下載記錄",
      logout: "登出",
      login: "登入",
      contact: "聯絡",
    };
  }

  return {
    account: "个人中心",
    profile: "个人信息",
    security: "安全设置",
    favorites: "收藏",
    history: "历史记录",
    downloads: "下载记录",
    logout: "退出登录",
    login: "登录",
    contact: "联系",
  };
}

function pickLocaleText(value: LocaleText, locale: Locale) {
  if (locale === "en") return value.en;
  if (locale === "zh-TW") return value.tw;
  return value.zh;
}

function pickLinkText(link: MegaLink, locale: Locale) {
  if (locale === "en") return link.en;
  if (locale === "zh-TW") return link.tw;
  return link.zh;
}

function getUserDisplayName(user: User | null, fallback: string) {
  if (!user) return fallback;

  const meta = user.user_metadata ?? {};
  const name =
    meta.display_name ||
    meta.full_name ||
    meta.name ||
    meta.user_name ||
    meta.username ||
    meta.nickname;

  if (typeof name === "string" && name.trim()) return name.trim();
  if (user.email) return user.email.split("@")[0];

  return fallback;
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
  padding: "14px 16px",
  borderRadius: 18,
  textDecoration: "none",
  color: "#111",
  fontSize: 17,
  fontWeight: 760,
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(246,248,251,0.78))",
  border: "1px solid rgba(255,255,255,0.86)",
  boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
};

const userMenuLinkStyle: CSSProperties = {
  display: "block",
  width: "100%",
  padding: "11px 16px",
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
  const [isTouchLike, setIsTouchLike] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaKey | null>(null);
  const [lastMenu, setLastMenu] = useState<MegaKey>("products");
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

  const locale: Locale = useMemo(() => normalizeLocale(params?.locale), [params]);
  const currentPath = useMemo(() => stripLocaleFromPath(pathname), [pathname]);

  const NAV_H = 52;
  const DESKTOP_SCROLLBAR_W = 12;
  const TOUCH_SCROLLBAR_W = 6;

  const isReady = mounted;
  const isMegaOpen = activeMenu !== null && !isMobile;
  const fixedRight = isMegaOpen ? 0 : isTouchLike ? TOUCH_SCROLLBAR_W : DESKTOP_SCROLLBAR_W;
  const currentMega = megaData[activeMenu ?? lastMenu];
  const accountLabels = accountText(locale);
  const userDisplayName = getUserDisplayName(user, accountLabels.account);

  useEffect(() => {
    document.documentElement.classList.toggle("nines-nav-expanded", isMegaOpen);
    document.body.classList.toggle("nines-nav-expanded", isMegaOpen);

    return () => {
      document.documentElement.classList.remove("nines-nav-expanded");
      document.body.classList.remove("nines-nav-expanded");
    };
  }, [isMegaOpen]);

  const updateLangMenuPosition = () => {
    const el = langBtnWrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    setLangMenuPos({
      top: Math.round(rect.bottom + 8),
      left: Math.round(rect.left + rect.width / 2),
    });
  };

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

  useEffect(() => {
    setMounted(true);

    const updateDeviceFlags = () => {
      setIsMobile(window.innerWidth <= 1180);
      setIsTouchLike(window.matchMedia("(pointer: coarse)").matches);
    };

    updateDeviceFlags();

    window.addEventListener("resize", updateDeviceFlags);
    window.addEventListener("orientationchange", updateDeviceFlags);
    window.addEventListener("resize", updateLangMenuPosition);
    window.addEventListener("scroll", updateLangMenuPosition, true);

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("resize", updateDeviceFlags);
      window.removeEventListener("orientationchange", updateDeviceFlags);
      window.removeEventListener("resize", updateLangMenuPosition);
      window.removeEventListener("scroll", updateLangMenuPosition, true);
      listener.subscription.unsubscribe();

      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
      if (langCloseTimerRef.current) clearTimeout(langCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (navAreaRef.current && !navAreaRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, searchParams]);

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
      setHoveredIcon((value) => (value === "lang" ? null : value));
    }, 180);
  };

  const changeLanguage = (nextLocale: Locale) => {
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;

    const current = window.location.pathname || pathname || "/";
    const basePath = stripLocaleFromPath(current);
    const nextPath = localePath(nextLocale, basePath);

    closeAll();
    window.location.assign(nextPath + window.location.search + window.location.hash);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.push(localePath(locale, "/"));
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
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          <BrandLogo locale={locale} compact={isMobile} />
        </div>

        {!isMobile && (
          <div
            className="nav-center"
            style={{
              display: "flex",
              gap: 8,
              fontSize: 15,
              color: "#000",
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              const isHover = hoveredNav === item.key;

              return (
                <Link
                  key={item.key}
                  href={localePath(locale, item.path)}
                  className={[
                    "liquidGlassNavItem",
                    isActive ? "liquidGlassNavActive" : "",
                    isHover ? "liquidGlassNavHover" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => openMenu(item.key)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: isActive ? 800 : 600,
                    textDecoration: "none",
                    position: "relative",
                    background: "transparent",
                    border: "1px solid transparent",
                    color: "#111",
                    transform: "none",
                  }}
                >
                  {pickLocaleText(item.name, locale)}
                </Link>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <div
            className="nav-icons-desktop"
            style={{
              display: "flex",
              gap: 12,
              position: "relative",
            }}
          >
            <Link
              href={localePath(locale, "/contact")}
              onClick={closeAll}
              onMouseEnter={() => setHoveredIcon("contact")}
              onMouseLeave={() =>
                setHoveredIcon((value) => (value === "contact" ? null : value))
              }
              className={[
                "liquidGlassNavItem",
                hoveredIcon === "contact" ? "liquidGlassNavHover" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                ...iconBtn,
                width: "auto",
                padding: "0 14px",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 800,
              }}
              aria-label={accountLabels.contact}
            >
              <span>{accountLabels.contact}</span>
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
                className={[
                  "liquidGlassNavItem",
                  hoveredIcon === "lang" || showLangMenu ? "liquidGlassNavHover" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={iconBtn}
                onClick={() => {
                  if (!isReady) return;
                  updateLangMenuPosition();
                  setShowLangMenu((value) => !value);
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
                  href={localePath(locale, "/login")}
                  onClick={closeAll}
                  onMouseEnter={() => setHoveredIcon("login")}
                  onMouseLeave={() =>
                    setHoveredIcon((value) => (value === "login" ? null : value))
                  }
                  className={[
                    "liquidGlassNavItem",
                    hoveredIcon === "login" ? "liquidGlassNavHover" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    ...iconBtn,
                    textDecoration: "none",
                  }}
                  aria-label={accountLabels.login}
                >
                  <span>👤</span>
                </Link>
              ) : (
                <button
                  className={[
                    "liquidGlassNavItem",
                    hoveredIcon === "user" || showUserMenu ? "liquidGlassNavHover" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={iconBtn}
                  onMouseEnter={() => setHoveredIcon("user")}
                  onMouseLeave={() =>
                    setHoveredIcon((value) => (value === "user" ? null : value))
                  }
                  onClick={() => {
                    setShowUserMenu((value) => !value);
                    setShowLangMenu(false);
                    setActiveMenu(null);
                  }}
                  type="button"
                  aria-label="User menu"
                  title={user.email ?? userDisplayName}
                >
                  {userDisplayName.charAt(0).toUpperCase()}
                </button>
              )}

              {showUserMenu && user && (
                <div
                  style={{
                    position: "absolute",
                    top: 42,
                    right: 0,
                    width: 280,
                    borderRadius: 24,
                    zIndex: 10002,
                    padding: "10px 0",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 18px 42px rgba(15,23,42,0.12)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 850,
                        color: "#111827",
                      }}
                    >
                      {userDisplayName}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 4,
                      }}
                    >
                      {user.email}
                    </div>
                  </div>

                  <Link href={localePath(locale, "/account")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.account}
                  </Link>
                  <Link href={localePath(locale, "/account/profile")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.profile}
                  </Link>
                  <Link href={localePath(locale, "/account/security")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.security}
                  </Link>
                  <Link href={localePath(locale, "/account/favorites")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.favorites}
                  </Link>
                  <Link href={localePath(locale, "/account/history")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.history}
                  </Link>
                  <Link href={localePath(locale, "/account/downloads")} onClick={closeAll} style={userMenuLinkStyle}>
                    {accountLabels.downloads}
                  </Link>

                  <button
                    onClick={handleLogout}
                    type="button"
                    style={{
                      ...userMenuLinkStyle,
                      borderTop: "1px solid rgba(0,0,0,0.06)",
                      marginTop: 4,
                      paddingTop: 12,
                      color: "#d11a2a",
                      fontWeight: 800,
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
          <div
            className="nav-icons-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <button
              className="mobile-menu-btn"
              onClick={() => {
                setMobileOpen((value) => !value);
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
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,251,0.88))",
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow:
              "0 18px 42px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          {locales.map((item) => (
            <button
              key={item}
              onClick={() => changeLanguage(item)}
              type="button"
              style={{
                padding: "10px 18px",
                border: "none",
                background: locale === item ? "rgba(255,255,255,0.82)" : "transparent",
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
              {languageNames[item]}
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
            {currentMega.cards.map((card, index) => {
              const title = pickLocaleText(card.title, locale);
              const desc = pickLocaleText(card.desc, locale);
              const badge = pickLocaleText(card.badge, locale);

              return (
                <Link
                  key={`mega-card-${index}`}
                  href={localePath(locale, card.route)}
                  onClick={closeAll}
                  style={{ textDecoration: "none" }}
                >
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
                          fontWeight: 900,
                          color: "#111",
                          padding: "4px 8px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(255,255,255,0.72)",
                        }}
                      >
                        {badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 850,
                        color: "#000",
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </h3>

                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.55,
                        color: "#4b5563",
                        margin: 0,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
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
            {currentMega.links.map((link, index) => {
              const label = pickLinkText(link, locale);

              return (
                <Link
                  key={`mega-link-${index}`}
                  href={localePath(locale, link.route)}
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
            minHeight: `calc(100vh - ${NAV_H}px)`,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,251,0.86))",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
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
              href={localePath(locale, item.path)}
              onClick={closeAll}
              style={mobileLinkStyle}
            >
              {pickLocaleText(item.name, locale)}
            </Link>
          ))}

          <Link href={localePath(locale, "/contact")} onClick={closeAll} style={mobileLinkStyle}>
            {accountLabels.contact}
          </Link>

          {!user && (
            <Link href={localePath(locale, "/login")} onClick={closeAll} style={mobileLinkStyle}>
              {accountLabels.login}
            </Link>
          )}

          {user && (
            <div
              style={{
                borderTop: "1px solid #eeeeee",
                paddingTop: 14,
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Link href={localePath(locale, "/account")} onClick={closeAll} style={mobileLinkStyle}>
                {accountLabels.account}
              </Link>

              <Link href={localePath(locale, "/account/profile")} onClick={closeAll} style={mobileLinkStyle}>
                {accountLabels.profile}
              </Link>

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
            </div>
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
            {locales.map((item) => (
              <button
                key={item}
                onClick={() => changeLanguage(item)}
                type="button"
                style={{
                  padding: "8px 12px",
                  border: "1px solid #eeeeee",
                  borderRadius: 999,
                  background: locale === item ? "#111" : "#ffffff",
                  color: locale === item ? "#ffffff" : "#111",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {languageNames[item]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
