"use client";

import { useMemo, useState } from "react";

type DocType =
  | "notice"
  | "application"
  | "statement"
  | "cooperation"
  | "minutes"
  | "plan";

type Tone = "formal" | "simple" | "friendly";

const docTypes: { value: DocType; label: string; desc: string }[] = [
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
];

const tones: { value: Tone; label: string }[] = [
  { value: "formal", label: "正式" },
  { value: "simple", label: "简洁" },
  { value: "friendly", label: "友好" },
];

function todayText() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}年${m}月${d}日`;
}

function normalize(value: string, fallback: string) {
  const text = value.trim();
  return text || fallback;
}

function toneOpening(tone: Tone) {
  if (tone === "simple") {
    return "现将有关事项说明如下：";
  }

  if (tone === "friendly") {
    return "为便于大家了解和推进相关事项，现将主要内容说明如下：";
  }

  return "根据实际工作需要，现将有关事项说明如下：";
}

function toneEnding(tone: Tone) {
  if (tone === "simple") {
    return "请相关人员知悉并按要求执行。";
  }

  if (tone === "friendly") {
    return "如有疑问，可进一步沟通确认。感谢理解与配合。";
  }

  return "请相关单位或人员认真落实。如有未尽事宜，请及时沟通确认。";
}

function buildTemplate(input: {
  docType: DocType;
  tone: Tone;
  title: string;
  target: string;
  matter: string;
  details: string;
}) {
  const title = normalize(input.title, "文书标题");
  const target = normalize(input.target, "相关单位/人员");
  const matter = normalize(input.matter, "相关事项");
  const details = normalize(
    input.details,
    "请在这里补充事项背景、关键内容、时间安排、责任人、要求或其他需要说明的信息。"
  );

  const opening = toneOpening(input.tone);
  const ending = toneEnding(input.tone);
  const date = todayText();

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

九域
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

申请人/单位：__________
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

九域
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

记录人：__________`;
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
  const [docType, setDocType] = useState<DocType>("notice");
  const [tone, setTone] = useState<Tone>("formal");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [matter, setMatter] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedDocType = docTypes.find((item) => item.value === docType);

  const result = useMemo(() => {
    return buildTemplate({
      docType,
      tone,
      title,
      target,
      matter,
      details,
    });
  }, [docType, tone, title, target, matter, details]);

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
          <h1>文书模板生成器</h1>
          <p>
            选择文书类型，填写基本信息，快速生成一份可复制的起草模板。
            适合通知、申请、说明、会议纪要和工作计划等常见场景。
          </p>
        </div>

        <section className="subpage-section">
          <h2>填写信息</h2>
          <p>
            先生成基础稿，再结合实际情况修改。不要把模板直接当成最终正式文件。
          </p>

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
                文书类型
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 10,
                }}
              >
                {docTypes.map((item) => (
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
                语气
              </label>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {tones.map((item) => (
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
                  label="标题"
                  placeholder="例如：关于项目进度安排的通知"
                  value={title}
                  onChange={setTitle}
                />

                <Field
                  label="对象 / 单位"
                  placeholder="例如：全体成员、某某部门、合作单位"
                  value={target}
                  onChange={setTarget}
                />

                <Field
                  label="事项"
                  placeholder="例如：项目推进、费用申请、情况说明"
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
                关键内容
              </label>

              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="写清楚背景、时间、地点、原因、要求、责任人、下一步安排等。"
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
                生成模板
              </button>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>生成结果</h2>
          <p>
            生成后可以复制到 Word、飞书、邮件或其他文档工具中继续修改。
          </p>

          <div className="card" style={{ marginTop: 16 }}>
            {!hasGenerated ? (
              <p style={{ color: "#666", margin: 0 }}>
                填写上方信息后，点击「生成模板」查看结果。
              </p>
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
                  {copied ? "已复制" : "复制结果"}
                </button>
              </>
            )}
          </div>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>免责声明：</strong>
            模板内容仅供起草和参考，不构成法律、财务或专业意见。
            正式使用前请结合实际情况核验，必要时咨询专业人士。
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
        style={{
          width: "100%",
          border: "1px solid #e5e5e5",
          borderRadius: 14,
          padding: "12px 14px",
          fontSize: 15,
          outline: "none",
          color: "#111",
          background: "#fff",
        }}
      />
    </label>
  );
}
