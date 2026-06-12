"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type ToolStatus = "public" | "login" | "soon" | "custom";

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

  loginTitle: string;
  loginDesc: string;

  soonTitle: string;
  soonDesc: string;

  customTitle: string;
  customDesc: string;

  layerTitle: string;
  layerDesc: string;

  disclaimerTitle: string;
  disclaimerDesc: string;

  badges: Record<ToolStatus, string>;
  actions: Record<ToolStatus, string>;

  publicTools: ToolItem[];
  loginTools: ToolItem[];
  comingSoonTools: ToolItem[];
  customServices: ToolItem[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";

  // 兼容 /zh-TW 和 /zh-tw
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const toolPageText: Record<Locale, ToolPageText> = {
  zh: {
    heroTitle: "工具中心",
    heroDesc:
      "工具、文书、学习和知识，一处打开。当前只保留真实可用入口，未完成的能力不再挂空链接。",

    publicTitle: "🔓 公开可用",
    publicDesc: "不用登录，打开就能用。下面这些是当前已经接好的真实工具。",

    loginTitle: "🔐 注册后可用",
    loginDesc:
      "这些工具需要登录后使用，后续会逐步支持保存历史、导出和个人设置。",

    soonTitle: "🧭 即将上线",
    soonDesc: "下面这些工具已经进入排期。未完成前只展示方向，不挂 404 入口。",

    customTitle: "💼 定制服务",
    customDesc:
      "标准工具解决不了的场景，可以按实际业务做成专用系统或自动化流程。",

    layerTitle: "工具分层",
    layerDesc:
      "当前采用分层开放：基础工具公开可用；需要保存、导出、批量处理和个人记录的能力，登录后逐步开放；企业流程、内部系统和 AI 自动化按定制服务处理。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "工具中心内容仅供学习、计算、格式处理和效率辅助，不构成投资建议、法律意见、财务意见或专业服务承诺。涉及关键场景时，请结合实际情况自行核验。",

    badges: {
      public: "🔓 公开",
      login: "🔐 登录",
      soon: "🧭 即将上线",
      custom: "💼 定制",
    },

    actions: {
      public: "打开工具 →",
      login: "登录后使用 →",
      soon: "等待上线",
      custom: "联系咨询 →",
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
        desc: "对比两段文本差异，适合文案修改、配置变更和代码片段检查。",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "复利计算器",
        desc: "计算长期收益、定投增长和复利变化，仅作学习和参考。",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "Base64 工具",
        desc: "Base64 编码与解码，支持常见文本处理场景。",
        href: "/tool/base64",
        status: "public",
      },
    ],

    loginTools: [
      {
        title: "Markdown 预览",
        desc: "编写 Markdown 并实时预览，适合文档、说明和内容草稿。",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    comingSoonTools: [
      {
        title: "JSON 转 TypeScript",
        desc: "根据 JSON 自动生成 TypeScript 类型，减少手写结构的重复工作。",
        status: "soon",
      },
      {
        title: "JWT 解码器",
        desc: "快速查看 JWT Header 与 Payload，便于接口调试和登录排查。",
        status: "soon",
      },
      {
        title: "正则测试器",
        desc: "测试正则表达式匹配结果，适合文本清洗和表单校验。",
        status: "soon",
      },
      {
        title: "Cron 表达式解析器",
        desc: "解析 Cron 表达式的执行时间，减少定时任务配置错误。",
        status: "soon",
      },
      {
        title: "URL 编码/解码",
        desc: "处理 URL 参数、查询字符串和特殊字符编码。",
        status: "soon",
      },
      {
        title: "文本清洗工具",
        desc: "清理多余空格、换行、重复内容和常见格式问题。",
        status: "soon",
      },
      {
        title: "图片压缩",
        desc: "压缩常见图片格式，降低网页和内容素材体积。",
        status: "soon",
      },
      {
        title: "PDF 合并",
        desc: "合并多个 PDF 文件，适合文档整理和资料归档。",
        status: "soon",
      },
      {
        title: "贷款计算器",
        desc: "计算月供、利息和还款结构，仅作学习和参考。",
        status: "soon",
      },
      {
        title: "HTTP Header 检查器",
        desc: "查看网页响应头，辅助排查缓存、安全和部署配置。",
        status: "soon",
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
        title: "课程学习系统",
        desc: "为课程、训练营、内部学习场景搭建学习计划和内容管理能力。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "内部知识库",
        desc: "把分散资料、流程和经验沉淀成可查询、可复用的知识库。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI 自动化工作流",
        desc: "把重复操作接成自动流程，减少人工搬运和低价值重复劳动。",
        href: "/contact",
        status: "custom",
      },
    ],
  },

  "zh-TW": {
    heroTitle: "工具中心",
    heroDesc:
      "工具、文書、學習和知識，一處打開。目前只保留真實可用入口，未完成的能力不再掛空連結。",

    publicTitle: "🔓 公開可用",
    publicDesc: "不用登入，打開就能用。以下是目前已經接好的真實工具。",

    loginTitle: "🔐 登入後可用",
    loginDesc:
      "這些工具需要登入後使用，後續會逐步支援保存歷史、匯出和個人設定。",

    soonTitle: "🧭 即將上線",
    soonDesc: "以下工具已經進入排期。未完成前只展示方向，不掛 404 入口。",

    customTitle: "💼 定制服務",
    customDesc:
      "標準工具解決不了的場景，可以按實際業務做成專用系統或自動化流程。",

    layerTitle: "工具分層",
    layerDesc:
      "目前採用分層開放：基礎工具公開可用；需要保存、匯出、批量處理和個人記錄的能力，登入後逐步開放；企業流程、內部系統和 AI 自動化按定制服務處理。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "工具中心內容僅供學習、計算、格式處理和效率輔助，不構成投資建議、法律意見、財務意見或專業服務承諾。涉及關鍵場景時，請結合實際情況自行核驗。",

    badges: {
      public: "🔓 公開",
      login: "🔐 登入",
      soon: "🧭 即將上線",
      custom: "💼 定制",
    },

    actions: {
      public: "打開工具 →",
      login: "登入後使用 →",
      soon: "等待上線",
      custom: "聯絡諮詢 →",
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
        desc: "對比兩段文字差異，適合文案修改、配置變更和程式碼片段檢查。",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "複利計算器",
        desc: "計算長期收益、定投增長和複利變化，僅作學習和參考。",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "Base64 工具",
        desc: "Base64 編碼與解碼，支援常見文字處理場景。",
        href: "/tool/base64",
        status: "public",
      },
    ],

    loginTools: [
      {
        title: "Markdown 預覽",
        desc: "編寫 Markdown 並即時預覽，適合文件、說明和內容草稿。",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    comingSoonTools: [
      {
        title: "JSON 轉 TypeScript",
        desc: "根據 JSON 自動生成 TypeScript 類型，減少手寫結構的重複工作。",
        status: "soon",
      },
      {
        title: "JWT 解碼器",
        desc: "快速查看 JWT Header 與 Payload，便於接口調試和登入排查。",
        status: "soon",
      },
      {
        title: "正則測試器",
        desc: "測試正則表達式匹配結果，適合文字清洗和表單校驗。",
        status: "soon",
      },
      {
        title: "Cron 表達式解析器",
        desc: "解析 Cron 表達式的執行時間，減少定時任務配置錯誤。",
        status: "soon",
      },
      {
        title: "URL 編碼/解碼",
        desc: "處理 URL 參數、查詢字串和特殊字元編碼。",
        status: "soon",
      },
      {
        title: "文字清洗工具",
        desc: "清理多餘空格、換行、重複內容和常見格式問題。",
        status: "soon",
      },
      {
        title: "圖片壓縮",
        desc: "壓縮常見圖片格式，降低網頁和內容素材體積。",
        status: "soon",
      },
      {
        title: "PDF 合併",
        desc: "合併多個 PDF 文件，適合文件整理和資料歸檔。",
        status: "soon",
      },
      {
        title: "貸款計算器",
        desc: "計算月供、利息和還款結構，僅作學習和參考。",
        status: "soon",
      },
      {
        title: "HTTP Header 檢查器",
        desc: "查看網頁響應頭，輔助排查快取、安全和部署配置。",
        status: "soon",
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
        title: "課程學習系統",
        desc: "為課程、訓練營、內部學習場景搭建學習計劃和內容管理能力。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "內部知識庫",
        desc: "把分散資料、流程和經驗沉澱成可查詢、可復用的知識庫。",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI 自動化工作流",
        desc: "把重複操作接成自動流程，減少人工搬運和低價值重複勞動。",
        href: "/contact",
        status: "custom",
      },
    ],
  },

  en: {
    heroTitle: "Tool Center",
    heroDesc:
      "Tools, documents, learning, and knowledge in one place. Only real usable entries are listed here. Unfinished features are not linked as empty pages.",

    publicTitle: "🔓 Public Tools",
    publicDesc:
      "No login required. Open and use directly. These are the currently available tools.",

    loginTitle: "🔐 Member Tools",
    loginDesc:
      "These tools require login. History, export, batch processing, and personal settings will be added gradually.",

    soonTitle: "🧭 Coming Soon",
    soonDesc:
      "The following tools are on the roadmap. Before completion, only directions are shown without 404 links.",

    customTitle: "💼 Custom Services",
    customDesc:
      "For scenarios that standard tools cannot cover, we can build dedicated systems or automation workflows around your actual business needs.",

    layerTitle: "Tool Access Layers",
    layerDesc:
      "NinesPro uses layered access: basic tools are public; features that require history, export, batch processing, and personal records will gradually open after login; enterprise workflows, internal systems, and AI automation are handled as custom services.",

    disclaimerTitle: "Notice:",
    disclaimerDesc:
      "The Tool Center is for learning, calculation, formatting, and productivity assistance only. It does not constitute investment advice, legal advice, financial advice, or a professional service commitment. Please verify critical scenarios based on your actual situation.",

    badges: {
      public: "🔓 Public",
      login: "🔐 Login",
      soon: "🧭 Coming Soon",
      custom: "💼 Custom",
    },

    actions: {
      public: "Open Tool →",
      login: "Use After Login →",
      soon: "Coming Soon",
      custom: "Contact Us →",
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
        desc: "Compare differences between two text blocks for copy edits, configuration changes, and code snippets.",
        href: "/tool/text-diff",
        status: "public",
      },
      {
        title: "Compound Interest Calculator",
        desc: "Calculate long-term returns, recurring investment growth, and compound changes for learning and reference.",
        href: "/tool/compound-interest",
        status: "public",
      },
      {
        title: "Base64 Tool",
        desc: "Encode and decode Base64 for common text-processing scenarios.",
        href: "/tool/base64",
        status: "public",
      },
    ],

    loginTools: [
      {
        title: "Markdown Preview",
        desc: "Write Markdown and preview it in real time for documents, instructions, and content drafts.",
        href: "/tool/markdown-preview",
        status: "login",
      },
    ],

    comingSoonTools: [
      {
        title: "JSON to TypeScript",
        desc: "Automatically generate TypeScript types from JSON to reduce repetitive structure writing.",
        status: "soon",
      },
      {
        title: "JWT Decoder",
        desc: "Quickly inspect JWT Header and Payload for API debugging and login troubleshooting.",
        status: "soon",
      },
      {
        title: "Regex Tester",
        desc: "Test regular expression matches for text cleanup and form validation.",
        status: "soon",
      },
      {
        title: "Cron Expression Parser",
        desc: "Parse execution times from Cron expressions to reduce scheduled task configuration errors.",
        status: "soon",
      },
      {
        title: "URL Encode / Decode",
        desc: "Handle URL parameters, query strings, and special character encoding.",
        status: "soon",
      },
      {
        title: "Text Cleanup Tool",
        desc: "Clean extra spaces, line breaks, duplicate content, and common formatting issues.",
        status: "soon",
      },
      {
        title: "Image Compression",
        desc: "Compress common image formats to reduce webpage and content asset size.",
        status: "soon",
      },
      {
        title: "PDF Merge",
        desc: "Merge multiple PDF files for document organization and archiving.",
        status: "soon",
      },
      {
        title: "Loan Calculator",
        desc: "Calculate monthly payments, interest, and repayment structure for learning and reference.",
        status: "soon",
      },
      {
        title: "HTTP Header Checker",
        desc: "Inspect webpage response headers to troubleshoot caching, security, and deployment configuration.",
        status: "soon",
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
        title: "Course Learning System",
        desc: "Build learning plans and content management capabilities for courses, programs, and internal training.",
        href: "/contact",
        status: "custom",
      },
      {
        title: "Internal Knowledge Base",
        desc: "Turn scattered materials, processes, and experience into a searchable and reusable knowledge base.",
        href: "/contact",
        status: "custom",
      },
      {
        title: "AI Automation Workflow",
        desc: "Connect repetitive operations into automated workflows to reduce manual transfer and low-value repetitive work.",
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
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>

        <section className="subpage-section">
          <h2>{t.publicTitle}</h2>
          <p>{t.publicDesc}</p>

          <div className="card-grid">
            {t.publicTools.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                locale={locale}
                badges={t.badges}
                actions={t.actions}
              />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.loginTitle}</h2>
          <p>{t.loginDesc}</p>

          <div className="card-grid">
            {t.loginTools.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                locale={locale}
                badges={t.badges}
                actions={t.actions}
              />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.soonTitle}</h2>
          <p>{t.soonDesc}</p>

          <div className="card-grid">
            {t.comingSoonTools.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                locale={locale}
                badges={t.badges}
                actions={t.actions}
              />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.customTitle}</h2>
          <p>{t.customDesc}</p>

          <div className="card-grid">
            {t.customServices.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                locale={locale}
                badges={t.badges}
                actions={t.actions}
              />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.layerTitle}</h2>
          <p>{t.layerDesc}</p>
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

  return (
    <div className="card">
      <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>
        {badges[tool.status]}
      </div>

      <h3>{tool.title}</h3>
      <p>{tool.desc}</p>

      <p style={{ marginTop: 8 }}>
        {href ? (
          <Link href={href} style={{ color: "#111", fontWeight: 500 }}>
            {actions[tool.status]}
          </Link>
        ) : (
          <span style={{ color: "#777", fontWeight: 500 }}>
            {actions[tool.status]}
          </span>
        )}
      </p>
    </div>
  );
}