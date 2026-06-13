import Link from "next/link";

type Locale = "zh" | "zh-TW" | "en";

function normalizeLocale(locale?: string): Locale {
  if (locale === "en" || locale === "zh" || locale === "zh-TW") {
    return locale;
  }

  return "zh";
}

type SupportText = {
  heroTitle: string;
  heroDesc: string;

  rulesTitle: string;
  rulesDesc: string;

  publicTitle: string;
  publicDesc: string;

  loginTitle: string;
  loginDesc: string;

  customTitle: string;
  customDesc: string;

  faqTitle: string;

  faqRegisterTitle: string;
  faqRegisterDesc: string;

  faqPriceTitle: string;
  faqPriceDesc: string;

  faqCustomTitle: string;
  faqCustomDesc: string;

  faqFeedbackTitle: string;
  faqFeedbackDesc: string;

  contactTitle: string;
  contactBefore: string;
  contactLink: string;
  contactAfter: string;
};

const supportText: Record<Locale, SupportText> = {
  zh: {
    heroTitle: "支持中心",
    heroDesc:
      "有问题，随时来。使用上有疑问、想反馈、想合作，这里都能找到入口。",

    rulesTitle: "访问规则速览",
    rulesDesc:
      "九域的内容和工具按三层组织，每张卡片右上角会标注它属于哪一层：",

    publicTitle: "🔓 公开可用",
    publicDesc: "少数基础工具，打开就能用，无需登录。引流和体验入口。",

    loginTitle: "🔐 注册后可用",
    loginDesc:
      "大多数工具，注册账号后免费使用。账号还能保存历史和个人设置。",

    customTitle: "💼 定制服务",
    customDesc: "面向具体业务场景的定制开发与咨询，按需报价。联系我们沟通。",

    faqTitle: "常见问题",

    faqRegisterTitle: "需要注册才能使用吗？",
    faqRegisterDesc:
      "看情况。带 🔓 的工具公开可用，打开就能用；带 🔐 的工具注册账号后解锁；带 💼 的服务联系我们沟通。",

    faqPriceTitle: "注册要钱吗？",
    faqPriceDesc:
      "注册免费。注册解锁的工具也免费用。涉及定制服务或部分高级功能时，我们会在使用前明确告知是否收费，不会自动扣费。",

    faqCustomTitle: "可以合作或定制吗？",
    faqCustomDesc:
      "可以。如果你有具体项目需求，请通过联系方式与我们沟通，我们会评估后给出方案。",

    faqFeedbackTitle: "发现内容有问题怎么办？",
    faqFeedbackDesc:
      "欢迎反馈。你可以通过联系方式提交问题，我们会尽快核实和修正。",

    contactTitle: "联系我们",
    contactBefore: "有问题或建议？请前往",
    contactLink: "联系方式",
    contactAfter: "页面，找到适合你的沟通渠道。我们会尽快回复。",
  },

  "zh-TW": {
    heroTitle: "支援中心",
    heroDesc:
      "有問題，隨時來。使用上有疑問、想反饋、想合作，這裡都能找到入口。",

    rulesTitle: "訪問規則速覽",
    rulesDesc:
      "九域的內容和工具按三層組織，每張卡片右上角會標註它屬於哪一層：",

    publicTitle: "🔓 公開可用",
    publicDesc: "少數基礎工具，打開就能用，無需登入。引流和體驗入口。",

    loginTitle: "🔐 註冊後可用",
    loginDesc:
      "大多數工具，註冊帳號後免費使用。帳號還能保存歷史和個人設定。",

    customTitle: "💼 定制服務",
    customDesc: "面向具體業務場景的定制開發與諮詢，按需報價。聯絡我們溝通。",

    faqTitle: "常見問題",

    faqRegisterTitle: "需要註冊才能使用嗎？",
    faqRegisterDesc:
      "看情況。帶 🔓 的工具公開可用，打開就能用；帶 🔐 的工具註冊帳號後解鎖；帶 💼 的服務請聯絡我們溝通。",

    faqPriceTitle: "註冊要錢嗎？",
    faqPriceDesc:
      "註冊免費。註冊解鎖的工具也免費使用。涉及定制服務或部分高級功能時，我們會在使用前明確告知是否收費，不會自動扣費。",

    faqCustomTitle: "可以合作或定制嗎？",
    faqCustomDesc:
      "可以。如果你有具體項目需求，請通過聯絡方式與我們溝通，我們會評估後給出方案。",

    faqFeedbackTitle: "發現內容有問題怎麼辦？",
    faqFeedbackDesc:
      "歡迎反饋。你可以通過聯絡方式提交問題，我們會盡快核實和修正。",

    contactTitle: "聯絡我們",
    contactBefore: "有問題或建議？請前往",
    contactLink: "聯絡方式",
    contactAfter: "頁面，找到適合你的溝通渠道。我們會盡快回覆。",
  },

  en: {
    heroTitle: "Support Center",
    heroDesc:
      "Questions, feedback, or collaboration ideas are welcome here. Find the right entry point for help and communication.",

    rulesTitle: "Access Rules Overview",
    rulesDesc:
      "NinesPro organizes content and tools into three access layers. Each card indicates which layer it belongs to:",

    publicTitle: "🔓 Public Access",
    publicDesc:
      "A small set of basic tools can be used directly without login. These are entry points for trial and experience.",

    loginTitle: "🔐 Available After Registration",
    loginDesc:
      "Most tools are free after account registration. Accounts can also support history and personal settings.",

    customTitle: "💼 Custom Services",
    customDesc:
      "Custom development and consulting for specific business scenarios, quoted based on actual needs. Contact us to discuss.",

    faqTitle: "FAQ",

    faqRegisterTitle: "Do I need to register before using the tools?",
    faqRegisterDesc:
      "It depends. Tools marked 🔓 are publicly available and can be used directly. Tools marked 🔐 unlock after registration. Services marked 💼 require contacting us for discussion.",

    faqPriceTitle: "Is registration free?",
    faqPriceDesc:
      "Registration is free. Tools unlocked after registration are also free to use. For custom services or certain advanced features, we will clearly explain pricing before use. There will be no automatic charges.",

    faqCustomTitle: "Can we collaborate or request custom development?",
    faqCustomDesc:
      "Yes. If you have specific project requirements, contact us through the contact page. We will evaluate the request and provide a suitable plan.",

    faqFeedbackTitle: "What if I find an issue with the content?",
    faqFeedbackDesc:
      "Feedback is welcome. You can submit issues through the contact page, and we will verify and correct them as soon as possible.",

    contactTitle: "Contact Us",
    contactBefore: "Have questions or suggestions? Please visit the",
    contactLink: "Contact",
    contactAfter:
      "page to find the right communication channel. We will reply as soon as possible.",
  },
};

