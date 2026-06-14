"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type MarkdownText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  editor: string;
  preview: string;
  placeholder: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  tip: string;
  sampleText: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const texts: Record<Locale, MarkdownText> = {
  zh: {
    title: "Markdown 预览",
    desc: "实时预览 Markdown，适合写说明、笔记和文档片段。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "Markdown 预览属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    editor: "Markdown 输入区",
    preview: "预览效果",
    placeholder: "把 Markdown 粘贴到这里，右侧会实时预览...",
    sample: "加载示例",
    clear: "清空",
    copy: "复制 Markdown",
    copied: "已复制",
    tip: "提示：内容只在浏览器本地处理，不会自动上传。预览支持常用 Markdown 语法。",
    sampleText:
      "# 九域 Markdown 示例\n\n## 一段说明\n这是一个 **加粗**、*斜体*、`行内代码` 的示例。\n\n> 这是一段引用。\n\n### 列表示例\n- 公开工具\n- 注册后工具\n- 定制服务\n\n1. 第一步\n2. 第二步\n3. 第三步\n\n[访问九域](https://www.ninespro.com)\n\n```js\nconst hello = 'ninespro';\nconsole.log(hello);\n```",
  },

  "zh-TW": {
    title: "Markdown 預覽",
    desc: "即時預覽 Markdown，適合寫說明、筆記和文件片段。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "Markdown 預覽屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    editor: "Markdown 輸入區",
    preview: "預覽效果",
    placeholder: "把 Markdown 貼到這裡，右側會即時預覽...",
    sample: "載入示例",
    clear: "清空",
    copy: "複製 Markdown",
    copied: "已複製",
    tip: "提示：內容只在瀏覽器本地處理，不會自動上傳。預覽支援常用 Markdown 語法。",
    sampleText:
      "# 九域 Markdown 示例\n\n## 一段說明\n這是一個 **加粗**、*斜體*、`行內代碼` 的示例。\n\n> 這是一段引用。\n\n### 列表示例\n- 公開工具\n- 註冊後工具\n- 定制服務\n\n1. 第一步\n2. 第二步\n3. 第三步\n\n[訪問九域](https://www.ninespro.com)\n\n```js\nconst hello = 'ninespro';\nconsole.log(hello);\n```",
  },

  en: {
    title: "Markdown Preview",
    desc: "Live preview for Markdown. Great for notes, docs, and quick drafts.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc:
      "Markdown Preview is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    editor: "Markdown Editor",
    preview: "Preview",
    placeholder: "Paste your Markdown here. The preview updates instantly...",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy Markdown",
    copied: "Copied",
    tip: "Note: everything runs locally in your browser. Nothing is uploaded automatically. Common Markdown syntax is supported.",
    sampleText:
      "# NinesPro Markdown Sample\n\n## A quick note\nThis is **bold**, *italic*, and `inline code`.\n\n> This is a blockquote.\n\n### List Example\n- Public tools\n- Member tools\n- Custom services\n\n1. Step one\n2. Step two\n3. Step three\n\n[Visit NinesPro](https://www.ninespro.com)\n\n```js\nconst hello = 'ninespro';\nconsole.log(hello);\n```",
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseInline(text: string) {
  let value = escapeHtml(text);

  const codeTokens: string[] = [];

  value = value.replace(/`([^`]+)`/g, (_, code) => {
    const token = `__CODE_${codeTokens.length}__`;

    codeTokens.push(
      `<code style="background:#f3f4f6;padding:2px 6px;border-radius:6px;font-size:0.95em;">${escapeHtml(
        code
      )}</code>`
    );

    return token;
  });

  value = value.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    `<a href="$2" target="_blank" rel="noreferrer" style="color:#111;font-weight:600;text-decoration:underline;">$1</a>`
  );

  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  codeTokens.forEach((html, i) => {
    value = value.replace(`__CODE_${i}__`, html);
  });

  return value;
}

function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let ulBuffer: string[] = [];
  let olBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;

    html.push(
      `<p style="margin:0 0 14px;line-height:1.8;color:#222;">${paragraphBuffer
        .map((line) => parseInline(line))
        .join("<br/>")}</p>`
    );

    paragraphBuffer = [];
  };

  const flushUl = () => {
    if (!ulBuffer.length) return;

    html.push(
      `<ul style="margin:0 0 16px 20px;padding:0;line-height:1.8;color:#222;">${ulBuffer
        .map((item) => `<li>${parseInline(item)}</li>`)
        .join("")}</ul>`
    );

    ulBuffer = [];
  };

  const flushOl = () => {
    if (!olBuffer.length) return;

    html.push(
      `<ol style="margin:0 0 16px 20px;padding:0;line-height:1.8;color:#222;">${olBuffer
        .map((item) => `<li>${parseInline(item)}</li>`)
        .join("")}</ol>`
    );

    olBuffer = [];
  };

  const flushCode = () => {
    if (!codeBuffer.length) return;

    html.push(
      `<pre style="margin:0 0 16px;background:#0f172a;color:#e5e7eb;padding:16px;border-radius:14px;overflow:auto;font-size:13px;line-height:1.7;"><code>${escapeHtml(
        codeBuffer.join("\n")
      )}</code></pre>`
    );

    codeBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine ?? "";

    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushUl();
      flushOl();

      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushUl();
      flushOl();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushUl();
      flushOl();

      html.push(
        `<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;" />`
      );

      continue;
    }

    if (/^###\s+/.test(line)) {
      flushParagraph();
      flushUl();
      flushOl();

      html.push(
        `<h3 style="margin:0 0 10px;font-size:18px;font-weight:700;color:#111;">${parseInline(
          line.replace(/^###\s+/, "")
        )}</h3>`
      );

      continue;
    }

    if (/^##\s+/.test(line)) {
      flushParagraph();
      flushUl();
      flushOl();

      html.push(
        `<h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111;">${parseInline(
          line.replace(/^##\s+/, "")
        )}</h2>`
      );

      continue;
    }

    if (/^#\s+/.test(line)) {
      flushParagraph();
      flushUl();
      flushOl();

      html.push(
        `<h1 style="margin:0 0 14px;font-size:28px;font-weight:800;color:#111;">${parseInline(
          line.replace(/^#\s+/, "")
        )}</h1>`
      );

      continue;
    }

    if (/^>\s+/.test(line)) {
      flushParagraph();
      flushUl();
      flushOl();

      html.push(
        `<blockquote style="margin:0 0 16px;padding:10px 14px;border-left:4px solid #d1d5db;background:#f9fafb;color:#374151;line-height:1.8;">${parseInline(
          line.replace(/^>\s+/, "")
        )}</blockquote>`
      );

      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushOl();
      ulBuffer.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushUl();
      olBuffer.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushUl();
  flushOl();
  flushCode();

  return html.join("");
}

