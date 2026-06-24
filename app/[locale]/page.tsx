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
  if (raw === "zh-TW") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

const copy: Record<Locale, PageCopy> = {
  "zh": {
    "brand": "NINESPRO",
    "slogan": "尽知天下事，弹指皆可得。",
    "desc": "设计并工程化下一代 AI 软件、企业平台、云端系统与数字体验。",
    "explore": "探索产品",
    "contact": "联系我们",
    "finalTitle": "启动你的下一个项目。",
    "finalDesc": "告诉我们你想构建什么，NINESPRO 帮你把想法变成现实。",
    "finalButton": "联系我们",
    "products": {
      "kicker": "产品",
      "title": "智能、规模与速度。",
      "desc": "将 AI、云端、设计与企业工程整合为面向未来的产品体系。",
      "items": [
        {
          "title": "Nines AI",
          "desc": "面向知识、写作、研究与自动化的 AI Agent 与智能工作流。"
        },
        {
          "title": "Nines Cloud",
          "desc": "云端系统、API、仪表盘与数字产品基础设施。"
        },
        {
          "title": "Nines Studio",
          "desc": "极简网站、界面、品牌系统与数字体验。"
        },
        {
          "title": "Nines Enterprise",
          "desc": "企业定制软件、内部平台与自动化系统。"
        },
        {
          "title": "Nines Tools",
          "desc": "面向开发、文档、文本处理和效率场景的在线工具。"
        },
        {
          "title": "Nines Data",
          "desc": "数据看板、报告、可视化与商业智能系统。"
        },
        {
          "title": "Nines Flow",
          "desc": "审批、任务、流程与自动执行的工作流系统。"
        },
        {
          "title": "Nines Labs",
          "desc": "AI 产品原型与未来数字体验实验空间。"
        }
      ]
    },
    "solutions": {
      "kicker": "解决方案",
      "title": "从想法到系统。",
      "desc": "把业务问题转化为清晰、可执行、可扩展的数字系统。",
      "items": [
        {
          "title": "业务自动化",
          "desc": "用 AI 工作流和定制软件替代重复劳动。"
        },
        {
          "title": "AI 转型",
          "desc": "把大模型、Agent 和自动化接入真实业务流程。"
        },
        {
          "title": "数字平台",
          "desc": "构建 SaaS、门户、仪表盘和内部工具。"
        },
        {
          "title": "数据智能",
          "desc": "把数据转化为洞察、报告和决策系统。"
        },
        {
          "title": "创业系统",
          "desc": "MVP、产品原型、落地页和可扩展产品基础。"
        },
        {
          "title": "企业运营",
          "desc": "用于管理、协作和流程控制的内部平台。"
        },
        {
          "title": "教育学习",
          "desc": "学习工具、知识系统和 AI 辅助学习体验。"
        },
        {
          "title": "定制开发",
          "desc": "把独特业务流程转化为可靠软件系统。"
        }
      ]
    },
    "ai": {
      "kicker": "AI",
      "title": "以智能为核心。",
      "desc": "围绕 Agent、知识系统、文档智能和自动化执行，构建真正可落地的 AI 能力。",
      "items": [
        {
          "title": "AI 代理",
          "desc": "理解任务、拆解流程、调用工具并自动完成多步骤工作。"
        },
        {
          "title": "知识系统",
          "desc": "把文档、数据、经验与业务规则组织成可搜索的知识系统。"
        },
        {
          "title": "文档智能",
          "desc": "面向合同、报告、表格和资料的解析、总结与抽取。"
        },
        {
          "title": "研究助手",
          "desc": "用于调研、写作、分析和决策辅助的智能工作空间。"
        }
      ]
    },
    "development": {
      "kicker": "开发",
      "title": "从界面到平台。",
      "desc": "以产品化方式交付网站、SaaS、仪表盘、API、后台系统和企业内部工具。",
      "items": [
        {
          "title": "网站开发",
          "desc": "高性能官网、落地页、品牌页面与多语言站点。"
        },
        {
          "title": "SaaS 平台",
          "desc": "订阅、用户、权限、数据、运营后台和可扩展产品基础。"
        },
        {
          "title": "云端接口",
          "desc": "面向集成、自动化和外部应用的稳定 API 系统。"
        },
        {
          "title": "内部工具",
          "desc": "为团队管理、审批、协作和运营流程打造内部平台。"
        }
      ]
    },
    "projects": {
      "kicker": "案例",
      "title": "精选项目。",
      "desc": "覆盖 AI 平台、SaaS 仪表盘、企业官网与品牌系统。",
      "items": [
        {
          "title": "AI 平台",
          "desc": "文档处理、知识整理与工作流自动化空间。"
        },
        {
          "title": "SaaS 仪表盘",
          "desc": "用于业务数据和运营洞察的分析仪表盘。"
        },
        {
          "title": "企业官网",
          "desc": "面向品牌展示、转化与扩展的企业官网。"
        },
        {
          "title": "品牌系统",
          "desc": "面向数字产品长期增长的极简识别系统。"
        }
      ]
    },
    "why": {
      "kicker": "为什么选择 NINESPRO",
      "title": "不是外包，是系统能力。",
      "desc": "从策略、设计、工程、AI 到云端架构，用统一标准把想法变成可运行、可增长的产品。",
      "items": [
        {
          "title": "产品思维",
          "desc": "不只做页面，而是从产品、路径、转化和长期增长设计系统。"
        },
        {
          "title": "AI 原生",
          "desc": "把 AI 能力作为底层能力，而不是后期附加功能。"
        },
        {
          "title": "工程质量",
          "desc": "重视结构、性能、可维护性和长期扩展。"
        },
        {
          "title": "设计精度",
          "desc": "追求极简、清晰、高级且具有品牌一致性的数字体验。"
        }
      ]
    },
    "statsTitle": "信任来自结果。",
    "statsDesc": "为面向未来的产品、团队和组织构建稳定的数字基础。",
    "stats": [
      {
        "value": "100+",
        "label": "项目交付"
      },
      {
        "value": "99.9%",
        "label": "可用性目标"
      },
      {
        "value": "24/7",
        "label": "技术支持"
      },
      {
        "value": "50+",
        "label": "客户与团队"
      }
    ],
    "testimonials": {
      "kicker": "客户反馈",
      "title": "把复杂变清晰。",
      "desc": "我们帮助团队把分散需求变成可执行、可扩展的数字产品。",
      "items": [
        {
          "title": "创始人",
          "desc": "NINESPRO 帮我们把想法快速变成了可演示、可扩展的 MVP。"
        },
        {
          "title": "运营团队",
          "desc": "自动化系统减少了大量重复工作，让团队重新专注在关键业务上。"
        },
        {
          "title": "企业客户",
          "desc": "从官网到内部平台，整体体验更统一，交付也更稳定。"
        }
      ]
    },
    "partners": {
      "kicker": "合作",
      "title": "与创新者同行。",
      "desc": "面向创业团队、企业部门、教育组织和数字服务机构。",
      "items": [
        {
          "title": "创业团队",
          "desc": "从 MVP 到可增长产品基础。"
        },
        {
          "title": "企业组织",
          "desc": "内部平台、流程系统和企业数字化。"
        },
        {
          "title": "教育机构",
          "desc": "知识系统、学习工具和 AI 辅助体验。"
        },
        {
          "title": "服务机构",
          "desc": "为品牌、技术和交付团队提供产品工程能力。"
        }
      ]
    },
    "contactSection": {
      "kicker": "联系",
      "title": "开始一次认真构建。",
      "desc": "告诉我们你的项目方向、业务目标和当前问题，我们会帮助你整理成清晰的产品路径。",
      "items": [
        {
          "title": "商务邮箱",
          "desc": "support@ninespro.com"
        },
        {
          "title": "合作邮箱",
          "desc": "partner@ninespro.com"
        },
        {
          "title": "销售邮箱",
          "desc": "sales@ninespro.com"
        }
      ]
    }
  },
  "zh-TW": {
    "brand": "NINESPRO",
    "slogan": "盡知天下事，彈指皆可得。",
    "desc": "設計並工程化下一代 AI 軟體、企業平台、雲端系統與數位體驗。",
    "explore": "探索產品",
    "contact": "聯絡我們",
    "finalTitle": "啟動你的下一個項目。",
    "finalDesc": "告訴我們你想構建什麼，NINESPRO 幫你把想法變成現實。",
    "finalButton": "聯絡我們",
    "products": {
      "kicker": "產品",
      "title": "智能、規模與速度。",
      "desc": "將 AI、雲端、設計與企業工程整合為面向未來的產品體系。",
      "items": [
        {
          "title": "Nines AI",
          "desc": "面向知識、寫作、研究與自動化的 AI Agent 與智能工作流。"
        },
        {
          "title": "Nines Cloud",
          "desc": "雲端系統、API、儀表板與數位產品基礎設施。"
        },
        {
          "title": "Nines Studio",
          "desc": "極簡網站、介面、品牌系統與數位體驗。"
        },
        {
          "title": "Nines Enterprise",
          "desc": "企業定制軟體、內部平台與自動化系統。"
        },
        {
          "title": "Nines Tools",
          "desc": "面向開發、文檔、文字處理和效率場景的線上工具。"
        },
        {
          "title": "Nines Data",
          "desc": "數據看板、報告、視覺化與商業智能系統。"
        },
        {
          "title": "Nines Flow",
          "desc": "審批、任務、流程與自動執行的工作流系統。"
        },
        {
          "title": "Nines Labs",
          "desc": "AI 產品原型與未來數位體驗實驗空間。"
        }
      ]
    },
    "solutions": {
      "kicker": "解決方案",
      "title": "從想法到系統。",
      "desc": "把業務問題轉化為清晰、可執行、可擴展的數位系統。",
      "items": [
        {
          "title": "業務自動化",
          "desc": "用 AI 工作流和定制軟體替代重複勞動。"
        },
        {
          "title": "AI 轉型",
          "desc": "把大模型、Agent 和自動化接入真實業務流程。"
        },
        {
          "title": "數位平台",
          "desc": "構建 SaaS、入口網站、儀表板和內部工具。"
        },
        {
          "title": "數據智能",
          "desc": "把數據轉化為洞察、報告和決策系統。"
        },
        {
          "title": "新創系統",
          "desc": "MVP、產品原型、落地頁和可擴展產品基礎。"
        },
        {
          "title": "企業營運",
          "desc": "用於管理、協作和流程控制的內部平台。"
        },
        {
          "title": "教育學習",
          "desc": "學習工具、知識系統和 AI 輔助學習體驗。"
        },
        {
          "title": "定制開發",
          "desc": "把獨特業務流程轉化為可靠軟體系統。"
        }
      ]
    },
    "ai": {
      "kicker": "AI",
      "title": "以智能为核心。",
      "desc": "围绕 Agent、知识系统、文档智能和自动化执行，构建真正可落地的 AI 能力。",
      "items": [
        {
          "title": "AI 代理",
          "desc": "理解任务、拆解流程、调用工具并自动完成多步骤工作。"
        },
        {
          "title": "知识系统",
          "desc": "把文档、数据、经验与业务规则组织成可搜索的知识系统。"
        },
        {
          "title": "文档智能",
          "desc": "面向合同、报告、表格和资料的解析、总结与抽取。"
        },
        {
          "title": "研究助手",
          "desc": "用于调研、写作、分析和决策辅助的智能工作空间。"
        }
      ]
    },
    "development": {
      "kicker": "开发",
      "title": "从界面到平台。",
      "desc": "以产品化方式交付网站、SaaS、仪表盘、API、后台系统和企业内部工具。",
      "items": [
        {
          "title": "网站开发",
          "desc": "高性能官网、落地页、品牌页面与多语言站点。"
        },
        {
          "title": "SaaS 平台",
          "desc": "订阅、用户、权限、数据、运营后台和可扩展产品基础。"
        },
        {
          "title": "云端接口",
          "desc": "面向集成、自动化和外部应用的稳定 API 系统。"
        },
        {
          "title": "内部工具",
          "desc": "为团队管理、审批、协作和运营流程打造内部平台。"
        }
      ]
    },
    "projects": {
      "kicker": "案例",
      "title": "精选项目。",
      "desc": "覆盖 AI 平台、SaaS 仪表盘、企业官网与品牌系统。",
      "items": [
        {
          "title": "AI 平台",
          "desc": "文档处理、知识整理与工作流自动化空间。"
        },
        {
          "title": "SaaS 仪表盘",
          "desc": "用于业务数据和运营洞察的分析仪表盘。"
        },
        {
          "title": "企业官网",
          "desc": "面向品牌展示、转化与扩展的企业官网。"
        },
        {
          "title": "品牌系统",
          "desc": "面向数字产品长期增长的极简识别系统。"
        }
      ]
    },
    "why": {
      "kicker": "为什么选择 NINESPRO",
      "title": "不是外包，是系统能力。",
      "desc": "从策略、设计、工程、AI 到云端架构，用统一标准把想法变成可运行、可增长的产品。",
      "items": [
        {
          "title": "产品思维",
          "desc": "不只做页面，而是从产品、路径、转化和长期增长设计系统。"
        },
        {
          "title": "AI 原生",
          "desc": "把 AI 能力作为底层能力，而不是后期附加功能。"
        },
        {
          "title": "工程质量",
          "desc": "重视结构、性能、可维护性和长期扩展。"
        },
        {
          "title": "设计精度",
          "desc": "追求极简、清晰、高级且具有品牌一致性的数字体验。"
        }
      ]
    },
    "statsTitle": "信任来自结果。",
    "statsDesc": "为面向未来的产品、团队和组织构建稳定的数字基础。",
    "stats": [
      {
        "value": "100+",
        "label": "项目交付"
      },
      {
        "value": "99.9%",
        "label": "可用性目标"
      },
      {
        "value": "24/7",
        "label": "技术支持"
      },
      {
        "value": "50+",
        "label": "客户与团队"
      }
    ],
    "testimonials": {
      "kicker": "客戶反饋",
      "title": "把複雜變清晰。",
      "desc": "我們幫助團隊把分散需求變成可執行、可擴展的數位產品。",
      "items": [
        {
          "title": "創辦人",
          "desc": "NINESPRO 幫我們把想法快速變成了可演示、可擴展的 MVP。"
        },
        {
          "title": "營運團隊",
          "desc": "自動化系統減少了大量重複工作，讓團隊重新專注在關鍵業務上。"
        },
        {
          "title": "企業客戶",
          "desc": "從官網到內部平台，整體體驗更統一，交付也更穩定。"
        }
      ]
    },
    "partners": {
      "kicker": "合作",
      "title": "與創新者同行。",
      "desc": "面向新創團隊、企業部門、教育組織和數位服務機構。",
      "items": [
        {
          "title": "新創團隊",
          "desc": "從 MVP 到可成長產品基礎。"
        },
        {
          "title": "企業組織",
          "desc": "內部平台、流程系統和企業數位化。"
        },
        {
          "title": "教育機構",
          "desc": "知識系統、學習工具和 AI 輔助體驗。"
        },
        {
          "title": "服務機構",
          "desc": "為品牌、技術和交付團隊提供產品工程能力。"
        }
      ]
    },
    "contactSection": {
      "kicker": "聯絡",
      "title": "開始一次認真構建。",
      "desc": "告訴我們你的項目方向、業務目標和當前問題，我們會幫助你整理成清晰的產品路徑。",
      "items": [
        {
          "title": "商務信箱",
          "desc": "support@ninespro.com"
        },
        {
          "title": "合作信箱",
          "desc": "partner@ninespro.com"
        },
        {
          "title": "銷售信箱",
          "desc": "sales@ninespro.com"
        }
      ]
    }
  },
  "en": {
    "brand": "NINESPRO",
    "slogan": "The world’s knowledge, at your fingertips.",
    "desc": "Designing and engineering the next generation of AI-powered software, enterprise platforms, cloud systems, and digital experiences.",
    "explore": "Explore Product",
    "contact": "Contact Us",
    "finalTitle": "Start your next project.",
    "finalDesc": "Tell us what you want to build. NINESPRO will help you make it real.",
    "finalButton": "Contact Us",
    "products": {
      "kicker": "Product",
      "title": "Intelligence. Scale. Speed.",
      "desc": "AI, cloud, design, and enterprise engineering in one future-ready product system.",
      "items": [
        {
          "title": "Nines AI",
          "desc": "AI agents and workflows for knowledge, writing, research, and automation."
        },
        {
          "title": "Nines Cloud",
          "desc": "Cloud systems, APIs, dashboards, and digital product infrastructure."
        },
        {
          "title": "Nines Studio",
          "desc": "Minimal websites, interfaces, brand systems, and digital experiences."
        },
        {
          "title": "Nines Enterprise",
          "desc": "Custom software, internal platforms, and automation systems."
        },
        {
          "title": "Nines Tools",
          "desc": "Online utilities for developers, documents, text, and productivity."
        },
        {
          "title": "Nines Data",
          "desc": "Dashboards, reports, visualization, and business intelligence."
        },
        {
          "title": "Nines Flow",
          "desc": "Workflow systems for approvals, tasks, and process automation."
        },
        {
          "title": "Nines Labs",
          "desc": "Experimental AI prototypes and future digital experiences."
        }
      ]
    },
    "solutions": {
      "kicker": "Solution",
      "title": "From idea to system.",
      "desc": "Turn business problems into clear, executable, and scalable digital systems.",
      "items": [
        {
          "title": "Business Automation",
          "desc": "Replace repetitive work with AI workflows and custom software."
        },
        {
          "title": "AI Transformation",
          "desc": "Bring language models, agents, and automation into real business processes."
        },
        {
          "title": "Digital Platforms",
          "desc": "Build SaaS products, portals, dashboards, and internal tools."
        },
        {
          "title": "Data Intelligence",
          "desc": "Turn data into insights, reports, and decision systems."
        },
        {
          "title": "Startup Systems",
          "desc": "MVPs, prototypes, landing pages, and scalable product foundations."
        },
        {
          "title": "Enterprise Operations",
          "desc": "Internal platforms for management, collaboration, and workflow control."
        },
        {
          "title": "Education & Learning",
          "desc": "Learning tools, knowledge systems, and AI-assisted study experiences."
        },
        {
          "title": "Custom Development",
          "desc": "Transform unique processes into reliable software systems."
        }
      ]
    },
    "ai": {
      "kicker": "AI",
      "title": "Intelligence at the core.",
      "desc": "Agents, knowledge systems, document intelligence, and automation built for real workflows.",
      "items": [
        {
          "title": "AI Agents",
          "desc": "Understand tasks, break down processes, call tools, and execute multi-step work."
        },
        {
          "title": "Knowledge Systems",
          "desc": "Organize documents, data, experience, and rules into searchable systems."
        },
        {
          "title": "Document Intelligence",
          "desc": "Parse, summarize, and extract contracts, reports, forms, and files."
        },
        {
          "title": "Research Assistants",
          "desc": "AI workspaces for research, writing, analysis, and decision support."
        }
      ]
    },
    "development": {
      "kicker": "Development",
      "title": "From interface to platform.",
      "desc": "Websites, SaaS products, dashboards, APIs, internal tools, and enterprise systems.",
      "items": [
        {
          "title": "Web Development",
          "desc": "High-performance websites, landing pages, brand pages, and multilingual sites."
        },
        {
          "title": "SaaS Platforms",
          "desc": "Subscriptions, users, permissions, data, admin panels, and scalable foundations."
        },
        {
          "title": "Cloud APIs",
          "desc": "Reliable APIs for integrations, automation, and external applications."
        },
        {
          "title": "Internal Tools",
          "desc": "Internal platforms for management, approvals, collaboration, and operations."
        }
      ]
    },
    "projects": {
      "kicker": "Case Studies",
      "title": "Featured projects.",
      "desc": "AI platforms, SaaS dashboards, enterprise websites, and brand systems.",
      "items": [
        {
          "title": "AI Platform",
          "desc": "Document processing, knowledge organization, and workflow automation."
        },
        {
          "title": "SaaS Dashboard",
          "desc": "Analytics dashboard for business data and operational insights."
        },
        {
          "title": "Enterprise Website",
          "desc": "Corporate website for brand presence, conversion, and scalability."
        },
        {
          "title": "Brand System",
          "desc": "Minimal identity system for long-term digital product growth."
        }
      ]
    },
    "why": {
      "kicker": "Why NINESPRO",
      "title": "Not outsourcing. System capability.",
      "desc": "Strategy, design, engineering, AI, and cloud architecture in one product standard.",
      "items": [
        {
          "title": "Product Thinking",
          "desc": "We design systems around product paths, conversion, and long-term growth."
        },
        {
          "title": "AI Native",
          "desc": "AI is a core capability, not a feature added at the end."
        },
        {
          "title": "Engineering Quality",
          "desc": "Structure, performance, maintainability, and long-term scalability."
        },
        {
          "title": "Design Precision",
          "desc": "Minimal, clear, premium, and consistent digital experiences."
        }
      ]
    },
    "statsTitle": "Trust comes from results.",
    "statsDesc": "Stable digital foundations for future-facing products, teams, and organizations.",
    "stats": [
      {
        "value": "100+",
        "label": "Projects Delivered"
      },
      {
        "value": "99.9%",
        "label": "Uptime Target"
      },
      {
        "value": "24/7",
        "label": "Support"
      },
      {
        "value": "50+",
        "label": "Clients & Teams"
      }
    ],
    "testimonials": {
      "kicker": "Testimonials",
      "title": "Turning complexity into clarity.",
      "desc": "We help teams transform scattered requirements into scalable digital products.",
      "items": [
        {
          "title": "Founder",
          "desc": "NINESPRO helped us turn an idea into a demo-ready and scalable MVP."
        },
        {
          "title": "Operations Team",
          "desc": "Automation reduced repetitive work and helped the team focus on key operations."
        },
        {
          "title": "Enterprise Client",
          "desc": "From website to internal platform, the experience became more unified and stable."
        }
      ]
    },
    "partners": {
      "kicker": "Partners",
      "title": "Built with innovators.",
      "desc": "For startups, enterprises, education teams, and digital service organizations.",
      "items": [
        {
          "title": "Startups",
          "desc": "From MVP to a scalable product foundation."
        },
        {
          "title": "Enterprises",
          "desc": "Internal platforms, workflow systems, and digital operations."
        },
        {
          "title": "Education",
          "desc": "Knowledge systems, learning tools, and AI-assisted experiences."
        },
        {
          "title": "Agencies",
          "desc": "Product engineering capability for brand, tech, and delivery teams."
        }
      ]
    },
    "contactSection": {
      "kicker": "Contact",
      "title": "Start building seriously.",
      "desc": "Share your project direction, business goals, and current challenges.",
      "items": [
        {
          "title": "Business Email",
          "desc": "support@ninespro.com"
        },
        {
          "title": "Partnership",
          "desc": "partner@ninespro.com"
        },
        {
          "title": "Sales",
          "desc": "sales@ninespro.com"
        }
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
        <div className="homeStatsGrid">{stats.map((item) => <article className="homeCard homeStatCard" key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div>
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
        .homeStatCard strong { display: block; font-size: clamp(44px, 5vw, 76px); line-height: 1; letter-spacing: -.06em; font-weight: 950; }
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

      <section className="homeHero"><div className="homeHeroInner"><h1 className="homeBrand">{t.brand}</h1><p className="homeSlogan">{t.slogan}</p><p className="homeDesc">{t.desc}</p><div className="homeActions"><a href={localePath(locale,"/product")} className="homeGlassButton">{t.explore}</a><a href={localePath(locale,"/contact")} className="homeGlassButton">{t.contact}</a></div></div></section>
      <SectionGap/><ShowcaseSection section={t.products}/><SectionGap/><ShowcaseSection section={t.solutions}/><SectionGap/><ShowcaseSection section={t.ai}/><SectionGap/><ShowcaseSection section={t.development}/><SectionGap/><ShowcaseSection section={t.projects}/><SectionGap/><ShowcaseSection section={t.why}/><SectionGap/><StatSection title={t.statsTitle} desc={t.statsDesc} stats={t.stats}/><SectionGap/><ShowcaseSection section={t.testimonials}/><SectionGap/><ShowcaseSection section={t.partners}/><SectionGap/><ShowcaseSection section={t.contactSection}/><SectionGap/>
      <section className="homeCta"><div className="homeCtaInner"><h2>{t.finalTitle}</h2><p>{t.finalDesc}</p><div className="homeActions"><a href={localePath(locale,"/contact")} className="homeGlassButton">{t.finalButton}</a></div></div></section>
    </main>
  );
}
