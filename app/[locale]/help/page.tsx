type Locale = "en" | "zh" | "zh-TW";

const texts = {
  zh: {
    title: "帮助中心",
    desc: "如有使用问题，请查看常见问题或联系客服。",
    home: "首页",
    support: "支持中心",
    contact: "联系方式",
    start: "你可以先回到首页查看产品、方案和工具入口；如果已经遇到具体问题，直接进入支持中心或联系方式页面更快。",
  },
  "zh-TW": {
    title: "說明中心",
    desc: "如有使用問題，請查看常見問題或聯繫客服。",
    home: "首頁",
    support: "支援中心",
    contact: "聯絡方式",
    start: "你可以先回到首頁查看產品、方案和工具入口；如果已經遇到具體問題，直接進入支援中心或聯絡方式頁面更快。",
  },
  en: {
    title: "Help Center",
    desc: "For questions, please check FAQs or contact support.",
    home: "Home",
    support: "Support",
    contact: "Contact",
    start: "You can start from the home page to view products, solutions, and tool entries. If you already have a specific issue, going directly to Support or Contact is faster.",
  },
} as const;

export default function HelpPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params?.locale || "zh") as Locale;
  const t = texts[locale] || texts.zh;

  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", color: "#000" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>{t.title}</h1>
          <p style={{ lineHeight: "1.7", marginBottom: "18px" }}>{t.desc}</p>
          <p style={{ lineHeight: "1.8" }}>{t.start}</p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`/${locale}`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
              }}
            >
              {t.home}
            </a>

            <a
              href={`/${locale}/support`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
              }}
            >
              {t.support}
            </a>

            <a
              href={`/${locale}/contact`}
              style={{
                color: "#111",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "14px",
              }}
            >
              {t.contact}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
