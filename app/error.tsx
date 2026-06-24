"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#fff" }}>
      <section style={{ maxWidth: 620, textAlign: "center" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>页面加载异常</h1>
        <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 20 }}>请刷新重试。如果问题持续出现，可以通过反馈入口告诉我们。</p>
        <button onClick={reset} style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: "#111827", color: "#fff", fontWeight: 800 }}>重试</button>
      </section>
    </main>
  );
}
