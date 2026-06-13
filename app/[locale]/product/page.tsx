import Link from "next/link";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

type PageParams = {
  params: {
    locale?: string;
  };
};

type LocalText = {
  zh: string;
  en: string;
  tw: string;
};

function normalizeLocale(locale?: string): Locale {
  if (locale === "en") return "en";
  if (locale === "zh-TW") return "zh-TW";
  return "zh";
}

function t(text: LocalText, locale: Locale) {
  if (locale === "en") return text.en;
  if (locale === "zh-TW") return text.tw;
  return text.zh;
}

const heroCopy: Record<Locale, JSX.Element> = {
  zh: (
    <>
      产品中心展示九域正在建设的能力矩阵：投研、工程、AI、文书知识、金融计算和定制服务。这里讲方向和场景；能直接使用的小工具，统一放在<span style={{ whiteSpace: "nowrap" }}>工具中心。</span>
    </>
  ),
  en: (
    <>
      Products show the capability matrix being built across research, engineering, AI, documents, financial calculation, and custom services. Ready-to-use tools are organized in the <span style={{ whiteSpace: "nowrap" }}>tool center.</span>
    </>
  ),
  "zh-TW": (
    <>
      產品中心展示九域正在建設的能力矩陣：投研、工程、AI、文書知識、金融計算和定制服務。這裡講方向和場景；可直接使用的小工具，統一放在<span style={{ whiteSpace: "nowrap" }}>工具中心。</span>
    </>
  ),
};

const productCards = [
  {
    icon: "🔍",
    category: { zh: "研究", en: "Research", tw: "研究" },
    title: { zh: "智能投研", en: "Research Intelligence", tw: "智能投研" },
    desc: {
      zh: "面向股票、基金、行业和资产配置的研究辅助能力。",
      en: "Research support for stocks, funds, industries, and allocation workflows.",
      tw: "面向股票、基金、產業和資產配置的研究輔助能力。",
    },
    points: {
      zh: ["研究资料整理", "标的跟踪", "风险提示与复盘"],
      en: ["Research material organization", "Target tracking", "Risk notes and review"],
      tw: ["研究資料整理", "標的追蹤", "風險提示與復盤"],
    },
    cta: { zh: "查看方案", en: "View solution", tw: "查看方案" },
    href: "/solution",
  },
  {
    icon: "🛠️",
    category: { zh: "工程", en: "Engineering", tw: "工程" },
    title: { zh: "网络与系统工程", en: "Network & System Engineering", tw: "網路與系統工程" },
    desc: {
      zh: "网站、网络、部署、自动化和内部系统的工程落地。",
      en: "Engineering delivery for websites, networks, deployment, automation, and internal systems.",
      tw: "網站、網路、部署、自動化和內部系統的工程落地。",
    },
    points: {
      zh: ["官网与业务站点", "网络与部署排障", "自动化流程搭建"],
      en: ["Official and business sites", "Network and deployment troubleshooting", "Automation workflow setup"],
      tw: ["官網與業務站點", "網路與部署排障", "自動化流程搭建"],
    },
    cta: { zh: "了解能力", en: "Explore capability", tw: "了解能力" },
    href: "/solution",
  },
  {
    icon: "🤖",
    category: { zh: "AI", en: "AI", tw: "AI" },
    title: { zh: "AI 产品与 Agent", en: "AI Products & Agents", tw: "AI 產品與 Agent" },
    desc: {
      zh: "把 AI 接入具体业务流程，形成可执行的 Agent 系统。",
      en: "Connect AI to business workflows and build executable agent systems.",
      tw: "把 AI 接入具體業務流程，形成可執行的 Agent 系統。",
    },
    points: {
      zh: ["AI 助手工作流", "多 Agent 协作", "业务流程自动化"],
      en: ["AI assistant workflows", "Multi-agent collaboration", "Business process automation"],
      tw: ["AI 助手工作流", "多 Agent 協作", "業務流程自動化"],
    },
    cta: { zh: "查看方案", en: "View solution", tw: "查看方案" },
    href: "/solution",
  },
  {
    icon: "📄",
    category: { zh: "知识", en: "Knowledge", tw: "知識" },
    title: { zh: "文书与知识工具", en: "Documents & Knowledge Tools", tw: "文書與知識工具" },
    desc: {
      zh: "围绕文书模板、学习资料、知识整理和内容生成。",
      en: "Templates, learning materials, knowledge organization, and content generation.",
      tw: "圍繞文書模板、學習資料、知識整理和內容生成。",
    },
    points: {
      zh: ["文书模板", "知识库整理", "学习与内容辅助"],
      en: ["Document templates", "Knowledge base organization", "Learning and content support"],
      tw: ["文書模板", "知識庫整理", "學習與內容輔助"],
    },
    cta: { zh: "查看工具", en: "View tools", tw: "查看工具" },
    href: "/tool/document-template",
  },
  {
    icon: "🧮",
    category: { zh: "计算", en: "Calculation", tw: "計算" },
    title: { zh: "金融计算与决策辅助", en: "Financial Calculation & Decision Support", tw: "金融計算與決策輔助" },
    desc: {
      zh: "提供计算、对比和记录能力，用于学习、测算和辅助判断。",
      en: "Calculation, comparison, and recording tools for learning, modeling, and support.",
      tw: "提供計算、對比和記錄能力，用於學習、測算和輔助判斷。",
    },
    points: {
      zh: ["复利与收益测算", "方案对比", "风险提示"],
      en: ["Compound and return calculation", "Plan comparison", "Risk notes"],
      tw: ["複利與收益測算", "方案對比", "風險提示"],
    },
    cta: { zh: "查看示例", en: "View examples", tw: "查看範例" },
    href: "/tool/compound-interest",
  },
  {
    icon: "🧩",
    category: { zh: "定制", en: "Custom", tw: "定制" },
    title: { zh: "定制服务", en: "Custom Services", tw: "定制服務" },
    desc: {
      zh: "针对明确业务场景，定制网站、工具、系统和自动化流程。",
      en: "Custom websites, tools, systems, and automation for concrete business scenarios.",
      tw: "針對明確業務場景，定制網站、工具、系統和自動化流程。",
    },
    points: {
      zh: ["企业工具系统", "内部流程自动化", "专项项目落地"],
      en: ["Enterprise tool systems", "Internal workflow automation", "Project delivery"],
      tw: ["企業工具系統", "內部流程自動化", "專項項目落地"],
    },
    cta: { zh: "联系咨询", en: "Contact us", tw: "聯絡諮詢" },
    href: "/contact",
  },
];

