"use client";

import { useEffect, useMemo, useState } from "react";

type Locale = "zh" | "zh-TW" | "en";
type ToolKey = "json" | "text" | "base64" | "url" | "timestamp" | "percent" | "loan" | "color";

const ui = {
  zh: {
    title: "工具中心",
    desc: "常用在线工具集合，覆盖开发、文本、编码、时间、金融和设计场景。",
    loading: "工具加载中…",
    input: "输入",
    output: "输出",
    run: "处理",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    error: "处理失败，请检查输入。",
    tools: {
      json: "JSON 工具",
      text: "文本统计",
      base64: "Base64 编码",
      url: "URL 编码",
      timestamp: "时间戳转换",
      percent: "百分比计算",
      loan: "贷款计算",
      color: "颜色转换",
    },
  },
  "zh-TW": {
    title: "工具中心",
    desc: "常用線上工具集合，覆蓋開發、文字、編碼、時間、金融和設計場景。",
    loading: "工具載入中…",
    input: "輸入",
    output: "輸出",
    run: "處理",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    error: "處理失敗，請檢查輸入。",
    tools: {
      json: "JSON 工具",
      text: "文字統計",
      base64: "Base64 編碼",
      url: "URL 編碼",
      timestamp: "時間戳轉換",
      percent: "百分比計算",
      loan: "貸款計算",
      color: "顏色轉換",
    },
  },
  en: {
    title: "Tools",
    desc: "Practical online tools for development, text, encoding, time, finance, and design workflows.",
    loading: "Loading tools…",
    input: "Input",
    output: "Output",
    run: "Run",
    clear: "Clear",
    copy: "Copy result",
    copied: "Copied",
    error: "Failed. Check the input.",
    tools: {
      json: "JSON Tools",
      text: "Text Stats",
      base64: "Base64",
      url: "URL Encode",
      timestamp: "Timestamp",
      percent: "Percentage",
      loan: "Loan Calculator",
      color: "Color Convert",
    },
  },
} satisfies Record<Locale, any>;

function safeJsonFormat(value: string) {
  const parsed = JSON.parse(value);
  return JSON.stringify(parsed, null, 2);
}

function textStats(value: string, locale: Locale) {
  const chars = value.length;
  const noSpaces = value.replace(/\s/g, "").length;
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const lines = value ? value.split(/\r\n|\r|\n/).length : 0;
  const bytes = new Blob([value]).size;
  if (locale === "en") return `Characters: ${chars}\nCharacters without spaces: ${noSpaces}\nWords: ${words}\nLines: ${lines}\nUTF-8 bytes: ${bytes}`;
  if (locale === "zh-TW") return `字元數：${chars}\n不含空白字元：${noSpaces}\n詞數：${words}\n行數：${lines}\nUTF-8 位元組：${bytes}`;
  return `字符数：${chars}\n不含空白字符：${noSpaces}\n词数：${words}\n行数：${lines}\nUTF-8 字节：${bytes}`;
}

function base64Encode(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function base64Decode(value: string) {
  return decodeURIComponent(escape(atob(value.trim())));
}

function timestampConvert(value: string, locale: Locale) {
  const raw = value.trim();
  const now = new Date();
  const n = raw ? Number(raw) : now.getTime();
  const ms = n < 10000000000 ? n * 1000 : n;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) throw new Error("invalid");
  const local = date.toLocaleString(locale === "en" ? "en-US" : locale === "zh-TW" ? "zh-TW" : "zh-CN");
  if (locale === "en") return `Milliseconds: ${date.getTime()}\nSeconds: ${Math.floor(date.getTime() / 1000)}\nISO: ${date.toISOString()}\nLocal: ${local}`;
  if (locale === "zh-TW") return `毫秒：${date.getTime()}\n秒：${Math.floor(date.getTime() / 1000)}\nISO：${date.toISOString()}\n本地時間：${local}`;
  return `毫秒：${date.getTime()}\n秒：${Math.floor(date.getTime() / 1000)}\nISO：${date.toISOString()}\n本地时间：${local}`;
}

function percentCalc(value: string, locale: Locale) {
  const nums = value.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
  if (nums.length < 2) throw new Error("need two numbers");
  const [a, b] = nums;
  const pct = b === 0 ? NaN : (a / b) * 100;
  const increase = a === 0 ? NaN : ((b - a) / a) * 100;
  if (locale === "en") return `${a} is ${pct.toFixed(4)}% of ${b}\nChange from ${a} to ${b}: ${increase.toFixed(4)}%`;
  if (locale === "zh-TW") return `${a} 是 ${b} 的 ${pct.toFixed(4)}%\n從 ${a} 變到 ${b}：${increase.toFixed(4)}%`;
  return `${a} 是 ${b} 的 ${pct.toFixed(4)}%\n从 ${a} 变到 ${b}：${increase.toFixed(4)}%`;
}

