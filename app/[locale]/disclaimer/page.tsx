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
    "title": "免责声明",
    "desc": "说明 NINESPRO 网站内容、工具输出和服务信息的使用边界。",
    "sections": [
      {
        "title": "一般信息",
        "body": [
          "NINESPRO 网站内容用于展示产品、服务、技术能力和一般信息，不应被视为专业法律、财务、医疗或其他专业建议。",
          "用户在依赖任何内容、工具结果或示例前，应结合实际情况进行独立判断。"
        ]
      },
      {
        "title": "工具与 AI 输出",
        "body": [
          "在线工具、AI 辅助内容和自动化结果可能存在错误、遗漏或不完整。",
          "用户应自行检查重要结果，尤其是涉及合同、财务、合规、工程生产环境或商业决策的内容。"
        ]
      },
      {
        "title": "外部链接",
        "body": [
          "网站可能包含指向第三方网站或服务的链接。",
          "第三方内容、服务可用性和安全性由第三方负责，NINESPRO 不对其内容作出保证。"
        ]
      }
    ],
    "note": "如需针对具体业务场景获得正式意见，请咨询具备资质的专业人士。",
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
    "title": "免責聲明",
    "desc": "說明 NINESPRO 網站內容、工具輸出和服務資訊的使用邊界。",
    "sections": [
      {
        "title": "一般資訊",
        "body": [
          "NINESPRO 網站內容用於展示產品、服務、技術能力和一般資訊，不應被視為專業法律、財務、醫療或其他專業建議。",
          "用戶在依賴任何內容、工具結果或示例前，應結合實際情況進行獨立判斷。"
        ]
      },
      {
        "title": "工具與 AI 輸出",
        "body": [
          "線上工具、AI 輔助內容和自動化結果可能存在錯誤、遺漏或不完整。",
          "用戶應自行檢查重要結果，尤其是涉及合約、財務、合規、工程生產環境或商業決策的內容。"
        ]
      },
      {
        "title": "外部連結",
        "body": [
          "網站可能包含指向第三方網站或服務的連結。",
          "第三方內容、服務可用性和安全性由第三方負責，NINESPRO 不對其內容作出保證。"
        ]
      }
    ],
    "note": "如需針對具體業務場景獲得正式意見，請諮詢具備資質的專業人士。",
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
    "title": "Disclaimer",
    "desc": "Usage boundaries for NINESPRO website content, tool outputs, and service information.",
    "sections": [
      {
        "title": "General Information",
        "body": [
          "NINESPRO website content is provided to present products, services, technical capabilities, and general information. It should not be considered professional legal, financial, medical, or other professional advice.",
          "Users should independently evaluate any content, tool results, or examples before relying on them."
        ]
      },
      {
        "title": "Tools and AI Outputs",
        "body": [
          "Online tools, AI-assisted content, and automation outputs may contain errors, omissions, or incomplete information.",
          "Users should review important results, especially when they relate to contracts, finance, compliance, production engineering environments, or business decisions."
        ]
      },
      {
        "title": "External Links",
        "body": [
          "The website may contain links to third-party websites or services.",
          "Third-party content, service availability, and security are the responsibility of those third parties. NINESPRO does not guarantee third-party content."
        ]
      }
    ],
    "note": "For formal advice regarding a specific business situation, consult a qualified professional.",
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
