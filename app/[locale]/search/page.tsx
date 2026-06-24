
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


export async function generateMetadata() {
  return { title: "全站搜索 — NinesPro", description: "搜索工具、文书模板、知识内容、经典和页面。" };
}

export default function Page() {
  return (
    <main style={pageShell}>
      <section style={container}>
        <div style={eyebrow}>Search</div>
        <h1 style={titleStyle}>全站搜索</h1>
        <p style={leadStyle}>搜索功能将支持工具、文书、知识、经典、页面分组结果。当前先上线入口和结构，后续接入索引与用户搜索历史。</p>
        <div style={cardStyle}>
          <input aria-label="Search" placeholder="搜索工具、文书、知识……" style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #e5e7eb", fontSize: 16 }} />
          <p style={{...paragraph, marginTop: 14}}>搜索索引建设中。正式上线后将支持登录用户保存搜索历史。</p>
        </div>
      </section>
    </main>
  );
}