function loanCalc(value: string, locale: Locale) {
  const nums = value.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
  if (nums.length < 3) throw new Error("need principal rate years");
  const [principal, annualRate, years] = nums;
  const months = Math.round(years * 12);
  const r = annualRate / 100 / 12;
  const payment = r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const total = payment * months;
  const interest = total - principal;
  if (locale === "en") return `Monthly payment: ${payment.toFixed(2)}\nTotal payment: ${total.toFixed(2)}\nTotal interest: ${interest.toFixed(2)}\nMonths: ${months}`;
  if (locale === "zh-TW") return `每月還款：${payment.toFixed(2)}\n還款總額：${total.toFixed(2)}\n利息總額：${interest.toFixed(2)}\n期數（月）：${months}`;
  return `每月还款：${payment.toFixed(2)}\n还款总额：${total.toFixed(2)}\n利息总额：${interest.toFixed(2)}\n期数（月）：${months}`;
}

function colorConvert(value: string) {
  const v = value.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(v)) throw new Error("invalid color");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `HEX: #${v.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})\nRGBA: rgba(${r}, ${g}, ${b}, 1)`;
}

function placeholder(key: ToolKey, locale: Locale) {
  const map: Record<ToolKey, Record<Locale, string>> = {
    json: { zh: '{"name":"NINESPRO","type":"AI"}', "zh-TW": '{"name":"NINESPRO","type":"AI"}', en: '{"name":"NINESPRO","type":"AI"}' },
    text: { zh: "输入一段文本，统计字符、词数、行数和字节数。", "zh-TW": "輸入一段文字，統計字元、詞數、行數和位元組。", en: "Enter text to count characters, words, lines, and bytes." },
    base64: { zh: "输入文本，点击处理进行 Base64 编码；输入 Base64 可尝试自动解码。", "zh-TW": "輸入文字，點擊處理進行 Base64 編碼；輸入 Base64 可嘗試自動解碼。", en: "Enter text to encode as Base64, or enter Base64 to decode." },
    url: { zh: "输入 URL 或文本进行 encodeURIComponent 编码。", "zh-TW": "輸入 URL 或文字進行 encodeURIComponent 編碼。", en: "Enter URL or text for encodeURIComponent." },
    timestamp: { zh: "输入时间戳，留空则使用当前时间。支持秒或毫秒。", "zh-TW": "輸入時間戳，留空則使用當前時間。支援秒或毫秒。", en: "Enter a timestamp, or leave blank for now. Seconds or milliseconds supported." },
    percent: { zh: "输入两个数字，例如：25 200", "zh-TW": "輸入兩個數字，例如：25 200", en: "Enter two numbers, e.g. 25 200" },
    loan: { zh: "输入：本金 年利率 年数，例如：500000 6.5 30", "zh-TW": "輸入：本金 年利率 年數，例如：500000 6.5 30", en: "Enter: principal annualRate years, e.g. 500000 6.5 30" },
    color: { zh: "输入 6 位 HEX 颜色，例如：7EB1E7", "zh-TW": "輸入 6 位 HEX 顏色，例如：7EB1E7", en: "Enter 6-digit HEX color, e.g. 7EB1E7" },
  };
  return map[key][locale];
}

