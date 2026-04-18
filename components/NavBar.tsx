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

const navTexts = {
  en: {
    home: "Home", products: "Products", tools: "Tools", support: "Support",
    login: "Sign In", account: "Account", logout: "Sign Out",
    speedTest: "Speed Test", ipIntelligence: "IP Intelligence", aiTools: "AI Tools",
    ipInspector: "IP Inspector", cacheCleaner: "Cache Cleaner",
    faq: "FAQ", contact: "Contact Us", help: "Help",
  },
  zh: {
    home: "首页", products: "产品", tools: "工具", support: "支持",
    login: "登录", account: "账户中心", logout: "退出登录",
    speedTest: "极速测试", ipIntelligence: "IP 情报", aiTools: "AI 工具",
    ipInspector: "IP 检测", cacheCleaner: "缓存清理",
    faq: "常见问题", contact: "联系我们", help: "帮助",
  },
  "zh-TW": {
    home: "首頁", products: "產品", tools: "工具", support: "支援",
    login: "登入", account: "帳戶中心", logout: "登出",
    speedTest: "極速測試", ipIntelligence: "IP 情報", aiTools: "AI 工具",
    ipInspector: "IP 檢測", cacheCleaner: "快取清理",
    faq: "常見問題", contact: "聯絡我們", help: "幫助",
  },
};

const brandNames: Record<Locale, string> = { en: "NINESPRO", zh: "九域", "zh-TW": "九域" };