export default function SupportPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = normalizeLocale(params?.locale);
  const t = supportText[locale];

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>

        <section className="subpage-section">
          <h2>{t.rulesTitle}</h2>
          <p>{t.rulesDesc}</p>

          <div className="card-grid">
            <div className="card">
              <h3>{t.publicTitle}</h3>
              <p>{t.publicDesc}</p>
            </div>

            <div className="card">
              <h3>{t.loginTitle}</h3>
              <p>{t.loginDesc}</p>
            </div>

            <div className="card">
              <h3>{t.customTitle}</h3>
              <p>{t.customDesc}</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.faqTitle}</h2>

          <div className="card-grid">
            <div className="card">
              <h3>{t.faqRegisterTitle}</h3>
              <p>{t.faqRegisterDesc}</p>
            </div>

            <div className="card">
              <h3>{t.faqPriceTitle}</h3>
              <p>{t.faqPriceDesc}</p>
            </div>

            <div className="card">
              <h3>{t.faqCustomTitle}</h3>
              <p>{t.faqCustomDesc}</p>
            </div>

            <div className="card">
              <h3>{t.faqFeedbackTitle}</h3>
              <p>{t.faqFeedbackDesc}</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.contactTitle}</h2>
          <p>
            {t.contactBefore}
            {" "}
            <Link
              href={`/${locale}/contact`}
              style={{ color: "#111", fontWeight: 500 }}
            >
              {t.contactLink}
            </Link>
            {" "}
            {t.contactAfter}
          </p>
        </section>
      </div>
    </main>
  );
}