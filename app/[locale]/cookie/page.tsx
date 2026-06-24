
type Locale = "zh" | "zh-TW" | "en";

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, route: string) {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  if (locale === "en") return cleanRoute === "/" ? "/" : cleanRoute;
  return `/${locale}${cleanRoute === "/" ? "" : cleanRoute}`;
}

const pageShell = {
  minHeight: "100vh",
  padding: "92px 24px 72px",
  background:
    "radial-gradient(circle at 50% 0%, rgba(126,177,231,0.08), rgba(255,255,255,0) 34%), #ffffff",
} as const;

const container = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
} as const;

const eyebrow = {
  fontSize: 13,
  fontWeight: 850,
  color: "#2563eb",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 12,
} as const;

const titleStyle = {
  fontSize: "clamp(32px, 5vw, 52px)",
  lineHeight: 1.05,
  letterSpacing: "-0.05em",
  color: "#05070a",
  marginBottom: 18,
} as const;

const leadStyle = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "#4b5563",
  maxWidth: 780,
  marginBottom: 34,
} as const;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 18,
} as const;

const cardStyle = {
  borderRadius: 28,
  padding: 22,
  background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(247,248,250,0.92))",
  border: "1px solid rgba(15,23,42,0.06)",
  boxShadow: "0 18px 46px rgba(15,23,42,0.055), inset 0 1px 0 rgba(255,255,255,0.95)",
} as const;

const sectionTitle = {
  fontSize: 22,
  fontWeight: 850,
  color: "#111827",
  margin: "34px 0 14px",
} as const;

const paragraph = {
  fontSize: 15,
  lineHeight: 1.8,
  color: "#4b5563",
  marginBottom: 12,
} as const;

const pill = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 32,
  padding: "7px 12px",
  borderRadius: 999,
  background: "#f3f4f6",
  color: "#374151",
  fontSize: 13,
  fontWeight: 800,
  marginRight: 8,
  marginBottom: 8,
} as const;


const content = {"eyebrow": {"zh": "Cookie / 数据说明", "zh-TW": "Cookie / 資料說明", "en": "Cookie and Data Notice"}, "title": {"zh": "Cookie、访问记录和数据使用说明", "zh-TW": "Cookie、訪問記錄和資料使用說明", "en": "Cookie, analytics, and data usage notice"}, "lead": {"zh": "网站可能使用必要 Cookie 保持登录状态，并在后续接入访问统计、收藏、历史记录和下载记录功能。", "zh-TW": "網站可能使用必要 Cookie 保持登入狀態，並在後續接入訪問統計、收藏、歷史記錄和下載記錄功能。", "en": "The site may use necessary cookies for login sessions and may later support analytics, favorites, history, and download records."}, "sections": [("必要 Cookie", "用于登录、安全和基本功能。"), ("统计数据", "用于了解页面访问、设备类型和功能使用情况，帮助优化网站。"), ("用户选择", "后续如接入第三方统计，将补充同意管理和关闭选项。")]};

export async function generateMetadata({ params }: { params: { locale?: string } }) {
  const locale = normalizeLocale(params?.locale);
  return {
    title: `${content.title[locale]} — NinesPro`,
    description: content.lead[locale],
  };
}

export default function Page({ params }: { params: { locale?: string } }) {
  const locale = normalizeLocale(params?.locale);
  return (
    <main style={pageShell}>
      <section style={container}>
        <div style={eyebrow}>{content.eyebrow[locale]}</div>
        <h1 style={titleStyle}>{content.title[locale]}</h1>
        <p style={leadStyle}>{content.lead[locale]}</p>
        <div style={{ display: "grid", gap: 18 }}>
          {content.sections.map((item: [string, string]) => (
            <article key={item[0]} style={cardStyle}>
              <h2 style={{ fontSize: 20, fontWeight: 850, color: "#111827", marginBottom: 10 }}>{item[0]}</h2>
              <p style={paragraph}>{item[1]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
