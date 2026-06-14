"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type SqlText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  input: string;
  output: string;
  placeholder: string;
  format: string;
  minify: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, SqlText> = {
  zh: {
    title: "SQL 格式化",
    desc: "整理 SQL 缩进、换行和可读性，适合查看、学习和调试 SQL。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "SQL 格式化属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    input: "SQL 输入",
    output: "格式化结果",
    placeholder: "把 SQL 粘贴到这里...",
    format: "格式化",
    minify: "压缩",
    sample: "加载示例",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    tip: "提示：SQL 只在浏览器本地处理，不会上传。格式化结果仅用于阅读和辅助调试。",
  },
  "zh-TW": {
    title: "SQL 格式化",
    desc: "整理 SQL 縮排、換行和可讀性，適合查看、學習和除錯 SQL。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "SQL 格式化屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    input: "SQL 輸入",
    output: "格式化結果",
    placeholder: "把 SQL 貼到這裡...",
    format: "格式化",
    minify: "壓縮",
    sample: "載入示例",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    tip: "提示：SQL 只在瀏覽器本地處理，不會上傳。格式化結果僅用於閱讀和輔助除錯。",
  },
  en: {
    title: "SQL Formatter",
    desc: "Format SQL indentation, line breaks, and readability for review, learning, and debugging.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "SQL Formatter is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    input: "SQL input",
    output: "Formatted result",
    placeholder: "Paste SQL here...",
    format: "Format",
    minify: "Minify",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy result",
    copied: "Copied",
    tip: "Note: SQL is processed locally in your browser and is not uploaded. Formatting is for readability and debugging assistance only.",
  },
};

const sampleSql = `select u.id,u.email,u.created_at,count(o.id) as order_count,sum(o.total) as total_amount from users u left join orders o on o.user_id=u.id where u.status='active' and o.created_at >= '2026-01-01' group by u.id,u.email,u.created_at having sum(o.total)>100 order by total_amount desc limit 20;`;

const breakBeforeKeywords = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "CROSS JOIN",
  "JOIN",
  "ON",
  "UNION",
  "UNION ALL",
  "VALUES",
  "RETURNING",
];

const inlineKeywords = [
  "AND",
  "OR",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "AS",
  "IN",
  "IS",
  "NOT",
  "NULL",
  "LIKE",
  "BETWEEN",
  "EXISTS",
  "CASE",
];

function normalizeSpaces(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*\(\s*/g, "(")
    .replace(/\s*\)\s*/g, ")")
    .trim();
}

function uppercaseSqlKeywords(value: string) {
  const allKeywords = [...breakBeforeKeywords, ...inlineKeywords]
    .sort((a, b) => b.length - a.length)
    .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const regex = new RegExp(`\\b(${allKeywords.join("|")})\\b`, "gi");

  return value.replace(regex, (match) => match.toUpperCase());
}

function splitCommaOutsideParentheses(line: string) {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (const char of line) {
    if (char === "(") depth += 1;
    if (char === ")") depth = Math.max(0, depth - 1);

    if (char === "," && depth === 0) {
      parts.push(current.trim() + ",");
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) parts.push(current.trim());

  return parts;
}

function indentLine(line: string) {
  if (/^(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|RETURNING|VALUES)\b/.test(line)) {
    return line;
  }

  if (/^(INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|CROSS JOIN|JOIN|ON|UNION|UNION ALL)\b/.test(line)) {
    return line;
  }

  if (/^(AND|OR)\b/.test(line)) {
    return "  " + line;
  }

  return "  " + line;
}

function formatSql(input: string) {
  if (!input.trim()) return "";

  let sql = normalizeSpaces(input);
  sql = uppercaseSqlKeywords(sql);

  for (const keyword of breakBeforeKeywords.sort((a, b) => b.length - a.length)) {
    const pattern = new RegExp(`\\s+${keyword.replace(/\s+/g, "\\s+")}\\b`, "g");
    sql = sql.replace(pattern, `\n${keyword}`);
  }

  sql = sql.replace(/\s+AND\s+/g, "\n  AND ");
  sql = sql.replace(/\s+OR\s+/g, "\n  OR ");
  sql = sql.replace(/;/g, ";\n");

  const rawLines = sql
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const expandedLines: string[] = [];

  for (const line of rawLines) {
    if (/^SELECT\b/.test(line) || /^GROUP BY\b/.test(line) || /^ORDER BY\b/.test(line)) {
      const firstWord = line.match(/^(SELECT|GROUP BY|ORDER BY)\b/)?.[0] ?? "";
      const rest = line.slice(firstWord.length).trim();
      const commaParts = splitCommaOutsideParentheses(rest);

      if (commaParts.length > 1) {
        expandedLines.push(firstWord);
        commaParts.forEach((part) => expandedLines.push("  " + part));
      } else {
        expandedLines.push(line);
      }
    } else {
      expandedLines.push(indentLine(line));
    }
  }

  return expandedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function minifySql(input: string) {
  return normalizeSpaces(input).replace(/\s*;\s*/g, ";").trim();
}

export default function SqlFormatterPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [input, setInput] = useState(sampleSql);
  const [output, setOutput] = useState(() => formatSql(sampleSql));
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

  const handleFormat = () => {
    setOutput(formatSql(input));
    setCopied(false);
  };

  const handleMinify = () => {
    setOutput(minifySql(input));
    setCopied(false);
  };

  const handleLoadSample = () => {
    setInput(sampleSql);
    setOutput(formatSql(sampleSql));
    setCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setCopied(false);
  };

  const handleCopy = async () => {
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
                  `/${locale}/tool/sql-formatter`
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
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
                  minHeight: 430,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  lineHeight: 1.65,
                }}
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
                  onClick={handleFormat}
                >
                  {t.format}
                </button>

                <button
                  type="button"
                  className="liquidGlassPillMuted"
                  onClick={handleMinify}
                >
                  {t.minify}
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
                  minHeight: 430,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
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