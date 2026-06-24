import BasicPage from "@/components/BasicPage";

type Locale = "zh" | "zh-TW" | "en";

type BasicCard = { title: string; desc: string; href?: string };
type BasicSection = { title: string; body: string[] };
type BasicPageContent = { eyebrow?: string; title: string; desc: string; cards?: BasicCard[]; sections?: BasicSection[]; note?: string };

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

const content: Record<Locale, BasicPageContent> = {
  "zh": {
    "title": "Cookie 政策",
    "desc": "说明 NINESPRO 如何使用 Cookie 和类似技术改善网站体验。",
    "sections": [
      {
        "title": "Cookie 的用途",
        "body": [
          "Cookie 可用于记住语言偏好、保持基础会话、提升加载体验、分析网站使用情况和维护安全。",
          "某些 Cookie 对网站基础功能是必要的，某些 Cookie 用于改进体验和统计分析。"
        ]
      },
      {
        "title": "用户选择",
        "body": [
          "用户可以通过浏览器设置限制、删除或阻止 Cookie。",
          "禁用某些 Cookie 后，部分页面、登录状态或偏好设置可能无法正常工作。"
        ]
      },
      {
        "title": "第三方服务",
        "body": [
          "如果网站使用分析、托管、安全或嵌入服务，相关第三方也可能设置 Cookie 或类似技术。",
          "我们会尽量选择可信服务，并根据业务需要调整使用范围。"
        ]
      }
    ],
    "note": "本页面为 Cookie 使用说明，后续可结合实际接入的分析、广告或第三方服务进一步细化。",
    "cards": [
      {
        "title": "隐私政策",
        "desc": "了解我们如何处理信息。",
        "href": "/privacy"
      },
      {
        "title": "服务条款",
        "desc": "了解使用 NINESPRO 服务的基本规则。",
        "href": "/terms"
      },
      {
        "title": "Cookie 政策",
        "desc": "了解 Cookie 和类似技术的使用方式。",
        "href": "/cookies"
      },
      {
        "title": "联系我们",
        "desc": "如有法律、隐私或服务问题，请联系支持。",
        "href": "mailto:support@ninespro.com"
      }
    ]
  },
  "zh-TW": {
    "title": "Cookie 政策",
    "desc": "說明 NINESPRO 如何使用 Cookie 和類似技術改善網站體驗。",
    "sections": [
      {
        "title": "Cookie 的用途",
        "body": [
          "Cookie 可用於記住語言偏好、保持基礎會話、提升載入體驗、分析網站使用情況和維護安全。",
          "某些 Cookie 對網站基礎功能是必要的，某些 Cookie 用於改進體驗和統計分析。"
        ]
      },
      {
        "title": "用戶選擇",
        "body": [
          "用戶可以通過瀏覽器設定限制、刪除或阻止 Cookie。",
          "停用某些 Cookie 後，部分頁面、登入狀態或偏好設定可能無法正常工作。"
        ]
      },
      {
        "title": "第三方服務",
        "body": [
          "如果網站使用分析、託管、安全或嵌入服務，相關第三方也可能設定 Cookie 或類似技術。",
          "我們會盡量選擇可信服務，並根據業務需要調整使用範圍。"
        ]
      }
    ],
    "note": "本頁面為 Cookie 使用說明，後續可結合實際接入的分析、廣告或第三方服務進一步細化。",
    "cards": [
      {
        "title": "隱私政策",
        "desc": "了解我們如何處理資訊。",
        "href": "/privacy"
      },
      {
        "title": "服務條款",
        "desc": "了解使用 NINESPRO 服務的基本規則。",
        "href": "/terms"
      },
      {
        "title": "Cookie 政策",
        "desc": "了解 Cookie 和類似技術的使用方式。",
        "href": "/cookies"
      },
      {
        "title": "聯絡我們",
        "desc": "如有法律、隱私或服務問題，請聯絡支持。",
        "href": "mailto:support@ninespro.com"
      }
    ]
  },
  "en": {
    "title": "Cookie Policy",
    "desc": "How NINESPRO uses cookies and similar technologies to improve website experience.",
    "sections": [
      {
        "title": "Purpose of Cookies",
        "body": [
          "Cookies may be used to remember language preferences, maintain basic sessions, improve loading experience, analyze website usage, and support security.",
          "Some cookies are necessary for basic website functions, while others help improve experience and analytics."
        ]
      },
      {
        "title": "User Choices",
        "body": [
          "Users can restrict, delete, or block cookies through browser settings.",
          "After disabling certain cookies, some pages, login states, or preferences may not work properly."
        ]
      },
      {
        "title": "Third-Party Services",
        "body": [
          "If the website uses analytics, hosting, security, or embedded services, relevant third parties may also set cookies or similar technologies.",
          "NINESPRO aims to choose trusted services and adjust usage scope based on business needs."
        ]
      }
    ],
    "note": "This page explains cookie usage and may be refined based on actual analytics, advertising, or third-party services used.",
    "cards": [
      {
        "title": "Privacy Policy",
        "desc": "Learn how information is handled.",
        "href": "/privacy"
      },
      {
        "title": "Terms of Service",
        "desc": "Understand the basic rules for using NINESPRO services.",
        "href": "/terms"
      },
      {
        "title": "Cookie Policy",
        "desc": "Learn how cookies and similar technologies are used.",
        "href": "/cookies"
      },
      {
        "title": "Contact Us",
        "desc": "For legal, privacy, or service questions, contact support.",
        "href": "mailto:support@ninespro.com"
      }
    ]
  }
};

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  return <BasicPage content={content[locale]} locale={locale} />;
}
