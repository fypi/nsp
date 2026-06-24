import Link from "next/link";
import HomeShowcaseCarousel from "@/components/HomeShowcaseCarousel";

type Locale = "zh" | "en" | "zh-TW";

type ShowcaseItem = {
  eyebrow?: string;
  title: string;
  desc: string;
  meta?: string;
};

type PageCopy = {
  eyebrow: string;
  heroBrand: string;
  heroBuild: string;
  heroDesc: string;
  explore: string;
  contact: string;
  heroMotionA: string;
  heroMotionB: string;
  heroMotionC: string;

  productsKicker: string;
  productsTitle: string;
  productsDesc: string;
  products: ShowcaseItem[];

  solutionsKicker: string;
  solutionsTitle: string;
  solutionsDesc: string;
  solutions: ShowcaseItem[];

  techKicker: string;
  techTitle: string;
  techDesc: string;
  techItems: string[];

  projectsKicker: string;
  projectsTitle: string;
  projectsDesc: string;
  projects: ShowcaseItem[];

  finalTitle: string;
  finalDesc: string;
  finalButton: string;
};

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

const copy: Record<Locale, PageCopy> = {
  en: {
    eyebrow: "AI · Software · Innovation",
    heroBrand: "NINESPRO",
    heroBuild: "Build The Future.",
    heroDesc:
      "Designing and engineering the next generation of AI-powered software, enterprise platforms, cloud systems, and digital experiences.",
    explore: "Explore Products",
    contact: "Contact Us",
    heroMotionA: "NINESPRO — Build The Future.",
    heroMotionB:
      "AI software, enterprise platforms, cloud systems, and digital experiences.",
    heroMotionC: "Intelligence · Scale · Speed · Design · Engineering",

    productsKicker: "Products",
    productsTitle: "Built for intelligence, scale, and speed.",
    productsDesc:
      "NINESPRO brings AI, cloud, design, and enterprise engineering into one future-ready product system.",
    products: [
      {
        title: "Nines AI",
        desc: "AI-powered agents and workflows for knowledge, writing, research, and automation.",
      },
      {
        title: "Nines Cloud",
        desc: "Reliable cloud systems, APIs, dashboards, and infrastructure for digital products.",
      },
      {
        title: "Nines Studio",
        desc: "Beautiful, minimal, and high-performance websites, interfaces, and brand systems.",
      },
      {
        title: "Nines Enterprise",
        desc: "Custom software, internal platforms, and automation systems for modern organizations.",
      },
      {
        title: "Nines Tools",
        desc: "Online utilities for developers, documents, text processing, and productivity.",
      },
      {
        title: "Nines Data",
        desc: "Data organization, dashboards, reporting, visualization, and business intelligence.",
      },
      {
        title: "Nines Flow",
        desc: "Workflow systems for operations, approvals, automation, and task execution.",
      },
      {
        title: "Nines Labs",
        desc: "Experimental AI prototypes, product concepts, and future digital experiences.",
      },
    ],

    solutionsKicker: "Solutions",
    solutionsTitle: "From idea to intelligent systems.",
    solutionsDesc:
      "NINESPRO turns business problems into clear, executable, and scalable digital systems.",
    solutions: [
      {
        title: "Business Automation",
        desc: "Replace repetitive work with AI-powered workflows and custom software.",
      },
      {
        title: "AI Transformation",
        desc: "Bring language models, agents, and automation into real business processes.",
      },
      {
        title: "Digital Platforms",
        desc: "Design and build SaaS products, dashboards, portals, and internal tools.",
      },
      {
        title: "Data Intelligence",
        desc: "Turn data into dashboards, insights, reports, and decision systems.",
      },
      {
        title: "Startup Systems",
        desc: "Build MVPs, prototypes, landing pages, and scalable product foundations.",
      },
      {
        title: "Enterprise Operations",
        desc: "Create internal platforms for management, collaboration, and workflow control.",
      },
      {
        title: "Education & Learning",
        desc: "Design learning tools, knowledge systems, and AI-assisted study experiences.",
      },
      {
        title: "Custom Development",
        desc: "Turn unique business processes into reliable software systems.",
      },
    ],

    techKicker: "Technology",
    techTitle: "AI at the core.",
    techDesc:
      "We build intelligent systems that understand context, automate workflows, and help teams move from information to action.",
    techItems: [
      "AI Agents",
      "Knowledge Systems",
      "Workflow Automation",
      "Document Intelligence",
      "Research Assistants",
      "Cloud Architecture",
    ],

    projectsKicker: "Featured Projects",
    projectsTitle: "Selected work across AI, software, cloud, and digital design.",
    projectsDesc:
      "A future-facing project system for platforms, dashboards, enterprise websites, and brand experiences.",
    projects: [
      {
        title: "AI Platform",
        desc: "An intelligent workspace for document processing, knowledge organization, and workflow automation.",
      },
      {
        title: "SaaS Dashboard",
        desc: "A modern analytics dashboard for business data, user management, and operational insights.",
      },
      {
        title: "Enterprise Website",
        desc: "A high-performance corporate website built for brand presence, conversion, and global scalability.",
      },
      {
        title: "Brand System",
        desc: "A minimal visual identity system designed for digital products and long-term brand growth.",
      },
      {
        title: "Automation Console",
        desc: "A control panel for business workflows, scheduled tasks, and execution history.",
      },
      {
        title: "Knowledge Portal",
        desc: "A searchable knowledge system for documents, internal notes, and AI assistance.",
      },
      {
        title: "Cloud API System",
        desc: "A scalable API foundation for product integrations, dashboards, and external apps.",
      },
      {
        title: "Data Report Center",
        desc: "A reporting workspace for charts, summaries, exports, and operational decisions.",
      },
    ],

    finalTitle: "Start your next project.",
    finalDesc:
      "Tell us what you want to build. NINESPRO will help you turn ideas into intelligent digital products.",
    finalButton: "Contact Us",
  },

  zh: {
    eyebrow: "AI · 软件 · 创新",
    heroBrand: "NINESPRO",
    heroBuild: "Build The Future.",
    heroDesc: "设计并工程化下一代 AI 软件、企业平台、云端系统与数字体验。",
    explore: "探索产品",
    contact: "联系我们",
    heroMotionA: "NINESPRO — Build The Future.",
    heroMotionB: "设计并工程化下一代 AI 软件、企业平台、云端系统与数字体验。",
    heroMotionC: "智能 · 规模 · 速度 · 设计 · 工程",

    productsKicker: "产品",
    productsTitle: "为智能、规模与速度而构建。",
    productsDesc:
      "NINESPRO 将 AI、云端、设计与企业工程能力整合为面向未来的产品体系。",
    products: [
      {
        title: "Nines AI",
        desc: "面向知识、写作、研究与自动化的 AI Agent 与智能工作流。",
      },
      {
        title: "Nines Cloud",
        desc: "可靠的云端系统、API、仪表盘与数字产品基础设施。",
      },
      {
        title: "Nines Studio",
        desc: "极简、高性能的网站、界面、品牌系统与数字体验。",
      },
      {
        title: "Nines Enterprise",
        desc: "面向企业的定制软件、内部平台与自动化系统。",
      },
      {
        title: "Nines Tools",
        desc: "面向开发、文档、文本处理和效率场景的在线工具。",
      },
      {
        title: "Nines Data",
        desc: "数据整理、看板、报告、可视化和商业智能系统。",
      },
      {
        title: "Nines Flow",
        desc: "面向业务流程、审批、任务和自动执行的工作流系统。",
      },
      {
        title: "Nines Labs",
        desc: "用于验证 AI 产品、交互原型和未来数字体验的实验空间。",
      },
    ],

    solutionsKicker: "解决方案",
    solutionsTitle: "从想法到智能系统。",
    solutionsDesc:
      "NINESPRO 将业务问题拆解为清晰、可执行、可扩展的数字系统。",
    solutions: [
      {
        title: "业务自动化",
        desc: "用 AI 工作流和定制软件替代重复劳动。",
      },
      {
        title: "AI 转型",
        desc: "把大模型、Agent 和自动化真正接入业务流程。",
      },
      {
        title: "数字平台",
        desc: "设计并开发 SaaS 产品、仪表盘、门户和内部系统。",
      },
      {
        title: "数据智能",
        desc: "把数据转化为看板、洞察、报告和决策系统。",
      },
      {
        title: "创业系统",
        desc: "构建 MVP、产品原型、落地页和可扩展的产品基础。",
      },
      {
        title: "企业运营",
        desc: "构建用于管理、协作和流程控制的企业内部平台。",
      },
      {
        title: "教育学习",
        desc: "设计学习工具、知识系统和 AI 辅助学习体验。",
      },
      {
        title: "定制开发",
        desc: "把独特业务流程转化为稳定可靠的软件系统。",
      },
    ],

    techKicker: "技术",
    techTitle: "以 AI 为核心。",
    techDesc:
      "我们构建能够理解上下文、自动执行流程，并帮助团队从信息走向行动的智能系统。",
    techItems: [
      "AI Agent",
      "知识系统",
      "工作流自动化",
      "文档智能",
      "研究助手",
      "云端架构",
    ],

    projectsKicker: "精选项目",
    projectsTitle: "覆盖 AI、软件、云端与数字设计的代表性作品。",
    projectsDesc: "面向平台、仪表盘、企业官网与品牌体验的未来项目体系。",
    projects: [
      {
        title: "AI Platform",
        desc: "面向文档处理、知识整理与工作流自动化的智能工作空间。",
      },
      {
        title: "SaaS Dashboard",
        desc: "用于业务数据、用户管理与运营洞察的现代化分析仪表盘。",
      },
      {
        title: "Enterprise Website",
        desc: "面向品牌展示、转化与全球扩展的高性能企业官网。",
      },
      {
        title: "Brand System",
        desc: "面向数字产品和长期品牌增长的极简视觉识别系统。",
      },
      {
        title: "Automation Console",
        desc: "用于业务流程、定时任务和执行历史的自动化控制台。",
      },
      {
        title: "Knowledge Portal",
        desc: "用于文档、内部笔记和 AI 辅助检索的知识门户。",
      },
      {
        title: "Cloud API System",
        desc: "面向产品集成、仪表盘和外部应用的可扩展 API 基础。",
      },
      {
        title: "Data Report Center",
        desc: "用于图表、摘要、导出和运营决策的数据报告中心。",
      },
    ],

    finalTitle: "启动你的下一个项目。",
    finalDesc:
      "告诉我们你想构建什么，NINESPRO 将帮助你把想法变成智能数字产品。",
    finalButton: "联系我们",
  },

  "zh-TW": {
    eyebrow: "AI · 軟體 · 創新",
    heroBrand: "NINESPRO",
    heroBuild: "Build The Future.",
    heroDesc: "設計並工程化下一代 AI 軟體、企業平台、雲端系統與數位體驗。",
    explore: "探索產品",
    contact: "聯絡我們",
    heroMotionA: "NINESPRO — Build The Future.",
    heroMotionB: "設計並工程化下一代 AI 軟體、企業平台、雲端系統與數位體驗。",
    heroMotionC: "智能 · 規模 · 速度 · 設計 · 工程",

    productsKicker: "產品",
    productsTitle: "為智能、規模與速度而構建。",
    productsDesc:
      "NINESPRO 將 AI、雲端、設計與企業工程能力整合為面向未來的產品體系。",
    products: [
      {
        title: "Nines AI",
        desc: "面向知識、寫作、研究與自動化的 AI Agent 與智能工作流。",
      },
      {
        title: "Nines Cloud",
        desc: "可靠的雲端系統、API、儀表板與數位產品基礎設施。",
      },
      {
        title: "Nines Studio",
        desc: "極簡、高性能的網站、介面、品牌系統與數位體驗。",
      },
      {
        title: "Nines Enterprise",
        desc: "面向企業的定制軟體、內部平台與自動化系統。",
      },
      {
        title: "Nines Tools",
        desc: "面向開發、文檔、文字處理和效率場景的線上工具。",
      },
      {
        title: "Nines Data",
        desc: "數據整理、看板、報告、視覺化和商業智能系統。",
      },
      {
        title: "Nines Flow",
        desc: "面向業務流程、審批、任務和自動執行的工作流系統。",
      },
      {
        title: "Nines Labs",
        desc: "用於驗證 AI 產品、互動原型和未來數位體驗的實驗空間。",
      },
    ],

    solutionsKicker: "解決方案",
    solutionsTitle: "從想法到智能系統。",
    solutionsDesc:
      "NINESPRO 將業務問題拆解為清晰、可執行、可擴展的數位系統。",
    solutions: [
      {
        title: "業務自動化",
        desc: "用 AI 工作流和定制軟體替代重複勞動。",
      },
      {
        title: "AI 轉型",
        desc: "把大模型、Agent 和自動化真正接入業務流程。",
      },
      {
        title: "數位平台",
        desc: "設計並開發 SaaS 產品、儀表板、入口網站和內部系統。",
      },
      {
        title: "數據智能",
        desc: "把數據轉化為看板、洞察、報告和決策系統。",
      },
      {
        title: "新創系統",
        desc: "構建 MVP、產品原型、落地頁和可擴展的產品基礎。",
      },
      {
        title: "企業營運",
        desc: "構建用於管理、協作和流程控制的企業內部平台。",
      },
      {
        title: "教育學習",
        desc: "設計學習工具、知識系統和 AI 輔助學習體驗。",
      },
      {
        title: "定制開發",
        desc: "把獨特業務流程轉化為穩定可靠的軟體系統。",
      },
    ],

    techKicker: "技術",
    techTitle: "以 AI 為核心。",
    techDesc:
      "我們構建能夠理解上下文、自動執行流程，並幫助團隊從資訊走向行動的智能系統。",
    techItems: [
      "AI Agent",
      "知識系統",
      "工作流自動化",
      "文檔智能",
      "研究助手",
      "雲端架構",
    ],

    projectsKicker: "精選項目",
    projectsTitle: "覆蓋 AI、軟體、雲端與數位設計的代表性作品。",
    projectsDesc: "面向平台、儀表板、企業官網與品牌體驗的未來項目體系。",
    projects: [
      {
        title: "AI Platform",
        desc: "面向文檔處理、知識整理與工作流自動化的智能工作空間。",
      },
      {
        title: "SaaS Dashboard",
        desc: "用於業務數據、使用者管理與營運洞察的現代化分析儀表板。",
      },
      {
        title: "Enterprise Website",
        desc: "面向品牌展示、轉化與全球擴展的高性能企業官網。",
      },
      {
        title: "Brand System",
        desc: "面向數位產品和長期品牌成長的極簡視覺識別系統。",
      },
      {
        title: "Automation Console",
        desc: "用於業務流程、定時任務和執行歷史的自動化控制台。",
      },
      {
        title: "Knowledge Portal",
        desc: "用於文檔、內部筆記和 AI 輔助檢索的知識入口。",
      },
      {
        title: "Cloud API System",
        desc: "面向產品整合、儀表板和外部應用的可擴展 API 基礎。",
      },
      {
        title: "Data Report Center",
        desc: "用於圖表、摘要、匯出和營運決策的數據報告中心。",
      },
    ],

    finalTitle: "啟動你的下一個項目。",
    finalDesc:
      "告訴我們你想構建什麼，NINESPRO 將幫助你把想法變成智能數位產品。",
    finalButton: "聯絡我們",
  },
};

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = getLocale(params?.locale);
  const t = copy[locale];

  return (
    <main className="nines-home">
      <section className="nines-hero">
        <style>
          {`
            .nines-hero {
              position: relative;
              min-height: 100vh;
              min-height: 100svh;
              overflow: hidden;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 120px 24px 80px;
            }

            .nines-hero-bg {
              position: absolute;
              inset: 0;
              z-index: 0;
              overflow: hidden;
              background:
                radial-gradient(circle at 18% 24%, rgba(126,177,231,0.18), rgba(255,255,255,0) 28%),
                radial-gradient(circle at 82% 74%, rgba(15,23,42,0.055), rgba(255,255,255,0) 32%),
                #ffffff;
            }

            .nines-hero-inner {
              position: relative;
              z-index: 3;
              width: min(1080px, calc(100vw - 48px));
              text-align: center;
            }

            .nines-hero-brand {
              margin: 0;
              font-size: clamp(64px, 11vw, 148px);
              line-height: 0.88;
              letter-spacing: -0.09em;
              font-weight: 950;
              color: #05070a;
            }

            .nines-hero-build {
              margin: 22px 0 0;
              font-size: clamp(26px, 3vw, 46px);
              line-height: 1.05;
              letter-spacing: -0.055em;
              font-weight: 850;
              color: #111827;
            }

            .nines-hero-desc {
              margin: 20px auto 0;
              max-width: 820px;
              font-size: clamp(17px, 1.8vw, 24px);
              line-height: 1.48;
              letter-spacing: -0.032em;
              color: #475467;
              font-weight: 620;
            }

            .nines-hero-actions {
              margin-top: 34px;
              display: flex;
              justify-content: center;
              gap: 14px;
              flex-wrap: wrap;
            }

            .nines-hero-ball {
              position: absolute;
              z-index: 2;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-height: 38px;
              padding: 0 18px;
              border-radius: 999px;
              font-size: clamp(13px, 1.15vw, 17px);
              font-weight: 850;
              letter-spacing: -0.025em;
              color: rgba(17,24,39,0.58);
              background:
                radial-gradient(circle at 18% 8%, rgba(255,255,255,0.96), rgba(255,255,255,0.56) 42%, rgba(255,255,255,0.24) 76%),
                linear-gradient(145deg, rgba(255,255,255,0.82), rgba(242,246,250,0.62));
              border: 1px solid rgba(255,255,255,0.92);
              box-shadow:
                0 16px 44px rgba(15,23,42,0.07),
                inset 0 1px 0 rgba(255,255,255,0.98);
              backdrop-filter: blur(18px) saturate(150%);
              -webkit-backdrop-filter: blur(18px) saturate(150%);
              pointer-events: none;
              white-space: nowrap;
            }

            .nines-hero-ball strong {
              font-size: 1.35em;
              font-weight: 950;
              letter-spacing: -0.055em;
              color: rgba(5,7,10,0.72);
              margin-right: 10px;
            }

            .nines-hero-ball-a {
              animation: ninesHeroBallA 28s linear infinite alternate;
            }

            .nines-hero-ball-b {
              animation: ninesHeroBallB 34s linear infinite alternate;
            }

            .nines-hero-ball-c {
              animation: ninesHeroBallC 31s linear infinite alternate;
            }

            @keyframes ninesHeroBallA {
              0% {
                left: 5vw;
                top: 12vh;
              }
              25% {
                left: 72vw;
                top: 9vh;
              }
              50% {
                left: 82vw;
                top: 72vh;
              }
              75% {
                left: 18vw;
                top: 82vh;
              }
              100% {
                left: 6vw;
                top: 28vh;
              }
            }

            @keyframes ninesHeroBallB {
              0% {
                right: 7vw;
                top: 22vh;
              }
              28% {
                right: 74vw;
                top: 16vh;
              }
              54% {
                right: 82vw;
                top: 68vh;
              }
              80% {
                right: 18vw;
                top: 84vh;
              }
              100% {
                right: 8vw;
                top: 36vh;
              }
            }

            @keyframes ninesHeroBallC {
              0% {
                left: 20vw;
                bottom: 9vh;
              }
              30% {
                left: 76vw;
                bottom: 18vh;
              }
              58% {
                left: 70vw;
                bottom: 80vh;
              }
              84% {
                left: 9vw;
                bottom: 70vh;
              }
              100% {
                left: 16vw;
                bottom: 12vh;
              }
            }

            @media (max-width: 760px) {
              .nines-hero-ball {
                display: none;
              }

              .nines-hero {
                padding: 104px 18px 70px;
              }
            }
          `}
        </style>

        <div className="nines-hero-bg" aria-hidden="true" />

        <div className="nines-hero-ball nines-hero-ball-a" aria-hidden="true">
          <strong>NINESPRO</strong>
          <span>{t.heroBuild}</span>
        </div>

        <div className="nines-hero-ball nines-hero-ball-b" aria-hidden="true">
          <strong>NINESPRO</strong>
          <span>{t.heroDesc}</span>
        </div>

        <div className="nines-hero-ball nines-hero-ball-c" aria-hidden="true">
          <strong>NINESPRO</strong>
          <span>{t.heroMotionC}</span>
        </div>

        <div className="nines-hero-inner">
          <h1 className="nines-hero-brand">{t.heroBrand}</h1>
          <p className="nines-hero-build">{t.heroBuild}</p>
          <p className="nines-hero-desc">{t.heroDesc}</p>

          <div className="nines-hero-actions">
            <Link href={localePath(locale, "/product")} className="liquidGlassPill nines-cta">
              {t.explore}
            </Link>

            <Link href={localePath(locale, "/contact")} className="liquidGlassPill nines-cta">
              {t.contact}
            </Link>
          </div>
        </div>
      </section>

      <div className="nines-section-gap" />

      <HomeShowcaseCarousel
        kicker={t.productsKicker}
        title={t.productsTitle}
        desc={t.productsDesc}
        items={t.products}
      />

      <div className="nines-section-gap" />

      <HomeShowcaseCarousel
        kicker={t.solutionsKicker}
        title={t.solutionsTitle}
        desc={t.solutionsDesc}
        items={t.solutions}
      />

      <div className="nines-section-gap" />

      <HomeShowcaseCarousel
        kicker={t.projectsKicker}
        title={t.projectsTitle}
        desc={t.projectsDesc}
        items={t.projects}
      />

      <div className="nines-section-gap" />

      <section className="nines-final-cta">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalDesc}</p>

        <Link href={localePath(locale, "/contact")} className="liquidGlassPill nines-cta">
          {t.finalButton}
        </Link>
      </section>
    </main>
  );
}