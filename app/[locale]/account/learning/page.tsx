
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


export async function generateMetadata() { return { title: "学习记录 — NinesPro" }; }

export default function Page() {
  return (
    <main style={pageShell}>
      <section style={container}>
        <div style={eyebrow}>Account</div>
        <h1 style={titleStyle}>学习记录</h1>
        <p style={leadStyle}>该功能将用于保存用户的学习记录。需要登录后使用，后续接入 Supabase 数据表。</p>
        <article style={cardStyle}><p style={paragraph}>当前页面先作为正规入口上线，避免账户中心出现死链。</p></article>
      </section>
    </main>
  );
}
