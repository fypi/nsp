type Locale = "zh" | "zh-TW" | "en";

type ToolItem = {
  slug: string;
  zh: string;
  tw: string;
  en: string;
  zhDesc: string;
  twDesc: string;
  enDesc: string;
};

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

const copy = {
  zh: {
    title: "工具中心",
    desc: "NINESPRO 工具集合，覆盖 AI、文书、学习、办公、开发、金融、文本与效率场景。",
    count: "个工具",
  },
  "zh-TW": {
    title: "工具中心",
    desc: "NINESPRO 工具集合，覆蓋 AI、文書、學習、辦公、開發、金融、文字與效率場景。",
    count: "個工具",
  },
  en: {
    title: "Tools",
    desc: "NINESPRO tool collection for AI, documents, learning, office, development, finance, text, and productivity workflows.",
    count: "tools",
  },
} satisfies Record<Locale, { title: string; desc: string; count: string }>;

const tools: ToolItem[] = [
  { slug: "agent-workflow", zh: "Agent 工作流", tw: "Agent 工作流", en: "Agent Workflow", zhDesc: "规划多步骤 Agent 执行流程。", twDesc: "規劃多步驟 Agent 執行流程。", enDesc: "Plan multi-step agent execution workflows." },
  { slug: "ai", zh: "AI 工具", tw: "AI 工具", en: "AI Tools", zhDesc: "AI 生成、辅助和自动化工具集合。", twDesc: "AI 生成、輔助和自動化工具集合。", enDesc: "AI generation, assistance, and automation tools." },
  { slug: "arithmetic-practice", zh: "算术练习", tw: "算術練習", en: "Arithmetic Practice", zhDesc: "生成基础算术练习题。", twDesc: "生成基礎算術練習題。", enDesc: "Generate basic arithmetic practice." },
  { slug: "base64", zh: "Base64 工具", tw: "Base64 工具", en: "Base64", zhDesc: "Base64 编码与解码。", twDesc: "Base64 編碼與解碼。", enDesc: "Encode and decode Base64." },
  { slug: "classics", zh: "经典文库", tw: "經典文庫", en: "Classics", zhDesc: "经典内容与学习辅助。", twDesc: "經典內容與學習輔助。", enDesc: "Classic texts and learning helpers." },
  { slug: "compound-interest", zh: "复利计算", tw: "複利計算", en: "Compound Interest", zhDesc: "计算复利增长与收益。", twDesc: "計算複利成長與收益。", enDesc: "Calculate compound growth and returns." },
  { slug: "developer", zh: "开发工具", tw: "開發工具", en: "Developer Tools", zhDesc: "开发者常用效率工具。", twDesc: "開發者常用效率工具。", enDesc: "Productivity tools for developers." },
  { slug: "document", zh: "文档工具", tw: "文檔工具", en: "Document Tools", zhDesc: "文档处理与内容整理。", twDesc: "文檔處理與內容整理。", enDesc: "Document processing and organization." },
  { slug: "document-template", zh: "文书模板", tw: "文書模板", en: "Document Templates", zhDesc: "生成常见文书模板。", twDesc: "生成常見文書模板。", enDesc: "Generate common document templates." },
  { slug: "email-template", zh: "邮件模板", tw: "郵件模板", en: "Email Templates", zhDesc: "生成商务、沟通和通知邮件。", twDesc: "生成商務、溝通和通知郵件。", enDesc: "Generate business, communication, and notice emails." },
  { slug: "essay-outline", zh: "文章提纲", tw: "文章提綱", en: "Essay Outline", zhDesc: "生成文章、论文和报告提纲。", twDesc: "生成文章、論文和報告提綱。", enDesc: "Generate essay, paper, and report outlines." },
  { slug: "finance", zh: "金融工具", tw: "金融工具", en: "Finance Tools", zhDesc: "金融计算和规划工具集合。", twDesc: "金融計算和規劃工具集合。", enDesc: "Finance calculators and planning tools." },
  { slug: "formula-cards", zh: "公式卡片", tw: "公式卡片", en: "Formula Cards", zhDesc: "学习公式、概念和速查卡片。", twDesc: "學習公式、概念和速查卡片。", enDesc: "Study formulas, concepts, and quick reference cards." },
  { slug: "hash-calculator", zh: "哈希计算", tw: "雜湊計算", en: "Hash Calculator", zhDesc: "计算文本哈希摘要。", twDesc: "計算文字雜湊摘要。", enDesc: "Calculate text hash digests." },
  { slug: "inflation-impact", zh: "通胀影响", tw: "通膨影響", en: "Inflation Impact", zhDesc: "估算通胀对购买力的影响。", twDesc: "估算通膨對購買力的影響。", enDesc: "Estimate inflation impact on purchasing power." },
  { slug: "json-formatter", zh: "JSON 格式化", tw: "JSON 格式化", en: "JSON Formatter", zhDesc: "格式化、压缩和校验 JSON。", twDesc: "格式化、壓縮和校驗 JSON。", enDesc: "Format, minify, and validate JSON." },
  { slug: "knowledge-organizer", zh: "知识整理", tw: "知識整理", en: "Knowledge Organizer", zhDesc: "整理知识点、笔记和资料。", twDesc: "整理知識點、筆記和資料。", enDesc: "Organize knowledge points, notes, and materials." },
  { slug: "learning", zh: "学习工具", tw: "學習工具", en: "Learning Tools", zhDesc: "学习计划、复习和资料整理。", twDesc: "學習計畫、複習和資料整理。", enDesc: "Study plans, review, and material organization." },
  { slug: "markdown-preview", zh: "Markdown 预览", tw: "Markdown 預覽", en: "Markdown Preview", zhDesc: "预览和整理 Markdown 内容。", twDesc: "預覽和整理 Markdown 內容。", enDesc: "Preview and organize Markdown content." },
  { slug: "meeting-notes", zh: "会议纪要", tw: "會議紀要", en: "Meeting Notes", zhDesc: "生成会议纪要和行动项。", twDesc: "生成會議紀要和行動項。", enDesc: "Generate meeting notes and action items." },
  { slug: "mortgage-calculator", zh: "房贷计算", tw: "房貸計算", en: "Mortgage Calculator", zhDesc: "计算房贷月供和利息。", twDesc: "計算房貸月供和利息。", enDesc: "Calculate mortgage payments and interest." },
  { slug: "office", zh: "办公工具", tw: "辦公工具", en: "Office Tools", zhDesc: "办公文书、流程和协作工具。", twDesc: "辦公文書、流程和協作工具。", enDesc: "Office documents, workflows, and collaboration tools." },
  { slug: "okr-template", zh: "OKR 模板", tw: "OKR 模板", en: "OKR Template", zhDesc: "生成目标和关键结果。", twDesc: "生成目標和關鍵結果。", enDesc: "Generate objectives and key results." },
  { slug: "pinyin-card", zh: "拼音卡片", tw: "拼音卡片", en: "Pinyin Cards", zhDesc: "生成拼音学习卡片。", twDesc: "生成拼音學習卡片。", enDesc: "Generate pinyin learning cards." },
  { slug: "poetry", zh: "诗词工具", tw: "詩詞工具", en: "Poetry", zhDesc: "诗词学习、整理和创作辅助。", twDesc: "詩詞學習、整理和創作輔助。", enDesc: "Poetry learning, organization, and writing assistance." },
  { slug: "prd-template", zh: "PRD 模板", tw: "PRD 模板", en: "PRD Template", zhDesc: "生成产品需求文档结构。", twDesc: "生成產品需求文檔結構。", enDesc: "Generate product requirement document structure." },
  { slug: "prompt-template", zh: "提示词模板", tw: "提示詞模板", en: "Prompt Templates", zhDesc: "生成可复用 AI 提示词。", twDesc: "生成可複用 AI 提示詞。", enDesc: "Generate reusable AI prompts." },
  { slug: "qr-code", zh: "二维码", tw: "QR Code", en: "QR Code", zhDesc: "生成二维码内容。", twDesc: "生成 QR Code 內容。", enDesc: "Generate QR code content." },
  { slug: "resume-template", zh: "简历模板", tw: "履歷模板", en: "Resume Template", zhDesc: "生成简历结构和内容。", twDesc: "生成履歷結構和內容。", enDesc: "Generate resume structure and content." },
  { slug: "savings-goal", zh: "储蓄目标", tw: "儲蓄目標", en: "Savings Goal", zhDesc: "规划储蓄目标和周期。", twDesc: "規劃儲蓄目標和週期。", enDesc: "Plan savings goals and timelines." },
  { slug: "slide-outline", zh: "幻灯片提纲", tw: "簡報提綱", en: "Slide Outline", zhDesc: "生成演示文稿提纲。", twDesc: "生成簡報提綱。", enDesc: "Generate presentation outlines." },
  { slug: "sql-formatter", zh: "SQL 格式化", tw: "SQL 格式化", en: "SQL Formatter", zhDesc: "格式化和整理 SQL。", twDesc: "格式化和整理 SQL。", enDesc: "Format and organize SQL." },
  { slug: "study-planner", zh: "学习计划", tw: "學習計畫", en: "Study Planner", zhDesc: "生成学习目标和计划。", twDesc: "生成學習目標和計畫。", enDesc: "Generate study goals and plans." },
  { slug: "summary-outline", zh: "总结提纲", tw: "總結提綱", en: "Summary Outline", zhDesc: "把内容整理成摘要和提纲。", twDesc: "把內容整理成摘要和提綱。", enDesc: "Turn content into summaries and outlines." },
  { slug: "tech-learning-path", zh: "技术学习路径", tw: "技術學習路徑", en: "Tech Learning Path", zhDesc: "规划技术学习路线。", twDesc: "規劃技術學習路線。", enDesc: "Plan technical learning paths." },
  { slug: "text-diff", zh: "文本对比", tw: "文字對比", en: "Text Diff", zhDesc: "对比两段文本差异。", twDesc: "對比兩段文字差異。", enDesc: "Compare differences between two texts." },
  { slug: "timestamp-converter", zh: "时间戳转换", tw: "時間戳轉換", en: "Timestamp Converter", zhDesc: "转换秒、毫秒和日期时间。", twDesc: "轉換秒、毫秒和日期時間。", enDesc: "Convert seconds, milliseconds, and date time." },
  { slug: "url-codec", zh: "URL 编解码", tw: "URL 編解碼", en: "URL Codec", zhDesc: "URL 编码和解码。", twDesc: "URL 編碼和解碼。", enDesc: "Encode and decode URLs." },
];

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  const t = copy[locale];

  return (
    <main className="toolIndexRoot">
      <style>{`
        .toolIndexRoot {
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 124px 24px 110px;
          overflow: hidden;
        }

        .toolIndexShell {
          width: min(1240px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .toolIndexHero {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .toolIndexHero h1 {
          margin: 0;
          font-size: clamp(44px, 5.6vw, 80px);
          line-height: .96;
          letter-spacing: -.07em;
          font-weight: 950;
        }

        .toolIndexHero p {
          margin: 18px 0 0;
          max-width: 980px;
          font-size: clamp(20px, 2.2vw, 30px);
          line-height: 1.36;
          letter-spacing: -.035em;
          color: #5b6678;
          font-weight: 720;
          text-wrap: balance;
        }

        .toolIndexMeta {
          margin-top: 22px;
          color: #6b7280;
          font-size: 14px;
          font-weight: 850;
        }

        .toolIndexDivider {
          width: 100vw;
          height: 30px;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
        }

        .toolGrid {
          padding-top: 62px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 22px;
        }

        .toolCard {
          min-height: 180px;
          border-radius: 32px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #d8dee8;
          color: #05070a;
          text-decoration: none;
        }

        .toolCard:hover {
          background: #d1d8e3;
          text-decoration: none;
        }

        .toolCard h2 {
          margin: 0 0 12px;
          font-size: 24px;
          line-height: 1.08;
          letter-spacing: -.045em;
          font-weight: 950;
        }

        .toolCard p {
          margin: 0;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.62;
          font-weight: 650;
        }

        @media (max-width: 760px) {
          .toolIndexRoot {
            padding: 92px 18px 90px;
          }
          .toolIndexShell {
            width: calc(100vw - 36px);
          }
          .toolIndexHero {
            min-height: 320px;
          }
          .toolGrid {
            grid-template-columns: 1fr;
            padding-top: 46px;
          }
        }
      `}</style>

      <div className="toolIndexShell">
        <section className="toolIndexHero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
          <div className="toolIndexMeta">{tools.length} {t.count}</div>
        </section>

        <div className="toolIndexDivider" aria-hidden="true" />

        <section className="toolGrid">
          {tools.map((tool) => (
            <a className="toolCard" href={localePath(locale, `/tool/${tool.slug}`)} key={tool.slug}>
              <h2>{locale === "en" ? tool.en : locale === "zh-TW" ? tool.tw : tool.zh}</h2>
              <p>{locale === "en" ? tool.enDesc : locale === "zh-TW" ? tool.twDesc : tool.zhDesc}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
