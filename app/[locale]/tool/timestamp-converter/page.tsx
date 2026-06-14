"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type TimestampText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  timestampInput: string;
  timestampPlaceholder: string;
  dateInput: string;
  useNow: string;
  convertDate: string;
  clear: string;
  copy: string;
  copied: string;
  result: string;
  seconds: string;
  milliseconds: string;
  localTime: string;
  utcTime: string;
  isoTime: string;
  invalidTimestamp: string;
  invalidDate: string;
  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, TimestampText> = {
  zh: {
    title: "时间戳转换",
    desc: "Unix 时间戳与日期时间互转，支持秒级、毫秒级、本地时间和 UTC 时间。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "时间戳转换属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    timestampInput: "时间戳输入",
    timestampPlaceholder: "例如：1718000000 或 1718000000000",
    dateInput: "日期时间输入",
    useNow: "使用当前时间",
    convertDate: "日期转时间戳",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    result: "转换结果",
    seconds: "秒级时间戳",
    milliseconds: "毫秒级时间戳",
    localTime: "本地时间",
    utcTime: "UTC 时间",
    isoTime: "ISO 时间",
    invalidTimestamp: "请输入有效的时间戳。",
    invalidDate: "请输入有效的日期时间。",
    tip: "提示：10 位通常是秒级时间戳，13 位通常是毫秒级时间戳。本工具只在浏览器本地计算，不会上传内容。",
  },
  "zh-TW": {
    title: "時間戳轉換",
    desc: "Unix 時間戳與日期時間互轉，支援秒級、毫秒級、本地時間和 UTC 時間。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "時間戳轉換屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    timestampInput: "時間戳輸入",
    timestampPlaceholder: "例如：1718000000 或 1718000000000",
    dateInput: "日期時間輸入",
    useNow: "使用目前時間",
    convertDate: "日期轉時間戳",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    result: "轉換結果",
    seconds: "秒級時間戳",
    milliseconds: "毫秒級時間戳",
    localTime: "本地時間",
    utcTime: "UTC 時間",
    isoTime: "ISO 時間",
    invalidTimestamp: "請輸入有效的時間戳。",
    invalidDate: "請輸入有效的日期時間。",
    tip: "提示：10 位通常是秒級時間戳，13 位通常是毫秒級時間戳。本工具只在瀏覽器本地計算，不會上傳內容。",
  },
  en: {
    title: "Timestamp Converter",
    desc: "Convert Unix timestamps and date-time values. Supports seconds, milliseconds, local time, and UTC time.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc:
      "Timestamp Converter is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    timestampInput: "Timestamp input",
    timestampPlaceholder: "Example: 1718000000 or 1718000000000",
    dateInput: "Date time input",
    useNow: "Use current time",
    convertDate: "Convert date",
    clear: "Clear",
    copy: "Copy result",
    copied: "Copied",
    result: "Result",
    seconds: "Seconds timestamp",
    milliseconds: "Milliseconds timestamp",
    localTime: "Local time",
    utcTime: "UTC time",
    isoTime: "ISO time",
    invalidTimestamp: "Please enter a valid timestamp.",
    invalidDate: "Please enter a valid date time.",
    tip: "Tip: 10 digits usually means seconds, and 13 digits usually means milliseconds. This tool runs locally in your browser and does not upload content.",
  },
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toDateTimeLocalValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseTimestamp(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return null;

  const numberValue = Number(trimmed);

  if (!Number.isFinite(numberValue)) return null;

  const pureLength = trimmed.replace(/^-/, "").replace(/\./g, "").length;

  const milliseconds =
    pureLength <= 10 ? numberValue * 1000 : numberValue;

  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) return null;

  return date;
}

function formatResult(date: Date) {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime(),
    local: date.toLocaleString(),
    utc: date.toUTCString(),
    iso: date.toISOString(),
  };
}

export default function TimestampConverterPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const initialDate = useMemo(() => new Date(), []);

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [timestamp, setTimestamp] = useState(
    String(Math.floor(initialDate.getTime() / 1000))
  );

  const [dateInput, setDateInput] = useState(
    toDateTimeLocalValue(initialDate)
  );

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

  const timestampDate = useMemo(() => {
    return parseTimestamp(timestamp);
  }, [timestamp]);

  const result = useMemo(() => {
    if (!timestampDate) return null;
    return formatResult(timestampDate);
  }, [timestampDate]);

  const handleUseNow = () => {
    const now = new Date();

    setTimestamp(String(Math.floor(now.getTime() / 1000)));
    setDateInput(toDateTimeLocalValue(now));
    setMessage("");
    setCopied(false);
  };

  const handleDateToTimestamp = () => {
    const date = new Date(dateInput);

    if (Number.isNaN(date.getTime())) {
      setMessage(t.invalidDate);
      return;
    }

    setTimestamp(String(Math.floor(date.getTime() / 1000)));
    setMessage("");
    setCopied(false);
  };

  const handleTimestampChange = (value: string) => {
    setTimestamp(value);
    setCopied(false);

    if (!value.trim()) {
      setMessage("");
      return;
    }

    const parsed = parseTimestamp(value);

    if (!parsed) {
      setMessage(t.invalidTimestamp);
      return;
    }

    setDateInput(toDateTimeLocalValue(parsed));
    setMessage("");
  };

  const handleClear = () => {
    setTimestamp("");
    setDateInput("");
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    const output = result
      ? `${t.seconds}: ${result.seconds}
${t.milliseconds}: ${result.milliseconds}
${t.localTime}: ${result.local}
${t.utcTime}: ${result.utc}
${t.isoTime}: ${result.iso}`
      : "-";

    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

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
                  `/${locale}/tool/timestamp-converter`
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
              <h3>{t.timestampInput}</h3>

              <input
                value={timestamp}
                onChange={(event) => handleTimestampChange(event.target.value)}
                placeholder={t.timestampPlaceholder}
                className="contact-input"
                inputMode="numeric"
              />

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 16,
                }}
              >
                <button
                  type="button"
                  className="liquidGlassPill"
                  onClick={handleUseNow}
                >
                  {t.useNow}
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
              <h3>{t.dateInput}</h3>

              <input
                type="datetime-local"
                value={dateInput}
                onChange={(event) => setDateInput(event.target.value)}
                className="contact-input"
              />

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 16,
                }}
              >
                <button
                  type="button"
                  className="liquidGlassPill"
                  onClick={handleDateToTimestamp}
                >
                  {t.convertDate}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <p
              style={{
                color: "#b42318",
                fontSize: 14,
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}
        </section>

        <section className="subpage-section">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            <h2 style={{ margin: 0 }}>{t.result}</h2>

            <button
              type="button"
              className="liquidGlassPillMuted"
              onClick={handleCopy}
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          <div className="card liquidGlassCard">
            <div
              style={{
                display: "grid",
                gap: 12,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              <div>
                <strong>{t.seconds}: </strong>
                <span>{result ? result.seconds : "-"}</span>
              </div>

              <div>
                <strong>{t.milliseconds}: </strong>
                <span>{result ? result.milliseconds : "-"}</span>
              </div>

              <div>
                <strong>{t.localTime}: </strong>
                <span>{result ? result.local : "-"}</span>
              </div>

              <div>
                <strong>{t.utcTime}: </strong>
                <span>{result ? result.utc : "-"}</span>
              </div>

              <div>
                <strong>{t.isoTime}: </strong>
                <span>{result ? result.iso : "-"}</span>
              </div>
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