"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type ToolStatus = "public" | "login" | "planned" | "custom";

type ToolItem = {
  title: string;
  desc: string;
  href?: string;
  status: ToolStatus;
};

type ToolPageText = {
  heroTitle: string;
  heroDesc: string;

  publicTitle: string;
  publicDesc: string;

  memberTitle: string;
  memberDesc: string;

  professionalTitle: string;
  professionalDesc: string;

  customTitle: string;
  customDesc: string;

  workflowTitle: string;
  workflowDesc: string;

  disclaimerTitle: string;
  disclaimerDesc: string;

  badges: Record<ToolStatus, string>;
  actions: Record<ToolStatus, string>;

  publicTools: ToolItem[];
  memberTools: ToolItem[];
  professionalTools: ToolItem[];
  customServices: ToolItem[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const toolPageText: Record<Locale, ToolPageText> = {
  zh: {
    heroTitle: "工具中心",
    heroDesc:
      "面向开发、文档、文本、计算与自动化场景的高效工具集合。公开工具可直接使用，高级能力将逐步接入账号、历史记录和智能辅助。",

    publicTitle: "即刻可用",
    publicDesc:
      "无需登录，打开即可使用。所有处理尽量在浏览器本地完成，适合快速调试、整理、计算和生成。",

    memberTitle: "登录后可用",
    memberDesc:
      "适合需要更长文本、更高频使用、历史记录和个人工作区的工具能力。",

    professionalTitle: "专业工具规划",
    professionalDesc:
      "更多面向开发、数据、文档和自动化的专业工具正在建设中，后续会陆续上线为可直接使用的正式功能。",

    customTitle: "定制服务",
    customDesc:
      "如果标准工具无法覆盖你的业务流程，可以按实际场景定制专属工具、内部系统、知识库或 AI 自动化流程。",

    workflowTitle: "效率工作流",
    workflowDesc:
      "九域工具中心的目标不是堆砌功能，而是把高频操作变成清晰、稳定、可复用的工作流：输入明确、处理快速、结果可复制、数据可控。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "工具结果仅供学习、效率辅助和一般信息参考。涉及投资、法律、财务、合同或关键业务决策时，请结合实际情况核验，并咨询相关专业人士。",

    badges: {
      public: "公开",
      login: "登录后",
      planned: "规划中",
      custom: "定制",
    },

    actions: {
      public: "打开工具",
      login: "登录后使用",
      planned: "即将推出",
      custom: "联系咨询",
    },

    publicTools: [
      {
        title: "JSON 格式化",
        desc: "格式化、压缩和校验 JSON，适合接口调试、配置检查和数据整理。",
        href: "/tool/json-formatter",
        status: "public",
      },
      {
        title: "文本对比",
        desc: "逐行对比两段文本差异，适合文案修改、配置变更和代码片段检查。",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "Base64 工具",
        desc: "支持 Base64 编码与解码，适合常见文本转换和接口调试场景。",
        href: "/tool/base64",
        status: "public",
      },
      {
        title: "URL 编码 / 解码",
        desc: "处理 URL 参数、查询字符串和特殊字符编码，适合接口调试和链接整理。",
        href: "/tool/url-codec",
        status: "public",
      },
      {
        title: "复利计算器",
        desc: "估算长期投入、复利增长和收益变化，仅作学习和测算参考。",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "文书模板生成器",
        desc: "根据文书类型、语气和关键信息，生成可复制的起草模板。",
        href: "/tool/document-template",
        status: "public",
      },
    ],

    memberTools: [
      {
        title: "Markdown 预览",
        desc: "实时预览 Markdown，适合说明文档、笔记、草稿和知识整理。",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    professionalTools: [
      {
        title: "JWT 解码器",
        desc: "解析 JWT Header、Payload 和过期时间，用于登录排查和接口调试。",
        status: "planned",
      },
      {
        title: "正则测试器",
        desc: "测试正则表达式匹配结果，支持常见 flags、匹配统计和结果高亮。",
        status: "planned",
      },
      {
        title: "Cron 表达式解析器",
        desc: "解析定时任务表达式，预览未来执行时间，降低配置错误。",
        status: "planned",
      },
      {
        title: "文本清洗工具",
        desc: "去空行、去重复、提取邮箱/链接/数字、统计字数和行数。",
        status: "planned",
      },
      {
        title: "贷款计算器",
        desc: "计算月供、总利息和还款结构，支持等额本息与等额本金。",
        status: "planned",
      },
      {
        title: "图片压缩",
        desc: "压缩常见图片格式，减少网页和内容素材体积。",
        status: "planned",
      },
      {
        title: "PDF 合并",
        desc: "合并、整理和排序 PDF 文件，适合资料归档和文档处理。",
        status: "planned",
      },
      {
        title: "HTTP Header 检查器",
        desc: "查看响应头，辅助排查缓存、安全策略和部署配置。",
        status: "planned",
      },
    ],

    customServices: [
      {
        title: "企业文书体系",
        desc: "围绕合同、流程、模板和内部规范，搭建可持续维护的文书系统。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "内部知识库",
        desc: "把分散资料、流程和经验沉淀成可查询、可复用的知识资产。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI 自动化工作流",
        desc: "把重复操作、内容整理、数据处理和多步骤任务接成自动流程。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "专属工具系统",
        desc: "针对明确业务场景定制网页工具、后台系统、表单流和自动化能力。",
        href: "/contact",
        status: "custom",
      },
    ],
  },

  "zh-TW": {
    heroTitle: "工具中心",
    heroDesc:
      "面向開發、文件、文字、計算與自動化場景的高效工具集合。公開工具可直接使用，高級能力將逐步接入帳號、歷史記錄和智能輔助。",

    publicTitle: "即刻可用",
    publicDesc:
      "無需登入，打開即可使用。所有處理盡量在瀏覽器本地完成，適合快速調試、整理、計算和生成。",

    memberTitle: "登入後可用",
    memberDesc:
      "適合需要更長文字、更高頻使用、歷史記錄和個人工作區的工具能力。",

    professionalTitle: "專業工具規劃",
    professionalDesc:
      "更多面向開發、資料、文件和自動化的專業工具正在建設中，後續會陸續上線為可直接使用的正式功能。",

    customTitle: "定制服務",
    customDesc:
      "如果標準工具無法覆蓋你的業務流程，可以按實際場景定制專屬工具、內部系統、知識庫或 AI 自動化流程。",

    workflowTitle: "效率工作流",
    workflowDesc:
      "九域工具中心的目標不是堆砌功能，而是把高頻操作變成清晰、穩定、可復用的工作流：輸入明確、處理快速、結果可複製、資料可控。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "工具結果僅供學習、效率輔助和一般資訊參考。涉及投資、法律、財務、合同或關鍵業務決策時，請結合實際情況核驗，並諮詢相關專業人士。",

    badges: {
      public: "公開",
      login: "登入後",
      planned: "規劃中",
      custom: "定制",
    },

    actions: {
      public: "打開工具",
      login: "登入後使用",
      planned: "即將推出",
      custom: "聯絡諮詢",
    },

    publicTools: [
      {
        title: "JSON 格式化",
        desc: "格式化、壓縮和校驗 JSON，適合接口調試、配置檢查和資料整理。",
        href: "/tool/json-formatter",
        status: "public",
      },
      {
        title: "文字對比",
        desc: "逐行對比兩段文字差異，適合文案修改、配置變更和程式碼片段檢查。",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "Base64 工具",
        desc: "支援 Base64 編碼與解碼，適合常見文字轉換和接口調試場景。",
        href: "/tool/base64",
        status: "public",
      },
      {
        title: "URL 編碼 / 解碼",
        desc: "處理 URL 參數、查詢字串和特殊字元編碼，適合接口調試和連結整理。",
        href: "/tool/url-codec",
        status: "public",
      },
      {
        title: "複利計算器",
        desc: "估算長期投入、複利增長和收益變化，僅作學習和測算參考。",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "文書模板生成器",
        desc: "根據文書類型、語氣和關鍵資訊，生成可複製的起草模板。",
        href: "/tool/document-template",
        status: "public",
      },
    ],

    memberTools: [
      {
        title: "Markdown 預覽",
        desc: "即時預覽 Markdown，適合說明文件、筆記、草稿和知識整理。",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    professionalTools: [
      {
        title: "JWT 解碼器",
        desc: "解析 JWT Header、Payload 和過期時間，用於登入排查和接口調試。",
        status: "planned",
      },
      {
        title: "正則測試器",
        desc: "測試正則表達式匹配結果，支援常見 flags、匹配統計和結果高亮。",
        status: "planned",
      },
      {
        title: "Cron 表達式解析器",
        desc: "解析定時任務表達式，預覽未來執行時間，降低配置錯誤。",
        status: "planned",
      },
      {
        title: "文字清洗工具",
        desc: "去空行、去重複、提取郵箱/連結/數字、統計字數和行數。",
        status: "planned",
      },
      {
        title: "貸款計算器",
        desc: "計算月供、總利息和還款結構，支援等額本息與等額本金。",
        status: "planned",
      },
      {
        title: "圖片壓縮",
        desc: "壓縮常見圖片格式，減少網頁和內容素材體積。",
        status: "planned",
      },
      {
        title: "PDF 合併",
        desc: "合併、整理和排序 PDF 文件，適合資料歸檔和文件處理。",
        status: "planned",
      },
      {
        title: "HTTP Header 檢查器",
        desc: "查看響應頭，輔助排查快取、安全策略和部署配置。",
        status: "planned",
      },
    ],

    customServices: [
      {
        title: "企業文書體系",
        desc: "圍繞合同、流程、模板和內部規範，搭建可持續維護的文書系統。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "內部知識庫",
        desc: "把分散資料、流程和經驗沉澱成可查詢、可復用的知識資產。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI 自動化工作流",
        desc: "把重複操作、內容整理、資料處理和多步驟任務接成自動流程。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "專屬工具系統",
        desc: "針對明確業務場景定制網頁工具、後台系統、表單流和自動化能力。",
        href: "/contact",
        status: "custom",
      },
    ],
  },

  en: {
    heroTitle: "Tool Center",
    heroDesc:
      "A focused toolkit for development, documents, text processing, calculation, and automation. Public tools are ready to use immediately, while advanced capabilities will gradually connect with accounts, history, and intelligent assistance.",

    publicTitle: "Ready to Use",
    publicDesc:
      "No login required. Open and use instantly. Most processing is designed to run locally in the browser for fast debugging, cleanup, calculation, and generation.",

    memberTitle: "Available After Login",
    memberDesc:
      "Designed for longer content, higher-frequency usage, personal workspace, history, and advanced productivity capabilities.",

    professionalTitle: "Professional Tools Roadmap",
    professionalDesc:
      "More professional tools for development, data, documents, and automation are being built and will gradually become fully available features.",

    customTitle: "Custom Services",
    customDesc:
      "When standard tools cannot cover your workflow, NinesPro can build dedicated tools, internal systems, knowledge bases, or AI automation workflows around your scenario.",

    workflowTitle: "Productivity Workflow",
    workflowDesc:
      "The goal of the Tool Center is not to stack features, but to turn high-frequency actions into clear, stable, reusable workflows: precise input, fast processing, copyable output, and controllable data.",

    disclaimerTitle: "Notice:",
    disclaimerDesc:
      "Tool results are for learning, productivity assistance, and general informational reference only. For investment, legal, financial, contractual, or critical business decisions, please verify based on the actual situation and consult relevant professionals.",

    badges: {
      public: "Public",
      login: "Login",
      planned: "Planned",
      custom: "Custom",
    },

    actions: {
      public: "Open Tool",
      login: "Use After Login",
      planned: "Coming Soon",
      custom: "Contact Us",
    },

    publicTools: [
      {
        title: "JSON Formatter",
        desc: "Format, minify, and validate JSON for API debugging, configuration checks, and data cleanup.",
        href: "/tool/json-formatter",
        status: "public",
      },
      {
        title: "Text Diff",
        desc: "Compare two texts line by line for copy edits, configuration changes, and code snippet checks.",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "Base64 Tool",
        desc: "Encode and decode Base64 for common text conversion and API debugging scenarios.",
        href: "/tool/base64",
        status: "public",
      },
      {
        title: "URL Encode / Decode",
        desc: "Handle URL parameters, query strings, and special character encoding for API debugging and link cleanup.",
        href: "/tool/url-codec",
        status: "public",
      },
      {
        title: "Compound Interest Calculator",
        desc: "Estimate long-term contribution, compound growth, and return changes for learning and reference.",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "Document Template Generator",
        desc: "Choose a document type, tone, and key information to generate a copyable draft template.",
        href: "/tool/document-template",
        status: "public",
      },
    ],

    memberTools: [
      {
        title: "Markdown Preview",
        desc: "Preview Markdown in real time for documentation, notes, drafts, and knowledge organization.",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    professionalTools: [
      {
        title: "JWT Decoder",
        desc: "Inspect JWT Header, Payload, and expiration time for login troubleshooting and API debugging.",
        status: "planned",
      },
      {
        title: "Regex Tester",
        desc: "Test regular expression matches with common flags, match counts, and highlighted results.",
        status: "planned",
      },
      {
        title: "Cron Expression Parser",
        desc: "Parse scheduled task expressions and preview future run times to reduce configuration errors.",
        status: "planned",
      },
      {
        title: "Text Cleaner",
        desc: "Remove empty lines, deduplicate text, extract emails/links/numbers, and count words and lines.",
        status: "planned",
      },
      {
        title: "Loan Calculator",
        desc: "Calculate monthly payments, total interest, and repayment structure for common loan scenarios.",
        status: "planned",
      },
      {
        title: "Image Compression",
        desc: "Compress common image formats to reduce webpage and content asset size.",
        status: "planned",
      },
      {
        title: "PDF Merge",
        desc: "Merge, organize, and reorder PDF files for document processing and archiving.",
        status: "planned",
      },
      {
        title: "HTTP Header Checker",
        desc: "Inspect response headers to troubleshoot caching, security policies, and deployment configuration.",
        status: "planned",
      },
    ],

    customServices: [
      {
        title: "Enterprise Document System",
        desc: "Build a maintainable document system around contracts, workflows, templates, and internal standards.",
        href: "/contact",
        status: "custom",
      },
      {
        title: "Internal Knowledge Base",
        desc: "Turn scattered materials, processes, and experience into searchable and reusable knowledge assets.",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI Automation Workflow",
        desc: "Connect repetitive operations, content organization, data processing, and multi-step tasks into automated workflows.",
        href: "/contact",
        status: "custom",
      },
      {
        title: "Dedicated Tool System",
        desc: "Build web tools, admin systems, form flows, and automation capabilities for specific business scenarios.",
        href: "/contact",
        status: "custom",
      },
    ],
  },
};

export default function ToolPage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = toolPageText[locale];

  return (
    <main className="subpage-main">
      <div
        className="subpage-container"
        style={{
          maxWidth: 1120,
        }}
      >
        <div className="subpage-hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>

        <ToolSection
          title={t.publicTitle}
          desc={t.publicDesc}
          tools={t.publicTools}
          locale={locale}
          badges={t.badges}
          actions={t.actions}
        />

        <ToolSection
          title={t.memberTitle}
          desc={t.memberDesc}
          tools={t.memberTools}
          locale={locale}
          badges={t.badges}
          actions={t.actions}
        />

        <ToolSection
          title={t.professionalTitle}
          desc={t.professionalDesc}
          tools={t.professionalTools}
          locale={locale}
          badges={t.badges}
          actions={t.actions}
        />

        <ToolSection
          title={t.customTitle}
          desc={t.customDesc}
          tools={t.customServices}
          locale={locale}
          badges={t.badges}
          actions={t.actions}
        />

        <section className="subpage-section">
          <div
            className="card liquidGlassCard"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,17,17,0.96), rgba(45,45,45,0.92))",
              color: "#fff",
              border: "none",
            }}
          >
            <h2
              style={{
                fontSize: 22,
                marginBottom: 12,
                color: "#fff",
              }}
            >
              {t.workflowTitle}
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {t.workflowDesc}
            </p>
          </div>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>{t.disclaimerTitle}</strong>
            {t.disclaimerDesc}
          </p>
        </div>
      </div>
    </main>
  );
}

function ToolSection({
  title,
  desc,
  tools,
  locale,
  badges,
  actions,
}: {
  title: string;
  desc: string;
  tools: ToolItem[];
  locale: Locale;
  badges: Record<ToolStatus, string>;
  actions: Record<ToolStatus, string>;
}) {
  return (
    <section className="subpage-section">
      <h2>{title}</h2>
      <p>{desc}</p>

      <div
        className="card-grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            tool={tool}
            locale={locale}
            badges={badges}
            actions={actions}
          />
        ))}
      </div>
    </section>
  );
}

