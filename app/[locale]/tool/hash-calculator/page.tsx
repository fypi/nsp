"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";
type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

type HashText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  input: string;
  output: string;
  placeholder: string;
  algorithm: string;
  calculate: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  bytes: string;
  characters: string;
  empty: string;
  unsupported: string;
  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, HashText> = {
  zh: {
    title: "Hash 计算器",
    desc: "计算文本的 SHA 哈希值，适合校验、学习和开发调试。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "Hash 计算器属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    input: "文本输入",
    output: "Hash 结果",
    placeholder: "把需要计算 Hash 的文本粘贴到这里...",
    algorithm: "算法",
    calculate: "计算 Hash",
    sample: "加载示例",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    bytes: "字节数",
    characters: "字符数",
    empty: "请输入需要计算的文本。",
    unsupported: "当前浏览器不支持 Web Crypto API。",
    tip: "提示：本工具只在浏览器本地计算，不会上传内容。Web Crypto API 支持 SHA 系列算法，不支持 MD5。",
  },
  "zh-TW": {
    title: "Hash 計算器",
    desc: "計算文字的 SHA 雜湊值，適合校驗、學習和開發除錯。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "Hash 計算器屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    input: "文字輸入",
    output: "Hash 結果",
    placeholder: "把需要計算 Hash 的文字貼到這裡...",
    algorithm: "演算法",
    calculate: "計算 Hash",
    sample: "載入示例",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    bytes: "位元組數",
    characters: "字元數",
    empty: "請輸入需要計算的文字。",
    unsupported: "目前瀏覽器不支援 Web Crypto API。",
    tip: "提示：本工具只在瀏覽器本地計算，不會上傳內容。Web Crypto API 支援 SHA 系列演算法，不支援 MD5。",
  },
  en: {
    title: "Hash Calculator",
    desc: "Calculate SHA hash values for text. Useful for verification, learning, and development debugging.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "Hash Calculator is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    input: "Text input",
    output: "Hash result",
    placeholder: "Paste the text you want to hash here...",
    algorithm: "Algorithm",
    calculate: "Calculate Hash",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy result",
    copied: "Copied",
    bytes: "Bytes",
    characters: "Characters",
    empty: "Please enter text to calculate.",
    unsupported: "This browser does not support Web Crypto API.",
    tip: "Note: this tool calculates locally in your browser and does not upload content. Web Crypto API supports SHA algorithms, but not MD5.",
  },
};

const algorithms: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

const sampleText = `NinesPro Hash Calculator
https://www.ninespro.com`;

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function calculateHash(value: string, algorithm: HashAlgorithm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const digest = await crypto.subtle.digest(algorithm, data);

  return toHex(digest);
}

function getByteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

export default function HashCalculatorPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [input, setInput] = useState(sampleText);
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;

      setLoggedIn(!!data.user);
      setUserReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!mounted) return;

      setLoggedIn(!!session?.user);
      setUserReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const stats = useMemo(() => {
    return {
      characters: input.length,
      bytes: getByteLength(input),
    };
  }, [input]);

  const handleCalculate = async () => {
    setMessage("");
    setCopied(false);

    if (!input) {
      setOutput("");
      setMessage(t.empty);
      return;
    }

    if (!crypto?.subtle) {
      setOutput("");
      setMessage(t.unsupported);
      return;
    }

    try {
      const result = await calculateHash(input, algorithm);
      setOutput(result);
    } catch {
      setOutput("");
      setMessage(t.unsupported);
    }
  };

  const handleLoadSample = () => {
    setInput(sampleText);
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

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  useEffect(() => {
    if (!loggedIn) return;

    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (!userReady) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <section className="subpage-hero">
            <h1>{t.title}</h1>
            <p>{t.checking}</p>
          </section>
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <section className="subpage-hero">
            <h1>{t.loginRequiredTitle}</h1>
            <p>{t.loginRequiredDesc}</p>
          </section>

          <section className="subpage-section">
            <div className="card liquidGlassCard" style={{ textAlign: "center" }}>
              <Link
                href={`/${locale}/login?next=${encodeURIComponent(
                  `/${locale}/tool/hash-calculator`
                )}`}
                className="liquidGlassPill"
                style={{ textDecoration: "none" }}
              >
                {t.loginBtn}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </section>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card liquidGlassCard">
              <h3>{t.input}</h3>

              <textarea
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setCopied(false);
                }}
                placeholder={t.placeholder}
                className="contact-textarea"
                style={{
                  minHeight: 260,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 14,
                  marginTop: 16,
                }}
              >
                <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  {t.algorithm}
                  <select
                    value={algorithm}
                    onChange={(event) =>
                      setAlgorithm(event.target.value as HashAlgorithm)
                    }
                    className="contact-input"
                  >
                    {algorithms.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    fontSize: 13,
                    alignContent: "end",
                    color: "#4b5563",
                  }}
                >
                  <span>
                    {t.characters}: {stats.characters}
                  </span>
                  <span>
                    {t.bytes}: {stats.bytes}
                  </span>
                </div>
              </div>

              {message && (
                <p
                  style={{
                    color: "#b42318",
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginTop: 14,
                  }}
                >
                  {message}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 18,
                }}
              >
                <button
                  type="button"
                  className="liquidGlassPill"
                  onClick={handleCalculate}
                >
                  {t.calculate}
                </button>

                <button
                  type="button"
                  className="liquidGlassPillMuted"
                  onClick={handleLoadSample}
                >
                  {t.sample}
                </button>

                <button
                  type="button"
                  className="liquidGlassPillMuted"
                  onClick={handleClear}
                >
                  {t.clear}
                </button>
              </div>
            </div>

            <div className="card liquidGlassCard">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ margin: 0 }}>{t.output}</h3>

                <button
                  type="button"
                  className="liquidGlassPillMuted"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  {copied ? t.copied : t.copy}
                </button>
              </div>

              <pre
                style={{
                  minHeight: 260,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(248,250,252,0.64))",
                  border: "1px solid rgba(255,255,255,0.86)",
                  borderRadius: 16,
                  padding: 14,
                  margin: 0,
                  color: "#111827",
                  lineHeight: 1.65,
                  fontSize: 13,
                  overflow: "auto",
                }}
              >
                {output || "-"}
              </pre>
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