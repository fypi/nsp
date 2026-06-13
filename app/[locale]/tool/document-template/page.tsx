"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type DocType =
  | "notice"
  | "application"
  | "statement"
  | "cooperation"
  | "minutes"
  | "plan";

type Tone = "formal" | "simple" | "friendly";

type DocTypeItem = {
  value: DocType;
  label: string;
  desc: string;
};

type ToneItem = {
  value: Tone;
  label: string;
};

type PageText = {
  title: string;
  desc: string;

  inputTitle: string;
  inputDesc: string;

  docTypeLabel: string;
  toneLabel: string;

  fieldTitle: string;
  fieldTitlePlaceholder: string;

  fieldTarget: string;
  fieldTargetPlaceholder: string;

  fieldMatter: string;
  fieldMatterPlaceholder: string;

  fieldDetails: string;
  fieldDetailsPlaceholder: string;

  generate: string;

  resultTitle: string;
  resultDesc: string;
  emptyResult: string;

  copied: string;
  copyResult: string;

  disclaimerTitle: string;
  disclaimerDesc: string;

  defaultTitle: string;
  defaultTarget: string;
  defaultMatter: string;
  defaultDetails: string;

  brandName: string;
  applicantPlaceholder: string;
  recorderPlaceholder: string;

  docTypes: DocTypeItem[];
  tones: ToneItem[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const pageText: Record<Locale, PageText> = {
  zh: {
    title: "文书模板生成器",
    desc:
      "选择文书类型，填写基本信息，快速生成一份可复制的起草模板。适合通知、申请、说明、会议纪要和工作计划等常见场景。",

    inputTitle: "填写信息",
    inputDesc:
      "先生成基础稿，再结合实际情况修改。不要把模板直接当成最终正式文件。",

    docTypeLabel: "文书类型",
    toneLabel: "语气",

    fieldTitle: "标题",
    fieldTitlePlaceholder: "例如：关于项目进度安排的通知",

    fieldTarget: "对象 / 单位",
    fieldTargetPlaceholder: "例如：全体成员、某某部门、合作单位",

    fieldMatter: "事项",
    fieldMatterPlaceholder: "例如：项目推进、费用申请、情况说明",

    fieldDetails: "关键内容",
    fieldDetailsPlaceholder:
      "写清楚背景、时间、地点、原因、要求、责任人、下一步安排等。",

    generate: "生成模板",

    resultTitle: "生成结果",
    resultDesc: "生成后可以复制到 Word、飞书、邮件或其他文档工具中继续修改。",
    emptyResult: "填写上方信息后，点击「生成模板」查看结果。",

    copied: "已复制",
    copyResult: "复制结果",

    disclaimerTitle: "免责声明：",
    disclaimerDesc:
      "模板内容仅供起草和参考，不构成法律、财务或专业意见。正式使用前请结合实际情况核验，必要时咨询专业人士。",

    defaultTitle: "文书标题",
    defaultTarget: "相关单位/人员",
    defaultMatter: "相关事项",
    defaultDetails:
      "请在这里补充事项背景、关键内容、时间安排、责任人、要求或其他需要说明的信息。",

    brandName: "九域",
    applicantPlaceholder: "申请人/单位：__________",
    recorderPlaceholder: "记录人：__________",

    docTypes: [
      {
        value: "notice",
        label: "通知",
        desc: "适合发布事项、安排、提醒和内部公告。",
      },
      {
        value: "application",
        label: "申请书",
        desc: "适合提交申请、说明理由、请求批准。",
      },
      {
        value: "statement",
        label: "情况说明",
        desc: "适合说明背景、经过、原因和处理意见。",
      },
      {
        value: "cooperation",
        label: "合作意向书",
        desc: "适合初步表达合作方向、合作内容和后续安排。",
      },
      {
        value: "minutes",
        label: "会议纪要",
        desc: "适合整理会议主题、讨论内容、结论和待办。",
      },
      {
        value: "plan",
        label: "工作计划",
        desc: "适合拆解目标、任务、时间安排和交付结果。",
      },
    ],

    tones: [
      { value: "formal", label: "正式" },
      { value: "simple", label: "简洁" },
      { value: "friendly", label: "友好" },
    ],
  },

  "zh-TW": {
    title: "文書模板生成器",
    desc:
      "選擇文書類型，填寫基本資訊，快速生成一份可複製的起草模板。適合通知、申請、說明、會議紀要和工作計劃等常見場景。",

    inputTitle: "填寫資訊",
    inputDesc:
      "先生成基礎稿，再結合實際情況修改。不要把模板直接當成最終正式文件。",

    docTypeLabel: "文書類型",
    toneLabel: "語氣",

    fieldTitle: "標題",
    fieldTitlePlaceholder: "例如：關於項目進度安排的通知",

    fieldTarget: "對象 / 單位",
    fieldTargetPlaceholder: "例如：全體成員、某某部門、合作單位",

    fieldMatter: "事項",
    fieldMatterPlaceholder: "例如：項目推進、費用申請、情況說明",

    fieldDetails: "關鍵內容",
    fieldDetailsPlaceholder:
      "寫清楚背景、時間、地點、原因、要求、責任人、下一步安排等。",

    generate: "生成模板",

    resultTitle: "生成結果",
    resultDesc: "生成後可以複製到 Word、飛書、郵件或其他文件工具中繼續修改。",
    emptyResult: "填寫上方資訊後，點擊「生成模板」查看結果。",

    copied: "已複製",
    copyResult: "複製結果",

    disclaimerTitle: "免責聲明：",
    disclaimerDesc:
      "模板內容僅供起草和參考，不構成法律、財務或專業意見。正式使用前請結合實際情況核驗，必要時諮詢專業人士。",

    defaultTitle: "文書標題",
    defaultTarget: "相關單位/人員",
    defaultMatter: "相關事項",
    defaultDetails:
      "請在這裡補充事項背景、關鍵內容、時間安排、責任人、要求或其他需要說明的資訊。",

    brandName: "九域",
    applicantPlaceholder: "申請人/單位：__________",
    recorderPlaceholder: "記錄人：__________",

    docTypes: [
      {
        value: "notice",
        label: "通知",
        desc: "適合發布事項、安排、提醒和內部公告。",
      },
      {
        value: "application",
        label: "申請書",
        desc: "適合提交申請、說明理由、請求批准。",
      },
      {
        value: "statement",
        label: "情況說明",
        desc: "適合說明背景、經過、原因和處理意見。",
      },
      {
        value: "cooperation",
        label: "合作意向書",
        desc: "適合初步表達合作方向、合作內容和後續安排。",
      },
      {
        value: "minutes",
        label: "會議紀要",
        desc: "適合整理會議主題、討論內容、結論和待辦。",
      },
      {
        value: "plan",
        label: "工作計劃",
        desc: "適合拆解目標、任務、時間安排和交付結果。",
      },
    ],

    tones: [
      { value: "formal", label: "正式" },
      { value: "simple", label: "簡潔" },
      { value: "friendly", label: "友好" },
    ],
  },

  en: {
    title: "Document Template Generator",
    desc:
      "Choose a document type, fill in basic information, and quickly generate a draft template that can be copied and edited. Suitable for notices, applications, statements, meeting minutes, work plans, and other common scenarios.",

    inputTitle: "Fill in Information",
    inputDesc:
      "Generate a basic draft first, then revise it based on the actual situation. Do not treat the template as a final official document.",

    docTypeLabel: "Document Type",
    toneLabel: "Tone",

    fieldTitle: "Title",
    fieldTitlePlaceholder: "Example: Notice on Project Progress Arrangement",

    fieldTarget: "Recipient / Organization",
    fieldTargetPlaceholder: "Example: All members, a department, partner organization",

    fieldMatter: "Matter",
    fieldMatterPlaceholder: "Example: Project progress, budget request, situation statement",

    fieldDetails: "Key Details",
    fieldDetailsPlaceholder:
      "Describe the background, time, location, reason, requirements, responsible person, next steps, or other necessary information.",

    generate: "Generate Template",

    resultTitle: "Generated Result",
    resultDesc:
      "After generating, copy the result to Word, Feishu, email, or other document tools for further editing.",
    emptyResult: "Fill in the information above, then click “Generate Template” to view the result.",

    copied: "Copied",
    copyResult: "Copy Result",

    disclaimerTitle: "Disclaimer:",
    disclaimerDesc:
      "The template content is for drafting and reference only. It does not constitute legal, financial, or professional advice. Please verify based on the actual situation before official use, and consult professionals when necessary.",

    defaultTitle: "Document Title",
    defaultTarget: "Relevant organization/personnel",
    defaultMatter: "Relevant matter",
    defaultDetails:
      "Add background, key content, timeline, responsible parties, requirements, or other necessary details here.",

    brandName: "NinesPro",
    applicantPlaceholder: "Applicant/Organization: __________",
    recorderPlaceholder: "Recorder: __________",

    docTypes: [
      {
        value: "notice",
        label: "Notice",
        desc: "Suitable for announcements, arrangements, reminders, and internal notices.",
      },
      {
        value: "application",
        label: "Application",
        desc: "Suitable for submitting requests, explaining reasons, and asking for approval.",
      },
      {
        value: "statement",
        label: "Situation Statement",
        desc: "Suitable for explaining background, process, reasons, and handling suggestions.",
      },
      {
        value: "cooperation",
        label: "Letter of Cooperation Intent",
        desc: "Suitable for expressing initial cooperation direction, content, and next steps.",
      },
      {
        value: "minutes",
        label: "Meeting Minutes",
        desc: "Suitable for organizing meeting topics, discussions, conclusions, and follow-ups.",
      },
      {
        value: "plan",
        label: "Work Plan",
        desc: "Suitable for breaking down goals, tasks, timelines, and deliverables.",
      },
    ],

    tones: [
      { value: "formal", label: "Formal" },
      { value: "simple", label: "Concise" },
      { value: "friendly", label: "Friendly" },
    ],
  },
};

function todayText(locale: Locale) {
  const now = new Date();

  if (locale === "en") {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(now);
  }

  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");

  if (locale === "zh-TW") {
    return `${y}年${m}月${d}日`;
  }

  return `${y}年${m}月${d}日`;
}

function normalize(value: string, fallback: string) {
  const text = value.trim();
  return text || fallback;
}

function toneOpening(tone: Tone, locale: Locale) {
  if (locale === "en") {
    if (tone === "simple") return "The relevant matters are stated as follows:";
    if (tone === "friendly") {
      return "To help everyone understand and move the matter forward, the main points are stated as follows:";
    }
    return "Based on actual work needs, the relevant matters are stated as follows:";
  }

  if (locale === "zh-TW") {
    if (tone === "simple") return "現將有關事項說明如下：";
    if (tone === "friendly") {
      return "為便於大家了解和推進相關事項，現將主要內容說明如下：";
    }
    return "根據實際工作需要，現將有關事項說明如下：";
  }

  if (tone === "simple") return "现将有关事项说明如下：";
  if (tone === "friendly") {
    return "为便于大家了解和推进相关事项，现将主要内容说明如下：";
  }

  return "根据实际工作需要，现将有关事项说明如下：";
}

function toneEnding(tone: Tone, locale: Locale) {
  if (locale === "en") {
    if (tone === "simple") {
      return "Please be informed and proceed as required.";
    }

    if (tone === "friendly") {
      return "If there are any questions, please feel free to communicate and confirm. Thank you for your understanding and cooperation.";
    }

    return "Please ensure careful implementation. For any unresolved matters, please communicate and confirm in a timely manner.";
  }

  if (locale === "zh-TW") {
    if (tone === "simple") return "請相關人員知悉並按要求執行。";

    if (tone === "friendly") {
      return "如有疑問，可進一步溝通確認。感謝理解與配合。";
    }

    return "請相關單位或人員認真落實。如有未盡事宜，請及時溝通確認。";
  }

  if (tone === "simple") return "请相关人员知悉并按要求执行。";

  if (tone === "friendly") {
    return "如有疑问，可进一步沟通确认。感谢理解与配合。";
  }

  return "请相关单位或人员认真落实。如有未尽事宜，请及时沟通确认。";
}

function buildTemplate(input: {
  locale: Locale;
  text: PageText;
  docType: DocType;
  tone: Tone;
  title: string;
  target: string;
  matter: string;
  details: string;
}) {
  const locale = input.locale;
  const text = input.text;

  const title = normalize(input.title, text.defaultTitle);
  const target = normalize(input.target, text.defaultTarget);
  const matter = normalize(input.matter, text.defaultMatter);
  const details = normalize(input.details, text.defaultDetails);

  const opening = toneOpening(input.tone, locale);
  const ending = toneEnding(input.tone, locale);
  const date = todayText(locale);

  if (locale === "en") {
    if (input.docType === "notice") {
      return `${title}

${target},

${opening}

1. Matter
${matter}

2. Main Content
${details}

3. Requirements
Please make the necessary preparations and complete the relevant tasks within the required timeframe.

${ending}

${text.brandName}
${date}`;
    }

    if (input.docType === "application") {
      return `${title}

${target},

Due to ${matter}, the following application is submitted:

1. Application Matter
${matter}

2. Reason for Application
${details}

3. Expected Result
Please review the application and provide support or approval based on the actual situation.

${ending}

${text.applicantPlaceholder}
${date}`;
    }

    if (input.docType === "statement") {
      return `${title}

${target},

Regarding ${matter}, the relevant situation is explained as follows:

1. Basic Situation
${details}

2. Cause Explanation
Please add the actual causes, scope of impact, relevant personnel, or objective conditions.

3. Handling Suggestions
Follow-up actions will continue based on the actual situation, and necessary measures will be taken to reduce the recurrence of similar issues.

${ending}

Statement by: __________
${date}`;
    }

    if (input.docType === "cooperation") {
      return `${title}

${target},

To promote ${matter}, both parties intend to further communicate and cooperate on the basis of equality, voluntariness, and mutual benefit. The preliminary intention is as follows:

1. Cooperation Direction
${matter}

2. Cooperation Content
${details}

3. Promotion Method
Both parties may further confirm the cooperation scope, responsibilities, timeline, and delivery method based on actual needs.

4. Other Notes
This letter of intent is only for preliminary communication. Specific cooperation matters shall be subject to subsequent formal documents or agreements.

${ending}

${text.brandName}
${date}`;
    }

    if (input.docType === "minutes") {
      return `${title}

Meeting Topic: ${matter}
Participants / Target: ${target}
Meeting Date: ${date}

1. Meeting Background
${details}

2. Discussion Points
1. Review the current situation around the meeting topic.
2. Clarify major issues, directions, and responsibilities.
3. Confirm follow-up items.

3. Meeting Conclusions
Please add final conclusions based on the actual meeting content.

4. Follow-up Items
1. Task: __________
2. Responsible Person: __________
3. Due Date: __________

${text.recorderPlaceholder}`;
    }

    return `${title}

Target Matter: ${matter}
Applicable Target: ${target}
Date: ${date}

1. Work Objective
Clarify stage goals, key tasks, and deliverables around ${matter}.

2. Main Tasks
${details}

3. Timeline
1. Stage 1: Clarify needs and prepare materials.
2. Stage 2: Execute and continuously review progress.
3. Stage 3: Complete delivery, review issues, and optimize follow-up processes.

4. Responsibilities
Please add responsible persons, collaborators, and acceptance criteria based on the actual situation.

5. Risk Notes
If resources, timeline, or external conditions change, the plan should be adjusted in time and communicated to relevant personnel.

${ending}`;
  }

  if (locale === "zh-TW") {
    if (input.docType === "notice") {
      return `${title}

${target}：

${opening}

一、事項名稱
${matter}

二、主要內容
${details}

三、相關要求
請相關人員按照安排做好準備，並在規定時間內完成對應事項。

${ending}

${text.brandName}
${date}`;
    }

    if (input.docType === "application") {
      return `${title}

${target}：

本人/本單位因 ${matter}，現提出如下申請：

一、申請事項
${matter}

二、申請理由
${details}

三、期望結果
懇請予以審核，並根據實際情況給予支持或批准。

${ending}

${text.applicantPlaceholder}
${date}`;
    }

    if (input.docType === "statement") {
      return `${title}

${target}：

關於 ${matter}，現將有關情況說明如下：

一、基本情況
${details}

二、原因說明
請結合實際情況補充事件原因、影響範圍、相關人員或客觀條件。

三、處理意見
後續將根據實際情況繼續跟進，並採取必要措施減少類似情況再次發生。

${ending}

說明人/單位：__________
${date}`;
    }

    if (input.docType === "cooperation") {
      return `${title}

${target}：

為推進 ${matter}，雙方擬在平等、自願、互利的基礎上開展進一步溝通與合作。初步意向如下：

一、合作方向
${matter}

二、合作內容
${details}

三、推進方式
雙方可根據實際需求進一步確認合作範圍、分工、時間安排和交付方式。

四、其他說明
本意向內容僅作為前期溝通參考，具體合作事項以雙方後續正式文件或協議為準。

${ending}

${text.brandName}
${date}`;
    }

    if (input.docType === "minutes") {
      return `${title}

會議主題：${matter}
會議對象：${target}
會議時間：${date}

一、會議背景
${details}

二、討論要點
1. 圍繞會議主題梳理當前情況。
2. 明確主要問題、推進方向和相關責任。
3. 確認下一步需要跟進的事項。

三、會議結論
請根據實際會議內容補充最終結論。

四、待辦事項
1. 待辦事項一：__________
2. 責任人：__________
3. 完成時間：__________

${text.recorderPlaceholder}`;
    }

    return `${title}

目標事項：${matter}
適用對象：${target}
制定時間：${date}

一、工作目標
圍繞 ${matter}，明確階段目標、重點任務和交付結果。

二、主要任務
${details}

三、時間安排
1. 第一階段：梳理需求和準備資料。
2. 第二階段：推進執行並持續檢查。
3. 第三階段：完成交付、復盤問題並優化後續流程。

四、責任分工
請根據實際情況補充負責人、協作人員和驗收標準。

五、風險提示
如遇資源、時間或外部條件變化，應及時調整計劃並同步相關人員。

${ending}`;
  }

  if (input.docType === "notice") {
    return `${title}

${target}：

${opening}

一、事项名称
${matter}

二、主要内容
${details}

三、相关要求
请相关人员按照安排做好准备，并在规定时间内完成对应事项。

${ending}

${text.brandName}
${date}`;
  }

  if (input.docType === "application") {
    return `${title}

${target}：

本人/本单位因 ${matter}，现提出如下申请：

一、申请事项
${matter}

二、申请理由
${details}

三、期望结果
恳请予以审核，并根据实际情况给予支持或批准。

${ending}

${text.applicantPlaceholder}
${date}`;
  }

  if (input.docType === "statement") {
    return `${title}

${target}：

关于 ${matter}，现将有关情况说明如下：

一、基本情况
${details}

二、原因说明
请结合实际情况补充事件原因、影响范围、相关人员或客观条件。

三、处理意见
后续将根据实际情况继续跟进，并采取必要措施减少类似情况再次发生。

${ending}

说明人/单位：__________
${date}`;
  }

  if (input.docType === "cooperation") {
    return `${title}

${target}：

为推进 ${matter}，双方拟在平等、自愿、互利的基础上开展进一步沟通与合作。初步意向如下：

一、合作方向
${matter}

二、合作内容
${details}

三、推进方式
双方可根据实际需求进一步确认合作范围、分工、时间安排和交付方式。

四、其他说明
本意向内容仅作为前期沟通参考，具体合作事项以双方后续正式文件或协议为准。

${ending}

${text.brandName}
${date}`;
  }

  if (input.docType === "minutes") {
    return `${title}

会议主题：${matter}
会议对象：${target}
会议时间：${date}

一、会议背景
${details}

二、讨论要点
1. 围绕会议主题梳理当前情况。
2. 明确主要问题、推进方向和相关责任。
3. 确认下一步需要跟进的事项。

三、会议结论
请根据实际会议内容补充最终结论。

四、待办事项
1. 待办事项一：__________
2. 责任人：__________
3. 完成时间：__________

${text.recorderPlaceholder}`;
  }

  return `${title}

目标事项：${matter}
适用对象：${target}
制定时间：${date}

一、工作目标
围绕 ${matter}，明确阶段目标、重点任务和交付结果。

二、主要任务
${details}

三、时间安排
1. 第一阶段：梳理需求和准备资料。
2. 第二阶段：推进执行并持续检查。
3. 第三阶段：完成交付、复盘问题并优化后续流程。

四、责任分工
请根据实际情况补充负责人、协作人员和验收标准。

五、风险提示
如遇资源、时间或外部条件变化，应及时调整计划并同步相关人员。

${ending}`;
}

export default function DocumentTemplatePage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = pageText[locale];

  const [docType, setDocType] = useState<DocType>("notice");
  const [tone, setTone] = useState<Tone>("formal");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [matter, setMatter] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedDocType = t.docTypes.find((item) => item.value === docType);

  const result = useMemo(() => {
    return buildTemplate({
      locale,
      text: t,
      docType,
      tone,
      title,
      target,
      matter,
      details,
    });
  }, [locale, t, docType, tone, title, target, matter, details]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <h2>{t.inputTitle}</h2>
          <p>{t.inputDesc}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div className="card">
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#111",
                }}
              >
                {t.docTypeLabel}
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 10,
                }}
              >
                {t.docTypes.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setDocType(item.value)}
                    style={{
                      border:
                        docType === item.value
                          ? "1px solid #111"
                          : "1px solid #e5e5e5",
                      background: docType === item.value ? "#111" : "#fff",
                      color: docType === item.value ? "#fff" : "#111",
                      borderRadius: 14,
                      padding: "12px 14px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {selectedDocType && (
                <p style={{ marginTop: 10, color: "#666", fontSize: 14 }}>
                  {selectedDocType.desc}
                </p>
              )}
            </div>

            <div className="card">
              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#111",
                }}
              >
                {t.toneLabel}
              </label>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {t.tones.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setTone(item.value)}
                    style={{
                      border:
                        tone === item.value
                          ? "1px solid #111"
                          : "1px solid #e5e5e5",
                      background: tone === item.value ? "#111" : "#fff",
                      color: tone === item.value ? "#fff" : "#111",
                      borderRadius: 999,
                      padding: "9px 15px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                <Field
                  label={t.fieldTitle}
                  placeholder={t.fieldTitlePlaceholder}
                  value={title}
                  onChange={setTitle}
                />

                <Field
                  label={t.fieldTarget}
                  placeholder={t.fieldTargetPlaceholder}
                  value={target}
                  onChange={setTarget}
                />

                <Field
                  label={t.fieldMatter}
                  placeholder={t.fieldMatterPlaceholder}
                  value={matter}
                  onChange={setMatter}
                />
              </div>

              <label
                style={{
                  display: "block",
                  fontWeight: 700,
                  marginTop: 14,
                  marginBottom: 8,
                  color: "#111",
                }}
              >
                {t.fieldDetails}
              </label>

              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={t.fieldDetailsPlaceholder}
                rows={8}
                style={{
                  width: "100%",
                  border: "1px solid #e5e5e5",
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 15,
                  lineHeight: 1.7,
                  outline: "none",
                  resize: "vertical",
                  color: "#111",
                  background: "#fff",
                }}
              />

              <button
                type="button"
                onClick={() => setHasGenerated(true)}
                style={{
                  marginTop: 16,
                  border: "none",
                  borderRadius: 999,
                  padding: "12px 22px",
                  background: "#111",
                  color: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {t.generate}
              </button>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.resultTitle}</h2>
          <p>{t.resultDesc}</p>

          <div className="card" style={{ marginTop: 16 }}>
            {!hasGenerated ? (
              <p style={{ color: "#666", margin: 0 }}>{t.emptyResult}</p>
            ) : (
              <>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    margin: 0,
                    padding: 16,
                    borderRadius: 14,
                    background: "#f7f7f7",
                    color: "#111",
                    fontSize: 14,
                    lineHeight: 1.75,
                    fontFamily:
                      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  {result}
                </pre>

                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    marginTop: 14,
                    border: "1px solid #111",
                    borderRadius: 999,
                    padding: "10px 18px",
                    background: "#fff",
                    color: "#111",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {copied ? t.copied : t.copyResult}
                </button>
              </>
            )}
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

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontWeight: 700,
          marginBottom: 8,
          color: "#111",
        }}
      >
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={fieldInputStyle}
      />
    </label>
  );
}

const fieldInputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #e5e5e5",
  borderRadius: 14,
  padding: "12px 14px",
  fontSize: 15,
  outline: "none",
  color: "#111",
  background: "#fff",
};