"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Locale = "zh" | "zh-TW" | "en";

type ContactText = {
  heroTitle: string;
  heroDesc: string;

  emailTitle: string;
  emailDescBefore: string;
  email: string;
  emailDescAfter: string;

  replyTitle: string;
  replyDesc: string;

  channelTitle: string;
  channelDescBefore: string;
  supportLink: string;
  channelDescAfter: string;

  formTitle: string;
  formDesc: string;

  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;

  send: string;
  sending: string;

  successMessage: string;
  failMessage: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const contactText: Record<Locale, ContactText> = {
  zh: {
    heroTitle: "联系方式",
    heroDesc: "有问题、有想法、想合作，随时找我们。",

    emailTitle: "邮件联系",
    emailDescBefore: "商务、技术、内容相关的问题，统一发邮件至",
    email: "one@ninespro.com",
    emailDescAfter: "，我们会尽快回复。",

    replyTitle: "回复时间",
    replyDesc: "通常 1-2 个工作日内回复。紧急情况请在标题注明【紧急】。",

    channelTitle: "其他渠道",
    channelDescBefore: "如需更直接的沟通，请通过",
    supportLink: "支持中心",
    channelDescAfter: "提交反馈，我们会安排专人对接。",

    formTitle: "在线联系表单",
    formDesc: "填写以下信息，我们会通过邮件回复你。",

    namePlaceholder: "你的名字",
    emailPlaceholder: "你的邮箱",
    messagePlaceholder: "你的留言",

    send: "发送",
    sending: "发送中...",

    successMessage: "✔ 邮件已成功发送，我们会尽快回复你。",
    failMessage: "提交失败，请稍后再试。",
  },

  "zh-TW": {
    heroTitle: "聯絡方式",
    heroDesc: "有問題、有想法、想合作，隨時找我們。",

    emailTitle: "郵件聯絡",
    emailDescBefore: "商務、技術、內容相關的問題，統一發郵件至",
    email: "one@ninespro.com",
    emailDescAfter: "，我們會盡快回覆。",

    replyTitle: "回覆時間",
    replyDesc: "通常 1-2 個工作日內回覆。緊急情況請在標題註明【緊急】。",

    channelTitle: "其他渠道",
    channelDescBefore: "如需更直接的溝通，請通過",
    supportLink: "支援中心",
    channelDescAfter: "提交反饋，我們會安排專人對接。",

    formTitle: "線上聯絡表單",
    formDesc: "填寫以下資訊，我們會通過郵件回覆你。",

    namePlaceholder: "你的名字",
    emailPlaceholder: "你的郵箱",
    messagePlaceholder: "你的留言",

    send: "發送",
    sending: "發送中...",

    successMessage: "✔ 郵件已成功發送，我們會盡快回覆你。",
    failMessage: "提交失敗，請稍後再試。",
  },

  en: {
    heroTitle: "Contact",
    heroDesc:
      "Have questions, ideas, or collaboration requests? Feel free to reach out.",

    emailTitle: "Email",
    emailDescBefore:
      "For business, technical, or content-related questions, please email us at",
    email: "one@ninespro.com",
    emailDescAfter: ", and we will reply as soon as possible.",

    replyTitle: "Response Time",
    replyDesc:
      "We usually reply within 1-2 business days. For urgent matters, please include [Urgent] in the subject line.",

    channelTitle: "Other Channels",
    channelDescBefore: "For more direct communication, please submit feedback via the",
    supportLink: "Support Center",
    channelDescAfter: ", and we will arrange follow-up accordingly.",

    formTitle: "Online Contact Form",
    formDesc: "Fill in the information below, and we will reply by email.",

    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Your message",

    send: "Send",
    sending: "Sending...",

    successMessage: "✔ Your message has been sent. We will reply as soon as possible.",
    failMessage: "Submission failed. Please try again later.",
  },
};

export default function ContactPage() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = contactText[locale];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),

          // 如果后端要求 privacyAccepted，这里默认传 true。
          // 后面如果你加隐私勾选框，可以把这里改成 checkbox 的值。
          privacyAccepted: true,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.ok || data.success) {
        setSuccess(true);
        e.currentTarget.reset();
        return;
      }

      setErrorMessage(data.message || data.error || t.failMessage);
    } catch {
      setLoading(false);
      setErrorMessage(t.failMessage);
    }
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>{t.emailTitle}</h3>
              <p>
                {t.emailDescBefore}{" "}
                <a
                  href={`mailto:${t.email}`}
                  style={{
                    color: "#111",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {t.email}
                </a>
                {t.emailDescAfter}
              </p>
            </div>

            <div className="card">
              <h3>{t.replyTitle}</h3>
              <p>{t.replyDesc}</p>
            </div>

            <div className="card">
              <h3>{t.channelTitle}</h3>
              <p>
                {t.channelDescBefore}{" "}
                <Link
                  href={`/${locale}/support`}
                  style={{
                    color: "#111",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {t.supportLink}
                </Link>
                {t.channelDescAfter}
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section" style={{ marginTop: "40px" }}>
          <h2>{t.formTitle}</h2>
          <p>{t.formDesc}</p>

          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>
              {t.successMessage}
            </p>
          )}

          {errorMessage && (
            <p style={{ color: "#d11a2a", marginTop: "10px" }}>
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              name="name"
              placeholder={t.namePlaceholder}
              required
              className="contact-input"
            />

            <input
              name="email"
              type="email"
              placeholder={t.emailPlaceholder}
              required
              className="contact-input"
            />

            <textarea
              name="message"
              placeholder={t.messagePlaceholder}
              required
              className="contact-textarea"
            />

            <button type="submit" disabled={loading} className="contact-button">
              {loading ? t.sending : t.send}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}