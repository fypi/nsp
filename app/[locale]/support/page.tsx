type Locale = "zh" | "zh-TW" | "en";

type Card = {
  title: string;
  desc: string;
  href?: string;
};

type QA = {
  q: string;
  a: string;
};

type Section = {
  title: string;
  desc: string;
  items: Card[];
};

type PageCopy = {
  title: string;
  desc: string;
  guides: Section;
  faqTitle: string;
  faqDesc: string;
  faqs: QA[];
  contactTitle: string;
  contactDesc: string;
  contactCards: Card[];
  finalTitle: string;
  finalDesc: string;
  finalButton: string;
};

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

function normalizeHref(locale: Locale, href?: string) {
  if (!href) return "#";
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return href;
  if (href === "/en" || href.startsWith("/en/")) return href.replace(/^\/en/, "") || "/";
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;
  return localePath(locale, href);
}

const copy: Record<Locale, PageCopy> = {
  zh: {
    title: "支持中心",
    desc: "查找常见问题、使用指南、账号说明和联系入口。NINESPRO 会持续完善支持内容。",
    guides: {
      title: "使用指南",
      desc: "从产品、方案、工具和账号开始，快速找到正确入口。",
      items: [
        { title: "产品中心", desc: "了解 NINESPRO 当前产品方向、AI 能力和工程化交付方式。", href: "/product" },
        { title: "解决方案", desc: "查看业务自动化、AI 转型、数字平台和定制开发方案。", href: "/solution" },
        { title: "工具中心", desc: "使用已上线工具，并查看后续规划中的工具方向。", href: "/tool" },
        { title: "账号登录", desc: "登录账号后可使用需要权限的 AI 工具、历史记录和额度管理。", href: "/login" },
      ],
    },
    faqTitle: "常见问题",
    faqDesc: "这里整理最常见的访问、账号、工具和合作问题。",
    faqs: [
      { q: "NINESPRO 现在提供哪些内容？", a: "当前重点包括产品说明、解决方案、工具中心、支持中心、联系入口和隐私说明。更多内容会按实际交付情况逐步上线。" },
      { q: "为什么有些 AI 工具需要登录？", a: "AI 工具涉及模型调用、使用额度、历史记录和结果保存。需要登录后才能识别用户、控制额度并保护个人数据。" },
      { q: "工具中心里的工具都可以直接使用吗？", a: "工具中心会区分已上线工具和规划中工具。已上线工具可以直接进入使用；需要 AI、账号或后端能力的工具会明确提示登录或说明状态。" },
      { q: "如何反馈页面错误或链接问题？", a: "可以通过 one@ninespro.com 发送问题链接、截图和简短说明。收到后会按优先级修复。" },
      { q: "是否可以定制开发网站、工具或 AI 系统？", a: "可以。请通过 one@ninespro.com 说明需求、目标用户、功能范围和上线时间，我们会根据情况评估。" },
      { q: "隐私和数据如何处理？", a: "网站会尽量只收集必要信息。涉及账号、AI 工具历史和联系内容时，会根据隐私政策处理。你可以在隐私页面查看说明。" },
    ],
    contactTitle: "联系入口",
    contactDesc: "如果帮助内容不能解决问题，可以通过统一邮箱联系。",
    contactCards: [
      { title: "统一邮箱", desc: "one@ninespro.com", href: "mailto:one@ninespro.com" },
      { title: "联系页面", desc: "提交项目、合作、反馈或支持需求。", href: "/contact" },
      { title: "隐私说明", desc: "查看网站信息处理和隐私相关说明。", href: "/privacy" },
    ],
    finalTitle: "没有找到答案？",
    finalDesc: "把问题、截图和链接发送到 one@ninespro.com。",
    finalButton: "发送邮件",
  },
  "zh-TW": {
    title: "支持中心",
    desc: "查找常見問題、使用指南、帳號說明和聯絡入口。NINESPRO 會持續完善支持內容。",
    guides: {
      title: "使用指南",
      desc: "從產品、方案、工具和帳號開始，快速找到正確入口。",
      items: [
        { title: "產品中心", desc: "了解 NINESPRO 當前產品方向、AI 能力和工程化交付方式。", href: "/product" },
        { title: "解決方案", desc: "查看業務自動化、AI 轉型、數位平台和定制開發方案。", href: "/solution" },
        { title: "工具中心", desc: "使用已上線工具，並查看後續規劃中的工具方向。", href: "/tool" },
        { title: "帳號登入", desc: "登入帳號後可使用需要權限的 AI 工具、歷史記錄和額度管理。", href: "/login" },
      ],
    },
    faqTitle: "常見問題",
    faqDesc: "這裡整理最常見的訪問、帳號、工具和合作問題。",
    faqs: [
      { q: "NINESPRO 現在提供哪些內容？", a: "當前重點包括產品說明、解決方案、工具中心、支持中心、聯絡入口和隱私說明。更多內容會按實際交付情況逐步上線。" },
      { q: "為什麼有些 AI 工具需要登入？", a: "AI 工具涉及模型調用、使用額度、歷史記錄和結果保存。需要登入後才能識別用戶、控制額度並保護個人資料。" },
      { q: "工具中心裡的工具都可以直接使用嗎？", a: "工具中心會區分已上線工具和規劃中工具。已上線工具可以直接進入使用；需要 AI、帳號或後端能力的工具會明確提示登入或說明狀態。" },
      { q: "如何反饋頁面錯誤或連結問題？", a: "可以通過 one@ninespro.com 發送問題連結、截圖和簡短說明。收到後會按優先級修復。" },
      { q: "是否可以定制開發網站、工具或 AI 系統？", a: "可以。請通過 one@ninespro.com 說明需求、目標用戶、功能範圍和上線時間，我們會根據情況評估。" },
      { q: "隱私和資料如何處理？", a: "網站會盡量只收集必要資訊。涉及帳號、AI 工具歷史和聯絡內容時，會根據隱私政策處理。你可以在隱私頁面查看說明。" },
    ],
    contactTitle: "聯絡入口",
    contactDesc: "如果幫助內容不能解決問題，可以通過統一信箱聯絡。",
    contactCards: [
      { title: "統一信箱", desc: "one@ninespro.com", href: "mailto:one@ninespro.com" },
      { title: "聯絡頁面", desc: "提交項目、合作、反饋或支持需求。", href: "/contact" },
      { title: "隱私說明", desc: "查看網站資訊處理和隱私相關說明。", href: "/privacy" },
    ],
    finalTitle: "沒有找到答案？",
    finalDesc: "把問題、截圖和連結發送到 one@ninespro.com。",
    finalButton: "發送郵件",
  },
  en: {
    title: "Support Center",
    desc: "Find FAQs, usage guides, account help, and contact options. NINESPRO support content will continue to improve.",
    guides: {
      title: "Guides",
      desc: "Start from products, solutions, tools, and account access.",
      items: [
        { title: "Product Center", desc: "Learn about NINESPRO product direction, AI capability, and engineering delivery.", href: "/product" },
        { title: "Solutions", desc: "Explore automation, AI transformation, digital platforms, and custom development.", href: "/solution" },
        { title: "Tool Center", desc: "Use launched tools and review planned tool directions.", href: "/tool" },
        { title: "Account Login", desc: "Login to use permission-based AI tools, history, and quota management.", href: "/login" },
      ],
    },
    faqTitle: "FAQ",
    faqDesc: "Common questions about access, accounts, tools, and collaboration.",
    faqs: [
      { q: "What does NINESPRO currently provide?", a: "Current content focuses on product information, solutions, tools, support, contact, and privacy information. More content will be launched according to actual delivery progress." },
      { q: "Why do some AI tools require login?", a: "AI tools involve model calls, usage quota, history, and saved results. Login is required to identify users, control quota, and protect data." },
      { q: "Are all tools directly usable?", a: "The tool center separates launched tools and planned tools. Launched tools can be used directly; tools requiring AI, account, or backend capability will show login or status information." },
      { q: "How do I report page or link issues?", a: "Send the link, screenshot, and short description to one@ninespro.com. Issues will be reviewed and fixed by priority." },
      { q: "Can NINESPRO build custom websites, tools, or AI systems?", a: "Yes. Email one@ninespro.com with requirements, target users, feature scope, and timeline for evaluation." },
      { q: "How is privacy handled?", a: "The site aims to collect only necessary information. Account data, AI tool history, and contact content are handled according to the privacy policy." },
    ],
    contactTitle: "Contact Options",
    contactDesc: "If support content does not solve the issue, use the unified email address.",
    contactCards: [
      { title: "Unified Email", desc: "one@ninespro.com", href: "mailto:one@ninespro.com" },
      { title: "Contact Page", desc: "Submit project, partnership, feedback, or support requests.", href: "/contact" },
      { title: "Privacy", desc: "Review information handling and privacy notes.", href: "/privacy" },
    ],
    finalTitle: "Still need help?",
    finalDesc: "Send the issue, screenshot, and link to one@ninespro.com.",
    finalButton: "Send Email",
  },
};

