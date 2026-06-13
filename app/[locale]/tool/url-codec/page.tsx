"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type Mode =
  | "encode"
  | "decode"
  | "queryToJson"
  | "jsonToQuery"
  | "clear"
  | "copy";

type UrlCodecText = {
  title: string;
  desc: string;

  inputTitle: string;
  outputTitle: string;

  placeholder: string;
  outputPlaceholder: string;

  encode: string;
  decode: string;
  queryToJson: string;
  jsonToQuery: string;
  sendBack: string;
  clear: string;
  copy: string;
  copied: string;

  empty: string;
  encodeOk: string;
  decodeOk: string;
  queryOk: string;
  jsonOk: string;
  invalidUrlDecode: string;
  invalidQuery: string;
  invalidJson: string;
  copyEmpty: string;

  examplesTitle: string;
  examplesDesc: string;

  exampleUrlTitle: string;
  exampleUrlDesc: string;

  exampleQueryTitle: string;
  exampleQueryDesc: string;

  exampleJsonTitle: string;
  exampleJsonDesc: string;

  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const texts: Record<Locale, UrlCodecText> = {
  zh: {
    title: "URL 编码 / 解码",
    desc:
      "处理 URL 参数、查询字符串和特殊字符编码，适合接口调试、链接整理和网页参数排查。",

    inputTitle: "输入内容",
    outputTitle: "输出结果",

    placeholder:
      "可以输入普通文本、URL 编码内容、完整 URL、Query String，或 JSON 对象...",
    outputPlaceholder: "处理结果会显示在这里。",

    encode: "URL 编码",
    decode: "URL 解码",
    queryToJson: "Query 转 JSON",
    jsonToQuery: "JSON 转 Query",
    sendBack: "结果放回输入框",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",

    empty: "请先输入内容",
    encodeOk: "编码完成",
    decodeOk: "解码完成",
    queryOk: "Query String 已转换为 JSON",
    jsonOk: "JSON 已转换为 Query String",
    invalidUrlDecode: "解码失败：输入内容不是有效的 URL 编码文本",
    invalidQuery: "转换失败：请输入有效的 URL 或 Query String",
    invalidJson: "转换失败：请输入有效的 JSON 对象",
    copyEmpty: "没有可复制的结果",

    examplesTitle: "使用示例",
    examplesDesc: "常见使用场景包括链接参数整理、接口调试和数据格式互转。",

    exampleUrlTitle: "URL 编码",
    exampleUrlDesc: "将中文、空格和特殊符号转换成可安全放入 URL 的格式。",

    exampleQueryTitle: "Query 转 JSON",
    exampleQueryDesc:
      "把 ?name=nine&lang=zh 这样的查询参数转换成结构化 JSON。",

    exampleJsonTitle: "JSON 转 Query",
    exampleJsonDesc:
      "把简单 JSON 对象转换成 name=nine&lang=zh 这样的查询字符串。",

    tip:
      "提示：本工具仅在浏览器本地处理内容，不会上传你的数据。涉及敏感链接、Token 或内部参数时，请自行确认使用环境。",
  },

  "zh-TW": {
    title: "URL 編碼 / 解碼",
    desc:
      "處理 URL 參數、查詢字串和特殊字元編碼，適合接口調試、連結整理和網頁參數排查。",

    inputTitle: "輸入內容",
    outputTitle: "輸出結果",

    placeholder:
      "可以輸入普通文字、URL 編碼內容、完整 URL、Query String，或 JSON 物件...",
    outputPlaceholder: "處理結果會顯示在這裡。",

    encode: "URL 編碼",
    decode: "URL 解碼",
    queryToJson: "Query 轉 JSON",
    jsonToQuery: "JSON 轉 Query",
    sendBack: "結果放回輸入框",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",

    empty: "請先輸入內容",
    encodeOk: "編碼完成",
    decodeOk: "解碼完成",
    queryOk: "Query String 已轉換為 JSON",
    jsonOk: "JSON 已轉換為 Query String",
    invalidUrlDecode: "解碼失敗：輸入內容不是有效的 URL 編碼文字",
    invalidQuery: "轉換失敗：請輸入有效的 URL 或 Query String",
    invalidJson: "轉換失敗：請輸入有效的 JSON 物件",
    copyEmpty: "沒有可複製的結果",

    examplesTitle: "使用示例",
    examplesDesc: "常見使用場景包括連結參數整理、接口調試和資料格式互轉。",

    exampleUrlTitle: "URL 編碼",
    exampleUrlDesc: "將中文、空格和特殊符號轉換成可安全放入 URL 的格式。",

    exampleQueryTitle: "Query 轉 JSON",
    exampleQueryDesc:
      "把 ?name=nine&lang=zh 這樣的查詢參數轉換成結構化 JSON。",

    exampleJsonTitle: "JSON 轉 Query",
    exampleJsonDesc:
      "把簡單 JSON 物件轉換成 name=nine&lang=zh 這樣的查詢字串。",

    tip:
      "提示：本工具只在瀏覽器本地處理內容，不會上傳你的資料。涉及敏感連結、Token 或內部參數時，請自行確認使用環境。",
  },

  en: {
    title: "URL Encode / Decode",
    desc:
      "Encode, decode, and transform URL parameters and query strings for API debugging, link cleanup, and web parameter inspection.",

    inputTitle: "Input",
    outputTitle: "Output",

    placeholder:
      "Enter plain text, encoded URL text, a full URL, a query string, or a JSON object...",
    outputPlaceholder: "The processed result will appear here.",

    encode: "URL Encode",
    decode: "URL Decode",
    queryToJson: "Query to JSON",
    jsonToQuery: "JSON to Query",
    sendBack: "Send result back to input",
    clear: "Clear",
    copy: "Copy Result",
    copied: "Copied",

    empty: "Please enter some content first",
    encodeOk: "Encoded successfully",
    decodeOk: "Decoded successfully",
    queryOk: "Query string converted to JSON",
    jsonOk: "JSON converted to query string",
    invalidUrlDecode: "Decode failed: the input is not valid URL-encoded text",
    invalidQuery: "Conversion failed: please enter a valid URL or query string",
    invalidJson: "Conversion failed: please enter a valid JSON object",
    copyEmpty: "There is no result to copy",

    examplesTitle: "Examples",
    examplesDesc:
      "Common use cases include link parameter cleanup, API debugging, and data format conversion.",

    exampleUrlTitle: "URL Encoding",
    exampleUrlDesc:
      "Convert non-ASCII text, spaces, and special characters into URL-safe text.",

    exampleQueryTitle: "Query to JSON",
    exampleQueryDesc:
      "Convert query parameters like ?name=nine&lang=zh into structured JSON.",

    exampleJsonTitle: "JSON to Query",
    exampleJsonDesc:
      "Convert a simple JSON object into a query string like name=nine&lang=zh.",

    tip:
      "Note: everything runs locally in your browser. No data is uploaded. For sensitive links, tokens, or internal parameters, please verify your usage environment.",
  },
};

function extractQueryString(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    return url.search.startsWith("?") ? url.search.slice(1) : url.search;
  } catch {
    return trimmed.startsWith("?") ? trimmed.slice(1) : trimmed;
  }
}