export default function MarkdownPreviewPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [input, setInput] = useState(t.sampleText);
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

  useEffect(() => {
    setInput(t.sampleText);
  }, [t.sampleText]);

  const html = useMemo(() => renderMarkdown(input), [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  const handleLoadSample = () => {
    setInput(t.sampleText);
  };

  if (!userReady) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <div className="subpage-hero">
            <h1>{t.title}</h1>
            <p>{t.checking}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <div className="subpage-hero">
            <h1>{t.loginRequiredTitle}</h1>
            <p>{t.loginRequiredDesc}</p>
          </div>

          <section className="subpage-section">
            <div className="card" style={{ textAlign: "center" }}>
              <Link
                href={`/${locale}/login?next=${encodeURIComponent(
                  `/${locale}/tool/markdown-preview`
                )}`}
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
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
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.editor}</h3>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                style={textareaStyle}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "14px",
                }}
              >
                <button onClick={handleLoadSample} style={toolBtnSecondary}>
                  {t.sample}
                </button>

                <button onClick={() => setInput("")} style={toolBtnSecondary}>
                  {t.clear}
                </button>

                <button onClick={handleCopy} style={toolBtnPrimary}>
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.preview}</h3>

              <div
                style={{
                  minHeight: "420px",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "16px",
                  background: "#fff",
                  overflow: "auto",
                }}
                dangerouslySetInnerHTML={{
                  __html: html || "<p style='color:#999;'>—</p>",
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

const textareaStyle: CSSProperties = {
  width: "100%",
  minHeight: "420px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "14px",
  fontSize: "14px",
  lineHeight: 1.7,
  resize: "vertical",
  boxSizing: "border-box",
  outline: "none",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const toolBtnPrimary: CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const toolBtnSecondary: CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: "14px",
  cursor: "pointer",
};