const customCards = [
  {
    icon: "📚",
    title: { zh: "企业文书体系", en: "Enterprise Document System", tw: "企業文書體系" },
    desc: {
      zh: "围绕合同、流程、模板和内部规范，搭建可持续维护的文书系统。",
      en: "Build maintainable document systems around contracts, workflows, templates, and policies.",
      tw: "圍繞合約、流程、模板和內部規範，搭建可持續維護的文書系統。",
    },
  },
  {
    icon: "🗂️",
    title: { zh: "内部知识库", en: "Internal Knowledge Base", tw: "內部知識庫" },
    desc: {
      zh: "把分散资料、流程和经验沉淀成可查询、可复用的知识资产。",
      en: "Turn scattered materials, processes, and experience into searchable reusable knowledge assets.",
      tw: "把分散資料、流程和經驗沉澱成可查詢、可復用的知識資產。",
    },
  },
  {
    icon: "⚙️",
    title: { zh: "AI 自动化工作流", en: "AI Automation Workflow", tw: "AI 自動化工作流" },
    desc: {
      zh: "把重复操作、内容整理、数据处理和多步骤任务接成自动流程。",
      en: "Connect repetitive operations, content organization, data processing, and multi-step tasks into automated workflows.",
      tw: "把重複操作、內容整理、資料處理和多步驟任務接成自動流程。",
    },
  },
  {
    icon: "🧰",
    title: { zh: "专属工具系统", en: "Dedicated Tool System", tw: "專屬工具系統" },
    desc: {
      zh: "针对明确业务场景定制网页工具、后台系统、表单流和自动化能力。",
      en: "Custom web tools, admin systems, form flows, and automation for specific scenarios.",
      tw: "針對明確業務場景定制網頁工具、後台系統、表單流和自動化能力。",
    },
  },
];

const iconStyle = {
  width: 34,
  height: 34,
  borderRadius: 17,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 17,
  background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(243,246,249,0.72))",
  border: "1px solid rgba(255,255,255,0.92)",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.96)",
} as const;

function ActionButton({ href, label, locale }: { href: string; label: LocalText; locale: Locale }) {
  return (
    <Link
      href={`/${locale}${href}`}
      className="liquidGlassPill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        textDecoration: "none",
      }}
    >
      {t(label, locale)}
    </Link>
  );
}

