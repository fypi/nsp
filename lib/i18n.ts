export const locales = ["en", "zh", "zh-TW"] as const;

export type Locale = (typeof locales)[number];

export function normalizeLocale(locale: string | undefined): Locale {
  if (locale === "en" || locale === "zh" || locale === "zh-TW") {
    return locale;
  }

  return "zh";
}

export const i18n = {
  zh: {
    brand: {
      name: "九域",
    },

    nav: {
      product: "产品中心",
      solution: "解决方案",
      support: "支持中心",
      tool: "工具中心",
      login: "登录",
      logout: "退出登录",
      profile: "个人信息",
    },

    footer: {
      copyright: "九域 © 2026 版权所有",
      privacy: "隐私与法律",
      contact: "联系方式",
      help: "帮助中心",
    },

    home: {
      heroTitle: "九域",
      heroSubtitle: "尽知天下事，弹指皆可得",
      start: "开始使用",
      learnMore: "了解更多",

      productTitle: "产品中心",
      productSubtitle: "高效智能 · 极简体验",
      browseProduct: "浏览产品",
      customSolution: "定制方案",

      toolTitle: "全能工具",
      toolSubtitle: "公开可用 · 持续更新",
      tryNow: "立即体验",
      helpCenter: "帮助中心",
    },

    tool: {
      title: "工具中心",
      subtitle:
        "工具、文书、学习和知识，一处打开。当前只保留真实可用入口，未完成的能力不再挂空链接。",

      publicTitle: "🔓 公开可用",
      publicDesc: "不用登录，打开就能用。下面这些是当前已经接好的真实工具。",

      memberTitle: "🔐 注册后可用",
      memberDesc:
        "这些工具需要登录后使用，后续会逐步支持保存历史、导出和个人设置。",

      customTitle: "💼 定制服务",
      customDesc:
        "如果你需要把工具接入自己的业务流程、网站或内部系统，可以联系我们沟通定制。",

      openTool: "打开工具 →",
      contactUs: "联系咨询 →",

      tools: {
        json: {
          title: "JSON 格式化",
          desc: "格式化、压缩和校验 JSON，适合接口调试、配置检查和数据整理。",
          badge: "🔓 公开",
        },
        diff: {
          title: "文本对比",
          desc: "对比两段文本差异，适合文案修改、配置变更和代码片段检查。",
          badge: "🔓 公开",
        },
        compound: {
          title: "复利计算器",
          desc: "计算长期收益、定投增长和复利变化，仅作学习和参考。",
          badge: "🔓 公开",
        },
        base64: {
          title: "Base64 工具",
          desc: "Base64 编码与解码，支持常见文本处理场景。",
          badge: "🔓 公开",
        },
      },
    },

    common: {
      comingSoon: "即将开放",
      backHome: "返回首页",
      contact: "联系我们",
    },
  },

  "zh-TW": {
    brand: {
      name: "九域",
    },

    nav: {
      product: "產品中心",
      solution: "解決方案",
      support: "支援中心",
      tool: "工具中心",
      login: "登入",
      logout: "登出",
      profile: "個人資訊",
    },

    footer: {
      copyright: "九域 © 2026 版權所有",
      privacy: "隱私與法律",
      contact: "聯絡方式",
      help: "說明中心",
    },

    home: {
      heroTitle: "九域",
      heroSubtitle: "盡知天下事，彈指皆可得",
      start: "開始使用",
      learnMore: "了解更多",

      productTitle: "產品中心",
      productSubtitle: "高效智能 · 極簡體驗",
      browseProduct: "瀏覽產品",
      customSolution: "定制方案",

      toolTitle: "全能工具",
      toolSubtitle: "公開可用 · 持續更新",
      tryNow: "立即體驗",
      helpCenter: "說明中心",
    },

    tool: {
      title: "工具中心",
      subtitle:
        "工具、文書、學習和知識，一處打開。目前只保留真實可用入口，未完成的能力不再掛空連結。",

      publicTitle: "🔓 公開可用",
      publicDesc: "不用登入，打開就能用。以下是目前已經接好的真實工具。",

      memberTitle: "🔐 登入後可用",
      memberDesc:
        "這些工具需要登入後使用，後續會逐步支援保存歷史、匯出和個人設定。",

      customTitle: "💼 定制服務",
      customDesc:
        "如果你需要把工具接入自己的業務流程、網站或內部系統，可以聯絡我們溝通定制。",

      openTool: "打開工具 →",
      contactUs: "聯絡諮詢 →",

      tools: {
        json: {
          title: "JSON 格式化",
          desc: "格式化、壓縮和校驗 JSON，適合接口調試、配置檢查和資料整理。",
          badge: "🔓 公開",
        },
        diff: {
          title: "文字對比",
          desc: "對比兩段文字差異，適合文案修改、配置變更和程式碼片段檢查。",
          badge: "🔓 公開",
        },
        compound: {
          title: "複利計算器",
          desc: "計算長期收益、定投增長和複利變化，僅作學習和參考。",
          badge: "🔓 公開",
        },
        base64: {
          title: "Base64 工具",
          desc: "Base64 編碼與解碼，支援常見文字處理場景。",
          badge: "🔓 公開",
        },
      },
    },

    common: {
      comingSoon: "即將開放",
      backHome: "返回首頁",
      contact: "聯絡我們",
    },
  },

  en: {
    brand: {
      name: "NINESPRO",
    },

    nav: {
      product: "Products",
      solution: "Solutions",
      support: "Support",
      tool: "Tools",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
    },

    footer: {
      copyright: "NinesPro © 2026 All Rights Reserved",
      privacy: "Privacy & Legal",
      contact: "Contact",
      help: "Help Center",
    },

    home: {
      heroTitle: "NinesPro",
      heroSubtitle: "All things in the world, available at your fingertips",
      start: "Get Started",
      learnMore: "Learn More",

      productTitle: "Product Center",
      productSubtitle: "Efficient & Intelligent · Minimalist Experience",
      browseProduct: "Browse Products",
      customSolution: "Custom Solutions",

      toolTitle: "All-Purpose Tools",
      toolSubtitle: "Open Access · Continuous Updates",
      tryNow: "Try Now",
      helpCenter: "Help Center",
    },

    tool: {
      title: "Tool Center",
      subtitle:
        "Tools, documents, learning, and knowledge in one place. Only real usable entries are listed here. Unfinished features are not linked as empty pages.",

      publicTitle: "🔓 Public Tools",
      publicDesc:
        "No login required. Open and use directly. These are the currently available tools.",

      memberTitle: "🔐 Member Tools",
      memberDesc:
        "These tools require login. History, export, and personal settings will be added gradually.",

      customTitle: "💼 Custom Services",
      customDesc:
        "If you need these tools integrated into your workflow, website, or internal system, contact us for custom development.",

      openTool: "Open Tool →",
      contactUs: "Contact Us →",

      tools: {
        json: {
          title: "JSON Formatter",
          desc: "Format, minify, and validate JSON for API debugging, configuration checks, and data cleanup.",
          badge: "🔓 Public",
        },
        diff: {
          title: "Text Diff",
          desc: "Compare differences between two text blocks for copy edits, configuration changes, and code snippets.",
          badge: "🔓 Public",
        },
        compound: {
          title: "Compound Interest",
          desc: "Calculate long-term returns, recurring investment growth, and compound growth for learning and reference.",
          badge: "🔓 Public",
        },
        base64: {
          title: "Base64 Tool",
          desc: "Encode and decode Base64 for common text-processing scenarios.",
          badge: "🔓 Public",
        },
      },
    },

    common: {
      comingSoon: "Coming Soon",
      backHome: "Back Home",
      contact: "Contact Us",
    },
  },
} as const;

export function getI18n(locale: string | undefined) {
  return i18n[normalizeLocale(locale)];
}