function CardGrid({ items, locale }: { items: Card[]; locale: Locale }) {
  return (
    <div className="supportGrid">
      {items.map((item) => (
        <a className="supportCard" href={normalizeHref(locale, item.href)} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </a>
      ))}
    </div>
  );
}

export default function SupportPage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  const t = copy[locale];

  return (
    <main className="supportRoot">
      <style>{`
        .supportRoot {
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 104px 24px 96px;
        }
        .supportShell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }
        .supportHero {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .supportHero h1,
        .supportSectionHead h2,
        .supportCta h2 {
          margin: 0;
          font-size: clamp(32px, 4vw, 40px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 950;
        }
        .supportHero p,
        .supportSectionHead p,
        .supportCta p {
          margin: 14px 0 0;
          max-width: 880px;
          color: #5b6678;
          font-size: clamp(17px, 1.8vw, 24px);
          line-height: 1.42;
          font-weight: 760;
          letter-spacing: -0.03em;
          text-wrap: balance;
        }
        .supportDivider {
          width: 100vw;
          height: 24px;
          margin-left: calc(50% - 50vw);
          background: #fff;
        }
        .supportSection {
          padding-top: 56px;
        }
        .supportSectionHead {
          margin-bottom: 24px;
        }
        .supportGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .supportCard,
        .faqItem,
        .supportCta {
          border-radius: 30px;
          padding: 26px;
          background: #d8dee8;
          color: #05070a;
          text-decoration: none;
        }
        .supportCard h3 {
          margin: 0 0 12px;
          font-size: 23px;
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-weight: 950;
        }
        .supportCard p,
        .faqItem p {
          margin: 0;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.66;
          font-weight: 650;
        }
        .supportCard:hover {
          background: #d1d8e3;
        }
        .faqList {
          display: grid;
          gap: 16px;
        }
        .faqItem h3 {
          margin: 0 0 10px;
          font-size: 21px;
          line-height: 1.16;
          letter-spacing: -0.035em;
          font-weight: 950;
        }
        .supportCta {
          margin-top: 56px;
          text-align: left;
        }
        .supportButton {
          margin-top: 22px;
          min-height: 46px;
          border-radius: 999px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #05070a;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 900;
        }
        @media (max-width: 760px) {
          .supportRoot {
            padding: 92px 18px 80px;
          }
          .supportShell {
            width: calc(100vw - 36px);
          }
          .supportCard,
          .faqItem,
          .supportCta {
            border-radius: 26px;
            padding: 22px;
          }
        }
      `}</style>

      <div className="supportShell">
        <section className="supportHero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </section>
        <div className="supportDivider" aria-hidden="true" />

        <section className="supportSection">
          <div className="supportSectionHead">
            <h2>{t.guides.title}</h2>
            <p>{t.guides.desc}</p>
          </div>
          <CardGrid items={t.guides.items} locale={locale} />
        </section>

        <section className="supportSection">
          <div className="supportSectionHead">
            <h2>{t.faqTitle}</h2>
            <p>{t.faqDesc}</p>
          </div>
          <div className="faqList">
            {t.faqs.map((item) => (
              <article className="faqItem" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="supportSection">
          <div className="supportSectionHead">
            <h2>{t.contactTitle}</h2>
            <p>{t.contactDesc}</p>
          </div>
          <CardGrid items={t.contactCards} locale={locale} />
        </section>

        <section className="supportCta">
          <h2>{t.finalTitle}</h2>
          <p>{t.finalDesc}</p>
          <a className="supportButton" href="mailto:one@ninespro.com">{t.finalButton}</a>
        </section>
      </div>
    </main>
  );
}
