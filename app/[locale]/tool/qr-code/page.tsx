"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type QRText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  inputLabel: string;
  inputPlaceholder: string;
  size: string;
  margin: string;
  darkColor: string;
  lightColor: string;
  generate: string;
  download: string;
  copyText: string;
  copied: string;
  clear: string;
  sample: string;
  preview: string;
  empty: string;
  invalid: string;
  tip: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, QRText> = {
  zh: {
    title: "二维码生成器",
    desc: "输入文本或链接，生成可下载的二维码图片。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "二维码生成器属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    inputLabel: "文本或链接",
    inputPlaceholder: "输入网址、联系方式、说明文字等内容...",
    size: "尺寸",
    margin: "边距",
    darkColor: "前景色",
    lightColor: "背景色",
    generate: "生成二维码",
    download: "下载 PNG",
    copyText: "复制内容",
    copied: "已复制",
    clear: "清空",
    sample: "加载示例",
    preview: "二维码预览",
    empty: "输入内容后会在这里生成二维码。",
    invalid: "请输入需要生成二维码的内容。",
    tip: "提示：二维码在浏览器本地生成，不会自动上传你的内容。请不要把敏感密码、私钥或身份证件信息放入二维码。",
  },
  "zh-TW": {
    title: "QR Code 生成器",
    desc: "輸入文字或連結，生成可下載的 QR Code 圖片。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "QR Code 生成器屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    inputLabel: "文字或連結",
    inputPlaceholder: "輸入網址、聯絡方式、說明文字等內容...",
    size: "尺寸",
    margin: "邊距",
    darkColor: "前景色",
    lightColor: "背景色",
    generate: "生成 QR Code",
    download: "下載 PNG",
    copyText: "複製內容",
    copied: "已複製",
    clear: "清空",
    sample: "載入示例",
    preview: "QR Code 預覽",
    empty: "輸入內容後會在這裡生成 QR Code。",
    invalid: "請輸入需要生成 QR Code 的內容。",
    tip: "提示：QR Code 在瀏覽器本地生成，不會自動上傳你的內容。請不要把敏感密碼、私鑰或身份證件資訊放入 QR Code。",
  },
  en: {
    title: "QR Code Generator",
    desc: "Enter text or a link and generate a downloadable QR code image.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc:
      "QR Code Generator is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    inputLabel: "Text or link",
    inputPlaceholder: "Enter a URL, contact info, notes, or any text...",
    size: "Size",
    margin: "Margin",
    darkColor: "Foreground color",
    lightColor: "Background color",
    generate: "Generate QR Code",
    download: "Download PNG",
    copyText: "Copy text",
    copied: "Copied",
    clear: "Clear",
    sample: "Load Sample",
    preview: "QR Code Preview",
    empty: "The QR code will appear here after you enter content.",
    invalid: "Please enter content to generate a QR code.",
    tip: "Note: the QR code is generated locally in your browser. Your content is not uploaded automatically. Do not put passwords, private keys, or ID information into QR codes.",
  },
};

const sampleByLocale: Record<Locale, string> = {
  zh: "https://www.ninespro.com/zh/tool",
  "zh-TW": "https://www.ninespro.com/zh-TW/tool",
  en: "https://www.ninespro.com/en/tool",
};

export default function QRCodeGeneratorPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [content, setContent] = useState(sampleByLocale[locale]);
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [darkColor, setDarkColor] = useState("#111827");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState("");
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

  useEffect(() => {
    setContent((current) => current || sampleByLocale[locale]);
  }, [locale]);

  const generateQRCode = async () => {
    const value = content.trim();

    setMessage("");

    if (!value) {
      setQrDataUrl("");
      setMessage(t.invalid);
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(value, {
        errorCorrectionLevel: "M",
        type: "image/png",
        width: size,
        margin,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      });

      setQrDataUrl(dataUrl);
    } catch {
      setQrDataUrl("");
      setMessage(t.invalid);
    }
  };

  useEffect(() => {
    if (!loggedIn) return;

    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleLoadSample = () => {
    setContent(sampleByLocale[locale]);
    setCopied(false);
    setMessage("");
  };

  const handleClear = () => {
    setContent("");
    setQrDataUrl("");
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!content.trim()) return;

    await navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "ninespro-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            <div
              className="card liquidGlassCard"
              style={{ textAlign: "center" }}
            >
              <Link
                href={`/${locale}/login?next=${encodeURIComponent(
                  `/${locale}/tool/qr-code`
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
              <h3>{t.inputLabel}</h3>

              <textarea
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                  setCopied(false);
                }}
                placeholder={t.inputPlaceholder}
                className="contact-textarea"
                style={{
                  minHeight: 180,
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
                  {t.size}
                  <input
                    type="number"
                    min={160}
                    max={1024}
                    value={size}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setSize(Number.isFinite(next) ? next : 320);
                    }}
                    className="contact-input"
                  />
                </label>

                <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  {t.margin}
                  <input
                    type="number"
                    min={0}
                    max={8}
                    value={margin}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setMargin(Number.isFinite(next) ? next : 2);
                    }}
                    className="contact-input"
                  />
                </label>

                <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  {t.darkColor}
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(event) => setDarkColor(event.target.value)}
                    className="contact-input"
                    style={{ height: 44, padding: 6 }}
                  />
                </label>

                <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  {t.lightColor}
                  <input
                    type="color"
                    value={lightColor}
                    onChange={(event) => setLightColor(event.target.value)}
                    className="contact-input"
                    style={{ height: 44, padding: 6 }}
                  />
                </label>
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
                  onClick={generateQRCode}
                >
                  {t.generate}
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

                <button
                  type="button"
                  className="liquidGlassPillMuted"
                  onClick={handleCopy}
                  disabled={!content.trim()}
                >
                  {copied ? t.copied : t.copyText}
                </button>
              </div>
            </div>

            <div className="card liquidGlassCard">
              <h3>{t.preview}</h3>

              <div
                style={{
                  minHeight: 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 22,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(248,250,252,0.64))",
                  border: "1px solid rgba(255,255,255,0.86)",
                  padding: 20,
                  textAlign: "center",
                }}
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    style={{
                      maxWidth: "100%",
                      width: Math.min(size, 360),
                      height: "auto",
                      borderRadius: 16,
                      background: lightColor,
                      boxShadow: "0 18px 42px rgba(15,23,42,0.08)",
                    }}
                  />
                ) : (
                  <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
                    {t.empty}
                  </p>
                )}
              </div>

              <div style={{ marginTop: 18 }}>
                <button
                  type="button"
                  className="liquidGlassPill"
                  onClick={handleDownload}
                  disabled={!qrDataUrl}
                >
                  {t.download}
                </button>
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