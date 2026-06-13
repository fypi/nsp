import Link from "next/link";

type Locale = "en" | "zh" | "zh-TW";

type HelpText = {
  title: string;
  desc: string;
  start: string;
  home: string;
  support: string;
  contact: string;
};

function normalizeLocale(locale?: string): Locale {
  if (locale === "en") return "en";
  if (locale === "zh") return "zh";
  if (locale === "zh-TW" || locale === "zh-tw") return "zh-TW";

  return "zh";
}

const texts: Record<Locale, HelpText> = {
  zh: {
    title: "帮助中心",
    desc: "如有使用问题，请查看常见问题或联系客服。",
    home: "首页",
    support: "支持中心",
    contact: "联系方式",
    start:
      "你可以先回到首页查看产品、方案和工具入口；如果已经遇到具体问题，直接进入支持中心或联系方式页面更快。",
  },

  "zh-TW": {
    title: "說明中心",
    desc: "如有使用問題，請查看常見問題或聯絡客服。",
    home: "首頁",
    support: "支援中心",
    contact: "聯絡方式",
    start:
      "你可以先回到首頁查看產品、方案和工具入口；如果已經遇到具體問題，直接進入支援中心或聯絡方式頁面更快。",
  },

  en: {
    title: "Help Center",
    desc: "For questions, please check FAQs or contact support.",
    home: "Home",
    support: "Support",
    contact: "Contact",
    start:
      "You can start from the home page to view products, solutions, and tool entries. If you already have a specific issue, going directly to Support or Contact is faster.",
  },
};

export default function HelpPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = normalizeLocale(params?.locale);
  const t = texts[locale];

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <p>{t.start}</p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/${locale}`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {t.home}
            </Link>

            <Link
              href={`/${locale}/support`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {t.support}
            </Link>

            <Link
              href={`/${locale}/contact`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {t.contact}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}