function ToolCard({
  tool,
  locale,
  badges,
  actions,
}: {
  tool: ToolItem;
  locale: Locale;
  badges: Record<ToolStatus, string>;
  actions: Record<ToolStatus, string>;
}) {
  const href =
    tool.status === "login" && tool.href
      ? `/${locale}/login?next=${encodeURIComponent(`/${locale}${tool.href}`)}`
      : tool.href
      ? `/${locale}${tool.href}`
      : undefined;

  const cardClassName =
    tool.status === "planned"
      ? "card liquidGlassCard liquidGlassCardPlanned"
      : "card liquidGlassCard";

  const pillClassName =
    tool.status === "public" || tool.status === "custom"
      ? "liquidGlassPill liquidGlassPillDark"
      : tool.status === "login"
      ? "liquidGlassPill"
      : "liquidGlassPill liquidGlassPillMuted";

  return (
    <div
      className={cardClassName}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 188,
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 10,
            padding: "4px 9px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800,
            color: tool.status === "planned" ? "#666" : "#111",
            background:
              tool.status === "planned"
                ? "rgba(255,255,255,0.46)"
                : "rgba(255,255,255,0.58)",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.88), 0 4px 12px rgba(18,28,45,0.05)",
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
          }}
        >
          {badges[tool.status]}
        </div>

        <h3>{tool.title}</h3>
        <p>{tool.desc}</p>
      </div>

      <p style={{ marginTop: 14, marginBottom: 0 }}>
        {href ? (
          <Link href={href} className={pillClassName}>
            {actions[tool.status]}
          </Link>
        ) : (
          <span className={pillClassName}>{actions[tool.status]}</span>
        )}
      </p>
    </div>
  );
}