function queryToObject(query: string) {
  const search = extractQueryString(query);
  const params = new URLSearchParams(search);
  const result: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    const existing = result[key];

    if (Array.isArray(existing)) {
      existing.push(value);
      return;
    }

    if (typeof existing === "string") {
      result[key] = [existing, value];
      return;
    }

    result[key] = value;
  });

  return result;
}

function objectToQuery(value: unknown) {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new Error("Expected JSON object");
  }

  const params = new URLSearchParams();
  const objectValue = value as Record<string, unknown>;

  Object.entries(objectValue).forEach(([key, rawValue]) => {
    if (rawValue === undefined || rawValue === null) {
      return;
    }

    if (Array.isArray(rawValue)) {
      rawValue.forEach((item) => {
        params.append(key, stringifyQueryValue(item));
      });
      return;
    }

    params.append(key, stringifyQueryValue(rawValue));
  });

  return params.toString();
}

function stringifyQueryValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);

  return JSON.stringify(value);
}

export default function UrlCodecPage() {
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

  const setSuccess = (nextOutput: string, nextMessage: string) => {
    setOutput(nextOutput);
    setMessage(nextMessage);
    setIsError(false);
    setCopied(false);
  };

  const setFailure = (nextMessage: string) => {
    setMessage(nextMessage);
    setIsError(true);
    setCopied(false);
  };

  const handleEncode = () => {
    if (!input.trim()) {
      setFailure(t.empty);
      return;
    }

    try {
      setSuccess(encodeURIComponent(input), t.encodeOk);
    } catch {
      setFailure(t.empty);
    }
  };

  const handleDecode = () => {
    if (!input.trim()) {
      setFailure(t.empty);
      return;
    }

    try {
      setSuccess(decodeURIComponent(input), t.decodeOk);
    } catch {
      setFailure(t.invalidUrlDecode);
    }
  };

  const handleQueryToJson = () => {
    if (!input.trim()) {
      setFailure(t.empty);
      return;
    }

    try {
      const result = queryToObject(input);

      if (Object.keys(result).length === 0) {
        setFailure(t.invalidQuery);
        return;
      }

      setSuccess(JSON.stringify(result, null, 2), t.queryOk);
    } catch {
      setFailure(t.invalidQuery);
    }
  };

  const handleJsonToQuery = () => {
    if (!input.trim()) {
      setFailure(t.empty);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const result = objectToQuery(parsed);

      if (!result) {
        setFailure(t.invalidJson);
        return;
      }

      setSuccess(result, t.jsonOk);
    } catch {
      setFailure(t.invalidJson);
    }
  };

  const handleSendBack = () => {
    if (!output) return;

    setInput(output);
    setOutput("");
    setMessage("");
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
      setFailure(t.copyEmpty);
      return;
    }

    await navigator.clipboard.writeText(output);

    setCopied(true);
    setMessage(t.copied);
    setIsError(false);

    window.setTimeout(() => {
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
              gap: 20,
            }}
          >
            <div className="card">
              <h3 style={{ marginBottom: 12 }}>{t.inputTitle}</h3>

              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.placeholder}
                style={textareaStyle}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <button type="button" onClick={handleEncode} style={toolBtnPrimary}>
                {t.encode}
              </button>

              <button type="button" onClick={handleDecode} style={toolBtnSecondary}>
                {t.decode}
              </button>

              <button
                type="button"
                onClick={handleQueryToJson}
                style={toolBtnSecondary}
              >
                {t.queryToJson}
              </button>

              <button
                type="button"
                onClick={handleJsonToQuery}
                style={toolBtnSecondary}
              >
                {t.jsonToQuery}
              </button>

              <button type="button" onClick={handleSendBack} style={toolBtnSecondary}>
                {t.sendBack}
              </button>

              <button type="button" onClick={handleClear} style={toolBtnSecondary}>
                {t.clear}
              </button>

              <button type="button" onClick={handleCopy} style={toolBtnSecondary}>
                {copied ? t.copied : t.copy}
              </button>
            </div>

            {message && (
              <div
                style={{
                  fontSize: 14,
                  color: isError ? "#c00" : "#0a7a2f",
                }}
              >
                {message}
              </div>
            )}

            <div className="card">
              <h3 style={{ marginBottom: 12 }}>{t.outputTitle}</h3>

              <textarea
                value={output}
                readOnly
                placeholder={t.outputPlaceholder}
                style={{
                  ...textareaStyle,
                  background: "#fafafa",
                }}
              />
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.examplesTitle}</h2>
          <p>{t.examplesDesc}</p>

          <div className="card-grid">
            <div className="card">
              <h3>{t.exampleUrlTitle}</h3>
              <p>{t.exampleUrlDesc}</p>
            </div>

            <div className="card">
              <h3>{t.exampleQueryTitle}</h3>
              <p>{t.exampleQueryDesc}</p>
            </div>

            <div className="card">
              <h3>{t.exampleJsonTitle}</h3>
              <p>{t.exampleJsonDesc}</p>
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
  minHeight: 240,
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 14,
  fontSize: 14,
  lineHeight: 1.6,
  resize: "vertical",
  boxSizing: "border-box",
  outline: "none",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const toolBtnPrimary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: 14,
  cursor: "pointer",
};

const toolBtnSecondary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: 14,
  cursor: "pointer",
};