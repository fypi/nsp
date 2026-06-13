"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

function normalizeLocale(raw: unknown): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW") return "zh-TW";
  return "zh";
}

const copy = {
  zh: {
    title: "文本对比",
    desc: "粘贴两段文本，快速查看新增、删除和相同内容。",
    left: "原始文本",
    right: "对比文本",
    leftPlaceholder: "在这里粘贴原始文本...",
    rightPlaceholder: "在这里粘贴对比文本...",
    clear: "清空",
    same: "相同",
    added: "新增",
    removed: "删除",
    changed: "差异",
    result: "对比结果",
    empty: "输入两段文本后，这里会显示对比结果。",
    note: "提示：本工具只在浏览器本地处理文本，不会上传你的内容。",
  },
  en: {
    title: "Text Diff",
    desc: "Paste two pieces of text and quickly review added, removed, and unchanged lines.",
    left: "Original text",
    right: "Compared text",
    leftPlaceholder: "Paste original text here...",
    rightPlaceholder: "Paste compared text here...",
    clear: "Clear",
    same: "Same",
    added: "Added",
    removed: "Removed",
    changed: "Diff",
    result: "Diff result",
    empty: "Enter two pieces of text to see the comparison result here.",
    note: "Note: This tool processes text locally in your browser and does not upload your content.",
  },
  "zh-TW": {
    title: "文字對比",
    desc: "貼上兩段文字，快速查看新增、刪除和相同內容。",
    left: "原始文字",
    right: "對比文字",
    leftPlaceholder: "在這裡貼上原始文字...",
    rightPlaceholder: "在這裡貼上對比文字...",
    clear: "清空",
    same: "相同",
    added: "新增",
    removed: "刪除",
    changed: "差異",
    result: "對比結果",
    empty: "輸入兩段文字後，這裡會顯示對比結果。",
    note: "提示：本工具只在瀏覽器本地處理文字，不會上傳你的內容。",
  },
};

type DiffRow = {
  type: "same" | "removed" | "added";
  text: string;
};

function buildLineDiff(leftText: string, rightText: string): DiffRow[] {
  const leftLines = leftText.split(/\r?\n/);
  const rightLines = rightText.split(/\r?\n/);
  const m = leftLines.length;
  const n = rightLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      if (leftLines[i] === rightLines[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;

  while (i < m && j < n) {
    if (leftLines[i] === rightLines[j]) {
      rows.push({ type: "same", text: leftLines[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ type: "removed", text: leftLines[i] });
      i += 1;
    } else {
      rows.push({ type: "added", text: rightLines[j] });
      j += 1;
    }
  }

  while (i < m) {
    rows.push({ type: "removed", text: leftLines[i] });
    i += 1;
  }

  while (j < n) {
    rows.push({ type: "added", text: rightLines[j] });
    j += 1;
  }

  return rows;
}

const textareaStyle = {
  width: "100%",
  minHeight: "260px",
  border: "1px solid #ddd",
  borderRadius: "16px",
  padding: "14px 16px",
  fontSize: 14,
  lineHeight: 1.65,
  resize: "vertical" as const,
  outline: "none",
  background: "rgba(255,255,255,0.82)",
  color: "#111827",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

function rowStyle(type: DiffRow["type"]) {
  if (type === "added") {
    return {
      background: "rgba(34, 197, 94, 0.10)",
      borderLeft: "4px solid rgba(34, 197, 94, 0.72)",
      color: "#14532d",
    };
  }

  if (type === "removed") {
    return {
      background: "rgba(239, 68, 68, 0.09)",
      borderLeft: "4px solid rgba(239, 68, 68, 0.70)",
      color: "#7f1d1d",
    };
  }

  return {
    background: "rgba(255, 255, 255, 0.64)",
    borderLeft: "4px solid rgba(148, 163, 184, 0.42)",
    color: "#374151",
  };
}

export default function TextDiffPage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const c = copy[locale];

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const diffRows = useMemo(() => {
    if (!leftText && !rightText) return [];
    return buildLineDiff(leftText, rightText);
  }, [leftText, rightText]);

  const stats = useMemo(() => {
    return diffRows.reduce(
      (acc, row) => {
        acc[row.type] += 1;
        return acc;
      },
      { same: 0, added: 0, removed: 0 }
    );
  }, [diffRows]);

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{c.title}</h1>
          <p>{c.desc}</p>
        </section>

        <section className="subpage-section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            <div className="card liquidGlassCard">
              <h3>{c.left}</h3>
              <textarea
                value={leftText}
                onChange={(event) => setLeftText(event.target.value)}
                placeholder={c.leftPlaceholder}
                style={textareaStyle}
              />
            </div>

            <div className="card liquidGlassCard">
              <h3>{c.right}</h3>
              <textarea
                value={rightText}
                onChange={(event) => setRightText(event.target.value)}
                placeholder={c.rightPlaceholder}
                style={textareaStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => {
                setLeftText("");
                setRightText("");
              }}
              className="liquidGlassPill"
              style={{ border: "none", cursor: "pointer" }}
            >
              {c.clear}
            </button>

            <span className="liquidGlassPillMuted">{c.same}: {stats.same}</span>
            <span className="liquidGlassPillMuted">{c.added}: {stats.added}</span>
            <span className="liquidGlassPillMuted">{c.removed}: {stats.removed}</span>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{c.result}</h2>

          <div className="card liquidGlassCard" style={{ padding: 16 }}>
            {diffRows.length === 0 ? (
              <p style={{ margin: 0, color: "#6b7280" }}>{c.empty}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: 13,
                  lineHeight: 1.55,
                }}
              >
                {diffRows.map((row, index) => {
                  const prefix = row.type === "added" ? "+" : row.type === "removed" ? "-" : " ";

                  return (
                    <div
                      key={`${row.type}-${index}-${row.text}`}
                      style={{
                        ...rowStyle(row.type),
                        padding: "7px 10px",
                        borderRadius: 10,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      <span style={{ opacity: 0.78, marginRight: 8 }}>{prefix}</span>
                      {row.text || " "}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="disclaimer-box">
          <p>{c.note}</p>
        </div>
      </div>
    </main>
  );
}
