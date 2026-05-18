"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

const texts = {
  zh: {
    title: "文本对比",
    desc: "左右两段文字逐行对比，快速找出不同。",
    left: "左侧文本",
    right: "右侧文本",
    leftPlaceholder: "把第一段文字粘贴到这里...",
    rightPlaceholder: "把第二段文字粘贴到这里...",
    compare: "开始对比",
    clear: "清空",
    same: "两段文本完全一致",
    diff: "已标出不同的行",
    empty: "请先输入左右两段文字",
    result: "对比结果",
    tip: "提示：本工具仅在浏览器本地处理文本，不会上传你的内容。",
  },
  "zh-TW": {
    title: "文字對比",
    desc: "左右兩段文字逐行對比，快速找出不同。",
    left: "左側文字",
    right: "右側文字",
    leftPlaceholder: "把第一段文字貼到這裡...",
    rightPlaceholder: "把第二段文字貼到這裡...",
    compare: "開始對比",
    clear: "清空",
    same: "兩段文字完全一致",
    diff: "已標出不同的行",
    empty: "請先輸入左右兩段文字",
    result: "對比結果",
    tip: "提示：本工具只在瀏覽器本地處理文字，不會上傳你的內容。",
  },
  en: {
    title: "Text Diff",
    desc: "Compare two texts line by line and quickly spot differences.",
    left: "Left Text",
    right: "Right Text",
    leftPlaceholder: "Paste the first text here...",
    rightPlaceholder: "Paste the second text here...",
    compare: "Compare",
    clear: "Clear",
    same: "The two texts are identical",
    diff: "Differences are highlighted below",
    empty: "Please enter both texts first",
    result: "Comparison Result",
    tip: "Note: everything runs locally in your browser. No content is uploaded.",
  },
} as const;

type DiffRow = {
  left: string;
  right: string;
  status: "same" | "diff";
};

export default function TextDiffPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

  const t = texts[locale];

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [rows, setRows] = useState<DiffRow[]>([]);
  const [message, setMessage] = useState("");

  const handleCompare = () => {
    if (!leftText.trim() && !rightText.trim()) {
      setMessage(t.empty);
      setRows([]);
      return;
    }

    const leftLines = leftText.replace(/\r\n/g, "\n").split("\n");
    const rightLines = rightText.replace(/\r\n/g, "\n").split("\n");
    const max = Math.max(leftLines.length, rightLines.length);

    const nextRows: DiffRow[] = [];

    for (let i = 0; i < max; i++) {
      const left = leftLines[i] ?? "";
      const right = rightLines[i] ?? "";
      nextRows.push({
        left,
        right,
        status: left === right ? "same" : "diff",
      });
    }

    setRows(nextRows);

    const hasDiff = nextRows.some((row) => row.status === "diff");
    setMessage(hasDiff ? t.diff : t.same);
  };

  const handleClear = () => {
    setLeftText("");
    setRightText("");
    setRows([]);
    setMessage("");
  };

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.left}</h3>
              <textarea
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                placeholder={t.leftPlaceholder}
                style={textareaStyle}
              />
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.right}</h3>
              <textarea
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                placeholder={t.rightPlaceholder}
                style={textareaStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button onClick={handleCompare} style={toolBtnPrimary}>
              {t.compare}
            </button>
            <button onClick={handleClear} style={toolBtnSecondary}>
              {t.clear}
            </button>
          </div>

          {message && (
            <div
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: message === t.same ? "#0a7a2f" : "#111",
              }}
            >
              {message}
            </div>
          )}
        </section>

        <section className="subpage-section">
          <h2>{t.result}</h2>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            {rows.length === 0 ? (
              <div style={{ padding: "18px 20px", color: "#666", fontSize: "14px" }}>
                —
              </div>
            ) : (
              rows.map((row, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    borderTop: index === 0 ? "none" : "1px solid #f0f0f0",
                    background:
                      row.status === "diff" ? "rgba(255, 243, 205, 0.65)" : "#fff",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRight: "1px solid #f0f0f0",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {row.left || " "}
                  </div>
                  <div
                    style={{
                      padding: "12px 14px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {row.right || " "}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="disclaimer-box">
          <p>{t.tip}</p>
        </div>
      </div>
    </main>
  );
}

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "260px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "14px",
  fontSize: "14px",
  lineHeight: 1.6,
  resize: "vertical",
  boxSizing: "border-box",
  outline: "none",
};

const toolBtnPrimary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const toolBtnSecondary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: "14px",
  cursor: "pointer",
};
