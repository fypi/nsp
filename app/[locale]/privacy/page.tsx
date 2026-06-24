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
    "title": "隐私政策",
    "desc": "说明 NINESPRO 如何收集、使用、保存和保护与服务相关的信息。",
    "sections": [
      {
        "title": "我们可能收集的信息",
        "body": [
          "当用户访问网站、提交联系表单、发送邮件或使用在线工具时，我们可能接收用户主动提供的信息，例如姓名、邮箱、公司、项目需求和反馈内容。",
          "我们也可能收集基本技术信息，例如浏览器类型、访问页面、设备信息、语言偏好和基础日志，用于安全、性能和产品改进。"
        ]
      },
      {
        "title": "信息的使用方式",
        "body": [
          "信息主要用于回应咨询、提供服务、处理合作需求、改进网站体验、维护安全和排查问题。",
          "我们不会出售用户个人信息，也不会在没有合理原因的情况下将信息用于与 NINESPRO 服务无关的用途。"
        ]
      },
      {
        "title": "信息保存与安全",
        "body": [
          "我们会根据业务、法律和安全需要，在合理期限内保存必要信息。",
          "我们会采取合理的技术和组织措施保护信息，但互联网传输和电子存储无法保证绝对安全。"
        ]
      },
      {
        "title": "用户权利",
        "body": [
          "用户可以通过 support@ninespro.com 联系我们，请求访问、更正或删除与用户相关的信息。",
          "如果用户希望停止接收非必要联系，也可以通过同一邮箱提出请求。"
        ]
      }
    ],
    "note": "本页面为一般说明，不构成法律意见。正式政策可根据公司实际业务、地区法规和数据处理流程进一步完善。",
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
    "title": "隱私政策",
    "desc": "說明 NINESPRO 如何收集、使用、保存和保護與服務相關的資訊。",
    "sections": [
      {
        "title": "我們可能收集的資訊",
        "body": [
          "當用戶訪問網站、提交聯絡表單、發送郵件或使用線上工具時，我們可能接收用戶主動提供的資訊，例如姓名、信箱、公司、項目需求和反饋內容。",
          "我們也可能收集基本技術資訊，例如瀏覽器類型、訪問頁面、設備資訊、語言偏好和基礎日誌，用於安全、性能和產品改進。"
        ]
      },
      {
        "title": "資訊的使用方式",
        "body": [
          "資訊主要用於回應諮詢、提供服務、處理合作需求、改進網站體驗、維護安全和排查問題。",
          "我們不會出售用戶個人資訊，也不會在沒有合理原因的情況下將資訊用於與 NINESPRO 服務無關的用途。"
        ]
      },
      {
        "title": "資訊保存與安全",
        "body": [
          "我們會根據業務、法律和安全需要，在合理期限內保存必要資訊。",
          "我們會採取合理的技術和組織措施保護資訊，但網路傳輸和電子儲存無法保證絕對安全。"
        ]
      },
      {
        "title": "用戶權利",
        "body": [
          "用戶可以通過 support@ninespro.com 聯絡我們，請求訪問、更正或刪除與用戶相關的資訊。",
          "如果用戶希望停止接收非必要聯絡，也可以通過同一信箱提出請求。"
        ]
      }
    ],
    "note": "本頁面為一般說明，不構成法律意見。正式政策可根據公司實際業務、地區法規和數據處理流程進一步完善。",
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
    "title": "Privacy Policy",
    "desc": "How NINESPRO collects, uses, stores, and protects information related to the services.",
    "sections": [
      {
        "title": "Information We May Collect",
        "body": [
          "When users visit the website, submit contact forms, send emails, or use online tools, NINESPRO may receive information voluntarily provided by users, such as name, email, company, project requirements, and feedback.",
          "NINESPRO may also collect basic technical information such as browser type, visited pages, device information, language preference, and basic logs for security, performance, and product improvement."
        ]
      },
      {
        "title": "How Information Is Used",
        "body": [
          "Information is primarily used to respond to inquiries, provide services, process partnership requests, improve website experience, maintain security, and troubleshoot issues.",
          "NINESPRO does not sell personal information and does not use information for purposes unrelated to NINESPRO services without a reasonable basis."
        ]
      },
      {
        "title": "Retention and Security",
        "body": [
          "NINESPRO retains necessary information for a reasonable period based on business, legal, and security needs.",
          "Reasonable technical and organizational measures are used to protect information, but internet transmission and electronic storage cannot be guaranteed to be absolutely secure."
        ]
      },
      {
        "title": "User Rights",
        "body": [
          "Users may contact support@ninespro.com to request access, correction, or deletion of information related to them.",
          "Users may also contact the same email address to opt out of non-essential communications."
        ]
      }
    ],
    "note": "This page is general information and does not constitute legal advice. Formal policy text may be refined based on actual business operations, regional laws, and data processing workflows.",
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
