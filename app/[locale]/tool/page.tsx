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

type ToolStatus = "online" | "planned";

type ToolItem = {
  icon: string;
  title: LocalText;
  desc: LocalText;
  href: string;
  status: ToolStatus;
  badge?: LocalText;
};

type ToolGroup = {
  key: string;
  icon: string;
  title: LocalText;
  desc: LocalText;
  tools: ToolItem[];
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

const statusText: Record<ToolStatus, LocalText> = {
  online: { zh: "已上线", en: "Online", tw: "已上線" },
  planned: { zh: "规划中", en: "Planned", tw: "規劃中" },
};

const groups: ToolGroup[] = [
  {
    key: "popular",
    icon: "🔥",
    title: { zh: "热门工具", en: "Popular Tools", tw: "熱門工具" },
    desc: {
      zh: "高频、轻量、打开就能用的工具，适合日常处理文本、数据和文档。",
      en: "Frequently used lightweight tools for text, data, and document workflows.",
      tw: "高頻、輕量、打開就能用的工具，適合日常處理文字、資料和文件。",
    },
    tools: [
      {
        icon: "{}",
        title: { zh: "JSON 格式化", en: "JSON Formatter", tw: "JSON 格式化" },
        desc: {
          zh: "格式化、压缩和校验 JSON。",
          en: "Format, minify, and validate JSON.",
          tw: "格式化、壓縮和校驗 JSON。",
        },
        href: "/tool/json-formatter",
        status: "online",
      },
      {
        icon: "≠",
        title: { zh: "文本对比", en: "Text Diff", tw: "文字對比" },
        desc: {
          zh: "对比两段文本，查看新增、删除和相同内容。",
          en: "Compare two texts and review additions, removals, and unchanged lines.",
          tw: "對比兩段文字，查看新增、刪除和相同內容。",
        },
        href: "/tool/text-diff",
        status: "online",
      },
      {
        icon: "%",
        title: { zh: "URL 编码 / 解码", en: "URL Encode / Decode", tw: "URL 編碼 / 解碼" },
        desc: {
          zh: "处理 URL 参数、查询字符串和特殊字符。",
          en: "Encode and decode URL parameters, query strings, and special characters.",
          tw: "處理 URL 參數、查詢字串和特殊字元。",
        },
        href: "/tool/url-codec",
        status: "online",
      },
      {
        icon: "64",
        title: { zh: "Base64 工具", en: "Base64 Tool", tw: "Base64 工具" },
        desc: {
          zh: "Base64 编码与解码。",
          en: "Encode and decode Base64 content.",
          tw: "Base64 編碼與解碼。",
        },
        href: "/tool/base64",
        status: "online",
      },
      {
        icon: "📄",
        title: { zh: "文书模板生成器", en: "Document Template", tw: "文書模板生成器" },
        desc: {
          zh: "快速生成常见文书、说明和模板结构。",
          en: "Generate common document templates and structured drafts.",
          tw: "快速生成常見文書、說明和模板結構。",
        },
        href: "/tool/document-template",
        status: "online",
      },
      {
        icon: "∑",
        title: { zh: "复利计算器", en: "Compound Interest", tw: "複利計算器" },
        desc: {
          zh: "估算长期复利增长和每月追加效果。",
          en: "Estimate long-term compound growth and monthly contributions.",
          tw: "估算長期複利增長和每月追加效果。",
        },
        href: "/tool/compound-interest",
        status: "online",
      },
    ],
  },
  {
    key: "learning",
    icon: "📚",
    title: { zh: "学习工具", en: "Learning Tools", tw: "學習工具" },
    desc: {
      zh: "从幼儿启蒙、小学练习到技术自学，围绕学习过程生成可打印、可练习、可复盘的材料。",
      en: "From early learning to technical self-study, generate printable, practice-ready, and reviewable materials.",
      tw: "從幼兒啟蒙、小學練習到技術自學，圍繞學習過程生成可列印、可練習、可復盤的材料。",
    },
    tools: [
      {
        icon: "🔤",
        title: { zh: "拼音卡片生成器", en: "Pinyin Cards", tw: "拼音卡片生成器" },
        desc: {
          zh: "生成拼音、声母、韵母和简单词语练习卡。",
          en: "Generate pinyin, initials, finals, and simple word practice cards.",
          tw: "生成拼音、聲母、韻母和簡單詞語練習卡。",
        },
        href: "/tool/pinyin-card",
        status: "planned",
      },
      {
        icon: "🔢",
        title: { zh: "口算练习生成器", en: "Arithmetic Practice", tw: "口算練習生成器" },
        desc: {
          zh: "按年级和范围生成加减乘除练习。",
          en: "Generate arithmetic practice by grade level and range.",
          tw: "按年級和範圍生成加減乘除練習。",
        },
        href: "/tool/arithmetic-practice",
        status: "planned",
      },
      {
        icon: "✍️",
        title: { zh: "作文提纲生成器", en: "Essay Outline", tw: "作文提綱生成器" },
        desc: {
          zh: "生成作文结构、素材提示和段落提纲。",
          en: "Generate essay structure, material prompts, and paragraph outlines.",
          tw: "生成作文結構、素材提示和段落提綱。",
        },
        href: "/tool/essay-outline",
        status: "planned",
      },
      {
        icon: "🗓️",
        title: { zh: "学习计划生成器", en: "Study Planner", tw: "學習計劃生成器" },
        desc: {
          zh: "按目标、天数和时间生成复习计划。",
          en: "Generate study plans by goal, duration, and available time.",
          tw: "按目標、天數和時間生成複習計劃。",
        },
        href: "/tool/study-planner",
        status: "planned",
      },
      {
        icon: "🧪",
        title: { zh: "公式速查卡片", en: "Formula Cards", tw: "公式速查卡片" },
        desc: {
          zh: "整理数学、物理、化学常用公式卡片。",
          en: "Organize common math, physics, and chemistry formula cards.",
          tw: "整理數學、物理、化學常用公式卡片。",
        },
        href: "/tool/formula-cards",
        status: "planned",
      },
      {
        icon: "🧭",
        title: { zh: "技术学习路线", en: "Tech Learning Path", tw: "技術學習路線" },
        desc: {
          zh: "按方向生成前端、后端、AI、网络和系统学习路线。",
          en: "Generate learning paths for frontend, backend, AI, networking, and systems.",
          tw: "按方向生成前端、後端、AI、網路和系統學習路線。",
        },
        href: "/tool/tech-learning-path",
        status: "planned",
      },
    ],
  },
  {
    key: "tech",
    icon: "🧰",
    title: { zh: "技术工具", en: "Developer Tools", tw: "技術工具" },
    desc: {
      zh: "开发、排查、格式化和调试常用工具，适合工程和技术学习。",
      en: "Common tools for development, troubleshooting, formatting, and debugging.",
      tw: "開發、排查、格式化和除錯常用工具，適合工程和技術學習。",
    },
    tools: [
      {
        icon: "MD",
        title: { zh: "Markdown 预览", en: "Markdown Preview", tw: "Markdown 預覽" },
        desc: {
          zh: "实时预览 Markdown 文档。",
          en: "Preview Markdown documents in real time.",
          tw: "即時預覽 Markdown 文件。",
        },
        href: "/tool/markdown-preview",
        status: "planned",
      },
      {
        icon: ".*",
        title: { zh: "正则表达式测试器", en: "Regex Tester", tw: "正則表達式測試器" },
        desc: {
          zh: "测试匹配结果、分组和替换逻辑。",
          en: "Test matches, groups, and replacement logic.",
          tw: "測試匹配結果、分組和替換邏輯。",
        },
        href: "/tool/regex-tester",
        status: "planned",
      },
      {
        icon: "⏱️",
        title: { zh: "时间戳转换", en: "Timestamp Converter", tw: "時間戳轉換" },
        desc: {
          zh: "Unix 时间戳与日期时间互转。",
          en: "Convert Unix timestamps and date-time values.",
          tw: "Unix 時間戳與日期時間互轉。",
        },
        href: "/tool/timestamp-converter",
        status: "planned",
      },
      {
        icon: "QR",
        title: { zh: "二维码生成器", en: "QR Code Generator", tw: "QR Code 生成器" },
        desc: {
          zh: "输入文本或链接，生成二维码。",
          en: "Generate QR codes from text or links.",
          tw: "輸入文字或連結，生成 QR Code。",
        },
        href: "/tool/qr-code",
        status: "planned",
      },
      {
        icon: "SQL",
        title: { zh: "SQL 格式化", en: "SQL Formatter", tw: "SQL 格式化" },
        desc: {
          zh: "整理 SQL 缩进、换行和可读性。",
          en: "Format SQL indentation, line breaks, and readability.",
          tw: "整理 SQL 縮排、換行和可讀性。",
        },
        href: "/tool/sql-formatter",
        status: "planned",
      },
      {
        icon: "#",
        title: { zh: "Hash 计算器", en: "Hash Calculator", tw: "Hash 計算器" },
        desc: {
          zh: "计算 MD5、SHA 系列哈希值。",
          en: "Calculate MD5 and SHA hash values.",
          tw: "計算 MD5、SHA 系列雜湊值。",
        },
        href: "/tool/hash-calculator",
        status: "planned",
      },
    ],
  },
  {
    key: "office",
    icon: "📄",
    title: { zh: "办公文档", en: "Office & Documents", tw: "辦公文件" },
    desc: {
      zh: "把高频文档、会议、日报、计划和简历内容变成模板。",
      en: "Turn common documents, meetings, reports, plans, and resumes into templates.",
      tw: "把高頻文件、會議、日報、計劃和履歷內容變成模板。",
    },
    tools: [
      {
        icon: "📝",
        title: { zh: "会议纪要模板", en: "Meeting Notes", tw: "會議紀要模板" },
        desc: {
          zh: "生成会议纪要、行动项和责任人清单。",
          en: "Generate meeting notes, action items, and owner lists.",
          tw: "生成會議紀要、行動項和負責人清單。",
        },
        href: "/tool/meeting-notes",
        status: "planned",
      },
      {
        icon: "📧",
        title: { zh: "邮件模板生成器", en: "Email Template", tw: "郵件模板生成器" },
        desc: {
          zh: "生成商务、通知、跟进和说明类邮件。",
          en: "Generate business, notice, follow-up, and explanatory emails.",
          tw: "生成商務、通知、跟進和說明類郵件。",
        },
        href: "/tool/email-template",
        status: "planned",
      },
      {
        icon: "CV",
        title: { zh: "简历模板生成器", en: "Resume Template", tw: "履歷模板生成器" },
        desc: {
          zh: "生成简历结构、项目描述和技能清单。",
          en: "Generate resume structure, project descriptions, and skills lists.",
          tw: "生成履歷結構、專案描述和技能清單。",
        },
        href: "/tool/resume-template",
        status: "planned",
      },
      {
        icon: "📊",
        title: { zh: "PPT 大纲生成器", en: "Slide Outline", tw: "PPT 大綱生成器" },
        desc: {
          zh: "把主题整理成演示结构和页面标题。",
          en: "Turn a topic into a presentation structure and slide titles.",
          tw: "把主題整理成簡報結構和頁面標題。",
        },
        href: "/tool/slide-outline",
        status: "planned",
      },
      {
        icon: "OKR",
        title: { zh: "OKR 模板", en: "OKR Template", tw: "OKR 模板" },
        desc: {
          zh: "生成目标、关键结果和跟踪表。",
          en: "Generate objectives, key results, and tracking tables.",
          tw: "生成目標、關鍵結果和追蹤表。",
        },
        href: "/tool/okr-template",
        status: "planned",
      },
      {
        icon: "PRD",
        title: { zh: "需求文档模板", en: "PRD Template", tw: "需求文件模板" },
        desc: {
          zh: "生成产品需求、范围、流程和验收标准。",
          en: "Generate requirements, scope, workflows, and acceptance criteria.",
          tw: "生成產品需求、範圍、流程和驗收標準。",
        },
        href: "/tool/prd-template",
        status: "planned",
      },
    ],
  },
  {
    key: "finance",
    icon: "🧮",
    title: { zh: "金融计算", en: "Finance Calculators", tw: "金融計算" },
    desc: {
      zh: "用于学习、测算和辅助判断的轻量计算工具。所有结果仅供估算参考。",
      en: "Lightweight calculators for learning, estimation, and support. Results are for reference only.",
      tw: "用於學習、測算和輔助判斷的輕量計算工具。所有結果僅供估算參考。",
    },
    tools: [
      {
        icon: "∑",
        title: { zh: "复利计算器", en: "Compound Interest", tw: "複利計算器" },
        desc: {
          zh: "估算长期复利增长和每月追加效果。",
          en: "Estimate long-term compound growth and monthly contributions.",
          tw: "估算長期複利增長和每月追加效果。",
        },
        href: "/tool/compound-interest",
        status: "online",
      },
      {
        icon: "🏠",
        title: { zh: "房贷计算器", en: "Mortgage Calculator", tw: "房貸計算器" },
        desc: {
          zh: "估算月供、总利息和还款结构。",
          en: "Estimate monthly payments, total interest, and repayment structure.",
          tw: "估算月供、總利息和還款結構。",
        },
        href: "/tool/mortgage-calculator",
        status: "planned",
      },
      {
        icon: "💰",
        title: { zh: "储蓄目标计算器", en: "Savings Goal", tw: "儲蓄目標計算器" },
        desc: {
          zh: "按目标金额和时间估算每月储蓄。",
          en: "Estimate monthly savings by goal amount and time frame.",
          tw: "按目標金額和時間估算每月儲蓄。",
        },
        href: "/tool/savings-goal",
        status: "planned",
      },
      {
        icon: "📉",
        title: { zh: "通胀购买力", en: "Inflation Impact", tw: "通膨購買力" },
        desc: {
          zh: "估算通胀对未来购买力的影响。",
          en: "Estimate the impact of inflation on future purchasing power.",
          tw: "估算通膨對未來購買力的影響。",
        },
        href: "/tool/inflation-impact",
        status: "planned",
      },
    ],
  },
  {
    key: "ai",
    icon: "🤖",
    title: { zh: "AI 辅助", en: "AI Assistants", tw: "AI 輔助" },
    desc: {
      zh: "面向写作、学习、知识整理和工作流的 AI 辅助入口。",
      en: "AI-assisted entry points for writing, learning, knowledge organization, and workflows.",
      tw: "面向寫作、學習、知識整理和工作流的 AI 輔助入口。",
    },
    tools: [
      {
        icon: "🧠",
        title: { zh: "知识整理助手", en: "Knowledge Organizer", tw: "知識整理助手" },
        desc: {
          zh: "把零散内容整理成结构化笔记和清单。",
          en: "Turn scattered content into structured notes and lists.",
          tw: "把零散內容整理成結構化筆記和清單。",
        },
        href: "/tool/knowledge-organizer",
        status: "planned",
      },
      {
        icon: "🪄",
        title: { zh: "提示词模板", en: "Prompt Templates", tw: "提示詞模板" },
        desc: {
          zh: "生成写作、学习、代码和分析类提示词模板。",
          en: "Generate prompt templates for writing, learning, coding, and analysis.",
          tw: "生成寫作、學習、程式碼和分析類提示詞模板。",
        },
        href: "/tool/prompt-template",
        status: "planned",
      },
      {
        icon: "🧾",
        title: { zh: "摘要与提纲", en: "Summary & Outline", tw: "摘要與提綱" },
        desc: {
          zh: "把长文本整理成摘要、要点和提纲。",
          en: "Turn long text into summaries, key points, and outlines.",
          tw: "把長文字整理成摘要、要點和提綱。",
        },
        href: "/tool/summary-outline",
        status: "planned",
      },
      {
        icon: "🧬",
        title: { zh: "Agent 流程草图", en: "Agent Workflow Draft", tw: "Agent 流程草圖" },
        desc: {
          zh: "把业务流程拆成角色、步骤和自动化节点。",
          en: "Break business workflows into roles, steps, and automation nodes.",
          tw: "把業務流程拆成角色、步驟和自動化節點。",
        },
        href: "/tool/agent-workflow",
        status: "planned",
      },
    ],
  },
];

const iconStyle = {
  width: 34,
  height: 34,
  borderRadius: 17,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: 900,
  background: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(243,246,249,0.78))",
  border: "1px solid rgba(255,255,255,0.95)",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.98)",
  color: "#111827",
} as const;

