
"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "zh" | "zh-TW" | "en";
type CardItem = { title: string; desc: string };
type SectionCopy = { kicker: string; title: string; desc: string; items: CardItem[] };
type StatItem = { value: string; label: string };
type PageCopy = {
  brand: string; slogan: string; desc: string; explore: string; contact: string;
  finalTitle: string; finalDesc: string; finalButton: string;
  products: SectionCopy; solutions: SectionCopy; ai: SectionCopy; development: SectionCopy;
  projects: SectionCopy; why: SectionCopy; statsTitle: string; statsDesc: string; stats: StatItem[];
  testimonials: SectionCopy; partners: SectionCopy; contactSection: SectionCopy;
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

const copy: Record<Locale, PageCopy> = {
  zh: {
    brand: "NINESPRO",
    slogan: "尽知天下事，弹指皆可得。",
    desc: "面向 AI 原生产品、数字平台、在线工具和企业软件的设计与工程化建设。",
    explore: "探索产品",
    contact: "联系 NINESPRO",
    finalTitle: "开始一次认真构建。",
    finalDesc: "告诉 NINESPRO 项目方向、业务目标和当前问题，一起整理清晰的产品路径。",
    finalButton: "发送邮件",
    products: {
      kicker: "产品",
      title: "产品能力清晰呈现。",
      desc: "产品中心用于说明 NINESPRO 的产品方向、AI 能力、工具体系和工程化交付方式。",
      items: [
        { title: "Nines AI", desc: "面向内容生成、知识整理、研究辅助和流程自动化的 AI 能力。" },
        { title: "Nines Cloud", desc: "面向账号、权限、API、数据和后台管理的云端系统基础。" },
        { title: "Nines Studio", desc: "面向官网、界面、品牌页面和数字体验的设计与开发。" },
        { title: "Nines Enterprise", desc: "面向企业流程、内部平台和业务系统的定制开发。" },
        { title: "Nines Tools", desc: "面向开发、文档、文本处理和效率场景的在线工具体系。" },
        { title: "Nines Data", desc: "面向数据看板、报告整理、可视化和业务分析的系统能力。" },
        { title: "Nines Flow", desc: "面向审批、任务、协作和自动执行的工作流能力。" },
        { title: "Nines Labs", desc: "面向 AI 产品原型、工具实验和未来体验的持续探索。" }
      ]
    },
    solutions: {
      kicker: "解决方案",
      title: "面向真实业务场景。",
      desc: "围绕业务自动化、AI 转型、数字平台和定制开发，提供可落地的方案设计与系统建设。",
      items: [
        { title: "业务自动化", desc: "梳理重复流程，建设更高效的任务、审批、协作和执行系统。" },
        { title: "AI 转型", desc: "将大模型、Agent 和自动化能力接入真实业务流程。" },
        { title: "数字平台", desc: "构建 SaaS、门户、仪表盘、后台和内部工具。" },
        { title: "数据智能", desc: "把数据整理为可理解的看板、报告、洞察和决策支持。" },
        { title: "创业系统", desc: "支持落地页、产品原型、MVP 和早期产品基础建设。" },
        { title: "企业运营", desc: "建设用于管理、协作、流程控制和业务追踪的内部平台。" },
        { title: "教育学习", desc: "建设学习工具、知识系统和 AI 辅助学习体验。" },
        { title: "定制开发", desc: "根据独特业务路径开发可维护、可扩展的软件系统。" }
      ]
    },
    ai: {
      kicker: "AI",
      title: "AI 能力进入产品流程。",
      desc: "围绕生成、整理、分析、自动化和知识管理，把 AI 能力接入实际产品与业务流程。",
      items: [
        { title: "AI 代理", desc: "根据目标拆解步骤、组织上下文，并辅助完成多步骤任务。" },
        { title: "知识系统", desc: "将文档、资料、经验和业务规则整理成可检索、可复用的知识结构。" },
        { title: "文档智能", desc: "面向合同、报告、表格和资料进行解析、总结、提取和重组。" },
        { title: "研究助手", desc: "用于调研、写作、分析和决策辅助的智能工作空间。" }
      ]
    },
    development: {
      kicker: "开发",
      title: "从界面到系统。",
      desc: "以产品化方式交付网站、工具、API、后台、权限和企业内部系统。",
      items: [
        { title: "网站开发", desc: "高性能官网、落地页、品牌页面和多语言站点。" },
        { title: "SaaS 平台", desc: "用户、权限、数据、运营后台和可扩展产品基础。" },
        { title: "云端接口", desc: "面向集成、自动化和外部应用的稳定 API 系统。" },
        { title: "内部工具", desc: "为团队管理、审批、协作和运营流程打造内部平台。" }
      ]
    },
    projects: {
      kicker: "项目方向",
      title: "从需求到可运行系统。",
      desc: "NINESPRO 面向 AI 平台、SaaS 仪表盘、企业官网和品牌系统提供产品化建设能力。",
      items: [
        { title: "AI 平台", desc: "面向文档处理、知识整理和工作流自动化的产品空间。" },
        { title: "SaaS 仪表盘", desc: "面向业务数据、运营指标和洞察分析的可视化平台。" },
        { title: "企业官网", desc: "面向品牌展示、产品说明、访问转化和长期扩展的网站系统。" },
        { title: "品牌系统", desc: "面向数字产品长期增长的视觉、内容和体验一致性建设。" }
      ]
    },
    why: {
      kicker: "方法",
      title: "以系统能力建设产品。",
      desc: "从策略、设计、工程、AI 到云端架构，用统一标准把想法变成可运行、可增长的产品。",
      items: [
        { title: "产品思维", desc: "围绕产品路径、用户体验、转化目标和长期增长设计系统。" },
        { title: "AI 原生", desc: "将 AI 作为产品能力的一部分，融入实际使用流程。" },
        { title: "工程质量", desc: "重视结构、性能、权限、可维护性和长期扩展。" },
        { title: "设计精度", desc: "追求简洁、清晰、稳定且具有品牌一致性的数字体验。" }
      ]
    },
    statsTitle: "构建方式。",
    statsDesc: "以产品思维、AI 原生能力和工程化方法建设可持续迭代的数字系统。",
    stats: [
      { value: "项目制", label: "清晰交付" },
      { value: "AI 原生", label: "产品能力" },
      { value: "工程化", label: "稳定落地" },
      { value: "长期", label: "持续迭代" }
    ],
    testimonials: {
      kicker: "工作方式",
      title: "把复杂需求整理成清晰路径。",
      desc: "NINESPRO 将业务目标、用户路径、系统能力和交付节奏整理成可执行的产品方案。",
      items: [
        { title: "需求梳理", desc: "从业务目标、用户场景和功能边界开始，明确第一阶段要建设的核心能力。" },
        { title: "流程优化", desc: "梳理重复流程、任务节点和协作方式，为自动化和内部工具建设打基础。" },
        { title: "系统交付", desc: "以稳定架构、清晰权限和可维护代码交付可持续迭代的数字系统。" }
      ]
    },
    partners: {
      kicker: "适用场景",
      title: "适用于不同阶段的数字建设。",
      desc: "从早期产品验证到企业内部平台，NINESPRO 根据实际目标选择合适的建设方式。",
      items: [
        { title: "产品验证", desc: "用于落地页、原型、MVP 和早期产品基础建设。" },
        { title: "企业平台", desc: "用于内部工具、流程系统、数据看板和业务管理平台。" },
        { title: "知识与学习", desc: "用于知识整理、学习工具、内容生成和 AI 辅助学习体验。" },
        { title: "服务交付", desc: "用于官网建设、数字体验、工具开发和客户项目交付支持。" }
      ]
    },
    contactSection: {
      kicker: "联系",
      title: "统一联系入口。",
      desc: "如需项目沟通、合作咨询或问题反馈，请通过统一邮箱联系 NINESPRO。",
      items: [
        { title: "统一邮箱", desc: "one@ninespro.com" },
        { title: "联系页面", desc: "提交合作、反馈或支持需求。" },
        { title: "项目沟通", desc: "说明项目方向、目标和当前问题。" }
      ]
    }
  },
  "zh-TW": {
    brand: "NINESPRO",
    slogan: "盡知天下事，彈指皆可得。",
    desc: "面向 AI 原生產品、數位平台、線上工具和企業軟體的設計與工程化建設。",
    explore: "探索產品",
    contact: "聯絡 NINESPRO",
    finalTitle: "開始一次認真構建。",
    finalDesc: "告訴 NINESPRO 項目方向、業務目標和當前問題，一起整理清晰的產品路徑。",
    finalButton: "發送郵件",
    products: {
      kicker: "產品",
      title: "產品能力清晰呈現。",
      desc: "產品中心用於說明 NINESPRO 的產品方向、AI 能力、工具體系和工程化交付方式。",
      items: [
        { title: "Nines AI", desc: "面向內容生成、知識整理、研究輔助和流程自動化的 AI 能力。" },
        { title: "Nines Cloud", desc: "面向帳號、權限、API、數據和後台管理的雲端系統基礎。" },
        { title: "Nines Studio", desc: "面向官網、介面、品牌頁面和數位體驗的設計與開發。" },
        { title: "Nines Enterprise", desc: "面向企業流程、內部平台和業務系統的定制開發。" },
        { title: "Nines Tools", desc: "面向開發、文檔、文字處理和效率場景的線上工具體系。" },
        { title: "Nines Data", desc: "面向數據看板、報告整理、視覺化和業務分析的系統能力。" },
        { title: "Nines Flow", desc: "面向審批、任務、協作和自動執行的工作流能力。" },
        { title: "Nines Labs", desc: "面向 AI 產品原型、工具實驗和未來體驗的持續探索。" }
      ]
    },
    solutions: {
      kicker: "解決方案",
      title: "面向真實業務場景。",
      desc: "圍繞業務自動化、AI 轉型、數位平台和定制開發，提供可落地的方案設計與系統建設。",
      items: [
        { title: "業務自動化", desc: "梳理重複流程，建設更高效的任務、審批、協作和執行系統。" },
        { title: "AI 轉型", desc: "將大模型、Agent 和自動化能力接入真實業務流程。" },
        { title: "數位平台", desc: "構建 SaaS、入口網站、儀表板、後台和內部工具。" },
        { title: "數據智能", desc: "把數據整理為可理解的看板、報告、洞察和決策支持。" },
        { title: "新創系統", desc: "支持落地頁、產品原型、MVP 和早期產品基礎建設。" },
        { title: "企業營運", desc: "建設用於管理、協作、流程控制和業務追蹤的內部平台。" },
        { title: "教育學習", desc: "建設學習工具、知識系統和 AI 輔助學習體驗。" },
        { title: "定制開發", desc: "根據獨特業務路徑開發可維護、可擴展的軟體系統。" }
      ]
    },
    ai: {
      kicker: "AI",
      title: "AI 能力進入產品流程。",
      desc: "圍繞生成、整理、分析、自動化和知識管理，把 AI 能力接入實際產品與業務流程。",
      items: [
        { title: "AI 代理", desc: "根據目標拆解步驟、組織上下文，並輔助完成多步驟任務。" },
        { title: "知識系統", desc: "將文檔、資料、經驗和業務規則整理成可檢索、可複用的知識結構。" },
        { title: "文檔智能", desc: "面向合同、報告、表格和資料進行解析、總結、提取和重組。" },
        { title: "研究助手", desc: "用於調研、寫作、分析和決策輔助的智能工作空間。" }
      ]
    },
    development: {
      kicker: "開發",
      title: "從界面到系統。",
      desc: "以產品化方式交付網站、工具、API、後台、權限和企業內部系統。",
      items: [
        { title: "網站開發", desc: "高性能官網、落地頁、品牌頁面和多語言站點。" },
        { title: "SaaS 平台", desc: "用戶、權限、數據、營運後台和可擴展產品基礎。" },
        { title: "雲端接口", desc: "面向集成、自動化和外部應用的穩定 API 系統。" },
        { title: "內部工具", desc: "為團隊管理、審批、協作和營運流程打造內部平台。" }
      ]
    },
    projects: {
      kicker: "項目方向",
      title: "從需求到可運行系統。",
      desc: "NINESPRO 面向 AI 平台、SaaS 儀表板、企業官網和品牌系統提供產品化建設能力。",
      items: [
        { title: "AI 平台", desc: "面向文檔處理、知識整理和工作流自動化的產品空間。" },
        { title: "SaaS 儀表板", desc: "面向業務數據、營運指標和洞察分析的視覺化平台。" },
        { title: "企業官網", desc: "面向品牌展示、產品說明、訪問轉化和長期擴展的網站系統。" },
        { title: "品牌系統", desc: "面向數位產品長期增長的視覺、內容和體驗一致性建設。" }
      ]
    },
    why: {
      kicker: "方法",
      title: "以系統能力建設產品。",
      desc: "從策略、設計、工程、AI 到雲端架構，用統一標準把想法變成可運行、可成長的產品。",
      items: [
        { title: "產品思維", desc: "圍繞產品路徑、用戶體驗、轉化目標和長期增長設計系統。" },
        { title: "AI 原生", desc: "將 AI 作為產品能力的一部分，融入實際使用流程。" },
        { title: "工程質量", desc: "重視結構、性能、權限、可維護性和長期擴展。" },
        { title: "設計精度", desc: "追求簡潔、清晰、穩定且具有品牌一致性的數位體驗。" }
      ]
    },
    statsTitle: "構建方式。",
    statsDesc: "以產品思維、AI 原生能力和工程化方法建設可持續迭代的數位系統。",
    stats: [
      { value: "項目制", label: "清晰交付" },
      { value: "AI 原生", label: "產品能力" },
      { value: "工程化", label: "穩定落地" },
      { value: "長期", label: "持續迭代" }
    ],
    testimonials: {
      kicker: "工作方式",
      title: "把複雜需求整理成清晰路徑。",
      desc: "NINESPRO 將業務目標、用戶路徑、系統能力和交付節奏整理成可執行的產品方案。",
      items: [
        { title: "需求梳理", desc: "從業務目標、用戶場景和功能邊界開始，明確第一階段要建設的核心能力。" },
        { title: "流程優化", desc: "梳理重複流程、任務節點和協作方式，為自動化和內部工具建設打基礎。" },
        { title: "系統交付", desc: "以穩定架構、清晰權限和可維護代碼交付可持續迭代的數位系統。" }
      ]
    },
    partners: {
      kicker: "適用場景",
      title: "適用於不同階段的數位建設。",
      desc: "從早期產品驗證到企業內部平台，NINESPRO 根據實際目標選擇合適的建設方式。",
      items: [
        { title: "產品驗證", desc: "用於落地頁、原型、MVP 和早期產品基礎建設。" },
        { title: "企業平台", desc: "用於內部工具、流程系統、數據看板和業務管理平台。" },
        { title: "知識與學習", desc: "用於知識整理、學習工具、內容生成和 AI 輔助學習體驗。" },
        { title: "服務交付", desc: "用於官網建設、數位體驗、工具開發和客戶項目交付支持。" }
      ]
    },
    contactSection: {
      kicker: "聯絡",
      title: "統一聯絡入口。",
      desc: "如需項目溝通、合作諮詢或問題反饋，請通過統一信箱聯絡 NINESPRO。",
      items: [
        { title: "統一信箱", desc: "one@ninespro.com" },
        { title: "聯絡頁面", desc: "提交合作、反饋或支持需求。" },
        { title: "項目溝通", desc: "說明項目方向、目標和當前問題。" }
      ]
    }
  },
  en: {
    brand: "NINESPRO",
    slogan: "The world’s knowledge, at your fingertips.",
    desc: "Design and engineering for AI-native products, digital platforms, online tools, and enterprise software.",
    explore: "Explore Product",
    contact: "Contact NINESPRO",
    finalTitle: "Start building seriously.",
    finalDesc: "Share the project direction, business goals, and current problems with NINESPRO. Build a clear product path together.",
    finalButton: "Send Email",
    products: {
      kicker: "Product",
      title: "Product capabilities, clearly presented.",
      desc: "The product center explains NINESPRO product directions, AI capabilities, tool systems, and engineering delivery methods.",
      items: [
        { title: "Nines AI", desc: "AI capability for content generation, knowledge organization, research assistance, and workflow automation." },
        { title: "Nines Cloud", desc: "Cloud foundations for accounts, permissions, APIs, data, and admin systems." },
        { title: "Nines Studio", desc: "Design and development for websites, interfaces, brand pages, and digital experiences." },
        { title: "Nines Enterprise", desc: "Custom development for enterprise workflows, internal platforms, and business systems." },
        { title: "Nines Tools", desc: "Online tool systems for development, documents, text processing, and productivity." },
        { title: "Nines Data", desc: "System capability for dashboards, reporting, visualization, and business analysis." },
        { title: "Nines Flow", desc: "Workflow capability for approvals, tasks, collaboration, and automated execution." },
        { title: "Nines Labs", desc: "Continuous exploration for AI prototypes, tool experiments, and future experiences." }
      ]
    },
    solutions: {
      kicker: "Solution",
      title: "Built for real business scenarios.",
      desc: "NINESPRO provides practical solution design and system delivery across automation, AI transformation, digital platforms, and custom development.",
      items: [
        { title: "Business Automation", desc: "Map repetitive processes and build efficient task, approval, collaboration, and execution systems." },
        { title: "AI Transformation", desc: "Bring language models, agents, and automation into real business processes." },
        { title: "Digital Platforms", desc: "Build SaaS products, portals, dashboards, admin systems, and internal tools." },
        { title: "Data Intelligence", desc: "Turn data into understandable dashboards, reports, insights, and decision support." },
        { title: "Startup Systems", desc: "Support landing pages, product prototypes, MVPs, and early product foundations." },
        { title: "Enterprise Operations", desc: "Build internal platforms for management, collaboration, workflow control, and tracking." },
        { title: "Education & Learning", desc: "Build learning tools, knowledge systems, and AI-assisted study experiences." },
        { title: "Custom Development", desc: "Transform unique business paths into maintainable and extensible software systems." }
      ]
    },
    ai: {
      kicker: "AI",
      title: "AI capabilities inside product workflows.",
      desc: "NINESPRO connects AI capabilities for generation, organization, analysis, automation, and knowledge management into real products and workflows.",
      items: [
        { title: "AI Agents", desc: "Break goals into steps, organize context, and support multi-step task execution." },
        { title: "Knowledge Systems", desc: "Organize documents, materials, experience, and business rules into reusable knowledge structures." },
        { title: "Document Intelligence", desc: "Parse, summarize, extract, and restructure contracts, reports, forms, and files." },
        { title: "Research Assistants", desc: "Intelligent workspace for research, writing, analysis, and decision support." }
      ]
    },
    development: {
      kicker: "Development",
      title: "From interface to system.",
      desc: "Productized delivery for websites, tools, APIs, admin systems, permissions, and internal platforms.",
      items: [
        { title: "Web Development", desc: "High-performance websites, landing pages, brand pages, and multilingual sites." },
        { title: "SaaS Platforms", desc: "Users, permissions, data, admin panels, and scalable product foundations." },
        { title: "Cloud APIs", desc: "Reliable API systems for integrations, automation, and external applications." },
        { title: "Internal Tools", desc: "Internal platforms for management, approvals, collaboration, and operations." }
      ]
    },
    projects: {
      kicker: "Project Directions",
      title: "From requirements to running systems.",
      desc: "NINESPRO provides productized development capability for AI platforms, SaaS dashboards, enterprise websites, and brand systems.",
      items: [
        { title: "AI Platform", desc: "Product spaces for document processing, knowledge organization, and workflow automation." },
        { title: "SaaS Dashboard", desc: "Visualization platforms for business data, operational metrics, and analytical insights." },
        { title: "Enterprise Website", desc: "Website systems for brand presence, product explanation, conversion, and long-term expansion." },
        { title: "Brand System", desc: "Visual, content, and experience consistency for long-term digital product growth." }
      ]
    },
    why: {
      kicker: "Approach",
      title: "Building products with system capability.",
      desc: "Strategy, design, engineering, AI, and cloud architecture in one product standard.",
      items: [
        { title: "Product Thinking", desc: "Design systems around product paths, user experience, conversion goals, and long-term growth." },
        { title: "AI Native", desc: "Make AI part of product capability and integrate it into real usage flows." },
        { title: "Engineering Quality", desc: "Structure, performance, permissions, maintainability, and long-term scalability." },
        { title: "Design Precision", desc: "Simple, clear, stable, and brand-consistent digital experiences." }
      ]
    },
    statsTitle: "How NINESPRO builds.",
    statsDesc: "Product thinking, AI-native capability, and engineered execution for digital systems that can keep improving.",
    stats: [
      { value: "Project", label: "Delivery" },
      { value: "AI Native", label: "Capability" },
      { value: "Engineered", label: "Execution" },
      { value: "Long-term", label: "Iteration" }
    ],
    testimonials: {
      kicker: "Working Method",
      title: "Turning complex needs into a clear path.",
      desc: "NINESPRO organizes business goals, user journeys, system capability, and delivery cadence into executable product plans.",
      items: [
        { title: "Requirement Mapping", desc: "Start from business goals, user scenarios, and feature boundaries to define the first-stage product capability." },
        { title: "Process Optimization", desc: "Map repetitive workflows, task nodes, and collaboration patterns before building automation and internal tools." },
        { title: "System Delivery", desc: "Deliver digital systems with stable architecture, clear permissions, and maintainable code." }
      ]
    },
    partners: {
      kicker: "Use Cases",
      title: "For different stages of digital development.",
      desc: "From early product validation to internal platforms, NINESPRO selects the right delivery approach for the actual goal.",
      items: [
        { title: "Product Validation", desc: "Landing pages, prototypes, MVPs, and early product foundations." },
        { title: "Enterprise Platforms", desc: "Internal tools, workflow systems, dashboards, and business management platforms." },
        { title: "Knowledge & Learning", desc: "Knowledge organization, learning tools, content generation, and AI-assisted study experiences." },
        { title: "Service Delivery", desc: "Website development, digital experience, tool development, and customer project delivery support." }
      ]
    },
    contactSection: {
      kicker: "Contact",
      title: "Unified contact entry.",
      desc: "For project inquiries, collaboration, or feedback, contact NINESPRO through the unified email address.",
      items: [
        { title: "Unified Email", desc: "one@ninespro.com" },
        { title: "Contact Page", desc: "Submit partnership, feedback, or support needs." },
        { title: "Project Discussion", desc: "Share project direction, goals, and current challenges." }
      ]
    }
  }
};

function SectionGap() { return <div className="homeSectionGap" aria-hidden="true" />; }

function StatSection({ title, desc, stats }: { title: string; desc: string; stats: StatItem[] }) {
  return (
    <section className="homeLayer homeStatsLayer">
      <div className="homeLayerInner">
        <div className="homeMotionZone homeStatsHeadZone"><div className="homeLayerHead"><p className="homeLayerKicker">{title}</p><h2 className="homeLayerTitle">{desc}</h2></div></div>
        <div className="homeStatsGrid">{stats.map((item) => <article className="homeCard homeStatCard" key={`${item.value}-${item.label}`}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div>
      </div>
    </section>
  );
}

function ChevronLeft() { return <span className="homeArrowGlyph" aria-hidden="true">‹</span>; }
function ChevronRight() { return <span className="homeArrowGlyph" aria-hidden="true">›</span>; }

function ShowcaseSection({ section }: { section: SectionCopy }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef<0 | 1 | -1>(0);
  const pageRef = useRef(0);
  const [activePage, setActivePage] = useState(0);

  const getMaxScroll = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.max(0, track.scrollWidth - track.clientWidth);
  };

  const updatePage = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = getMaxScroll();
    const nextPage = maxScroll <= 0 ? 0 : Math.min(2, Math.max(0, Math.round((track.scrollLeft / maxScroll) * 2)));
    if (pageRef.current !== nextPage) { pageRef.current = nextPage; setActivePage(nextPage); }
  };

  const stopContinuousScroll = () => {
    directionRef.current = 0;
    lastTimeRef.current = null;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const setPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    stopContinuousScroll();
    const nextPage = Math.min(2, Math.max(0, page));
    const maxScroll = getMaxScroll();
    track.style.scrollBehavior = "smooth";
    track.scrollTo({ left: (maxScroll * nextPage) / 2, behavior: "smooth" });
    pageRef.current = nextPage;
    setActivePage(nextPage);
  };

  const continuousStep = (time: number) => {
    const track = trackRef.current;
    const direction = directionRef.current;
    if (!track || direction === 0) return;
    const lastTime = lastTimeRef.current ?? time;
    const delta = Math.min(32, time - lastTime);
    lastTimeRef.current = time;
    const maxScroll = getMaxScroll();
    const speedPxPerSecond = 360;
    track.style.scrollBehavior = "auto";
    track.scrollLeft += direction * speedPxPerSecond * (delta / 1000);
    if (direction > 0 && track.scrollLeft >= maxScroll - 1) { track.scrollLeft = maxScroll; stopContinuousScroll(); updatePage(); return; }
    if (direction < 0 && track.scrollLeft <= 1) { track.scrollLeft = 0; stopContinuousScroll(); updatePage(); return; }
    updatePage();
    rafRef.current = requestAnimationFrame(continuousStep);
  };

  const startContinuousScroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = getMaxScroll();
    if ((direction > 0 && track.scrollLeft >= maxScroll - 1) || (direction < 0 && track.scrollLeft <= 1)) return;
    directionRef.current = direction;
    lastTimeRef.current = null;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(continuousStep);
  };

  useEffect(() => () => stopContinuousScroll(), []);

  return (
    <section className="homeLayer">
      <div className="homeLayerInner">
        <div className="homeMotionZone"><div className="homeLayerHead"><p className="homeLayerKicker">{section.kicker}</p><h2 className="homeLayerTitle">{section.title}</h2><p className="homeLayerDesc">{section.desc}</p></div></div>
        <div className="homeCarouselShell" onMouseLeave={stopContinuousScroll}>
          <button type="button" className="homeArrow homeArrowLeft" onMouseEnter={() => startContinuousScroll(-1)} onMouseLeave={stopContinuousScroll} onFocus={() => startContinuousScroll(-1)} onBlur={stopContinuousScroll} onClick={() => setPage(pageRef.current - 1)} aria-label="Previous"><ChevronLeft /></button>
          <button type="button" className="homeArrow homeArrowRight" onMouseEnter={() => startContinuousScroll(1)} onMouseLeave={stopContinuousScroll} onFocus={() => startContinuousScroll(1)} onBlur={stopContinuousScroll} onClick={() => setPage(pageRef.current + 1)} aria-label="Next"><ChevronRight /></button>
          <div ref={trackRef} className="homeTrack" onScroll={updatePage}>{section.items.map((item) => <article className="homeCard" key={item.title}><div className="homeCardContent"><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div>
        </div>
        <div className="homeDots">{[0, 1, 2].map((page) => <button key={page} type="button" aria-current={activePage === page ? "true" : undefined} onClick={() => setPage(page)} />)}</div>
      </div>
    </section>
  );
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  const t = copy[locale];

  return (
    <main className="homeRoot">
      <style>{`
        .homeRoot { background: #e9ebef; color: #05070a; }
        .homeSectionGap { height: 30px; background: #ffffff; }
        .homeHero { min-height: 100vh; min-height: 100svh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 120px 24px 80px; background: radial-gradient(circle at 18% 24%, rgba(126,177,231,0.13), rgba(233,235,239,0) 28%), radial-gradient(circle at 82% 74%, rgba(15,23,42,0.035), rgba(233,235,239,0) 32%), #e9ebef; }
        .homeHeroInner { --motion-x: max(0px, calc((100vw - min(1120px, calc(100vw - 48px))) / 2 - 8px)); --motion-y: 86px; position: relative; z-index: 3; width: min(1120px, calc(100vw - 48px)); text-align: center; animation: homeEdgeMove 38s linear infinite alternate; will-change: transform; }
        @keyframes homeEdgeMove { 0% { transform: translate3d(calc(-1 * var(--motion-x)), calc(-1 * var(--motion-y)), 0); } 25% { transform: translate3d(var(--motion-x), calc(-0.72 * var(--motion-y)), 0); } 50% { transform: translate3d(var(--motion-x), var(--motion-y), 0); } 75% { transform: translate3d(calc(-1 * var(--motion-x)), var(--motion-y), 0); } 100% { transform: translate3d(calc(-1 * var(--motion-x)), calc(-1 * var(--motion-y)), 0); } }
        @keyframes homeLayerSafeMove { 0% { transform: translate3d(0, 0, 0); } 25% { transform: translate3d(var(--motion-x), 0, 0); } 50% { transform: translate3d(var(--motion-x), var(--motion-y), 0); } 75% { transform: translate3d(0, var(--motion-y), 0); } 100% { transform: translate3d(0, 0, 0); } }
        .homeBrand { margin: 0; font-size: clamp(48px, 5.4vw, 80px); line-height: .92; letter-spacing: -.075em; font-weight: 950; }
        .homeSlogan, .homeLayerKicker { margin: 16px 0 0; font-size: clamp(40px, 7vw, 56px); line-height: .98; letter-spacing: -.07em; font-weight: 950; }
        .homeDesc, .homeLayerTitle { margin: 16px auto 0; max-width: 1120px; font-size: clamp(21px, 2.15vw, 32px); line-height: 1.28; letter-spacing: -.035em; color: #475467; font-weight: 760; text-wrap: balance; }
        .homeActions { margin-top: 32px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .homeGlassButton { min-height: 46px; padding: 0 24px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; text-decoration: none; color: #111827; font-size: 14px; font-weight: 850; background: radial-gradient(circle at 18% 8%, rgba(255,255,255,.78), rgba(255,255,255,.26) 42%, rgba(255,255,255,.08) 76%); background-color: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.52); box-shadow: 0 10px 26px rgba(15,23,42,.08), inset 0 1px 0 rgba(255,255,255,.68), inset 0 -8px 16px rgba(15,23,42,.025); backdrop-filter: blur(12px) saturate(160%); -webkit-backdrop-filter: blur(12px) saturate(160%); }
        .homeLayer { position: relative; overflow: hidden; background: #e9ebef; padding: 88px 0 96px; }
        .homeLayerInner { position: relative; z-index: 2; width: min(1240px, calc(100vw - 48px)); margin: 0 auto; }
        .homeMotionZone { position: relative; height: 370px; margin-bottom: 34px; overflow: hidden; }
        .homeStatsHeadZone { height: 270px; }
        .homeLayerHead { --motion-x: max(0px, calc(min(1240px, calc(100vw - 48px)) - min(980px, calc(100vw - 48px)))); --motion-y: 120px; position: absolute; left: 0; top: 0; max-width: min(980px, calc(100vw - 48px)); animation: homeLayerSafeMove 34s linear infinite alternate; will-change: transform; }
        .homeLayerKicker { margin-top: 0; }
        .homeLayerTitle { margin-left: 0; margin-right: 0; }
        .homeLayerDesc { margin-top: 14px; max-width: 880px; font-size: 17px; line-height: 1.58; color: #586275; font-weight: 620; text-wrap: balance; }
        .homeCarouselShell { position: relative; width: 100vw; margin-left: calc((100vw - min(1240px, calc(100vw - 48px))) / -2); }
        .homeTrack { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(300px, calc((min(1240px, calc(100vw - 48px)) - 48px) / 3)); gap: 24px; overflow-x: auto; overflow-y: hidden; scroll-snap-type: none; scroll-behavior: auto; scrollbar-width: none; padding: 4px max(140px, calc((100vw - 1240px) / 2 + 140px)) 14px; will-change: scroll-position; }
        .homeTrack::-webkit-scrollbar { display: none; }
        .homeGrid, .homeStatsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
        .homeCard { scroll-snap-align: none; min-height: 300px; border-radius: 44px; padding: 34px; display: flex; align-items: center; background: #d8dee8; border: none; box-shadow: none; }
        .homeCard:hover { background: #d1d8e3; box-shadow: none; transform: none; }
        .homeCardContent { display: block; max-width: 390px; }
        .homeCard h3 { margin: 0 0 14px; font-size: 26px; line-height: 1.06; letter-spacing: -.045em; font-weight: 950; }
        .homeCard p { margin: 0; max-width: 390px; font-size: 16px; line-height: 1.58; color: #4b5563; font-weight: 620; text-wrap: balance; }
        .homeStatCard { min-height: 220px; justify-content: center; text-align: center; }
        .homeStatCard strong { display: block; font-size: clamp(36px, 4.2vw, 56px); line-height: 1; letter-spacing: -.06em; font-weight: 950; }
        .homeStatCard span { display: block; margin-top: 12px; color: #4b5563; font-size: 16px; font-weight: 700; }
        .homeArrow { position: absolute; top: 50%; z-index: 30; width: 54px; height: 54px; padding: 0; border-radius: 999px; border: 1px solid rgba(255,255,255,.5); display: flex; align-items: center; justify-content: center; color: rgba(17,24,39,.88); background: radial-gradient(circle at 22% 14%, rgba(255,255,255,.68), rgba(255,255,255,.22) 38%, rgba(255,255,255,.07) 76%); background-color: rgba(255,255,255,.14); box-shadow: 0 12px 34px rgba(15,23,42,.11), inset 0 1px 0 rgba(255,255,255,.68), inset 0 -8px 18px rgba(15,23,42,.035); backdrop-filter: blur(9px) saturate(150%); -webkit-backdrop-filter: blur(9px) saturate(150%); cursor: pointer; transform: translate3d(0,-50%,0); opacity: .88; line-height: 1; }
        .homeArrowGlyph { display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 37px; font-weight: 750; line-height: 1; transform: translateY(-2px); pointer-events: none; }
        .homeArrow:hover, .homeArrow:active, .homeArrow:focus, .homeArrow:focus-visible { top: 50%; transform: translate3d(0,-50%,0); opacity: .96; background-color: rgba(255,255,255,.2); border-color: rgba(126,177,231,.55); }
        .homeArrowLeft { left: 24px; } .homeArrowRight { right: 38px; }
        .homeDots { margin-top: 30px; display: flex; justify-content: center; align-items: center; gap: 12px; }
        .homeDots button { width: 12px; height: 12px; padding: 0; border: none; border-radius: 999px; background: rgba(15,23,42,.24); cursor: pointer; transition: width 160ms linear, background-color 160ms linear; }
        .homeDots button[aria-current="true"] { width: 34px; background: rgba(15,23,42,.78); }
        .homeCta { position: relative; min-height: 560px; padding: 110px 24px 128px; text-align: center; background: #e9ebef; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .homeCtaInner { --motion-x: max(0px, calc((100vw - min(1120px, calc(100vw - 48px))) / 2 - 8px)); --motion-y: 92px; position: relative; z-index: 2; width: min(1120px, calc(100vw - 48px)); animation: homeEdgeMove 38s linear infinite alternate; will-change: transform; }
        .homeCta h2 { margin: 0; font-size: clamp(40px, 7vw, 56px); line-height: .98; letter-spacing: -.07em; font-weight: 950; }
        .homeCta p { margin: 18px auto 0; max-width: 1100px; font-size: clamp(21px, 2.2vw, 32px); line-height: 1.28; color: #475467; font-weight: 760; text-wrap: balance; }
        @media (max-width: 760px) { .homeHero { padding: 104px 18px 70px; } .homeHeroInner, .homeLayerHead, .homeCtaInner { animation: none; } .homeMotionZone, .homeStatsHeadZone { height: auto; margin-bottom: 34px; overflow: visible; } .homeLayerHead { position: relative; } .homeTrack { grid-auto-columns: minmax(280px, 86vw); padding-left: 84px; padding-right: 84px; } .homeArrowLeft { left: 10px; } .homeArrowRight { right: 10px; } }
      `}</style>

      <section className="homeHero"><div className="homeHeroInner"><h1 className="homeBrand">{t.brand}</h1><p className="homeSlogan">{t.slogan}</p><p className="homeDesc">{t.desc}</p><div className="homeActions"><a href={localePath(locale,"/product")} className="homeGlassButton">{t.explore}</a><a href="mailto:one@ninespro.com" className="homeGlassButton">{t.contact}</a></div></div></section>
      <SectionGap/><ShowcaseSection section={t.products}/><SectionGap/><ShowcaseSection section={t.solutions}/><SectionGap/><ShowcaseSection section={t.ai}/><SectionGap/><ShowcaseSection section={t.development}/><SectionGap/><ShowcaseSection section={t.projects}/><SectionGap/><ShowcaseSection section={t.why}/><SectionGap/><StatSection title={t.statsTitle} desc={t.statsDesc} stats={t.stats}/><SectionGap/><ShowcaseSection section={t.testimonials}/><SectionGap/><ShowcaseSection section={t.partners}/><SectionGap/><ShowcaseSection section={t.contactSection}/><SectionGap/>
      <section className="homeCta"><div className="homeCtaInner"><h2>{t.finalTitle}</h2><p>{t.finalDesc}</p><div className="homeActions"><a href="mailto:one@ninespro.com" className="homeGlassButton">{t.finalButton}</a></div></div></section>
    </main>
  );
}
