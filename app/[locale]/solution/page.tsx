type Locale = "zh" | "zh-TW" | "en";

type SolutionCard = {
  title: string;
  desc: string;
};

type SolutionPageText = {
  heroTitle: string;
  heroDesc: string;

  cards: SolutionCard[];

  howTitle: string;
  howDesc: string;

  disclaimerTitle: string;
  disclaimerDesc: string;
};

function normalizeLocale(locale?: string): Locale {
  if (locale === "en" || locale === "zh" || locale === "zh-TW") {
    return locale;
  }

  return "zh";
}

const solutionPageText: Record<Locale, SolutionPageText> = {
  zh: {
    heroTitle: "解决方案",
    heroDesc:
      "复杂的事，往简单了做。投研、技术服务、AI 工具——遇到具体问题，这里是我们的思路和方法。",

    cards: [
      {
        title: "投资研究框架",
        desc: "系统化的研究方法与风险评估思路，帮助你建立独立判断能力。",
      },
      {
        title: "技术架构方案",
        desc: "网络、网站、AI 系统的搭建思路与最佳实践，从规划到落地。",
      },
      {
        title: "自动化工作流",
        desc: "用工具和脚本替代重复劳动，让机器做该做的事。",
      },
      {
        title: "数据与 BI",
        desc: "数据采集、清洗、可视化到决策支持的全链路方案。",
      },
    ],

    howTitle: "怎么用这些方案",
    howDesc:
      "这里的方案不是标准化产品，而是我们面对不同场景时的思路记录。你可以直接参考、修改、套用，也可以联系我们进一步沟通具体需求。所有内容都保持更新，跟着实际项目一起迭代。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "本页所有方案均为思路分享，不构成具体项目承诺或服务合同。如需定制化服务，请通过联系方式与我们沟通。",
  },

  "zh-TW": {
    heroTitle: "解決方案",
    heroDesc:
      "複雜的事，往簡單了做。投研、技術服務、AI 工具——遇到具體問題，這裡是我們的思路和方法。",

    cards: [
      {
        title: "投資研究框架",
        desc: "系統化的研究方法與風險評估思路，幫助你建立獨立判斷能力。",
      },
      {
        title: "技術架構方案",
        desc: "網路、網站、AI 系統的搭建思路與最佳實踐，從規劃到落地。",
      },
      {
        title: "自動化工作流",
        desc: "用工具和腳本替代重複勞動，讓機器做該做的事。",
      },
      {
        title: "資料與 BI",
        desc: "資料採集、清洗、視覺化到決策支援的全鏈路方案。",
      },
    ],

    howTitle: "怎麼用這些方案",
    howDesc:
      "這裡的方案不是標準化產品，而是我們面對不同場景時的思路記錄。你可以直接參考、修改、套用，也可以聯絡我們進一步溝通具體需求。所有內容都保持更新，跟著實際項目一起迭代。",

    disclaimerTitle: "提示：",
    disclaimerDesc:
      "本頁所有方案均為思路分享，不構成具體項目承諾或服務合同。如需定制化服務，請通過聯絡方式與我們溝通。",
  },

  en: {
    heroTitle: "Solutions",
    heroDesc:
      "Make complex things simpler. From research and technical services to AI tools, this page explains our thinking and methods for real problems.",

    cards: [
      {
        title: "Investment Research Framework",
        desc: "Systematic research methods and risk assessment approaches to help build independent judgment.",
      },
      {
        title: "Technical Architecture Solutions",
        desc: "Planning and implementation practices for networks, websites, and AI systems.",
      },
      {
        title: "Automation Workflows",
        desc: "Use tools and scripts to replace repetitive work, letting machines handle what machines should do.",
      },
      {
        title: "Data & BI",
        desc: "End-to-end solutions from data collection and cleaning to visualization and decision support.",
      },
    ],

    howTitle: "How to Use These Solutions",
    howDesc:
      "These solutions are not standardized products. They are notes on how we approach different scenarios. You can reference, modify, or adapt them directly, or contact us to discuss specific requirements. The content will continue to be updated alongside real projects.",

    disclaimerTitle: "Notice:",
    disclaimerDesc:
      "All solutions on this page are shared as ideas and do not constitute a specific project commitment or service contract. For custom services, please contact us through the contact page.",
  },
};

export default function SolutionPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = normalizeLocale(params?.locale);
  const t = solutionPageText[locale];

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            {t.cards.map((card) => (
              <div className="card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.howTitle}</h2>
          <p>{t.howDesc}</p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>{t.disclaimerTitle}</strong>
            {t.disclaimerDesc}
          </p>
        </div>
      </div>
    </main>
  );
}