const groupIconStyle = {
  ...iconStyle,
  width: 38,
  height: 38,
  borderRadius: 19,
  fontSize: 18,
};

function ToolCard({ item, locale }: { item: ToolItem; locale: Locale }) {
  const isOnline = item.status === "online";
  const content = (
    <article className={`card liquidGlassCard ${!isOnline ? "liquidGlassCardPlanned" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <span aria-hidden="true" style={iconStyle}>{item.icon}</span>
        <span className={isOnline ? "liquidGlassPill" : "liquidGlassPillMuted"} style={{ minHeight: 28, padding: "7px 12px", fontSize: 12 }}>
          {t(item.badge ?? statusText[item.status], locale)}
        </span>
      </div>

      <h3>{t(item.title, locale)}</h3>
      <p>{t(item.desc, locale)}</p>
    </article>
  );

  if (!isOnline) {
    return <div style={{ cursor: "default" }}>{content}</div>;
  }

  return (
    <Link href={`/${locale}${item.href}`} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}

export default function ToolPage({ params }: PageParams) {
  const locale = normalizeLocale(params?.locale);

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{t({ zh: "工具中心", en: "Tool Center", tw: "工具中心" }, locale)}</h1>
          <p>
            {t(
              {
                zh: "这里集中放置可直接使用的小工具：文本、数据、学习、技术、办公、金融计算和 AI 辅助。已上线工具可直接打开；规划中工具会陆续补齐。",
                en: "A collection of ready-to-use tools for text, data, learning, development, office work, finance, and AI assistance. Online tools can be opened directly; planned tools will be added gradually.",
                tw: "這裡集中放置可直接使用的小工具：文字、資料、學習、技術、辦公、金融計算和 AI 輔助。已上線工具可直接打開；規劃中工具會陸續補齊。",
              },
              locale
            )}
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.key} className="subpage-section">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span aria-hidden="true" style={groupIconStyle}>{group.icon}</span>
              <h2 style={{ margin: 0 }}>{t(group.title, locale)}</h2>
            </div>
            <p>{t(group.desc, locale)}</p>

            <div className="card-grid">
              {group.tools.map((item) => (
                <ToolCard key={`${group.key}-${item.href}`} item={item} locale={locale} />
              ))}
            </div>
          </section>
        ))}

        <div className="disclaimer-box">
          <p>
            {t(
              {
                zh: "提示：涉及儿童学习的工具仅用于生成学习材料和练习模板，不采集儿童个人信息；金融计算类工具仅供估算和学习参考，不构成投资建议。",
                en: "Note: Children’s learning tools are only for generating learning materials and practice templates and do not collect children’s personal information. Finance calculators are for estimation and learning only and are not investment advice.",
                tw: "提示：涉及兒童學習的工具僅用於生成學習材料和練習模板，不採集兒童個人資訊；金融計算類工具僅供估算和學習參考，不構成投資建議。",
              },
              locale
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
