
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

type Locale = "zh" | "zh-TW" | "en";
type LocalText = { zh: string; en: string; tw: string };
type ToolItem = { icon: string; title: LocalText; desc: LocalText; href: string; accent: string };
type ToolGroup = { key: string; title: LocalText; desc: LocalText; tools: ToolItem[] };

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

function text(value: LocalText, locale: Locale) {
  return locale === "en" ? value.en : locale === "zh-TW" ? value.tw : value.zh;
}

function localePath(locale: Locale, path: string) {
  return locale === "en" ? (path === "/" ? "/" : path) : `/${locale}${path === "/" ? "" : path}`;
}

const copy = {
  heroTitle: { zh: "九域", en: "NinesPro", tw: "九域" },
  heroSubtitle: {
    zh: "尽知天下事，弹指皆可得",
    en: "All things in the world, available at your fingertips",
    tw: "盡知天下事，彈指皆可得",
  },
  heroDesc: {
    zh: "一个简洁、安静、可持续扩展的工具空间。把文本、技术、学习、办公、金融计算和 AI 辅助整理成即开即用的卡片。",
    en: "A calm workspace for tools, workflows, learning, finance, and AI. Everyday needs organized into ready-to-use cards.",
    tw: "一個簡潔、安靜、可持續擴展的工具空間。把文字、技術、學習、辦公、金融計算和 AI 輔助整理成即開即用的卡片。",
  },
  primaryCta: { zh: "探索工具", en: "Explore Tools", tw: "探索工具" },
  secondaryCta: { zh: "产品中心", en: "Product Center", tw: "產品中心" },
  viewAll: { zh: "查看全部", en: "View all", tw: "查看全部" },
  footerNote: {
    zh: "九域 © 2026 版权所有",
    en: "NinesPro © 2026 All Rights Reserved",
    tw: "九域 © 2026 版權所有",
  },
  privacy: {
    zh: "隐私与法律",
    en: "Privacy & Legal",
    tw: "隱私與法律",
  },
  contact: {
    zh: "联系方式",
    en: "Contact",
    tw: "聯絡方式",
  },
  help: {
    zh: "帮助中心",
    en: "Help Center",
    tw: "說明中心",
  },
};

const groups: ToolGroup[] = [
  {
    key: "popular",
    title: { zh: "热门工具", en: "Popular Tools", tw: "熱門工具" },
    desc: {
      zh: "高频、轻量、打开就能用，适合日常处理文本、数据和文档。",
      en: "Frequently used lightweight tools for text, data, and document workflows.",
      tw: "高頻、輕量、打開就能用，適合日常處理文字、資料和文件。",
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
        accent: "#e8f1ff",
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
        accent: "#f2f4f7",
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
        accent: "#f6efe5",
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
        accent: "#edf7f3",
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
        accent: "#f3f0ff",
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
        accent: "#edf6ff",
      },
    ],
  },
  {
    key: "learning",
    title: { zh: "学习工具", en: "Learning Tools", tw: "學習工具" },
    desc: {
      zh: "从幼儿启蒙、小学练习到技术自学，生成可打印、可练习、可复盘的材料。",
      en: "From early learning to technical self-study, generate printable, practice-ready, and reviewable materials.",
      tw: "從幼兒啟蒙、小學練習到技術自學，生成可列印、可練習、可復盤的材料。",
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
        accent: "#fff0e4",
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
        accent: "#eaf5ff",
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
        accent: "#f5efff",
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
        accent: "#eaf7f1",
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
        accent: "#e8f0ff",
      },
    ],
  },
  {
    key: "developer",
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
        accent: "#eef2f7",
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
        accent: "#f5efff",
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
        accent: "#eaf7f1",
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
        accent: "#f8f8f8",
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
        accent: "#edf6ff",
      },
    ],
  },
  {
    key: "office",
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
        accent: "#fff6eb",
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
        accent: "#edf6ff",
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
        accent: "#f3efff",
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
        accent: "#eaf7f1",
      },
    ],
  },
  {
    key: "finance",
    title: { zh: "金融计算", en: "Finance Calculators", tw: "金融計算" },
    desc: {
      zh: "用于学习、测算和辅助判断的轻量计算工具，结果仅供估算参考。",
      en: "Lightweight calculators for learning, estimation, and support. Results are for reference only.",
      tw: "用於學習、測算和輔助判斷的輕量計算工具，結果僅供估算參考。",
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
        accent: "#edf6ff",
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
        accent: "#fff6eb",
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
        accent: "#eaf7f1",
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
        accent: "#f3efff",
      },
    ],
  },
  {
    key: "ai",
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
        accent: "#eef2ff",
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
        accent: "#fff6eb",
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
        accent: "#eaf7f1",
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
        accent: "#edf6ff",
      },
    ],
  },
];

function GlassButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="glass-button">
      {children}
    </Link>
  );
}

function ToolCard({ item, locale, index }: { item: ToolItem; locale: Locale; index: number }) {
  return (
    <Link href={localePath(locale, item.href)} className="home-tool-card">
      <article>
        <div className="card-visual" style={{ background: item.accent }}>
          <span>{item.icon}</span>
          <div className="orb orb-one" />
          <div className="orb orb-two" />
        </div>

        <div className="card-body">
          <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
          <h3>{text(item.title, locale)}</h3>
          <p>{text(item.desc, locale)}</p>
        </div>
      </article>
    </Link>
  );
}

function ToolCarousel({ group, locale }: { group: ToolGroup; locale: Locale }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const directionRef = useRef<"left" | "right" | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  const updateDot = () => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setActiveDot(0);
      return;
    }

    const ratio = el.scrollLeft / max;
    if (ratio < 0.34) setActiveDot(0);
    else if (ratio < 0.67) setActiveDot(1);
    else setActiveDot(2);
  };

  const stopAutoScroll = () => {
    directionRef.current = null;

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const smoothStep = () => {
    const el = scrollRef.current;
    const direction = directionRef.current;

    if (!el || !direction) {
      rafRef.current = null;
      return;
    }

    el.scrollLeft += direction === "left" ? -2.6 : 2.6;
    updateDot();
    rafRef.current = window.requestAnimationFrame(smoothStep);
  };

  const startAutoScroll = (direction: "left" | "right") => {
    directionRef.current = direction;

    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(smoothStep);
    }
  };

  const scrollByPage = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.78 : el.clientWidth * 0.78,
      behavior: "smooth",
    });
  };

  const scrollToDot = (dot: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const ratio = dot === 0 ? 0 : dot === 1 ? 0.5 : 1;

    el.scrollTo({ left: max * ratio, behavior: "smooth" });
    setActiveDot(dot);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const edge = 130;

    if (x < edge) startAutoScroll("left");
    else if (x > rect.width - edge) startAutoScroll("right");
    else stopAutoScroll();
  };

  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

  return (
    <section className="tool-row-section">
      <div className="section-head">
        <div className="section-copy-float">
          <h2>{text(group.title, locale)}</h2>
          <p>{text(group.desc, locale)}</p>
        </div>

        <GlassButton href={localePath(locale, "/tool")}>{text(copy.viewAll, locale)}</GlassButton>
      </div>

      <div className="carousel-shell" onMouseMove={handleMouseMove} onMouseLeave={stopAutoScroll}>
        <button
          type="button"
          className="carousel-arrow carousel-arrow-left"
          aria-label="Previous"
          onClick={() => scrollByPage("left")}
          onMouseEnter={() => startAutoScroll("left")}
          onMouseLeave={stopAutoScroll}
        >
          ‹
        </button>

        <div ref={scrollRef} className="tool-scroll" onScroll={updateDot}>
          {group.tools.map((item, index) => (
            <ToolCard key={`${group.key}-${item.href}`} item={item} locale={locale} index={index} />
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-right"
          aria-label="Next"
          onClick={() => scrollByPage("right")}
          onMouseEnter={() => startAutoScroll("right")}
          onMouseLeave={stopAutoScroll}
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Slide ${dot + 1}`}
            className={dot === activeDot ? "dot active" : "dot"}
            onClick={() => scrollToDot(dot)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);

  return (
    <main className="home-shell">
      <section className="home-hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-orb hero-orb-c" />
        </div>

        <div className="hero-content">
          <h1>{text(copy.heroTitle, locale)}</h1>
          <p className="hero-subtitle">{text(copy.heroSubtitle, locale)}</p>
          <p className="hero-desc">{text(copy.heroDesc, locale)}</p>

          <div className="hero-actions">
            <GlassButton href={localePath(locale, "/tool")}>{text(copy.primaryCta, locale)}</GlassButton>
            <GlassButton href={localePath(locale, "/product")}>{text(copy.secondaryCta, locale)}</GlassButton>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <ToolCarousel key={group.key} group={group} locale={locale} />
      ))}

      <footer className="home-footer">
        <div className="home-footer-inner">
          <span>{text(copy.footerNote, locale)}</span>

          <nav className="home-footer-links" aria-label="Footer links">
            <Link href={localePath(locale, "/privacy")}>{text(copy.privacy, locale)}</Link>
            <Link href={localePath(locale, "/contact")}>{text(copy.contact, locale)}</Link>
            <Link href={localePath(locale, "/help")}>{text(copy.help, locale)}</Link>
          </nav>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #ffffff;
        }

        .home-shell {
          background: #ffffff;
          color: #111827;
          overflow-x: hidden;
          padding-top: 0;
        }

        .home-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 118px 24px 88px;
          background:
            radial-gradient(circle at 18% 22%, rgba(213, 226, 244, 0.72), transparent 34%),
            radial-gradient(circle at 82% 24%, rgba(246, 238, 225, 0.68), transparent 32%),
            linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(24px);
          opacity: 0.55;
        }

        .hero-orb-a {
          width: 360px;
          height: 360px;
          left: -120px;
          top: 120px;
          background: rgba(210, 225, 245, 0.72);
        }

        .hero-orb-b {
          width: 430px;
          height: 430px;
          right: -150px;
          top: 120px;
          background: rgba(246, 237, 224, 0.76);
        }

        .hero-orb-c {
          width: 280px;
          height: 280px;
          left: 45%;
          bottom: -100px;
          background: rgba(232, 238, 247, 0.7);
        }

        /* NINE 可调：第一屏“九域”整组文字移动范围 */
        .hero-content {
          position: absolute;
          z-index: 1;
          width: min(1040px, calc(100vw - 48px));
          text-align: center;
          animation: heroFloat 46s linear infinite;
          will-change: left, top, transform;
        }

        /* NINE 可调：第一屏移动路线；left/top 越小越贴边，top 要避开导航栏 */
        @keyframes heroFloat {
          0% {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
          }

          14% {
            left: 24px;
            top: 86px;
            transform: translate(0, 0) scale(0.985);
          }

          28% {
            left: calc(100% - 24px);
            top: 86px;
            transform: translate(-100%, 0) scale(1.01);
          }

          42% {
            left: calc(100% - 24px);
            top: calc(100% - 72px);
            transform: translate(-100%, -100%) scale(1);
          }

          56% {
            left: 24px;
            top: calc(100% - 72px);
            transform: translate(0, -100%) scale(0.99);
          }

          70% {
            left: 50%;
            top: calc(100% - 72px);
            transform: translate(-50%, -100%) scale(1.015);
          }

          84% {
            left: 24px;
            top: 50%;
            transform: translate(0, -50%) scale(0.995);
          }

          100% {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .home-hero h1 {
          font-size: clamp(30px, 4.2vw, 56px);
          line-height: 1.02;
          letter-spacing: -0.045em;
          margin: 0;
          font-weight: 820;
        }

        .hero-subtitle {
          margin: 18px auto 0;
          max-width: 840px;
          font-size: clamp(22px, 3vw, 36px);
          line-height: 1.12;
          letter-spacing: -0.04em;
          font-weight: 760;
          color: #111827;
        }

        .hero-desc {
          margin: 18px auto 0;
          max-width: 760px;
          font-size: 15px;
          line-height: 1.72;
          color: #4b5563;
          font-weight: 400;
        }

        .hero-actions {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .glass-button {
          min-width: 148px;
          min-height: 48px;
          border-radius: 999px;
          padding: 0 22px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(246, 248, 251, 0.76));
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 18px 40px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 1;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .glass-button:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.98);
        }

        .tool-row-section {
          position: relative;
          min-height: 632px;
          padding: 58px 0 60px;
          border-top: 14px solid #ffffff;
          background: #f1f2f4;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.82),
            inset 0 -1px 0 rgba(15, 23, 42, 0.04);
          overflow: hidden;
        }

        .section-head {
          position: relative;
          z-index: 1;
          width: calc(100vw - 96px);
          margin: 0 auto 26px;
          min-height: 118px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 28px;
        }

        .section-head > .glass-button {
          position: absolute;
          right: 0;
          top: 0;
        }

        .section-copy-float {
          max-width: 620px;
          padding-right: 190px;
          animation: sectionFloat 48s linear infinite;
          will-change: transform;
        }

        .tool-row-section:nth-of-type(2n) .section-copy-float {
          animation-duration: 54s;
          animation-direction: reverse;
        }

        .tool-row-section:nth-of-type(3n) .section-copy-float {
          animation-duration: 60s;
        }

        /* NINE 可调：每层标题文字移动范围 */
        @keyframes sectionFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }

          20% {
            transform: translate3d(22vw, 14px, 0);
          }

          40% {
            transform: translate3d(calc(100vw - 760px), -10px, 0);
          }

          60% {
            transform: translate3d(calc(100vw - 700px), 22px, 0);
          }

          80% {
            transform: translate3d(12vw, -4px, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .section-head h2 {
          margin: 0;
          font-size: clamp(22px, 3vw, 36px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 760;
          color: #111827;
        }

        .section-head p {
          max-width: 700px;
          margin: 12px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: #4b5563;
          font-weight: 400;
        }

        .carousel-shell {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .tool-scroll {
          width: 100%;
          display: flex;
          gap: 28px;
          overflow-x: auto;
          padding: 0 max(72px, calc((100vw - 1300px) / 2)) 8px;
          scroll-padding-left: max(72px, calc((100vw - 1300px) / 2));
          scrollbar-width: none;
          scroll-behavior: auto;
        }

        .tool-scroll::-webkit-scrollbar {
          display: none;
        }

        .home-tool-card {
          flex: 0 0 min(430px, 78vw);
          text-decoration: none;
          color: inherit;
        }

        .home-tool-card article {
          height: 418px;
          border-radius: 34px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.96);
          box-shadow:
            0 22px 62px rgba(15, 23, 42, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.98);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            background 220ms ease;
        }

        .home-tool-card:hover article {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.97);
        }

        .card-visual {
          position: relative;
          height: 214px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .card-visual span {
          position: relative;
          z-index: 2;
          min-width: 84px;
          height: 84px;
          padding: 0 18px;
          border-radius: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.92);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          font-size: 26px;
          font-weight: 650;
          color: #111827;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .orb {
          position: absolute;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          filter: blur(8px);
        }

        .orb-one {
          width: 176px;
          height: 176px;
          right: -36px;
          top: -42px;
        }

        .orb-two {
          width: 134px;
          height: 134px;
          left: -34px;
          bottom: -38px;
        }

        .card-body {
          padding: 23px 28px 28px;
        }

        .card-index {
          font-size: 12px;
          font-weight: 500;
          color: #9ca3af;
          margin-bottom: 12px;
          letter-spacing: 0.12em;
        }

        .card-body h3 {
          margin: 0;
          font-size: 24px;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #111827;
          font-weight: 680;
        }

        .card-body p {
          margin: 12px 0 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 400;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          z-index: 8;
          width: 60px;
          height: 60px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.96);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(244, 247, 250, 0.76));
          box-shadow:
            0 22px 58px rgba(15, 23, 42, 0.17),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          color: #111827;
          font-size: 38px;
          line-height: 1;
          cursor: pointer;
          transform: translateY(-50%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 4px;
          opacity: 0.94;
          transition:
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .carousel-arrow:hover {
          transform: translateY(-50%);
          opacity: 1;
        }

        .carousel-arrow-left {
          left: 14px;
        }

        .carousel-arrow-right {
          right: 14px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 13px;
          margin-top: 24px;
        }

        /* NINE 可调：轮播小圆点，未选中颜色 */
        .dot {
          width: 13px;
          height: 13px;
          padding: 0;
          border-radius: 999px;
          border: 1px solid rgba(17, 24, 39, 0.16);
          background: #9ca3af;
          cursor: pointer;
          transition:
            width 180ms ease,
            background 180ms ease;
        }

        /* NINE 可调：轮播小圆点，当前选中颜色 */
        .dot.active {
          width: 38px;
          background: #4b5563;
        }

        /* NINE 可调：首页 footer 整体位置；你现在改过的参数我保留了 */
        .home-footer {
          background: #ffffff;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          padding: 12px 20px 3px;
          color: #374151;
        }

        .home-footer-inner {
          width: min(1280px, calc(100vw - 48px));
          margin: 0 auto;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.45;
        }

        /* NINE 可调：首页 footer 文字颜色 / 字号 / 粗细 */
        .home-footer span,
        .home-footer a,
        .home-footer-links a {
          color: #374151 !important;
          -webkit-text-fill-color: #374151 !important;
          font-size: 15px !important;
          font-weight: 400 !important;
          line-height: 1.45 !important;
          text-decoration: none !important;
          font-family: inherit !important;
          opacity: 1 !important;
        }

        /* NINE 可调：首页 footer 链接间距 */
        .home-footer-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        @media (max-width: 760px) {
          .home-hero {
            min-height: 86vh;
            padding: 108px 18px 68px;
          }

          /* NINE 可调：移动端第一屏移动范围 */
          .hero-content {
            width: calc(100vw - 36px);
            animation: heroFloatMobile 38s linear infinite;
          }

          @keyframes heroFloatMobile {
            0% {
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(1);
            }

            20% {
              left: 18px;
              top: 76px;
              transform: translate(0, 0) scale(0.99);
            }

            40% {
              left: calc(100% - 18px);
              top: 76px;
              transform: translate(-100%, 0) scale(1.01);
            }

            60% {
              left: calc(100% - 18px);
              top: calc(100% - 52px);
              transform: translate(-100%, -100%) scale(1);
            }

            80% {
              left: 18px;
              top: calc(100% - 52px);
              transform: translate(0, -100%) scale(0.995);
            }

            100% {
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .hero-desc {
            font-size: 15px;
          }

          .tool-row-section {
            min-height: 620px;
            padding: 56px 0 64px;
          }

          .section-head {
            width: calc(100vw - 36px);
            min-height: auto;
            align-items: start;
            flex-direction: column;
            margin-bottom: 24px;
          }

          .section-head > .glass-button {
            position: static;
          }

          .section-copy-float {
            padding-right: 0;
            animation: none;
          }

          .section-head h2 {
            font-size: clamp(24px, 8vw, 36px);
          }

          .section-head p {
            font-size: 14px;
          }

          .tool-scroll {
            gap: 18px;
            padding-left: 28px;
            padding-right: 28px;
            scroll-padding-left: 28px;
          }

          .home-tool-card {
            flex-basis: 84vw;
          }

          .home-tool-card article {
            height: 390px;
            border-radius: 30px;
          }

          .card-visual {
            height: 196px;
          }

          .card-body h3 {
            font-size: 22px;
          }

          .carousel-arrow {
            width: 48px;
            height: 48px;
            font-size: 30px;
          }

          .carousel-arrow-left {
            left: 8px;
          }

          .carousel-arrow-right {
            right: 8px;
          }

          .dot {
            width: 11px;
            height: 11px;
          }

          .dot.active {
            width: 32px;
          }

          /* NINE 可调：移动端 footer 位置 */
          .home-footer {
            padding: 24px 18px 30px;
          }

          .home-footer-inner,
          .home-footer-links {
            gap: 18px;
          }

          .home-footer span,
          .home-footer a,
          .home-footer-links a {
            font-size: 14px !important;
          }
        }
      `}</style>
    </main>
  );
}
