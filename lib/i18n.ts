export type Locale = "zh" | "zh-TW" | "en";
export type SectionKey = "product" | "solution" | "technology" | "resources" | "company";

export type PageCard = {
  title: string;
  desc: string;
  href?: string;
};

export type PageGroup = {
  id: string;
  title: string;
  desc: string;
  cards: PageCard[];
};

export type PageContent = {
  title: string;
  desc: string;
  groups: PageGroup[];
};

export const locales = ["zh", "zh-TW", "en"] as const;

export function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export const commonText: Record<Locale, { view: string }> = {
  zh: { view: "查看" },
  "zh-TW": { view: "查看" },
  en: { view: "View" },
};

export const pages: Record<SectionKey, Record<Locale, PageContent>> = {
  product: {
    zh: {
      title: "产品中心",
      desc: "展示 NinesPro 的工具、文书、学习、知识、办公、金融和 AI 自动化能力矩阵。",
      groups: [
        {
          id: "documents",
          title: "文书与内容",
          desc: "生成通知、申请、会议纪要、报告和内容草稿。",
          cards: [
            { title: "文书模板", desc: "生成常见通知、申请与会议纪要草稿。", href: "#documents" },
            { title: "写作助手", desc: "润色、改写、总结和多语言表达。", href: "#documents" },
            { title: "报告生成", desc: "把要点、数据和资料整理成清晰报告。", href: "#documents" },
            { title: "合同摘要", desc: "提取关键条款、风险点和待确认事项。", href: "#documents" },
          ],
        },
        {
          id: "learning",
          title: "学习与知识",
          desc: "为学习、复习、资料整理和知识管理提供入口。",
          cards: [
            { title: "学习计划", desc: "根据目标与时间制定学习计划。", href: "#learning" },
            { title: "知识库", desc: "沉淀文档、笔记、资料和答案。", href: "#learning" },
            { title: "题目解析", desc: "拆解题目、解释步骤并输出建议。", href: "#learning" },
            { title: "阅读总结", desc: "对文章、文档和资料进行摘要。", href: "#learning" },
          ],
        },
        {
          id: "automation",
          title: "智能自动化",
          desc: "把重复任务、数据处理和业务流程交给自动化系统。",
          cards: [
            { title: "工作流自动化", desc: "连接任务、审批、通知和执行记录。", href: "#automation" },
            { title: "数据处理", desc: "清洗、分类、提取和结构化业务数据。", href: "#automation" },
            { title: "智能客服", desc: "面向常见问题、资料查询和服务支持。", href: "#automation" },
            { title: "任务代理", desc: "用 Agent 执行多步骤业务任务。", href: "#automation" },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "產品中心",
      desc: "展示 NinesPro 的工具、文書、學習、知識、辦公、金融和 AI 自動化能力矩陣。",
      groups: [
        {
          id: "documents",
          title: "文書與內容",
          desc: "生成通知、申請、會議紀要、報告和內容草稿。",
          cards: [
            { title: "文書模板", desc: "生成常見通知、申請與會議紀要草稿。", href: "#documents" },
            { title: "寫作助手", desc: "潤色、改寫、總結和多語言表達。", href: "#documents" },
            { title: "報告生成", desc: "把要點、數據和資料整理成清晰報告。", href: "#documents" },
            { title: "合約摘要", desc: "提取關鍵條款、風險點和待確認事項。", href: "#documents" },
          ],
        },
        {
          id: "learning",
          title: "學習與知識",
          desc: "為學習、複習、資料整理和知識管理提供入口。",
          cards: [
            { title: "學習計畫", desc: "根據目標與時間制定學習計畫。", href: "#learning" },
            { title: "知識庫", desc: "沉澱文檔、筆記、資料和答案。", href: "#learning" },
            { title: "題目解析", desc: "拆解題目、解釋步驟並輸出建議。", href: "#learning" },
            { title: "閱讀總結", desc: "對文章、文檔和資料進行摘要。", href: "#learning" },
          ],
        },
        {
          id: "automation",
          title: "智能自動化",
          desc: "把重複任務、數據處理和業務流程交給自動化系統。",
          cards: [
            { title: "工作流自動化", desc: "連接任務、審批、通知和執行記錄。", href: "#automation" },
            { title: "數據處理", desc: "清洗、分類、提取和結構化業務數據。", href: "#automation" },
            { title: "智能客服", desc: "面向常見問題、資料查詢和服務支持。", href: "#automation" },
            { title: "任務代理", desc: "用 Agent 執行多步驟業務任務。", href: "#automation" },
          ],
        },
      ],
    },
    en: {
      title: "Product",
      desc: "NinesPro product matrix for tools, documents, learning, knowledge, office workflows, finance, and AI automation.",
      groups: [
        {
          id: "documents",
          title: "Documents & Content",
          desc: "Generate notices, applications, meeting notes, reports, and content drafts.",
          cards: [
            { title: "Document Templates", desc: "Generate common notices, applications, and meeting note drafts.", href: "#documents" },
            { title: "Writing Assistant", desc: "Polish, rewrite, summarize, and localize content.", href: "#documents" },
            { title: "Report Builder", desc: "Turn notes, data, and materials into clear reports.", href: "#documents" },
            { title: "Contract Summary", desc: "Extract key terms, risks, and follow-up items.", href: "#documents" },
          ],
        },
        {
          id: "learning",
          title: "Learning & Knowledge",
          desc: "Tools for study plans, review, material organization, and knowledge management.",
          cards: [
            { title: "Study Plans", desc: "Create learning plans based on goals and time.", href: "#learning" },
            { title: "Knowledge Base", desc: "Organize documents, notes, references, and answers.", href: "#learning" },
            { title: "Problem Explanations", desc: "Break down questions and explain solving steps.", href: "#learning" },
            { title: "Reading Summaries", desc: "Summarize articles, documents, and research materials.", href: "#learning" },
          ],
        },
        {
          id: "automation",
          title: "AI Automation",
          desc: "Automate repetitive tasks, data processing, and business workflows.",
          cards: [
            { title: "Workflow Automation", desc: "Connect tasks, approvals, notifications, and execution logs.", href: "#automation" },
            { title: "Data Processing", desc: "Clean, classify, extract, and structure business data.", href: "#automation" },
            { title: "AI Support", desc: "Answer questions, search resources, and support services.", href: "#automation" },
            { title: "Task Agents", desc: "Use agents to complete multi-step business work.", href: "#automation" },
          ],
        },
      ],
    },
  },

  solution: {
    zh: {
      title: "解决方案",
      desc: "把文书、学习、知识、工具和自动化能力组合成面向业务的解决方案。",
      groups: [
        {
          id: "business",
          title: "业务",
          desc: "面向企业管理、运营、数据和流程自动化。",
          cards: [
            { title: "业务自动化", desc: "减少重复劳动，提升流程执行效率。", href: "#business" },
            { title: "运营管理", desc: "任务、审批、协作和执行记录统一管理。", href: "#business" },
            { title: "数据洞察", desc: "把业务数据转化为报告和决策支持。", href: "#business" },
            { title: "客户支持", desc: "知识库、问答和智能客服系统。", href: "#business" },
          ],
        },
        {
          id: "education",
          title: "教育",
          desc: "面向学习、复习、资料整理和教学辅助。",
          cards: [
            { title: "学习计划", desc: "制定学习目标、周期和复习节奏。", href: "#education" },
            { title: "资料总结", desc: "把资料整理成重点、提纲和问答。", href: "#education" },
            { title: "题目解析", desc: "解释步骤、知识点和错误原因。", href: "#education" },
            { title: "知识管理", desc: "沉淀课程、笔记和学习资料。", href: "#education" },
          ],
        },
        {
          id: "startup",
          title: "创业",
          desc: "从想法、MVP、官网到产品基础设施。",
          cards: [
            { title: "MVP 构建", desc: "快速验证产品方向和核心功能。", href: "#startup" },
            { title: "官网落地页", desc: "面向品牌展示和转化的首页系统。", href: "#startup" },
            { title: "SaaS 基础", desc: "用户、权限、订阅和后台管理。", href: "#startup" },
            { title: "品牌系统", desc: "统一视觉、文案和数字体验。", href: "#startup" },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "解決方案",
      desc: "把文書、學習、知識、工具和自動化能力組合成面向業務的解決方案。",
      groups: [
        {
          id: "business",
          title: "業務",
          desc: "面向企業管理、營運、數據和流程自動化。",
          cards: [
            { title: "業務自動化", desc: "減少重複勞動，提升流程執行效率。", href: "#business" },
            { title: "營運管理", desc: "任務、審批、協作和執行記錄統一管理。", href: "#business" },
            { title: "數據洞察", desc: "把業務數據轉化為報告和決策支持。", href: "#business" },
            { title: "客戶支持", desc: "知識庫、問答和智能客服系統。", href: "#business" },
          ],
        },
        {
          id: "education",
          title: "教育",
          desc: "面向學習、複習、資料整理和教學輔助。",
          cards: [
            { title: "學習計畫", desc: "制定學習目標、週期和複習節奏。", href: "#education" },
            { title: "資料總結", desc: "把資料整理成重點、提綱和問答。", href: "#education" },
            { title: "題目解析", desc: "解釋步驟、知識點和錯誤原因。", href: "#education" },
            { title: "知識管理", desc: "沉澱課程、筆記和學習資料。", href: "#education" },
          ],
        },
        {
          id: "startup",
          title: "新創",
          desc: "從想法、MVP、官網到產品基礎設施。",
          cards: [
            { title: "MVP 構建", desc: "快速驗證產品方向和核心功能。", href: "#startup" },
            { title: "官網落地頁", desc: "面向品牌展示和轉化的首頁系統。", href: "#startup" },
            { title: "SaaS 基礎", desc: "用戶、權限、訂閱和後台管理。", href: "#startup" },
            { title: "品牌系統", desc: "統一視覺、文案和數位體驗。", href: "#startup" },
          ],
        },
      ],
    },
    en: {
      title: "Solution",
      desc: "Solutions for business, education, startups, and teams using documents, knowledge, tools, and automation.",
      groups: [
        {
          id: "business",
          title: "Business",
          desc: "Operations, management, data, and workflow automation.",
          cards: [
            { title: "Business Automation", desc: "Reduce repetitive work and improve process execution.", href: "#business" },
            { title: "Operations Management", desc: "Tasks, approvals, collaboration, and execution records.", href: "#business" },
            { title: "Data Insights", desc: "Turn business data into reports and decisions.", href: "#business" },
            { title: "Customer Support", desc: "Knowledge base, Q&A, and AI support systems.", href: "#business" },
          ],
        },
        {
          id: "education",
          title: "Education",
          desc: "Learning, review, material organization, and teaching assistance.",
          cards: [
            { title: "Study Plans", desc: "Plan learning goals, cycles, and review rhythm.", href: "#education" },
            { title: "Material Summaries", desc: "Turn resources into highlights, outlines, and Q&A.", href: "#education" },
            { title: "Problem Explanations", desc: "Explain steps, concepts, and mistakes.", href: "#education" },
            { title: "Knowledge Management", desc: "Organize courses, notes, and learning materials.", href: "#education" },
          ],
        },
        {
          id: "startup",
          title: "Startup",
          desc: "From idea and MVP to website and product infrastructure.",
          cards: [
            { title: "MVP Build", desc: "Validate product direction and core features quickly.", href: "#startup" },
            { title: "Landing Pages", desc: "Brand presentation and conversion-focused pages.", href: "#startup" },
            { title: "SaaS Foundation", desc: "Users, permissions, subscriptions, and admin panels.", href: "#startup" },
            { title: "Brand System", desc: "Unified visuals, copy, and digital experience.", href: "#startup" },
          ],
        },
      ],
    },
  },

  technology: {
    zh: {
      title: "技术",
      desc: "围绕 AI 代理、云端架构、数据智能和自动化执行构建。",
      groups: [
        {
          id: "ai",
          title: "智能代理",
          desc: "让系统理解任务、拆解流程并调用工具执行。",
          cards: [
            { title: "任务理解", desc: "识别目标、上下文和约束。", href: "#ai" },
            { title: "流程拆解", desc: "把复杂任务拆解为可执行步骤。", href: "#ai" },
            { title: "工具调用", desc: "连接 API、数据库和业务系统。", href: "#ai" },
            { title: "结果校验", desc: "对输出进行结构化检查和追踪。", href: "#ai" },
          ],
        },
        {
          id: "cloud",
          title: "云端架构",
          desc: "稳定、可扩展、可维护的云端系统基础。",
          cards: [
            { title: "API 架构", desc: "面向集成和自动化的服务接口。", href: "#cloud" },
            { title: "权限系统", desc: "用户、角色、组织和安全控制。", href: "#cloud" },
            { title: "数据存储", desc: "面向业务查询和报告的结构化数据层。", href: "#cloud" },
            { title: "监控运维", desc: "日志、性能、错误和可用性监控。", href: "#cloud" },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "技術",
      desc: "圍繞 AI 代理、雲端架構、數據智能和自動化執行構建。",
      groups: [
        {
          id: "ai",
          title: "智能代理",
          desc: "讓系統理解任務、拆解流程並調用工具執行。",
          cards: [
            { title: "任務理解", desc: "識別目標、上下文和約束。", href: "#ai" },
            { title: "流程拆解", desc: "把複雜任務拆解為可執行步驟。", href: "#ai" },
            { title: "工具調用", desc: "連接 API、資料庫和業務系統。", href: "#ai" },
            { title: "結果校驗", desc: "對輸出進行結構化檢查和追蹤。", href: "#ai" },
          ],
        },
        {
          id: "cloud",
          title: "雲端架構",
          desc: "穩定、可擴展、可維護的雲端系統基礎。",
          cards: [
            { title: "API 架構", desc: "面向整合和自動化的服務接口。", href: "#cloud" },
            { title: "權限系統", desc: "用戶、角色、組織和安全控制。", href: "#cloud" },
            { title: "數據存儲", desc: "面向業務查詢和報告的結構化數據層。", href: "#cloud" },
            { title: "監控運維", desc: "日誌、性能、錯誤和可用性監控。", href: "#cloud" },
          ],
        },
      ],
    },
    en: {
      title: "Technology",
      desc: "Built around AI agents, cloud architecture, data intelligence, and automation execution.",
      groups: [
        {
          id: "ai",
          title: "AI Agents",
          desc: "Systems that understand tasks, break down workflows, and call tools.",
          cards: [
            { title: "Task Understanding", desc: "Identify goals, context, and constraints.", href: "#ai" },
            { title: "Workflow Breakdown", desc: "Turn complex tasks into executable steps.", href: "#ai" },
            { title: "Tool Calling", desc: "Connect APIs, databases, and business systems.", href: "#ai" },
            { title: "Result Validation", desc: "Check and trace structured outputs.", href: "#ai" },
          ],
        },
        {
          id: "cloud",
          title: "Cloud Architecture",
          desc: "Stable, scalable, and maintainable cloud systems.",
          cards: [
            { title: "API Architecture", desc: "Service interfaces for integration and automation.", href: "#cloud" },
            { title: "Permission Systems", desc: "Users, roles, organizations, and security controls.", href: "#cloud" },
            { title: "Data Storage", desc: "Structured data layers for queries and reporting.", href: "#cloud" },
            { title: "Monitoring", desc: "Logs, performance, errors, and uptime monitoring.", href: "#cloud" },
          ],
        },
      ],
    },
  },

  resources: {
    zh: {
      title: "资源",
      desc: "博客、文档、帮助中心和更新日志，帮助用户理解产品、方法和流程。",
      groups: [
        {
          id: "blog",
          title: "博客",
          desc: "关于 AI、自动化、产品设计和工程实践的文章。",
          cards: [
            { title: "AI 实践", desc: "AI 代理、知识系统和自动化落地经验。", href: "#blog" },
            { title: "产品方法", desc: "从想法到产品系统的设计方法。", href: "#blog" },
            { title: "工程笔记", desc: "云端、API、性能和架构实践。", href: "#blog" },
            { title: "品牌与体验", desc: "数字品牌、视觉系统和体验设计。", href: "#blog" },
          ],
        },
        {
          id: "docs",
          title: "文档",
          desc: "产品能力、接口、流程和使用说明。",
          cards: [
            { title: "快速开始", desc: "了解产品结构和基础使用流程。", href: "#docs" },
            { title: "API 文档", desc: "集成、认证、数据和自动化接口。", href: "#docs" },
            { title: "模板说明", desc: "文书、学习、报告和工作流模板。", href: "#docs" },
            { title: "最佳实践", desc: "面向团队和业务场景的使用建议。", href: "#docs" },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "資源",
      desc: "部落格、文檔、幫助中心和更新日誌，幫助用戶理解產品、方法和流程。",
      groups: [
        {
          id: "blog",
          title: "部落格",
          desc: "關於 AI、自動化、產品設計和工程實踐的文章。",
          cards: [
            { title: "AI 實踐", desc: "AI 代理、知識系統和自動化落地經驗。", href: "#blog" },
            { title: "產品方法", desc: "從想法到產品系統的設計方法。", href: "#blog" },
            { title: "工程筆記", desc: "雲端、API、性能和架構實踐。", href: "#blog" },
            { title: "品牌與體驗", desc: "數位品牌、視覺系統和體驗設計。", href: "#blog" },
          ],
        },
        {
          id: "docs",
          title: "文檔",
          desc: "產品能力、接口、流程和使用說明。",
          cards: [
            { title: "快速開始", desc: "了解產品結構和基礎使用流程。", href: "#docs" },
            { title: "API 文檔", desc: "整合、認證、數據和自動化接口。", href: "#docs" },
            { title: "模板說明", desc: "文書、學習、報告和工作流模板。", href: "#docs" },
            { title: "最佳實踐", desc: "面向團隊和業務場景的使用建議。", href: "#docs" },
          ],
        },
      ],
    },
    en: {
      title: "Resources",
      desc: "Blog, documentation, help center, and changelog for learning products, methods, and workflows.",
      groups: [
        {
          id: "blog",
          title: "Blog",
          desc: "Articles about AI, automation, product design, and engineering practice.",
          cards: [
            { title: "AI Practice", desc: "AI agents, knowledge systems, and automation implementation.", href: "#blog" },
            { title: "Product Methods", desc: "Methods from idea to product systems.", href: "#blog" },
            { title: "Engineering Notes", desc: "Cloud, API, performance, and architecture practice.", href: "#blog" },
            { title: "Brand & Experience", desc: "Digital brand, visual systems, and experience design.", href: "#blog" },
          ],
        },
        {
          id: "docs",
          title: "Documentation",
          desc: "Product capabilities, APIs, workflows, and usage guides.",
          cards: [
            { title: "Quick Start", desc: "Understand the product structure and basic workflow.", href: "#docs" },
            { title: "API Docs", desc: "Integration, authentication, data, and automation APIs.", href: "#docs" },
            { title: "Templates", desc: "Documents, learning, reports, and workflow templates.", href: "#docs" },
            { title: "Best Practices", desc: "Guides for teams and business scenarios.", href: "#docs" },
          ],
        },
      ],
    },
  },

  company: {
    zh: {
      title: "公司",
      desc: "NINESPRO 是面向下一代 AI 软件、企业平台、云端系统与数字体验的产品与工程品牌。",
      groups: [
        {
          id: "about",
          title: "关于",
          desc: "我们将设计、工程、AI 和云端能力组合成可交付的数字系统。",
          cards: [
            { title: "品牌愿景", desc: "尽知天下事，弹指皆可得。", href: "#about" },
            { title: "产品原则", desc: "清晰、稳定、可扩展、可长期增长。", href: "#about" },
            { title: "设计标准", desc: "极简、克制、高级且面向真实使用。", href: "#about" },
            { title: "工程标准", desc: "结构清楚、性能稳定、可维护。", href: "#about" },
          ],
        },
        {
          id: "contact",
          title: "联系",
          desc: "用正确的渠道联系 NINESPRO。",
          cards: [
            { title: "商务邮箱", desc: "support@ninespro.com", href: "mailto:support@ninespro.com" },
            { title: "合作邮箱", desc: "partner@ninespro.com", href: "mailto:partner@ninespro.com" },
            { title: "销售邮箱", desc: "sales@ninespro.com", href: "mailto:sales@ninespro.com" },
            { title: "项目联系", desc: "进入联系页面提交项目需求。", href: "/contact" },
          ],
        },
      ],
    },
    "zh-TW": {
      title: "公司",
      desc: "NINESPRO 是面向下一代 AI 軟體、企業平台、雲端系統與數位體驗的產品與工程品牌。",
      groups: [
        {
          id: "about",
          title: "關於",
          desc: "我們將設計、工程、AI 和雲端能力組合成可交付的數位系統。",
          cards: [
            { title: "品牌願景", desc: "盡知天下事，彈指皆可得。", href: "#about" },
            { title: "產品原則", desc: "清晰、穩定、可擴展、可長期成長。", href: "#about" },
            { title: "設計標準", desc: "極簡、克制、高級且面向真實使用。", href: "#about" },
            { title: "工程標準", desc: "結構清楚、性能穩定、可維護。", href: "#about" },
          ],
        },
        {
          id: "contact",
          title: "聯絡",
          desc: "用正確的渠道聯絡 NINESPRO。",
          cards: [
            { title: "商務信箱", desc: "support@ninespro.com", href: "mailto:support@ninespro.com" },
            { title: "合作信箱", desc: "partner@ninespro.com", href: "mailto:partner@ninespro.com" },
            { title: "銷售信箱", desc: "sales@ninespro.com", href: "mailto:sales@ninespro.com" },
            { title: "項目聯絡", desc: "進入聯絡頁面提交項目需求。", href: "/contact" },
          ],
        },
      ],
    },
    en: {
      title: "Company",
      desc: "NINESPRO is a product and engineering brand for AI software, enterprise platforms, cloud systems, and digital experiences.",
      groups: [
        {
          id: "about",
          title: "About",
          desc: "We combine design, engineering, AI, and cloud capabilities into deliverable digital systems.",
          cards: [
            { title: "Vision", desc: "The world’s knowledge, at your fingertips.", href: "#about" },
            { title: "Product Principles", desc: "Clear, stable, scalable, and built for long-term growth.", href: "#about" },
            { title: "Design Standard", desc: "Minimal, precise, premium, and built for real use.", href: "#about" },
            { title: "Engineering Standard", desc: "Clean structure, stable performance, and maintainability.", href: "#about" },
          ],
        },
        {
          id: "contact",
          title: "Contact",
          desc: "Reach NINESPRO through the right channel.",
          cards: [
            { title: "Business Email", desc: "support@ninespro.com", href: "mailto:support@ninespro.com" },
            { title: "Partnership", desc: "partner@ninespro.com", href: "mailto:partner@ninespro.com" },
            { title: "Sales", desc: "sales@ninespro.com", href: "mailto:sales@ninespro.com" },
            { title: "Project Contact", desc: "Open the contact page and submit project needs.", href: "/contact" },
          ],
        },
      ],
    },
  },
};

export function getSectionContent(section: SectionKey, locale: Locale): PageContent {
  return pages[section][locale];
}
