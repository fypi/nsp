import BasicPage from "@/components/BasicPage";

type Locale = "zh" | "zh-TW" | "en";

type BasicCard = { title: string; desc: string; href?: string };
type BasicPageContent = { eyebrow?: string; title: string; desc: string; cards?: BasicCard[]; note?: string };

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

const content: Record<Locale, BasicPageContent> = {
  "zh": {
    "eyebrow": "账号",
    "title": "下载记录",
    "desc": "账号相关页面。当前提供页面结构，后续可接入真实用户数据。",
    "cards": [
      {
        "title": "返回首页",
        "desc": "回到 NINESPRO 首页。",
        "href": "/"
      },
      {
        "title": "联系我们",
        "desc": "如果需要更多信息，请联系 NINESPRO。",
        "href": "/contact"
      }
    ]
  },
  "zh-TW": {
    "eyebrow": "帳號",
    "title": "下載記錄",
    "desc": "帳號相關頁面。當前提供頁面結構，後續可接入真實用戶數據。",
    "cards": [
      {
        "title": "返回首頁",
        "desc": "回到 NINESPRO 首頁。",
        "href": "/"
      },
      {
        "title": "聯絡我們",
        "desc": "如果需要更多資訊，請聯絡 NINESPRO。",
        "href": "/contact"
      }
    ]
  },
  "en": {
    "eyebrow": "Account",
    "title": "Downloads",
    "desc": "Account-related page. This structure can later connect to real user data.",
    "cards": [
      {
        "title": "Back Home",
        "desc": "Return to the NINESPRO homepage.",
        "href": "/"
      },
      {
        "title": "Contact Us",
        "desc": "Contact NINESPRO for more information.",
        "href": "/contact"
      }
    ]
  }
};

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  return <BasicPage content={content[locale]} locale={locale} />;
}
