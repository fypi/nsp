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
    "eyebrow": "解决方案",
    "title": "数字平台",
    "desc": "构建 SaaS、门户、仪表盘和内部工具。",
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
    "eyebrow": "解決方案",
    "title": "數位平台",
    "desc": "構建 SaaS、入口網站、儀表板和內部工具。",
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
    "eyebrow": "Solution",
    "title": "Digital Platforms",
    "desc": "Build SaaS products, portals, dashboards, and internal tools.",
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