export default function Navbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [hoverProducts, setHoverProducts] = useState(false);
  const [hoverTools, setHoverTools] = useState(false);
  const [hoverSupport, setHoverSupport] = useState(false);
  const [hoverLang, setHoverLang] = useState(false);
  const [hoverUser, setHoverUser] = useState(false);
  const [hoverHelp, setHoverHelp] = useState(false);

  const locale = (params.locale as Locale) || "en";
  const t = navTexts[locale];
  const brandName = brandNames[locale];

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) => {
      setUser(sess?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const changeLanguage = (newLocale: Locale) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    const newPath = `/${newLocale}${pathname}`;
    router.push(newPath);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isActive = (key: string) => {
    if (key === 'home') return pathname === `/${locale}` || pathname === `/`;
    return pathname === `/${locale}/${key}` || pathname === `/${key}`;
  };

  const renderLogo = () => {
    if (locale === 'en') {
      return brandName.split('').map((char, i) => (
        <span key={i} className="tracking-widest">{char}</span>
      ));
    }
    return brandName;
  };

  // 客户端未挂载时，先渲染占位，避免水合错误
  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <div className="font-medium text-gray-900 text-lg tracking-wider">
          {renderLogo()}
        </div>
        <div className="flex-1"></div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <Link href={`/${locale}`} className="font-medium text-gray-900 text-lg tracking-wider">
          {renderLogo()}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div 
            className="relative"
            onMouseEnter={() => setHoverProducts(true)}
            onMouseLeave={() => setHoverProducts(false)}
          >
            <button className={`px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('products')
                ? "bg-white/30 backdrop-blur-md text-gray-900 border border-white/20"
                : "text-gray-900 hover:bg-white/30 hover:backdrop-blur-md"
            }`}>
              {t.products}
            </button>
            {hoverProducts && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl p-4 w-80 text-gray-900 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/${locale}/products#speed`} className="p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                    <div className="font-medium">{t.speedTest}</div>
                    <div className="text-xs text-gray-500 mt-1">Ultra-fast network test</div>
                  </Link>
                  <Link href={`/${locale}/products#ip`} className="p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                    <div className="font-medium">{t.ipIntelligence}</div>
                    <div className="text-xs text-gray-500 mt-1">IP reputation & geolocation</div>
                  </Link>
                  <Link href={`/${locale}/products#ai`} className="p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                    <div className="font-medium">{t.aiTools}</div>
                    <div className="text-xs text-gray-500 mt-1">Smart AI utilities</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setHoverTools(true)}
            onMouseLeave={() => setHoverTools(false)}
          >
            <button className={`px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('tools')
                ? "bg-white/30 backdrop-blur-md text-gray-900 border border-white/20"
                : "text-gray-900 hover:bg-white/30 hover:backdrop-blur-md"
            }`}>
              {t.tools}
            </button>
            {hoverTools && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl p-4 w-72 text-gray-900 shadow-xl">
                <Link href={`/${locale}/tools#ip`} className="block p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                  <div className="font-medium">{t.ipInspector}</div>
                  <div className="text-xs text-gray-500 mt-1">Inspect IP & network info</div>
                </Link>
                <Link href={`/${locale}/tools#cache`} className="block p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                  <div className="font-medium">{t.cacheCleaner}</div>
                  <div className="text-xs text-gray-500 mt-1">Clean Windows installer cache</div>
                </Link>
              </div>
            )}
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setHoverSupport(true)}
            onMouseLeave={() => setHoverSupport(false)}
          >
            <button className={`px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('support')
                ? "bg-white/30 backdrop-blur-md text-gray-900 border border-white/20"
                : "text-gray-900 hover:bg-white/30 hover:backdrop-blur-md"
            }`}>
              {t.support}
            </button>
            {hoverSupport && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl p-4 w-64 text-gray-900 shadow-xl">
                <Link href={`/${locale}/support#faq`} className="block p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                  <div className="font-medium">{t.faq}</div>
                </Link>
                <Link href={`/${locale}/support#contact`} className="block p-3 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                  <div className="font-medium">{t.contact}</div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div 
            className="relative"
            onMouseEnter={() => setHoverHelp(true)}
            onMouseLeave={() => setHoverHelp(false)}
          >
            <button className="w-8 h-8 rounded-full hover:bg-white/30 hover:backdrop-blur-md transition flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#111827" strokeWidth="1.5" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.675 0 3.7l-4.242 3.701a1 1 0 0 0 1.414 0l4.242-3.7c1.172-1.025 1.172-2.675 0-3.7-1.171-1.025-3.071-1.025-4.242 0-1.172 1.025-1.172 2.675 0 3.7l4.242 3.701a1 1 0 0 0 1.414 0l4.242-3.7c1.172-1.025 1.172-2.675 0-3.7-1.171-1.025-3.071-1.025-4.242 0-1.172 1.025-1.172 2.675 0 3.7z" />
              </svg>
            </button>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setHoverLang(true)}
            onMouseLeave={() => setHoverLang(false)}
          >
            <button className="w-8 h-8 rounded-full hover:bg-white/30 hover:backdrop-blur-md transition flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#111827" strokeWidth="1.5" viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15 15 0 0 1 0 20" />
                <path d="M4.93 4.93a15.016 15.016 0 0 0 14.14 0" />
                <path d="M4.93 19.07a15.016 15.016 0 0 1 14.14 0" />
              </svg>
            </button>
            {hoverLang && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl p-4 w-64 text-gray-900 shadow-xl">
                <div className="text-sm font-medium mb-3">Asia Pacific</div>
                {locales.map((loc) => (
                  <button 
                    key={loc} 
                    onClick={() => changeLanguage(loc)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition"
                  >
                    {languageNames[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setHoverUser(true)}
            onMouseLeave={() => setHoverUser(false)}
          >
            <button className="w-8 h-8 rounded-full hover:bg-white/30 hover:backdrop-blur-md transition flex items-center justify-center">
              {!user ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#111827" strokeWidth="1.5" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ) : (
                <span className="text-gray-900 font-medium text-sm">
                  {user.email?.[0].toUpperCase()}
                </span>
              )}
            </button>
            {hoverUser && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl p-2 w-40 text-gray-900 shadow-xl">
                {!user ? (
                  <Link href={`/${locale}/login`} className="block px-3 py-2 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                    {t.login}
                  </Link>
                ) : (
                  <>
                    <Link href={`/${locale}/account`} className="block px-3 py-2 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                      {t.account}
                    </Link>
                    <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition">
                      {t.logout}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
