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
    "title": "服务条款",
    "desc": "说明访问和使用 NINESPRO 网站、工具、内容与服务时适用的基本规则。",
    "sections": [
      {
        "title": "服务使用",
        "body": [
          "用户应以合法、合理和不损害他人权益的方式使用 NINESPRO 服务。",
          "用户不得尝试破坏、绕过、滥用或干扰网站、工具、接口和相关系统。"
        ]
      },
      {
        "title": "内容与知识产权",
        "body": [
          "NINESPRO 网站中的品牌、设计、文字、界面和相关内容受知识产权保护。",
          "未经许可，用户不得复制、改编、出售或以其他方式商业使用 NINESPRO 的内容和视觉资产。"
        ]
      },
      {
        "title": "服务变更",
        "body": [
          "NINESPRO 可能根据产品规划、技术需要或运营安排更新、调整或暂停部分功能。",
          "我们会尽量保持服务稳定，但不承诺所有功能在所有时间持续可用。"
        ]
      },
      {
        "title": "责任限制",
        "body": [
          "用户基于网站内容、工具输出或示例信息采取行动前，应自行判断并承担相应责任。",
          "在法律允许范围内，NINESPRO 不对间接损失、利润损失或不可预见损害承担责任。"
        ]
      }
    ],
    "note": "本页面为基础条款说明，后续可根据正式业务模式、订阅模式和地区法律进一步完善。",
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
    "title": "服務條款",
    "desc": "說明訪問和使用 NINESPRO 網站、工具、內容與服務時適用的基本規則。",
    "sections": [
      {
        "title": "服務使用",
        "body": [
          "用戶應以合法、合理和不損害他人權益的方式使用 NINESPRO 服務。",
          "用戶不得嘗試破壞、繞過、濫用或干擾網站、工具、接口和相關系統。"
        ]
      },
      {
        "title": "內容與知識產權",
        "body": [
          "NINESPRO 網站中的品牌、設計、文字、介面和相關內容受知識產權保護。",
          "未經許可，用戶不得複製、改編、出售或以其他方式商業使用 NINESPRO 的內容和視覺資產。"
        ]
      },
      {
        "title": "服務變更",
        "body": [
          "NINESPRO 可能根據產品規劃、技術需要或營運安排更新、調整或暫停部分功能。",
          "我們會盡量保持服務穩定，但不承諾所有功能在所有時間持續可用。"
        ]
      },
      {
        "title": "責任限制",
        "body": [
          "用戶基於網站內容、工具輸出或示例資訊採取行動前，應自行判斷並承擔相應責任。",
          "在法律允許範圍內，NINESPRO 不對間接損失、利潤損失或不可預見損害承擔責任。"
        ]
      }
    ],
    "note": "本頁面為基礎條款說明，後續可根據正式業務模式、訂閱模式和地區法律進一步完善。",
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
    "title": "Terms of Service",
    "desc": "Basic rules for accessing and using the NINESPRO website, tools, content, and services.",
    "sections": [
      {
        "title": "Use of Services",
        "body": [
          "Users should use NINESPRO services lawfully, reasonably, and without harming the rights of others.",
          "Users must not attempt to damage, bypass, misuse, or interfere with websites, tools, interfaces, or related systems."
        ]
      },
      {
        "title": "Content and Intellectual Property",
        "body": [
          "Brand, design, text, interface, and related content on the NINESPRO website are protected by intellectual property rights.",
          "Without permission, users may not copy, adapt, sell, or commercially use NINESPRO content or visual assets."
        ]
      },
      {
        "title": "Service Changes",
        "body": [
          "NINESPRO may update, adjust, or suspend certain features based on product planning, technical needs, or operational arrangements.",
          "NINESPRO aims to keep services stable but does not guarantee that all features will remain available at all times."
        ]
      },
      {
        "title": "Limitation of Liability",
        "body": [
          "Users should independently evaluate website content, tool outputs, and examples before taking action based on them.",
          "To the extent permitted by law, NINESPRO is not liable for indirect losses, lost profits, or unforeseeable damages."
        ]
      }
    ],
    "note": "This page provides basic terms and may be further refined based on formal business models, subscription models, and regional laws.",
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