export default function ProductPage({ params }: PageParams) {
  const locale = normalizeLocale(params?.locale);

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{t({ zh: "产品中心", en: "Products", tw: "產品中心" }, locale)}</h1>
          <p
            style={{
              maxWidth: 760,
              margin: "0 auto",
              textAlign: "left",
              lineHeight: 1.85,
              textWrap: "normal",
            }}
          >
            {heroCopy[locale]}
          </p>
        </section>

        <section className="subpage-section">
          <h2>{t({ zh: "能力矩阵", en: "Capability Matrix", tw: "能力矩陣" }, locale)}</h2>
          <p>
            {t(
              {
                zh: "每条产品线都围绕一个目标：把复杂问题拆成能理解、能执行、能持续迭代的系统。",
                en: "Every product line focuses on one goal: turning complex problems into systems that are understandable, executable, and iteratable.",
                tw: "每條產品線都圍繞一個目標：把複雜問題拆成能理解、能執行、能持續迭代的系統。",
              },
              locale
            )}
          </p>

          <div className="card-grid">
            {productCards.map((card) => (
              <article key={card.title.zh} className="card liquidGlassCard">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span aria-hidden="true" style={iconStyle}>
                    {card.icon}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#6b7280", lineHeight: 1 }}>
                    {t(card.category, locale)}
                  </span>
                </div>

                <h3>{t(card.title, locale)}</h3>
                <p>{t(card.desc, locale)}</p>

                <ul style={{ marginTop: 12, marginBottom: 18, paddingLeft: 18, color: "#111827", fontSize: 14, lineHeight: 1.7 }}>
                  {card.points[locale === "zh-TW" ? "tw" : locale].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <p style={{ margin: 0 }}>
                  <ActionButton href={card.href} label={card.cta} locale={locale} />
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t({ zh: "产品与工具的区别", en: "Products vs. Tools", tw: "產品與工具的區別" }, locale)}</h2>
          <p>
            {t(
              {
                zh: "产品中心讲的是长期能力和业务方向；工具中心放的是可以直接打开使用的具体工具。如果你只是要格式化 JSON、对比文本、计算复利或生成文书模板，可以直接去工具中心。如果你需要把一套流程、网站、知识库或自动化系统做出来，可以从产品中心了解能力后联系我们。",
                en: "Products explain long-term capabilities and business directions; tools are ready-to-use utilities. For JSON formatting, text diff, compound interest, or document templates, go directly to the tool center. For workflows, websites, knowledge bases, or automation systems, start here and contact us.",
                tw: "產品中心講的是長期能力和業務方向；工具中心放的是可以直接打開使用的具體工具。如果只是要格式化 JSON、對比文字、計算複利或生成文書模板，可以直接去工具中心。如果需要把一套流程、網站、知識庫或自動化系統做出來，可以從產品中心了解能力後聯絡我們。",
              },
              locale
            )}
          </p>
        </section>

        <section className="subpage-section">
          <h2>{t({ zh: "定制服务", en: "Custom Services", tw: "定制服務" }, locale)}</h2>
          <p>
            {t(
              {
                zh: "如果标准工具无法覆盖你的业务流程，可以按实际场景定制专属工具、内部系统、知识库或 AI 自动化流程。",
                en: "When standard tools cannot cover a business workflow, custom tools, internal systems, knowledge bases, or AI automation workflows can be built for specific scenarios.",
                tw: "如果標準工具無法覆蓋你的業務流程，可以按實際場景定制專屬工具、內部系統、知識庫或 AI 自動化流程。",
              },
              locale
            )}
          </p>

          <div className="card-grid">
            {customCards.map((card) => (
              <article key={card.title.zh} className="card liquidGlassCard">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span aria-hidden="true" style={iconStyle}>
                    {card.icon}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#6b7280", lineHeight: 1 }}>
                    {t({ zh: "定制", en: "Custom", tw: "定制" }, locale)}
                  </span>
                </div>

                <h3>{t(card.title, locale)}</h3>
                <p>{t(card.desc, locale)}</p>
                <p style={{ margin: 0, marginTop: 18 }}>
                  <ActionButton
                    href="/contact"
                    label={{ zh: "联系咨询", en: "Contact", tw: "聯絡諮詢" }}
                    locale={locale}
                  />
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