export default function ToolCenterClient({ locale }: { locale: Locale }) {
  const [mounted, setMounted] = useState(false);
  const t = ui[locale];
  const [active, setActive] = useState<ToolKey>("json");
  const [input, setInput] = useState("{\n  \"name\": \"NINESPRO\",\n  \"type\": \"AI\"\n}");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const toolKeys = useMemo<ToolKey[]>(() => ["json", "text", "base64", "url", "timestamp", "percent", "loan", "color"], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  function selectTool(key: ToolKey) {
    setActive(key);
    setOutput("");
    setCopied(false);
    setInput(placeholder(key, locale));
  }

  function runTool() {
    try {
      let result = "";
      if (active === "json") result = safeJsonFormat(input);
      if (active === "text") result = textStats(input, locale);
      if (active === "base64") {
        try { result = base64Decode(input); }
        catch { result = base64Encode(input); }
      }
      if (active === "url") result = encodeURIComponent(input);
      if (active === "timestamp") result = timestampConvert(input, locale);
      if (active === "percent") result = percentCalc(input, locale);
      if (active === "loan") result = loanCalc(input, locale);
      if (active === "color") result = colorConvert(input);
      setOutput(result);
    } catch {
      setOutput(t.error);
    }
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <main className="toolsRoot" suppressHydrationWarning>
      <style>{`
        .toolsRoot { min-height: 100vh; background: #e9ebef; color: #05070a; padding: 124px 24px 110px; overflow: hidden; }
        .toolsShell { width: min(1180px, calc(100vw - 48px)); margin: 0 auto; }
        .toolsHero { min-height: 360px; display: flex; flex-direction: column; justify-content: center; }
        .toolsHero h1 { margin: 0; font-size: clamp(42px, 5vw, 72px); line-height: .96; letter-spacing: -.065em; font-weight: 950; }
        .toolsHero p { margin: 18px 0 0; max-width: 900px; font-size: clamp(20px, 2.2vw, 30px); line-height: 1.36; letter-spacing: -.035em; color: #5b6678; font-weight: 720; text-wrap: balance; }
        .toolsDivider { width: 100vw; height: 30px; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #fff; }
        .toolsLoading { min-height: 300px; padding-top: 60px; color: #5b6678; font-size: 18px; font-weight: 800; }
        .toolsPanel { padding-top: 60px; display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; }
        .toolNav { display: grid; gap: 12px; align-self: start; }
        .toolNav button { min-height: 58px; border: 0; border-radius: 22px; padding: 0 18px; text-align: left; cursor: pointer; color: #111827; background: #d8dee8; font-size: 15px; font-weight: 900; }
        .toolNav button[aria-current="true"] { background: #05070a; color: #fff; }
        .toolWork { border-radius: 34px; padding: 28px; background: #d8dee8; }
        .toolWork h2 { margin: 0 0 18px; font-size: 30px; line-height: 1.08; letter-spacing: -.045em; font-weight: 950; }
        .toolLabel { display: block; margin: 20px 0 10px; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: #5b6678; font-weight: 950; }
        .toolTextarea { width: 100%; min-height: 190px; resize: vertical; border: 0; outline: none; border-radius: 24px; padding: 20px; background: rgba(255,255,255,.64); color: #111827; font-size: 15px; line-height: 1.6; font-weight: 650; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .toolActions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
        .toolButton { min-height: 44px; border: 0; border-radius: 999px; padding: 0 20px; cursor: pointer; background: rgba(255,255,255,.5); color: #111827; font-size: 14px; font-weight: 900; }
        .toolButtonPrimary { background: #05070a; color: #fff; }
        .toolOutput { white-space: pre-wrap; min-height: 150px; border-radius: 24px; padding: 20px; background: rgba(255,255,255,.64); color: #111827; font-size: 15px; line-height: 1.65; font-weight: 650; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; overflow-wrap: anywhere; }
        @media (max-width: 860px) { .toolsRoot { padding: 92px 18px 90px; } .toolsShell { width: calc(100vw - 36px); } .toolsPanel { grid-template-columns: 1fr; padding-top: 46px; } .toolNav { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      `}</style>

      <div className="toolsShell">
        <section className="toolsHero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </section>
        <div className="toolsDivider" aria-hidden="true" />

        {!mounted ? (
          <div className="toolsLoading">{t.loading}</div>
        ) : (
          <section className="toolsPanel">
            <nav className="toolNav" aria-label="Tools">
              {toolKeys.map((key) => (
                <button key={key} type="button" aria-current={active === key ? "true" : undefined} onClick={() => selectTool(key)}>
                  {t.tools[key]}
                </button>
              ))}
            </nav>

            <section className="toolWork">
              <h2>{t.tools[active]}</h2>
              <label className="toolLabel">{t.input}</label>
              <textarea className="toolTextarea" value={input} onChange={(event) => setInput(event.target.value)} />
              <div className="toolActions">
                <button className="toolButton toolButtonPrimary" type="button" onClick={runTool}>{t.run}</button>
                <button className="toolButton" type="button" onClick={() => { setInput(""); setOutput(""); }}>{t.clear}</button>
                <button className="toolButton" type="button" onClick={copyOutput} disabled={!output}>{copied ? t.copied : t.copy}</button>
              </div>
              <label className="toolLabel">{t.output}</label>
              <div className="toolOutput">{output}</div>
            </section>
          </section>
        )}
      </div>
    </main>
  );
}
