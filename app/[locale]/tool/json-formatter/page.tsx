"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Locale = "en" | "zh" | "zh-TW";

type JsonFormatterText = {
  title: string;
  desc: string;
  input: string;
  output: string;
  placeholder: string;
  format: string;
  minify: string;
  validate: string;
  clear: string;
  copy: string;
  copied: string;
  valid: string;
  invalid: string;
  empty: string;
  copyEmpty: string;
  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const texts: Record<Locale, JsonFormatterText> = {
  zh: {
    title: "JSON 格式化",
    desc: "粘贴 JSON，直接格式化、压缩、校验。",
    input: "输入 JSON",
    output: "输出结果",
    placeholder: "把 JSON 粘贴到这里...",
    format: "格式化",
    minify: "压缩",
    validate: "校验",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    valid: "JSON 有效",
    invalid: "JSON 无效：",
    empty: "请先输入 JSON 内容",
    copyEmpty: "没有可复制的结果",
    tip: "提示：本工具仅在浏览器本地处理内容，不会上传你的数据。",
  },

  "zh-TW": {
    title: "JSON 格式化",
    desc: "貼上 JSON，直接格式化、壓縮、校驗。",
    input: "輸入 JSON",
    output: "輸出結果",
    placeholder: "把 JSON 貼到這裡...",
    format: "格式化",
    minify: "壓縮",
    validate: "校驗",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    valid: "JSON 有效",
    invalid: "JSON 無效：",
    empty: "請先輸入 JSON 內容",
    copyEmpty: "沒有可複製的結果",
    tip: "提示：本工具只在瀏覽器本地處理內容，不會上傳你的資料。",
  },

  en: {
    title: "JSON Formatter",
    desc: "Paste JSON to format, minify, and validate instantly.",
    input: "Input JSON",
    output: "Output",
    placeholder: "Paste your JSON here...",
    format: "Format",
    minify: "Minify",
    validate: "Validate",
    clear: "Clear",
    copy: "Copy Result",
    copied: "Copied",
    valid: "Valid JSON",
    invalid: "Invalid JSON:",
    empty: "Please enter JSON first",
    copyEmpty: "There is no result to copy",
    tip: "Note: everything runs locally in your browser. No data is uploaded.",
  },
};

export default function JsonFormatterPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseJson = () => {
    if (!input.trim()) {
      setMessage(t.empty);
      setIsError(true);
      return null;
    }

    try {
      const parsed = JSON.parse(input);
      return parsed;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setMessage(`${t.invalid} ${msg}`);
      setIsError(true);
      return null;
    }
  };

  const handleFormat = () => {
    const parsed = parseJson();

    if (parsed === null) return;

    const result = JSON.stringify(parsed, null, 2);

    setOutput(result);
    setMessage(t.valid);
    setIsError(false);
    setCopied(false);
  };

  const handleMinify = () => {
    const parsed = parseJson();

    if (parsed === null) return;

    const result = JSON.stringify(parsed);

    setOutput(result);
    setMessage(t.valid);
    setIsError(false);
    setCopied(false);
  };

  const handleValidate = () => {
    const parsed = parseJson();

    if (parsed === null) return;

    setOutput(JSON.stringify(parsed, null, 2));
    setMessage(t.valid);
    setIsError(false);
    setCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setMessage("");
    setIsError(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) {
      setMessage(t.copyEmpty);
      setIsError(true);
      return;
    }

    await navigator.clipboard.writeText(output);

    setCopied(true);
    setMessage(t.copied);
    setIsError(false);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
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
              gridTemplateColumns: "1fr",
              gap: "20px",
            }}
          >
            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.input}</h3>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                style={textareaStyle}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button onClick={handleFormat} style={toolBtnPrimary}>
                {t.format}
              </button>

              <button onClick={handleMinify} style={toolBtnSecondary}>
                {t.minify}
              </button>

              <button onClick={handleValidate} style={toolBtnSecondary}>
                {t.validate}
              </button>

              <button onClick={handleClear} style={toolBtnSecondary}>
                {t.clear}
              </button>

              <button onClick={handleCopy} style={toolBtnSecondary}>
                {copied ? t.copied : t.copy}
              </button>
            </div>

            {message && (
              <div
                style={{
                  fontSize: "14px",
                  color: isError ? "#c00" : "#0a7a2f",
                }}
              >
                {message}
              </div>
            )}

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.output}</h3>

              <textarea
                value={output}
                readOnly
                style={{
                  ...textareaStyle,
                  background: "#fafafa",
                }}
              />
            </div>
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
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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