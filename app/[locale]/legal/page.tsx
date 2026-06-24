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
    "title": "法律信息",
    "desc": "集中查看 NINESPRO 的隐私、服务、Cookie 和免责声明。",
    "sections": [
      {
        "title": "法律页面总览",
        "body": [
          "这里汇总与 NINESPRO 网站、工具、服务和内容相关的基础法律说明。",
          "正式上线前，建议根据实际公司主体、服务范围、数据处理流程和适用地区法律进一步审核。"
        ]
      }
    ],
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
    ],
    "note": "本页为法律信息总览，不构成法律意见。"
  },
  "zh-TW": {
    "title": "法律資訊",
    "desc": "集中查看 NINESPRO 的隱私、服務、Cookie 和免責聲明。",
    "sections": [
      {
        "title": "法律頁面總覽",
        "body": [
          "這裡匯總與 NINESPRO 網站、工具、服務和內容相關的基礎法律說明。",
          "正式上線前，建議根據實際公司主體、服務範圍、數據處理流程和適用地區法律進一步審核。"
        ]
      }
    ],
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
    ],
    "note": "本頁為法律資訊總覽，不構成法律意見。"
  },
  "en": {
    "title": "Legal Information",
    "desc": "Review NINESPRO privacy, terms, cookie, and disclaimer information in one place.",
    "sections": [
      {
        "title": "Legal Overview",
        "body": [
          "This page summarizes basic legal information related to the NINESPRO website, tools, services, and content.",
          "Before formal launch, this content should be reviewed based on the actual company entity, service scope, data processing workflow, and applicable regional laws."
        ]
      }
    ],
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
    ],
    "note": "This page is a legal information overview and does not constitute legal advice."
  }
};

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  return <BasicPage content={content[locale]} locale={locale} />;
}
