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
    "title": "登录",
    "desc": "账号系统入口。后续可接入 Supabase 登录表单。",
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
    "title": "登入",
    "desc": "帳號系統入口。後續可接入 Supabase 登入表單。",
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
    "title": "Login",
    "desc": "Account system entry. This can later connect to Supabase login.",
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
