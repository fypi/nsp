import Link from "next/link";

type Locale = "zh" | "zh-TW" | "en";
type LText = Record<Locale, string>;

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "en";
}

function t(value: LText, locale: Locale) {
  return value[locale] ?? value.en;
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

const container = { width: "100%", maxWidth: 1080, margin: "0 auto" } as const;
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
  maxWidth: 820,
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
const paragraph = { fontSize: 15, lineHeight: 1.8, color: "#4b5563", marginBottom: 12 } as const;
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

const info = {
  "title": {
    "zh": "支持中心",
    "zh-TW": "支援中心",
    "en": "Support"
  },
  "lead": {
    "zh": "查看帮助、FAQ、反馈、隐私、用户协议、免责声明和联系方式。",
    "zh-TW": "查看幫助、FAQ、反饋、隱私、使用者協議、免責聲明和聯絡方式。",
    "en": "Find help, FAQ, feedback, privacy, terms, disclaimers, and contact options."
  }
} as const;


export async function generateMetadata({ params }: { params: { locale?: string } }) {
  const locale = normalizeLocale(params?.locale);
  return { title: `${t(info.title, locale)} — NinesPro`, description: t(info.lead, locale) };
}
export default function Page({ params }: { params: { locale?: string } }) {
  const locale = normalizeLocale(params?.locale);

  return (
    <main style={pageShell}>
      <section style={container}>
        <h1 style={titleStyle}>{t(info.title, locale)}</h1>
        <p style={leadStyle}>{t(info.lead, locale)}</p>

        <div style={gridStyle}>
          <Link
            href={localePath(locale, "/help")}
            style={{ ...cardStyle, textDecoration: "none", display: "block" }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 850,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              {locale === "en" ? "Help" : locale === "zh-TW" ? "說明中心" : "帮助中心"}
            </h2>
            <p style={paragraph}>
              {locale === "en"
                ? "Start with guidance and quick help."
                : locale === "zh-TW"
                  ? "從說明與快速指引開始。"
                  : "从说明与快速指引开始。"}
            </p>
            <span style={pill}>{locale === "en" ? "Open" : locale === "zh-TW" ? "進入" : "进入"}</span>
          </Link>

          <Link
            href={localePath(locale, "/faq")}
            style={{ ...cardStyle, textDecoration: "none", display: "block" }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 850,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              {locale === "en" ? "FAQ" : "FAQ"}
            </h2>
            <p style={paragraph}>
              {locale === "en"
                ? "Common questions and usage notes."
                : locale === "zh-TW"
                  ? "常見問題與使用說明。"
                  : "常见问题与使用说明。"}
            </p>
            <span style={pill}>{locale === "en" ? "Open" : locale === "zh-TW" ? "進入" : "进入"}</span>
          </Link>

          <Link
            href={localePath(locale, "/privacy")}
            style={{ ...cardStyle, textDecoration: "none", display: "block" }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 850,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              {locale === "en" ? "Privacy" : "隐私与法律"}
            </h2>
            <p style={paragraph}>
              {locale === "en"
                ? "Privacy policy and related notices."
                : locale === "zh-TW"
                  ? "隱私政策與相關通知。"
                  : "隐私政策与相关通知。"}
            </p>
            <span style={pill}>{locale === "en" ? "Open" : locale === "zh-TW" ? "進入" : "进入"}</span>
          </Link>

          <Link
            href={localePath(locale, "/feedback")}
            style={{ ...cardStyle, textDecoration: "none", display: "block" }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 850,
                color: "#111827",
                marginBottom: 10,
              }}
            >
              {locale === "en" ? "Feedback" : locale === "zh-TW" ? "反饋入口" : "反馈入口"}
            </h2>
            <p style={paragraph}>
              {locale === "en"
                ? "Report issues and request features."
                : locale === "zh-TW"
                  ? "提交問題與功能需求。"
                  : "提交问题与功能需求。"}
            </p>
            <span style={pill}>{locale === "en" ? "Open" : locale === "zh-TW" ? "進入" : "进入"}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
