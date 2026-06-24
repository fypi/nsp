
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


const content = {"eyebrow": {"zh": "常见问题", "zh-TW": "常見問題", "en": "FAQ"}, "title": {"zh": "常见问题与使用说明", "zh-TW": "常見問題與使用說明", "en": "Frequently asked questions"}, "lead": {"zh": "这里整理网站使用、账户、文书模板、学习工具、下载和隐私相关的常见问题。", "zh-TW": "這裡整理網站使用、帳戶、文書模板、學習工具、下載和隱私相關的常見問題。", "en": "Find answers about site usage, accounts, document templates, learning tools, downloads, and privacy."}, "sections": [("工具是否免费", "基础工具会优先开放使用，部分高级功能可能后续登录后使用。"), ("文书能否直接使用", "文书生成内容用于参考和编辑，不保证适用于所有法律或商业场景。"), ("为什么需要登录", "登录后可以保存收藏、历史、下载记录、学习记录和生成过的文书。")]};

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
