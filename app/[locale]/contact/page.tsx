"use client";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSuccess(true);
      e.target.reset();
    }
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>联系方式</h1>
          <p>有问题、有想法、想合作，随时找我们。</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>邮件联系</h3>
              <p>
                商务、技术、内容相关的问题，统一发邮件至
                one@ninespro.com，我们会尽快回复。
              </p>
            </div>

            <div className="card">
              <h3>回复时间</h3>
              <p>通常 1-2 个工作日内回复。紧急情况请在标题注明【紧急】。</p>
            </div>

            <div className="card">
              <h3>其他渠道</h3>
              <p>如需更直接的沟通，请通过支持中心提交反馈，我们会安排专人对接。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section" style={{ marginTop: "40px" }}>
          <h2>在线联系表单</h2>
          <p>填写以下信息，我们会通过邮件回复你。</p>

          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>
              ✔ 邮件已成功发送，我们会尽快回复你。
            </p>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              name="name"
              placeholder="你的名字"
              required
              className="contact-input"
            />

            <input
              name="email"
              type="email"
              placeholder="你的邮箱"
              required
              className="contact-input"
            />

            <textarea
              name="message"
              placeholder="你的留言"
              required
              className="contact-textarea"
            />

            <button type="submit" disabled={loading} className="contact-button">
              {loading ? "发送中..." : "发送"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
