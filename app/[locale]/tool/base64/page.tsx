"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

const texts = {
  zh: {
    title: "Base64 转换",
    desc: "支持文本的 Base64 编码 / 解码，纯前端本地处理。",
    input: "输入内容",
    output: "输出结果",
    placeholder: "把要编码或解码的文本贴到这里...",
    encode: "编码",
    decode: "解码",
    swap: "结果放回输入框",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    empty: "请先输入内容",
    encodeOk: "编码完成",
    decodeOk: "解码完成",
    decodeErr: "解码失败：输入内容不是有效的 Base64 文本",
    tip: "提示：本工具仅在浏览器本地处理内容，不会上传你的数据。",
  },
  "zh-TW": {
    title: "Base64 轉換",
    desc: "支援文字的 Base64 編碼 / 解碼，純前端本地處理。",
    input: "輸入內容",
    output: "輸出結果",
    placeholder: "把要編碼或解碼的文字貼到這裡...",
    encode: "編碼",
    decode: "解碼",
    swap: "結果放回輸入框",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    empty: "請先輸入內容",
    encodeOk: "編碼完成",
    decodeOk: "解碼完成",
    decodeErr: "解碼失敗：輸入內容不是有效的 Base64 文字",
    tip: "提示：本工具只在瀏覽器本地處理內容，不會上傳你的資料。",
  },
  en: {
    title: "Base64 Converter",
    desc: "Encode / decode text in Base64. Everything runs locally in the browser.",
    input: "Input",
    output: "Output",
    placeholder: "Paste the text you want to encode or decode here...",
    encode: "Encode",
    decode: "Decode",
    swap: "Send result back to input",
    clear: "Clear",
    copy: "Copy Result",
    copied: "Copied",
    empty: "Please enter some text first",
    encodeOk: "Encoded successfully",
    decodeOk: "Decoded successfully",
    decodeErr: "Decode failed: the input is not valid Base64 text",
    tip: "Note: everything runs locally in your browser. No data is uploaded.",
  },
} as const;

function encodeBase64Unicode(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64Unicode(value: string) {
  return decodeURIComponent(escape(atob(value)));
}

export default function Base64Page() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

  const t = texts[locale];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    if (!input.trim()) {
      setMessage(t.empty);
      return;
    }

    try {
      const result = encodeBase64Unicode(input);
      setOutput(result);
      setMessage(t.encodeOk);
      setCopied(false);
    } catch {
      setMessage(t.empty);
    }
  };

  const handleDecode = () => {
    if (!input.trim()) {
      setMessage(t.empty);
      return;
    }

    try {
      const normalized = input.replace(/\s+/g, "");
      const result = decodeBase64Unicode(normalized);
      setOutput(result);
      setMessage(t.decodeOk);
      setCopied(false);
    } catch {
      setOutput("");
      setMessage(t.decodeErr);
      setCopied(false);
    }
  };

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setOutput("");
    setMessage("");
    setCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
              <button onClick={handleEncode} style={toolBtnPrimary}>
                {t.encode}
              </button>
              <button onClick={handleDecode} style={toolBtnSecondary}>
                {t.decode}
              </button>
              <button onClick={handleSwap} style={toolBtnSecondary}>
                {t.swap}
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
                  color: message === t.decodeErr ? "#c00" : "#0a7a2f",
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
  boxSizing: "border-box",
  outline: "none",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
