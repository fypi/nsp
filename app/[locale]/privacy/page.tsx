"use client";

import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type PrivacyText = {
  title: string;
  desc: string;

  sectionInfoTitle: string;
  sectionInfoDesc: string;

  sectionUseTitle: string;
  sectionUseDesc: string;

  sectionProtectTitle: string;
  sectionProtectDesc: string;

  sectionContactTitle: string;
  sectionContactDesc: string;

  disclaimerTitle: string;
  disclaimerDesc: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const privacyText: Record<Locale, PrivacyText> = {
  zh: {
    title: "隐私与法律",
    desc: "本页面说明九域如何收集、使用、保护您的个人信息，以及网站内容和工具的使用边界。",

    sectionInfoTitle: "我们可能收集的信息",
    sectionInfoDesc:
      "当您使用账号、联系表单或相关工具时，我们可能会收集您主动提交的信息，例如邮箱、姓名、留言内容以及必要的账号信息。我们不会主动索取与服务无关的敏感信息。",

    sectionUseTitle: "信息如何使用",
    sectionUseDesc:
      "我们使用这些信息主要用于账号登录、联系回复、问题处理、服务改进和安全维护。除非法律要求或获得您的明确授权，我们不会出售您的个人信息。",

    sectionProtectTitle: "信息保护",
    sectionProtectDesc:
      "我们会采取合理的技术和管理措施保护信息安全，包括访问控制、必要的数据隔离和服务端安全配置。但互联网传输无法保证绝对安全，请避免提交不必要的敏感内容。",

    sectionContactTitle: "联系我们",
    sectionContactDesc:
      "如果您对隐私、法律条款或数据处理方式有疑问，可以通过联系方式页面与我们沟通。",

    disclaimerTitle: "免责声明：",
    disclaimerDesc:
      "九域网站中的工具、内容和示例仅用于学习、效率辅助和一般信息参考，不构成投资建议、法律意见、财务意见或专业服务承诺。涉及关键决策时，请结合实际情况自行核验，并咨询相关专业人士。",
  },

  "zh-TW": {
    title: "隱私與法律",
    desc: "本頁面說明九域如何收集、使用、保護您的個人資訊，以及網站內容和工具的使用邊界。",

    sectionInfoTitle: "我們可能收集的資訊",
    sectionInfoDesc:
      "當您使用帳號、聯絡表單或相關工具時，我們可能會收集您主動提交的資訊，例如郵箱、姓名、留言內容以及必要的帳號資訊。我們不會主動索取與服務無關的敏感資訊。",

    sectionUseTitle: "資訊如何使用",
    sectionUseDesc:
      "我們使用這些資訊主要用於帳號登入、聯絡回覆、問題處理、服務改進和安全維護。除非法律要求或獲得您的明確授權，我們不會出售您的個人資訊。",

    sectionProtectTitle: "資訊保護",
    sectionProtectDesc:
      "我們會採取合理的技術和管理措施保護資訊安全，包括訪問控制、必要的資料隔離和服務端安全配置。但網際網路傳輸無法保證絕對安全，請避免提交不必要的敏感內容。",

    sectionContactTitle: "聯絡我們",
    sectionContactDesc:
      "如果您對隱私、法律條款或資料處理方式有疑問，可以通過聯絡方式頁面與我們溝通。",

    disclaimerTitle: "免責聲明：",
    disclaimerDesc:
      "九域網站中的工具、內容和示例僅用於學習、效率輔助和一般資訊參考，不構成投資建議、法律意見、財務意見或專業服務承諾。涉及關鍵決策時，請結合實際情況自行核驗，並諮詢相關專業人士。",
  },

  en: {
    title: "Privacy & Legal",
    desc:
      "This page explains how NinesPro collects, uses, and protects personal information, as well as the usage boundaries of website content and tools.",

    sectionInfoTitle: "Information We May Collect",
    sectionInfoDesc:
      "When you use an account, contact form, or related tools, we may collect information you voluntarily submit, such as email address, name, message content, and necessary account information. We do not intentionally request sensitive information unrelated to the service.",

    sectionUseTitle: "How Information Is Used",
    sectionUseDesc:
      "We use this information mainly for account login, contact replies, issue handling, service improvement, and security maintenance. Unless required by law or explicitly authorized by you, we do not sell your personal information.",

    sectionProtectTitle: "Information Protection",
    sectionProtectDesc:
      "We take reasonable technical and administrative measures to protect information security, including access control, necessary data separation, and server-side security configuration. However, internet transmission cannot be guaranteed to be absolutely secure, so please avoid submitting unnecessary sensitive content.",

    sectionContactTitle: "Contact Us",
    sectionContactDesc:
      "If you have questions about privacy, legal terms, or data handling, you can contact us through the contact page.",

    disclaimerTitle: "Disclaimer:",
    disclaimerDesc:
      "Tools, content, and examples on NinesPro are provided for learning, productivity assistance, and general informational reference only. They do not constitute investment advice, legal advice, financial advice, or a professional service commitment. For critical decisions, please verify based on your actual situation and consult relevant professionals.",
  },
};

export default function PrivacyPage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = privacyText[locale];

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>{t.sectionInfoTitle}</h3>
              <p>{t.sectionInfoDesc}</p>
            </div>

            <div className="card">
              <h3>{t.sectionUseTitle}</h3>
              <p>{t.sectionUseDesc}</p>
            </div>

            <div className="card">
              <h3>{t.sectionProtectTitle}</h3>
              <p>{t.sectionProtectDesc}</p>
            </div>

            <div className="card">
              <h3>{t.sectionContactTitle}</h3>
              <p>{t.sectionContactDesc}</p>
            </div>
          </div>
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